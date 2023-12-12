"use client"

import Link from "next/link";
import Container from "../Container";
import AdminNavItem from "./adminNavItem";
import { MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from "react-icons/md";
import { usePathname } from "next/navigation";

const AdminNav = () => {
  const pathName=usePathname()
  return ( <div className="shadow-sm w-full top-20 border-b-[1px] pt-4">
    <Container>
      <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
        <Link href={'/admin'}>
          <AdminNavItem 
          icon={MdDashboard} 
          label="Summary" 
          selected={pathName==='/admin'}/>
        </Link>

        <Link href={'/admin/add-products'}>
          <AdminNavItem 
          icon={MdLibraryAdd} 
          label="AddProducts" 
          selected={pathName==='/admin/add-products'}/>
        </Link>


        <Link href={'/admin/manage-products'}>
          <AdminNavItem 
          icon={MdDns} 
          label="ManageProducts" 
          selected={pathName==='/admin/manage-products'}/>
        </Link>


        <Link href={'/admin/manage-orders'}>
          <AdminNavItem 
          icon={MdFormatListBulleted} 
          label="ManageOrders" 
          selected={pathName==='/admin/manage-orders'}/>
        </Link>
      </div>
    </Container>
  </div> );
}
 
export default AdminNav;