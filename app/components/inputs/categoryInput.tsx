"use client"

import { IconType } from "react-icons";

interface CategoryInputProps{
  selected?:boolean;
  label:string;
  icon:IconType;
  onClick:(value:string)=>void;
}

const CategoryInput:React.FC<CategoryInputProps>= ({selected,label,icon:Icon,onClick}) => {
  return ( <div onClick={()=>onClick(label)} className={`flex flex-col gap-2 p-4 rounded-xl border-2 items-center hover:border-slate-500 transition cursor-pointer ${selected? "border-slate-500":"border-slate-200"}`}>
<Icon size={30}/>
<div className="font-medium">{label}</div>
  </div> );
}
 
export default CategoryInput;