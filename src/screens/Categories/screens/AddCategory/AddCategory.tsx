import { Formik } from 'formik';
import React from 'react';
import CategoryForm from './components/CategoryForm';
import { addCategory } from '../../../../services/categoryService';
import { useNavigation } from '@react-navigation/native';
import { CategoryType } from '../../../../interfaces/Category';

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
		<Formik initialValues={initialCategory} onSubmit={handleSubmit}>
			{({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
				<CategoryForm
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

export default AddCategoryScreen;
