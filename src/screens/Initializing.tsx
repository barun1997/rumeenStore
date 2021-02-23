import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

const Initializing: React.FC<Record<string, never>> = () => {
	const navigation = useNavigation();

	auth().onAuthStateChanged((user) => {
		if (!user) return navigation.navigate('Guest');

		navigation.reset({
			index: 0,
			routes: [
				{
					name: 'Main',
				},
			],
		});
	});

	return null;
};

export default Initializing;
