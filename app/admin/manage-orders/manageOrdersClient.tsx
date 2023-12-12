"use client"

import ActionBtn from "@/app/components/ActionBtn";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/status";

import { formatPrice } from "@/utils/formatPrice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Order, User} from "@prisma/client";
import axios from "axios";

import moment from "moment";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { MdAccessTimeFilled,MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";

interface ManageOrdersClientProps{
  orders:ExtendedOrder[];
}
type ExtendedOrder=Order&{
  user:User

}
const ManageOrdersClient:React.FC<ManageOrdersClientProps> = ({orders}) => {
const router=useRouter()
  let rows:any=[]
  if(orders){
    rows=orders.map((order:any)=>{
      return {
        id:order.id,
        customer:order.user.name,
        amount:formatPrice(order.amount/100),
        date:moment(order.createdAt).fromNow(),
       
        deliveryStatus:order.deliveryStatus,
        paymentStatus:order.status
      }
    })
  }

  const columns:GridColDef[]=[
    {field:"id",headerName:"ID",width:220},
    {field:"customer",headerName:"Customer Name",width:130},
    {field:"amount",headerName:"Amount(USD)",width:130,
    renderCell:(params)=>{
      return <div className="font-bold text-slate-800">{params.row.price}</div>
    }
  },
  {field:"paymentStatus",headerName:"Payment Status",width:130,

  renderCell:(params)=>{
    return <div>{params.row.paymentStatus==='pending'?
       (<Status
       label="pending"
       bg="bg-slate-200"
       color="text-slate-700"
       icon={MdAccessTimeFilled}

    />):params.row.paymentStatus==='complete'?(<Status
    label="dispatch"
    bg="bg-purple-200"
    color="text-purple-700"
    icon={MdDone}

 />):<></>}</div>}},

  
  {field:"deliveryStatus",headerName:"Delivery Status",width:130,
  renderCell:(params)=>{
    return <div>{params.row.paymentStatus==='pending'?
       (<Status
       label="pending"
       bg="bg-slate-200"
       color="text-slate-700"
       icon={MdAccessTimeFilled}

    />):params.row.paymentStatus==='dispatched'?(<Status
    label="dispatched"
    bg="bg-purple-200"
    color="text-purple-700"
    icon={MdDeliveryDining}

 />):params.row.paymentStatus==='delivered'?(<Status
  label="delivered"
  bg="bg-green-200"
  color="text-green-700"
  icon={MdDone}

/>):<></>}
 </div>
  }
},
{field:"actions",headerName:"Actions",width:200,
renderCell:(params)=>{
  return <div  className="flex justify-between gap-4 w-full">
   <ActionBtn
   icon={MdDeliveryDining}
   onClick={()=>handleDispatch(params.row.id)}
   />

<ActionBtn
   icon={MdDone}
   onClick={()=>handleDelivered(params.row.id)}
   />

<ActionBtn
   icon={MdRemoveRedEye}
   onClick={()=>router.push(`/order/${params.row.id}`)}
   />
  </div>
}
},
  ]



const handleDispatch=useCallback((id:string)=>{
  axios.put('/api/product',{
    id,
    deliveryStatus:"dispatched"
  }).then(()=>{
    toast.success("Order Dispatched")
    router.refresh()

  }).catch(()=>{
    toast.error("Something went error")
  })
},[])




const handleDelivered=useCallback((id:string)=>{
  axios.put('/api/product',{
    id,
    deliveryStatus:"delivered"
  }).then(()=>{
    toast.success("Order Delivered")
    router.refresh()

  }).catch(()=>{
    toast.error("Something went error")
  })
},[])




  return ( <div className="max-w-[1150px] text-xl m-auto">
    <div className="mt-8 mb-4">
<Heading title="Manage Orders" center/>
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
 
export default ManageOrdersClient;