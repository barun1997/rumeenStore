import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { ErrorHelperText } from '../../../../../../../components/ErrorHelperText/ErrorHelperText';
import FormProps from '../../../../../../../interfaces/FormProps';
import { StoreDetail } from '../../../../../../../interfaces/StoreDetail';

const StoreDetailForm: React.FC<FormProps<StoreDetail>> = ({
	handleSubmit,
	handleChange,
	isSubmitting,
	touched,
	errors,
	values: { location },
}) => {
	const colors = useTheme().colors;
	const styles = useStyles(colors);
	return (
		<View style={styles.container}>
			<View>
				<View style={styles.input}>
					<TextInput label="Location" value={location} onChangeText={handleChange('location')} />
				</View>
				<ErrorHelperText error={errors.location} touched={touched.location} />
			</View>
			<Button loading={isSubmitting} onPress={handleSubmit} mode="contained" style={styles.button}>
				<Text>Save changes</Text>
			</Button>
		</View>
	);
};

export default StoreDetailForm;

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
