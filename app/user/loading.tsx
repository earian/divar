import { rubik } from "../ui/fonts";
import Loader from "../ui/spin-loader";


export default function Page(){
    return (
        <div>
            <h2 className={`${rubik.className} block top-[0] sticky w-full bg-[#333] p-[1rem] font-[700]`}>دیوار من</h2>
            <div
            className="flex justify-center mt-[2rem]"
            >
                <Loader />
            </div>
        </div>
    )
}