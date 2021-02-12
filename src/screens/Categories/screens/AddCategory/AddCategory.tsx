import { Formik } from 'formik';
import React from 'react';
import AddCategoryForm from './components/AddCategoryForm';
import { addCategory } from '../../../../services/categoryService';
import { useNavigation } from '@react-navigation/native';
interface CategoryType {
	name: string;
}

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
				<AddCategoryForm
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
