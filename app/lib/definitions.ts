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

export const CreatePostFormSchema = z.object({
    category: z.string({ message: 'لطفا دسته بندی خود را انتخاب کنید.' }),
    title: z.string({ message: 'لطفا عنوان آگهی خود را وارد کنید.'}),
    desc: z.string(),
    image: z.instanceof(File,{ message: 'فایل انتخابی باید از نوع png/jpeg باشد.'}),
    price: z.string(),
    district: z.string(),
})
export type CreateFormState = {
    errors?: {
        category?: string[],
        title?: string[],
        image?: string[],
        price?: string[],
        district?: string[],
    },
    message?: string,
} | undefined;