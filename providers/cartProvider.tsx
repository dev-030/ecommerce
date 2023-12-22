'use client'
import {CartContextProvider} from '@/hooks/useCart'


interface props {
    children : React.ReactNode
}

export default function CartProvider({children}:props){
    return (
       <CartContextProvider>
            {children}
       </CartContextProvider>
     ) 
}