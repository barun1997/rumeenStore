import React from 'react';
import { SafeAreaView } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { ActiveOrders } from './components/ActiveOrders/ActiveOrders';
import { DashboardOverview } from './components/DashboardOverview/DashboardOverview';

function Dashboard(): JSX.Element {
	return (
		<SafeAreaView>
			<DashboardOverview containerStyle={{ marginTop: heightPercentageToDP('5%') }} />
			<ActiveOrders />
		</SafeAreaView>
	);
}

export default Dashboard;
