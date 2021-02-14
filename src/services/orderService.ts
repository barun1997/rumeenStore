import firestore from '@react-native-firebase/firestore';
import { OrderType } from '../interfaces/Order';

//TODO: Implement for individual stores
const orderCollection = firestore().collection('stores').doc('barun').collection('orders');

const addorder = async (order: OrderType): Promise<boolean> => {
	await orderCollection.add(order);
	return true;
};

const getOrders = async (): Promise<OrderType[]> => {
	const result = await orderCollection.get();

	const orders = result.docs.map((doc) => doc.data() as OrderType);

	if (!orders) return [];

	return orders;
};

export { addorder, getOrders };
