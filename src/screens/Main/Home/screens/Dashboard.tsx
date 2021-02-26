import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Chip, Subheading, Title } from 'react-native-paper';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { getValuesForEnum } from '../../../../constants/getValuesForEnum';
import OrderStatus from '../../../../constants/orderStatus';
import useStoreContext from '../../../../hooks/useStoreContext';
import { OrderType } from '../../../../interfaces/Order';
import { getOrders } from '../../../../services/orderService';
import { HomeCard } from '../components/HomeCard/HomeCard';
import { NoOrders } from '../components/NoOrders/NoOrders';
import { OrderDashboardCard } from '../components/OrderDashboardCard/OrderDashboardCard';

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
				<View style={styles.overviewContainer}>
					<View style={styles.row}>
						<Title>Overview</Title>
						<Subheading>Life Time</Subheading>
					</View>
					<View style={styles.row}>
						<HomeCard title="Orders" total={0} />
						<HomeCard amount title="Revenue" total={0} />
					</View>
					<View style={styles.row}>
						<HomeCard title="Store Views" total={0} />
						<HomeCard title="Product Views" total={0} />
					</View>
				</View>
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
					{orders ? (
						orders.map(({ from, id, total, orderCreated, products }) => (
							<View key={id}>
								<OrderDashboardCard
									imageSource={products[0].photo as string}
									price={total.toString()}
									quantity={products.length}
									orderCreated={orderCreated}
									title={from}
								/>
							</View>
						))
					) : (
						<NoOrders />
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

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
	overviewContainer: {
		padding: '5%',
		flexDirection: 'column',
		justifyContent: 'space-between',
		height: heightPercentageToDP('35%'),
	},
	activeOrdersContainer: {
		padding: '5%',
		flexDirection: 'column',
		justifyContent: 'space-between',
		minHeight: heightPercentageToDP('35%'),
	},
});
export default Dashboard;
