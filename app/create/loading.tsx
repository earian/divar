import { rubik } from "../ui/fonts"
import Header from "../ui/navigation/create-header";
import Loader from "../ui/spin-loader";

export default function Page(){
    return(
        <div 
        className={`${rubik.className}`}
        >
            <Header />
            <div
            className="flex justify-center mt-[1.3rem]"
            >
                <Loader />
            </div>
        </div>
    )
}