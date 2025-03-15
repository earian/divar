'use client';
import { ArrowRightIcon, BookmarkIcon, DocumentTextIcon, ShareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header(){
    const [isSaved, setIsSaved] = useState< boolean >(false);
    const router = useRouter();
    
    function handleNotesClick(){
      const element = document.getElementById('user-notes') as HTMLTextAreaElement;
      element.className = "w-[90%] mr-[0.825rem] bg-[#333] rounded-sm p-[0.235rem] resize-none";
      element.focus();
    }

    return (
        <>
        <div 
        className={`flex justify-between items-center px-[0.550rem] top-[0] sticky w-full font-[700] bg-[#333]`}
        >
            <div 
            className="flex justify-center items-center size-[3rem] rounded-[50%] ml-[0.125rem]" 
            onClick={()=> router.back()}>
                <ArrowRightIcon className="size-6"/>
            </div>
            <div 
            className="flex flex-row gap-[2rem] ml-[0.750rem]"
            >
                <BookmarkIcon 
                    className={`${isSaved && 'fill-[#d14757] stroke-[#d14757]'} size-5`}
                    onClick={()=> setIsSaved(!isSaved)}
                    /> 
                <DocumentTextIcon className="size-5" 
                    onClick={handleNotesClick}
                    />
                <ShareIcon className="size-5"/>
            </div>

        </div>
        </>
    )
}