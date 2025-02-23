'use client'
import { authenticate } from "../lib/actions";
import { rubik } from "../ui/fonts";
import { useActionState } from "react";

export default function LoginPage(){
    const [state, action, pending] = useActionState(authenticate, undefined);

    return (
        <form className={`${rubik.className} p-[0.965rem]`} action={action}>
            <h2 className={`${rubik.className} font-[700]`}>لطفا وارد حساب کاربری خود شوید.</h2>
            <label htmlFor="email" className="block m-[0.350rem]">
                ایمیل
            </label>
            <input type="text" name="email" dir="ltr" placeholder="example@mail.com" className="bg-[#333] p-[0.350rem] float-left w-full h-[2.575rem]"/>
            {state?.errors?.email && 
            <div>
                <p className="text-[red]">{state.errors.email}</p>
            </div>
            }
            <label htmlFor="password" className="block m-[0.350rem]">
                رمز عبور
            </label>
            <input type="password" name="password" dir="ltr" className="bg-[#333] p-[0.350rem] float-left w-full h-[2.575rem]"/>
            {state?.errors?.password && 
            <div>
                <p className="text-[red]">{state.errors.password}</p>
                <p>{state.message}</p>
            </div>
            }
            <button type="submit" className="m-[1rem] border-[2px] border-[#333] p-[0.875rem]" disabled={pending ? true : false}>{pending ? 'در حال بررسی...' : 'ورود به حساب کاربری'}</button>
        </form>
    )
}