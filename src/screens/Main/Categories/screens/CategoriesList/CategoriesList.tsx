import React from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useCategories } from '../../../../../hooks/queries';
import useStoreContext from '../../../../../hooks/useStoreContext';
import { CategoryType } from '../../../../../interfaces/Category';
import Loading from '../../../Loading';
import { CategoryCard } from '../../components/CategoryCard/CategoryCard';

function CategoriesList(): JSX.Element {
	const storeContext = useStoreContext();

	const { ...queryInfo } = useCategories(storeContext);

	const categories = queryInfo.isSuccess ? queryInfo.data : [];
	const isLoading = queryInfo.isLoading;

	const [visible, setVisible] = React.useState('');

	const openMenu = (id: string) => setVisible(id);

	const closeMenu = () => setVisible('');

	const renderItem: ListRenderItem<CategoryType> = ({ item: { id, name, count } }) => (
		<CategoryCard
			title={name}
			numberOfProducts={count ?? 0}
			id={id}
			visible={visible}
			openMenu={openMenu}
			closeMenu={closeMenu}
		/>
	);

	if (isLoading) return <Loading />;

	return (
		<View style={styles.container}>
			<FlatList data={categories} renderItem={renderItem} keyExtractor={(item) => item.id} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: wp('5%') },
});
export default CategoriesList;
