import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { OrderType, ProductItemForOrder } from '../interfaces/Order';
import { ProductType } from '../interfaces/Product';

//TODO: Implement for individual stores
const orderCollection = firestore().collection('stores').doc('barun').collection('orders');

const addorder = async (order: OrderType): Promise<boolean> => {
	await orderCollection.add(order);
	return true;
};

// const productList = Promise.all(
// 	products.map(async ({ product, quantity }) => {
// 		const productReference = product as FirebaseFirestoreTypes.DocumentReference;

// 		const productReferred = (await productReference.get())?.data() as ProductType;

// 		return {
// 			product: productReferred,
// 			quantity: quantity,
// 		} as ProductItemForOrder;
// 	}),
// );

const getSingleOrder = async (id: string): Promise<OrderType> => {
	const result = (await orderCollection.doc(id).get()).data() as OrderType;

	const products = await Promise.all(
		result.products.map(async ({ product, quantity }) => {
			const productReference = product as FirebaseFirestoreTypes.DocumentReference;

			const productReferred = {
				...(await productReference.get())?.data(),
				id: productReference.id,
			} as ProductType;

			return {
				product: productReferred,
				quantity: quantity,
			} as ProductItemForOrder;
		}),
	);
	return { ...result, products: products };
};

const getOrders = async (): Promise<OrderType[]> => {
	const result = await orderCollection.get();

	const orders = result.docs.map((doc) => {
		return {
			id: doc.id,
			from: doc.data().from as string,
			location: doc.data().location as string,
			status: doc.data().status as number,
			total: doc.data().total as number,
			products: doc.data().products as ProductItemForOrder[],
		} as OrderType;
	});

	return orders;
};

export { addorder, getOrders, getSingleOrder };
