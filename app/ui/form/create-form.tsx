import UploadImage from "./upload-image";
import { fetchCategories } from "@/app/lib/data";
import { writeFile } from "fs/promises";
import { join } from "path";

export default async function Form(){
    const categories = await fetchCategories();
    async function POST(data: FormData){
        'use server'
        console.log('working')
        const file: File | null = data.get('image') as unknown as File;
        if(!file){
            throw new Error('No file has been uploaded!')
        }
    
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
    
        //with the file data in the buffer, you can do whatever you want with it! what is buffer??
        //write it to the file system in a new location
        const path = join('/', "public", file.name);
        await writeFile(path, buffer);
        console.log(`Open ${path} to see the uploaded file`)
    
        return { success: true };
    
    }

    return (
        <form action="/create" method="POST" encType="multipart/form-data">
            <label htmlFor="category">دسته بندی خود را انتخاب کنید:</label>
                <select name="category" defaultValue={'select'} className="text-[white] bg-[#333] p-[0.250rem] block m-[0.650rem]">
                    <option value="select" disabled={true}>انتخاب کنید</option>
                    {categories.map((cat,ind)=> <option value={cat.value} key={cat.value}>{cat.name}</option>)}
                </select>
            <label htmlFor="title">عنوان آگهی*</label>
            <input type="text" name="title" className="block m-[0.650rem] text-[white] bg-[#333] p-[0.250rem] w-full" maxLength={30} placeholder="فروش آپارتمان در ..." required/>
            <label htmlFor="desc">{`توضیحات(اختیاری)`}</label>
            <textarea name="desc" cols={5} rows={5} className="block m-[0.650rem] text-[white] bg-[#333] p-[0.250rem] w-full" ></textarea>
            <label htmlFor="images">عکس‌های خود را بارگزاری کنید:</label>
            <input type="file" name="image" accept="image/png, image/jpeg"/>
            {/* {img?.src && <Image src={img.src} width={50} height={50} alt='Your prod image'/>} */}
            <button type="submit" className="text-[1.3rem] p-[0.6rem] border-[0.5px] border-[white] m-auto mt-[20px] block">ثبت آگهی</button>
        </form>
    )
}
