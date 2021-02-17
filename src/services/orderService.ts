import firestore from '@react-native-firebase/firestore';
import OrderStatus from '../constants/orderStatus';
import { OrderType } from '../interfaces/Order';

//TODO: Implement for individual stores
const orderCollection = firestore().collection('stores').doc('barun').collection('orders');

const addorder = async (order: OrderType): Promise<boolean> => {
	await orderCollection.add(order);
	return true;
};

const getOrders = async (): Promise<OrderType[]> => {
	const result = await orderCollection.get();

	const orders = result.docs.map((doc) => {
		return {
			id: doc.id,
			from: doc.data().from as string,
			location: doc.data().location as string,
			status: doc.data().status as OrderStatus,
			total: doc.data().total as number,
		} as OrderType;
	});

	return orders;
};

export { addorder, getOrders };
