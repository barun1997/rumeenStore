import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ListRenderItem, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import useStoreContext from '../../../../hooks/useStoreContext';
import { ProductType } from '../../../../interfaces/Product';
import { getProducts } from '../../../../services/productService';
import { ProductCard } from '../../components/ProductCard/ProductCard';

function ProductList(): JSX.Element {
	const [products, setProducts] = useState<ProductType[]>([]);
	const isFocused = useIsFocused();
	const storeContext = useStoreContext();

	useEffect(() => {
		async function fetchProducts() {
			const response = await getProducts(storeContext);
			if (!response) return;
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
			<FlatList
				initialNumToRender={7}
				data={products}
				renderItem={renderItem}
				keyExtractor={(item) => item.id as string}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: wp('5%') },
});

export default ProductList;
