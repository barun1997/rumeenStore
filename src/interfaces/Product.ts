export interface ProductType {
	id: string;
	name: string;
	photo: string;
	price: number;
	listed?: boolean;
	description: string;
	category: string;
	quantity?: number;
}
