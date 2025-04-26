'use client';
import { use, useReducer, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Post from "./post-card";
import { ExclamationTriangleIcon, FireIcon } from "@heroicons/react/24/outline";

export default function Posts(props: {
    userId: string,
    posts: Promise<{ postId: string, thumbnail: string, title: string, isActive: boolean, date: string }[]>,
}){
    const initialPosts = use(props.posts);
    const [posts, dispatch] = useReducer(reducer, initialPosts);
    const [lastDate, setLastDate] = useState(initialPosts[initialPosts.length - 1].date);
    const [noMore, setNoMore] = useState< boolean >(false);

    async function handleLoadMore(){
        const body = { userId: props.userId, lastDate: lastDate }
        const res = await fetch('/api/load-posts/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const { data, noMore } = await res.json();
        if(noMore) setNoMore(true);
        if(data && data.length) {
            setLastDate(data[data.length - 1].date);
            dispatch({ type: 'add', postsArr: data})
        }
    }
    
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab');
    let holder = posts;
    if(tab == 'active'){
        holder = posts.filter((p)=> p.isActive);
    }else if(tab == 'not-active'){
        holder = posts.filter(p=> !p.isActive);
    }
    if(holder.length == 0 && tab == 'active') { 
        return <div><ExclamationTriangleIcon className="size-8 mx-[auto]"/></div>
    }
    if(holder.length == 0 && tab == 'not-active') { 
        return <div><FireIcon className="size-8 mx-[auto]"/></div>
    }

    return(
        <>
        {holder.map((post,ind) =>
            <Post post={post} dispatch={dispatch} key={post.postId}/>
            )}
        { !noMore && <button 
                        type="button" 
                        className="block border border-[#333] py-[0.345rem] px-[1.875rem] bg-[#d14757] text-[#242424] mx-auto my-[1rem]"
                        onClick={handleLoadMore}
                        >ادامه
                        </button> 
        }
        </>

    )
}

function reducer(posts: { postId: string, thumbnail: string, title: string, isActive: boolean, date: string }[], action: actionType){
    switch(action.type){
        case 'add':{
            return [...posts, ...action.postsArr];
        }
        case 'activation': {
            return posts.map(p => {
                if(p.postId == action.post?.postId){
                    return action.post;
                } else {
                    return p;
                }
            })
        }
        case 'delete': {
            return posts.filter(p => p.postId != action.postId)
        }
        default:
         return posts       
    }
}

type actionType =
 { type: 'delete', postId: string,} | 
 { type: 'activation', post: { postId: string, thumbnail: string, title: string, isActive: boolean, date: string } } |
 { type: 'add', postsArr: { postId: string, thumbnail: string, title: string, isActive: boolean, date: string }[] }