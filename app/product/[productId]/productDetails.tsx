'use client'

import MyButton from "@/app/components/MyButton"
import ProductImage from "@/app/components/products/productimage"
import SetColor from "@/app/components/products/setColor"
import SetQunatity from "@/app/components/products/setQunatity"
import { useCart } from "@/hooks/useCart"
import { Rating } from "@mui/material"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { MdCheckCircle } from "react-icons/md"



interface props{
    product?:any
}

export type CartProductType = {
    id: string,
    description: string ,
    category: string
    name:string
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

    const {handleAddProductToCart , cartProducts} = useCart()

    const [isProductInCart, setIsProductInCart] = useState<Boolean>(false)

    const [cartProduct , setCartProduct] = useState<CartProductType>({
                                                    id: product.id,
                                                    description: product.description ,
                                                    category: product.category,
                                                    brand : product.brand,
                                                    selectedImg : {...product.images[0]},
                                                    quantity : 1 ,
                                                    price : product.price,
                                                    name: product.name
                                                })

    const productRating = product.reviews.reduce((acc:number,item:any)=> item.rating + acc , 0) / product.reviews.length


    const handleColorSelect = useCallback((value:selectedImgageType)=>{
        setCartProduct((pre)=> {
            return {...pre, selectedImg: value}
        })
    },[cartProduct.selectedImg])


    // console.log(cartProducts)

    const router = useRouter();

    useEffect(()=>{
        setIsProductInCart(false)

        if(cartProducts){
            const existingIndex = cartProducts.findIndex((item)=> item.id === product.id)
            if(existingIndex > -1){
                setIsProductInCart(true)
            }
        }
    },[cartProducts])


    const handleQuantityIncarease = useCallback(()=>{

        if(cartProduct.quantity === 10) return;

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
                <ProductImage product={product} cartProduct={cartProduct} handleColorSelect={handleColorSelect}/>
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

                {isProductInCart? <>
                    <p className="mb-2 text-slate-500 flex items-center gap-1">
                        <MdCheckCircle size={20} className="text-teal-400"/>
                        <span>Product added to cart</span>
                    </p>
                    <div className="max-w-[300px]">
                        <MyButton label="View Cart" outline onClick={()=>router.push("/cart")}/>
                    </div>
                </> : <>
                    <SetColor cartProduct={cartProduct} images={product.images} handleColorSelect={handleColorSelect}/>
                    
                    <Horizontal/>
                    
                    <SetQunatity cartProduct={cartProduct} handleQunatityIncrease={handleQuantityIncarease} handleQunatitydecrease={handleQunatityDecrease}/>
                    
                    <Horizontal/>
                    <div className="max-w-[300px]">
                        <MyButton label="Add to cart" onClick={()=> handleAddProductToCart(cartProduct)} />
                    </div>
                </>}                
            </div>
        </div>
    )
}