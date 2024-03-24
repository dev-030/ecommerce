import Container from "@/app/components/container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrdersByUserId from "@/actions/getOrdersByUserId";
import OrderClient from "./orderClient";




export default async function Orders(){

    const currentUser = await getCurrentUser()

    if(!currentUser){
        return <NullData title="Oops Accesss denied!"/>
    }

    const orders = await getOrdersByUserId(currentUser.id)

    if(!orders) return <NullData title="No orders yet."/>

    return(
        <div className="pt-8">
            <Container>
             <OrderClient orders={orders}/>
            </Container>
        </div>
    )
}