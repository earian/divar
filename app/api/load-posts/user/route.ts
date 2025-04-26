import { fetchPostsByUserId } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const { userId, lastDate } = await req.json();
    //console.log('Api endpoint logs: ', userId, lastDate)
    const data = await fetchPostsByUserId(userId, lastDate);
    if(data){
        if(data.length < 5){
            return NextResponse.json({ data: data, noMore: true});
        }
        return NextResponse.json({ data });
    } else {
        return NextResponse.json({ noMore: true })
    }
}