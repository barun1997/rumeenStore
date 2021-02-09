import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Avatar, Button, Text, TextInput, useTheme } from 'react-native-paper';
import {
	ImageLibraryOptions,
	ImagePickerResponse,
	launchImageLibrary,
} from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';

function AddProductScreen(): JSX.Element {
	const { colors } = useTheme();
	const [photo, setPhoto] = useState<ImagePickerResponse | null>(null);

	const handleChoosePhoto: () => void = () => {
		const options: ImageLibraryOptions = {
			mediaType: 'photo',
			maxHeight: 300,
			maxWidth: 300,
			quality: 1,
		};
		launchImageLibrary(options, (response) => {
			if (response.uri) {
				setPhoto(response);
			}
		});
	};

	return (
		<View style={styles.container}>
			<TouchableHighlight style={styles.imageInputView} onPress={() => handleChoosePhoto()}>
				<>
					{photo === null ? (
						<>
							<Avatar.Icon style={styles.imageInput} icon="upload" />
							<Text style={styles.imageInput}>Add product image</Text>
						</>
					) : (
						<>
							<Image style={styles.image} source={photo} />
							<Text style={styles.imageInput}>Choose a photo</Text>
						</>
					)}
				</>
			</TouchableHighlight>
			<View style={{ height: 400 }}>
				<TextInput style={styles.input} label="Product Name" value="Sausage" />
				<View style={styles.price}>
					<TextInput style={styles.priceField} label="Price" value="Sausage" />
					<Picker
						prompt="per kg"
						mode="dialog"
						style={styles.priceUnitContainer}
						itemStyle={styles.picker}
						selectedValue="kg">
						<Picker.Item label="per kg" value="kg"></Picker.Item>
						<Picker.Item label="per unit" value="unit"></Picker.Item>
					</Picker>
				</View>
				<TextInput style={styles.input} label="Description" value="Sausage" />
				<Picker
					itemStyle={styles.categoryPicker}
					prompt="Choose category"
					accessibilityLabel="Choose category"
					mode="dropdown"
					selectedValue="">
					<Picker.Item label="Choose Category" value=""></Picker.Item>
					<Picker.Item label="Food" value="food"></Picker.Item>
				</Picker>
			</View>
			<Button mode="contained" style={{ width: '50%', alignSelf: 'center' }}>
				<Text style={{ color: colors.onPrimary }}>Add Product</Text>
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', marginHorizontal: 30 },
	input: { marginVertical: 15 },
	imageInput: { marginVertical: 15 },
	imageInputView: { alignItems: 'center' },
	image: { height: 200, width: 200 },
	price: { marginVertical: 15, flexDirection: 'row', height: 75 },
	priceUnitContainer: { width: '35%' },
	priceField: { width: '65%' },
	picker: { height: '100%' },
	categoryPicker: { height: 75 },
});

export default AddProductScreen;
