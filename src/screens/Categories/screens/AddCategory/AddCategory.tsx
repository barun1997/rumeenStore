import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React from 'react';
import { CategoryType } from '../../../../interfaces/Category';
import CategorySchema from '../../../../schemas/Category';
import { addCategory } from '../../../../services/categoryService';
import CategoryForm from './components/CategoryForm';

const initialCategory: CategoryType = {
	name: '',
};
function AddCategoryScreen(): JSX.Element {
	const navigation = useNavigation();

	const handleSubmit = async (values: CategoryType) => {
		try {
			await addCategory(values);
			navigation.goBack();
		} catch (error) {
			console.log(error);
		}
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
