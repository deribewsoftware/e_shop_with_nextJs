"use client"

import ActionBtn from "@/app/components/ActionBtn";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/status";
import firebaseApp from "@/libs/firebase";
import { formatPrice } from "@/utils/formatPrice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Product } from "@prisma/client";
import axios from "axios";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md";

interface ManageProductClientProps{
  products:Product[];
}
const ManageProductClient:React.FC<ManageProductClientProps> = ({products}) => {
const router=useRouter()
  let rows:any=[]
  if(products){
    rows=products.map((product)=>{
      return {
        id:product.id,
        name:product.name,
        price:formatPrice(product.price),
        brand:product.brand,
        images:product.image,
        inStock:product.inStock,
        category:product.category
      }
    })
  }

  const columns:GridColDef[]=[
    {field:"id",headerName:"ID",width:220},
    {field:"name",headerName:"Name",width:220},
    {field:"price",headerName:"Price(USD)",width:100,
    renderCell:(params)=>{
      return <div className="font-bold text-slate-800">{params.row.price}</div>
    }
  },
  {field:"category",headerName:"Category",width:100},
  {field:"brand",headerName:"Brand",width:100},
  {field:"inStock",headerName:"inStock",width:120,
  renderCell:(params)=>{
    return <div>{params.row.inStock==true?
       <Status
       label="in stock"
       bg="bg-teal-200"
       color="text-teal-700"
       icon={MdDone}

    />:<Status
    label="out of stock"
    bg="bg-rose-200"
    color="text-rose-700"
    icon={MdClose}

 />}</div>
  }
},
{field:"actions",headerName:"Actions",width:200,
renderCell:(params)=>{
  return <div  className="flex justify-between gap-4 w-full">
   <ActionBtn
   icon={MdCached}
   onClick={()=>handleToggleStock(params.row.id,params.row.inStock)}
   />

<ActionBtn
   icon={MdDelete}
   onClick={()=>handleDeleteProduct(params.row.id,params.row.images)}
   />

<ActionBtn
   icon={MdRemoveRedEye}
   onClick={()=>router.push(`/product/${params.row.id}`)}
   />
  </div>
}
},
  ]


const storage=getStorage(firebaseApp)
const handleToggleStock=useCallback((id:string,inStock:boolean)=>{
  axios.put('/api/product',{
    id,
    inStock:!inStock
  }).then(()=>{
    toast.success("product status changed")
    router.refresh()

  }).catch(()=>{
    toast.error("Something went error")
  })
},[])

const handleDeleteProduct=useCallback(async(id:string,images:any[])=>{
  toast("deleting product; please wait...")
  const handleImageDelete=async()=>{
    
    try{
      for(const item of images){
        if (item.image){
          const imageRef=ref(storage,item.image)
          await deleteObject(imageRef);
        }
      }
    }

    catch(error){
console.log(error)
    }
  }
  await handleImageDelete();
  await axios.delete(`/api/product/${id}`).then(()=>{
    toast.success("product deleted")
    router.refresh()

  }).catch(()=>{
    toast.error("Failed to delete product")
  })

},[])



  return ( <div className="max-w-[1150px] text-xl m-auto">
    <div className="mt-8 mb-4">
<Heading title="Manage Products" center/>
    </div>
    <div style={{height:"600px" ,width:"100%"}}>
    <DataGrid
  rows={rows}
  columns={columns}
  initialState={{
    pagination: {
      paginationModel: { page: 0, pageSize: 5 },
    },
  }}
  pageSizeOptions={[5, 10]}
  checkboxSelection
  disableColumnFilter
/>
    </div>
    
  </div> );
}
 
export default ManageProductClient;