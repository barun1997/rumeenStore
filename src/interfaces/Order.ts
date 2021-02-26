import OrderStatus from '../constants/orderStatus';
import { ProductType } from './Product';

export interface OrderType {
	id: string;
	from: string;
	location: string;
	status: OrderStatus;
	total: number;
	orderCreated: string;
	products: ProductType[];
}
