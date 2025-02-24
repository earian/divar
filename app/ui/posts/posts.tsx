import { fetchLatestPosts } from "@/app/lib/data"
import PostThumbnail from "./postThumbnail"

export default async function Posts(){
    const data = await fetchLatestPosts();
    const posts = data.rows;

    return (
        <div>
            {posts.map((post, ind)=> {
                //Making the price a persian digit formatted string
                const perPrice = new Intl.NumberFormat('fa-IR').format(post.price);
                return <PostThumbnail title={post.title} price={perPrice} location={post.location} thumbnail={post.thumbnail} key={ind}/>
            })}
            <PostThumbnail title="فروش ۱۳۰ متر آپارتمان" price={'85000000000'} location="سهروردی"/>
            <PostThumbnail title="فروش دلار کلکسیونی" price={'93000'} location="حسین آباد"/>
        </div>
    )
}