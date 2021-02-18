import { Formik } from 'formik';
import React from 'react';
import { DeliverySetting } from '../../../../interfaces/DeliverySetting';
import DeliverySettingForm from './components/DeliverySettingForm';

const initialDeliverySetting: DeliverySetting = {
	chargePerOrder: 0,
	freeDeliveryAbove: 0,
};
function DeliverySettingScreen(): JSX.Element {
	const handleSubmit = (values: DeliverySetting) => {
		console.log(values);
	};

	return (
		<Formik initialValues={initialDeliverySetting} onSubmit={handleSubmit}>
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
