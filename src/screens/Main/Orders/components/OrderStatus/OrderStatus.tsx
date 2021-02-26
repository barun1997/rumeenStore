import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colorByStatus from '../../../../../constants/colorByStatus';
import OrderStatus from '../../../../../constants/orderStatus';

interface OrderStatusProps {
	status: OrderStatus;
}

const OrderStatusComp: React.FC<OrderStatusProps> = ({ status }) => {
	return (
		<View style={styles.statusView}>
			<MaterialCommunityIcon name="circle" color={colorByStatus[status]} />
			<Paragraph style={styles.status}>{OrderStatus[status]}</Paragraph>
		</View>
	);
};

export default OrderStatusComp;

const styles = StyleSheet.create({
	statusView: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	status: { marginHorizontal: '2%' },
});
