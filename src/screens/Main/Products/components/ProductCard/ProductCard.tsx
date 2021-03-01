import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Card, Paragraph, Subheading, Title, useTheme } from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { MenuDropdown } from '../../../../../components/MenuDropdown/MenuDropdown';

interface ProductCardProps {
	title: string;
	price: string;
	type: string;
	imageSource: string;
	openMenu: (id: string) => void;
	closeMenu: () => void;
	visible: string;
	id: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
	imageSource,
	title,
	id,
	price,
	type,
	visible,
	closeMenu,
	openMenu,
}) => {
	const { colors } = useTheme();
	const styles = getStyles(colors);

	return (
		<Card style={styles.container}>
			<View style={styles.rowView}>
				<View style={styles.rowView}>
					<Image style={styles.image} source={{ uri: imageSource }} />
					<View style={styles.description}>
						<Title>{title}</Title>
						<Subheading>Rs. {price}</Subheading>
						<Paragraph style={styles.productType}>{type}</Paragraph>
					</View>
				</View>
				<MenuDropdown
					buttonColor={colors.backdrop}
					dismissMenu={closeMenu}
					id={id}
					openMenu={openMenu}
					visible={visible}
				/>
			</View>
		</Card>
	);
};

const getStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		container: { marginVertical: heightPercentageToDP('1%') },
		rowView: { flexDirection: 'row', justifyContent: 'space-between' },
		image: {
			width: widthPercentageToDP('20%'),
			height: heightPercentageToDP('10%'),
			alignSelf: 'center',
		},
		description: { padding: '5%' },
		productType: { color: colors.primary },
	});
