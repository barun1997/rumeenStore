import { StoreDetail } from '../interfaces/StoreDetail';
import { StoreContext } from '../interfaces/StoreSetting';

const getStoreDetails = async ({ storeDocInstance }: StoreContext): Promise<StoreDetail> => {
	if (!storeDocInstance) throw Error('Store is not present');

	const result = await storeDocInstance.get();

	const storeDetails = {
		storeName: result.data()?.name as string,
		location: result?.data()?.location as string,
	} as StoreDetail;

	return storeDetails;
};

const updateStoreDetails = async (
	{ storeDocInstance }: StoreContext,
	storeInfo: StoreDetail,
): Promise<StoreDetail> => {
	if (!storeDocInstance) throw Error('Store is not present');

	await storeDocInstance.update({
		location: storeInfo.location,
	});

	return storeInfo;
};

export { getStoreDetails, updateStoreDetails };
