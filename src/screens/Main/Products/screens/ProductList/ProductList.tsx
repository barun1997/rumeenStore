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

	const [visible, setVisible] = React.useState('');

	const openMenu = (id: string) => setVisible(id);

	const closeMenu = () => setVisible('');

	const renderItem: ListRenderItem<ProductType> = ({ item }) => (
		<ProductCard product={item} visible={visible} openMenu={openMenu} closeMenu={closeMenu} />
	);

	return (
		<View style={styles.container}>
			<FlatList
				initialNumToRender={7}
				data={products}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: wp('5%') },
});

export default ProductList;
