'use client'
import { useActionState, useState } from "react";
import { createPost } from "@/app/lib/actions";
import { QueryResultRow } from "@vercel/postgres";

export default function Form(props: {
    categories: QueryResultRow[];
}){
    const [file, setFile] = useState<File | null>();
    const [state, formAction, isPending] = useActionState(createPost, undefined)

    return (
        <form action={formAction} >
            <label htmlFor="category">دسته بندی خود را انتخاب کنید*:</label>
                <select name="category" defaultValue={'select'} className="text-[white] bg-[#333] p-[0.250rem] block m-[0.650rem]">
                    <option value="select" disabled={true}>انتخاب کنید</option>
                    {props.categories != null && props.categories.map((cat,ind)=> <option value={cat.value} key={cat.value}>{cat.name}</option>)}
                </select>
            {state?.errors.category && <div className="text-[red]">{state.errors.category}</div>}
            <label htmlFor="title">عنوان آگهی*</label>
            <input type="text" name="title" className="block m-[0.650rem] text-[white] bg-[#333] p-[0.250rem] w-full" maxLength={50} placeholder="فروش آپارتمان در ..."/>
            {state?.errors?.title && <div className="text-[red]">{state.errors.title}</div>}
            <label htmlFor="desc">{`توضیحات(اختیاری)`}</label>
            <textarea name="desc" cols={5} rows={5} className="block m-[0.650rem] text-[white] bg-[#333] p-[0.250rem] w-full" ></textarea>
            <label htmlFor="images">عکس‌ خود را بارگزاری کنید:</label>
            <input type="file" name="image" accept="image/webp, image/png, image/jpeg" onChange={(e)=> {setFile(e.target.files?.[0])}} className="m-[0.875rem]"/>
            {/* {img?.src && <Image src={img.src} width={50} height={50} alt='Your prod image'/>} */}
            <label htmlFor="price" className="block">قیمت:</label>
            <input type="number" name="price" className="block m-[0.650rem] text-[white] bg-[#333] p-[0.250rem] w-full" placeholder="تومان"/>
            {state?.errors?.price && <div className="text-[red]">{state.errors.price}</div>}
            <label htmlFor="district" className="block">محل:</label>
            <input type="text" name="district" className="block m-[0.650rem] text-[white] bg-[#333] p-[0.250rem] w-full" placeholder="اقدسیه، مجیدیه، نیاوران، ..."/>
            {state?.message && <div className="text-red-300">{state.message}</div>}
            <button type="submit" className="block rounded-md mt-[1rem] border-[2px] border-[#333] p-[0.875rem] mx-[auto]" disabled={isPending ? true : false}>{isPending ? 'در حال پردازش...' : 'ثبت آگهی'}</button>
        </form>
    )
}