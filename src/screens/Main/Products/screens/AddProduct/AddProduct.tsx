import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import React from 'react';
import { ImagePickerResponse } from 'react-native-image-picker';
import { useQueryClient } from 'react-query';
import { useAddProductMutation, useUpdateProductMutation } from '../../../../../hooks/mutations';
import { useSingleProduct } from '../../../../../hooks/queries';
import useStoreContext from '../../../../../hooks/useStoreContext';
import { ProductType } from '../../../../../interfaces/Product';
import ProductSchema from '../../../../../schemas/Product';
import { uploadCoverImage } from '../../../../../services/imageService';
import ProductForm from './components/ProductForm';

const initialProduct: ProductType = {
	id: '',
	name: '',
	photo: null,
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
		const { photo } = values;

		const image = await uploadCoverImage(storeContext, photo as ImagePickerResponse);

		if (!image?.downloadUrl) return;

		const productToBeUploaded: ProductType = { ...values, photo: image?.downloadUrl };

		if (params?.id)
			await updateProductMutation.mutateAsync({ ...productToBeUploaded, id: params.id });
		else await addProductMutation.mutateAsync(productToBeUploaded);

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
