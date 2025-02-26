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