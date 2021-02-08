import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Avatar, Text, TextInput } from 'react-native-paper';

function ProductsScreen(): JSX.Element {
	return (
		<View style={styles.container}>
			<TouchableHighlight
				style={styles.imageInput}
				onPress={() => console.log('image upload logic')}>
				<>
					<Avatar.Icon style={styles.input} icon="upload" />
					<Text>Add product image</Text>
				</>
			</TouchableHighlight>
			<View style={{ height: 400 }}>
				<TextInput style={styles.input} label="Product Name" value="Sausage" />
				<TextInput style={styles.input} label="Price" value="Sausage" />
				<TextInput style={styles.input} label="Description" value="Sausage" />
				<TextInput style={styles.input} label="Choose Category" value="Sausage" />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', marginHorizontal: 30 },
	input: { marginVertical: 15 },
	imageInput: { alignItems: 'center' },
});

export default ProductsScreen;
