import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Card, Subheading } from 'react-native-paper';

interface NoOrdersProps {
	style?: StyleProp<ViewStyle>;
}

export const NoOrders: React.FC<NoOrdersProps> = ({ style }) => {
	return (
		<Card
			style={
				style ?? {
					height: 170,
					alignItems: 'center',
					justifyContent: 'center',
				}
			}>
			<Subheading> You donot have any active orders right now </Subheading>
		</Card>
	);
};
