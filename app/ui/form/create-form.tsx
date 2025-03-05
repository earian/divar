'use client'
import { useActionState, useEffect, useState } from "react";
import { createPost } from "@/app/lib/actions";
import { QueryResultRow } from "@vercel/postgres";

export default function Form(props: {
    categories: QueryResultRow[];
}){
    const [state, formAction, isPending] = useActionState( createPost, undefined );
    const [category, setCategory] = useState({ name: 'select' });
    useEffect(()=>{
        if(state) setCategory({ name: state.values.category });
    },[state])


    return (
        <form action={formAction}>
            <label htmlFor="category">دسته‌ی آگهی</label>
                <select name="category" 
                        value={ category.name } 
                        onChange={(e)=> setCategory({ name: e.target.value })} 
                        className="text-[white] bg-[#333] p-[0.250rem] block my-[0.650rem] w-full rounded-md"
                        >
                    <option value="select" disabled={true}>انتخاب کنید</option>
                    {props.categories.map((cat,ind)=> <option value={cat.value} key={cat.value}>{cat.name}</option>)}
                </select>
            {
                category.name != 'select' && 
                <>
            <label htmlFor="title">عنوان آگهی*</label>
            <input 
                type="text" 
                name="title" 
                defaultValue={state?.values.title} 
                className="block my-[0.650rem] text-[white] bg-[#333] p-[0.250rem] w-full" 
                maxLength={50} 
                placeholder="فروش آپارتمان در ..."
                />
            {state?.errors?.title && <div className="text-[red]">{state.errors.title}</div>}            
            <label htmlFor="desc">{`توضیحات(اختیاری)`}</label>
            <textarea 
                name="desc" 
                cols={5} 
                rows={5} 
                defaultValue={state?.values.desc} 
                className="block my-[0.650rem] text-[white] bg-[#333] p-[0.250rem] w-full" 
                >
            </textarea>
            <label htmlFor="images">عکس‌ خود را بارگزاری کنید:</label>
            <input 
                type="file" 
                name="image" 
                accept="image/webp, image/png, image/jpeg" 
                className="my-[0.875rem]"
                />
            {/* {img?.src && <Image src={img.src} width={50} height={50} alt='Your prod image'/>} */}
            <label htmlFor="price" className="block">قیمت:</label>
            <input 
                type="number" 
                name="price" 
                defaultValue={state?.values.price}
                className="block my-[0.650rem] text-[white] bg-[#333] p-[0.250rem] w-full" 
                placeholder="تومان"
                />
            {state?.errors?.price && <div className="text-[red]">{state.errors.price}</div>}
            <label htmlFor="district" className="block">محل:</label>
            <input 
                type="text" 
                name="district" 
                defaultValue={state?.values.district} 
                className="block my-[0.650rem] text-[white] bg-[#333] p-[0.250rem] w-full" 
                placeholder="اقدسیه، مجیدیه، نیاوران، ..."
                />
            {state?.message && <div className="text-red-300">{state.message}</div>}
            <div className="flex flex-row justify-end gap-[0.235rem] my-[0.435rem]">
            {/* <button 
                type="submit" 
                name="action" 
                value="reset" 
                className="rounded-md border-[2px] border-[#333] p-[0.875rem]" 
                disabled={isPending ? true : false}
                onClick={handleResetClick}
                >انصراف</button> */}
            <button type="submit" className="rounded-md border-[2px] border-[#333] p-[0.875rem]" disabled={isPending ? true : false}>{isPending ? 'در حال پردازش...' : 'ثبت اطلاعات'}</button>
            </div>
            </>}
            </form>
    )
}