import type { Components, Theme } from '@mui/material/styles';
import type { Tokens } from '../../tokens/generated/tokens';

/**
 * MuiOutlinedInput overrides — border color per interaction state, applied to
 * the `notchedOutline` slot since that's what MUI renders as the visible border.
 *
 * `warning` has no native MUI severity (unlike `error`), so it's driven by the
 * `Input-warning` class the `Input` wrapper applies to the TextField's root
 * `FormControl` — an ancestor of this slot — rather than a `Mui-*` state class.
 */
export const muiOutlinedInput = (tokens: Tokens): Components<Theme>['MuiOutlinedInput'] => {
	const { input } = tokens;
	const { border } = input.outlined;
	return {
		styleOverrides: {
			root: {
				borderRadius: input.borderRadius,
				'& .MuiOutlinedInput-notchedOutline': {
					borderColor: border.default,
				},
				'&:hover .MuiOutlinedInput-notchedOutline': {
					borderColor: border.hover,
				},
				'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
					borderColor: border.focused,
					borderWidth: '2px',
				},
				'&.Mui-error .MuiOutlinedInput-notchedOutline': {
					borderColor: border.error,
				},
				'.Input-warning & .MuiOutlinedInput-notchedOutline': {
					borderColor: border.warning,
				},
				'&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
					borderColor: border.disabled,
				},
			},
			input: {
				color: input.text.default,
				'&.Mui-disabled': {
					WebkitTextFillColor: input.text.disabled,
				},
			},
		},
	};
};

/**
 * MuiFilledInput overrides — background fill plus the bottom underline that
 * MUI renders via `:before`/`:after` pseudo-elements on the root.
 */
export const muiFilledInput = (tokens: Tokens): Components<Theme>['MuiFilledInput'] => {
	const { input } = tokens;
	const { background, underline } = input.filled;
	return {
		styleOverrides: {
			root: {
				borderTopLeftRadius: input.borderRadius,
				borderTopRightRadius: input.borderRadius,
				backgroundColor: background.default,
				'&:hover': {
					backgroundColor: background.hover,
				},
				'&.Mui-disabled': {
					backgroundColor: background.disabled,
				},
				'&:before': {
					borderBottomColor: underline.default,
				},
				'&:hover:not(.Mui-disabled):before': {
					borderBottomColor: underline.hover,
				},
				'&.Mui-focused:after': {
					borderBottomColor: underline.focused,
				},
				'&.Mui-error:after': {
					borderBottomColor: underline.error,
				},
				'.Input-warning &:after': {
					borderBottomColor: underline.warning,
				},
			},
			input: {
				color: input.text.default,
			},
		},
	};
};

/**
 * MuiInput overrides — the `standard` variant's underline-only styling.
 */
export const muiInput = (tokens: Tokens): Components<Theme>['MuiInput'] => {
	const { input } = tokens;
	const { underline } = input.standard;
	return {
		styleOverrides: {
			root: {
				'&:before': {
					borderBottomColor: underline.default,
				},
				'&:hover:not(.Mui-disabled):before': {
					borderBottomColor: underline.hover,
				},
				'&.Mui-focused:after': {
					borderBottomColor: underline.focused,
				},
				'&.Mui-error:after': {
					borderBottomColor: underline.error,
				},
				'.Input-warning &:after': {
					borderBottomColor: underline.warning,
				},
			},
			input: {
				color: input.text.default,
			},
		},
	};
};

/**
 * MuiInputLabel overrides — label color per state, shared across all three
 * TextField variants.
 */
export const muiInputLabel = (tokens: Tokens): Components<Theme>['MuiInputLabel'] => {
	const { input } = tokens;
	return {
		styleOverrides: {
			root: {
				color: input.label.default,
				'&.Mui-focused': {
					color: input.label.focused,
				},
				'&.Mui-error': {
					color: input.label.error,
				},
				'.Input-warning &': {
					color: input.label.warning,
				},
				'&.Mui-disabled': {
					color: input.label.disabled,
				},
			},
		},
	};
};

/**
 * MuiFormHelperText overrides — the helper/error text rendered beneath the input.
 */
export const muiFormHelperText = (tokens: Tokens): Components<Theme>['MuiFormHelperText'] => {
	const { input } = tokens;
	return {
		styleOverrides: {
			root: {
				color: input.helperText.default,
				'&.Mui-error': {
					color: input.helperText.error,
				},
				'.Input-warning &': {
					color: input.helperText.warning,
				},
			},
		},
	};
};

export default muiOutlinedInput;
