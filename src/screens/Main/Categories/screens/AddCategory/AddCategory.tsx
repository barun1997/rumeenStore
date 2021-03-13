import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useContext } from 'react';
import { useQueryClient } from 'react-query';
import StoreSettingsContext from '../../../../../contexts/StoreSettingsContext';
import { useAddCategoryMutation, useUpdateCategoryMutation } from '../../../../../hooks/mutations';
import { useSingleCategory } from '../../../../../hooks/queries';
import { CategoryType } from '../../../../../interfaces/Category';
import CategorySchema from '../../../../../schemas/Category';
import CategoryForm from './components/CategoryForm';

const initialCategory: CategoryType = {
	name: '',
	id: '',
};

type CategoryRouteProp = RouteProp<{ params: { id: string } }, 'params'>;

function AddCategoryScreen(): JSX.Element {
	const navigation = useNavigation();
	const queryClient = useQueryClient();
	const { params } = useRoute<CategoryRouteProp>();

	const storeContext = useContext(StoreSettingsContext);

	let initialValues = initialCategory;

	if (params?.id) {
		const { ...queryInfo } = useSingleCategory(params.id, storeContext);

		queryInfo.isSuccess ? (initialValues = queryInfo.data) : null;
	}

	const addCategoryMutation = useAddCategoryMutation(storeContext, queryClient);

	const updateCategoryMutation = useUpdateCategoryMutation(storeContext, queryClient);

	const handleSubmit = async (values: CategoryType) => {
		if (params?.id) await updateCategoryMutation.mutateAsync({ ...values, id: params.id });
		else await addCategoryMutation.mutateAsync(values);
		navigation.goBack();
	};

	return (
		<Formik
			initialValues={initialValues}
			enableReinitialize
			validationSchema={CategorySchema}
			onSubmit={handleSubmit}>
			{({
				handleChange,
				handleBlur,
				handleSubmit,
				values,
				errors,
				touched,
				setFieldValue,
				isSubmitting,
			}) => (
				<CategoryForm
					values={values}
					errors={errors}
					touched={touched}
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

export default AddCategoryScreen;
