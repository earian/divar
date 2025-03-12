'use client'
import { BookmarkIcon, PlusCircleIcon, ChatBubbleLeftRightIcon, UserCircleIcon, NewspaperIcon } from "@heroicons/react/24/outline";
import BottomNavItem from "./navigation/bottomNavItem";
import Link from "next/link";
import { usePathname } from "next/navigation";

const disabledPaths = ['/create','/p/'];

export default function BottomNav(){
    const pathname = usePathname();
    const isDisabled = disabledPaths.some((path)=> pathname.startsWith(path));
    if(isDisabled) return 

    return (
        <div className="fixed left-0 bottom-[-5px] w-full h-[4rem] flex flex-row items-center bg-[#333] min-h-[0] z-[300]">
            <Link
            href={'/'}
            className="size-full"
            >
            <BottomNavItem icon={NewspaperIcon} title='آگهی‌ها' />
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