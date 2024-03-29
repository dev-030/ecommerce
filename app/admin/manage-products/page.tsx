import Container from "@/app/components/container";
import ManageProductsClient from "./manageProductsClient";
import getProducts from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";




export default async function ManageProducts(){

    const products = await getProducts({category:null})
    const currentUser = await getCurrentUser()

    if(!currentUser || currentUser.role!== "ADMIN"){
        return <NullData title="Oops Accesss denied!"/>
    }

    return(
        <div className="pt-8">
            <Container>
             <ManageProductsClient products={products}/>
            </Container>
        </div>
    )
}