import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Card, Paragraph, Subheading, Title, useTheme } from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useQueryClient } from 'react-query';
import { MenuDropdown } from '../../../../../components/MenuDropdown/MenuDropdown';
import { ADD_PRODUCT_ROUTE } from '../../../../../constants/routes';
import { useDeleteProductMutation } from '../../../../../hooks/mutations';
import useStoreContext from '../../../../../hooks/useStoreContext';

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

	const navigation = useNavigation();

	const storeContext = useStoreContext();
	const queryClient = useQueryClient();

	const deleteProductMutation = useDeleteProductMutation(storeContext, queryClient);

	const handleEdit = () => {
		navigation.navigate(ADD_PRODUCT_ROUTE, {
			id,
		});
	};

	const handleDelete = () => {
		deleteProductMutation.mutate(id);
	};

	return (
		<Card style={styles.container}>
			<View style={styles.rowView}>
				<View style={styles.rowView}>
					<FastImage style={styles.image} source={{ uri: imageSource }} />
					<View style={styles.description}>
						<Title>{title}</Title>
						<Subheading>Rs. {price}</Subheading>
						<Paragraph style={styles.productType}>{type}</Paragraph>
					</View>
				</View>
				<MenuDropdown
					editAction={handleEdit}
					deleteAction={handleDelete}
					buttonColor={colors.backdrop}
					dismissMenu={closeMenu}
					id={id}
					openMenu={openMenu}
					visible={visible === id}
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
