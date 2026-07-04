import type { ThemeOptions } from '@mui/material/styles';
import generatedTokens, { Tokens } from '../tokens/generated/tokens';
import { createPalette } from './palette';
import { muiButton } from './components/button';
import { muiChip } from './components/chip';
import { muiAccordion, muiAccordionSummary, muiAccordionDetails } from './components/accordion';
import { muiAppBar, muiToolbar } from './components/header';
import { muiTypography } from './components/typography';
import { muiOutlinedInput, muiFilledInput, muiInput, muiInputLabel, muiFormHelperText } from './components/input';

/**
 * Assembles MUI `ThemeOptions` from a token set.
 *
 * This is a thin composer: the palette and each component's overrides live in
 * their own modules (`./palette`, `./components/*`). Adding a component = add a
 * module and one line below — this file does not grow per-component.
 *
 * Accepts a `tokens` argument (defaults to the generated single-brand set) so
 * the same composition can produce a theme for any brand: pass that brand's
 * resolved tokens, e.g. `createThemeFromTokens(horseshoeTokens)`.
 */
export const createThemeFromTokens = (
	tokens: Tokens = generatedTokens
): ThemeOptions => ({
	palette: createPalette(tokens),
	typography: muiTypography(tokens),
	components: {
		MuiButton: muiButton(tokens),
		MuiChip: muiChip(tokens),
		MuiAccordion: muiAccordion(tokens),
		MuiAccordionSummary: muiAccordionSummary(tokens),
		MuiAccordionDetails: muiAccordionDetails(tokens),
		MuiAppBar: muiAppBar(tokens),
		MuiToolbar: muiToolbar(tokens),
		MuiOutlinedInput: muiOutlinedInput(tokens),
		MuiFilledInput: muiFilledInput(tokens),
		MuiInput: muiInput(tokens),
		MuiInputLabel: muiInputLabel(tokens),
		MuiFormHelperText: muiFormHelperText(tokens),
	},
});

export default createThemeFromTokens;
