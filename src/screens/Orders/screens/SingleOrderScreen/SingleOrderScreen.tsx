import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { OrderType } from '../../../../interfaces/Order';
import { getSingleOrder } from '../../../../services/orderService';

type SingleOrderRouteProp = RouteProp<{ params: { id: string } }, 'params'>;

function SingleOrderScreen(): JSX.Element {
	const [order, setOrder] = React.useState<OrderType>();

	const { params } = useRoute<SingleOrderRouteProp>();

	useEffect(() => {
		async function fetchOrder() {
			if (!params.id) return;
			try {
				const response = await getSingleOrder(params?.id);
				if (!response) return;

				setOrder(response);
			} catch (error) {
				console.log(error);
			}
		}
		void fetchOrder();
	}, [params.id]);

	if (!order)
		return (
			<View style={styles.container}>
				<Text>Cannot seem to fetch that order</Text>
			</View>
		);
	return (
		<View style={styles.container}>
			<Text>{order.from}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: widthPercentageToDP('5%') },
});

export default SingleOrderScreen;
