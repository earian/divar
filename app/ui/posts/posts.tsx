'use client';
import PostThumbnail from "./postThumbnail";
import { toPersianDigits } from "@/app/lib/utils";
import { useEffect, useRef, useState } from "react";
import { PostSkeleton } from "../skeletons";
import { postThumbnail } from "@/app/api/load-posts/feed/[slug]/route";
import { createRoot } from "react-dom/client";

export default function Posts(){
    const [loadingState, setLoadingState] = useState< 'initial' | 'more' | 'no-more' | undefined >('initial');
    const containerRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const [lastDate, setLastDate] = useState< string >();

    useEffect(()=>{
        let ignore = false;
        async function getLatestPosts(){
            const res = await fetch(`/api/load-posts/feed/${lastDate && lastDate}`);
            const { data, noMore } = await res.json();
            if(data){
                if(ignore) return; //This is for the cleanup function of the useEffect hook
                setLastDate(data[data.length - 1].date);
                //setPosts((prev)=> [...prev, ...data])
                appendPosts(data);
                if(noMore) {
                    setLoadingState('no-more')//if there is no more posts left to shown switch the state to 'no-more'
                    return
                }
                setLoadingState(undefined);
            } else if(noMore) {
                setLoadingState('no-more');
            }
        }
        if(loadingState == 'initial' || loadingState == 'more') getLatestPosts();
        return () => { ignore = true }
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
            </div>
            {loadingState == 'more' && <><PostSkeleton /><PostSkeleton /><PostSkeleton /></>}
            <div ref={sentinelRef} className="h-[1px]"></div>
        </main>
    )
}