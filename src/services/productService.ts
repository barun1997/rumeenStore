import firestore from '@react-native-firebase/firestore';
import { ProductType } from '../interfaces/Product';

const productCollection = firestore().collection('stores').doc('barun').collection('products');

const addProduct = async (product: ProductType): Promise<boolean | Error> => {
	await productCollection.add(product);
	return true;
};

const getProducts = async (): Promise<ProductType[] | Error> => {
	const result = await productCollection.get();

	const products = result.docs.map((doc) => doc.data() as ProductType);

	return products;
};

export { addProduct, getProducts };
