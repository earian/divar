import CategoryItem from "./categoryItem";
import { fetchCategories } from "@/app/lib/data";

export default async function Category(){
    const categories = await fetchCategories();

    return (
        <>
        {categories?.map((cat, ind)=> <CategoryItem imageUrl={cat.icon} title={cat.name} key={ind}/>)}
        </>
    )
}