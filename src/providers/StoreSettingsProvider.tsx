import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { STORES_FIRESTORE } from '../constants/firestoreConstants';
import { STORE_NAME_STORAGE } from '../constants/storageConstants';
import StoreSettingsContext from '../contexts/StoreSettingsContext';
import { StoreContext } from '../interfaces/StoreSetting';

export const StoreSettingsProvider: React.FC = ({ children }) => {
	const [storeSetting, setStoreSetting] = useState<StoreContext>({
		storeDocInstance: null,
		storeName: null,
	});

	useEffect(() => {
		const getStoreSettings = async () => {
			const response = await AsyncStorage.getItem(STORE_NAME_STORAGE);
			if (!response) return;

			const storeDoc = firestore().collection(STORES_FIRESTORE).doc(response);

			setStoreSetting({
				storeDocInstance: storeDoc,
				storeName: response,
			});
		};
		void getStoreSettings();
	}, []);

	return (
		<StoreSettingsContext.Provider value={{ ...storeSetting }}>
			{children}
		</StoreSettingsContext.Provider>
	);
};
