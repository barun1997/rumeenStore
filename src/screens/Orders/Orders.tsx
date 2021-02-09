import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationBar from '../../components/NavigationBar';

import OrdersScreen from './OrdersScreen';

const Stack = createStackNavigator();

function Orders(): JSX.Element {
	return (
		<Stack.Navigator
			initialRouteName="OrdersScreen"
			screenOptions={{
				header: (props) => <NavigationBar {...props} />,
			}}>
			<Stack.Screen
				name="OrdersScreen"
				component={OrdersScreen}
				options={{
					title: 'Orders',
				}}
			/>
		</Stack.Navigator>
	);
}

export default Orders;
