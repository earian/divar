import { NextResponse } from "next/server";
import { fetchPost } from "@/app/lib/data";

export async function GET(req: Request, { params } : { params: Promise<{ id : string }> } ){
    try{
        const { id } = await params;

        const post = await fetchPost(id);

        if(post) return NextResponse.json(post);
        return NextResponse.redirect('/')
    }catch(err){
        console.log(err)
        return NextResponse.json({ message: "Coudn't fetch the data from the database." })
    }
}