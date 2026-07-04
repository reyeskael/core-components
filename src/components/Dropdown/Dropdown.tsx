import { TextField as MuiTextField, MenuItem } from '@mui/material';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material';
import type { ReactNode } from 'react';

export type DropdownOption = {
	label: ReactNode;
	value: string | number;
	disabled?: boolean;
};

export type DropdownProps = Omit<MuiTextFieldProps, 'select'> & {
	/** Renders the warning state — same visual treatment as `error`, for non-blocking validation. */
	warning?: boolean;
	/** Options rendered as menu items. Ignored if `children` is provided. */
	options?: DropdownOption[];
};

export const Dropdown = ({ warning, options, className, children, ...props }: DropdownProps) => (
	<MuiTextField
		{...props}
		select
		className={warning ? `Input-warning${className ? ` ${className}` : ''}` : className}
	>
		{children ??
			options?.map(({ label, value, disabled }) => (
				<MenuItem key={value} value={value} disabled={disabled}>
					{label}
				</MenuItem>
			))}
	</MuiTextField>
);
