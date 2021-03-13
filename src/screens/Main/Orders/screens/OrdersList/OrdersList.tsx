import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ListRenderItem, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { getEnumValueFromString } from '../../../../../constants/getEnumValueFromString';
import OrderStatus from '../../../../../constants/orderStatus';
import { SINGLE_ORDER_ROUTE } from '../../../../../constants/routes';
import { useOrders } from '../../../../../hooks/queries';
import useStoreContext from '../../../../../hooks/useStoreContext';
import { OrderType } from '../../../../../interfaces/Order';
import Loading from '../../../Loading';
import { OrderCard } from '../../components/OrderCard/OrderCard';

interface OrdersListProps {
	status: string;
}

function OrdersScreen({ status }: OrdersListProps): JSX.Element {
	const storeContext = useStoreContext();

	const statusNumber = getEnumValueFromString(status, OrderStatus);

	const { ...queryInfo } = useOrders(storeContext, statusNumber);

	const isLoading = queryInfo.isLoading;

	const orders = queryInfo.isSuccess ? queryInfo.data : [];
	const navigation = useNavigation();

	const handleCardPress = (id: string): void => {
		navigation.navigate(SINGLE_ORDER_ROUTE, {
			id: id,
		});
	};

	const renderItem: ListRenderItem<OrderType> = ({
		item: { id, from, location, total, status },
	}) => (
		<OrderCard
			handleCardPress={() => handleCardPress(id)}
			title={from}
			location={location}
			price={total.toString()}
			status={status}
		/>
	);

	if (isLoading) return <Loading />;
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
