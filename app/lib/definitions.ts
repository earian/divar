import { z } from "zod"

export const LoginFormSchema = z.object({
    email: z.string().email({ message: 'لطفا یک ایمیل معتبر وارد کنید.' }),
    password: z
        .string()
        .min(6, {message: 'پسورد باید ۶ کاراکتر یا بیشتر باشد.'})
})

export type FormState = {
    errors?: {
        email?: string[],
        password?: string[],
    },
    message?: string,
} | undefined;