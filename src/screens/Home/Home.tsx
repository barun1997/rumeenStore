import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

function HomeScreen(): JSX.Element {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Home!</Text>
			<Button icon="camera" mode="contained">
				helo
			</Button>
		</View>
	);
}

export default HomeScreen;
