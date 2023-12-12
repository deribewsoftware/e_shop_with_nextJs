"use client"

import { CartProductType, SelectedImgType } from "@/app/product/ProductDetails";
import Image from "next/image";

interface ProductImagesProps{
  cartproduct:CartProductType;
  product:any;
  handleColorSelect:(value:SelectedImgType)=>void;
}
const ProductImages:React.FC<ProductImagesProps> = ({cartproduct,product,handleColorSelect}) => {
  return ( <div className="grid grid-cols-6 h-full max-h-[500px] min-h-[300px] gap-2 sm:min-h-[400px]">
    <div className="flex flex-col h-full max-h-[500px] min-h-[300px] gap-4 sm:min-h-[400px] items-center justify-center gap-4 cursor-pointer border">
      {product.images.map((image:any)=>{
        return <div onClick={()=>handleColorSelect(image)} key={image.color} 
        className={`relative w-[80%] aspect-square border-teal-300 rounded ${cartproduct.selectedImg.color===image.color? 'border-[1.5px]':'border-none'}`}>
          <Image
        fill
        src={image.image}
        alt={image.color}
        className="object-contain"
        />
        </div>
      })}
    </div>

    <div 
    className=" relative aspect-square col-span-5 
   
      ">
<Image
fill
src={cartproduct.selectedImg.image}
alt={cartproduct.name}
className="
w-full 
h-full
 max-h-[500px] 
 min-h-[300px] 
  sm:min-h-[400px]
  object-contain
"
/>
    </div>
  </div> );
}
 
export default ProductImages;