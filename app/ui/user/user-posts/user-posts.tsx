'use client';

import { use } from "react";
import { useSearchParams } from "next/navigation";
import Post from "./post-card";

export default function Posts(props: {
    posts: Promise<{ postId: string, thumbnail: string, title: string, isActive: boolean }[]>
}){
    const allPosts = use(props.posts);
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab');
    let holder = allPosts;
    if(tab == 'active'){
        holder = allPosts.filter((p)=> p.isActive);
    }else if(tab == 'not-active'){
        holder = allPosts.filter(p=> !p.isActive);
    }
    

    return(
        <>
        {holder.map((post,ind) =>
            <Post info={post} key={post.postId}/>
            )}
        </>

    )
}