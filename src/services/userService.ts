import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { STORE_NAME_STORAGE } from '../constants/storageConstants';
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

const getStoreName = async (userId: string): Promise<string | undefined> => {
	const storePresentInLocal = await AsyncStorage.getItem(STORE_NAME_STORAGE);

	if (storePresentInLocal) return storePresentInLocal;

	const storeInFirebase = await getStoreDetailFromUser(userId);

	if (!storeInFirebase) return undefined;

	return storeInFirebase.storeName;
};

const setNewStore = async (
	userId: string,
	{ storeName, location }: StoreDetail,
): Promise<StoreDetail> => {
	await storeCollection.doc(storeName).set({
		name: storeName,
	});

	await AsyncStorage.setItem(STORE_NAME_STORAGE, storeName);

	await userCollection.doc(userId).set({
		storeName,
		location,
	});

	return {
		storeName,
		location,
	};
};

export { getStoreDetailFromUser, setUserDocument, setNewStore, getStoreName };
