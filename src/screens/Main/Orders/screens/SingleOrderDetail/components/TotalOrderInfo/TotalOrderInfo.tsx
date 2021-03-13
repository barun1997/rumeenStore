import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Headline, Subheading } from 'react-native-paper';
import { heightPercentageToDP } from 'react-native-responsive-screen';

interface TotalOrderInfoProps {
	total: number;
}

const TotalOrderInfo: React.FC<TotalOrderInfoProps> = ({ total }) => {
	return (
		<View>
			<View style={styles.row}>
				<Subheading>Item Total</Subheading>
				<Subheading>Rs {total}</Subheading>
			</View>
			<View style={styles.row}>
				<Subheading>Delivery</Subheading>
				<Subheading>Rs 0</Subheading>
			</View>
			<View style={styles.row}>
				<Headline>Grand Total</Headline>
				<Headline>Rs {total}</Headline>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	row: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		marginVertical: heightPercentageToDP('1%'),
	},
});

export default TotalOrderInfo;
