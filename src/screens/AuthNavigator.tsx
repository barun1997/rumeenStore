import AsyncStorage from '@react-native-async-storage/async-storage';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { STORE_NAME_STORAGE } from '../constants/storageConstants';
import GuestStack from './Guest/Guest';
import Main from './Main/main';

const AuthNavigator: React.FC<Record<string, never>> = () => {
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

	function onAuthStateChanged(result: FirebaseAuthTypes.User | null) {
		setUser(result);
		if (initializing) setInitializing(false);

		if (!result) void AsyncStorage.removeItem(STORE_NAME_STORAGE);
	}

	useEffect(() => {
		const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged);

		return authSubscriber;
	}, []);

	if (initializing) return null;

	return user ? <Main /> : <GuestStack />;
};

export default AuthNavigator;
