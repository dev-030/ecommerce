'use client'

import { CartProductType, selectedImgageType } from "@/app/product/[productId]/productDetails"




interface props {
    images : selectedImgageType[]
    cartProduct : CartProductType
    handleColorSelect : (value: selectedImgageType) => void 
}

export default function SetColor({images,cartProduct,handleColorSelect}:props){


    return(
        <div>
            <div className="flex gap-4 items-center">
                <span className="font-semibold">Color:</span>
                <div className="flex gap-1">
                    {images.map((image)=> {
                        return (
                            <div key={image.color} onClick={()=>handleColorSelect(image)} className={`h-7 w-7 rounded-full border-teal-300 flex items-center justify-center ${cartProduct.selectedImg.color === image.color ? 'border-[1.5px]':'node'}`}>
                                <div style={{background:image.colorCode}} className="h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer"></div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}