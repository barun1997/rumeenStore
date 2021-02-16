import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {
	ImageLibraryOptions,
	ImagePickerResponse,
	launchImageLibrary,
} from 'react-native-image-picker';
import { Avatar, Button, TextInput, useTheme } from 'react-native-paper';
import { CategoryType } from '../../../../../interfaces/Category';
import FormProps from '../../../../../interfaces/FormProps';
import { ProductType } from '../../../../../interfaces/Product';
import { getCategories } from '../../../../../services/categoryService';

const ProductForm: React.FC<FormProps<ProductType>> = ({
	handleBlur,
	handleChange,
	handleSubmit,
	values,
	isSubmitting,
	errors,
	touched,
	setFieldValue,
}) => {
	const { colors } = useTheme();
	const styles = useStyles(colors);
	const { photo, name, description, category, price } = values;

	const handleChoosePhoto: () => void = () => {
		const options: ImageLibraryOptions = {
			mediaType: 'photo',
			maxHeight: 300,
			maxWidth: 300,
			quality: 1,
		};
		launchImageLibrary(options, (response) => {
			if (response.uri) {
				console.log(response.uri);

				setFieldValue('photo', response);
			}
		});
	};

	const [categories, setCategories] = useState<CategoryType[]>([]);

	useEffect(() => {
		async function fetchCategories() {
			const categories = await getCategories();
			if (!categories) return;
			setCategories(categories);
		}
		void fetchCategories();
	}, []);

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
							<Image style={styles.image} source={photo as ImagePickerResponse} />
							<Text style={styles.imageInput}>Choose a photo</Text>
						</>
					)}
				</>
			</TouchableHighlight>
			<View style={{ height: 400 }}>
				<View>
					<TextInput
						style={styles.input}
						onChangeText={handleChange('name')}
						onBlur={handleBlur('name')}
						label="Product Name"
						value={name}
					/>
					{errors.name && touched.name ? <Text style={styles.error}>{errors.name}</Text> : null}
				</View>
				<View style={styles.price}>
					<TextInput
						style={styles.priceField}
						keyboardType="numeric"
						label="Price"
						value={price.toString()}
						onChangeText={(price) => setFieldValue('price', parseFloat(price))}
						onBlur={handleBlur('price')}
					/>
					<Picker
						prompt="per kg"
						mode="dialog"
						style={styles.priceUnitContainer}
						itemStyle={styles.picker}
						selectedValue="kg">
						<Picker.Item label="per kg" value="kg"></Picker.Item>
						<Picker.Item label="per unit" value="unit"></Picker.Item>
					</Picker>
					{errors.price && touched.price ? <Text style={styles.error}>{errors.price}</Text> : null}
				</View>
				<View>
					<TextInput
						onChangeText={handleChange('description')}
						onBlur={handleBlur('description')}
						style={styles.input}
						label="Description"
						value={description}
					/>
					{errors.description && touched.description ? (
						<Text style={styles.error}>{errors.description}</Text>
					) : null}
				</View>
				<View>
					<Picker
						itemStyle={styles.categoryPicker}
						prompt="Choose category"
						accessibilityLabel="Choose category"
						mode="dropdown"
						onValueChange={(category) => setFieldValue('category', category)}
						selectedValue={category}>
						<Picker.Item label="Choose Category" value="" />
						{categories.map((category) => (
							<Picker.Item key={category.name} label={category.name} value={category.name} />
						))}
					</Picker>
					{errors.category && touched.category ? (
						<Text style={styles.error}>{errors.category}</Text>
					) : null}
				</View>
			</View>
			<Button
				loading={isSubmitting}
				mode="contained"
				onPress={handleSubmit}
				style={styles.buttonContainer}>
				<Text style={styles.submitButton}>Add Product</Text>
			</Button>
		</View>
	);
};

const useStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		container: { flex: 1, justifyContent: 'center', marginHorizontal: 30 },
		input: { marginVertical: 15 },
		imageInput: { marginVertical: 15 },
		error: { marginHorizontal: 10, color: colors.error },
		imageInputView: { alignItems: 'center' },
		image: { height: 200, width: 200 },
		price: { marginVertical: 15, flexDirection: 'row', height: 75 },
		priceUnitContainer: { width: '35%' },
		priceField: { width: '65%' },
		picker: { height: '100%' },
		categoryPicker: { height: 75 },
		buttonContainer: { width: '50%', alignSelf: 'center' },
		submitButton: { color: colors.onPrimary },
	});

export default ProductForm;
