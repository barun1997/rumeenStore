import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { IconButton, useTheme } from 'react-native-paper';
import NavigationBar from '../../../components/NavigationBar';
import { ADD_CATEGORY_ROUTE, CATEGORY_LIST_ROUTE } from '../../../constants/routes';
import AddCategoryScreen from './screens/AddCategory/AddCategory';
import CategoriesListScreen from './screens/CategoriesList/CategoriesList';

const Stack = createStackNavigator();

function Products(): JSX.Element {
	const navigation = useNavigation();
	const { colors } = useTheme();
	return (
		<Stack.Navigator
			initialRouteName={CATEGORY_LIST_ROUTE}
			screenOptions={{
				header: (props) => <NavigationBar {...props} />,
			}}>
			<Stack.Screen
				name={CATEGORY_LIST_ROUTE}
				component={CategoriesListScreen}
				options={{
					title: 'Categories',
					headerRight: () => (
						<IconButton
							icon="plus"
							color={colors.onPrimary}
							onPress={() => navigation.navigate(ADD_CATEGORY_ROUTE)}
						/>
					),
				}}
			/>
			<Stack.Screen
				name={ADD_CATEGORY_ROUTE}
				component={AddCategoryScreen}
				options={{ title: 'Add a Category' }}
			/>
		</Stack.Navigator>
	);
}

export default Products;
