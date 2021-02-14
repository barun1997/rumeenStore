import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native';
import { CategoryType } from '../../../../interfaces/Category';
import { getCategories } from '../../../../services/categoryService';
import { CategoryCard } from '../../components/CategoryCard/CategoryCard';

function CategoriesList(): JSX.Element {
	const [categories, setCategories] = React.useState<CategoryType[]>([]);
	const isFocused = useIsFocused();

	useEffect(() => {
		const fetchCategories = async () => {
			const categoryResponse = await getCategories();
			if (categoryResponse) setCategories(categoryResponse);
		};
		void fetchCategories();
	}, [isFocused]);

	const renderItem: ListRenderItem<CategoryType> = ({ item: { name, count } }) => (
		<CategoryCard title={name} numberOfProducts={count ?? 0} />
	);
	return (
		<View style={styles.container}>
			<FlatList data={categories} renderItem={renderItem} keyExtractor={(item) => item.name} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'flex-start', padding: 20 },
});
export default CategoriesList;
