import { Colors } from 'react-native-paper';

type colorByStatusType = {
	[key: string]: string;
};

const colorByStatus: colorByStatusType = {
	0: Colors.amber600,
	1: Colors.blue700,
	2: Colors.green400,
};
export default colorByStatus;
