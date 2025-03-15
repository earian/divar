import Header from "@/app/ui/posts/post-header";
import Images from "@/app/ui/posts/post-images";
import Table from "@/app/ui/posts/info-table";
import Bottom from "@/app/ui/posts/bottom-section";
import { fetchPost } from "@/app/lib/data";
import Category from "@/app/ui/posts/post-category";
import { Suspense } from "react";
import { BottomLoader, CategoryLoader } from "@/app/ui/posts/posts-skeletons";

export default async function Page(props: {params: Promise<{ id: string }>}){
    const postId = (await props.params).id;
    const post = await fetchPost(postId);
    //console.log(post);


    return (
        <div 
        className="mb-[8rem]"
        >
            <Header />
            <Images thumbnail={post.thumbnail}/>
            <Suspense fallback={<CategoryLoader />}>
                <Category value={post.category} />
            </Suspense>
            <h2
            className="block text-[1.6rem] font-bold mr-[0.850rem]"
            >
            {post.title}
            </h2>
            <p
                className="mr-[0.850rem] mb-[0.850rem]"
            ><span>۱۰ ساعت پیش</span> در تهران، <span>{post.district}</span></p>
            <textarea name="user-notes" id="user-notes" 
            placeholder="یادداشت شما..."
            className="hidden w-[90%] mr-[0.825rem] mb-[0.825rem] bg-[#333] rounded-sm p-[0.235rem] resize-none"
            rows={5}
            ></textarea>
            <Table price={post.price}/>
            {post.description.length != 0 &&
                <section className="p-[0.875rem]">
                    <h3 className="block text-[1.4rem] font-bold">توضیحات</h3>
                    <p>{post.description}</p>
                </section>
            }
            <Suspense fallback={<BottomLoader />}>
                <Bottom creator={post.creator}/>
            </Suspense>
        </div>
    )
}