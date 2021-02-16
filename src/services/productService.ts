import firestore from '@react-native-firebase/firestore';
import { ProductType } from '../interfaces/Product';
import { fieldIncrementByOne } from '../constants/fieldIncrementByOne';

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

	const products = result.docs.map((doc) => doc.data() as ProductType);

	return products;
};

export { addProduct, getProducts };
