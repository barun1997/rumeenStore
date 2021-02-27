import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getValuesForEnum } from '../../../../../constants/getValuesForEnum';
import OrderStatus from '../../../../../constants/orderStatus';
import useStoreContext from '../../../../../hooks/useStoreContext';
import { OrderType } from '../../../../../interfaces/Order';
import { getOrders } from '../../../../../services/orderService';
import { ActiveOrders } from './components/ActiveOrders/ActiveOrders';
import { DashboardOverview } from './components/DashboardOverview/DashboardOverview';

function Dashboard(): JSX.Element {
	const orderStatuses = getValuesForEnum(OrderStatus);
	const storeContext = useStoreContext();

	const [orders, setOrders] = useState<OrderType[]>([]);

	useEffect(() => {
		const fetchOrders = async () => {
			const response = await getOrders(storeContext);
			if (!response) return;

			setOrders(response);
		};
		void fetchOrders();
	}, []);

	return (
		<SafeAreaView>
			<ScrollView>
				<DashboardOverview />
				<ActiveOrders orderStatuses={orderStatuses} orders={orders} setOrders={setOrders} />
			</ScrollView>
		</SafeAreaView>
	);
}

export default Dashboard;
