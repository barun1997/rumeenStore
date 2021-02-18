import { DeliverySetting } from '../interfaces/DeliverySetting';
import { StoreContext } from '../interfaces/StoreSetting';

const updateDeliverySetting = async (
	{ storeDocInstance }: StoreContext,
	deliverySetting: DeliverySetting,
): Promise<DeliverySetting | Error> => {
	try {
		await storeDocInstance?.update({
			delivery: deliverySetting,
		});
		return deliverySetting;
	} catch (error) {
		console.log(error);
		return Error('Error has occured. TODO');
	}
};

const getCurrentDeliverySetting = async ({
	storeDocInstance,
}: StoreContext): Promise<DeliverySetting | undefined> => {
	try {
		const response = (await storeDocInstance?.get())?.data();

		if (response?.delivery) {
			return response.delivery as DeliverySetting;
		}
		return;
	} catch (error) {
		console.log(error);
		return;
	}
};

export { updateDeliverySetting, getCurrentDeliverySetting };
