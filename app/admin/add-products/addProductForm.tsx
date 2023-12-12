"use client"

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/categoryInput";
import CustomCheckbox from "@/app/components/inputs/customCheckbox";
import Input from "@/app/components/inputs/input";
import SelectColorInput from "@/app/components/inputs/selectColorInput";
import TextArea from "@/app/components/inputs/textArea";
import firebaseApp from "@/libs/firebase";
import { categories } from "@/utils/categories";
import { colors } from "@/utils/colors";
import axios from "axios";


import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import { useRouter } from "next/navigation";





import { use, useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export type ImageType={
  color:string;
  colorCode:string;
  image:File|null
}

export type UploadedImageType={
  color:string;
  colorCode:string;
  image:string
}

const AddProductForm = () => {
  const [isLoading,setLoading]=useState(false)
  const [images, setImages]=useState<ImageType[]|null>(null)
  const [isProductcreated,setProductCreated]=useState(false)
 
  const router=useRouter()
  
  const {register,handleSubmit,setValue,watch,reset,formState:{errors}}=useForm<FieldValues>({defaultValues:{
    name:"",
    description:"",
    brand:"",
    category:"",
    inStock:false,
    images:[],
    price:""


  }})

  useEffect(()=>{
    setCustomValue("images",images)
  },[images])


  useEffect(()=>{
if(isProductcreated){
  reset()
  setImages(null)
  setProductCreated(false)
}

  },[isProductcreated])

  const addImageToState=useCallback((value:ImageType)=>{
    setImages((prev:any)=>{
      if(!prev){
        return [value]
      }
      
      return [...prev,value]
    })
    
  },[])



  const removeImageFromState=useCallback((value:ImageType)=>{
   setImages((prev:any)=>{
    if(prev){
      const filterData=prev.filter((item:any)=>item.color!==value.color)
      return filterData
    }
   })
  },[]) 
  
  
  const category=watch('category')
  const setCustomValue=(id:string,value:any)=>{
    setValue(id,value,{
      shouldValidate:true,
      shouldDirty:true,
      shouldTouch:true
    })
  }


  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
console.log(data)

//upload image to firebase storage 
let uploadedimages:UploadedImageType[]=[]
if(!data.category){
  setLoading(false)
  return toast.error("Category is not selected")
}

if(!data.images||data.images.length==0){
  setLoading(false)
  return toast.error("Images is not selected")
}
const handleImageUploaded=async()=>{
  toast("Creating Product ,please wait...")
try{
  for(const item of data.images){
    if(item.image){
      const fileName=new Date().getTime()+"-"+item.image.name
      const storage=getStorage(firebaseApp)
      const storageRef=ref(storage,`products/${fileName}`)
      const uploadTask=uploadBytesResumable(storageRef,item.image)
      await new Promise<void>((resolve,reject)=>{
        uploadTask.on(
          'state_changed',
          (snapshot)=>{
            const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
            console.log("upploaded"+progress+"%")
            switch(snapshot.state){
              case "paused":
                console.log("paused")
                break
              case "running":
                console.log("running")
                break
            }
          },
          (error)=>{
            console.log("uploading image error",error)
            reject(error)
          },
          ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
              uploadedimages.push(
                {...item,image:downloadUrl}
              )
              console.log("file is available at",downloadUrl)
              resolve()
            }).catch((error)=>{
              console.log(error)
              reject(error)
            })
          }

        )
      })
    }
  }
}
catch(error){
  setLoading(false)
  console.log("Error Handling Image uploads",error)
  return toast.error("Error Handling Image uploads")

}
}
await handleImageUploaded()
const productdata={...data,images:uploadedimages}
await axios.post('/api/product',productdata).then(()=>{
  toast.success("product created")
  setProductCreated(true)
  router.refresh()
}).catch((error)=>{
  toast.error("something went wrong")
}).finally(()=>{
  setLoading(false)
})
// save images on mongo db
  }



  return ( <>
    <Heading title="Add a Product " center/>
    <Input
    id="name"
    label="Name"
    disabled={isLoading}
    register={register}
    errors={errors}
    type="text"
    />

<Input
    id="price"
    label="Price"
    disabled={isLoading}
    register={register}
    errors={errors}
    type="number"
    />

<Input
    id="brand"
    label="Brand"
    disabled={isLoading}
    register={register}
    errors={errors}
    type="text"
    />

<TextArea
    id="description"
    label="Description"
    disabled={isLoading}
    register={register}
    errors={errors}
    
    />

<CustomCheckbox
    id="inStock"
    label="This product is in stock"
    disabled={isLoading}
    register={register}
    
    
    />
    <div className="w-full font-medium">
      <div className="font-semibold mb-2">Select Category</div>
      <div className="grid grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto gap-3 ">
        {categories.map((item)=>{
          if(item.label==="All"){
            return null;
          }
          return <div  key={item.label} className="col-span">
             <CategoryInput
         
          icon={item.icon}
          label={item.label}
          onClick={(category)=>setCustomValue("category",category)}
          selected={category===item.label}
          />
          </div>
        })}

      </div>
    </div>
    <div className="w-full flex flex-col gap-4 flex-wrap">
      <div className="">
        <div className="font-bold">
          Select the available  product colors and upload their images
        </div>
        <div className="text-sm">
          You must upload un image for each of the color selected otherwise your color selection will be ignored
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {colors.map((item,index)=>{
          return <SelectColorInput key={index} item={item} addImageToState={addImageToState} removeImageFromState={removeImageFromState} isProductCreated={isProductcreated}/>
        })}
      </div>
    </div>
    <Button label={isLoading? "Loading...":"Add to Product"} onClick={handleSubmit(onSubmit)}/>
  </> );
}
 
export default AddProductForm;