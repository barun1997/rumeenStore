import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

interface AddCategoryFormProps {
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
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({
	handleBlur,
	handleChange,
	handleSubmit,
	name,
}) => {
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				onChangeText={handleChange('name')}
				onBlur={handleBlur('name')}
				label="Category Name"
				value={name}
			/>
			<Button onPress={handleSubmit} mode="contained" style={{ width: '50%', alignSelf: 'center' }}>
				<Text>Add category</Text>
			</Button>
		</View>
	);
};

export default AddCategoryForm;

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'space-between', marginHorizontal: 30, marginVertical: 30 },
	input: { marginVertical: 15 },
});
