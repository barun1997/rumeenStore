import React, { useEffect, useState } from 'react';
import { ListRenderItem, StyleSheet, View } from 'react-native';
import { ProductCard } from '../../components/ProductCard/ProductCard';

import { getProducts } from '../../../../services/productService';
import { ProductType } from '../../../../interfaces/Product';
import { useIsFocused } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

function ProductList(): JSX.Element {
	const [products, setProducts] = useState<ProductType[]>([]);
	const isFocused = useIsFocused();

	useEffect(() => {
		async function fetchProducts() {
			const response = await getProducts();

			setProducts(response);
		}
		void fetchProducts();
	}, [isFocused]);

	const renderItem: ListRenderItem<ProductType> = ({ item: { name, photo, price } }) => (
		<ProductCard
			key={name}
			imageSource={photo as string}
			price={price.toString()}
			title={name}
			type="Listed Online"
		/>
	);

	return (
		<View style={styles.container}>
			<FlatList data={products} renderItem={renderItem} keyExtractor={(item) => item.name} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'flex-start', padding: 20 },
});

export default ProductList;
