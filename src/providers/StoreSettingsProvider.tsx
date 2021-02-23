import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { STORES_FIRESTORE } from '../constants/firestoreConstants';
import StoreSettingsContext from '../contexts/StoreSettingsContext';

interface StoreSettingsProviderProps {
	storeName: string;
}

export const StoreSettingsProvider: React.FC<StoreSettingsProviderProps> = ({
	storeName,
	children,
}) => {
	const storeDoc = firestore().collection(STORES_FIRESTORE).doc(storeName);

	return (
		<StoreSettingsContext.Provider value={{ storeDocInstance: storeDoc, storeName: storeName }}>
			{children}
		</StoreSettingsContext.Provider>
	);
};
