'use client'
import { useState } from 'react';
import Search from './searchbar';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Header(){
    const [isSearching, setIsSearching] = useState<boolean>(false);
    
    function handleArrowClick(){
        document.body.style.overflow = 'auto';
        setIsSearching(false);
    }

    return (
        <>
        <header className={`w-full p-[.575rem] bg-[#333] sticky top-0 right-0 z-[1040] ${isSearching && 'flex flex-row justify-start items-center'}`}>
        {isSearching && 
            <div 
                className="flex justify-center items-center size-[2.5rem] rounded-[50%] ml-[0.125rem]"
                onClick={()=> handleArrowClick()}
                >
                <ArrowRightIcon className="size-6"/>
            </div>
        }
        <Search state={{ isSearching, setIsSearching }} placeholder='جستجو در همه‌ی آگهی‌ها'/>
        </header>
        {isSearching &&
            <div className='w-full h-full bg-[#242424] z-[4] fixed'>
                {/* Searched items or search history. */}
                چیزی برای نمایش وجود ندارد.
            </div>
        }
        </>
    )
}