import OrderStatus from '../constants/orderStatus';

export interface OrderType {
	id: string;
	from: string;
	location: string;
	status: OrderStatus;
	total: number;
}
