import Container from "@/app/components/container";
import ManageProductsClient from "./manageOrdersClient";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrders from "@/actions/getOrders";




export default async function ManageOrders(){

    const orders = await getOrders()
    const currentUser = await getCurrentUser()

    if(!currentUser || currentUser.role!== "ADMIN"){
        return <NullData title="Oops Accesss denied!"/>
    }

    return(
        <div className="pt-8">
            <Container>
             <ManageProductsClient orders={orders}/>
            </Container>
        </div>
    )
}