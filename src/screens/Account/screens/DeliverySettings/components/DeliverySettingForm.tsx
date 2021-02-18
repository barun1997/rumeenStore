import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { ErrorHelperText } from '../../../../../components/ErrorHelperText/ErrorHelperText';
import { FormikNumInput } from '../../../../../components/FormikNumInput/FormikNumInput';
import { DeliverySetting } from '../../../../../interfaces/DeliverySetting';
import FormProps from '../../../../../interfaces/FormProps';

const DeliverySettingForm: React.FC<FormProps<DeliverySetting>> = ({
	handleBlur,
	handleSubmit,
	setFieldValue,
	isSubmitting,
	touched,
	errors,
	values: { chargePerOrder, freeDeliveryAbove },
}) => {
	const colors = useTheme().colors;
	const styles = useStyles(colors);
	return (
		<View style={styles.container}>
			<View>
				<View style={styles.input}>
					<FormikNumInput
						handleBlur={handleBlur}
						label="Charge per Order"
						setFieldValue={setFieldValue}
						value={chargePerOrder}
						inputKey="chargePerOrder"
					/>
					<ErrorHelperText error={errors.chargePerOrder} touched={touched.chargePerOrder} />
				</View>
				<View style={styles.input}>
					<FormikNumInput
						handleBlur={handleBlur}
						label="Free Delivery Above"
						setFieldValue={setFieldValue}
						value={freeDeliveryAbove}
						inputKey="freeDeliveryAbove"
					/>
				</View>
				<ErrorHelperText error={errors.freeDeliveryAbove} touched={touched.freeDeliveryAbove} />
			</View>
			<Button loading={isSubmitting} onPress={handleSubmit} mode="contained" style={styles.button}>
				<Text>Save changes</Text>
			</Button>
		</View>
	);
};

export default DeliverySettingForm;

const useStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.surface,
			padding: widthPercentageToDP('5%'),
			justifyContent: 'space-between',
		},
		input: {
			marginVertical: heightPercentageToDP('1%'),
		},
		error: { marginHorizontal: '2%', color: colors.error },
		button: { width: '50%', alignSelf: 'center' },
	});
