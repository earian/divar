import { NextRequest, NextResponse } from "next/server";
import { whois } from "@/app/lib/session";
import { fetchPost, fetchUserById } from "@/app/lib/data";


export async function GET(req: NextRequest, { params } : { params : Promise<{ slug: string }> }){
    const { slug : creatorId } = await params;
    const [userId, post] = await Promise.all([whois(), fetchPost(creatorId)]);
    console.log('user id: ', userId);
    console.log('post: ', post);
    if(!userId) {
        console.log('No user is logged in.');
        return NextResponse.json({ isLoggedIn: false } as ResponseType);
    }
    if(userId === post.creator){
        //The post is from the user that logged in
        return NextResponse.json({ isOwner: true } as ResponseType);
    }
    if(userId != post.creator){
        const owner = await fetchUserById(post.creator);
        return NextResponse.json({ info: { email: owner.email, phone: '+989121111111' }} as ResponseType);
    }
}

export interface ResponseType
{
    isLoggedIn?: true | false,
    isOwner?: true | false,
    info?: {
        phone: string,
        email: string,
    }
}