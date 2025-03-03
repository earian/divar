'use client'
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function Header(){
    const router = useRouter();

    return (
        <>
        <div className={`flex justify-start items-center p-[0.750rem] top-[0] sticky w-full border-b border-[#333] font-[700] bg-[#242424]`}>
            <div className="flex justify-center items-center size-[3rem] rounded-[50%] ml-[0.125rem]" onClick={()=> router.back()}><ArrowRightIcon className="size-6"/></div>
            <h2 >ثبت آگهی</h2>
        </div>
        </>
    )
}