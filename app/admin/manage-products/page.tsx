import Container from "@/app/components/Container";
import ManageProductClient from "./manageProductClient";
import getProduct from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Nulldata from "@/app/components/nullData";

const ManageProducts = async() => {

  const products=await getProduct({category:null})
  const currentUser=await getCurrentUser()
  if(!currentUser || currentUser.role!=="ADMIN"){
    return <Nulldata title="Oops access Denied"></Nulldata>
  }
  return ( <div className="p-8"> 
  <Container>
    <ManageProductClient products={products}/>
  </Container>
  </div> );
}
 
export default ManageProducts;