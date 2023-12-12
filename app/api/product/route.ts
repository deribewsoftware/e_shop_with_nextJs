
import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb'
import { getCurrentUser } from '@/actions/getCurrentUser';

export  async function POST(request:Request) {

  const currentUser=await getCurrentUser()
  if(!currentUser || currentUser.role !=="ADMIN"){
    return NextResponse.error()
  }
  const body=await request.json()

  const {name,description,price,brand ,category,images,inStock}=body
 
  const newProduct=await prisma?.product.create({
    data:{name:name,
      description:description,
    price:parseFloat(price),
    brand:brand,
    category:category,
    inStock:inStock,
    image:images
    }
  });
  return NextResponse.json(newProduct)
  
}

export async function PUT(request:Request){
  const currentUser=await getCurrentUser()
  if(!currentUser || currentUser.role !=="ADMIN"){
    return NextResponse.error()
  }
  const body=await request.json()
  const{id,inStock}=body
  const updateProduct=await prisma.product.update({
    where:{id:id},
    data:{inStock}
  });
  return NextResponse.json(updateProduct)

}

