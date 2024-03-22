import type { Metadata } from "next";
import type { ReactNode } from "react";
import AdminNav from "../components/admin/AdminNav";

export const metadata: Metadata = {
	title: "Ecommerce Admin",
	description: "E-Shop Admin Dashboard",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
	return (
		<div>
			<AdminNav />
			{children}
		</div>
	);
}
