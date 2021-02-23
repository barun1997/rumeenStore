import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import { heightPercentageToDP } from 'react-native-responsive-screen';

interface CategoryCardProps {
	title: string;
	numberOfProducts: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ title, numberOfProducts }) => {
	return (
		<Card style={styles.container}>
			<View style={styles.rowView}>
				<View style={styles.description}>
					<Title>{title}</Title>
					<Paragraph>{numberOfProducts} Product Listed</Paragraph>
				</View>
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	container: { marginVertical: heightPercentageToDP('1%') },
	description: { padding: '5%' },
	rowView: { flexDirection: 'row', justifyContent: 'space-between' },
});
