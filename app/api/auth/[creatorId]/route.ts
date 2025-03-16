import { NextRequest, NextResponse } from "next/server";
import { whois } from "@/app/lib/user-actions";

export async function GET(req: NextRequest, { params } : { params : { creatorId: string } }){
    //getting the logged in user id & creator id with parallel requests 😎
    const [userId, creatorId] = await Promise.all([whois(), params?.creatorId]);
    if(!userId) {
        console.log('No user is logged in.');
        return NextResponse.json({ success: false })
    }
    if(!creatorId || creatorId == null){
        console.log('The post has no Creator!')
        return NextResponse.json({ success: false })
    }
    
    if(userId === creatorId){
        //The post is from the user that logged in
        return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false })
}