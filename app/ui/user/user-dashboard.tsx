'use client';
import { User } from "@/app/lib/definitions"
import { UserIcon, DocumentDuplicateIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline"
import { useTransition } from "react";
import { signOut } from "@/app/lib/user-actions";

export default function Dashboard(props: {
    user: User,
}){
    const [isPending, startTransition] = useTransition();
    
    function handleSignOutClick(){
        startTransition(async ()=> {
           await signOut()
        })
    }

    return (
        <main
        className="p-[1rem]"
        >
            <section className="border-b border-[#333] py-[0.5rem] px-[1rem]">
                <div
                className="flex flex-row gap-[0.875rem] items-center"
                >
                    <UserIcon className="size-6 stroke-2" />
                    <p className="font-bold text-[1.2rem]">کاربر</p>
                </div>
                <p className="mr-[2.5rem] font-light text-[1rem]">{props.user['name(per)']}</p>
            </section>
            <div 
            className="flex flex-row gap-[0.875rem] items-center py-[0.5rem] px-[1rem] h-[3.5rem]"
            onClick={()=> window.location.href = '/user/my-posts'}
            >
                <DocumentDuplicateIcon className="size-6" />
                <p>آگهی‌های من</p>
            </div>
            <section className="border-y border-[#333] py-[0.5rem] px-[1rem]">
                <button 
                onClick={handleSignOutClick}
                className="flex flex-row items-center gap-[0.875rem]"
                >
                    <i><ArrowRightStartOnRectangleIcon className="size-6"/></i>
                    <p>خروج</p>
                </button>
            </section>
        </main>
    )
}