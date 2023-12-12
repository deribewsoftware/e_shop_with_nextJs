"use client"

import { Avatar } from "@mui/material";
import { useCallback, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import MenuItems from "./menuItems";
import Link from "next/link";
import BackDrop from "./backDrop";
import { SafeUser } from "@/types";
import { signOut } from "next-auth/react";
interface UserMenuItems{
  currentUser:SafeUser|null;
}
const Usermenu:React.FC<UserMenuItems> = ({currentUser}) => {
  const [isOpen,setIsOpen]=useState(false)
  const toggleOpen=useCallback(()=>{
    setIsOpen((prev)=>!prev)
  },[])

 
  return ( <>
  <div className="relative z-30">
    <div className="p-2 
    flex flex-row 
    items-center
     border-slate-400 
     border-[1px] gap-1 
     rounded-full
     hover:shadow-md
     text-slate-700
     cursor-pointer
     transition
     " onClick={toggleOpen}>
      <Avatar src={`${currentUser?.image}`} alt="profile"/>
      <AiFillCaretDown/>

    </div>
    <h1>{currentUser?.name}</h1>
{isOpen &&(
  <div className="
  absolute
  w-[170px]
  top-12
  right-0
  shadow-md
  overflow-hidden
  text-sm
  bg-white
  rounded-md
  cursor-pointer
  flex
  flex-col

  ">

    {currentUser? <div className="">
    <Link href="orders">
    <MenuItems onClick={toggleOpen}>
you orders
    </MenuItems>
    </Link>

    <Link href="admin">
    <MenuItems onClick={toggleOpen}>
Admin Dashboard
    </MenuItems>
    </Link>
<hr />
    <MenuItems onClick={()=>{
      toggleOpen();
      signOut()}}>
Logout
    </MenuItems>
   </div>: <div className="">

<Link href="/login">
 <MenuItems onClick={toggleOpen}>
Login
 </MenuItems>
 </Link>

 <Link href="/register">
 <MenuItems onClick={toggleOpen}>
Register
 </MenuItems>
 </Link>
</div>}
   

  
  </div>
  
)}
  </div> 
  {isOpen? <BackDrop onClick={toggleOpen}/>:null}
  </>);
}
 
export default Usermenu;