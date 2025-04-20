import { NextRequest, NextResponse } from "next/server";
import { fetchLatestPosts } from "@/app/lib/data";

export async function GET(req: NextRequest){
    const posts = await fetchLatestPosts() as postThumbnail[];
    if(posts) return NextResponse.json(posts);
    return NextResponse.json({ success: false })
}

export type postThumbnail = {
    title: string,
    price: number,
    district: string | '',
    thumbnail?: string,
    postId: string,
    date?: string,
}