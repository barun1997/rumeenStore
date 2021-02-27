import React from 'react';
import { ListRenderItem } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { OrderType } from '../../../../../../../interfaces/Order';
import { OrderDashboardCard } from '../OrderDashboardCard/OrderDashboardCard';

interface OrderDashboardListProps {
	orders: OrderType[];
	setOrders: React.Dispatch<React.SetStateAction<OrderType[]>>;
}

export const OrderDashboardList: React.FC<OrderDashboardListProps> = ({ orders, setOrders }) => {
	const renderItem: ListRenderItem<OrderType> = ({ item }) => (
		<OrderDashboardCard order={item} setOrders={setOrders} />
	);

	return <FlatList data={orders} renderItem={renderItem} keyExtractor={(item) => item.id} />;
};
