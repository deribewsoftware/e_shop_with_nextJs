"use client"

import { ImageType } from "@/app/admin/add-products/addProductForm"
import { useCallback, useEffect, useState } from "react";
import SelectImage from "./selectImage";
import Button from "../Button";

interface SelectColorProps{
  item:ImageType;
  addImageToState:(value:ImageType)=>void;
  removeImageFromState:(value:ImageType)=>void;
  isProductCreated:boolean;
}
const SelectColorInput:React.FC<SelectColorProps> = ({item,addImageToState,removeImageFromState,isProductCreated}) => {
  const [IsSelected,setSelected]=useState(false)
  const [file,setFile]=useState<File|null>(null)
  useEffect(()=>{
    if(isProductCreated){
      setSelected(false)
      setFile(null)
    }

  },[isProductCreated])
  const handleFileSChange=useCallback((value:File)=>{
    setFile(value)
    addImageToState({...item,image:value})
  },[])

  const handleCheckChange=useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
    setSelected(e.target.checked)
    if(!e.target.checked){
      setFile(null)
      removeImageFromState(item)
    }

  },[])
  return ( <div className="grid grid-cols-1 md:grid-cols-1 border-b-[1.2px] border-slate-200 overflow-y-auto p-2 items-center">
    <div className="flex flex-row h-[60px] items-center gap-2">
      <input id={item.color} type="checkbox" checked={IsSelected} onChange={handleCheckChange} 
      className="cursor-pointer"
      />
      <label htmlFor={item.color} className="font-medium cursor-pointer">{item.color}</label>
    </div>
    <>
    {IsSelected && !file &&(
      <div className="col-span-2 text-center">
<SelectImage item={item} handleFileChange={handleFileSChange}/>
      </div>
    )}
    {file &&(
      <div className="flex flex-row gap-2 col-span-2 text-sm items-center justify-between">
        <p>{file?.name}</p>
        <div className="w-[70px]">
        <Button outline small label="cancel" onClick={()=>{
          setFile(null);
          removeImageFromState(item)
        }}/>
        </div>
      </div>
    )}
    </>
  </div> );
}
 
export default SelectColorInput;