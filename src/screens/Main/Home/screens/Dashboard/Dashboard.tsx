import React from 'react';
import { SafeAreaView } from 'react-native';
import { ActiveOrders } from './components/ActiveOrders/ActiveOrders';
import { DashboardOverview } from './components/DashboardOverview/DashboardOverview';

function Dashboard(): JSX.Element {
	return (
		<SafeAreaView>
			<DashboardOverview />
			<ActiveOrders />
		</SafeAreaView>
	);
}

export default Dashboard;
