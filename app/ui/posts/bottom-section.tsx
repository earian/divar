import { useEffect, useState } from "react";
import Button from "./button";
import { BottomLoader } from "./posts-skeletons";

export default function Bottom(props: {
    creator: string | null,
}){
    const [isOwner, setIsOwner] = useState< true | false | undefined >(undefined);
    let buttonVals = ['چت','اطلاعات تماس'];
    if(isOwner) buttonVals = ['ویرایش','حذف آگهی'];
    
    useEffect(()=>{
        async function getOwner(){
            const res = await fetch(`/api/vp/${props.creator}`);
            if(!res.ok) throw new Error('Data is not valid! :(')
            const data = await res.json();
            setIsOwner(data.success);
        }
        getOwner()
    },[])

    if(isOwner == undefined) return <BottomLoader />

    return (
        <div
        className="fixed w-full flex flex-row justify-around bg-[#333] bottom-0 left-0 py-[0.525rem]"
        >
            <Button value={buttonVals[0]} />
            <Button value={buttonVals[1]} />
        </div>
    )
}