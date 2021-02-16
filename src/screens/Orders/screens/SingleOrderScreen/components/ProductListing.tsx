import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Headline, Subheading, useTheme } from 'react-native-paper';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { ProductType } from '../../../../../interfaces/Product';

interface ProductListingProps {
	product: ProductType;
	quantity: number;
}

const ProductListing: React.FC<ProductListingProps> = ({ product, quantity }) => {
	const { name, photo, price } = product;
	const { colors } = useTheme();
	const styles = useStyles(colors);
	return (
		<View style={styles.rowView}>
			<Image style={styles.image} source={{ uri: photo as string }} />
			<View style={styles.description}>
				<Headline>{name}</Headline>
				<Subheading style={styles.primary}>
					{quantity} x {price}
				</Subheading>
			</View>
			<Subheading style={styles.amount}>Rs {quantity * price}</Subheading>
		</View>
	);
};

const useStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		rowView: {
			justifyContent: 'space-between',
			flexDirection: 'row',
			marginVertical: heightPercentageToDP('2%'),
		},

		description: {
			paddingHorizontal: '10%',
			justifyContent: 'space-between',
			flex: 3,
		},
		image: {
			height: heightPercentageToDP('10%'),
			flex: 2,
		},
		primary: {
			color: colors.primary,
		},
		amount: {
			color: colors.primary,
			alignSelf: 'flex-end',
		},
	});

export default ProductListing;
