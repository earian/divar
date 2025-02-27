'use server'
import { CreateFormState, CreatePostFormSchema, FormState, LoginFormSchema } from "./definitions";
import { fetchUser } from "./data";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from "uuid";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function authenticate(state: FormState, formData: FormData){
        const validatedFields = LoginFormSchema.safeParse({
            email: formData.get('email'),
            password: formData.get('password'),
        })

        if(!validatedFields.success){
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'لطفا مقادیر صحیح را وارد کنید.',
            }
        }
        const {email, password} = validatedFields.data;
        const user = await fetchUser(email);
        if(user.rows.length == 0) return { message: `چنین کاربری وجود ندارد.` }
        const passwordMatch = (password === user.rows[0].password);
        if(passwordMatch) {
            const cookieStore = cookies();
            (await cookieStore).set("login","true", {
                httpOnly: false,
                secure: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            })
        }
        redirect('/user');
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
        }
    }
    
    const {category, title, desc, price, district} = validatedFields.data;
    const imageFile : File | null = formData.get('image') as File;
    const date = new Date().toISOString().split('T')[0];
    const id = uuidv4();
    try{
        const blob = await put(`posts/${imageFile.name}`, imageFile, {
            access: 'public',
          });
        await sql`
                INSERT INTO posts ("postId", title, description, price, category, date, district, thumbnail)
                VALUES (${id}, ${title}, ${desc}, ${price}, ${category}, ${date}, ${district}, ${blob.url})
                `
    }catch(err){
        console.log(err)
        throw new Error("Coudn't create the post.")
    }
    revalidatePath('/');
    redirect('/');
    

}

export async function revalidateHome(){
    revalidatePath('/');
}