import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import React from 'react';
import { useQueryClient } from 'react-query';
import { useAddProductMutation, useUpdateProductMutation } from '../../../../../hooks/mutations';
import { useSingleProduct } from '../../../../../hooks/queries';
import useStoreContext from '../../../../../hooks/useStoreContext';
import { ProductType } from '../../../../../interfaces/Product';
import ProductSchema from '../../../../../schemas/Product';
import ProductForm from './components/ProductForm';

const initialProduct: ProductType = {
	id: '',
	name: '',
	photo: '',
	price: 0.0,
	description: '',
	category: '',
};

type ProductRouteProp = RouteProp<{ params: { id: string } }, 'params'>;

function AddProductScreen(): JSX.Element {
	const navigation = useNavigation();
	const storeContext = useStoreContext();
	const queryClient = useQueryClient();

	const { params } = useRoute<ProductRouteProp>();

	let initialValues = initialProduct;

	if (params?.id) {
		const { ...queryInfo } = useSingleProduct(params.id, storeContext);

		queryInfo.isSuccess ? (initialValues = queryInfo.data) : null;
	}

	const addProductMutation = useAddProductMutation(storeContext, queryClient);
	const updateProductMutation = useUpdateProductMutation(storeContext, queryClient);

	const handleSubmit = async (values: ProductType): Promise<void> => {
		/* 
		TODO: currently, the logic checks if photo is a string. Photo is
		a string only when it is already loaded from backend. I didn't want
		photo to be downloaded into the mobile so thought this would be
		a good way to do it. So, if the user changes photo, for example,
		by uploading a new photo, it changes the type from 'string' to
		ImagePicker response so we upload only when it's changed.
		
		The main purpose of this logic was to do two things: 

		1. Upload a new photo only when a new image is loaded. 
		2. Load an already uploaded image when editing. 


		Any better implementation of these two things is WELCOME! To future
		Barun and Anup, think of something better.
		*/

		if (params?.id) await updateProductMutation.mutateAsync({ ...values, id: params.id });
		else await addProductMutation.mutateAsync({ ...values, id: values.name });

		navigation.goBack();
	};
	return (
		<Formik
			initialValues={initialValues}
			enableReinitialize
			validationSchema={ProductSchema}
			onSubmit={handleSubmit}>
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
