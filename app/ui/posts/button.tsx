export default function Button(props: {
    value: string,
    action: Function,
    disabled?: true | false,
    classNames?: string,
    type?: "button" | "submit" | "reset",
    tabIndex?: number,
}){
    return (
        <button
        type={props.type || 'button'}
        className={`${props.classNames && props.classNames} rounded-md border-[2px] border-[#333] py-[0.575rem] w-[45%] bg-[#d14757] text-[#242424] text-[1rem] font-bold`}
        onClick={(e)=> props.action(e)}
        disabled={props.disabled || false}
        tabIndex={props.tabIndex}
        >{props.value}</button>
    )
}