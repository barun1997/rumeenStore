import React, { ChangeEvent } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Subheading } from 'react-native-paper';
import styles from './styles';

const CELL_COUNT = 6;

interface CodeFieldProps {
	value: string;
	setValue: (e: string | ChangeEvent<unknown>) => void;
}

const InputCodeField: React.FC<CodeFieldProps> = ({ value, setValue }) => {
	const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});

	return (
		<SafeAreaView style={styles.root}>
			<Subheading>Enter the OTP code we sent to the number</Subheading>
			<CodeField
				ref={ref}
				{...props}
				value={value}
				onChangeText={setValue}
				cellCount={CELL_COUNT}
				rootStyle={styles.codeFieldRoot}
				keyboardType="number-pad"
				textContentType="oneTimeCode"
				renderCell={({ index, symbol, isFocused }) => (
					<View
						onLayout={getCellOnLayoutHandler(index)}
						key={index}
						style={[styles.cellRoot, isFocused && styles.focusCell]}>
						<Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
					</View>
				)}
			/>
		</SafeAreaView>
	);
};

export default InputCodeField;
