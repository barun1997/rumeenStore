import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import OrderStatus from '../../constants/orderStatus';

interface OrderStatusButtonsProps {
	status: OrderStatus;
	handleStatusChange: (status: OrderStatus) => void;
}

export const OrderStatusButtons: React.FC<OrderStatusButtonsProps> = ({
	status,
	handleStatusChange,
}) => {
	const { colors } = useTheme();

	if (status === OrderStatus.Pending)
		return (
			<View style={styles.rowView}>
				<Button
					color={colors.error}
					mode="outlined"
					onPress={() => handleStatusChange(OrderStatus.Cancelled)}>
					Cancel Order
				</Button>
				<Button
					mode="contained"
					onPress={() => handleStatusChange(OrderStatus.Processing)}
					color={colors.primary}>
					Ship Order
				</Button>
			</View>
		);
	else if (status === OrderStatus.Processing)
		return (
			<View style={styles.rowView}>
				<Button
					color={colors.error}
					mode="outlined"
					onPress={() => handleStatusChange(OrderStatus.Cancelled)}>
					Cancel Order
				</Button>
				<Button
					mode="contained"
					onPress={() => handleStatusChange(OrderStatus.Finalized)}
					color={colors.primary}>
					Delivered
				</Button>
			</View>
		);
	else if (status === OrderStatus.Cancelled) {
		return (
			<View style={styles.rowView}>
				<Button mode="outlined" color={colors.error}>
					Cancelled
				</Button>
			</View>
		);
	} else
		return (
			<View style={styles.rowView}>
				<Button mode="outlined" color={colors.primary}>
					Finalized
				</Button>
			</View>
		);
};

const styles = StyleSheet.create({
	rowView: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});
