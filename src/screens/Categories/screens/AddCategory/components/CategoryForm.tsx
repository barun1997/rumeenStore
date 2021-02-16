import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { CategoryType } from '../../../../../interfaces/Category';
import FormProps from '../../../../../interfaces/FormProps';

const CategoryForm: React.FC<FormProps<CategoryType>> = ({
	handleBlur,
	handleChange,
	handleSubmit,
	isSubmitting,
	touched,
	errors,
	values: { name },
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
				{errors.name && touched.name ? <Text style={styles.error}>{errors.name}</Text> : null}
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
