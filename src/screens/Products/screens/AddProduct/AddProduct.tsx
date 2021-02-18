import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React from 'react';
import { ImagePickerResponse } from 'react-native-image-picker';
import useStoreContext from '../../../../hooks/useStoreContext';
import { ProductType } from '../../../../interfaces/Product';
import ProductSchema from '../../../../schemas/Product';
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
	const storeContext = useStoreContext();

	const handleSubmit = async (values: ProductType): Promise<void> => {
		try {
			console.log(values);
			const { photo } = values;

			if (!photo) return;

			const image = await uploadCoverImage(storeContext, photo as ImagePickerResponse);

			if (!image?.downloadUrl) return;

			const productToBeUploaded: ProductType = { ...values, photo: image?.downloadUrl };

			await addProduct(storeContext, productToBeUploaded);
			navigation.goBack();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Formik initialValues={initialProduct} validationSchema={ProductSchema} onSubmit={handleSubmit}>
			{({
				handleChange,
				handleBlur,
				handleSubmit,
				isSubmitting,
				values,
				setFieldValue,
				errors,
				touched,
			}) => (
				<ProductForm
					errors={errors}
					touched={touched}
					values={values}
					handleChange={handleChange}
					handleBlur={handleBlur}
					isSubmitting={isSubmitting}
					setFieldValue={setFieldValue}
					handleSubmit={handleSubmit}
				/>
			)}
		</Formik>
	);
}

export default AddProductScreen;
