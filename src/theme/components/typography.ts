import type { TypographyVariantsOptions, TypographyVariant } from '@mui/material/styles';
import type { Tokens } from '../../tokens/generated/tokens';

type TypographyVariantTokens = Tokens['typography'];
type Variant = Extract<TypographyVariant, keyof TypographyVariantTokens>;

const VARIANTS: Variant[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'subtitle1', 'subtitle2', 'caption', 'overline'];

/**
 * Builds the MUI typography scale from a brand's token set.
 *
 * Returns `TypographyVariantsOptions` for use as `theme.typography` — this is
 * what drives the `variant` prop on MUI's Typography component. Pure function
 * of `tokens`, same as muiButton/muiAppBar.
 */
export const muiTypography = (tokens: Tokens): TypographyVariantsOptions => {
	const { typography } = tokens;

	const variantStyles = VARIANTS.reduce<TypographyVariantsOptions>((acc, variant) => {
		const t = typography[variant];
		acc[variant] = {
			fontFamily: t.fontFamily,
			fontSize: t.fontSize,
			fontWeight: t.fontWeight,
			lineHeight: t.lineHeight,
		};
		return acc;
	}, {});

	return {
		fontFamily: typography.fontFamily.base,
		fontWeightRegular: typography.fontWeight.regular,
		fontWeightMedium: typography.fontWeight.medium,
		fontWeightBold: typography.fontWeight.bold,
		...variantStyles,
	};
};

export default muiTypography;
