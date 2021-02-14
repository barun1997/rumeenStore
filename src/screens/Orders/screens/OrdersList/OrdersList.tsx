import React, { useEffect } from 'react';
import { View } from 'react-native';
import { OrderType } from '../../../../interfaces/Order';
import { getOrders } from '../../../../services/orderService';
import { OrderCard } from '../../components/OrderCard/OrderCard';

function OrdersScreen(): JSX.Element {
	const [orders, setOrders] = React.useState<OrderType[]>([]);

	useEffect(() => {
		async function fetchOrders() {
			try {
				const response = await getOrders();
				if (!response) return;

				setOrders(response);
			} catch (error) {
				console.log(error);
			}
		}
		void fetchOrders();
	}, []);
	return (
		<View style={{ flex: 1, justifyContent: 'flex-start', padding: 20 }}>
			{orders.map((order) => (
				<OrderCard
					key={order.from}
					title={order.from}
					location={order.location}
					price={order.total.toString()}
					status={order.status}
				/>
			))}
		</View>
	);
}

export default OrdersScreen;
