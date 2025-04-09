'use client';
// import Button from "../div-button";
import { useState } from "react";
import Button from "../posts/button";

export default function LoginModal(){
    const [step, setStep] = useState< number >(0);
    console.log(step)

    function cancel(){
        console.log('canceled')
    }
    function next(e?: Event){
        // const element = document.querySelector('#login-modal-wrapper-div1') as HTMLDivElement;
        // const container = document.querySelector('#login-modal-wrapper-div') as HTMLDivElement;
        // const width = container.offsetWidth;
        // element.style.transform = `translateX(${width}px)`;
        console.log('Next fn ran.')
        setStep(step + 1)

    }
    function back(e: Event){
        setStep(step - 1);
    }

    return (
        <div
        className="fixed size-full bg-[gray] z-[2000] flex justify-center items-center"
        >
            <article
            className="bg-[#333] w-[70%] p-[0.450rem]"
            >

                <h2 className="mx-auto w-[fit-content] py-[0.675rem] border-b-[1px] border-[gray]">ورود به حساب کاربری</h2>

            
            <div 
            className="relative flex flex-row flex-nowrap overflow-hidden mt-[1.2rem] h-[119px]"
            id="login-modal-wrapper-div"
            >
                <div 
                className={`w-full shrink-[0] absolute ${step == 0 ? 'left-[0]' : 'left-[100%]'}`}
                id="login-modal-wrapper-div1"
                >
                    <p>برای استفاده از تمام امکانات وارد حساب خود شوید.</p>
                    <div className="mt-[1rem] flex flex-row justify-around">
                        <Button value="انصراف" action={back}/>
                        <Button value="ادامه"  action={next}/>
                    </div>
                </div>
                    
                <form 
                className={`flex flex-row w-full shrink-0 flex-nowrap absolute ${step == 0 && 'left-[-100%]'} ${step == 1 && 'left-[0]'} ${step == 2 && 'left-[100%]'}`}
                action="">
                    <div
                    className="w-full shrink-0"
                    >
                        <label htmlFor="email">ایمیل</label>
                        <input type="email" name="email" className="block w-[95%] px-[0.425rem] py-[0.235rem] mx-auto h-[2rem] bg-[gray]" dir="ltr" placeholder="user@mail.com"/>
                            <div className="mt-[1rem] flex flex-row justify-around">
                                <Button value='مرحله‌ی قبل' action={back}/>
                                <Button value='بعدی' action={next}/>
                            </div>
                    </div>

                    <div
                    className="w-full shrink-0"
                    >
                        <label htmlFor="password">رمز عبور</label>
                        <input type="password" name="password" className="block w-[95%] px-[0.425rem] py-[0.235rem] mx-auto h-[2rem] bg-[gray]" dir="ltr"/>
                            <div className="mt-[1rem] flex flex-row justify-around">
                                <Button value='مرحله‌ی قبل' action={back}/>
                                <Button value='تایید' action={next}/>
                            </div>
                    </div>
                
                </form>
            </div>
            
            
            </article>
        </div>
    )
}