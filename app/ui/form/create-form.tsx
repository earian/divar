'use client'
import { useActionState, useEffect, useState, useRef } from "react";
import { createPost } from "@/app/lib/actions";
import { QueryResultRow } from "@vercel/postgres";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

export default function Form(props: {
    categories: QueryResultRow[];
}){
    const [state, formAction, isPending] = useActionState(createPost, undefined);
    const [category, setCategory] = useState({ name: 'select' });
    const hiddenInputRef = useRef(null);
    const [imageFiles, setImageFiles] = useState< File[] >([]);
    
    useEffect(()=>{
        if(state) setCategory({ name: state.values.category });
    },[state])

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>){
        console.log('working')
        if(e.currentTarget.files && e.currentTarget.files[0] && e.currentTarget.files[0].size) {
            setImageFiles([...imageFiles, e.currentTarget.files[0]]);
        }
    }
    
    function onSubmit(e: React.FormEvent){
        e.preventDefault();

        //validate form fields

    }


    return (
        <form onSubmit={onSubmit}>
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
                className="block my-[0.650rem] text-[white] bg-[#333] p-[0.250rem] w-full resize-none" 
                >
            </textarea>
            <label htmlFor="images">عکس‌ خود را بارگزاری کنید:</label>
            <input 
                ref={hiddenInputRef}
                type="file" 
                name="image"
                className="hidden"
                multiple
                />
            
            <input 
                type="file" 
                id="image-uploader" 
                className="hidden" 
                accept="image/webp, image/png, image/jpeg"
                onChange={handleImageChange} 
                disabled={imageFiles.length == 4}
                />
            <label 
                htmlFor="image-uploader"
                className="block my-[0.875rem]"
                >
                <CloudArrowUpIcon className="size-8"/>
            </label>
            <div
            className="flex flex-row flex-nowrap justify-around"
            >
                <span className="w-[20%] aspect-square border border-dotted boder-[white]">{imageFiles[0] && <img src={URL.createObjectURL(imageFiles[0])} className="size-full"/>}</span>
                <span className="w-[20%] aspect-square border border-dotted boder-[white]">{imageFiles[1] && <img src={URL.createObjectURL(imageFiles[1])} className="size-full"/>}</span>
                <span className="w-[20%] aspect-square border border-dotted boder-[white]">{imageFiles[2] && <img src={URL.createObjectURL(imageFiles[2])} className="size-full"/>}</span>
                <span className="w-[20%] aspect-square border border-dotted boder-[white]">{imageFiles[3] && <img src={URL.createObjectURL(imageFiles[3])} className="size-full"/>}</span>
            </div>
            
            
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