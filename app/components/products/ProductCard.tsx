"use client"
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps{
  name:string;
  image:string;
  reviews:any[];
  price:number;
  id:string;

}


const ProductCard:React.FC<ProductCardProps> = ({id,name,image,reviews,price}) => {

  const router=useRouter();
  const reviewsRating=reviews.reduce((acc,item)=>item.rating+acc,0)/reviews.length
  return ( <div onClick={()=>router.push(`/product/${id}`)} className="col-span-1 bg-slate-50 rounded-sm border-[1.2px] border-slate-200 p-2 cursor-pointer text-center text-sm transition hover:scale-105">

    <div className="flex flex-col justify-center items-center w-full gap-1">
      <div className="aspect-square relative overflow-hidden w-full">
       <Image
      className="w-full h-full object-contain"
       fill
       src={image}
       alt={name}
       />
      </div>
      <div  className="mt-4">{truncateText(name)}</div>

      <div className=""> <Rating value={reviewsRating} readOnly/></div>
      <div className="">{reviews.length} reviews</div>
      <div className="font-semibold">{formatPrice(price)}</div>
    </div>
  </div> );
}
 
export default ProductCard;