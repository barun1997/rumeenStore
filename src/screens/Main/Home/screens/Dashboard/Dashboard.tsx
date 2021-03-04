import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { ActiveOrders } from './components/ActiveOrders/ActiveOrders';
import { DashboardOverview } from './components/DashboardOverview/DashboardOverview';

function Dashboard(): JSX.Element {
	return (
		<SafeAreaView>
			<View style={{ height: heightPercentageToDP('80%') }}>
				<DashboardOverview containerStyle={{ marginTop: '5%' }} />
				<ActiveOrders />
			</View>
		</SafeAreaView>
	);
}

export default Dashboard;
