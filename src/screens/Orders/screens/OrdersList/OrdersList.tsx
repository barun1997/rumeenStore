import React from 'react';
import { View } from 'react-native';
import { OrderCard } from '../../components/OrderCard/OrderCard';

function OrdersScreen(): JSX.Element {
	return (
		<View style={{ flex: 1, justifyContent: 'flex-start', padding: 20 }}>
			<OrderCard title="Order #1" location="Baneshwor, Kathmandu" price="450" status="Pending" />
			<OrderCard title="Order #2" location="Baneshwor, Kathmandu" price="450" status="Pending" />
		</View>
	);
}

export default OrdersScreen;
