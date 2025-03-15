import { toPersianDigits } from "@/app/lib/utils"

export default function Table(props: {
    price: number
}){
    const perPrice = toPersianDigits(props.price)
    return (
        <table
        className="w-full"
        >
            <tbody>
                <tr className="flex flex-row justify-between p-[0.875rem] border-y border-[#333]">
                    <th>قیمت</th>
                    <td><span>{perPrice}</span> تومان</td>
                </tr>
            </tbody>
        </table>
    )
}