import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React from 'react';
import { useQueryClient } from 'react-query';
import { useUpdateStoreInfoMutation } from '../../../../../hooks/mutations';
import { useStoreDetails } from '../../../../../hooks/queries';
import useStoreContext from '../../../../../hooks/useStoreContext';
import { StoreDetail } from '../../../../../interfaces/StoreDetail';
import StoreDetailForm from './components/StoreDetailForm/StoreDetailForm';

const initialStore: StoreDetail = {
	location: '',
	storeName: '',
};

export const EditStoreDetails: React.FC<Record<string, never>> = () => {
	const navigation = useNavigation();
	const storeContext = useStoreContext();
	const queryClient = useQueryClient();
	const storeUpdateMutation = useUpdateStoreInfoMutation(storeContext, queryClient);

	const { ...queryInfo } = useStoreDetails(storeContext);

	let initialValue = initialStore;

	queryInfo.isSuccess ? (initialValue = queryInfo.data) : null;

	const handleSubmit = async (values: StoreDetail) => {
		await storeUpdateMutation.mutateAsync(values);
		navigation.goBack();
	};

	return (
		<Formik enableReinitialize initialValues={initialValue} onSubmit={handleSubmit}>
			{({
				handleChange,
				handleBlur,
				handleSubmit,
				values,
				errors,
				touched,
				setFieldValue,
				isSubmitting,
			}) => (
				<StoreDetailForm
					values={values}
					errors={errors}
					touched={touched}
					handleChange={handleChange}
					handleBlur={handleBlur}
					isSubmitting={isSubmitting}
					setFieldValue={setFieldValue}
					handleSubmit={handleSubmit}
				/>
			)}
		</Formik>
	);
};
