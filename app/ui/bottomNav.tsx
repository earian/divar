import { BookmarkIcon, PlusCircleIcon, ChatBubbleLeftRightIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import BottomNavItem from "./navigation/bottomNavItem";
import Link from "next/link";

export default function BottomNav(){
    return (
        <div className="fixed left-[0] bottom-[0] w-full h-[3rem] flex flex-direction-row justify-around bg-[#333] min-h-[0]">
            <Link
            href={'/'}
            className="flex items-center justify-center"
            >
            <BottomNavItem title='آگهی‌ها' />
            </Link>
            
            <BottomNavItem icon={BookmarkIcon} title='نشان‌ها' />
            
            <Link 
            href={'/create'}
            >
            <BottomNavItem icon={PlusCircleIcon} title='ثبت آگهی' />
            </Link>
            
            <BottomNavItem icon={ChatBubbleLeftRightIcon} title='چت' />
            
            <Link
            href={'/user'}
            >
            <BottomNavItem icon={UserCircleIcon} title='دیوار من' />
            </Link>
        </div>
    )
}