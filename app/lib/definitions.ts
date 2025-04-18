import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z.string().email({ message: 'لطفا یک ایمیل معتبر وارد کنید.' }),
    password: z
        .string()
        .min(6, {message: 'پسورد باید ۶ کاراکتر یا بیشتر باشد.'})
})

export const EmailSchema = z.string().email({ message: 'لطفا یک ایمیل معتبر وارد کنید.' });
export const PasswordSchema = z.string().min(6, { message: 'پسورد باید ۶ کاراکتر یا بیشتر باشد.' });

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

//maximum size of each image to be uplaoded
const MAX_SIZE = 1 * 1024 * 1024;//4 MB
export const IMAGE_TYPES = ["image/webp", "image/png", "image/jpeg"]

export const ImageSchema = z.instanceof(File, { message: 'فایل معتبر نیست.' })
                            .refine((file)=> file.size <= MAX_SIZE, { message: 'فایل انتخابی باید کمتر از ۱MB باشد.'})

export const CreatePostFormSchema = z.object({
    category: z.string({ message: 'لطفا دسته بندی خود را انتخاب کنید.' }),
    title: z
    .string({ message: 'لطفا عنوان آگهی خود را وارد کنید.'})
    .min(3, { message: 'عنوان آگهی حداقل باید یک کلمه باشد.'}),
    desc: z.string().optional(),
    image: z
    .instanceof(File,{ message: 'فایل انتخابی باید از نوع png/jpeg باشد.'}),
    price: z
    .string({ message: 'این فیلد الزامی است.' })
    .refine((val)=> !isNaN(Number(val)) && Number(val) >= 5000,{ message: 'قیمت باید بیشتر از ۵۰۰۰ تومان باشد.' }),
    district: z.string().optional(),
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
    gallery: string,
}

export type User = {
    id: string,
    name: string,
    email: string,
    'name(per)': string,
}