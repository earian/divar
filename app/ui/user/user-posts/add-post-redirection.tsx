import Link from "next/link";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";

export default function AddPost(){
    return (
        <div
        className="w-[fit-content] mx-auto text-center"
        >
            <h4 className="font-bold">آگهی‌ای برای نمایش وجود ندارد.</h4>
            <button type="button" className="border border-[#3B82F6] w-[fit-content] px-[0.875rem] py-[0.345rem] my-[0.635rem] bg-[#3B82F6] rounded-md">
                <DocumentPlusIcon className="size-6 float-right stroke-[#023020]" />
                <Link 
                    href={'/create'}
                    className="text-[#023020]"
                >افزودن آگهی</Link>
            </button>
        </div>
    )
}