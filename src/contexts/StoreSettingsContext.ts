import { createContext } from 'react';
import { StoreContext } from '../interfaces/StoreSetting';

const StoreSettingsContext = createContext<StoreContext>({
	storeDocInstance: null,
	storeName: null,
});

export default StoreSettingsContext;
