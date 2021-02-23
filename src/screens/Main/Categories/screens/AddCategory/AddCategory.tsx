import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useContext } from 'react';
import StoreSettingsContext from '../../../../../contexts/StoreSettingsContext';
import { CategoryType } from '../../../../../interfaces/Category';
import CategorySchema from '../../../../../schemas/Category';
import { addCategory } from '../../../../../services/categoryService';
import CategoryForm from './components/CategoryForm';

const initialCategory: CategoryType = {
	name: '',
};
function AddCategoryScreen(): JSX.Element {
	const navigation = useNavigation();

	const storeContext = useContext(StoreSettingsContext);

	const handleSubmit = async (values: CategoryType) => {
		try {
			if (!storeContext) return;
			await addCategory(storeContext, values);
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
