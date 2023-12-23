import Container from "@/app/components/container"
import ProductDetails from "./productDetails"
import ListRating from "./listRating"
import { products } from "@/libs/products"




interface props {
    productId?: string
}

export default function Product({params}:{params:props}){


    const product = products.find((item)=> item.id === params.productId)

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