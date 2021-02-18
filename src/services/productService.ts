import { PRODUCTS_FIRESTORE } from '../constants/firestoreConstants';
import { ProductType } from '../interfaces/Product';
import { StoreContext } from '../interfaces/StoreSetting';
import { fieldIncrementByOne } from '../utils/firebase/fieldIncrementByOne';

const addProduct = async (
	{ storeDocInstance }: StoreContext,
	product: ProductType,
): Promise<ProductType | undefined> => {
	try {
		if (!storeDocInstance) return;

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
	} catch (error) {
		console.log(error);
		//TODO: Handle all try catch errors
		return;
	}
};

const getProducts = async ({
	storeDocInstance,
}: StoreContext): Promise<ProductType[] | undefined> => {
	try {
		const productCollection = storeDocInstance?.collection(PRODUCTS_FIRESTORE);
		const result = await productCollection?.get();

		const products = result?.docs.map((doc) => {
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
	} catch (error) {
		console.log(error);
		return;
	}
};

export { addProduct, getProducts };
