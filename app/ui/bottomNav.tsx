'use client'
import { BookmarkIcon, PlusCircleIcon, ChatBubbleLeftRightIcon, UserCircleIcon, NewspaperIcon } from "@heroicons/react/24/outline";
import BottomNavItem from "./navigation/bottomNavItem";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const disabledPaths = ['/create','/p/'];
const enablePaths = ['/','/user'];

export default function BottomNav(){
    const pathname = usePathname();
    const isEnable = enablePaths.some((path) => pathname === path);
    
    //Temporary solution for SSR and CSR missmatch.
    const [isClient, setIsClient] = useState(false);
    useEffect(()=>{
        setIsClient(true)
    },[])
    
    if(!isEnable) return 

    return (
        <div className="fixed left-0 bottom-[-5px] w-full h-[4rem] flex flex-row items-center bg-[#333] min-h-[0] z-[300]">
            <Link
            href={'/'}
            className="size-full"
            >
            <BottomNavItem icon={NewspaperIcon} title='آگهی‌ها' isActive={isClient && pathname === '/'}/>
            </Link>
            
            <Link 
            href={'#'}
            className="size-full"
            >
            <BottomNavItem icon={BookmarkIcon} title='نشان‌ها' isActive={false}/>
            </Link>

            <Link 
            href={'/create'}
            className="size-full"
            >
            <BottomNavItem icon={PlusCircleIcon} title='ثبت آگهی' isActive={false}/>
            </Link>
            
            <Link 
            href={'#'}
            className="size-full"
            >
            <BottomNavItem icon={ChatBubbleLeftRightIcon} title='چت' isActive={false}/>
            </Link>

            <Link
            href={'/user'}
            className="size-full"
            >
            <BottomNavItem icon={UserCircleIcon} title='دیوار من' isActive={isClient && pathname === '/user'}/>
            </Link>
        </div>
    )
}