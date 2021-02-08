import { StackHeaderProps } from '@react-navigation/stack/lib/typescript/src/types';
import React from 'react';
import { Appbar } from 'react-native-paper';

const NavigationBar: React.FC<StackHeaderProps> = ({ navigation, scene, previous }) => {
	const { options } = scene.descriptor;

	const title = options.headerTitle ?? options.title ?? scene.route.name;
	const action: React.ReactNode = options.headerRight && options.headerRight({});

	return (
		<Appbar.Header dark statusBarHeight={options.headerStatusBarHeight}>
			{previous ? <Appbar.BackAction onPress={() => navigation.goBack()} /> : null}
			<Appbar.Content title={title} />
			{action}
		</Appbar.Header>
	);
};

export default NavigationBar;
