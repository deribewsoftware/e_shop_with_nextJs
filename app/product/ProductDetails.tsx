"use client"

import {  Rating } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import SetColor from "../components/products/SetColor";
import SetQuantity from "../components/products/setQuantity";
import Button from "../components/Button";
import ProductImages from "../components/products/productImages";
import { useCart } from "@/hooks/usecart";
import{MdCheckCircle} from 'react-icons/md'
import { useRouter } from "next/navigation";


interface ProductDeatilsProps{
  product:any;
}

export type CartProductType={
  id:string;
  name:string;
  description:string;
  category:string;
  brand:string;
  selectedImg:SelectedImgType;
  quantity:number;
  price:number;
}

export type SelectedImgType={
  color:string;
  colorCode:string;
  image:string;
}


const Horizontal=()=>{
  return <hr className="w-[30%] my-2"/>
}
const ProductDeatils:React.FC<ProductDeatilsProps> = ({product}) => {

  


const {cartTotalQuantity}=useCart();
const {handleAddProductToCart,cartProducts}=useCart();


console.log(cartProducts)
console.log(cartTotalQuantity);
  const [cartProduct,setCardProduct]=useState<CartProductType>({id:product.id,
    name:product.name,
    description:product.description,
    category:product.category,
    brand:product.brand,
    selectedImg:{...product.images[0]},
    quantity:product.quantity,
    price:product.price})

    const [IsProductInCart,setIsProductInCart]=useState(false)

    useEffect(()=>{
      setIsProductInCart(false)
      if (cartProducts){
        const existingIndex=cartProducts.findIndex((item)=>item.id==product.id)
        if(existingIndex>-1){
          setIsProductInCart(true)
        }
      }
    },[cartProducts])

const handleColorSelect=useCallback((value:SelectedImgType)=>{
  setCardProduct((prev)=>{
    return {...prev,selectedImg:value};
  })
},[cartProduct.selectedImg])




const cartHandleDecrease=useCallback(()=>{
 
  setCardProduct((prev:any)=>{

    if(prev.quantity===1){
      return {...prev}
    }
    return {...prev,quantity:--prev.quantity}
  })
},[cartProduct])
const cartHandleIncrease=useCallback(()=>{
  setCardProduct((prev)=>{

    if(prev.quantity===99){
      return {...prev}
    }
    return {...prev,quantity:++prev.quantity}
  })
},[cartProduct])



  const reviewsRating=product.reviews.reduce((acc:number,item:any)=>item.rating+acc,0)/product.reviews.length;

  const router=useRouter()
  return ( <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
    
<ProductImages
cartproduct={cartProduct}
product={product}
handleColorSelect={handleColorSelect}
/>


    <div className="flex flex-col text-sm text-slate-500 gap-1">
      <h1 className="text-3xl font-medium  text-slate-700">{product.name}</h1>
      <div className="flex items-center gap-2">
        <Rating value={reviewsRating} readOnly/>
        <div className="">{product.reviews.length} reviews</div>
      </div>
      <Horizontal/>
      <div className="text-justify">{product.description}</div>
      <Horizontal/>
      <div className="">
        <span className="font-semibold">CATEGORY:</span> {product.category}
      </div>

      <div className="">
        <span className="font-semibold">BRAND:</span> {product.brand}
      </div>

      <div className={product.inStock? 'text-teal-400':'txt-rose-400'}>
        {product.inStock? ' In Stock':'Out of Stock'}
      </div>

     {IsProductInCart? <>
     <p className="flex items-center mb-2 text-slate-500 gap-1"><MdCheckCircle className="text-teal-400" size={20}/> <span>Product Added to cart</span></p>
     <div className="max-w-[300px]">
      <Button
      outline
      label="View Cart"
      onClick={()=>router.push('/cart')}
      />
     </div>
     </>:<>
     <Horizontal/>
     <SetColor
     images={product.images}
     cartProduct={cartProduct}
     handSelectImg={handleColorSelect}
     />
      <Horizontal/>
      <SetQuantity
      cartProduct={cartProduct}
      cartHandleDecrease={cartHandleDecrease}
      cartHandleIncrease={cartHandleIncrease}
      />
      <Horizontal/>

      <div className="max-w-[300px]">
      <Button
      onClick={()=>handleAddProductToCart(cartProduct)}
      label={"Add to cart"}
      />
      </div>
     </>}
    </div>
  </div> );
}
 
export default ProductDeatils;