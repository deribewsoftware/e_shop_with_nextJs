import Image from 'next/image'
import HomeBanner from './components/HomeBanner'
import Container from './components/Container'
import { products } from '@/utils/product'
import { truncateText } from '@/utils/truncateText'
import ProductCard from './components/products/ProductCard'

export default function Home() {
  return (
   
         <div className='p-8'>
<Container>
<div className=""><HomeBanner/></div>
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-8">
  {
    products.map((product)=>{
      return <ProductCard
      id={product.id}
      key={product.id}
      name={product.name}
      image={product.images[0].image}
      reviews={product.reviews}
      price={product.price}
      ></ProductCard>
    })
  }
</div>
</Container>
         </div>
         
        
  )
}
