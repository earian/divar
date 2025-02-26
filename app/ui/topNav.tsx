import Search from './searchbar';

export default function Header(){
    return (
        <header className='w-full p-[.575rem] bg-[#333] sticky top-0 right-0 z-[1040]'>
        <Search placeholder='جستجو در همه‌ی آگهی‌ها'/>
        </header>
    )
}