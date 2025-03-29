import { fetchLatestPosts } from "@/app/lib/data"
import PostThumbnail from "./postThumbnail";
import { toPersianDigits } from "@/app/lib/utils";

export default async function Posts(){
    const data = await fetchLatestPosts();
    const posts = data.rows;

    return (
        <div
        className="px-[0.875rem]"
        >
            {posts.map((post, ind)=> {
                //Making the price a persian digit formatted string
                const perPrice = toPersianDigits(post.price);
                return <PostThumbnail postId={post.postId} title={post.title} price={perPrice} district={post.district} thumbnail={post.thumbnail} key={ind}/>
            })}
            <PostThumbnail postId="" title="فروش ۱۳۰ متر آپارتمان" price={'85000000000'} district="سهروردی"/>
            <PostThumbnail postId="" title="فروش دلار کلکسیونی" price={'93000'} district="حسین آباد"/>
        </div>
    )
}