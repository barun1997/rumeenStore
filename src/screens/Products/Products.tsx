import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddProductScreen from './AddProductScreen';
import ProductsScreen from './ProductsScreen';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { IconButton, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

function Products(): JSX.Element {
	const navigation = useNavigation();
	const { colors } = useTheme();
	return (
		<Stack.Navigator
			initialRouteName="ProductsScreen"
			screenOptions={{
				header: (props) => <NavigationBar {...props} />,
			}}>
			<Stack.Screen
				name="ProductsScreen"
				component={ProductsScreen}
				options={{
					title: 'Products',
					headerRight: () => (
						<IconButton
							icon="plus"
							color={colors.onPrimary}
							onPress={() => navigation.navigate('AddProductScreen')}
						/>
					),
				}}
			/>
			<Stack.Screen
				name="AddProductScreen"
				component={AddProductScreen}
				options={{ title: 'Add a Product' }}
			/>
		</Stack.Navigator>
	);
}

export default Products;
