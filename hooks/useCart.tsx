import { CartProductType } from "@/app/product/[productId]/productDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


type CartContextType = {
    cartTotalQty : number
    cartTotalAmmout : number
    cartProducts : CartProductType[] | null
    handleAddProductToCart : (product: CartProductType) => void
    handleRemoveProductFromCart : (product: CartProductType) => void
    handleCartQtyIncrease : (product: CartProductType) => void
    handleCartQtyDecrease : (product: CartProductType) => void
    handleClearCart : () => void
    paymentIntent : string | null
    handlePaymentIntent : (val:string|null) => void
}

interface props {
    [propName:string] : any
}

export const CartContext = createContext<CartContextType | null>(null)



export function CartContextProvider({children}:props){

    const [cartTotalQty,setCartTotalQty] = useState(0)
    const [cartProducts,setCartProducts] = useState<CartProductType[] | null>(null)
    const [cartTotalAmmout, setCartTotalAmmount] = useState(0)
    const [paymentIntent, setPaymentIntent] = useState<string | null>(null)

    useEffect(()=>{
        const cartItems :any = localStorage.getItem('shop items')
        const cartProducts:CartProductType[] | null = JSON.parse(cartItems) 
        const shopPaymentIntent:any = localStorage.getItem('shopPaymentIntent')
        const paymentIntent:string | null = JSON.parse(shopPaymentIntent)
        setPaymentIntent(paymentIntent)
        setCartProducts(cartProducts)
    },[])

    useEffect(()=>{
        const getTotals = () => {
        if(cartProducts){
          const {total,qty} = cartProducts?.reduce((acc, item)=>{
                const itemTotal = item.price * item.quantity

                acc.total += itemTotal
                acc.qty += item.quantity
                return acc;
            },{
                total : 0 ,
                qty : 0
            })
            setCartTotalQty(qty)
            setCartTotalAmmount(total)
        }
    }
    getTotals()
    },[cartProducts])


    const handleAddProductToCart = useCallback((product:CartProductType)=>{
        setCartProducts((prev)=>{
            let updatedCart ;
            if(prev){
                updatedCart = [...prev, product]
            }else {
                updatedCart = [product]
            }
            localStorage.setItem('shop items', JSON.stringify(updatedCart))
            return updatedCart;
        })
        toast.success('Poduct added to cart')
    },[])


    const handleRemoveProductFromCart = useCallback((product:CartProductType)=>{

        if(cartProducts){
            const filteredProducts = cartProducts.filter((item)=> {
            return item.id !== product.id
        })

            setCartProducts(filteredProducts)
            toast.success('Poduct removed')
            localStorage.setItem('shop items', JSON.stringify(filteredProducts))
        }
    },[cartProducts])


    const handleCartQtyIncrease = useCallback((product:CartProductType)=>{
        let updatedCart;
        if(product.quantity === 99){
            return toast.error('Oops Maximum reached')
        }

        if(cartProducts){
            updatedCart = [...cartProducts]
            const exisingIndex = cartProducts.findIndex((item) => item.id === product.id)
            if(exisingIndex> -1){
                updatedCart[exisingIndex].quantity = ++updatedCart[exisingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('shop items', JSON.stringify(updatedCart))
        }

    },[cartProducts])

    const handleCartQtyDecrease = useCallback((product:CartProductType)=>{
        let updatedCart;
        if(product.quantity === 1){
            return toast.error('Oops Maximum reached')
        }

        if(cartProducts){
            updatedCart = [...cartProducts]
            const exisingIndex = cartProducts.findIndex((item) => item.id === product.id)
            if(exisingIndex> -1){
                updatedCart[exisingIndex].quantity = --updatedCart[exisingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('shop items', JSON.stringify(updatedCart))
        }

    },[cartProducts])


    const handleClearCart = useCallback(()=>{
        setCartProducts(null)
        setCartTotalQty(0)
        localStorage.setItem('shop items', JSON.stringify(null))
    },[cartProducts])



    const handlePaymentIntent = useCallback((val:string|null)=> {
        setPaymentIntent(val)
        localStorage.setItem('shopPaymentIntent', JSON.stringify(val))
    },[paymentIntent])


    const value = {
        cartTotalQty,
        cartTotalAmmout,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
        paymentIntent,
        handlePaymentIntent
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