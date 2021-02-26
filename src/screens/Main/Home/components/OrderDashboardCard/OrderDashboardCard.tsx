import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Card, Paragraph, Subheading, useTheme } from 'react-native-paper';
import { heightPercentageToDP } from 'react-native-responsive-screen';

interface OrderDashboardCardProps {
	title: string;
	price: string;
	quantity: number;
	orderCreated: string;
	imageSource: string;
}

export const OrderDashboardCard: React.FC<OrderDashboardCardProps> = ({
	imageSource,
	title,
	price,
	quantity,
	orderCreated,
}) => {
	const { colors } = useTheme();
	const styles = getStyles(colors);
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
				<View style={styles.rowView}>
					<Button mode="outlined" onPress={() => console.log('cancel')}>
						Cancel Order
					</Button>
					<Button mode="contained" onPress={() => console.log('Ship')}>
						Ship Order
					</Button>
				</View>
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
