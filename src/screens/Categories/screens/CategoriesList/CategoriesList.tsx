import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import useStoreContext from '../../../../hooks/useStoreContext';
import { CategoryType } from '../../../../interfaces/Category';
import { getCategories } from '../../../../services/categoryService';
import { CategoryCard } from '../../components/CategoryCard/CategoryCard';

function CategoriesList(): JSX.Element {
	const [categories, setCategories] = React.useState<CategoryType[]>([]);
	const isFocused = useIsFocused();
	const storeContext = useStoreContext();
	useEffect(() => {
		const fetchCategories = async () => {
			const categoryResponse = await getCategories(storeContext);
			if (categoryResponse) setCategories(categoryResponse);
		};
		void fetchCategories();
	}, [isFocused]);

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
