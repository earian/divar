//Loading Animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CategorySkeleton(){
    return (
        <div className={`${shimmer} relative m-[0.785rem] overflow-hidden w-[5rem] h-[5rem] flex flex-col items-center gap-[0.235rem] p-2 shadow-sm rounded-md`}>
            <div 
            className={`w-[4rem] h-[4rem] bg-[#333] rounded-md z-[2]`}
            ></div>
            <p className={`w-[50%] h-[1rem] bg-[#333] rounded-md z-[2]`}></p>
        </div>
    )
}

export function PostSkeleton(){
    return (
        <div className={`${shimmer} rounded-md flex flex-row justify-between items-start p-[1rem] relative overflow-hidden`}>
            <div className="flex flex-col h-[100px] justify-between p-[0.350rem]">
                <h3 className={`w-[12rem] h-[1.5rem] bg-[#333] z-[2] rounded-md`}></h3>
                <div className="w-[8rem] h-[1rem] bg-[#333] z-[2] rounded-md"></div>
            </div>
            <div
            className="size-[7rem] bg-[#333] rounded-md z-[2] float-left"
            ></div>
        </div>
    )
}