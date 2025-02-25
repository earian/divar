import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(request: NextRequest){
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if(!file) return NextResponse.json({ success: false })

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    //with the file data in the buffer you can do whatever you want with it
    //write it to the file system in a new location
    const path = join(process.cwd(),'/public', 'poster', file.name);
    await writeFile(path, buffer);
    console.log(`Open ${path} to see the uploaded file.`)

    return NextResponse.json({ success: true })
}