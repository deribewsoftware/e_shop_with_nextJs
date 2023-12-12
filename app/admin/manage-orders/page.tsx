import { getCurrentUser } from "@/actions/getCurrentUser";
import getOrder from "@/actions/getOrders";
import Container from "@/app/components/Container";
import Nulldata from "@/app/components/nullData";
import ManageOrdersClient from "./manageOrdersClient";

const ManageOrders = async() => {
const orders=await getOrder()
  const currentUser=await getCurrentUser()
  if(!currentUser || currentUser.role!=="ADMIN"){
    return <Nulldata title="Oops access Denied"></Nulldata>
  }
  return (<div>
    <Container>
      <ManageOrdersClient orders={orders}/>
    </Container>

  </div>);
}
 
export default ManageOrders;