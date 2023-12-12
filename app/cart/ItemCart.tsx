import { formatPrice } from "@/utils/formatPrice";
import { CartProductType } from "../product/ProductDetails";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import SetQuantity from "../components/products/setQuantity";
import { useCart } from "@/hooks/usecart";

interface ItemCartProps{
  item:CartProductType;
}

const Itemcart:React.FC<ItemCartProps> = ({item}) => {
  const {handleRemoveProductFromCart,handleIncreaseCartQuantity,handleDecreaseCartQuantity}=useCart()
  return ( <div className="
  grid
  grid-cols-5
  items-center
  text-xs
  md:text-sm
  py-4
  gap-4
  border-t-[1.5px]
  border-slate-200

  ">
    <div className=" gap-2 md:gap-4 flex span-col-2 justify-self-start">
      <Link href={`/product/${item.id}`}>
      <div className="relative aspect-square w-[70px]">
        <Image fill src={item.selectedImg.image} alt={item.name} className="object-contain"/>
      </div>
      </Link>
      <div className="flex flex-col justify-between">
      <Link href={`/product/${item.id}`}>
      {truncateText(item.name)}
      </Link>
      <div className="">{item.selectedImg.color}</div>
      <div className="w-[70px]">
        <button onClick={()=>handleRemoveProductFromCart(item)} className="text-slate-500 underline">remove</button>
      </div>
        
      </div>
    </div>


    <div className="justify-self-center">{formatPrice(item.price)}</div>
    <div className="justify-self-center">
      <SetQuantity
      cartCounter={true}
      cartProduct={item}
      cartHandleDecrease={()=>handleDecreaseCartQuantity(item)}
      cartHandleIncrease={()=>handleIncreaseCartQuantity(item)}
      />
    </div>
    <div className="justify-self-end font-semibold">{formatPrice(item.price*item.quantity)}</div>
  </div> );
}
 
export default Itemcart;