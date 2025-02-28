import { fetchCategories } from "../lib/data";
import { rubik } from "../ui/fonts";
import Form from "../ui/form/create-form";
import { unstable_noStore } from "next/cache";

export default async function Page(){
    unstable_noStore();
    const categories = await fetchCategories();

    return (
        <div className={`${rubik.className} pb-[50px]`}>
            <h2 className={`${rubik.className} block top-[0] sticky w-full bg-[#333] p-[1rem] font-[700]`}>ثبت آگهی</h2>
            <div className="p-[1.5rem]">
                <Form categories={categories}/>
            </div>
        </div>
    )
}