'use server';
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { fetchUserById } from "./data";
import { User } from "./definitions";

export type SessionPayload = {
    userId: string,
    expiresAt: Date,
}

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload){
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = ''){
    try{
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload;
    }catch(err){
        console.log(err);
        //throw new Error('Failed to verify the session.');
    }
}

export async function CreateSession(userId: string){
    const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ userId, expiresAt });
    const cookieStore = await cookies();

    cookieStore.set('session', session,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function deleteSession(){
    const cookieStore = await cookies();
    cookieStore.delete('session');
}

export async function whois(){
    const cookie = (await cookies()).get('session')?.value;
    if(!cookie) return undefined;
    const session = await decrypt(cookie);
    return session?.userId as string;
}

export async function getUser(){
    const cookie = (await cookies()).get('session')?.value;
    if(!cookie) return null;
    const session = await decrypt(cookie);
    const user = await fetchUserById(session?.userId as string);
    return user as User;
}