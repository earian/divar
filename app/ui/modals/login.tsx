'use client';
import { useEffect, useState, useTransition, useActionState } from "react";
import Button from "../posts/button";
import { EmailSchema ,PasswordSchema } from "@/app/lib/definitions";
import { authenticate } from "@/app/lib/actions";

export default function LoginModal(props: {
    showModal: Function,
}){
    const [showForm, setShowFrom] = useState(false);
    const [step, setStep] = useState< number >(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState< Errors | undefined >();
    const [pending, startTransition] = useTransition();
    const [state, formAction] = useActionState(authenticate, undefined);


    useEffect(()=>{
        const id = setTimeout(()=>{
            document.body.style.overflow = 'hidden';
            setShowFrom(true);
        },20)
        return ()=> clearTimeout(id)
    },[])

    function cancel(){
        document.body.style.overflow = 'auto';
        props.showModal(false);
    }

    function next(e?: Event){
        if(step == 0) setStep(step + 1)
        if(step == 1){
            const validation = EmailSchema.safeParse(email);
            if(!validation.success){
                const errMessage = validation.error.flatten().formErrors[0];
                setErrors({ email: errMessage });
                return
            }
            if(errors?.email) setErrors(undefined);
            setStep(step + 1);
        } 
    }

    function back(e: Event){
        setStep(step - 1);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        console.log(formData.keys())
        const password = formData.get('password');
        const validation = PasswordSchema.safeParse(password);
            if(!validation.success){
                const errMessage = validation.error.flatten().formErrors[0];
                setErrors({ password: errMessage });
                return
            }
            setErrors(undefined);
            console.log('Form Submitted.')
            startTransition(()=>{
                formAction(formData);
            })
    }
    if(state?.success) {
        document.body.style.overflow = 'auto';
        window.location.reload();
        console.log('Authenticated Successfully!')
        return
    }

    return (
        <div
        className="fixed size-full backdrop-blur-sm z-[2000] flex justify-center items-center"
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {
            if(e.target == e.currentTarget) cancel()
        }}
        >
            <article
            className={`bg-[#1e1e1e] w-[70%] p-[0.450rem] rounded-sm transition-opacity duration-[0.5s] ease-in ${showForm ? 'opacity-[1]' : ' opacity-[0]'}`}
            >

                <h2 className="mx-auto w-[fit-content] py-[0.675rem] border-b-[1px] border-[gray]">ورود به حساب کاربری</h2>

            
            <div 
            className={`relative flex flex-row flex-nowrap overflow-hidden mt-[1.2rem] ${step == 0 ? 'h-[95px]' : 'h-[120px]'} ${(errors || state?.message) && !pending && 'h-[150px]'} transition-height duration-[0.2s] ease-linear`}
            id="login-modal-wrapper-div"
            >
                <div 
                className={`flex flex-col justify-between size-full shrink-[0] absolute ${step == 0 ? 'left-[0]' : 'left-[100%]'} transition-left duration-[0.8s] ease-in-out`}
                >
                    <p>برای استفاده از تمام امکانات وارد حساب خود شوید.</p>
                    <div className="flex flex-row justify-around">
                        <Button value="انصراف" action={cancel} tabIndex={step == 0 ? 0 : -1}/>
                        <Button value="ادامه"  action={next} tabIndex={step == 0 ? 0 : -1}/>
                    </div>
                </div>
                    
                <form 
                onSubmit={handleSubmit}
                className={`flex flex-row w-full shrink-0 flex-nowrap absolute ${step == 0 && 'left-[-100%]'} ${step == 1 && 'left-[0]'} ${step == 2 && 'left-[100%]'} transition-left duration-[0.8s] ease-in-out`}
                >
                    <div
                    className="w-full shrink-0"
                    >
                        <label htmlFor="email" className="mr-[0.5rem] font-bold">ایمیل</label>
                        <input 
                            type="email" 
                            name="email" 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setEmail(e.currentTarget.value)} 
                            onKeyDown={(e: React.KeyboardEvent)=> {
                                if(e.key == 'Enter') {
                                    e.preventDefault();
                                    next()
                                }
                            }}
                            value={email} 
                            className="block w-[95%] px-[0.425rem] py-[0.235rem] mx-auto h-[2rem] bg-[#2a2a2a] rounded-lg text-[#e4e4e7] 
                            border border-zinc-700
                            focus:outline-none
                            focus:ring-2 focus:ring-rose-500
                            focus:ring-offset-2 focus:ring-offset-zinc-900
                            transition" 
                            dir="ltr" 
                            placeholder="e.g. user@mail.com"
                            tabIndex={step == 1 ? 0 : -1}
                            />
                            {errors?.email && <div className="pr-[0.5rem] mt-[0.345rem] text-[#f43f5e]">{errors.email}</div>}
                            
                            
                            <div className="mt-[1rem] flex flex-row justify-around">
                                <Button value='مرحله‌ی قبل' action={back} tabIndex={step == 1 ? 0 : -1}/>
                                <Button value='بعدی' action={next} tabIndex={step == 1 ? 0 : -1}/>
                            </div>
                    </div>

                    <div
                    className="w-full shrink-0"
                    >
                        <label htmlFor="password" className="mr-[0.5rem]">رمز عبور</label>
                        <input 
                            type="password" 
                            name="password" 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPassword(e.currentTarget.value)} 
                            value={password} 
                            className="block w-[95%] px-[0.425rem] py-[0.235rem] mx-auto h-[2rem] bg-[#2a2a2a] rounded-lg text-[#e4e4e7] 
                            border border-zinc-700
                            focus:outline-none
                            focus:ring-2 focus:ring-rose-500
                            focus:ring-offset-2 focus:ring-offset-zinc-900
                            transition" 
                            dir="ltr"
                            disabled={pending}
                            tabIndex={step == 2 ? 0 : -1}
                            />
                        {errors?.password && <div className="pr-[0.5rem] mt-[0.345rem] text-[#f43f5e]">{errors.password}</div>}
                        {(!errors?.password && !pending && state?.message) && <div className="pr-[0.5rem] mt-[0.345rem]">{state.message}</div>}
                            <div className="mt-[1rem] flex flex-row justify-around">
                                <Button value='مرحله‌ی قبل' action={back} disabled={pending} tabIndex={step == 2 ? 0 : -1}/>
                                <button 
                                    type="submit"
                                    className="rounded-md border-[2px] border-[#333] py-[0.575rem] w-[45%] bg-[#d14757] text-[#242424] text-[1rem] font-bold"
                                    disabled={pending}
                                    tabIndex={step == 2 ? 0 : -1}
                                    >{pending ? 'در حال بررسی...' : 'تایید' }</button>
                            </div>
                    </div>
                
                </form>
            </div>
            
            
            </article>
        </div>
    )
}
interface Errors {
    email?: string,
    password?: string,
}