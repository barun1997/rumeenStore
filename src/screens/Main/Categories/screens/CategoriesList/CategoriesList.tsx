import React from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useCategories } from '../../../../../hooks/queries';
import useStoreContext from '../../../../../hooks/useStoreContext';
import { CategoryType } from '../../../../../interfaces/Category';
import { CategoryCard } from '../../components/CategoryCard/CategoryCard';

function CategoriesList(): JSX.Element {
	const storeContext = useStoreContext();

	const { ...queryInfo } = useCategories(storeContext);

	const categories = queryInfo.isSuccess ? queryInfo.data : [];

	const renderItem: ListRenderItem<CategoryType> = ({ item: { name, count } }) => (
		<CategoryCard title={name} numberOfProducts={count ?? 0} />
	);
	return (
		<View style={styles.container}>
			<FlatList
				data={categories}
				renderItem={renderItem}
				keyExtractor={(item) => item.id as string}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: wp('5%') },
});
export default CategoriesList;
