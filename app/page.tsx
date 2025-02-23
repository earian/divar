import CategoryItem from "./ui/category/categoryItem";
import PostThumbnail from "./ui/posts/postThumbnail";
import Header from "./ui/topNav";

export default function Home() {
  return (
    <>
      <Header />
      <div className="grid grid-cols-4 gap-[0.875rem] p-[1.230rem]">
        <CategoryItem imageUrl='/categoryIcons/real-estate.png' title='املاک'/>
        <CategoryItem imageUrl='/categoryIcons/vehicles.png' title='وسایل نقلیه'/>
        <CategoryItem imageUrl='/categoryIcons/electronic-devices.png' title='کالای دیجیتال'/>
        <CategoryItem imageUrl='/categoryIcons/home-kitchen.png' title='خانه و آشپزخانه'/>
        <CategoryItem imageUrl='/categoryIcons/services.png' title='خدمات'/>
        <CategoryItem imageUrl='/categoryIcons/personal.png' title='وسایل شخصی'/>
        <CategoryItem imageUrl='/categoryIcons/leisure-hobbies.png' title='سرگرمی و فراعت'/>
        <CategoryItem imageUrl='/categoryIcons/community.png' title='اجتماعی'/>
        <CategoryItem imageUrl='/categoryIcons/tools-materials-equipment.png' title='تجهیزات و صنعتی'/>
        <CategoryItem imageUrl='/categoryIcons/jobs.png' title='استخدام و کاریابی'/>
      </div>
      <h3 className="m-[1rem]">انواع آگهی‌ها و نیازمندی‌های تهران</h3>
      <PostThumbnail title="فروش ۱۳۰ متر آپارتمان" price={85000000000} location="سهروردی"/>
      <PostThumbnail title="فروش دلار کلکسیونی" price={93000} location="حسین آباد"/>
    </>
  );
}
