'use client'
import { useActionState, useEffect, useState, useRef } from "react";
import { createPost } from "@/app/lib/actions";
import { QueryResultRow } from "@vercel/postgres";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { ImageSchema, IMAGE_TYPES, CreateFormState, CreatePostFormSchema } from "@/app/lib/definitions";

export default function Form(props: {
    categories: QueryResultRow[];
}){
    const [state, formAction, isPending] = useActionState(createPost, undefined);
    const [category, setCategory] = useState({ name: 'select' });
    const hiddenInputRef = useRef(null);
    const [imageFiles, setImageFiles] = useState< File[] >([]);
    const [imageErrors, setImageErrors] = useState< string >();
    const [formErrors, setFormErrors] = useState< CreatePostErrorState >();
    console.log('Form Erros State: ', formErrors)
    
    useEffect(()=>{
        if(state) setCategory({ name: state.values.category });
    },[state])

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>){
        console.log('working')
        if(e.currentTarget.files && e.currentTarget.files[0] && e.currentTarget.files[0].size) {
            //validate 💡each image before updating the image holder state.
            const validated = ImageSchema.safeParse(e.currentTarget.files[0]);
            if(validated.success) {
                setImageErrors(undefined);
                setImageFiles([...imageFiles, e.currentTarget.files[0]]);
                return;
            }
            const errorMessage = validated.error.flatten().formErrors[0];
            setImageErrors(errorMessage);
        }
    }
    
    function onSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log('onSubmit Funciton ran!')
        const formData = new FormData(e.currentTarget);

        //validate form fields
        const validateSchema = CreatePostFormSchema.omit({ image: true });//skip the validation of images and only validate other inputs
        const validated = validateSchema.safeParse({
            category: formData.get('category'),
            title: formData.get('title'),
            price: formData.get('price'),
        });
        if(!validated.success){
            const errors = validated.error.flatten().fieldErrors;
            console.log(errors)
            setFormErrors( errors );
            return;
        }
        setFormErrors(undefined)
        //add the image files in the state and submit the form
        
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
                    {props.categories.map((cat) => <option value={cat.value} key={cat.value}>{cat.name}</option>)}
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
            {formErrors?.title && <div className="text-[red]">{formErrors.title}</div>}
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
                accept={IMAGE_TYPES.join(",")}
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
            {imageErrors && <div className="text-[red]">{imageErrors}</div>}
            
            <label htmlFor="price" className="block">قیمت:</label>
            <input 
                type="number" 
                name="price" 
                defaultValue={state?.values.price}
                className="block my-[0.650rem] text-[white] bg-[#333] p-[0.250rem] w-full" 
                placeholder="تومان"
                />
            {formErrors?.price && <div className="text-[red]">{formErrors.price}</div>}
            <label htmlFor="district" className="block">محل:</label>
            <input 
                type="text" 
                name="district" 
                defaultValue={state?.values.district} 
                className="block my-[0.650rem] text-[white] bg-[#333] p-[0.250rem] w-full" 
                placeholder="اقدسیه، مجیدیه، نیاوران، ..."
                />
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
type CreatePostErrorState = {
        category?: string[],
        title?: string[],
        desc?: string[],
        price?: string[],
        district?: string[],
}