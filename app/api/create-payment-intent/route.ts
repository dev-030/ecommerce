import { getCurrentUser } from '@/actions/getCurrentUser'
import { CartProductType } from '@/app/product/[productId]/productDetails'
import prisma from '@/libs/prismaClient'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {apiVersion:'2023-10-16'})

const calculateOrderAmmount = (items:CartProductType[]) => {
    const totalPrice = items.reduce((acc,item)=> {
        const itemTotal = item.price * item.quantity
        return acc+itemTotal
    },0)

    return totalPrice;
}

export async function POST(request:Request) {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.json({error:'Unautorized'},{status:401})
    }

    const body = await request.json()
    const {items,payment_intent_id} = body;
    const total = calculateOrderAmmount(items) *100

    const orderData = {
        user : {connect: {id:currentUser.id}},
        ammount : total ,
        currency : 'usd' ,
        status : "pending",
        deliveryStatus : 'pending',
        paymentIntentId : payment_intent_id,
        products : items
    }

    

}