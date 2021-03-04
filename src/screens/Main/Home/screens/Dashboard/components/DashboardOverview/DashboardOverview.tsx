import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Subheading, Title } from 'react-native-paper';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { HomeCard } from '../HomeCard/HomeCard';

interface DashboardOverviewProps {
	containerStyle?: StyleProp<ViewStyle>;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ containerStyle }) => {
	return (
		<View style={[containerStyle, styles.overviewContainer]}>
			<View style={styles.row}>
				<Title>Overview</Title>
				<Subheading>Life Time</Subheading>
			</View>
			<View style={styles.row}>
				<HomeCard title="Orders" total={0} />
				<HomeCard amount title="Revenue" total={0} />
			</View>
			<View style={styles.row}>
				<HomeCard title="Store Views" total={0} />
				<HomeCard title="Product Views" total={0} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	overviewContainer: {
		padding: '5%',
		flexDirection: 'column',
		justifyContent: 'space-between',
		height: heightPercentageToDP('32%'),
	},
});
