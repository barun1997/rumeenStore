import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ListRenderItem, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useOrders } from '../../../../../hooks/queries';
import useStoreContext from '../../../../../hooks/useStoreContext';
import { OrderType } from '../../../../../interfaces/Order';
import { OrderCard } from '../../components/OrderCard/OrderCard';

function OrdersScreen(): JSX.Element {
	const storeContext = useStoreContext();

	const { ...queryInfo } = useOrders(storeContext);

	const orders = queryInfo.isSuccess ? queryInfo.data : [];
	const navigation = useNavigation();

	const handleCardPress = (id: string): void => {
		navigation.navigate('SingleOrder', {
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
