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
                return <PostThumbnail title={post.title} price={perPrice} district={post.district} thumbnail={post.thumbnail} key={ind}/>
            })}
            <PostThumbnail title="فروش ۱۳۰ متر آپارتمان" price={'85000000000'} district="سهروردی"/>
            <PostThumbnail title="فروش دلار کلکسیونی" price={'93000'} district="حسین آباد"/>
        </div>
    )
}