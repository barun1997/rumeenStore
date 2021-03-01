import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Paragraph, Title, useTheme } from 'react-native-paper';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useQueryClient } from 'react-query';
import { MenuDropdown } from '../../../../../components/MenuDropdown/MenuDropdown';
import { useDeleteCategoryMutation } from '../../../../../hooks/mutations';
import useStoreContext from '../../../../../hooks/useStoreContext';

interface CategoryCardProps {
	title: string;
	numberOfProducts: number;
	openMenu: (id: string) => void;
	closeMenu: () => void;
	visible: string;
	id: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
	title,
	numberOfProducts,
	openMenu,
	closeMenu,
	id,
	visible,
}) => {
	const { colors } = useTheme();

	const navigation = useNavigation();

	const storeContext = useStoreContext();
	const queryClient = useQueryClient();

	const deleteCategoryMutation = useDeleteCategoryMutation(storeContext, queryClient);

	const handleEdit = () => {
		navigation.navigate('AddCategory', {
			id,
		});
	};

	const handleDelete = () => {
		deleteCategoryMutation.mutate(id);
	};

	return (
		<Card style={styles.container}>
			<View style={styles.rowView}>
				<View style={styles.description}>
					<Title>{title}</Title>
					<Paragraph>{numberOfProducts} Product Listed</Paragraph>
				</View>
				<MenuDropdown
					openMenu={openMenu}
					editAction={handleEdit}
					deleteAction={handleDelete}
					dismissMenu={closeMenu}
					id={id}
					visible={visible === id}
					buttonColor={colors.backdrop}
				/>
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	container: { marginVertical: heightPercentageToDP('1%') },
	description: { padding: '5%' },
	rowView: { flexDirection: 'row', justifyContent: 'space-between' },
});
