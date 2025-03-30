'use client';
import Link from "next/link";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useOptimistic, useTransition } from "react";
import { togglePostActivation, deletePostById } from "@/app/lib/actions";


export default function Post(props: {
    post: { postId: string, thumbnail: string, title: string, isActive: boolean },
    dispatch: Function,
}){
    const [optimisticActive, setOptimisticActive] = useOptimistic(props.post.isActive);
    const [pending, startTransition] = useTransition();
    const [deletePending, startDelete] = useTransition();
    

    async function handleActivationClick(){
        startTransition(async ()=>{
            setOptimisticActive(!props.post.isActive);
            try{
                await togglePostActivation(props.post.postId);
                props.dispatch({
                    type: 'activation',
                    post: {
                        ...props.post,
                        postId: props.post.postId,
                        isActive: !props.post.isActive,
                    }
                })
            }catch(err){
                console.log(err);
            }
        })
    }
    async function handleDeleteClick(){
        const res = prompt('آیا مطمئنید که میخواهید این آگهی رو پاک کنید؟','برای حذف yes رو بنویسید و ok رو بزنید.');
        let text;
        if(res) text = res?.toLocaleLowerCase();
        if(text == 'yes'){
            startDelete(async ()=> {
                try{
                    await deletePostById(props.post.postId, props.post.thumbnail);
                    props.dispatch({
                        type: 'delete',
                        postId: props.post.postId,
                    })
                }catch(err){
                    console.log(err)
                }
            })
        }
    }



    return (
        <Link
            href={`/p/${props.post.postId}`}
            className="block relative flex flex-row p-[1rem] bg-[#333] mb-[0.560rem]"
            key={props.post.postId}
            >
                <Image
                src={props.post.thumbnail || '/poster/thumbnail-placeholder.avif'}
                width={100}
                height={100}
                alt=""
                className="float-right ml-[0.560rem] aspect-square"
                />
                
                <h2>{props.post.title}</h2>
                

                <div
                className="flex space-around h-[fit-content] mr-[auto] mt-[auto]"
                onClick={(e)=> {
                    e.stopPropagation()
                    e.preventDefault()
                }}
                >
                    <span
                    className="p-[0.235rem] hover:bg-[gray] hover:rounded-md"
                    onClick={()=> handleDeleteClick()}
                    >
                        <TrashIcon className="size-6"/>
                    </span>
                    <span
                    className="p-[0.235rem] hover:bg-[gray] hover:rounded-md"
                    >
                        {optimisticActive 
                            ? <EyeSlashIcon onClick={()=> { if(!pending)handleActivationClick() }} className="size-6"/> 
                            : <EyeIcon onClick={()=> { if(!pending)handleActivationClick() }} className="size-6"/>}
                    </span>
                    
                </div>
                
            </Link>
    )
}

async function togglePostActivationtest(){
    return new Promise((res,rej)=> setTimeout(rej,3000))
}