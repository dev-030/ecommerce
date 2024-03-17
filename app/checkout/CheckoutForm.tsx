'use client'

import { useCart } from "@/hooks/useCart";
import FormatPrice from "@/libs/formatPrice";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import MyButton from "../components/MyButton";

interface props {
    clientSecret: string
    handleSetPaymentSuccess : (value:boolean) => void;
}

export default function CheckoutForm({clientSecret, handleSetPaymentSuccess}:props){

    const {cartTotalAmmout, handleClearCart, handlePaymentIntent} = useCart()
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    const formattedPrice = FormatPrice(cartTotalAmmout)


    useEffect(()=>{
        if(!stripe){
            return
        }

        if(!clientSecret){
            return
        }

        handleSetPaymentSuccess(false)

    },[stripe])


    const handleSubmit = async(event:React.FormEvent) => {
        event.preventDefault()
        if(!stripe || !elements){
            return
        }
        setIsLoading(true)

        stripe.confirmPayment({
            elements, redirect:'if_required'
        }).then((result)=>{
            if(!result.error){
                toast.success('Checkout Success')
                handleClearCart()
                handleSetPaymentSuccess(true)
                handlePaymentIntent(null)
            }

            setIsLoading(false)
        })
    }

    return(
        <form onSubmit={handleSubmit} id="payment-form">
            <div className="mb-6">
                <Heading title="Enter your details to complete checkout"/>
            </div>
            <h2 className="font-semibold mb-2">Address Infomation</h2>
            <AddressElement options={{mode:'shipping',allowedCountries:['US',"BD"]}}/>
            <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
            <PaymentElement id="payment-element" options={{layout:'tabs'}}/>
            <div className="py-4 text-center text-slate-700 text-xl font-bold">
                Total : {formattedPrice}
            </div>
            <MyButton label={isLoading ? "Processing":"Pay now"} disabled={isLoading||!stripe||!elements} onClick={()=>{}}/>
        </form>
    )
}