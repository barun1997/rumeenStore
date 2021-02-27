import React from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useProducts } from '../../../../../hooks/queries';
import useStoreContext from '../../../../../hooks/useStoreContext';
import { ProductType } from '../../../../../interfaces/Product';
import { ProductCard } from '../../components/ProductCard/ProductCard';

function ProductList(): JSX.Element {
	const storeContext = useStoreContext();

	const { ...queryInfo } = useProducts(storeContext);

	const products = queryInfo.isSuccess ? queryInfo.data : [];

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
