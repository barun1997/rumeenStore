import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, Subheading, TextInput } from 'react-native-paper';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputMask, { TextInputMaskProps } from 'react-native-text-input-mask';
import * as yup from 'yup';
import InputCodeField from './components/InputCodeField/CodeField';
const initialState = {
	mobileNumber: '',
};

const initialCodeState = {
	codeField: '',
};

export const userMobileSchema = yup.object().shape({
	mobileNumber: yup
		.string()
		.required('Enter your mobile number')
		.matches(/^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/, 'Invalid Phone Number'),
});

const Login = (): JSX.Element => {
	const [confirmation, setConfirmation] = useState<FirebaseAuthTypes.ConfirmationResult | null>(
		null,
	);

	const handleSubmit = async (values: typeof initialState) => {
		const confirmation = await auth().signInWithPhoneNumber(values.mobileNumber);

		setConfirmation(confirmation);
	};

	const confirmCode = async (code: string) => {
		await confirmation?.confirm(code);
	};

	if (confirmation) {
		return (
			<SafeAreaView>
				<Formik
					initialValues={initialCodeState}
					onSubmit={(values) => confirmCode(values.codeField)}>
					{(formikProps) => (
						<View style={styles.loginContainer}>
							<View
								style={{
									width: '100%',
									alignItems: 'center',
									height: heightPercentageToDP('40%'),
								}}>
								<InputCodeField
									value={formikProps.values.codeField}
									setValue={formikProps.handleChange('codeField')}
								/>
							</View>
							<Button
								icon="arrow-right-circle-outline"
								mode="outlined"
								accessibilityLabel="Submit"
								onPress={formikProps.handleSubmit}
								loading={formikProps.isSubmitting}>
								Submit
							</Button>
						</View>
					)}
				</Formik>
			</SafeAreaView>
		);
	} else {
		return (
			<SafeAreaView>
				<Formik
					initialValues={initialState}
					validationSchema={userMobileSchema}
					onSubmit={(values) => handleSubmit(values)}>
					{(formikProps) => (
						<View style={styles.loginContainer}>
							<View style={{ width: '100%', alignItems: 'center' }}>
								<Subheading style={{ marginBottom: '5%' }}>Enter your phone number</Subheading>
								<TextInput
									mode="outlined"
									textAlign="center"
									style={styles.input}
									render={(props) => (
										<TextInputMask
											{...(props as TextInputMaskProps)}
											mask={'+977[0000][000][000]'}
										/>
									)}
									label="Mobile Number"
									textContentType="telephoneNumber"
									value={formikProps.values.mobileNumber}
									onBlur={formikProps.handleBlur('mobileNumber')}
									onChangeText={formikProps.handleChange('mobileNumber')}
								/>
								<HelperText
									type="error"
									visible={
										formikProps.errors.mobileNumber && formikProps.touched.mobileNumber
											? true
											: false
									}>
									{formikProps.errors.mobileNumber}
								</HelperText>
							</View>
							<>
								<Button
									mode="contained"
									accessibilityLabel="Submit"
									onPress={formikProps.handleSubmit}
									loading={formikProps.isSubmitting}>
									Next
								</Button>
							</>
						</View>
					)}
				</Formik>
			</SafeAreaView>
		);
	}
};

const styles = StyleSheet.create({
	input: { width: '80%' },
	loginContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		height: '100%',
		paddingVertical: heightPercentageToDP('5%'),
		justifyContent: 'space-between',
	},
	title: {
		alignSelf: 'center',
	},
	snackbar: {},
});

export default Login;
