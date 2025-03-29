'use client'
import { useSearchParams } from "next/navigation";

export default function Filter(){
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab');

    const setTab = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('tab', category);
        window.history.replaceState(null, "", `?${params.toString()}`)
    }

    return (
        <ul
        className="w-full flex flex-row overflow-x-scroll sticky top-[4.5rem] z-[5] bg-[#242424] mb-[1rem] border-b-[1px] border-[#333] px-[0.350rem] scrollbar-hide"
        >
            <li onClick={() => setTab('all')} className={`${(tab == null || tab == 'all') && "border-b-[1px] border-[red]"} p-[0.875rem] w-[fit-content] font-bold`}>همه</li>
            <li onClick={() => setTab('active')} className={`${tab == "active" && "border-b-[1px] border-[red]"} p-[0.875rem] w-[fit-content] font-bold`}>آگهی‌های فعال</li>
            <li onClick={() => setTab('not-active')} className={`${tab == "not-active" && "border-b-[1px] border-[red]"} p-[0.875rem] w-[fit-content] font-bold`}>آگهی‌های غیر فعال</li>
        </ul>
    )
}