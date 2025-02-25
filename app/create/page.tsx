import { fetchCategories } from "../lib/data";
import { rubik } from "../ui/fonts";
import Form from "../ui/form/create-form";

export default async function Page(){

    return (
        <div className={`${rubik.className} pb-[50px]`}>
            <h2 className={`${rubik.className} block top-[0] sticky w-full bg-[#333] p-[1rem] font-[700]`}>ثبت آگهی</h2>
            <div className="p-[1.5rem]">
                <Form />
            </div>
        </div>
    )
}