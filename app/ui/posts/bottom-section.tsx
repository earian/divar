import { useEffect, useState } from "react";
import Button from "./button";
import { BottomLoader } from "./posts-skeletons";
import { ResponseType } from "@/app/api/vp/[slug]/route";

export default function Bottom(props: {
    postId: string | null,
    deleteConfirmation: Function,
    contactInfo: Function,
    showLogin: Function,
}){
    const [state, setState] = useState< State | undefined >(undefined);
    
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
                <Button value='حذف آگهی' action={()=> props.deleteConfirmation(true)}/>
            </>
            }
            {state?.userState == 'user' &&
            <>
                <Button value='چت' action={()=> alert('Chatting!')}/>
                <Button value='اطلاعات تماس' action={()=> props.contactInfo(state.info)}/>
            </>
            }
            {state?.userState == 'unknown' &&
            <>
                <Button value='چت' action={()=> props.showLogin(true)}/>
                <Button value='اطلاعات تماس' action={()=> props.showLogin(true)}/>
            </>
            }
        </div>
    )
}
type State = 
{ userState: 'owner' | 'unknown' } |
{ userState: 'user', info: { email: string, phone: string }}