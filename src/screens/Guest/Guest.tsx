import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import NavigationBar from '../../components/NavigationBar';
import Login from './Login';

const Stack = createStackNavigator();

function GuestStack(): JSX.Element {
	return (
		<Stack.Navigator
			initialRouteName="Login"
			screenOptions={{
				header: (props) => <NavigationBar {...props} />,
			}}>
			<Stack.Screen
				name="Login"
				component={Login}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
}

export default GuestStack;
