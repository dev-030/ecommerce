import { CartProductType } from "@/app/product/[productId]/productDetails";
import { createContext, useCallback, useContext, useState } from "react";


type CartContextType = {
    cartTotalQty : number
    cartProducts : CartProductType[] | null
    handleAddProductToCart : (product: CartProductType) => void
}

interface props {
    [propName:string] : any
}

export const CartContext = createContext<CartContextType | null>(null)



export function CartContextProvider({children}:props){

    const [cartTotalQty,setCartTotalQty] = useState(0)
    const [cartProducts,setCartProducts] = useState<CartProductType[] | null>(null)

    const handleAddProductToCart = useCallback((product:CartProductType)=>{
        setCartProducts((prev)=>{
            let updatedCart ;
            if(prev){
                updatedCart = [...prev, product]
            }else {
                updatedCart = [product]
            }
            return updatedCart;
        })
    },[])

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart
    }
    return(
        <CartContext.Provider value={value} children={children} />
    ) 
}



export const useCart = () => {
    const context = useContext(CartContext)
    if(context === null) {
        throw new Error("useCart must be used within a CartContextProvider")
    }
    return context;
}