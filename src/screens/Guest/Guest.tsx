import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import NavigationBar from '../../components/NavigationBar';
import { LOGIN_ROUTE } from '../../constants/routes';
import Login from './Login';

const Stack = createStackNavigator();

function GuestStack(): JSX.Element {
	return (
		<Stack.Navigator
			initialRouteName={LOGIN_ROUTE}
			screenOptions={{
				header: (props) => <NavigationBar {...props} />,
			}}>
			<Stack.Screen
				name={LOGIN_ROUTE}
				component={Login}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
}

export default GuestStack;
