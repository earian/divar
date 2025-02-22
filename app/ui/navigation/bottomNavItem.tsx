import { rubik } from "../fonts";

export default function BottomNavItem(props: {
    icon?: any;
    title: string;
}){
    return (
        <div className="flex flex-col place-content-center">
            {props.icon && <props.icon className="size-6 w-full"/>}
            <p className={`${rubik.className} font-[700] text-[.775rem]`}>{props.title}</p>
        </div>
    )
}