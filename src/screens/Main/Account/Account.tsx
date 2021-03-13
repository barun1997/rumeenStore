import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import NavigationBar from '../../../components/NavigationBar';
import {
	DELIVERY_SETTINGS_ROUTE,
	EDIT_STORE_DETAILS_ROUTE,
	SETTINGS_LIST_ROUTE,
} from '../../../constants/routes';
import DeliverySettingScreen from './screens/DeliverySettings/DeliverySettings';
import { EditStoreDetails } from './screens/EditStoreDetails/EditStoreDetails';
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
			<Stack.Screen
				name={EDIT_STORE_DETAILS_ROUTE}
				component={EditStoreDetails}
				options={{
					title: 'Edit store details',
				}}
			/>
		</Stack.Navigator>
	);
}

export default AccountScreen;
