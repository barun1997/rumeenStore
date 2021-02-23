import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StoreSettingsProvider } from '../../providers/StoreSettingsProvider';
import AccountScreen from './Account';
import CategoriesScreen from './Categories';
import HomeScreen from './Home';
import OrdersScreen from './Orders';
import ProductsScreen from './Products';

const Tab = createBottomTabNavigator();

const Main: React.FC<Record<string, never>> = () => {
	return (
		<StoreSettingsProvider>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						//TODO: refactor this code
						if (route.name === 'Home') {
							iconName = focused ? 'home-variant' : 'home-variant-outline';
						} else if (route.name === 'Orders') {
							iconName = focused ? 'ballot' : 'ballot-outline';
						} else if (route.name === 'Products') {
							iconName = focused ? 'shape' : 'shape-outline';
						} else if (route.name === 'Categories') {
							iconName = focused ? 'rhombus-split' : 'rhombus-split-outline';
						} else if (route.name === 'Account') {
							iconName = focused ? 'account' : 'account-outline';
						}
						return <MaterialIcons name={iconName as string} size={size} color={color} />;
					},
				})}>
				<Tab.Screen name="Home" component={HomeScreen} />
				<Tab.Screen name="Orders" component={OrdersScreen} />
				<Tab.Screen name="Products" component={ProductsScreen} />
				<Tab.Screen name="Categories" component={CategoriesScreen} />
				<Tab.Screen name="Account" component={AccountScreen} />
			</Tab.Navigator>
		</StoreSettingsProvider>
	);
};

export default Main;
