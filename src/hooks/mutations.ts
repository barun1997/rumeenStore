import { ReactNativeFirebase } from '@react-native-firebase/app';
import { QueryClient, useMutation, UseMutationResult } from 'react-query';
import { ORDERS_QUERY } from '../constants/queries';
import { OrderType } from '../interfaces/Order';
import { StoreContext } from '../interfaces/StoreSetting';
import { updateOrder } from '../services/orderService';

export const useUpdateOrderMutation = (
	storeContext: StoreContext,
	queryClient: QueryClient,
): UseMutationResult<OrderType, ReactNativeFirebase.NativeFirebaseError, OrderType, unknown> =>
	useMutation((newOrder: OrderType) => updateOrder(storeContext, newOrder), {
		onMutate: async (newOrder: OrderType) => {
			await queryClient.cancelQueries(ORDERS_QUERY);

			const previousOrders = queryClient.getQueryData<OrderType[]>(ORDERS_QUERY);

			if (!previousOrders) return;

			queryClient.setQueryData<OrderType[]>(
				ORDERS_QUERY,
				previousOrders.map((prevOrder) => {
					if (prevOrder.id === newOrder.id) return newOrder;
					return prevOrder;
				}),
			);

			return { previousOrders };
		},
		onError: (err, newToDo, context) => {
			if (context?.previousOrders)
				queryClient.setQueryData<OrderType[]>(ORDERS_QUERY, context.previousOrders);
		},
		onSettled: () => {
			console.log('hmm');
		},
	});
