import { sql } from "@vercel/postgres";

export async function fetchUser(email: string){
    try{
        const user = await sql`SELECT * FROM users WHERE email=${email}`;

        return user;
    }catch (err){
        console.log(err);
        throw new Error(`Coudn't fetch the data from the database.`);
    }
}

export async function fetchLatestPosts(){
    try{
        const posts = await sql`SELECT title price location imageUrl 
                                FROM posts
                                ORDER BY posts.date DESC
                                LIMIT 5`
        console.log(posts)
        return posts;
    }catch(err){
        console.log(err);
        throw new Error(`Coudn't fetch the data right now.`)
    }
}