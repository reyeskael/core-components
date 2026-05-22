import './button.css';

import { Button as MuiButton } from '@mui/material';
import type { ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends MuiButtonProps {}

export const Button = (props: ButtonProps) => (
	<MuiButton
		{...props}
	>
		{props.children}
	</MuiButton>
);
