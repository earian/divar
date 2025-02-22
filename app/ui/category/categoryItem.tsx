import Image from "next/image";
import { rubik } from "../fonts";

export default function CategoryItem(props: {
    imageUrl: string,
    title: string,
}){
    return (
        <div className="w-[5rem] h-[5rem] flex flex-col items-center">
            <Image 
            src={props.imageUrl}
            width={50}
            height={50}
            alt="real-estate picture"
            />
            <p className={`${rubik.className} text-[0.658rem] font-[700] text-[hsla(0, 0%, 100%, 0.56)]`}>{props.title}</p>
        </div>
    )
}