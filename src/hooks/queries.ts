import { ReactNativeFirebase } from '@react-native-firebase/app';
import { QueryObserverResult, useQuery, UseQueryOptions } from 'react-query';
import { ORDERS_QUERY } from '../constants/queries';
import { OrderType } from '../interfaces/Order';
import { StoreContext } from '../interfaces/StoreSetting';
import { getOrders } from '../services/orderService';

export function useOrders<TData = OrderType[]>(
	context: StoreContext,
	options?: UseQueryOptions<OrderType[], ReactNativeFirebase.NativeFirebaseError, TData>,
): QueryObserverResult<TData, ReactNativeFirebase.NativeFirebaseError> {
	return useQuery(ORDERS_QUERY, () => getOrders(context), options);
}
