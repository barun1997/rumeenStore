import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Card, Paragraph, Subheading, Title, useTheme } from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useQueryClient } from 'react-query';
import { MenuDropdown } from '../../../../../components/MenuDropdown/MenuDropdown';
import { ADD_PRODUCT_ROUTE } from '../../../../../constants/routes';
import { useDeleteProductMutation, useUpdateProductMutation } from '../../../../../hooks/mutations';
import useStoreContext from '../../../../../hooks/useStoreContext';
import { ProductType } from '../../../../../interfaces/Product';

interface ProductCardProps {
	product: ProductType;
	openMenu: (id: string) => void;
	closeMenu: () => void;
	visible: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
	product,
	visible,
	closeMenu,
	openMenu,
}) => {
	const { id, name, photo, price, listed } = product;

	const { colors } = useTheme();
	const styles = getStyles(colors);

	const navigation = useNavigation();

	const storeContext = useStoreContext();
	const queryClient = useQueryClient();

	const deleteProductMutation = useDeleteProductMutation(storeContext, queryClient);
	const updateProductMutation = useUpdateProductMutation(storeContext, queryClient, id);

	const handleEdit = () => {
		navigation.navigate(ADD_PRODUCT_ROUTE, {
			id,
		});
	};

	const handleDelete = () => {
		deleteProductMutation.mutate(id);
	};

	const handleListed = (listedValue: boolean) => {
		updateProductMutation.mutate({
			...product,
			listed: !listedValue,
		});
	};

	return (
		<Card style={styles.container}>
			<View style={styles.rowView}>
				<View style={[styles.rowView, styles.productInfoRow]}>
					<FastImage style={styles.image} source={{ uri: photo }} />
					<View style={styles.description}>
						<Title allowFontScaling={false} style={styles.title}>
							{name}
						</Title>
						<Subheading>Rs. {price.toString()}</Subheading>
						<Paragraph style={listed ? styles.productListed : styles.productNotListed}>
							{listed ? 'Listed Online' : 'Not listed'}
						</Paragraph>
					</View>
				</View>
				<MenuDropdown
					editAction={handleEdit}
					deleteAction={handleDelete}
					listedValue={listed as boolean}
					handleListed={handleListed}
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
		productInfoRow: {
			maxWidth: '70%',
			alignItems: 'flex-start',
		},
		title: {
			flex: 1,
			flexWrap: 'wrap',
		},
		image: {
			width: widthPercentageToDP('20%'),
			height: heightPercentageToDP('10%'),
			alignSelf: 'center',
		},
		description: { padding: '5%' },
		productListed: { color: colors.primary },
		productNotListed: { color: colors.error },
	});
