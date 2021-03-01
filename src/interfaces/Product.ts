import { ImagePickerResponse } from 'react-native-image-picker';

export interface ProductType {
	id: string;
	name: string;
	photo: ImagePickerResponse | null | string;
	price: number;
	description: string;
	category: string;
	quantity?: number;
}
