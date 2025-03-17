import Link from "next/link";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";

export default function GoToLogin(){
    return (
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
    )
}