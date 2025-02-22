import { rubik } from "../ui/fonts";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Login(){
    return (
        <div>
            <h2 className={`${rubik.className} block top-[0] sticky w-full bg-[#333] p-[1rem] font-[700]`}>دیوار من</h2>
            <div className="p-[1.5rem]">
                <p>برای استفاده از تمام امکانات وارد حساب خود شوید.</p>
                <Link
                href={'/login'}
                >
                <div className="flex flex-row items-center m-[0.875rem]">
                    <ArrowLeftEndOnRectangleIcon className="size-6"/>
                    <p>ورود به حساب کاربری</p>
                </div>
                </Link>
            </div>
        </div>
    )
}