/* eslint-disable indent */
function statusToString(statusNumber: number): string {
	switch (statusNumber) {
		case 0:
			return 'Pending';
		case 1:
			return 'In process';
		case 2:
			return 'Success';
		default:
			return 'Unavailable';
	}
}

export default statusToString;
