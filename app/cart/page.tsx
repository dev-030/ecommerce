import Container from "../components/container";
import CartClient from "./CartClient";


export default function Cart(){


    return(
        <div className="pt-8">
            <Container>
                <CartClient/>
            </Container>
        </div>
    )
}