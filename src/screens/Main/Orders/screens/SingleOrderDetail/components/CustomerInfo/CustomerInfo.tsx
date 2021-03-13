import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Subheading } from 'react-native-paper';
import { heightPercentageToDP } from 'react-native-responsive-screen';

interface CustomerInfoProps {
	from: string;
	location: string;
}

export const CustomerInfo: React.FC<CustomerInfoProps> = ({ from, location }) => {
	return (
		<View>
			<Subheading>Customer Detail</Subheading>
			<View style={styles.row}>
				<Subheading>Name</Subheading>
				<Subheading>{from}</Subheading>
			</View>
			<View style={styles.row}>
				<Subheading>Location</Subheading>
				<Subheading>{location}</Subheading>
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
