export default function Button(props: {
    value: string,
    action: Function,
}){
    return (
        <button
        className="rounded-md border-[2px] border-[#333] py-[0.575rem] w-[45%] bg-[#d14757] text-[#242424] text-[1rem] font-bold"
        onClick={()=> props.action()}
        >{props.value}</button>
    )
}