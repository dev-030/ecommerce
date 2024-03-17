'use client'
import Link from "next/link";
import Container from "../container";
import AdminNavItem from "./AdminNavItem";
import { MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from "react-icons/md";
import { usePathname } from "next/navigation";


export default function AdminNav(){

    const pathName = usePathname()

    return(
        <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
            <Container>
                <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
                    <Link href={'/admin'}>
                        <AdminNavItem label="Summary" icon={MdDashboard} Selected={pathName==='/admin'}/>
                    </Link>
                    <Link href={'/admin/add-products'}>
                        <AdminNavItem label="Add Products" icon={MdLibraryAdd} Selected={pathName==='/admin/add-products'}/>
                    </Link>
                    <Link href={'/admin/manage-products'}>
                        <AdminNavItem label="Manage Products" icon={MdDns} Selected={pathName==='/admin/manage-products'}/>
                    </Link>
                    <Link href={'/admin/manage-orders'}>
                        <AdminNavItem label="Manage Orders" icon={MdFormatListBulleted} Selected={pathName==='/admin/manage-orders'}/>
                    </Link>
                </div>
            </Container>
        </div>
    )
}