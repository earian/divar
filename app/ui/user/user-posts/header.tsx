'use client'
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function Header(){
    const router = useRouter();

    return (
        <>
        <div className={`flex justify-start items-center p-[0.750rem] top-[0] sticky w-full border-b border-[gray] font-[700] bg-[#242424] mb-[0.875rem] z-[1040]`}>
            <div className="flex justify-center items-center size-[3rem] rounded-[50%] ml-[0.125rem]" onClick={()=> router.back()}><ArrowRightIcon className="size-6"/></div>
            <h2>آگهی‌های من</h2>
        </div>
        </>
    )
}