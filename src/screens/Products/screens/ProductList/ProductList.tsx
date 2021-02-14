import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ProductCard } from '../../components/ProductCard/ProductCard';

import { getProducts } from '../../../../services/productService';
import { ProductType } from '../../../../interfaces/Product';
import { useIsFocused } from '@react-navigation/native';

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
	return (
		<View style={styles.container}>
			{products.map(({ name, photo, price }) => (
				<ProductCard
					key={name}
					imageSource={photo as string}
					price={price.toString()}
					title={name}
					type="Listed Online"
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'flex-start', padding: 20 },
});

export default ProductList;
