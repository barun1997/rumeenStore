import { CATEGORIES_FIRESTORE } from '../constants/firestoreConstants';
import { CategoryType } from '../interfaces/Category';
import { StoreContext } from '../interfaces/StoreSetting';
import { fieldIncrementByOne } from '../utils/firebase/fieldIncrementByOne';

const addCategory = async (
	{ storeDocInstance }: StoreContext,
	category: CategoryType,
): Promise<CategoryType> => {
	if (!storeDocInstance) throw Error('Store is not present');

	const categoryCollection = storeDocInstance.collection(CATEGORIES_FIRESTORE);

	const categoryDoc = categoryCollection.doc(category.name);

	const categoryPresent = (await categoryDoc.get()).data();

	if (categoryPresent) throw Error('The category is already present');

	await categoryCollection.doc(category.name).set(category);
	await storeDocInstance.update({
		categoryCount: fieldIncrementByOne,
	});
	return category;
};

const getCategories = async ({ storeDocInstance }: StoreContext): Promise<CategoryType[]> => {
	if (!storeDocInstance) throw Error('Store is not present');

	const categoryCollection = storeDocInstance.collection(CATEGORIES_FIRESTORE);

	const result = await categoryCollection.get();

	const categories = result.docs.map((doc) => {
		return {
			id: doc.id,
			name: doc.data()?.name as string,
		} as CategoryType;
	});

	return categories;
};

export { addCategory, getCategories };
