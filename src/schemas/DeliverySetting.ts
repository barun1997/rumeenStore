import * as Yup from 'yup';

const DeliverySettingSchema = Yup.object().shape({
	chargePerOrder: Yup.number().required('Charge per order should be entered'),
	freeDeliveryAbove: Yup.number().required('Free Delivery above should be entered'),
});

export default DeliverySettingSchema;
