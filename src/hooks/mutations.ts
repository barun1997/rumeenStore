import { ReactNativeFirebase } from '@react-native-firebase/app';
import { QueryClient, useMutation, UseMutationResult } from 'react-query';
import { ORDERS_QUERY, SINGLE_ORDER_QUERY } from '../constants/queries';
import { OrderType } from '../interfaces/Order';
import { StoreContext } from '../interfaces/StoreSetting';
import { updateOrder } from '../services/orderService';

export const useUpdateOrderMutation = (
	storeContext: StoreContext,
	queryClient: QueryClient,
): UseMutationResult<OrderType, ReactNativeFirebase.NativeFirebaseError, OrderType, unknown> =>
	useMutation((newOrder: OrderType) => updateOrder(storeContext, newOrder), {
		onSuccess: async (_, variables) => {
			await queryClient.invalidateQueries(ORDERS_QUERY);
			await queryClient.invalidateQueries([SINGLE_ORDER_QUERY, variables.id]);
		},
	});
