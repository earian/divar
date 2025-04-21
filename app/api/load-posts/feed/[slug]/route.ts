import { NextRequest, NextResponse } from "next/server";
import { fetchLatestPosts } from "@/app/lib/data";

export async function GET(req: NextRequest, { params } : { params: Promise<{ slug: string | undefined }> }){
    const lastDate = (await params).slug;
    const posts = lastDate 
                    ? await fetchLatestPosts(lastDate) as postThumbnail[] 
                    : await fetchLatestPosts() as postThumbnail[];

    if(!posts || posts.length == 0) return NextResponse.json({ noMore: true })
    else if(posts.length < 5) return NextResponse.json({ data: posts, noMore: true })
    if(posts) return NextResponse.json({ data: posts });
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