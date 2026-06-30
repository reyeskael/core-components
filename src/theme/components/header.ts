import type { Components, Theme } from '@mui/material/styles';
import type { Tokens } from '../../tokens/generated/tokens';

/**
 * MuiAppBar overrides scoped to `color="default"` so other AppBar usages
 * (e.g. color="primary") are unaffected.
 */
export const muiAppBar = (tokens: Tokens): Components<Theme>['MuiAppBar'] => ({
	styleOverrides: {
		colorDefault: {
			backgroundColor: tokens.header.background,
			borderBottom: `${tokens.header.border.width} solid ${tokens.header.border.color}`,
		},
	},
});

/**
 * MuiToolbar overrides apply the header's padding tokens.
 */
export const muiToolbar = (tokens: Tokens): Components<Theme>['MuiToolbar'] => ({
	styleOverrides: {
		root: {
			paddingLeft: tokens.header.paddingX,
			paddingRight: tokens.header.paddingX,
			paddingTop: tokens.header.paddingY,
			paddingBottom: tokens.header.paddingY,
		},
	},
});
