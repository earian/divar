import { sql } from "@vercel/postgres";

export async function fetchUser(email: string){
    try{
        const user = await sql`SELECT * FROM users WHERE email=${email}`;

        return user;
    }catch (err){
        console.log(err);
        throw new Error(`Coudn't fetch the user from the database.`);
    }
}

export async function fetchUserById(id: string) {
    try{
        const user = await sql`SELECT * FROM users WHERE id=${id}`;

        return user.rows[0];
    }catch (err){
        console.log(err);
        throw new Error(`Coudn't fetch the user with id from the database.`);
    }
}

export async function fetchLatestPosts(){
    try{
        const posts = await sql`SELECT title, price, district, thumbnail, "postId"
                                FROM posts
                                ORDER BY date DESC
                                LIMIT 5`

        return posts;
    }catch(err){
        console.log(err);
        throw new Error(`Coudn't fetch the data right now.`)
    }
}

export async function fetchCategories(){

    try{
        const categories = await sql`SELECT * FROM categories`

        return categories.rows;
    }catch(err){
        console.log(err)
        throw new Error('Failed to fetch categories.')
    }
}