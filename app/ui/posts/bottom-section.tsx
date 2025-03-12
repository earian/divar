import Button from "./button"

export default function Bottom(){
    return (
        <div
        className="fixed w-full flex flex-row justify-around bg-[#333] bottom-0 left-0 py-[0.525rem]"
        >
            <Button value="چت" />
            <Button value="اطلاعات تماس" />
        </div>
    )
}