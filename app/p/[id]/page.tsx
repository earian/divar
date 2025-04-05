'use client'
import Header from "@/app/ui/posts/post-header";
import Images from "@/app/ui/posts/post-images";
import Table from "@/app/ui/posts/info-table";
import Bottom from "@/app/ui/posts/bottom-section";
import Category from "@/app/ui/posts/post-category";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Load from "./loading";
import { Post } from "@/app/lib/definitions";


export default function Page(){
    const { id } = useParams();
    const [post, setPost] = useState< Post | undefined >();
    
    useEffect(()=>{
        async function getPost(){
            try{
                const res = await fetch(`/api/posts/${id}`)
                //console.log("fetch result: ", res);
                if(!res.ok) throw new Error("Failed to fetch the post.")

                const postJson = await res.json() as Post;
                //console.log('Post Json: ', postJson)
                setPost(postJson);
            }catch(err){
                console.log(err)
            }
        }
        getPost()
    },[])

    if(post === undefined) return <Load />


    return (
        <div 
        className="mb-[8rem]"
        >
            <Header />
            <Images thumbnail={post.thumbnail}/>
            <Category value={post.category} />
            <h2
            className="block text-[1.6rem] font-bold mr-[0.850rem]"
            >
            {post.title}
            </h2>
            <p
                className="mr-[0.850rem] mb-[0.850rem]"
            ><span>۱۰ ساعت پیش</span> در تهران، <span>{post.district}</span></p>
            <textarea name="user-notes" id="user-notes" 
            placeholder="یادداشت شما..."
            className="hidden w-[90%] mr-[0.825rem] mb-[0.825rem] bg-[#333] rounded-sm p-[0.235rem] resize-none"
            rows={5}
            ></textarea>
            <Table price={post.price}/>
            {post.description.length != 0 &&
                <section className="p-[0.875rem]">
                    <h3 className="block text-[1.4rem] font-bold">توضیحات</h3>
                    <p>{ post.description }</p>
                </section>
            }
                <Bottom postId={post.postId}/>
        </div>
    )
}