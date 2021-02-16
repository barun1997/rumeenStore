import * as Yup from 'yup';

const CategorySchema = Yup.object().shape({
	name: Yup.string().required('Please enter category name'),
});

export default CategorySchema;
