import Link from "next/link";
import Container from "../container";
import FooterList from "./footerList";
import {MdFacebook} from 'react-icons/md'
import {AiFillInstagram, AiFillTwitterCircle, AiFillYoutube} from 'react-icons/ai'

export default function Footer(){


    return(
        <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
           <Container>
            <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                <FooterList>
                    <h2 className="font-bold text-base mb-2">Shop Categorys</h2>
                    <Link href={'#'}>Phones</Link>
                    <Link href={'#'}>Laptops</Link>
                    <Link href={'#'}>Desktops</Link>
                    <Link href={'#'}>Watchess</Link>
                    <Link href={'#'}>Tvs</Link>
                    <Link href={'#'}>Accessories</Link>
                </FooterList>
                <FooterList>
                    <h2 className="font-bold text-base mb-2">Customer Service</h2>
                    <Link href={'#'}>Contact Us</Link>
                    <Link href={'#'}>Shipping Policy</Link>
                    <Link href={'#'}>Returns & Exchanges</Link>
                    <Link href={'#'}>FAQs</Link>
                </FooterList>
                <div className="w-full md:w-1/3 mb-6 md:mb-0">
                    <h2 className="font-bold text-base mb-2">About Us</h2>
                    <p className="mb-2">
                    Our shop started as a small business based on the idea of providing quality goods at reasonable prices. What began as a home-based online store has now grown into a thriving ecommerce company. We take pride in offering a wide variety of products to suit our customers needs, with new items added frequently
                    </p>
                    <p>&copy; {new Date().getFullYear()} Ecommerce. All rights reserved.</p>
                </div>
                <FooterList>
                    <h2 className="font-bold text-base mb-2">Follow Us</h2>
                    <div className="flex gap-2">
                        <Link href={'#'}><MdFacebook size={24}/></Link>
                        <Link href={'#'}><AiFillTwitterCircle size={24}/></Link>
                        <Link href={'#'}><AiFillInstagram size={24}/></Link>
                        <Link href={'#'}><AiFillYoutube size={26}/></Link>
                    </div>
                </FooterList>
            </div>
           </Container>
        </footer>
    )
}