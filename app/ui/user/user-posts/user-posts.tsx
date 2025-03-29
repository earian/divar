'use client';
import Link from "next/link";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
import { use } from "react";

export default function Posts(props: {
    posts: Promise<{ postId: string, thumbnail: string, title: string }[]>
}){
    const allPosts = use(props.posts);

    return(
        <>
        {allPosts.map((post,ind) =>
            <Link
            href={`/p/${post.postId}`}
            className="block relative flex flex-row p-[1rem] bg-[#333] mb-[0.560rem]"
            key={post.postId}
            >
                <Image
                src={post.thumbnail}
                width={100}
                height={100}
                alt=""
                className="float-right ml-[0.560rem] aspect-square"
                />
                
                <h2>{post.title}</h2>
                
                <div 
                className="absolute inline-block p-[0.235rem] left-[1rem] bottom-[1rem] hover:bg-[gray] hover:rounded-md"
                
                >
                    <TrashIcon className="size-6"/>
                </div>
            </Link>
            )}
            {allPosts.map((post,ind) =>
            <Link
            href={`/p/${post.postId}`}
            className="block relative flex flex-row p-[1rem] bg-[#333] mb-[0.560rem]"
            key={post.postId}
            >
                <Image
                src={post.thumbnail}
                width={100}
                height={100}
                alt=""
                className="float-right ml-[0.560rem] aspect-square"
                />
                
                <h2>{post.title}</h2>
                
                <div 
                className="absolute inline-block p-[0.235rem] left-[1rem] bottom-[1rem] hover:bg-[gray] hover:rounded-md"
                
                >
                    <TrashIcon className="size-6"/>
                </div>
            </Link>
            )}
        </>

    )
}