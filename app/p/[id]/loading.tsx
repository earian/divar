import Header from "@/app/ui/posts/post-header";
import { BottomLoader } from "@/app/ui/posts/posts-skeletons";

export default function Load(){
    return (
        <div>
            <Header />
            <BottomLoader />
        </div>
    )
}