import firestore from '@react-native-firebase/firestore';
import { fieldIncrementByOne } from '../constants/fieldIncrementByOne';
import { CategoryType } from '../interfaces/Category';

//TODO: Implement for individual stores
const categoryCollection = firestore().collection('stores').doc('barun').collection('categories');
const storeDocument = firestore().collection('stores').doc('barun');

const addCategory = async (category: CategoryType): Promise<boolean> => {
	const categoryDoc = categoryCollection.doc(category.name);
	const categoryPresent = (await categoryDoc.get()).data();

	if (categoryPresent) throw Error('The category is already present');

	await categoryCollection.doc(category.name).set(category);
	await storeDocument.update({
		categoryCount: fieldIncrementByOne,
	});
	return true;
};

const getCategories = async (): Promise<CategoryType[]> => {
	const result = await categoryCollection.get();

	const categories = result.docs.map((doc) => doc.data() as CategoryType);

	if (!categories) return [];

	return categories;
};

export { addCategory, getCategories };
