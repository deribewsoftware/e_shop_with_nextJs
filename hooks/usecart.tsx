import { CartProductType } from "@/app/product/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { json } from "stream/consumers";
type CartContextType={
  cartTotalQuantity:number;
  cartTotalAmount:number;
  cartProducts:CartProductType[]|null;
 
  handleAddProductToCart:(product:CartProductType)=>void
  handleRemoveProductFromCart:(product:CartProductType)=>void
  handleIncreaseCartQuantity:(product:CartProductType)=>void
  handleDecreaseCartQuantity:(product:CartProductType)=>void
  handleClearCart:()=>void
  paymentIntent:string|null
  handlePaymentIntent:(val:string|null)=>void

}

interface Props{
  [PropName:string]:any;
}
export const CartContext=createContext<CartContextType|null>(null)

export const CartContextProvider=(props:Props)=>{
  const [cartTotalQuantity,setCartTotalQuantity]=useState(0)

  const [cartTotalAmount,setCartTotalAmount]=useState(0)
  const [cartProducts,setCartProduct]=useState<CartProductType[]|null>(null)

const[paymentIntent,setPaymentIntent]=useState<string|null>(null)

  useEffect(()=>{
    const cartItems:any=localStorage.getItem('eShopCartItems');
    const cartProduct:CartProductType[]|null=JSON.parse(cartItems)
    const eShopPaymentIntent:any=localStorage.getItem("eShopPaymentIntent")
    const paymentIntent:string|null=JSON.parse(eShopPaymentIntent)
    
    setCartProduct(cartProduct)
    setPaymentIntent(paymentIntent)
  },[])


  useEffect(()=>{
    const getTotals=()=>{

      if(cartProducts){
        const {total,qty}=cartProducts.reduce((acc,item)=>{
          const totalItems=item.price*item.quantity
          acc.total+=totalItems
          acc.qty+=item.quantity
          return acc;
        }
        ,{total:0,qty:0})
        setCartTotalQuantity(qty)
        setCartTotalAmount(total)
      }
      

      }
    
    getTotals()
  },[cartProducts])

  const handleClearCart=useCallback(()=>{
    setCartProduct(null)
    setCartTotalQuantity(0)
    localStorage.setItem('eShopCartItems',JSON.stringify(null))
    
  },[cartProducts])
const handleIncreaseCartQuantity=useCallback((product:CartProductType)=>{
  if (product.quantity==99){
    return toast.error("Ooops! Maximum reached")
  }
  let updateQuantity;
  if(cartProducts){
    const exitingIndex=cartProducts.findIndex((item)=>item.id===product.id)
    updateQuantity=[...cartProducts]
    if(exitingIndex>-1){
      updateQuantity[exitingIndex].quantity=++updateQuantity[exitingIndex].quantity
    }
    
    setCartProduct(updateQuantity)
    localStorage.setItem('eShopCartItems',JSON.stringify(updateQuantity))
  }

},[cartProducts])

const handleDecreaseCartQuantity=useCallback((product:CartProductType)=>{
  if (product.quantity==1){
    return toast.error("Ooops! Minimum reached")
  }
  let updateQuantity;
  if(cartProducts){
    const exitingIndex=cartProducts.findIndex((item)=>item.id===product.id)
    updateQuantity=[...cartProducts]
    if(exitingIndex>-1){
      updateQuantity[exitingIndex].quantity=--updateQuantity[exitingIndex].quantity
    }
    
    setCartProduct(updateQuantity)
    localStorage.setItem('eShopCartItems',JSON.stringify(updateQuantity))
  }

},[cartProducts])


const handleAddProductToCart=useCallback((product:CartProductType)=>{
  setCartProduct((prev)=>{
    let updatedCart;
    if (prev){
     
      updatedCart=[...prev,product];
    }
    else{
       updatedCart=[product];

    }
    toast.success("Product addet to cart")
    localStorage.setItem('eShopCartItems',JSON.stringify(updatedCart))
    return updatedCart;
    
  })
},[]);

const handleRemoveProductFromCart=useCallback((product:CartProductType)=>{
  if(cartProducts){
    const filteredProduct=cartProducts.filter((item)=>item.id!==product.id)
    setCartProduct(filteredProduct)
    toast.success("Product removed  from cart")
    localStorage.setItem('eShopCartItems',JSON.stringify(filteredProduct))
   
  }
},[cartProducts])

const handlePaymentIntent=useCallback((val:string|null)=>{
  setPaymentIntent(val)
  localStorage.setItem("eShopPaymentIntent",JSON.stringify(val))

},[paymentIntent]);

  const value={
    cartTotalQuantity,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleIncreaseCartQuantity,
    handleDecreaseCartQuantity,
    handleClearCart,
    cartTotalAmount,
    paymentIntent,
    handlePaymentIntent
  }


  return <CartContext.Provider value={value} {...props}/>
}

export  const useCart=()=>{
  const context=useContext(CartContext);
  if(context===null){
    throw new Error("cart context use within a cartContextprovider")
  }
  return context;
}