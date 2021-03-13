import React from 'react';
import { ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { OrderType } from '../../../../../../../interfaces/Order';
import { OrderDashboardCard } from '../OrderDashboardCard/OrderDashboardCard';

interface OrderDashboardListProps {
	orders: OrderType[];
	style?: StyleProp<ViewStyle>;
}

export const OrderDashboardList: React.FC<OrderDashboardListProps> = ({ orders, style }) => {
	const renderItem: ListRenderItem<OrderType> = ({ item }) => <OrderDashboardCard order={item} />;
	return (
		<FlatList
			data={orders}
			contentContainerStyle={style}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
		/>
	);
};
