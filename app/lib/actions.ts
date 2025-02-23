'use server'
import { FormState, LoginFormSchema } from "./definitions";
import { fetchUser } from "./data";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function authenticate(state: FormState, formData: FormData){
        const validatedFields = LoginFormSchema.safeParse({
            email: formData.get('email'),
            password: formData.get('password'),
        })

        if(!validatedFields.success){
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'لطفا مقادیر صحیح را وارد کنید.'
            }
        }
        const {email, password} = validatedFields.data;
        const user = await fetchUser(email);
        if(!user.rows) return { message: `چنین کاربری وجود ندارد.` }
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