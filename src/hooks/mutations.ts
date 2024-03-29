import { ReactNativeFirebase } from '@react-native-firebase/app';
import { QueryClient, useMutation, UseMutationResult } from 'react-query';
import {
	CATEGORIES_QUERY,
	ORDERS_QUERY,
	PRODUCTS_QUERY,
	SINGLE_CATEGORY_QUERY,
	SINGLE_ORDER_QUERY,
	SINGLE_PRODUCT_QUERY,
	STORE_DETAILS_QUERY,
	STORE_INFO_FOR_USER_QUERY,
} from '../constants/queries';
import { CategoryType } from '../interfaces/Category';
import { OrderType } from '../interfaces/Order';
import { ProductType } from '../interfaces/Product';
import { StoreDetail } from '../interfaces/StoreDetail';
import { StoreContext } from '../interfaces/StoreSetting';
import { addCategory, deleteCategoryById, updateCategory } from '../services/categoryService';
import { updateOrder } from '../services/orderService';
import { addProduct, deleteProductById, updateProduct } from '../services/productService';
import { updateStoreDetails } from '../services/storeService';
import { setNewStore } from '../services/userService';

export const useInitializeStoreMutation = (
	queryClient: QueryClient,
	phoneNumber: string,
): UseMutationResult<StoreDetail, ReactNativeFirebase.NativeFirebaseError, StoreDetail, unknown> =>
	useMutation(
		({ location, storeName }: StoreDetail) => setNewStore(phoneNumber, { location, storeName }),
		{
			onSuccess: () => {
				void queryClient.invalidateQueries(STORE_INFO_FOR_USER_QUERY, {
					exact: true,
					refetchActive: false,
					refetchInactive: false,
				});
			},
		},
	);

export const useUpdateStoreInfoMutation = (
	storeContext: StoreContext,
	queryClient: QueryClient,
): UseMutationResult<StoreDetail, ReactNativeFirebase.NativeFirebaseError, StoreDetail, unknown> =>
	useMutation((newInfo: StoreDetail) => updateStoreDetails(storeContext, newInfo), {
		onSuccess: async () => {
			await queryClient.invalidateQueries(STORE_DETAILS_QUERY);
		},
	});

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

export const useUpdateProductMutation = (
	storeContext: StoreContext,
	queryClient: QueryClient,
	id: string,
): UseMutationResult<ProductType, ReactNativeFirebase.NativeFirebaseError, ProductType, unknown> =>
	useMutation((newProduct: ProductType) => updateProduct(storeContext, newProduct, id), {
		onSuccess: async () => {
			await queryClient.invalidateQueries(PRODUCTS_QUERY);
		},
	});

export const useDeleteProductMutation = (
	storeContext: StoreContext,
	queryClient: QueryClient,
): UseMutationResult<string, ReactNativeFirebase.NativeFirebaseError, string, unknown> =>
	useMutation((id: string) => deleteProductById(id, storeContext), {
		onSuccess: async (id: string) => {
			await queryClient.invalidateQueries(PRODUCTS_QUERY);
			await queryClient.invalidateQueries([SINGLE_PRODUCT_QUERY, id]);
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

export const useDeleteCategoryMutation = (
	storeContext: StoreContext,
	queryClient: QueryClient,
): UseMutationResult<string, ReactNativeFirebase.NativeFirebaseError, string, unknown> =>
	useMutation((id: string) => deleteCategoryById(id, storeContext), {
		onSuccess: async (id: string) => {
			await queryClient.invalidateQueries(CATEGORIES_QUERY);
			await queryClient.invalidateQueries([SINGLE_CATEGORY_QUERY, id]);
		},
	});
