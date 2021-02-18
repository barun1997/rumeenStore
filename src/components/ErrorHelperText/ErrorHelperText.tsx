import React from 'react';
import { HelperText } from 'react-native-paper';

interface ErrorHelperTextProps {
	error?: string;
	touched?: boolean;
}

export const ErrorHelperText: React.FC<ErrorHelperTextProps> = ({ error, touched }) => {
	return error && touched ? <HelperText type="error">{error}</HelperText> : null;
};
