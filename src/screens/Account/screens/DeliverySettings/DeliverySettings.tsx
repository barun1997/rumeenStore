import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import useStoreContext from '../../../../hooks/useStoreContext';
import { DeliverySetting } from '../../../../interfaces/DeliverySetting';
import DeliverySettingSchema from '../../../../schemas/DeliverySetting';
import {
	getCurrentDeliverySetting,
	updateDeliverySetting,
} from '../../../../services/deliverySettingService';
import DeliverySettingForm from './components/DeliverySettingForm';

function DeliverySettingScreen(): JSX.Element {
	const [initialDeliverySetting, setInitialDeliverySetting] = useState<DeliverySetting>({
		chargePerOrder: 0,
		freeDeliveryAbove: 0,
	});
	const navigation = useNavigation();
	const storeContext = useStoreContext();

	useEffect(() => {
		const fetchCurrentDeliverySetting = async () => {
			const response = await getCurrentDeliverySetting(storeContext);

			if (response) {
				setInitialDeliverySetting(response);
			}
		};
		void fetchCurrentDeliverySetting();
	}, []);

	const handleSubmit = async (values: DeliverySetting) => {
		try {
			await updateDeliverySetting(storeContext, values);
			navigation.goBack();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Formik
			enableReinitialize
			initialValues={initialDeliverySetting}
			validationSchema={DeliverySettingSchema}
			onSubmit={handleSubmit}>
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
				<DeliverySettingForm
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
}

export default DeliverySettingScreen;
