"use client"
import { useCart } from '@/hooks/usecart';
import { useRouter } from 'next/navigation';
import {CiShoppingCart} from 'react-icons/ci'
const CartCount = () => {
  const router=useRouter();

  const {cartTotalQuantity}=useCart();
  return ( <div onClick={()=>router.push('/cart')}  className="relative cursor-pointer">
    <div className="text-3xl">
     
<CiShoppingCart/>
    </div>

    <span className='absolute top-[-10px] right-[-10px] bg-slate-700 h-6 w-6 rounded-full text-white text-sm flex justify-center items-center'>{cartTotalQuantity}</span>
  </div> );
}
 
export default CartCount;