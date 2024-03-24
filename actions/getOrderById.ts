import prisma from '@/libs/prismaClient'




interface params{
    orderId?: string
}

export default async function getOrderById(params:params) {
    
    try {
        const {orderId} = params;
        const order = await prisma.order.findUnique({
            where:{id:orderId}
        })

        if(!order) return null;

        return order;
        
    } catch (error:any) {
        throw new Error(error)
    }
}