import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationBar from '../../components/NavigationBar';

import OrdersList from './screens/OrdersList/OrdersList';

const Stack = createStackNavigator();

function Orders(): JSX.Element {
	return (
		<Stack.Navigator
			initialRouteName="OrdersList"
			screenOptions={{
				header: (props) => <NavigationBar {...props} />,
			}}>
			<Stack.Screen
				name="OrdersList"
				component={OrdersList}
				options={{
					title: 'Orders',
				}}
			/>
		</Stack.Navigator>
	);
}

export default Orders;
