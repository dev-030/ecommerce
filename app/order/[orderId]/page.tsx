import Container from "@/app/components/container"
import OrderDetails from "./OrderDetails"
import getOrderById from "@/actions/getOrderById"
import NullData from "@/app/components/NullData"




interface props {
    orderId?: string
}

export default async function Order({params}:{params:props}){


    const order = await getOrderById(params)

    if(!order) return <NullData title="No order"/>

    return(
        <div className="p-8">
            <Container>
                <OrderDetails order={order}/>
            </Container>
        </div>
    )
}