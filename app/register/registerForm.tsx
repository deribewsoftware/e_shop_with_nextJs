'use client'

import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import {AiOutlineGoogle} from 'react-icons/ai'
import axios from "axios";
import toast from "react-hot-toast";
import {signIn }from 'next-auth/react'
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";
interface RegisterFormProps{
  currentUser:SafeUser|null;
}

const RegisterForm:React.FC<RegisterFormProps> = ({currentUser}) => {
  const [isLoading,setLoading]=useState(false)
  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
    defaultValues:{
      name:"",
      email:"",
      password:""
    }
  })
const router=useRouter()
  const onSubmit:SubmitHandler<FieldValues>=(data)=>{
    setLoading(true)
    axios.post('/api/register/',data).then(()=>{
      toast.success("Account created Succesfully")
      signIn('credentials',{
        email:data.email,
        password:data.password,
        redirect:false
      }).then((callback)=>{
        if(callback?.ok){
          console.log("Lgged in")
          router.push('/cart')
          router.refresh()
          toast.success("Logged In")
        }

        if(callback?.error){
         
            toast.error(callback.error)
         
        }
      })
    }).catch(()=>toast.error("something went wrong")).finally(
      ()=>{
        setLoading(false)
      }
    )
    
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
  <Heading
  title="Sign up for E~shop"
  />

  <Button
  outline
  icon={AiOutlineGoogle}
  label="Sign up with Google"
  onClick={()=>{signIn('google')}}
  />
  <hr className="bg-slate-300 w-full h-px" />
  <Input
  id="name"
  label="Name"
  errors={errors}
  register={register}
  required
  type="text"
  disabled={isLoading}
  />

<Input
  id="email"
  label="Email"
  errors={errors}
  register={register}
  required
  type="text"
  disabled={isLoading}
  />

<Input
  id="password"
  label="Password"
  errors={errors}
  register={register}
  required
  type="password"
  disabled={isLoading}
  />

  <Button
  label={isLoading? 'Loading':'Sign up'}
  onClick={handleSubmit(onSubmit)}
  />
  <p className="text-sm" >Already have un account? <Link className="underline" href='/login'>Login</Link></p>
  </> );
}
 
export default RegisterForm;