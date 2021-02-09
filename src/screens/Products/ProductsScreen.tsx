import React from 'react';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import { ProductCard } from './components/ProductCard/ProductCard';

import sausage from '../../../static/sausage.jpg';
import kiwi from '../../../static/kiwi.jpg';

function ProductsScreen(): JSX.Element {
	return (
		<View style={styles.container}>
			<ProductCard
				imageSource={sausage as ImageSourcePropType}
				productPrice="70"
				productTitle="Sausage"
				productType="Listed Online"
			/>
			<ProductCard
				imageSource={kiwi as ImageSourcePropType}
				productPrice="100"
				productTitle="Kiwi"
				productType="Listed Online"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'flex-start', padding: 20 },
});

export default ProductsScreen;
