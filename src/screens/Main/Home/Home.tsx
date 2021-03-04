import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { DASHBOARD_ROUTE } from '../../../constants/routes';
import HomeAppBar from './components/HomeAppBar/HomeAppBar';
import Dashboard from './screens/Dashboard/Dashboard';

const Stack = createStackNavigator();

function HomeScreen(): JSX.Element {
	return (
		<Stack.Navigator
			initialRouteName={DASHBOARD_ROUTE}
			screenOptions={{
				headerStatusBarHeight: heightPercentageToDP('10%'),
				header: (props) => <HomeAppBar {...props} />,
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
