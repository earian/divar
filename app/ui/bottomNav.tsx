'use client'
import { BookmarkIcon, PlusCircleIcon, ChatBubbleLeftRightIcon, UserCircleIcon, NewspaperIcon } from "@heroicons/react/24/outline";
import BottomNavItem from "./navigation/bottomNavItem";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const disabledPaths = ['/create','/p/'];

export default function BottomNav(){
    const pathname = usePathname();
    console.log('pathname: ',pathname)
    const isDisabled = disabledPaths.some((path)=> pathname.startsWith(path));
    if(isDisabled) return 
    const [activeIndex, setActiveIndex] = useState< 0 | 1 | 2 | 3 | 4 >();
    useEffect(()=>{
        switch(pathname){
            case '/':
                setActiveIndex(0);
                break;
            case '/user':
                setActiveIndex(4);
                break;
            default:
                setActiveIndex(undefined)
                break;
        }
    },[pathname])

    return (
        <div className="fixed left-0 bottom-[-5px] w-full h-[4rem] flex flex-row items-center bg-[#333] min-h-[0] z-[300]">
            <Link
            href={'/'}
            className="size-full"
            >
            <BottomNavItem icon={NewspaperIcon} title='آگهی‌ها' isActive={activeIndex == 0}/>
            </Link>
            
            <Link 
            href={'#'}
            className="size-full"
            >
            <BottomNavItem icon={BookmarkIcon} title='نشان‌ها' isActive={activeIndex == 1}/>
            </Link>

            <Link 
            href={'/create'}
            className="size-full"
            >
            <BottomNavItem icon={PlusCircleIcon} title='ثبت آگهی' isActive={activeIndex == 2}/>
            </Link>
            
            <Link 
            href={'#'}
            className="size-full"
            >
            <BottomNavItem icon={ChatBubbleLeftRightIcon} title='چت' isActive={activeIndex == 3}/>
            </Link>

            <Link
            href={'/user'}
            className="size-full"
            >
            <BottomNavItem icon={UserCircleIcon} title='دیوار من' isActive={activeIndex == 4}/>
            </Link>
        </div>
    )
}