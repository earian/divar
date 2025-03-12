export default function Button(props: {
    value: string
}){
    return (
        <button
        className="rounded-md border-[2px] border-[#333] py-[0.575rem] w-[45%] bg-[#d14757] text-[#242424] text-[1rem] font-bold"
        >{props.value}</button>
    )
}