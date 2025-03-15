//Loading Animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function BottomLoader(){
    return (
        <div
        className="fixed w-full flex flex-row justify-around bg-[#333] bottom-0 left-0 py-[0.525rem]"
        >
         <LoadingButtons />
         <LoadingButtons />   
        </div>
    )
}

function LoadingButtons(){
    return (
        <button
        className={`${shimmer} relative overflow-hidden rounded-md border-[2px] border-[#333] py-[0.575rem] w-[45%] h-[2.899rem] bg-[#d14757] text-[#242424] text-[1rem] font-bold`}
        ></button>
    )
}

export function CategoryLoader(){
    return (
        <div
        className={`${shimmer} relative overflow-hidden bg-[#333] w-[7rem] h-[1.4rem] rounded-md my-[0.875rem] mr-[1.2rem]`}
        >
        </div>
    )
}