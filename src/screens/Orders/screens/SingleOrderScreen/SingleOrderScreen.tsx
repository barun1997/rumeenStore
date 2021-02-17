import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider, Subheading, useTheme } from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { OrderType } from '../../../../interfaces/Order';
import { ProductType } from '../../../../interfaces/Product';
import { getSingleOrder } from '../../../../services/orderService';
import { OrderStatus } from '../../components/OrderStatus/OrderStatus';
import { CustomerInfo } from './components/CustomerInfo/CustomerInfo';
import ProductListing from './components/ProductListing';
import TotalOrderInfo from './components/TotalOrderInfo/TotalOrderInfo';

type SingleOrderRouteProp = RouteProp<{ params: { id: string } }, 'params'>;

function SingleOrderScreen(): JSX.Element {
	const [order, setOrder] = React.useState<OrderType>();
	const { colors } = useTheme();

	const styles = useStyles(colors);

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
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.row}>
				<Subheading>Order Id #1</Subheading>
				<OrderStatus status={order.status} />
			</View>
			<Divider />

			<View style={styles.listOfItems}>
				<Text>3 items</Text>
				{order.products.map(({ product, quantity }) => (
					<ProductListing key={product.id} product={product as ProductType} quantity={quantity} />
				))}
			</View>
			<Divider />
			<TotalOrderInfo total={order.total} />
			<Divider style={styles.divider} />
			<CustomerInfo from={order.from} location={order.location} />
		</ScrollView>
	);
}

const useStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		container: {
			padding: widthPercentageToDP('5%'),
			justifyContent: 'space-evenly',
			flexDirection: 'column',
			backgroundColor: colors.surface,
		},
		listOfItems: {
			marginVertical: heightPercentageToDP('5%'),
		},
		rowView: {
			justifyContent: 'space-between',
			flexDirection: 'row',
			marginVertical: heightPercentageToDP('2%'),
		},

		row: {
			justifyContent: 'space-between',
			flexDirection: 'row',
			marginVertical: heightPercentageToDP('1%'),
		},
		description: {
			paddingHorizontal: '10%',
			justifyContent: 'space-between',
			flex: 3,
		},
		image: {
			height: heightPercentageToDP('10%'),
			flex: 2,
		},
		primary: {
			color: colors.primary,
		},
		amount: {
			color: colors.primary,
			alignSelf: 'flex-end',
		},
		list: {
			justifyContent: 'space-between',
			flexDirection: 'column',
		},
		divider: {
			marginVertical: heightPercentageToDP('2%'),
		},
	});

export default SingleOrderScreen;
