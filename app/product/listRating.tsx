'use client'

import moment from "moment";
import Heading from "../components/Heading";
import { Avatar, Rating } from "@mui/material";

interface ListRatingProps{
  product:any;
}
const ListRating:React.FC<ListRatingProps> = ({product}) => {
  return (<div className="">
    <Heading title="Product Reviews"/>
    <div className="text-sm m-2">
      {product.reviews.map((review:any)=>{
        return <div key={review.id} className="max-w-30">
          <div className="flex items-center gap-2">
            <Avatar src={review?.user.image}/>
            <div className="font-semibold">{review?.user.name}</div>
            <div className="font-light">{moment(review.createdDate).fromNow()}</div>
          </div>
          <Rating value={review.rating} readOnly/>
          <div className="ml">{review.comment}</div>
          <hr className="my-4"/>
        </div>
      })}
    </div>
  </div>  );
}
 
export default ListRating;