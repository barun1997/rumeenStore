import firestore from '@react-native-firebase/firestore';
import { CategoryType } from '../interfaces/Category';

const categoryCollection = firestore().collection('stores').doc('barun').collection('categories');

const addCategory = async (category: CategoryType): Promise<boolean | undefined> => {
	try {
		await categoryCollection.doc(category.name).set(category);
		return true;
	} catch (error) {
		console.log(error);
	}
};

const getCategories = async (): Promise<CategoryType[] | undefined> => {
	try {
		const result = await categoryCollection.get();

		const categories = result.docs.map((doc) => doc.data() as CategoryType);

		return categories;
	} catch (error) {
		console.log(error);
	}
};

export { addCategory, getCategories };
