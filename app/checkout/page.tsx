import Container from "../components/Container";
import FormWrap from "../components/formWrap";
import CheckoutClient from "./checkutClient";

const Checkout = () => {
  return ( <div className="p-8">
    <Container>
      <FormWrap>
       <CheckoutClient/>
      </FormWrap>
    </Container>
  </div> );
}
 
export default Checkout;