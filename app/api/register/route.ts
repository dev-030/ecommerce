import bcrypt from 'bcrypt';
import prisma from '@/libs/prismaClient'
import { NextResponse } from 'next/server';



export async function POST(request:Request) {
    const body = await request.json()
    const {name,email,password} = body;
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await prisma.user.create({
        data : {
            name ,
            email ,
            hashedPassword
        }
    })

    return NextResponse.json({message:user})

}


export async function GET(request: Request) {
    // const user = await prisma.user.findMany({}) 
    // console.log(user?.hashedPassword)

    const user = await prisma.user.findUnique({
        where : {
            email : "jamil@gmail.com"
        }
    }) 

    if(!user ||  !user?.hashedPassword){
        throw new Error('Invalid email and password')
    }

    return NextResponse.json(user)
}