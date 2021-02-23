import firestore from '@react-native-firebase/firestore';
import { StoreDetail } from '../interfaces/StoreDetail';

const userCollection = firestore().collection('users');
const storeCollection = firestore().collection('stores');

const getStoreDetailFromUser = async (userId: string): Promise<StoreDetail | undefined> => {
	const result = await userCollection.doc(userId).get();

	const storeDetails = result.data();

	return storeDetails as StoreDetail;
};

const setUserDocument = async (userId: string): Promise<void> => {
	await userCollection.doc(userId).set({});
};

const setNewStore = async (userId: string, { storeName, location }: StoreDetail): Promise<void> => {
	await storeCollection.doc(storeName).set({
		name: storeName,
	});

	await userCollection.doc(userId).set({
		storeName,
		location,
	});
};

export { getStoreDetailFromUser, setUserDocument, setNewStore };
