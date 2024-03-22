import prisma from "@/libs/prismaClient";

export interface IProductParams {
	category?: string | null;
	searchTerm?: string | null;
}

//------------10:12:38

export default async function getProducts(params: IProductParams) {
	try {
		const { searchTerm, category } = params;
		let searchString = searchTerm;
		if (!searchTerm) {
			searchString = "";
		}
		let query: any = {};
	} catch (error: any) {
		throw new Error(error);
	}
}
