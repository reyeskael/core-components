import { TextField as MuiTextField } from '@mui/material';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material';

export type InputProps = MuiTextFieldProps & {
	/** Renders the warning state — same visual treatment as `error`, for non-blocking validation. */
	warning?: boolean;
};

export const Input = ({ warning, className, ...props }: InputProps) => (
	<MuiTextField
		{...props}
		className={warning ? `Input-warning${className ? ` ${className}` : ''}` : className}
	/>
);
