import { TextField as MuiTextField, InputAdornment } from '@mui/material';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material';
import type { ReactNode } from 'react';

export type InputProps = MuiTextFieldProps & {
	/** Renders the warning state — same visual treatment as `error`, for non-blocking validation. */
	warning?: boolean;
	/** Icon rendered at the end of the input, e.g. a search or clear icon. */
	endIcon?: ReactNode;
};

export const Input = ({ warning, endIcon, className, slotProps, ...props }: InputProps) => (
	<MuiTextField
		{...props}
		className={warning ? `Input-warning${className ? ` ${className}` : ''}` : className}
		slotProps={
			endIcon
				? {
						...slotProps,
						input: {
							...slotProps?.input,
							endAdornment: <InputAdornment position="end">{endIcon}</InputAdornment>,
						},
					}
				: slotProps
		}
	/>
);
