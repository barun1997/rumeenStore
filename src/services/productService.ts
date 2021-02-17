import firestore from '@react-native-firebase/firestore';
import { ProductType } from '../interfaces/Product';
import { fieldIncrementByOne } from '../utils/firebase/fieldIncrementByOne';
const productCollection = firestore().collection('stores').doc('barun').collection('products');
const storeDocument = firestore().collection('stores').doc('barun');
const categoryCollection = firestore().collection('stores').doc('barun').collection('categories');

const addProduct = async (product: ProductType): Promise<boolean> => {
	await productCollection.add(product);
	await storeDocument.update({
		productCount: fieldIncrementByOne,
	});
	await categoryCollection.doc(product.category).update({
		count: fieldIncrementByOne,
	});
	return true;
};

const getProducts = async (): Promise<ProductType[]> => {
	const result = await productCollection.get();

	const products = result.docs.map((doc) => {
		return {
			id: doc?.id,
			description: doc.data()?.description as string,
			category: doc.data()?.category as string,
			name: doc.data()?.name as string,
			photo: doc.data()?.photo as string,
			price: doc.data()?.price as number,
		} as ProductType;
	});

	return products;
};

export { addProduct, getProducts };
