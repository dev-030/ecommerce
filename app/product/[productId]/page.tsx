import Container from "@/app/components/container"
import ProductDetails from "./productDetails"
import { product } from "@/libs/product"
import ListRating from "./listRating"




interface props {
    productId?: string
}

export default function Product({params}:{params:props}){


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