import { FormikErrors, FormikTouched } from 'formik';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Caption, TextInput, useTheme } from 'react-native-paper';
import { CategoryType } from '../../../../../interfaces/Category';

interface CategoryFormProps {
	handleBlur: {
		(e: React.FocusEvent<never>): void;
		<T = unknown>(fieldOrEvent: T): T extends string ? (e: unknown) => void : void;
	};
	handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
	handleChange: {
		(e: React.ChangeEvent<unknown>): void;
		<T = string | React.ChangeEvent<unknown>>(field: T): T extends React.ChangeEvent<unknown>
			? void
			: (e: string | React.ChangeEvent<unknown>) => void;
	};
	setFieldValue: (field: string, value: unknown, shouldValidate?: boolean | undefined) => void;
	name: string;
	isSubmitting: boolean;
	errors: FormikErrors<CategoryType>;
	touched: FormikTouched<CategoryType>;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
	handleBlur,
	handleChange,

	handleSubmit,
	isSubmitting,
	touched,
	errors,
	name,
}) => {
	const colors = useTheme().colors;
	const styles = useStyles(colors);
	return (
		<View style={styles.container}>
			<View>
				<TextInput
					style={styles.input}
					onChangeText={handleChange('name')}
					onBlur={handleBlur('name')}
					label="Category Name"
					error={!!errors.name && touched.name}
					value={name}
				/>
				{errors.name && touched.name ? <Caption style={styles.error}>{errors.name}</Caption> : null}
			</View>
			<Button
				loading={isSubmitting}
				onPress={handleSubmit}
				mode="contained"
				style={{ width: '50%', alignSelf: 'center' }}>
				<Text>Add category</Text>
			</Button>
		</View>
	);
};

export default CategoryForm;

const useStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'space-between',
			marginHorizontal: 30,
			marginVertical: 30,
		},
		input: { marginVertical: 15 },
		error: { marginHorizontal: 10, color: colors.error },
	});
