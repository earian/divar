import Header from "@/app/ui/posts/post-header";
import Images from "@/app/ui/posts/post-images";
import Table from "@/app/ui/posts/info-table";
import Bottom from "@/app/ui/posts/bottom-section";


export default function Page(){
    return (
        <div 
        className="mb-[8rem]"
        >
            <Header />
            <Images />
            <h3
            className="block my-[0.875rem] mr-[1.5rem]"
            >تجهیزات و صنعتی
            </h3>
            <h2
            className="block text-[1.6rem] font-bold mr-[0.850rem]"
            >
                عنوان آگهی
            </h2>
            <p
                className="mr-[0.850rem] mb-[0.850rem]"
            ><span>۱۰ ساعت پیش</span> در تهران، <span>سعید آباد</span></p>
            <Table />
            <section className="p-[0.875rem]">
                <h3 className="block text-[1.4rem] font-bold">توضیحات</h3>
                <p>ابعاد های آماده ارسال درو پنجره upvc با شیشه
۴۰در۴۰
۵۰در۵۰
۸۰در۸۰
۱۰۰در۱۰۰
۱۲۰در۱۲۰
۱۵۰در۱۵۰
۱۰۰در۱۵۰
۲۰۰در۲۰۰
۲۰۰در۲۵۰
۱۰۰در۲۰۰
وهر ابعادی که شنا نیاز دارید</p>
            </section>
            <Bottom />
        </div>
    )
}