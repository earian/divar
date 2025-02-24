import Image from "next/image";
import { rubik } from "../fonts";

export default async function PostThumbnail(props: {
    title: string;
    price: string;
    location: string;
    thumbnail?: string;
}){
    return (
        <div className="flex flex-row justify-between items-start p-[1rem] border-b-[1px] border-[#333]">
            <div className="flex flex-col h-[150px] justify-between p-[0.350rem]">
                <h3 className={`${rubik.className} font-[700] text-[1.120rem]`}>{props.title}</h3>
                <div>
                    <p><span className="ml-[0.425rem]">{props.price}</span>تومان</p>
                    <p>{`در ${props.location}`}</p>
                </div>
            </div>
            <Image 
            src={props.thumbnail || '/poster/thumbnail-placeholder.avif'}
            width={100}
            height={100}
            alt="selling house"
            className="rounded-[0.450rem] w-[150px] h-[150px]"
            />
        </div>
    )
}