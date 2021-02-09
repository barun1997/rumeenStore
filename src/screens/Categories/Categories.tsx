import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationBar from '../../components/NavigationBar';
import { IconButton, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AddCategoryScreen from './AddCategoryScreen';
import CategoriesScreen from './CategoriesScreen';

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
				name="CategoriesScreen"
				component={CategoriesScreen}
				options={{
					title: 'Categories',
					headerRight: () => (
						<IconButton
							icon="plus"
							color={colors.onPrimary}
							onPress={() => navigation.navigate('AddCategoryScreen')}
						/>
					),
				}}
			/>
			<Stack.Screen
				name="AddCategoryScreen"
				component={AddCategoryScreen}
				options={{ title: 'Add a Category' }}
			/>
		</Stack.Navigator>
	);
}

export default Products;
