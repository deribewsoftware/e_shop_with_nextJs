"use client"
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/inputs/input";
import {AiOutlineGoogle} from 'react-icons/ai'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Link from "next/link";
import {signIn }from 'next-auth/react'
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";
interface LoginProps{
  currentUser:SafeUser|null;
}
const LoginForm:React.FC<LoginProps> = ({currentUser}) => {

  const [IsLoading,setLoading]=useState(false)
  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({defaultValues:{
    email:"",
    password:""

    
  },});
const router=useRouter()
  const onLogin:SubmitHandler<FieldValues>=(data)=>{
    console.log(data)
    setLoading(true)


    signIn('credentials',{
      email:data.email,
      password:data.password,
      redirect:false
    }).then((callback)=>{
      setLoading(false)
      if(callback?.ok){
      
        router.push('/cart')
        router.refresh()
        toast.success("Logged succesfully")
      }

      if(callback?.error){
       
          toast.error(callback.error)
       
      }
    })
  

    
  }

  useEffect(()=>{
    if(currentUser){
      router.push('/cart')
      router.refresh()
    }
  },[])

  if(currentUser){
    return <p className="text-center">Logged In. Redirecting....</p>
  }
  return ( <>
  <Heading title="Sign in to E~Shop"/>
  <Button
   outline 
   icon={AiOutlineGoogle}
   label="Continue with Google"
    onClick={()=>{signIn('google')}}/>

<hr className="bg-slate-300 w-full h-px" />
  <Input
  id="email"
  disabled={IsLoading}
  register={register}
  label="Email"
  errors={errors}
  required
  />

<Input
  id="password"
  disabled={IsLoading}
  register={register}
  label="Password"
  errors={errors}
  required
  />

  <Button
  onClick={handleSubmit(onLogin)}
  label={IsLoading? "Loading":"Login"}
  />
    <p className="text-sm" >Do not have un account? <Link className="underline" href='/register'>Sign up</Link></p>


  </> );
}
 
export default LoginForm;