import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { rubik } from "./fonts";

export default function Search(props: {
    placeholder?: string;
}){
    return (
        <div className='flex items-center bg-stone-900 w-full h-10 rounded-[5px] border-[0.5px] border-[hsla(0, 0%, 100%, 0.32)] border-solid'>
            <form action="" className='relative h-full bg-transparent w-[80%]'>
                <input type="text" name="search" placeholder={props.placeholder} className='w-full h-full bg-transparent p-[.5rem] outline-none text-[1.225rem]'/>
                <MagnifyingGlassIcon className='size-5 m-auto absolute left-1 top-[50%] bottom-[50%]' />
            </form>
            <div className="w-[0.5px] h-[55%] bg-[#828282] m-[0.65rem]"></div>
            <div className="flex justify-center items-center h-full">
                <p className={`${rubik.className} font-bold text-[hsla(0, 0%, 100%, 0.56)]`}>تهران</p>
                <MapPinIcon className="size-4" />
            </div>
        </div>
    )
}