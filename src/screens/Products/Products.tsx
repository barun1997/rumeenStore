import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddProductScreen from './screens/AddProduct/AddProduct';
import ProductListScreen from './screens/ProductList/ProductList';
import NavigationBar from '../../components/NavigationBar';
import { IconButton, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

function Products(): JSX.Element {
	const navigation = useNavigation();
	const { colors } = useTheme();
	return (
		<Stack.Navigator
			initialRouteName="ProductListScreen"
			screenOptions={{
				header: (props) => <NavigationBar {...props} />,
			}}>
			<Stack.Screen
				name="ProductListScreen"
				component={ProductListScreen}
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
