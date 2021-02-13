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
import { getCategories } from '../../../../../services/categoryService';

interface ProductFormProps {
	handleBlur: {
		(e: React.FocusEvent<never>): void;
		<T = unknown>(fieldOrEvent: T): T extends string ? (e: unknown) => void : void;
	};
	handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
	handleChange: {
		(e: React.ChangeEvent<unknown>): void;
		<T = string | React.ChangeEvent<unknown>>(field: T): T extends React.ChangeEvent<unknown>
			? void
			: (e: string | React.ChangeEvent<unknown>) => void;
	};
	setFieldValue: (field: string, value: unknown, shouldValidate?: boolean | undefined) => void;
	photo: ImagePickerResponse | null;
	name: string;
	category: string;
	description: string;
	price: number;
}

const ProductForm: React.FC<ProductFormProps> = ({
	handleBlur,
	handleChange,
	handleSubmit,
	photo,
	name,
	description,
	category,
	price,
	setFieldValue,
}) => {
	const { colors } = useTheme();

	const handleChoosePhoto: () => void = () => {
		const options: ImageLibraryOptions = {
			mediaType: 'photo',
			maxHeight: 300,
			maxWidth: 300,
			quality: 1,
		};
		launchImageLibrary(options, (response) => {
			if (response.uri) {
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
							<Image style={styles.image} source={photo} />
							<Text style={styles.imageInput}>Choose a photo</Text>
						</>
					)}
				</>
			</TouchableHighlight>
			<View style={{ height: 400 }}>
				<TextInput
					style={styles.input}
					onChangeText={handleChange('name')}
					onBlur={handleBlur('name')}
					label="Product Name"
					value={name}
				/>
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
				</View>
				<TextInput
					onChangeText={handleChange('description')}
					onBlur={handleBlur('description')}
					style={styles.input}
					label="Description"
					value={description}
				/>
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
			</View>
			<Button mode="contained" onPress={handleSubmit} style={{ width: '50%', alignSelf: 'center' }}>
				<Text style={{ color: colors.onPrimary }}>Add Product</Text>
			</Button>
		</View>
	);
};

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

export default ProductForm;
