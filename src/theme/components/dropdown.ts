import type { Components, Theme } from '@mui/material/styles';
import type { Tokens } from '../../tokens/generated/tokens';

/**
 * MuiSelect overrides — only the dropdown (chevron) icon. The field itself
 * (border, background, label, helper text) is rendered through
 * MuiOutlinedInput/MuiFilledInput/MuiInput, so it already matches Input via
 * those shared overrides (see `./input`).
 */
export const muiSelect = (tokens: Tokens): Components<Theme>['MuiSelect'] => {
	const { icon } = tokens.dropdown;
	return {
		styleOverrides: {
			icon: {
				color: icon.default,
				'&.Mui-disabled': {
					color: icon.disabled,
				},
			},
		},
	};
};

/**
 * MuiMenu overrides — the popover surface the options list renders into.
 */
export const muiMenu = (tokens: Tokens): Components<Theme>['MuiMenu'] => {
	const { menu } = tokens.dropdown;
	return {
		styleOverrides: {
			paper: {
				backgroundColor: menu.background,
			},
		},
	};
};

/**
 * MuiMenuItem overrides — hover/selected states for each option row.
 */
export const muiMenuItem = (tokens: Tokens): Components<Theme>['MuiMenuItem'] => {
	const { item } = tokens.dropdown.menu;
	return {
		styleOverrides: {
			root: {
				'&:hover': {
					backgroundColor: item.hover,
				},
				'&.Mui-selected': {
					backgroundColor: item.selected,
					'&:hover': {
						backgroundColor: item.selectedHover,
					},
				},
				'&.Mui-disabled': {
					color: item.disabledText,
					opacity: 1,
				},
			},
		},
	};
};

export default muiSelect;
