import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Card, Paragraph, Subheading, useTheme } from 'react-native-paper';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useQueryClient } from 'react-query';
import { OrderStatusButtons } from '../../../../../../../components/OrderStatusButtons/OrderStatusButtons';
import OrderStatus from '../../../../../../../constants/orderStatus';
import { useUpdateOrderMutation } from '../../../../../../../hooks/mutations';
import useStoreContext from '../../../../../../../hooks/useStoreContext';
import { OrderType } from '../../../../../../../interfaces/Order';

interface OrderDashboardCardProps {
	order: OrderType;
}

export const OrderDashboardCard: React.FC<OrderDashboardCardProps> = ({ order }) => {
	const { total, products, status, orderCreated, from } = order;
	const [title, quantity, imageSource, price] = [from, products.length, products[0].photo, total];
	const storeContext = useStoreContext();
	const queryClient = useQueryClient();

	const mutation = useUpdateOrderMutation(storeContext, queryClient);

	const { colors } = useTheme();
	const styles = getStyles(colors);

	const handleOrderStatusChange = (status: OrderStatus) => {
		mutation.mutate({
			...order,
			status: status,
		});
	};

	return (
		<Card style={styles.container}>
			<View style={styles.contentAlignment}>
				<View style={styles.rowView}>
					<Image style={styles.image} source={{ uri: imageSource }} />
					<View>
						<Subheading>{title}</Subheading>
						<Paragraph>{quantity} item</Paragraph>
					</View>
					<View style={{ alignItems: 'flex-end' }}>
						<Subheading>Rs. {price}</Subheading>
						<Paragraph>{orderCreated}</Paragraph>
					</View>
				</View>
				<OrderStatusButtons status={status} handleStatusChange={handleOrderStatusChange} />
			</View>
		</Card>
	);
};

const getStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		container: {
			padding: '4%',
			height: heightPercentageToDP('15%'),
			justifyContent: 'space-between',
			marginVertical: 10,
		},
		contentAlignment: {
			justifyContent: 'space-between',
			height: '100%',
		},
		rowView: {
			flexDirection: 'row',
			justifyContent: 'space-around',
		},
		image: {
			width: '15%',
			height: '100%',
			alignSelf: 'center',
		},
		descriptionRow: {
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		productType: { color: colors.primary },
	});
