import Container from "@/app/components/Container";
import ProductDeatils from "../ProductDetails";

import ListRating from "../listRating";
import { products } from '@/utils/product'

interface Iprams{
  productId?:string;
}
const Product = ({params}:{params:Iprams}) => {

  const product=products.find((item)=>item.id==params.productId)
  console.log('params',params)
  return ( <div className="p-8">
    <Container>
      <ProductDeatils product={product}/>
      <div className="flex flex-col mt-20 gap-4">
<div className="">Add rating</div>
<ListRating
product={product}
/>

      </div>
    </Container>
  </div> );
}
 
export default Product;