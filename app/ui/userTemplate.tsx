import { fetchUser } from "../lib/data";

export default async function User(){
    const users = await fetchUser('arian@mail.com');
    const user = users.rows[0];

    return (
        <div>
        <p>{user['name(per)']}</p>
        <p>{user.email}</p>
        </div>
    )
}