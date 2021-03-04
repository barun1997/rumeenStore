import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Chip, Subheading, Title } from 'react-native-paper';
import { getValuesForEnum } from '../../../../../../../constants/getValuesForEnum';
import OrderStatus from '../../../../../../../constants/orderStatus';
import { ORDERS_ROUTE } from '../../../../../../../constants/routes';
import { useOrders } from '../../../../../../../hooks/queries';
import useStoreContext from '../../../../../../../hooks/useStoreContext';
import { NoOrders } from '../NoOrders/NoOrders';
import { OrderDashboardList } from '../OrderDashboardList/OrderDashboardList';

export const ActiveOrders: React.FC<Record<string, never>> = () => {
	const storeContext = useStoreContext();
	const orderStatuses = getValuesForEnum(OrderStatus);
	const navigation = useNavigation();

	const [statusFilter, setStatusFilter] = useState(OrderStatus.Pending);

	const { ...queryInfo } = useOrders(storeContext, statusFilter);

	const orders = queryInfo.isSuccess ? queryInfo.data : [];

	return (
		<View style={styles.activeOrdersContainer}>
			<View style={styles.row}>
				<Title>Active Orders</Title>
				<TouchableHighlight onPress={() => navigation.navigate(ORDERS_ROUTE)}>
					<Subheading>View All</Subheading>
				</TouchableHighlight>
			</View>
			<ScrollView horizontal contentContainerStyle={styles.chipRow}>
				{orderStatuses.map((orderStatus, index) => (
					<Chip
						selected={statusFilter === index}
						key={orderStatus}
						style={{ marginHorizontal: 2 }}
						onPress={() => setStatusFilter(index)}>
						{orderStatus}
					</Chip>
				))}
			</ScrollView>
			{orders.length > 0 ? (
				<OrderDashboardList style={styles.cardList} orders={orders} />
			) : (
				<NoOrders style={styles.noOrdersStyle} status={statusFilter} />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	noOrdersStyle: {
		marginVertical: '5%',
		height: '60%',
		flexDirection: 'column',
		alignContent: 'center',
		alignItems: 'center',
	},
	cardList: {
		marginVertical: '2%',
	},
	chipRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	activeOrdersContainer: {
		padding: '5%',
		flexDirection: 'column',
		justifyContent: 'space-between',
		height: '50%',
	},
});
