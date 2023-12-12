"use client"

import React from "react";
import { IconType } from "react-icons/lib";

interface ButtonProps{
  disabled?:boolean;
  label:string;
  small?:boolean;
  outline?:boolean;
  custom?:string;
  icon?:IconType;
  onClick:(e:React.MouseEvent<HTMLButtonElement>)=>void;
}

const Button:React.FC<ButtonProps> = ({label,disabled,small,outline,icon:Icon,onClick,custom}) => {
  return ( <button 
    disabled={disabled}
    onClick={onClick}
    
    className={`
  w-full 
  disabled:opacity-70
   disabled:cursor-not-allowed
   hover:opacity-80
    rounded-md 
    border-slate-700 
    transition 
    flex
     items-center 
     justify-center
      gap-2 
      ${outline? 'bg-white text-slate-700':'bg-slate-700 text-white'}
      ${small? 'text-sm py-1 px-2 font-light border-[1px]':'text-md py-3 px-4 font-semibold border-2'}
      ${custom? custom:""}
      


      ` }>
    {Icon && <Icon size={24}/>}
    {label}
  </button> );
}
 
export default Button;