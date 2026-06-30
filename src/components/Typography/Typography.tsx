import { Typography as MuiTypography } from '@mui/material';
import type { TypographyProps as MuiTypographyProps } from '@mui/material';

export interface TypographyProps extends MuiTypographyProps {}

export const Typography = (props: TypographyProps) => (
	<MuiTypography {...props}>
		{props.children}
	</MuiTypography>
);
