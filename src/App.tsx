import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './screens/Home';
import OrdersScreen from './screens/Orders';
import AccountScreen from './screens/Account';
import CategoriesScreen from './screens/Categories';
import ProductsScreen from './screens/Products';

const Tab = createBottomTabNavigator();

const App: React.FC<Record<string, never>> = () => {
	return (
		<NavigationContainer>
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
		</NavigationContainer>
	);
};

export default App;
