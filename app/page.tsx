import NullData from "./components/NullData";
import Container from "./components/container";
import HomeBanner from "./components/nav/homeBanner";
import ProductCard from "./components/products/productCard";
import getProducts, { IProductParams } from "@/actions/getProducts";

export default async function Home({searchParams}:{searchParams:IProductParams}) {

  const products = await getProducts(searchParams)

  if(products.length === 0) return <NullData title="No products found"/>

  // fisher-yates shuffle algorithm
  // function shuffleArray(array:any){
  //   for(let i=array.length-1; i>0; i++){
  //       const j = Math.floor(Math.random()*(i+1));
  //       [array[i], array[j]] = [array[j], array[i]]
  //   }
  //   return array;
  // }

  
  // const shuffledProducts = shuffleArray(products)

  return (
    <div className="p-8">
        <Container>
          <div>
            <HomeBanner/>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {products.map((product:any)=> {
              return <ProductCard key={product.id} data={product}/>
            })}
          </div>
        </Container>
    </div>
  )
}
