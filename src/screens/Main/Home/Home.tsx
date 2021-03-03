import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import NavigationBar from '../../../components/NavigationBar';
import { DASHBOARD_ROUTE } from '../../../constants/routes';
import Dashboard from './screens/Dashboard/Dashboard';

const Stack = createStackNavigator();

function HomeScreen(): JSX.Element {
	return (
		<Stack.Navigator
			initialRouteName={DASHBOARD_ROUTE}
			screenOptions={{
				headerStatusBarHeight: 100,
				header: (props) => <NavigationBar {...props} />,
			}}>
			<Stack.Screen
				name={DASHBOARD_ROUTE}
				component={Dashboard}
				options={{
					title: 'Rumeen',
				}}
			/>
		</Stack.Navigator>
	);
}

export default HomeScreen;
