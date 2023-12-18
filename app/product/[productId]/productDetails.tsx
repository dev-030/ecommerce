'use client'

import MyButton from "@/app/components/MyButton"
import SetColor from "@/app/components/products/setColor"
import SetQunatity from "@/app/components/products/setQunatity"
import { Rating } from "@mui/material"
import Image from "next/image"
import { useCallback, useState } from "react"



interface props{
    product?:any
}

export type CartProductType = {
    id: string,
    description: string ,
    category: string
    brand : string
    selectedImg : selectedImgageType
    quantity : number ,
    price : number
}

export type selectedImgageType = {
    color : string ,
    colorCode : string,
    image : string
}


const Horizontal = () => {
    return <hr className="w-[30%] my-2"/>
}

export default function ProductDetails({product}:props){

    const [cartProduct , setCartProduct] = useState<CartProductType>({
                                                    id: product.id,
                                                    description: product.description ,
                                                    category: product.category,
                                                    brand : product.brand,
                                                    selectedImg : {...product.images[0]},
                                                    quantity : 1 ,
                                                    price : product.price
                                                })

    const productRating = product.reviews.reduce((acc:number,item:any)=> item.rating + acc , 0) / product.reviews.length


    const handleColorSelect = useCallback((value:selectedImgageType)=>{
        setCartProduct((pre)=> {
            return {...pre, selectedImg: value}
        })
    },[cartProduct.selectedImg])



    const handleQuantityIncarease = useCallback(()=>{

        if(cartProduct.quantity === 10) return;

        console.log(cartProduct.quantity)

        setCartProduct((pre)=>{
            const newQuantity = pre.quantity + 1;
            return { ...pre, quantity: newQuantity };
        })
    },[cartProduct]) 


    const handleQunatityDecrease = useCallback(()=>{

        if(cartProduct.quantity === 1) return;

        setCartProduct((pre)=>{
            return {...pre , quantity : pre.quantity-1}
        })
    },[cartProduct])



    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
                <Image src={`${product.images[0].image}`} alt="product image" loading="lazy" width={400} height={400}/>
            </div>
            <div className="flex flex-col gap-1 text-slate-500 text-sm">
                <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
                <div className="flex items-center gap-2">
                    <Rating value={productRating} readOnly/>
                    <div>{product.reviews.length} reviews</div>
                </div>
                <Horizontal/>
                <div className="text-justify">
                    {product.description}
                </div>
                <Horizontal/>
                <div>
                    <span className="font-semibold">CATEGORY:</span> {product.category}
                </div>
                <div>
                    <span className="font-semibold">Brand:</span> {product.brand}
                </div>
                <div className={product.inStock ? "text-teal-400":"text-rose-400"}>{product.inStock ? "In stock" : "Out of stock"}</div>
                <Horizontal/>
                
                    <SetColor cartProduct={cartProduct} images={product.images} handleColorSelect={handleColorSelect}/>
                
                <Horizontal/>
                
                <SetQunatity cartProduct={cartProduct} handleQunatityIncrease={handleQuantityIncarease} handleQunatitydecrease={handleQunatityDecrease}/>
                
                <Horizontal/>
                <div className="max-w-[300px]">
                    <MyButton label="Add to cart" onClick={()=>{}} />
                </div>
            </div>
        </div>
    )
}