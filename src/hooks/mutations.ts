import { ReactNativeFirebase } from '@react-native-firebase/app';
import { QueryClient, useMutation, UseMutationResult } from 'react-query';
import {
	CATEGORIES_QUERY,
	ORDERS_QUERY,
	PRODUCTS_QUERY,
	SINGLE_CATEGORY_QUERY,
	SINGLE_ORDER_QUERY,
	SINGLE_PRODUCT_QUERY,
} from '../constants/queries';
import { CategoryType } from '../interfaces/Category';
import { OrderType } from '../interfaces/Order';
import { ProductType } from '../interfaces/Product';
import { StoreContext } from '../interfaces/StoreSetting';
import { addCategory, deleteCategoryById, updateCategory } from '../services/categoryService';
import { updateOrder } from '../services/orderService';
import { addProduct, deleteProductById, updateProduct } from '../services/productService';

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
): UseMutationResult<ProductType, ReactNativeFirebase.NativeFirebaseError, ProductType, unknown> =>
	useMutation((newProduct: ProductType) => updateProduct(storeContext, newProduct), {
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
