'use client'
import { categories } from "@/libs/Categorys";
import Container from "../container";
import Category from "./Category";
import { usePathname, useSearchParams } from "next/navigation";




export default function Categorys(){


    const params = useSearchParams()
    const category = params?.get('category')
    const pathName = usePathname();
    const isMainPage = pathName === '/'

    if(!isMainPage) return null;

    return(
        <div className="bg-white">
            <Container>
                <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                    {categories.map((item)=>(
                        <Category key={item.label} icon={item.icon} label={item.label} selected={category===item.label || (category === null && item.label ==='All')}/>
                    ))}
                </div>
            </Container>
        </div>
    )
}