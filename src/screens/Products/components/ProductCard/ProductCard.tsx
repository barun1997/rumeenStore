import React from 'react';
import { View, Image, ImageSourcePropType, StyleSheet } from 'react-native';
import { Card, Title, Subheading, Paragraph, useTheme } from 'react-native-paper';

interface ProductCardProps {
	imageSource: ImageSourcePropType;
	productTitle: string;
	productPrice: string;
	productType: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
	imageSource,
	productTitle,
	productPrice,
	productType,
}) => {
	const { colors } = useTheme();
	const styles = getStyles(colors);
	return (
		<Card style={styles.container}>
			<View style={styles.rowView}>
				<Image style={styles.image} source={imageSource} />
				<View style={styles.description}>
					<Title>{productTitle}</Title>
					<Subheading>Rs. {productPrice}</Subheading>
					<Paragraph style={styles.productType}>{productType}</Paragraph>
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
