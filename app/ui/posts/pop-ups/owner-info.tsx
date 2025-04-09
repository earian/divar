'use client';
import Button from "../button";

export default function Contact(props: {
    info: { email: string, phone: string },
    setContactInfo: Function,
}){
    //Disabling scroll for the body
    document.body.style.overflow = 'hidden';

    function done(){
        document.body.style.overflow = 'auto';
        props.setContactInfo(false);
    }

    return (
        <div
        className="fixed size-full z-[2000] flex justify-center items-center"
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {
            if(e.target == e.currentTarget) done();
        }}
        >
            <article
            className="bg-[#333] w-[75%] p-[0.875rem]"
            >
                <h2 className="font-bold text-[1.3rem]">اطلاعات تماس:</h2>
                <table className="w-full mt-[0.850rem]">
                    <tbody>
                        <tr className="flex flex-row justify-between border-b-[1px] border-[gray]">
                            <th>ایمیل</th>
                            <td><a href={`mailto:${props.info.email}`}>{props.info.email}</a></td>
                        </tr>
                        <tr className="flex flex-row justify-between mt-[0.435rem]">
                            <th>تلفن</th>
                            <td>{props.info.phone}</td>
                        </tr>
                    </tbody>
                </table>
                
                <div className="w-full text-center mt-[1rem]">
                    <Button value='تایید' action={done}/>
                </div>
                
            </article>
        </div>
    )
}