import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CategoryType } from '../../../../../../interfaces/Category';
import FormProps from '../../../../../../interfaces/FormProps';

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
					onChangeText={handleChange('name')}
					onBlur={handleBlur('name')}
					label="Category Name"
					error={!!errors.name && touched.name}
					value={name}
				/>
				{errors.name && touched.name ? <Text style={styles.error}>{errors.name}</Text> : null}
			</View>
			<Button loading={isSubmitting} onPress={handleSubmit} mode="contained" style={styles.button}>
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
			backgroundColor: colors.surface,
			justifyContent: 'space-between',
			padding: wp('5%'),
		},
		error: { marginHorizontal: '2%', color: colors.error },
		button: { width: '50%', alignSelf: 'center' },
	});
