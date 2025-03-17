import { rubik } from "../ui/fonts";
import { getUser } from "../lib/user-actions";
import Dashboard from "../ui/user/user-dashboard";
import GoToLogin from "../ui/user/login-redirect";

export default async function Page(){
    const user = await getUser();

    return (
        <div>
            <h2 className={`${rubik.className} block top-[0] sticky w-full bg-[#333] p-[1rem] font-[700]`}>دیوار من</h2>
            { user 
                ? <Dashboard user={user}/>
                : <GoToLogin />
            }
        </div>
    )
}