import FormWrap from "@/app/components/formWrap";
import { Container } from "@mui/material";
import AddProductForm from "./addProductForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Nulldata from "@/app/components/nullData";


const AddProducts = async() => {
  const currentUser=await getCurrentUser()
  if(!currentUser || currentUser.role!=="ADMIN"){
    return <Nulldata title="Oops access Denied"></Nulldata>
  }
  return ( <div className="p-8">
   <Container>
    <FormWrap>
      <AddProductForm/>
    </FormWrap>
   </Container>
  </div> );
}
 
export default AddProducts;