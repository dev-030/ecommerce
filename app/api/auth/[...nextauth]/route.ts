import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

import googleProvier from 'next-auth/providers/google'
import  CredentialsProvider  from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '@/libs/prismaClient'
import bcrypt from 'bcrypt'


export const authOptions:NextAuthOptions = {
    adapter: PrismaAdapter(prisma) ,
    providers : [
        googleProvier ({
            clientId : process.env.GOOGLE_CLIENT_ID as string ,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }) ,
        CredentialsProvider ({
            name : "User cedentials",
            credentials : {
                email: { label: "email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials){

                if (!credentials?.email || !credentials.password) {
                    throw new Error('Invalid email and password')
                  }
                
                const user = await prisma.user.findUnique({
                    where : {
                        email : credentials.email,
                    }
                }) 


                if(!user || !user?.hashedPassword){
                    throw new Error('Invalid email and password')
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )

                if(!isCorrectPassword){
                    throw new Error('Invalid email and password')
                }

                return user;
            }
        })
    ],
    pages : {
        signIn : '/login'
    },
    debug : process.env.NODE_ENV === 'development',
    session : {
        strategy : 'jwt'
    },
    // secret : process.env.NEXTAUTH_SECRET,
   
}

const handler = NextAuth(authOptions);
export {handler as GET , handler as POST}