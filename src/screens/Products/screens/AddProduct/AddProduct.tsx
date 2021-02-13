import { Formik } from 'formik';
import React from 'react';
import { ImagePickerResponse } from 'react-native-image-picker';
import ProductForm from './components/ProductForm';

const initialProduct = {
	name: '',
	photo: null as ImagePickerResponse | null,
	price: 0.0,
	description: '',
	category: '',
};

function AddProductScreen(): JSX.Element {
	return (
		<Formik initialValues={initialProduct} onSubmit={(values) => console.log(values)}>
			{({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
				<ProductForm
					{...values}
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
