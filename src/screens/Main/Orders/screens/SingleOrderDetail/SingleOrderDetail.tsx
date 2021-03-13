import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider, Subheading, useTheme } from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useQueryClient } from 'react-query';
import { OrderStatusButtons } from '../../../../../components/OrderStatusButtons/OrderStatusButtons';
import OrderStatus from '../../../../../constants/orderStatus';
import { useUpdateOrderMutation } from '../../../../../hooks/mutations';
import { useSingleOrder } from '../../../../../hooks/queries';
import useStoreContext from '../../../../../hooks/useStoreContext';
import Loading from '../../../Loading';
import OrderStatusComp from '../../components/OrderStatus/OrderStatus';
import { CustomerInfo } from './components/CustomerInfo/CustomerInfo';
import ProductListing from './components/ProductListing';
import TotalOrderInfo from './components/TotalOrderInfo/TotalOrderInfo';

type SingleOrderRouteProp = RouteProp<{ params: { id: string } }, 'params'>;

function SingleOrderScreen(): JSX.Element {
	const storeContext = useStoreContext();
	const queryClient = useQueryClient();

	const { params } = useRoute<SingleOrderRouteProp>();

	const { ...queryInfo } = useSingleOrder(params.id, storeContext);

	const mutation = useUpdateOrderMutation(storeContext, queryClient);

	const order = queryInfo.isSuccess ? queryInfo.data : null;

	const isLoading = queryInfo.isLoading;

	const { colors } = useTheme();

	const styles = useStyles(colors);

	if (isLoading) return <Loading />;

	if (!order)
		return (
			<View style={styles.container}>
				<Text>Cannot seem to fetch that order</Text>
			</View>
		);

	const handleStatusChange = (status: OrderStatus) => {
		mutation.mutate({
			...order,
			status: status,
		});
	};

	return (
		<View>
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.row}>
					<Subheading>Order Id #1</Subheading>
					<OrderStatusComp status={order.status} />
				</View>
				<Divider />

				<View style={styles.listOfItems}>
					<Text>{order.products.length} items</Text>
					{order.products.map((product) => (
						<ProductListing key={product.id} product={product} />
					))}
				</View>
				<Divider />
				<TotalOrderInfo total={order.total} />
				<Divider style={styles.divider} />
				<CustomerInfo from={order.from} location={order.location} />
				<OrderStatusButtons status={order.status} handleStatusChange={handleStatusChange} />
			</ScrollView>
		</View>
	);
}

const useStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		container: {
			padding: widthPercentageToDP('5%'),
			justifyContent: 'space-evenly',
			flexDirection: 'column',
			backgroundColor: colors.surface,
			height: heightPercentageToDP('80%'),
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
