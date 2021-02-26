import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Card, Subheading, Title } from 'react-native-paper';

interface HomeCardProps {
	title: string;
	total: number;
	amount?: boolean;
	style?: StyleProp<ViewStyle>;
}

export const HomeCard: React.FC<HomeCardProps> = ({ title, total, amount, style }) => {
	return (
		<Card style={style ?? { width: '45%', padding: '4%' }}>
			<Subheading>{title.toUpperCase()}</Subheading>
			<Title>
				{amount && 'Rs '}
				{total}
			</Title>
		</Card>
	);
};
