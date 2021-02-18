import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { TextInput } from 'react-native-paper';

interface FormikNumInputProps {
	style?: StyleProp<TextStyle>;
	value: number;
	inputKey: string;
	label: string;
	setFieldValue: (field: string, value: unknown, shouldValidate?: boolean | undefined) => void;
	handleBlur: {
		(e: React.FocusEvent<never>): void;
		<T = unknown>(fieldOrEvent: T): T extends string ? (e: unknown) => void : void;
	};
}

export const FormikNumInput: React.FC<FormikNumInputProps> = ({
	style,
	value,
	inputKey,
	label,
	setFieldValue,
	handleBlur,
}) => {
	return (
		<TextInput
			style={style}
			label={label}
			keyboardType="numeric"
			value={value.toString()}
			onChangeText={(value) => {
				if (!value) return setFieldValue(inputKey, '');
				setFieldValue(inputKey, value);
			}}
			onBlur={handleBlur(inputKey)}
		/>
	);
};
