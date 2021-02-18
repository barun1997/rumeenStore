import { useContext } from 'react';
import StoreSettingsContext from '../contexts/StoreSettingsContext';
import { StoreContext } from '../interfaces/StoreSetting';

const useStoreContext = (): StoreContext => useContext(StoreSettingsContext);

export default useStoreContext;
