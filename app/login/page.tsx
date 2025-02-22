import { rubik } from "../ui/fonts"

export default function LoginPage(){
    return (
        <form className={`${rubik.className} p-[0.965rem]`}>
            <h2 className={`${rubik.className} font-[700]`}>لطفا وارد حساب کاربری خود شوید.</h2>
            <label htmlFor="email" className="block m-[0.350rem]">
                ایمیل
            </label>
            <input type="text" name="email" dir="ltr" placeholder="example@mail.com" className="bg-[#333] p-[0.350rem] float-left w-full h-[2.575rem]"/>
            <label htmlFor="password" className="block m-[0.350rem]">
                رمز عبور
            </label>
            <input type="password" name="password" dir="ltr" className="bg-[#333] p-[0.350rem] float-left w-full h-[2.575rem]"/>
            <button type="submit" className="m-[1rem] border-[2px] border-[#333] p-[0.875rem]">ورود به حساب کاربری</button>
        </form>
    )
}