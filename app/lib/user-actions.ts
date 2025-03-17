import { cookies } from "next/headers";
import { decrypt, deleteSession } from "./session";
import { fetchUserById } from "./data";
import { User } from "./definitions";
import { revalidatePath } from "next/cache";

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

export async function signOut(){
    await deleteSession();
    revalidatePath("/user") 
}