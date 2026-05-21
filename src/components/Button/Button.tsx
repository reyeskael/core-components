import './button.css';

import { Button as MuiButton } from '@mui/material';
import type { ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends MuiButtonProps {}

/** Primary UI component for user interaction */
export const Button = (props: ButtonProps) => {
	// const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
	return (
		<MuiButton
			{...props}
		>
		{props.children}
		</MuiButton>
	);
};
