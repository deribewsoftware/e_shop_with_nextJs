import bcrpt from 'bcrypt'
import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb'

export  async function POST(request:Request) {
  const body=await request.json()

  const {name,email,password}=body
  const hashPassword=await bcrpt.hash(password,10)
  const newUser=await prisma?.user.create({
    data:{name:name,email:email,hashedPassword:hashPassword}
  });
  return NextResponse.json(newUser)
  
}