"use client"

import { CartContextProvider } from "@/hooks/usecart";

interface CartProvidersProps{
  children:React.ReactNode;
}
const CartProvider:React.FC<CartProvidersProps> = ({children}) => {
  return ( <CartContextProvider>
    {children}
  </CartContextProvider> );
}
 
export default CartProvider;