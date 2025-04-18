import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Images(props: {
    thumbnail: string,
    gallery: string,
}){
    const [currentIndex, setCurrentIndex] = useState(0);
    const galleryArr : string[] = [props.thumbnail]
    const otherImages : string[] = JSON.parse(props.gallery);
    if(otherImages && otherImages.length) galleryArr.push(...otherImages);

    function goNext(){
        setCurrentIndex((prev)=> prev + 1);
    }
    function goPrev(){
        setCurrentIndex((prev)=> prev - 1);
    }
    if(!props.thumbnail) return

    return (
        <div
        className="relative w-full max-w-lg mx-auto aspect-square overflow-hidden"
        >
            <div
            className="flex flex-row h-full transition-transform duration-500 ease-in-out"
            style={{
                transform: `translateX(${(currentIndex / galleryArr.length) * 100}%)`,
                width: `${galleryArr.length * 100}%`,
            }}
            >
                {galleryArr.map((link, ind)=>(
                    <div
                    key={ind}
                    className="size-full flex justify-center items-center"
                    >
                        <img 
                        key={ind}
                        src={link}
                        alt={`Slide ${ind + 1}`}
                        className="h-full max-w-[100%]"
                        />
                    </div>
                    
                ))}
            </div>
            
            {galleryArr.length > 1 &&
                <>
                    <button
                        className={`absolute h-full w-[15%] bg-[gray] top-0 right-0 ${currentIndex == 0 ? 'opacity-[0.2]' : 'opacity-[0.4]'}`}
                        type="button"
                        disabled={currentIndex == 0}
                        onClick={goPrev}
                    ><ChevronRightIcon className="size-6 text-black mx-auto" /></button>

                    <button
                        className={`absolute h-full w-[15%] bg-[gray] top-0 left-0 ${currentIndex == galleryArr.length - 1 ? 'opacity-[0.2]' : 'opacity-[0.4]'}`}
                        type="button"
                        disabled={currentIndex == galleryArr.length - 1}
                        onClick={goNext}
                    ><ChevronLeftIcon className="size-6 text-black mx-auto" /></button>
                </>
            }
            
        </div>
    )
}