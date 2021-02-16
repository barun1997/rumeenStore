import * as Yup from 'yup';

const ProductSchema = Yup.object().shape({
	name: Yup.string().required('Please enter product name'),
	description: Yup.string()
		.required('Please enter your product description')
		.min(10, 'Minimum length of description should be 20'),
	price: Yup.number().required('Please enter the price'),
	category: Yup.string().required('You must choose a category'),
});

export default ProductSchema;
