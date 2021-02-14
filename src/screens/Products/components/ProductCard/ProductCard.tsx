import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Card, Title, Subheading, Paragraph, useTheme } from 'react-native-paper';

interface ProductCardProps {
	title: string;
	price: string;
	type: string;
	imageSource: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ imageSource, title, price, type }) => {
	const { colors } = useTheme();
	const styles = getStyles(colors);
	return (
		<Card style={styles.container}>
			<View style={styles.rowView}>
				<Image style={styles.image} source={{ uri: imageSource }} />
				<View style={styles.description}>
					<Title>{title}</Title>
					<Subheading>Rs. {price}</Subheading>
					<Paragraph style={styles.productType}>{type}</Paragraph>
				</View>
			</View>
		</Card>
	);
};

const getStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		container: {
			marginTop: 20,
		},
		rowView: { flexDirection: 'row' },
		image: { width: 100, height: 100, alignSelf: 'center', margin: 10 },
		description: { margin: 20 },
		productType: { color: colors.primary },
	});
