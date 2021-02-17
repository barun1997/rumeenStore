import OrderStatus from '../constants/orderStatus';

/* eslint-disable indent */
function statusToString(statusNumber: number): string {
	switch (statusNumber) {
		case OrderStatus.Pending:
			return 'Pending';
		case OrderStatus.Processing:
			return 'In process';
		case OrderStatus.Finalized:
			return 'Success';
		case OrderStatus.Cancelled:
			return 'Cancelled';
		default:
			return 'Unavailable';
	}
}

export default statusToString;
