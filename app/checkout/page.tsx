import FormWrap from "../components/FormWrap";
import Container from "../components/container";
import CheckoutClient from "./checkoutClient";



export default function CheckOut(){


    return(
        <div className="p-8">
            <Container>
                <FormWrap>
                    <CheckoutClient/>
                </FormWrap>
            </Container>
        </div>
    )
}