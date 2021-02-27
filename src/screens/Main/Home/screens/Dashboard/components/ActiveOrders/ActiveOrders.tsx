import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Chip, Subheading, Title } from 'react-native-paper';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { OrderType } from '../../../../../../../interfaces/Order';
import { NoOrders } from '../NoOrders/NoOrders';
import { OrderDashboardList } from '../OrderDashboardList/OrderDashboardList';

interface ActiveOrdersProps {
	orders: OrderType[];
	orderStatuses: string[];
	setOrders: React.Dispatch<React.SetStateAction<OrderType[]>>;
}

export const ActiveOrders: React.FC<ActiveOrdersProps> = ({ orderStatuses, orders, setOrders }) => {
	return (
		<View style={styles.activeOrdersContainer}>
			<View style={styles.row}>
				<Title>Active Orders</Title>
				<Subheading>View All</Subheading>
			</View>
			<ScrollView horizontal contentContainerStyle={styles.chipRow}>
				{orderStatuses.map((orderStatus) => (
					<Chip key={orderStatus} style={{ marginHorizontal: 2 }}>
						{orderStatus}
					</Chip>
				))}
			</ScrollView>
			{orders ? <OrderDashboardList orders={orders} setOrders={setOrders} /> : <NoOrders />}
		</View>
	);
};

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	chipRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	chip: { marginHorizontal: 2 },

	activeOrdersContainer: {
		padding: '5%',
		flexDirection: 'column',
		justifyContent: 'space-between',
		minHeight: heightPercentageToDP('35%'),
	},
});
