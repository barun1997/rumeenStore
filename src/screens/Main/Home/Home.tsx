import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import NavigationBar from '../../../components/NavigationBar';
import Dashboard from './screens/Dashboard/Dashboard';

const Stack = createStackNavigator();

function HomeScreen(): JSX.Element {
	return (
		<Stack.Navigator
			initialRouteName="Dashboard"
			screenOptions={{
				headerStatusBarHeight: 100,
				header: (props) => <NavigationBar {...props} />,
			}}>
			<Stack.Screen
				name="Dashboard"
				component={Dashboard}
				options={{
					title: 'Rumeen',
				}}
			/>
		</Stack.Navigator>
	);
}

export default HomeScreen;
