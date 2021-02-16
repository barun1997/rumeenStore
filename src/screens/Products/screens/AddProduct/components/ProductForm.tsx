import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
	ImageLibraryOptions,
	ImagePickerResponse,
	launchImageLibrary,
} from 'react-native-image-picker';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { CategoryType } from '../../../../../interfaces/Category';
import FormProps from '../../../../../interfaces/FormProps';
import { ProductType } from '../../../../../interfaces/Product';
import { getCategories } from '../../../../../services/categoryService';
import placeholder from '../../../../../../static/placeholder.png';

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
					<Image
						style={styles.image}
						source={(photo as ImagePickerResponse) ?? (placeholder as ImageSourcePropType)}
					/>
					{errors.photo && touched.photo ? (
						<Text style={styles.error}>{errors.photo}</Text>
					) : (
						<Text>{photo ? 'Choose an image' : 'Add Product Image'}</Text>
					)}
				</>
			</TouchableHighlight>
			<View style={styles.inputForm}>
				<View style={styles.input}>
					<TextInput
						onChangeText={handleChange('name')}
						onBlur={handleBlur('name')}
						label="Product Name"
						value={name}
					/>
					{errors.name && touched.name ? <Text style={styles.error}>{errors.name}</Text> : null}
				</View>
				<View style={styles.priceInput}>
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
				<View style={styles.input}>
					<TextInput
						onChangeText={handleChange('description')}
						onBlur={handleBlur('description')}
						label="Description"
						value={description}
					/>
					{errors.description && touched.description ? (
						<Text style={styles.error}>{errors.description}</Text>
					) : null}
				</View>
				<View style={styles.input}>
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
			<View>
				<Button
					loading={isSubmitting}
					mode="contained"
					onPress={handleSubmit}
					style={styles.buttonContainer}>
					<Text style={styles.submitButton}>Add Product</Text>
				</Button>
			</View>
		</View>
	);
};

const useStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'space-around',
			padding: wp('5%'),
			backgroundColor: colors.surface,
		},
		imageInputView: { justifyContent: 'space-evenly', alignItems: 'center', height: hp('20%') },
		error: { marginHorizontal: wp('5%'), color: colors.error },
		image: { height: '80%', width: '80%' },
		inputForm: { height: hp('40%'), justifyContent: 'space-around' },
		input: { height: '17%' },
		priceInput: { flexDirection: 'row', height: '17%' },
		priceUnitContainer: { width: '35%' },
		priceField: { width: '65%' },
		picker: { height: '100%' },
		categoryPicker: { height: hp('5%') },
		buttonContainer: { width: '50%', alignSelf: 'center' },
		submitButton: { color: colors.onPrimary },
	});

export default ProductForm;
