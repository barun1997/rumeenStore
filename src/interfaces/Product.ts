import { ImageSourcePropType } from 'react-native';

export interface ProductType {
	name: string;
	photo: ImageSourcePropType | null;
	price: number;
	description: string;
	category: string;
}
