import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { Formik } from 'formik';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button, Subheading, TextInput, useTheme } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { ErrorHelperText } from '../../../components/ErrorHelperText/ErrorHelperText';
import { STORE_NAME_STORAGE } from '../../../constants/storageConstants';
import { StoreDetail } from '../../../interfaces/StoreDetail';
import { setNewStore } from '../../../services/userService';

interface CreateNewStoreProps {
	setStoreName: React.Dispatch<React.SetStateAction<string | null>>;
	setInitializing: React.Dispatch<React.SetStateAction<boolean>>;
	setCreateStoreSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialStore: StoreDetail = {
	storeName: '',
	location: '',
};

export const CreateNewStore: React.FC<CreateNewStoreProps> = ({
	setStoreName,
	setInitializing,
	setCreateStoreSuccess,
}) => {
	const theme = useTheme();
	const styles = useStyles(theme.colors);

	const phoneNumber = auth().currentUser?.phoneNumber as string;

	const [showFinalScreen, setShowFinalScreen] = React.useState(false);

	const handleStoreSubmit = async ({ location, storeName }: StoreDetail) => {
		await setNewStore(phoneNumber, { location, storeName });
		await AsyncStorage.setItem(STORE_NAME_STORAGE, storeName);
		setStoreName(storeName);
		setInitializing(false);
		setShowFinalScreen(true);
	};

	const handleFinalizeSubmit = () => {
		setCreateStoreSuccess(true);
	};

	if (showFinalScreen)
		return (
			<SafeAreaView>
				<View style={styles.container}>
					<Subheading> Store successfully created </Subheading>
					<Button onPress={handleFinalizeSubmit} mode="contained" style={styles.button}>
						<Text>Continue</Text>
					</Button>
				</View>
			</SafeAreaView>
		);
	else
		return (
			<SafeAreaView>
				<Formik initialValues={initialStore} onSubmit={handleStoreSubmit}>
					{({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
						<View style={styles.container}>
							<View style={styles.mainFormView}>
								<Subheading>Enter your business details</Subheading>
								<View>
									<TextInput
										textAlign="center"
										onChangeText={handleChange('storeName')}
										onBlur={handleBlur('storeName')}
										label="Store Name"
										error={!!errors.storeName && touched.storeName}
										value={values.storeName}
									/>
									<ErrorHelperText error={errors.storeName} touched={touched.storeName} />
								</View>
								<View>
									<TextInput
										textAlign="center"
										onChangeText={handleChange('location')}
										onBlur={handleBlur('location')}
										label="Store Location"
										error={!!errors.location && touched.location}
										value={values.location}
									/>
									<ErrorHelperText error={errors.location} touched={touched.location} />
								</View>
							</View>
							<Button
								loading={isSubmitting}
								onPress={handleSubmit}
								mode="contained"
								style={styles.button}>
								<Text>Create a store</Text>
							</Button>
						</View>
					)}
				</Formik>
			</SafeAreaView>
		);
};

const useStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		container: {
			height: '100%',
			backgroundColor: colors.surface,
			justifyContent: 'space-between',
			padding: widthPercentageToDP('5%'),
		},
		mainFormView: {
			height: '40%',
			justifyContent: 'space-around',
		},
		error: { marginHorizontal: '2%', color: colors.error },
		button: { width: '50%', alignSelf: 'center' },
	});
