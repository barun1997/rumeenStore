import React, { useEffect } from 'react';
import { ListRenderItem, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import useStoreContext from '../../../../hooks/useStoreContext';
import { OrderType } from '../../../../interfaces/Order';
import { getOrders } from '../../../../services/orderService';
import { OrderCard } from '../../components/OrderCard/OrderCard';

function OrdersScreen(): JSX.Element {
	const [orders, setOrders] = React.useState<OrderType[]>([]);
	const storeContext = useStoreContext();

	useEffect(() => {
		async function fetchOrders() {
			try {
				const response = await getOrders(storeContext);
				if (!response) return;

				setOrders(response);
			} catch (error) {
				console.log(error);
			}
		}
		void fetchOrders();
	}, []);

	const renderItem: ListRenderItem<OrderType> = ({ item: { from, location, total, status } }) => (
		<OrderCard title={from} location={location} price={total.toString()} status={status} />
	);
	return (
		<View style={styles.container}>
			<FlatList data={orders} renderItem={renderItem} keyExtractor={(item) => item.id} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: widthPercentageToDP('5%') },
});

export default OrdersScreen;
