'use client';
import { use, useReducer } from "react";
import { useSearchParams } from "next/navigation";
import Post from "./post-card";
import { ExclamationTriangleIcon, FireIcon } from "@heroicons/react/24/outline";

export default function Posts(props: {
    posts: Promise<{ postId: string, thumbnail: string, title: string, isActive: boolean }[]>
}){
    const allPosts = use(props.posts);
    const [posts, dispatch] = useReducer(reducer, allPosts);
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
        </>

    )
}

function reducer(posts: { postId: string, thumbnail: string, title: string, isActive: boolean }[], action: actionType){
    switch(action.type){
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
 { type: 'activation', post: { postId: string, thumbnail: string, title: string, isActive: boolean } }