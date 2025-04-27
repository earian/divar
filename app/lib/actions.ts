'use server'
import { CreateFormState, CreatePostFormSchema, FormState, LoginFormSchema } from "./definitions";
import { fetchUser } from "./data";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from "uuid";
import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { CreateSession, whois } from "./session";

export async function authenticate(state: FormState | null, formData: FormData){
        const validatedFields = LoginFormSchema.safeParse({
            email: formData.get('email'),
            password: formData.get('password'),
        })

        if(!validatedFields.success){
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'لطفا مقادیر صحیح را وارد کنید.',
                values: {
                    email: formData.get('email') as string || '',
                    password: formData.get('password') as string || '',
                }
            }
        }
        const {email, password} = validatedFields.data;
        const user = await fetchUser(email);
        if(user.rows.length == 0) return { message: `چنین کاربری وجود ندارد.` }
        const passwordMatch = (password === user.rows[0].password);
        if(passwordMatch) {
            //the user is validated
            await CreateSession(user.rows[0].id);
            return { success: true }
        }
}


export async function createPost(prevState: CreateFormState, formData: FormData){
    console.log('Create Post function ran!🎈');
    const validatedFields = CreatePostFormSchema.safeParse({
        category: formData.get('category'),
        title: formData.get('title'),
        desc: formData.get('desc'),
        image: formData.get('image'),
        price: formData.get('price'),
        district: formData.get('district'),
    })
    
    if(!validatedFields.success){
        const fieldErrors = validatedFields.error.flatten().fieldErrors;
        return {
            errors: fieldErrors,
            message: 'آگهی ثبت نشد، لطفا فرم رو کامل پر کنید.',
            values: { 
                category: formData.get('category') as string,
                title: formData.get('title') as string || '',
                desc: formData.get('desc') as string || '',
                price: formData.get('price') as string || '',
                district: formData.get('district') as string || '',
              },
        }
    }
    
    const {category, title, desc, price, district} = validatedFields.data;
    const imageFiles = formData.getAll('images') as File[];
    let gallery : string[] = [];//gallery will be the LINKS of the images, to show later in the posts page
    const date = new Date().toISOString();
    const id = uuidv4();
    try{
        const creatorId = await whois();
        if(imageFiles.length){
            for(const file of imageFiles){
                const blob = await put(`posts/${file.name}`, file, {
                    access: 'public',
                });
                gallery.push(blob.url)
            }
        }
        let query = `
        INSERT INTO posts ("postId", title, description, price, category, date, district, creator
        ${gallery.length ? ', thumbnail' : ''}${gallery.length > 1 ? ', gallery' : ''})
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8
        ${gallery.length ? ', $9' : ''}${gallery.length > 1 ? ', $10' : ''})
      `;
    
      let params = [id, title, desc, price, category, date, district, creatorId];
      if (gallery.length) {
        //push the thumbnail to the query params
        params.push(gallery[0]);
        
        //if there is more than one image
        if(gallery.length > 1){
            //converting the rest of gallery array to string to insert it into my database
            const stringedGallery = JSON.stringify(gallery.slice(1));
            params.push(stringedGallery);
        }
      }
    
      // Execute query
      await sql.query(query, params);    
    }catch(err){
        console.log(err)
        throw new Error("Coudn't create the post.")
    }
    revalidatePath('/');
    redirect('/');
}

export async function togglePostActivation(id: string){
    try{
        await sql`UPDATE posts
                    SET "isActive" = NOT "isActive"
                    WHERE "postId" = ${id};
                    `
        return { message: 'success' };
    }catch(err){
        console.log(err);
        throw new Error("Failed to toggle the post activation.")
    }
}

export async function deletePostById(id: string | null){
    const imgLinks : string[] = [];
    try{
        const data = await sql`SELECT thumbnail, gallery FROM posts WHERE "postId" = ${id}`
        const { thumbnail, gallery } = data.rows[0];
        if(thumbnail) imgLinks.push(thumbnail);
        const galleryArr = JSON.parse(gallery);
        if(galleryArr) imgLinks.push(...galleryArr);

        //deleting the row and looping through the image sources and deleting them from the blob storage
        await sql`DELETE FROM posts WHERE "postId" = ${id}`;
        if(imgLinks && imgLinks.length) {
            for(const link of imgLinks){
                await del(link);
            }
        }
        return 1;
    }catch(err){
        console.log(err);
        throw new Error('Failed to delete the post from the database.')
    }
}