import { ORDERS_FIRESTORE } from '../constants/firestoreConstants';
import OrderStatus from '../constants/orderStatus';
import { OrderType } from '../interfaces/Order';
import { ProductType } from '../interfaces/Product';
import { StoreContext } from '../interfaces/StoreSetting';

const addOrder = async (
	{ storeDocInstance }: StoreContext,
	order: OrderType,
): Promise<OrderType | undefined> => {
	try {
		const orderCollection = storeDocInstance?.collection(ORDERS_FIRESTORE);
		await orderCollection?.add(order);
		return order;
	} catch (error) {
		console.log(error);
		return;
	}
};

const getSingleOrder = async (
	{ storeDocInstance }: StoreContext,
	id: string,
): Promise<OrderType | undefined> => {
	try {
		const orderCollection = storeDocInstance?.collection(ORDERS_FIRESTORE);
		const result = await orderCollection?.doc(id).get();

		const order = result?.data() as OrderType;
		console.log(order);
		return order;
	} catch (error) {
		return;
	}
};

const getOrders = async ({ storeDocInstance }: StoreContext): Promise<OrderType[] | undefined> => {
	try {
		const orderCollection = storeDocInstance?.collection(ORDERS_FIRESTORE);
		const result = await orderCollection?.get();

		const orders = result?.docs.map((doc) => {
			return {
				id: doc.id,
				from: doc.data().from as string,
				location: doc.data().location as string,
				status: doc.data().status as OrderStatus,
				total: doc.data().total as number,
				products: doc.data().products as ProductType[],
			} as OrderType;
		});

		return orders;
	} catch (error) {
		return;
	}
};

const updateOrder = async (
	{ storeDocInstance }: StoreContext,
	order: OrderType,
): Promise<OrderType | undefined> => {
	try {
		const orderCollection = storeDocInstance?.collection(ORDERS_FIRESTORE);

		await orderCollection?.doc(order.id).update({
			...order,
		});
		return order;
	} catch (error) {
		return;
	}
};

export { addOrder, getOrders, getSingleOrder, updateOrder };
