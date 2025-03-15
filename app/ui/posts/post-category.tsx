import { fetchCategoryByValue } from "@/app/lib/data"

export default async function Category(props: {
    value: string
}){
    const data = await fetchCategoryByValue(props.value);
    const name = data.name
    
    return(
        <h3
            className="block my-[0.875rem] mr-[1.5rem]"
            >{name}</h3>
    )

}