import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Paragraph, Title, useTheme } from 'react-native-paper';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { OrderStatusComp as OrderStatus } from '../OrderStatus/OrderStatus';

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
				<View>
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
			marginVertical: heightPercentageToDP('1%'),
		},
		rowView: { flexDirection: 'row', justifyContent: 'space-between', padding: '5%' },
		location: { marginHorizontal: '2%' },
		locationView: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		price: { alignSelf: 'center', color: colors.primary },
	});
