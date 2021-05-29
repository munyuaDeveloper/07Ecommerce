export interface ProductInterface {
	id: number;
	title: string;
	description: string;
	category: Category[];
	price: any;
	num_in_stock: number;
	images?: any;
}


export interface Category {
	name: string;
}