import { Suspense } from "react";
import Category from "./ui/category/category";
import Posts from "./ui/posts/posts";
import { CategorySkeleton } from "./ui/skeletons";
import Header from "./ui/topNav";
import RefreshHandler from "./lib/refresher";

export default function Home() {
  return (
    <>
      <Header />
      <RefreshHandler />
      <div className="grid grid-cols-4 gap-[0.875rem] p-[1.230rem]">
        <Suspense fallback={<CategorySkeleton />}>
          <Category />
        </Suspense>
      </div>
      <h3 className="m-[1rem]">انواع آگهی‌ها و نیازمندی‌های تهران</h3>
        <Posts />
    </>
  );
}
