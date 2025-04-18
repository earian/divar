'use client'
import { useActionState, useEffect, useReducer, useState, useRef } from "react";
import { createPost } from "@/app/lib/actions";
import { QueryResultRow } from "@vercel/postgres";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { ImageSchema, IMAGE_TYPES, CreateFormState, CreatePostFormSchema } from "@/app/lib/definitions";

export default function Form(props: {
    categories: QueryResultRow[];
}){
    const [formState, dispatch] = useReducer(reducer, { category: 'select' });
    const [submittionState, formAction, isPending] = useActionState(createPost, undefined);
    const hiddenInputRef = useRef(null);
    const [imageFiles, setImageFiles] = useState< File[] >([]);
    const [imageErrors, setImageErrors] = useState< string >();

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>){
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
            dispatch({ type: 'error', errors: errors })
            return;
        }
        dispatch({ type: 'send' })
        //add the image files from the state into the formData and submit the form
        
    }


    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="category">دسته‌ی آگهی</label>
                <select name="category" 
                        value={ formState.category } 
                        onChange={(e)=> dispatch({ type: 'set-category', category: e.target.value })} 
                        className="text-[white] bg-[#333] p-[0.250rem] block my-[0.650rem] w-full rounded-md"
                        >
                    <option value="select" disabled={true}>انتخاب کنید</option>
                    {props.categories.map((cat) => <option value={cat.value} key={cat.value}>{cat.name}</option>)}
                </select>
            {
                formState.category != 'select' && 
                <>
            <label htmlFor="title">عنوان آگهی*</label>
            <input 
                type="text" 
                name="title" 
                defaultValue={submittionState?.values.title} 
                className="block my-[0.650rem] text-[white] bg-[#333] p-[0.250rem] w-full" 
                maxLength={50} 
                placeholder="فروش آپارتمان در ..."
                />
            {formState.errors?.title && <div className="text-[red]">{formState.errors.title}</div>}
            <label htmlFor="desc">{`توضیحات(اختیاری)`}</label>
            <textarea 
                name="desc" 
                cols={5} 
                rows={5} 
                defaultValue={submittionState?.values.desc} 
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
                defaultValue={submittionState?.values.price}
                className="block my-[0.650rem] text-[white] bg-[#333] p-[0.250rem] w-full" 
                placeholder="تومان"
                />
            {formState.errors?.price && <div className="text-[red]">{formState.errors.price}</div>}
            <label htmlFor="district" className="block">محل:</label>
            <input 
                type="text" 
                name="district" 
                defaultValue={submittionState?.values.district} 
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
interface ReducerState {
    category: string,
    errors?: {
        category?: string[],
        title?: string[],
        desc?: string[],
        price?: string[],
        district?: string[],
        },
    message?: string,
} 

type ReducerAction = 
{ type: 'set-category', category: string } |
{ type: 'error', errors: CreatePostErrorState, message?: string } |
{ type: 'send', message?: string } 

function reducer(prevState: ReducerState, action: ReducerAction){
    switch(action.type){

        case 'set-category':
            return {
                ...prevState,
                category: action.category
            }

        case 'error':
            console.log('error dispatch!')
            return {
                ...prevState,
                errors: action.errors,
                message: action.message,
            }


        case 'send':
            console.log('send dispatch.')
            return {
                ...prevState,
                errors: undefined,
                message: action.message,
            }

        default: 
            return prevState
    }
}