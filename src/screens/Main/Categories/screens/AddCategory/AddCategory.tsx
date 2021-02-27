import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useContext } from 'react';
import { useQueryClient } from 'react-query';
import StoreSettingsContext from '../../../../../contexts/StoreSettingsContext';
import { useAddCategoryMutation } from '../../../../../hooks/mutations';
import { CategoryType } from '../../../../../interfaces/Category';
import CategorySchema from '../../../../../schemas/Category';
import CategoryForm from './components/CategoryForm';

const initialCategory: CategoryType = {
	name: '',
};
function AddCategoryScreen(): JSX.Element {
	const navigation = useNavigation();
	const queryClient = useQueryClient();

	const storeContext = useContext(StoreSettingsContext);

	const mutation = useAddCategoryMutation(storeContext, queryClient);

	const handleSubmit = async (values: CategoryType) => {
		await mutation.mutateAsync(values);
		navigation.goBack();
	};

	return (
		<Formik
			initialValues={initialCategory}
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
