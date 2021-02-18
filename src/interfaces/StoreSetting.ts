import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface StoreContext {
	storeDocInstance: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData> | null;
	storeName: string | null;
}
