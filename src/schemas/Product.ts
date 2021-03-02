import * as Yup from 'yup';
import SUPPORTED_FORMATS from '../constants/supportedFormats';

const ProductSchema = Yup.object().shape({
	name: Yup.string().required('Please enter product name'),
	description: Yup.string()
		.required('Please enter your product description')
		.min(10, 'Minimum length of description should be 20'),
	price: Yup.number().required('Please enter the price'),
	category: Yup.string().required('You must choose a category'),
	photo: Yup.mixed()
		.required('An image is required')
		.test('fileFormat', 'Unsupported format', (value: { type: string } | string) => {
			if (!value) return false;
			if (typeof value === 'string') return true;
			return SUPPORTED_FORMATS.includes(value.type);
		}),
});

export default ProductSchema;
