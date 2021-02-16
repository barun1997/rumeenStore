import { FormikErrors, FormikTouched } from 'formik';

interface FormProps<T> {
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
	errors: FormikErrors<T>;
	touched: FormikTouched<T>;
	isSubmitting: boolean;
	values: T;
}

export default FormProps;
