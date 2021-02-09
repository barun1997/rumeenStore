import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

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
	container: {
		marginTop: 20,
	},
	description: { margin: 20 },
	rowView: { flexDirection: 'row', justifyContent: 'space-between' },
});
