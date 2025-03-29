'use client'
import { rubik } from "../fonts";

export default function BottomNavItem(props: {
    icon: any;
    title: string;
    isActive: true | false;
}){
    return (
        <div className="flex flex-col items-center justify-center">
            <props.icon className={`size-6 w-full ${props.isActive && 'stroke-[#d14757]'}`}/>
            <p className={`${rubik.className} font-[700] text-[.775rem] ${props.isActive && 'text-[#d14757]'}`}>{props.title}</p>
        </div>
    )
}