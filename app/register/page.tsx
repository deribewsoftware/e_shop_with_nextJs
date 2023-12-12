import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import FormWrap from "../components/formWrap";
import RegisterForm from "./registerForm";

const Register = async() => {

  const currentUser= await getCurrentUser()
  return ( <Container>
    <FormWrap>

      <RegisterForm currentUser={currentUser}/>

    </FormWrap>
  </Container> );
}
 
export default Register;