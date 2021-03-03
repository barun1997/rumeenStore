import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
	ACCOUNT_ROUTE,
	CATEGORIES_ROUTE,
	HOME_ROUTE,
	ORDERS_ROUTE,
	PRODUCTS_ROUTE,
} from '../../constants/routes';
import { StoreSettingsProvider } from '../../providers/StoreSettingsProvider';
import AccountScreen from './Account';
import CategoriesScreen from './Categories';
import HomeScreen from './Home';
import Orders from './Orders';
import ProductsScreen from './Products';

interface MainTabNavigatorProps {
	storeName: string;
}

const Tab = createBottomTabNavigator();
export const MainTabNavigator: React.FC<MainTabNavigatorProps> = ({ storeName }) => {
	return (
		<StoreSettingsProvider storeName={storeName}>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						//TODO: refactor this code
						if (route.name === HOME_ROUTE) {
							iconName = focused ? 'home-variant' : 'home-variant-outline';
						} else if (route.name === ORDERS_ROUTE) {
							iconName = focused ? 'ballot' : 'ballot-outline';
						} else if (route.name === PRODUCTS_ROUTE) {
							iconName = focused ? 'shape' : 'shape-outline';
						} else if (route.name === CATEGORIES_ROUTE) {
							iconName = focused ? 'rhombus-split' : 'rhombus-split-outline';
						} else if (route.name === ACCOUNT_ROUTE) {
							iconName = focused ? 'account' : 'account-outline';
						}
						return <MaterialIcons name={iconName as string} size={size} color={color} />;
					},
				})}>
				<Tab.Screen name={HOME_ROUTE} component={HomeScreen} />
				<Tab.Screen name={ORDERS_ROUTE} component={Orders} />
				<Tab.Screen name={PRODUCTS_ROUTE} component={ProductsScreen} />
				<Tab.Screen name={CATEGORIES_ROUTE} component={CategoriesScreen} />
				<Tab.Screen name={ACCOUNT_ROUTE} component={AccountScreen} />
			</Tab.Navigator>
		</StoreSettingsProvider>
	);
};
