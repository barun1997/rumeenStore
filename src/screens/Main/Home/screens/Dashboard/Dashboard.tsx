import React from 'react';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActiveOrders } from './components/ActiveOrders/ActiveOrders';
import { DashboardOverview } from './components/DashboardOverview/DashboardOverview';

function Dashboard(): JSX.Element {
	return (
		<SafeAreaView>
			<ScrollView>
				<DashboardOverview />
				<ActiveOrders />
			</ScrollView>
		</SafeAreaView>
	);
}

export default Dashboard;
