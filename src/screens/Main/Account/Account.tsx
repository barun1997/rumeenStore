import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import NavigationBar from '../../../components/NavigationBar';
import { DELIVERY_SETTINGS_ROUTE, SETTINGS_LIST_ROUTE } from '../../../constants/routes';
import DeliverySettingScreen from './screens/DeliverySettings/DeliverySettings';
import SettingsList from './screens/SettingsList/SettingsList';

const Stack = createStackNavigator();
function AccountScreen(): JSX.Element {
	return (
		<Stack.Navigator
			initialRouteName={SETTINGS_LIST_ROUTE}
			screenOptions={{
				header: (props) => <NavigationBar {...props} />,
			}}>
			<Stack.Screen
				name={SETTINGS_LIST_ROUTE}
				component={SettingsList}
				options={{
					title: 'Account',
				}}
			/>
			<Stack.Screen
				name={DELIVERY_SETTINGS_ROUTE}
				component={DeliverySettingScreen}
				options={{
					title: 'Delivery Settings',
				}}
			/>
		</Stack.Navigator>
	);
}

export default AccountScreen;
