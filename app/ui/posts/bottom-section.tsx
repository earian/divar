import { useEffect, useState } from "react";
import Button from "./button";
import { BottomLoader } from "./posts-skeletons";
import { ResponseType } from "@/app/api/vp/[slug]/route";
import { deletePostById } from "@/app/lib/actions";

export default function Bottom(props: {
    postId: string | null,
}){
    const [state, setState] = useState< state | undefined >(undefined);
    let buttonVals = ['چت','اطلاعات تماس'];
    //if(userState) buttonVals = ['ویرایش','حذف آگهی'];
    
    useEffect(()=>{
        async function getOwner(){
            const res = await fetch(`/api/vp/${props.postId}`);
            if(!res.ok) throw new Error('Data is not valid! :(')
            const data = await res.json() as ResponseType;
            if(data.isOwner) {
                setState({ userState: 'owner' });
            } else if(data.info){
                setState({ userState: 'user', info: data.info })
            } else {
                setState({ userState: 'unknown' })
            }
        }
        getOwner()
    },[])

    if(!state || state.userState == undefined) return <BottomLoader />

    return (
        <div
        className="fixed w-full flex flex-row justify-around bg-[#333] bottom-0 left-0 py-[0.525rem]"
        >
            {state?.userState == 'owner' &&
            <>
                <Button value='ویرایش' action={()=> alert('Editing')}/>
                <Button value='حذف آگهی' action={()=> deletePostById(props.postId)}/>
            </>
            }
            {state?.userState == 'user' &&
            <>
                <Button value='چت' action={()=> alert('Chatting!')}/>
                <Button value='اطلاعات تماس' action={()=> alert(`email: ${state.info?.email}, phone: ${state.info?.phone}`)}/>
            </>
            }
            {state?.userState == 'unknown' &&
            <>
                <Button value='چت' action={()=> alert('Login First!')}/>
                <Button value='اطلاعات تماس' action={()=> alert('Login First!')}/>
            </>
            }
        </div>
    )
}

interface state {
    userState: 'owner' | 'user' | 'unknown',
    info?: {
        email: string,
        phone: string,
    }
}