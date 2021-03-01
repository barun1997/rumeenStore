import { PRODUCTS_FIRESTORE } from '../constants/firestoreConstants';
import { ProductType } from '../interfaces/Product';
import { StoreContext } from '../interfaces/StoreSetting';
import { fieldIncrementByOne } from '../utils/firebase/fieldIncrementByOne';

const addProduct = async (
	{ storeDocInstance }: StoreContext,
	product: ProductType,
): Promise<ProductType> => {
	if (!storeDocInstance) throw Error('Store is not present');

	const productCollection = storeDocInstance.collection(PRODUCTS_FIRESTORE);
	const categoryCollection = storeDocInstance.collection(PRODUCTS_FIRESTORE);

	await productCollection.add(product);

	await storeDocInstance.update({
		productCount: fieldIncrementByOne,
	});

	await categoryCollection.doc(product.category).update({
		count: fieldIncrementByOne,
	});

	return product;
};

const getProducts = async ({ storeDocInstance }: StoreContext): Promise<ProductType[]> => {
	if (!storeDocInstance) throw Error('Store is not present');

	const productCollection = storeDocInstance.collection(PRODUCTS_FIRESTORE);
	const result = await productCollection.get();

	const products = result.docs.map((doc) => {
		return {
			id: doc.id,
			description: doc.data().description as string,
			category: doc.data().category as string,
			name: doc.data().name as string,
			photo: doc.data().photo as string,
			price: doc.data().price as number,
		} as ProductType;
	});
	return products;
};

const updateProduct = async (
	{ storeDocInstance }: StoreContext,
	product: ProductType,
): Promise<ProductType> => {
	if (!storeDocInstance) throw Error('Store is not present');

	const productCollection = storeDocInstance.collection(PRODUCTS_FIRESTORE);

	await productCollection.doc(product.id).update({
		...product,
	});
	return product;
};

const getProductById = async (
	id: string,
	{ storeDocInstance }: StoreContext,
): Promise<ProductType> => {
	if (!storeDocInstance) throw Error('Store is not present');

	const productCollection = storeDocInstance.collection(PRODUCTS_FIRESTORE);

	const result = await productCollection.doc(id).get();

	const product = result.data() as ProductType;

	return product;
};

const deleteProductById = async (
	id: string,
	{ storeDocInstance }: StoreContext,
): Promise<string> => {
	if (!storeDocInstance) throw Error('Store is not present');

	const productCollection = storeDocInstance.collection(PRODUCTS_FIRESTORE);

	await productCollection.doc(id).delete();

	return id;
};

export { addProduct, getProducts, updateProduct, getProductById, deleteProductById };
