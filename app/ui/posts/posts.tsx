'use client';
import PostThumbnail from "./postThumbnail";
import { toPersianDigits } from "@/app/lib/utils";
import { useEffect, useRef, useState } from "react";
import { PostSkeleton } from "../skeletons";
import { postThumbnail } from "@/app/api/load-posts/feed/route";
import { createRoot } from "react-dom/client";

export default function Posts(){
    const [loadingState, setLoadingState] = useState< 'initial' | 'more' | undefined >('initial');
    const containerRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const [lastDate, setLastDate] = useState< string >();
    console.log('loading state: ', loadingState);

    useEffect(()=>{
        async function getLatestPosts(){
            console.log('getLatestPosts fn ran!')
            const res = await fetch('/api/load-posts/feed');
            const data = await res.json();

            appendPosts(data);
            setLoadingState(undefined);
        }
        if(loadingState != undefined) getLatestPosts();
    },[loadingState])


    useEffect(()=>{
        const observer = new IntersectionObserver((entries)=> {
            if(entries[0].isIntersecting){
                console.log('Observer callback ran!');
                setLoadingState('more');
            }
        })
        if(loadingState == undefined && sentinelRef.current) observer.observe(sentinelRef.current);
        
        return ()=> observer.disconnect();
    },[loadingState])
    

    function appendPosts(posts: postThumbnail[]){
        posts.forEach((post)=> {
            const wrapper = document.createElement('article');
            containerRef.current?.appendChild(wrapper);

            const perPrice = toPersianDigits(post.price);

            createRoot(wrapper).render(
                <PostThumbnail postId={post.postId} title={post.title} price={perPrice} district={post.district} thumbnail={post.thumbnail}/>
            )
        })
    }

    return (
        <main
        className="px-[0.875rem] mb-[5rem]"
        >
            <div
            ref={containerRef}
            >
            {loadingState === 'initial' && <PostSkeleton />}
            {/* {posts && posts.map((post, ind)=> {
                //Making the price a persian digit formatted string
                const perPrice = toPersianDigits(post.price);
                return <PostThumbnail postId={post.postId} title={post.title} price={perPrice} district={post.district} thumbnail={post.thumbnail} key={ind}/>
            })} */}
            </div>
            {loadingState == 'more' && <><PostSkeleton /><PostSkeleton /><PostSkeleton /></>}
            <div ref={sentinelRef} className="h-[1px] bg-[white]"></div>
        </main>
    )
}