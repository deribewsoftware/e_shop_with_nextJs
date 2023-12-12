"use client"

import { ImageType } from "@/app/admin/add-products/addProductForm"
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface SelectImageProps{
  item:ImageType;
  handleFileChange:(value:File)=>void
}
const SelectImage:React.FC<SelectImageProps> = ({item,handleFileChange}) => {
  const onDrop = useCallback((acceptedFiles:File[]) => {
    // Do something with the files
    if(acceptedFiles.length>0){
      handleFileChange(acceptedFiles[0])
    }
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,accept:{'image/*':['.jpeg','.png']}})
  return ( <div{...getRootProps()} className="border-2 border-slate-400 border-dashed p-2 cursor-pointer text-sm font-normal text-slate-400 flex font-normal justify-center items-center
  ">
  <input {...getInputProps()}/>
  {isDragActive?<p>Drop image here...</p>:<p>+ {item?.color} image </p>}
  </div>);
}
 
export default SelectImage;