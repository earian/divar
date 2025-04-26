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

export async function fetchPost(id: string){

    try{
        const data = await sql`SELECT * FROM posts WHERE "postId"=${id}`

        return data.rows[0];
    }catch(err){
        console.log(err)
        throw new Error('Failed to fetch the post.')
    }
}

export async function fetchLatestPosts(lastDate?: string){
    try{
        const posts = lastDate
        ? await sql`
            SELECT title, price, district, thumbnail, date, "postId"
            FROM posts
            WHERE "isActive" = TRUE AND date < ${lastDate}
            ORDER BY date DESC
            LIMIT 5
          `
        : await sql`
            SELECT title, price, district, thumbnail, date, "postId"
            FROM posts
            WHERE "isActive" = TRUE
            ORDER BY date DESC
            LIMIT 5
          `;

        return posts.rows as [];
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

export async function fetchCategoryByValue(val: string){
    try{
        const categories = await sql`SELECT name FROM categories WHERE value=${val}`

        return categories.rows[0];
    }catch(err){
        console.log(err)
        throw new Error('Failed to fetch category value.')
    }
}

export async function fetchPostsByUserId(id: string, date?: string){
    try{
        const data = date 
        ? await sql`
            SELECT title, thumbnail, "postId", "isActive", date
            FROM posts
            WHERE creator=${id} AND date < ${date}
            ORDER BY date DESC
            LIMIT 5
            `
        : await sql`
            SELECT title, thumbnail, "postId", "isActive", date
            FROM posts
            WHERE creator=${id}
            ORDER BY date DESC
            LIMIT 5
            `
                        
        return data.rows as [];
    }catch(err){
        console.log(err);
        throw new Error('Failed to fetch posts with user id.')
    }
}