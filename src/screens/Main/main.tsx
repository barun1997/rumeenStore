import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React from 'react';
import { useStorePref } from '../../hooks/queries';
import { CreateNewStore } from './CreateNewStore/CreateNewStore';
import Loading from './Loading';
import { MainTabNavigator } from './MainTabNavigator';

const Main: React.FC<Record<string, never>> = () => {
	const user = auth().currentUser as FirebaseAuthTypes.User;

	const phoneNumber = user.phoneNumber as string;

	const { ...queryInfo } = useStorePref(phoneNumber);

	const initializing = queryInfo.isLoading;

	const storeName = queryInfo.data;

	if (initializing) return <Loading />;

	if (storeName) return <MainTabNavigator storeName={storeName} />;
	else return <CreateNewStore />;
};

export default Main;
