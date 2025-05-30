import { fetchPostsByUserId } from "@/app/lib/data";
import { whois } from "@/app/lib/session"
import { redirect } from "next/navigation";
import Posts from "@/app/ui/user/user-posts/user-posts";
import Header from "@/app/ui/user/user-posts/header";
import { Suspense } from "react";
import Filter from "@/app/ui/user/user-posts/posts-filter";

export default async function Page(){
    const userId = await whois();
    if(!userId) redirect('/user');
    const posts = fetchPostsByUserId(userId);
    

    return (
        <>
        <Header />
        <Filter />
        <main
        className="px-[0.235rem]"
        >
            <Suspense fallback={<div>در حال پردازش...</div>}>
                <Posts userId={userId} posts={posts}/>
            </Suspense>
        </main>
        </>
    )
}