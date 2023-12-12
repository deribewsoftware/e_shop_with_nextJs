import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import FormWrap from "../components/formWrap";
import LoginForm from "./loginForm";

const Login = async() => {
  const currentUser=await getCurrentUser()
  
  return (<Container>
    <FormWrap>
      <LoginForm currentUser={currentUser}/>
    </FormWrap>
  </Container>  );
}
 
export default Login;