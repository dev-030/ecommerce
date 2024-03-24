import prisma from '@/libs/prismaClient';


export default async function(params){
    try {

        const {productId} = params;

        const product = await prisma.product.findUnique({
            where:{
                id:productId
            },
            include:{
                reviews:{
                    include:{
                        user: true
                    },
                    orderBy:{
                        createdAt:'desc'
                    }
                }
            }
        })

        if(!product) return null;

        return product;
    } catch (error:any) {
        throw new Error(error)
    }
}