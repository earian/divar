'use client';
import { ArrowRightIcon, BookmarkIcon, DocumentTextIcon, ShareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function Header(){
    const router = useRouter();

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
                <BookmarkIcon className="size-5"/>
                <DocumentTextIcon className="size-5"/>
                <ShareIcon className="size-5"/>
            </div>

        </div>
        </>
    )
}