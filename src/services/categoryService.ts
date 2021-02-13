import firestore from '@react-native-firebase/firestore';
import { CategoryType } from '../interfaces/Category';

const categoryCollection = firestore().collection('stores').doc('barun').collection('categories');

const addCategory = async (category: CategoryType): Promise<boolean> => {
	const categoryDoc = categoryCollection.doc(category.name);
	const categoryPresent = await categoryDoc.get();

	if (categoryPresent) throw Error('The category is already present');

	await categoryCollection.doc(category.name).set(category);
	return true;
};

const getCategories = async (): Promise<CategoryType[]> => {
	const result = await categoryCollection.get();

	const categories = result.docs.map((doc) => doc.data() as CategoryType);

	return categories;
};

export { addCategory, getCategories };
