import Link from "next/link";
import Container from "../Container";

import { Redressed} from "next/font/google";
import CartCount from "./CartCount";
import Usermenu from "./userMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
const redressed=Redressed({subsets:['latin'],weight:['400']})

const Navbar = async() => {

  const currentUser=await getCurrentUser();
  return (  <div
  className="w-full sticky z-30 bg-slate-200 shadow-sm  top-0"
  >

    <div className="py-4">
      <Container>
        <div className="flex justify-between gap-3 mg:gap-0 items-center">
          <Link className={` ${redressed.className} font-bold`} href='/'>E-Shop</Link>

          <div className="hidden md:block">search</div>

          <div className="flex gap-8 md:gap-12 items-center">
            <CartCount/>
            <Usermenu currentUser={currentUser}/>
          </div>

        </div>
      </Container>
    </div>
  
  </div>);
}
 
export default Navbar;