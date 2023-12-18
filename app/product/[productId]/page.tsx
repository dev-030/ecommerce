import Container from "@/app/components/container"
import ProductDetails from "./productDetails"
import { product } from "@/libs/product"




interface props {
    productId?: string
}

export default function Product({params}:{params:props}){

    console.log(params)

    return(
        <div className="p-8">
            <Container>
                <ProductDetails product={product}/>
            </Container>
        </div>
    )
}