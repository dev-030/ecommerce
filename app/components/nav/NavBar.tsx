import Link from "next/link";
import Container from "../container";
import { Redressed } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Categorys from "./Categorys";



const redDressed = Redressed({subsets: ['latin'],weight:['400']})

export default async function NavBar(){

    const currentUser = await getCurrentUser()


    return(
        <div className="sticky top-0 z-30 w-full bg-slate-200 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex items-center justify-between gap-3 md:gap-0">
                        <Link href={'/'} className={`${redDressed.className} font-bold text-2xl`}>Ecommerce</Link>
                        <div className="hidden md:block">Search</div>
                        <div className="flex items-center gap-8 md:gap-12">
                            <CartCount/>
                            <UserMenu currentUser={currentUser}/>
                        </div>
                    </div>
                </Container>
            </div>
            <Categorys/>
        </div>
    )
}