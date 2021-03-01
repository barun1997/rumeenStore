import { ReactNativeFirebase } from '@react-native-firebase/app';
import { QueryClient, useMutation, UseMutationResult } from 'react-query';
import {
	CATEGORIES_QUERY,
	ORDERS_QUERY,
	PRODUCTS_QUERY,
	SINGLE_ORDER_QUERY,
} from '../constants/queries';
import { CategoryType } from '../interfaces/Category';
import { OrderType } from '../interfaces/Order';
import { ProductType } from '../interfaces/Product';
import { StoreContext } from '../interfaces/StoreSetting';
import { addCategory, updateCategory } from '../services/categoryService';
import { updateOrder } from '../services/orderService';
import { addProduct } from '../services/productService';

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

export const useAddProductMutation = (
	storeContext: StoreContext,
	queryClient: QueryClient,
): UseMutationResult<ProductType, ReactNativeFirebase.NativeFirebaseError, ProductType, unknown> =>
	useMutation((newProduct: ProductType) => addProduct(storeContext, newProduct), {
		onSuccess: async () => {
			await queryClient.invalidateQueries(PRODUCTS_QUERY);
		},
	});

export const useAddCategoryMutation = (
	storeContext: StoreContext,
	queryClient: QueryClient,
): UseMutationResult<
	CategoryType,
	ReactNativeFirebase.NativeFirebaseError,
	CategoryType,
	unknown
> =>
	useMutation((newCategory: CategoryType) => addCategory(storeContext, newCategory), {
		onSuccess: async () => {
			await queryClient.invalidateQueries(CATEGORIES_QUERY);
		},
	});

export const useUpdateCategoryMutation = (
	storeContext: StoreContext,
	queryClient: QueryClient,
): UseMutationResult<
	CategoryType,
	ReactNativeFirebase.NativeFirebaseError,
	CategoryType,
	unknown
> =>
	useMutation((newCategory: CategoryType) => updateCategory(storeContext, newCategory), {
		onSuccess: async () => {
			await queryClient.invalidateQueries(CATEGORIES_QUERY);
		},
	});
