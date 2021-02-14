import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, useTheme } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { OrderStatus } from '../OrderStatus/OrderStatus';

interface OrderCardProps {
	location: string;
	status: number;
	price: string;
	title: string;
}

export const OrderCard: React.FC<OrderCardProps> = ({ title, price, status, location }) => {
	const { colors } = useTheme();
	const styles = getStyles(colors);
	return (
		<Card style={styles.container}>
			<View style={styles.rowView}>
				<View style={styles.leftSide}>
					<Title>{title}</Title>
					<View style={styles.locationView}>
						<MaterialCommunityIcon name="map-marker" color={colors.primary} />
						<Paragraph style={styles.location}>{location}</Paragraph>
					</View>
					<OrderStatus status={status} />
				</View>
				<Title style={styles.price}>Rs {price}</Title>
			</View>
		</Card>
	);
};

const getStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		container: {
			marginTop: 20,
		},
		leftSide: { margin: 20 },
		rowView: { flexDirection: 'row', justifyContent: 'space-between' },
		location: { marginHorizontal: 4 },
		locationView: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		price: { alignSelf: 'center', color: colors.primary, margin: 20 },
	});
