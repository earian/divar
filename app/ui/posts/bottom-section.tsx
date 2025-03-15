import { whois } from "@/app/lib/user-actions"
import Button from "./button"

export default async function Bottom(props: {
    creator: string,
}){
    let buttonVals = [];
    const userId = await whois();
    if(userId == props.creator){
        buttonVals = ['ویرایش','حذف آگهی'];
    }else {
        buttonVals = ['چت','اطلاعات تماس'];
    }

    return (
        <div
        className="fixed w-full flex flex-row justify-around bg-[#333] bottom-0 left-0 py-[0.525rem]"
        >
            <Button value={buttonVals[0]} />
            <Button value={buttonVals[1]} />
        </div>
    )
}