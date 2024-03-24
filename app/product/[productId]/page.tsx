import Container from "@/app/components/container"
import ProductDetails from "./productDetails"
import ListRating from "./listRating"
import { products } from "@/libs/products"
import getProductById from "@/actions/getProductById"
import NullData from "@/app/components/NullData"






export default async function Product({params}:{params:{productId?:string}}){

    const product = await getProductById(params)

    if(!product) return <NullData title="No products found"/>

    return(
        <div className="p-8">
            <Container>
                <ProductDetails product={product}/>
                <div className="flex flex-col mt-20 gap-4">
                    <div>Add rating</div>
                    <ListRating product={product}/>
                </div>
            </Container>
        </div>
    )
}