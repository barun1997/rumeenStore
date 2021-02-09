import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationBar from '../../components/NavigationBar';
import { IconButton, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AddCategoryScreen from './screens/AddCategory/AddCategory';
import CategoriesListScreen from './screens/CategoriesList/CategoriesList';

const Stack = createStackNavigator();

function Products(): JSX.Element {
	const navigation = useNavigation();
	const { colors } = useTheme();
	return (
		<Stack.Navigator
			initialRouteName="CategoriesList"
			screenOptions={{
				header: (props) => <NavigationBar {...props} />,
			}}>
			<Stack.Screen
				name="CategoriesList"
				component={CategoriesListScreen}
				options={{
					title: 'Categories',
					headerRight: () => (
						<IconButton
							icon="plus"
							color={colors.onPrimary}
							onPress={() => navigation.navigate('AddCategory')}
						/>
					),
				}}
			/>
			<Stack.Screen
				name="AddCategory"
				component={AddCategoryScreen}
				options={{ title: 'Add a Category' }}
			/>
		</Stack.Navigator>
	);
}

export default Products;
