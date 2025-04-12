import { NextRequest, NextResponse } from "next/server";
import { whois } from "@/app/lib/session";
import { fetchPost, fetchUserById } from "@/app/lib/data";


export async function GET(req: NextRequest, { params } : { params : Promise<{ slug: string }> }){
    const { slug : postId } = await params;
    const [userId, post] = await Promise.all([whois(), fetchPost(postId)]);
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
        return NextResponse.json({ info: { email: owner.email, phone: '+98 9121111111' }} as ResponseType);
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