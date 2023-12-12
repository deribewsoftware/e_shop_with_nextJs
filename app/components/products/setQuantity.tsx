"use client"

import { CartProductType } from "@/app/product/ProductDetails";

interface SetQuantityProps{
  cartCounter?:boolean;
  cartProduct:CartProductType;
  cartHandleIncrease:()=>void;
  cartHandleDecrease:()=>void;
}
const btnStyles='border-[1.2px] border-slate-300 px-2 rounded'
const SetQuantity:React.FC<SetQuantityProps> = ({cartCounter,cartProduct,cartHandleDecrease,cartHandleIncrease}) => {
  return ( <div className="flex gap-8 itemse-center">
    {cartCounter? null:<div className="font-semibold">QUANTITY:</div>}
    <div className="flex gap-4 items-center text-base">
      <button onClick={cartHandleDecrease} className={btnStyles}>-</button>
      <div className="text-slate-500">{cartProduct.quantity}</div>
      <button onClick={cartHandleIncrease} className={btnStyles}>+</button>
    </div>
  </div> );
}
 
export default SetQuantity;