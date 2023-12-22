'use client'
import FormatPrice from "@/libs/formatPrice"
import { CartProductType } from "../product/[productId]/productDetails"
import Link from "next/link"
import TruncateText from "@/libs/truncateText"
import MyButton from "../components/MyButton"
import Image from "next/image"
import SetQunatity from "../components/products/setQunatity"


interface props {
    item:CartProductType
}

export default function ItemContent({item}:props){


    return(
        <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
                <Link href={`/product/${item.id}`}>
                    <div className="relative w-[70px] aspect-square">
                        <Image src={item.selectedImg.image} alt={item.name} fill className="object-contain"/>
                    </div>
                </Link>
                <div className="flex flex-col justify-between">
                    <Link href={`/product/${item.id}`}>
                        {TruncateText(item.name)}
                    </Link>
                    <div>{item.selectedImg.color}</div>
                    <div className="w-[70px]">
                        <button className="text-slate-500 underline" onClick={()=>{}}>Remove</button>
                    </div>
                </div>
            </div>
            <div className="justify-self-center">{FormatPrice(item.price)}</div>
            <div className="justify-self-center">
                <SetQunatity cartCounter={true} cartProduct={item} handleQunatityIncrease={()=>{}} handleQunatitydecrease={()=>{}}/>
            </div>
            <div className="justify-self-end font-semibold">
                {FormatPrice(item.price * item.quantity)}
            </div>
        </div>
    )
}