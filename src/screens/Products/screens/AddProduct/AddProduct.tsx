import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React from 'react';
import { ImagePickerResponse } from 'react-native-image-picker';
import { ProductType } from '../../../../interfaces/Product';
import { uploadCoverImage } from '../../../../services/imageService';
import { addProduct } from '../../../../services/productService';
import ProductForm from './components/ProductForm';

const initialProduct: ProductType = {
	name: '',
	photo: null,
	price: 0.0,
	description: '',
	category: '',
};

function AddProductScreen(): JSX.Element {
	const navigation = useNavigation();

	const handleSubmit = async (values: ProductType): Promise<void> => {
		try {
			const { photo } = values;

			if (!photo) return;

			const image = await uploadCoverImage(photo as ImagePickerResponse);

			if (!image?.downloadUrl) return;

			const productToBeUploaded: ProductType = { ...values, photo: image?.downloadUrl };

			await addProduct(productToBeUploaded);
			navigation.goBack();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Formik initialValues={initialProduct} onSubmit={handleSubmit}>
			{({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
				<ProductForm
					product={values}
					handleChange={handleChange}
					handleBlur={handleBlur}
					setFieldValue={setFieldValue}
					handleSubmit={handleSubmit}
				/>
			)}
		</Formik>
	);
}

export default AddProductScreen;
