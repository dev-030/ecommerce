import FormWrap from "@/app/components/FormWrap";
import Container from "@/app/components/container";
import AddProductForm from "./AddProductsForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";




export default async function AddProducts(){


    const currentUser = await getCurrentUser()

    if(!currentUser || currentUser.role !== 'ADMIN') return <NullData title="Access Denied..."/>

    return(
        <div className="p-8">
            <Container>
                <FormWrap>
                    <AddProductForm/>
                </FormWrap>
            </Container>
        </div>
    )
}