import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./app/lib/session";

const ProtectedRoutes = ['/create'];

export default async function middleware(req: NextRequest){
    const path = req.nextUrl.pathname;
    const isProtected = ProtectedRoutes.includes(path);//isProtected is either True / False

    const cookie = (await cookies()).get('session')?.value;
    let session = null;

    if(isProtected && cookie){
        //if the requested path is protected and the session cookie exists, decrypt the session
        session = await decrypt(cookie);
    }

    if(isProtected && !session?.userId){
        //if the path is protected but the session decryption failed
        return NextResponse.redirect(new URL('login', req.nextUrl));
    }
    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  }