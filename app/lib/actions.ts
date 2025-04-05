'use server'
import { CreateFormState, CreatePostFormSchema, FormState, LoginFormSchema } from "./definitions";
import { fetchUser } from "./data";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from "uuid";
import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { CreateSession, whois } from "./session";

export async function authenticate(state: FormState, formData: FormData){
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
            redirect('/');
        }
}


export async function createPost(prevState: CreateFormState, formData: FormData){
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
    const imageFile = formData.get('image') as File;
    const date = new Date().toISOString().split('T')[0];
    const id = uuidv4();
    try{
        const creatorId = await whois();
        let blob = null;
        if(imageFile && imageFile.size !== 0){
            blob = await put(`posts/${imageFile.name}`, imageFile, {
                access: 'public',
              });
        }
        let query = `
        INSERT INTO posts ("postId", title, description, price, category, date, district, creator
        ${blob ? ', thumbnail' : ''})
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8
        ${blob ? ', $9' : ''})
      `;
    
      let params = [id, title, desc, price, category, date, district, creatorId];
      if (blob) {
        params.push(blob.url);
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

export async function deletePostById(id: string | null, imgSrc?: string){
    try{
        await sql`DELETE FROM posts WHERE "postId" = ${id}`;
        if(imgSrc && imgSrc != '/') await del(imgSrc);
        return 1;
    }catch(err){
        console.log(err);
        throw new Error('Failed to delete the post from the database.')
    }
}