'use client';
import Link from "next/link";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useState, useOptimistic, useTransition } from "react";
//no issue with the toggling for database
import { togglePostActivation } from "@/app/lib/actions";


export default function Post(props: {
    info: { postId: string, thumbnail: string, title: string, isActive: boolean }
}){
    const [isActive, setIsActive] = useState(props.info.isActive);
    const [optimisticActive, setOptimisticActive] = useOptimistic(isActive);
    const [pending, startTransition] = useTransition();
    

    async function handleActivationClick(){
        startTransition(async ()=>{
            setOptimisticActive(!isActive);
            try{
                await togglePostActivation(props.info.postId);
                setIsActive(!isActive);
            }catch(err){
                console.log(err);
            }
        })
    }


    return (
        <Link
            href={`/p/${props.info.postId}`}
            className="block relative flex flex-row p-[1rem] bg-[#333] mb-[0.560rem]"
            key={props.info.postId}
            >
                <Image
                src={props.info.thumbnail}
                width={100}
                height={100}
                alt=""
                className="float-right ml-[0.560rem] aspect-square"
                />
                
                <h2>{props.info.title}</h2>
                

                <div
                className="flex space-around h-[fit-content] mr-[auto] mt-[auto]"
                onClick={(e)=> {
                    e.stopPropagation()
                    e.preventDefault()
                }}
                >
                    <span
                    className="p-[0.235rem] hover:bg-[gray] hover:rounded-md"
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