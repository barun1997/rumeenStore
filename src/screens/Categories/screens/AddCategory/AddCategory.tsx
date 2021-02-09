import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

function AddCategoryScreen(): JSX.Element {
	return (
		<View style={styles.container}>
			<TextInput style={styles.input} label="Category Name" value="New Category" />
			<Button mode="contained" style={{ width: '50%', alignSelf: 'center' }}>
				<Text>Add category</Text>
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'space-between', marginHorizontal: 30, marginVertical: 30 },
	input: { marginVertical: 15 },
});

export default AddCategoryScreen;
