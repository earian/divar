import { cookies } from "next/headers";
import { decrypt } from "./session";

export async function whois(){
    const cookie = (await cookies()).get('session')?.value;
    if(!cookie) return undefined;
    const session = await decrypt(cookie);
    return session?.userId as string;
}