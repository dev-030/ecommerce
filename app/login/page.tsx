import LoginForm from "./LoginForm"
import Container from "../components/container"
import FormWrap from "../components/FormWrap"
import { getCurrentUser } from "@/actions/getCurrentUser"



export default async function Login (){       
      
    const currentUser = await getCurrentUser()

    return(
        <Container>
            <FormWrap>
            <LoginForm currentUser={currentUser}/>
            </FormWrap>
        </Container>
    )
}