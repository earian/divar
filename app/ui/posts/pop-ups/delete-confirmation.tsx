'use client';
import { useTransition } from "react";
import Button from "../button";
import { deletePostById } from "@/app/lib/actions";

export default function Confirmation(props: {
    deleteConfirmation: Function,
    postId: string,
}){
    document.body.style.overflow = 'hidden';
    const [isPending, startTransition] = useTransition();

    function cancel(){
        document.body.style.overflow = 'auto';
        props.deleteConfirmation(false);
    }

    async function deletePost(e?: Event){
        console.log('Post deletion confirmed.');
        startTransition(async ()=>{
            const res = await deletePostById(props.postId);
            if(res) window.location.href = '/';
        })
    }

    return (
        <div 
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {if(e.target == e.currentTarget) cancel()}}
        className="fixed flex justify-center items-center size-full z-[2000]"
        >
            {/* The Confirmation pop-up container */}
            <article
            className="bg-[#333] p-[0.5rem] relative w-[70%] rounded-sm"
            >
                <span className="float-left h-[24px] w-[24px] text-center font-bold" onClick={cancel}>X</span>
                <h2
                className="mt-[1.5rem]"
                >آیا مطمئنید که میخواهید آگهی رو حذف کنید؟</h2>
                <div
                className="flex flex-row justify-around mt-[2rem]"
                >
                    <Button value="خیر" action={cancel} disabled={isPending}/>
                    <Button value={isPending ? '...' : 'بله' } action={deletePost} disabled={isPending}/>
                </div>
            </article>
        </div>
    )
}