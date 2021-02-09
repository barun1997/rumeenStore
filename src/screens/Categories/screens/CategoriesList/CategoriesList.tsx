import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CategoryCard } from '../../components/CategoryCard/CategoryCard';

function CategoriesList(): JSX.Element {
	return (
		<View style={styles.container}>
			<CategoryCard title="Meat Product" numberOfProducts={1} />
			<CategoryCard title="Fruit Product" numberOfProducts={1} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'flex-start', padding: 20 },
});
export default CategoriesList;
