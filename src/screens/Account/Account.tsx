import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import NavigationBar from '../../components/NavigationBar';
import SettingsList from './screens/SettingsList/SettingsList';

const Stack = createStackNavigator();
function AccountScreen(): JSX.Element {
	return (
		<Stack.Navigator
			initialRouteName="SettingsList"
			screenOptions={{
				header: (props) => <NavigationBar {...props} />,
			}}>
			<Stack.Screen
				name="SettingsList"
				component={SettingsList}
				options={{
					title: 'Account',
				}}
			/>
		</Stack.Navigator>
	);
}

export default AccountScreen;
