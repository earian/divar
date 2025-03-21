import { deleteSession } from "./session";

export async function signOut(){
    await deleteSession(); 
}