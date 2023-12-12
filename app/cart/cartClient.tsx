"use client"

import { useCart } from "@/hooks/usecart";
import Link from "next/link";
import {MdArrowBack} from 'react-icons/md'
import Heading from "../components/Heading";
import Button from "../components/Button";
import Itemcart from "./ItemCart";
import { formatPrice } from "@/utils/formatPrice";
const CartClient = () => {
  const {cartProducts,handleClearCart,cartTotalAmount,cartTotalQuantity}=useCart();
  if (!cartProducts||cartProducts.length===0){
    return <div className="flex flex-col items-center">
      <div className="text-2xl">
        Your Cart is Empty
      </div>
      <div className="">
        <Link href={'/'} className="flex text-slate-500 mt-2 items-center gap-1">
          <MdArrowBack/>
        <span>Start Shopping</span></Link>
      </div>
    </div>
  }
  return ( <div className="">
    <Heading title="Shopping Cart" center/>
    <div className="grid grid-cols-5 pb-2 text-xs items-center gap-4 mt-8">
      <div className="span-col-2 justify-self-start">PRODUCT</div>
      <div className="justify-self-center">PRICE</div>
      <div className="justify-self-center">QUANTITY</div>
      <div className="justify-self-end">TOTAL</div>
    </div>

    <div className="">
      {cartProducts&&cartProducts.map((item)=>{
        return <Itemcart key={item.id} item={item}/>
      })}
    </div>
    <div className="flex justify-between gap-4 py-4 border-t-[1.5px] border-slate-200">
      <div className="w-[90px]">

        <Button outline small label="Clear cart" onClick={()=>handleClearCart()}/>
      </div>
      <div className="flex flex-col items-start text-sm gap-1">
        
          <div className="flex justify-between text-base font-semibold w-full">
          <span>Subtotal</span>
          <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p className="text-slate-500">Taxes and shipping calculate at checkout</p>
       <Button label="Checkout" onClick={()=>{}}/>
       <Link href={'/'} className="flex text-slate-500 mt-2 items-center gap-1">
          <MdArrowBack/>
        <span>Continue Shopping</span></Link>
      </div>
    </div>
  </div> );
}
 
export default CartClient;