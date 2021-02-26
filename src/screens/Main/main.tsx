import AsyncStorage from '@react-native-async-storage/async-storage';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { STORE_NAME_STORAGE } from '../../constants/storageConstants';
import { getStoreDetailFromUser } from '../../services/userService';
import { CreateNewStore } from './CreateNewStore/CreateNewStore';
import Loading from './Loading';
import { MainTabNavigator } from './MainTabNavigator';

const Main: React.FC<Record<string, never>> = () => {
	const user = auth().currentUser as FirebaseAuthTypes.User;

	const [storeName, setStoreName] = useState<string | null>(null);
	const [initializing, setInitializing] = useState(true);
	const [storeSuccess, setStoreSuccess] = useState(false);

	useEffect(() => {
		const fetchAndSetStoreId = async () => {
			const storePresentInLocal = await AsyncStorage.getItem(STORE_NAME_STORAGE);

			if (storePresentInLocal) {
				setInitializing(false);
				setStoreSuccess(true);
				return setStoreName(storePresentInLocal);
			}

			const storeDetails = await getStoreDetailFromUser(user.phoneNumber as string);

			const storeId = storeDetails?.storeName;

			if (!storeId) {
				return setInitializing(false);
			}

			await AsyncStorage.setItem(STORE_NAME_STORAGE, storeId);
			setStoreName(storeId);
			setInitializing(false);
		};

		void fetchAndSetStoreId();
	}, []);

	if (initializing) return <Loading />;

	if (storeName && storeSuccess) return <MainTabNavigator storeName={storeName} />;
	else
		return (
			<CreateNewStore
				setInitializing={setInitializing}
				setStoreName={setStoreName}
				setCreateStoreSuccess={setStoreSuccess}
			/>
		);
};

export default Main;
