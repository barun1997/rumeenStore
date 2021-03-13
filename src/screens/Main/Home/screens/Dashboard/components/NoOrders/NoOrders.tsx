import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Card, Subheading } from 'react-native-paper';
import { getValuesForEnum } from '../../../../../../../constants/getValuesForEnum';
import OrderStatus from '../../../../../../../constants/orderStatus';

interface NoOrdersProps {
	style?: StyleProp<ViewStyle>;
	status?: OrderStatus;
}

export const NoOrders: React.FC<NoOrdersProps> = ({ style, status }) => {
	return (
		<Card style={style}>
			<Subheading>
				You donot have any {status !== undefined ? getValuesForEnum(OrderStatus)[status] : null}{' '}
				orders right now
			</Subheading>
		</Card>
	);
};
