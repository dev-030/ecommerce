'use client'

import { CartProductType } from "@/app/product/[productId]/productDetails"


interface props {
    cartCounter?: boolean
    cartProduct: CartProductType,
    handleQunatityIncrease: () => void
    handleQunatitydecrease: () => void
}

const btnStyles = 'border-[1.2px] border-slate-300 px-2 rounded'

export default function SetQunatity({cartProduct,cartCounter,handleQunatityIncrease,handleQunatitydecrease}:props){

    return(
        <div>
            <div className="flex gap-8 items-center">
                {cartCounter ? null : <div className="font-semibold">QUANTITY:</div>}
                <div className="flex gap-4 items-center text-base">
                    <button onClick={handleQunatitydecrease} className={btnStyles}>-</button>
                    <div>
                        {cartProduct.quantity}
                    </div>
                    <button onClick={handleQunatityIncrease} className={btnStyles}>+</button>
                </div>
            </div>
        </div>
    )
}