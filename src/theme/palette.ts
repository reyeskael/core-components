import type { PaletteOptions } from '@mui/material/styles';
import type { Tokens } from '../tokens/generated/tokens';

/**
 * Builds the MUI palette from a brand's semantic color tokens.
 *
 * Pure function of `tokens` so it can be reused across brands. Reads the
 * `semantic` layer (`color.action`, `color.text`, `color.surface`) rather than
 * raw primitives, so re-pointing semantics re-themes the palette automatically.
 */
export const createPalette = (tokens: Tokens): PaletteOptions => {
	const { color } = tokens;

	return {
		primary: {
			main: color.action.primary.default,
			light: color.action.primary.hover,
			dark: color.action.primary.pressed,
			contrastText: color.text.onPrimary,
		},
		secondary: {
			main: color.action.secondary.default,
			light: color.action.secondary.hover,
			dark: color.action.secondary.pressed,
			contrastText: color.text.onSecondary,
		},
		background: {
			default: color.surface.default,
			paper: color.surface.default,
		},
		text: {
			primary: color.text.primary,
			secondary: color.text.secondary,
		},
	};
};

export default createPalette;
