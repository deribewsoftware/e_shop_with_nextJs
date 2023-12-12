import Stripe from 'stripe'
import prisma from '@/libs/prismadb'
import { CartProductType } from '@/app/product/ProductDetails'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { NextResponse } from 'next/server'

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY as string,{
  apiVersion:'2023-10-16'
})

const calculateOrderAmount=(items:CartProductType[])=>{
  const totalPrice=items.reduce((acc,item)=>{
 const itemsTotal=item.price*item.quantity
 return acc+itemsTotal
  },0);

  const price:number=Math.floor(totalPrice)
  return price;

}

export async function POST(request:Request) {
  const currentUser=await getCurrentUser();
  if (!currentUser){
    return NextResponse.json({error:"Unauthorized"
    },{status:401})
  }

  const body=await request.json()
  const {items,payment_intent_id}=body
  const total=calculateOrderAmount(items)





  const orderData={
    user:{connect:{id:currentUser.id}},
    amount:total,
    currency:"usd",
    status:"pending",
    deliveryStatus:"pending",
    paymentIntentId:payment_intent_id,
    products:items
  }

  if(payment_intent_id){
    //update order

    const currentIntent=await  stripe.paymentIntents.retrieve(payment_intent_id);
    if(currentIntent){
      const updated_Intent=await stripe.paymentIntents.update(payment_intent_id,{amount:total})
    

    const [existingOrder,updatedOrder]=await Promise.all([
      prisma.order.findFirst({where:{paymentIntentId:payment_intent_id}}),
      prisma.order.update({
        where:{paymentIntentId:payment_intent_id},
        data:{amount:total,products:items}})
    ]);
    if(!existingOrder){
      return NextResponse.json({error:"Invalid Payment Intent"},{status:400})
    }
    return NextResponse.json(({paymentIntent:updated_Intent}))
  }}


  else{
///create payment Intent
const paymentIntent=await stripe.paymentIntents.create({
  amount:total,
  currency:"usd",
  automatic_payment_methods: {enabled: true}
})


//create order
orderData.paymentIntentId=paymentIntent.id

await prisma.order.create({
  data:orderData
});

return NextResponse.json({paymentIntent});
  }
}