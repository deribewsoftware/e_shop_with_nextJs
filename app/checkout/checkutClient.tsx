"use client"

import { useCart } from "@/hooks/usecart";
import { error } from "console";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CheckoutClient = () => {
  const router=useRouter()
  const {cartProducts,paymentIntent,handlePaymentIntent}=useCart();
  const [IsLoading,setLoading]=useState(false)
  const [IsError,setError]=useState(false)
  const [clientSecret,setClientSecret]=useState('')
  console.log("payment",paymentIntent)
  console.log("client secret",clientSecret)
  useEffect(()=>{
if(cartProducts){
  setLoading(true)
  setError(false)
  fetch('/api/create-payment-intent',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      items:cartProducts,
      payment_intent_id:paymentIntent
    })
  }).then((res)=>{
    setLoading(false)
    if(res.status==401){
      return router.push('/login')
    }
    return res.json()
  }).then((data)=>{
    setClientSecret(data.paymentIntent.client_secret)
    handlePaymentIntent(data.paymentIntent.id)
  }).catch((error:any)=>{
    setError(true)
    console.log(error)
    toast.error("something went wrong")
  })
}
  },[cartProducts,paymentIntent])
  return (<div>
   checkout
  </div>);
}
 
export default CheckoutClient;