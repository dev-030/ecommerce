import FormatPrice from "@/libs/formatPrice";
import TruncateText from "@/libs/truncateText";
import { cartProductType } from "@prisma/client";
import Image from "next/image";




export default function OrderItem({item}:{item:cartProductType}){



    return(
        <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
                <div className="relative w-[70px] aspect-square">
                    <Image src={item.selectedImg.image} alt={item.name} fill className="object-contain"/>
                </div>
                <div className="flex flex-col gap-1">
                    <div>{TruncateText(item.name)}</div>
                    <div>{item.selectedImg.color}</div>
                </div>
            </div>
            <div className="justify-self-center">{FormatPrice(item.price)}</div>
            <div className="justify-self-center">{item.quantity}</div>
            <div className="justify-self-end font-semibold">${(item.price*item.quantity).toFixed(2)}</div>
        </div>
    ) 
}