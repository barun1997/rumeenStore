import { ReactNativeFirebase } from '@react-native-firebase/app';
import { QueryObserverResult, useQuery, UseQueryOptions } from 'react-query';
import OrderStatus from '../constants/orderStatus';
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
import { getCategories } from '../services/categoryService';
import { getOrders, getSingleOrder } from '../services/orderService';
import { getProducts } from '../services/productService';

export function useOrders<TData = OrderType[]>(
	context: StoreContext,
	status: OrderStatus,
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

// export function useSingleProduct<TData = ProductType>(
// 	id: string,
// 	context: StoreContext,
// 	options?: UseQueryOptions<ProductType, ReactNativeFirebase.NativeFirebaseError, TData>,
// ): QueryObserverResult<TData, ReactNativeFirebase.NativeFirebaseError> {
// 	return useQuery([SINGLE_PRODUCT_QUERY, id], () => getSingleProduct(context, id), options);
// }

export function useCategories<TData = CategoryType[]>(
	context: StoreContext,
	options?: UseQueryOptions<CategoryType[], ReactNativeFirebase.NativeFirebaseError, TData>,
): QueryObserverResult<TData, ReactNativeFirebase.NativeFirebaseError> {
	return useQuery(CATEGORIES_QUERY, () => getCategories(context), options);
}

// export function useSingleCategory<TData = CategoryType>(
// 	id: string,
// 	context: StoreContext,
// 	options?: UseQueryOptions<CategoryType, ReactNativeFirebase.NativeFirebaseError, TData>,
// ): QueryObserverResult<TData, ReactNativeFirebase.NativeFirebaseError> {
// 	return useQuery([SINGLE_CATEGORY_QUERY, id], () => getSingleCategory(context, id), options);
// }
