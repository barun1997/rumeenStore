import firestore from '@react-native-firebase/firestore';
interface CategoryType {
	name: string;
}

const categoryCollection = firestore().collection('stores').doc('barun').collection('categories');

const addCategory = async (category: CategoryType): Promise<boolean | undefined> => {
	try {
		const documentId = await categoryCollection.add(category);
		console.log(documentId.id);
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
