import { ImagePickerResponse } from 'react-native-image-picker';

export interface ProductType {
	name: string;
	photo: ImagePickerResponse | null | string;
	price: number;
	description: string;
	category: string;
}
