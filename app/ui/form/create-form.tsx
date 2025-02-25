'use client'
import { useState } from "react";

export default function Form(){
    const [file, setFile] = useState<File | null>();
    
    async function onSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        if(!file) return

        try{
            const data = new FormData();
            data.set('file', file)
        
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data,
            })
        //handle the error 
        if(!res.ok) throw new Error(await res.text());
        }catch(e: any){
            console.error(e);
        }
    }

    return (
        <form onSubmit={onSubmit} method="POST" encType="multipart/form-data">
            <label htmlFor="category">دسته بندی خود را انتخاب کنید:</label>
                <select name="category" defaultValue={'select'} className="text-[white] bg-[#333] p-[0.250rem] block m-[0.650rem]">
                    <option value="select" disabled={true}>انتخاب کنید</option>
                    {/* {categories.map((cat,ind)=> <option value={cat.value} key={cat.value}>{cat.name}</option>)} */}
                </select>
            <label htmlFor="title">عنوان آگهی*</label>
            <input type="text" name="title" className="block m-[0.650rem] text-[white] bg-[#333] p-[0.250rem] w-full" maxLength={30} placeholder="فروش آپارتمان در ..." required/>
            <label htmlFor="desc">{`توضیحات(اختیاری)`}</label>
            <textarea name="desc" cols={5} rows={5} className="block m-[0.650rem] text-[white] bg-[#333] p-[0.250rem] w-full" ></textarea>
            <label htmlFor="images">عکس‌های خود را بارگزاری کنید:</label>
            <input type="file" name="image" accept="image/png, image/jpeg" onChange={(e)=> setFile(e.target.files?.[0])}/>
            {/* {img?.src && <Image src={img.src} width={50} height={50} alt='Your prod image'/>} */}
            <button disabled={true} type="submit" className="text-[1.3rem] p-[0.6rem] border-[0.5px] border-[white] m-auto mt-[20px] block">ثبت آگهی</button>
        </form>
    )
}
