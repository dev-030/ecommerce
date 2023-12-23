import { getCurrentUser } from "@/actions/getCurrentUser";
import FormWrap from "../components/FormWrap";
import Container from "../components/container";
import RegisterForm from "./registerForm";



export default async function Register (){

    const currentUser = await getCurrentUser()

    return(
        <Container>
            <FormWrap> 
                <RegisterForm currentUser={currentUser}/>
            </FormWrap>
        </Container>
    )
}