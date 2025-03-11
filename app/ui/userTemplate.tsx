'use server'
import { cookies } from "next/headers";
import { fetchUserById } from "../lib/data";
import { decrypt } from "../lib/session";

const myDataBaseID = '75356cd6-ff11-4c4a-b0f4-471274526c12';

export default async function User(){
    const cookie = (await cookies()).get('session')?.value;
    let session = undefined;
    let user = undefined;
    if(cookie){
        session = await decrypt(cookie);
        user = await fetchUserById(session?.userId);
    }

    return (
        <>
        {user &&
            <div>
            <p>{user['name(per)']}</p>
            <p>{user.email}</p>
            </div>
        }
        </>
    )
}