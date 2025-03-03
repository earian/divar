import { fetchCategories } from "../lib/data";
import { rubik } from "../ui/fonts";
import Form from "../ui/form/create-form";
import { unstable_noStore } from "next/cache";
import Header from "../ui/navigation/create-header";


export default async function Page(){
    unstable_noStore();
    const categories = await fetchCategories();

    return (
        <div className={`${rubik.className}`}>
                <Header />
            <div className="p-[1.5rem]">
                <Form categories={categories}/>
            </div>
        </div>
    )
}