import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { ProductType } from './Product';

export interface OrderType {
	id: string;
	from: string;
	location: string;
	status: number;
	total: number;
	products: ProductItemForOrder[];
}

export interface ProductItemForOrder {
	product: FirebaseFirestoreTypes.DocumentReference | ProductType;
	quantity: number;
}
