'use client'
import { useCart } from "@/hooks/useCart"
import Link from "next/link"
import {MdArrowBack} from 'react-icons/md'
import Heading from "../components/Heading"
import MyButton from "../components/MyButton"
import ItemContent from "./ItemContext"
import FormatPrice from "@/libs/formatPrice"


export default function CartClient(){

    const {cartProducts,handleClearCart,cartTotalAmmout} = useCart()

    if(!cartProducts || cartProducts.length===0){
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl">Your cart is empty</div>
                <div>
                    <Link href={'/'} className="text-slate-500 flex items-center gap-1 mt-2">
                        <MdArrowBack size={20}/>
                        <span>Start Shopping</span>
                    </Link>
                </div>
            </div>
        )
    }

    return(
        <div>
            <Heading title="Shopping Cart" center/>
            <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
                <div className="col-span-2 justify-self-start">Product</div>
                <div className="justify-self-center">Price</div>
                <div className="justify-self-center">Qunatity</div>
                <div className="justify-self-end">Total</div>
            </div>
            <div>
                {cartProducts && cartProducts.map((item)=> {
                    return <ItemContent key={item.id} item={item}/>
                })}
            </div>
            <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
                <div className="w-[90px]">
                    <MyButton label="Clear Cart" onClick={()=>handleClearCart()} small outline/>
                </div>
                <div className="text-sm flex flex-col gap-1 items-start">
                    <div className="flex justify-between w-full text-base font-semibold">
                        <span>Subtotal</span>
                        <span>{FormatPrice(cartTotalAmmout)}</span>
                    </div>
                    <p className="text-slate-500">
                        Taxes and shipping calculate at checkout
                    </p>
                    <MyButton label="Checkout" onClick={()=>{}}/>
                    <Link href={'/'} className="text-slate-500 flex items-center gap-1 mt-2">
                        <MdArrowBack size={20}/>
                        <span>Continue Shopping</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}