import { ReactNativeFirebase } from '@react-native-firebase/app';
import { QueryObserverResult, useQuery, UseQueryOptions } from 'react-query';
import OrderStatus from '../constants/orderStatus';
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
import { getCategories, getCategoryById } from '../services/categoryService';
import { getOrders, getSingleOrder } from '../services/orderService';
import { getProductById, getProducts } from '../services/productService';
import { getStoreDetails } from '../services/storeService';
import { getStoreName } from '../services/userService';

export function useStorePref<TData = string | undefined>(
	phoneNumber: string,
	options?: UseQueryOptions<string | undefined, ReactNativeFirebase.NativeFirebaseError, TData>,
): QueryObserverResult<TData, ReactNativeFirebase.NativeFirebaseError> {
	return useQuery(
		[STORE_INFO_FOR_USER_QUERY, phoneNumber],
		() => getStoreName(phoneNumber),
		options,
	);
}

export function useStoreDetails<TData = StoreDetail>(
	context: StoreContext,
	options?: UseQueryOptions<StoreDetail, ReactNativeFirebase.NativeFirebaseError, TData>,
): QueryObserverResult<TData, ReactNativeFirebase.NativeFirebaseError> {
	return useQuery(STORE_DETAILS_QUERY, () => getStoreDetails(context), options);
}

export function useOrders<TData = OrderType[]>(
	context: StoreContext,
	status?: OrderStatus,
	options?: UseQueryOptions<OrderType[], ReactNativeFirebase.NativeFirebaseError, TData>,
): QueryObserverResult<TData, ReactNativeFirebase.NativeFirebaseError> {
	return useQuery([ORDERS_QUERY, status], () => getOrders(context, status), options);
}

export function useSingleOrder<TData = OrderType>(
	id: string,
	context: StoreContext,
	options?: UseQueryOptions<OrderType, ReactNativeFirebase.NativeFirebaseError, TData>,
): QueryObserverResult<TData, ReactNativeFirebase.NativeFirebaseError> {
	return useQuery([SINGLE_ORDER_QUERY, id], () => getSingleOrder(context, id), options);
}

export function useProducts<TData = ProductType[]>(
	context: StoreContext,
	options?: UseQueryOptions<ProductType[], ReactNativeFirebase.NativeFirebaseError, TData>,
): QueryObserverResult<TData, ReactNativeFirebase.NativeFirebaseError> {
	return useQuery(PRODUCTS_QUERY, () => getProducts(context), options);
}

export function useSingleProduct<TData = ProductType>(
	id: string,
	context: StoreContext,
	options?: UseQueryOptions<ProductType, ReactNativeFirebase.NativeFirebaseError, TData>,
): QueryObserverResult<TData, ReactNativeFirebase.NativeFirebaseError> {
	return useQuery([SINGLE_PRODUCT_QUERY, id], () => getProductById(id, context), options);
}

export function useCategories<TData = CategoryType[]>(
	context: StoreContext,
	options?: UseQueryOptions<CategoryType[], ReactNativeFirebase.NativeFirebaseError, TData>,
): QueryObserverResult<TData, ReactNativeFirebase.NativeFirebaseError> {
	return useQuery(CATEGORIES_QUERY, () => getCategories(context), options);
}

export function useSingleCategory<TData = CategoryType>(
	id: string,
	context: StoreContext,
	options?: UseQueryOptions<CategoryType, ReactNativeFirebase.NativeFirebaseError, TData>,
): QueryObserverResult<TData, ReactNativeFirebase.NativeFirebaseError> {
	return useQuery([SINGLE_CATEGORY_QUERY, id], () => getCategoryById(id, context), options);
}
