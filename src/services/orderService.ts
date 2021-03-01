import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { ORDERS_FIRESTORE } from '../constants/firestoreConstants';
import OrderStatus from '../constants/orderStatus';
import { OrderType } from '../interfaces/Order';
import { StoreContext } from '../interfaces/StoreSetting';

const getSingleOrder = async (
	{ storeDocInstance }: StoreContext,
	id: string,
): Promise<OrderType> => {
	if (!storeDocInstance) throw Error('Store is not present');

	const orderCollection = storeDocInstance.collection(ORDERS_FIRESTORE);
	const result = await orderCollection.doc(id).get();

	const order = result.data() as OrderType;
	return order;
};

const getOrders = async (
	{ storeDocInstance }: StoreContext,
	status?: OrderStatus,
): Promise<OrderType[]> => {
	if (!storeDocInstance) throw Error('Store is not present');

	const orderCollection = storeDocInstance.collection(ORDERS_FIRESTORE);

	let result: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>;

	if (status !== undefined) result = await orderCollection.where('status', '==', status).get();
	else result = await orderCollection.get();

	const orders = result.docs.map((doc) => {
		return {
			...doc.data(),
		} as OrderType;
	});

	return orders;
};

const updateOrder = async (
	{ storeDocInstance }: StoreContext,
	order: OrderType,
): Promise<OrderType> => {
	if (!storeDocInstance) throw Error('Store is not present');

	const orderCollection = storeDocInstance.collection(ORDERS_FIRESTORE);

	await orderCollection.doc(order.id).update({
		...order,
	});
	return order;
};

export { getOrders, getSingleOrder, updateOrder };
