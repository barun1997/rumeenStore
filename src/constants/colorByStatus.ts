import { Colors } from 'react-native-paper';
import OrderStatus from './orderStatus';

type colorByStatusType = {
	[key: string]: string;
};

const colorByStatus: colorByStatusType = {
	[OrderStatus.Pending]: Colors.amber600,
	[OrderStatus.Processing]: Colors.blue700,
	[OrderStatus.Finalized]: Colors.green400,
	[OrderStatus.Cancelled]: Colors.red500,
};
export default colorByStatus;
