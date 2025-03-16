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
    values?: {
        email?: string,
        password?: string,
    }
} | undefined;

export const CreatePostFormSchema = z.object({
    category: z.string({ message: 'لطفا دسته بندی خود را انتخاب کنید.' }),
    title: z
    .string({ message: 'لطفا عنوان آگهی خود را وارد کنید.'})
    .min(3, { message: 'عنوان آگهی حداقل باید یک کلمه باشد.'}),
    desc: z.string(),
    image: z
    .instanceof(File,{ message: 'فایل انتخابی باید از نوع png/jpeg باشد.'}),
    price: z
    .string()
    .transform((num)=> Number(num))
    .refine((num)=> !isNaN(num), { message: 'قیمت باید یک عدد معتبر باشد.' })
    .refine((num)=> num >= 10000, { message: 'قیمت باید بیشتر از ۱۰،۰۰۰ تومان باشد.' }),
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
    values: {
        category: string,
        title?: string,
        desc?: string,
        price?: string,
        district?: string,
    },
} | undefined;

export type Post = {
    category: string,
    creator: string | null,
    date: string,
    description: string,
    district: string,
    postId: string,
    price: number,
    thumbnail: string,
    title: string,
}