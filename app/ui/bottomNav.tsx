'use client'
import { BookmarkIcon, PlusCircleIcon, ChatBubbleLeftRightIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import BottomNavItem from "./navigation/bottomNavItem";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav(){
    const pathname = usePathname();
    if(pathname.startsWith('/create')) return 

    return (
        <div className="fixed left-0 bottom-0 w-full h-[4rem] flex flex-row items-center bg-[#333] min-h-[0]">
            <Link
            href={'/'}
            className="flex items-center justify-center size-full"
            >
            <BottomNavItem title='آگهی‌ها' />
            </Link>
            
            <Link 
            href={'#'}
            className="size-full"
            >
            <BottomNavItem icon={BookmarkIcon} title='نشان‌ها' />
            </Link>

            <Link 
            href={'/create'}
            className="size-full"
            >
            <BottomNavItem icon={PlusCircleIcon} title='ثبت آگهی' />
            </Link>
            
            <Link 
            href={'#'}
            className="size-full"
            >
            <BottomNavItem icon={ChatBubbleLeftRightIcon} title='چت' />
            </Link>

            <Link
            href={'/user'}
            className="size-full"
            >
            <BottomNavItem icon={UserCircleIcon} title='دیوار من' />
            </Link>
        </div>
    )
}