import type { Components, Theme } from '@mui/material/styles';
import type { Tokens } from '../../tokens/generated/tokens';

type ButtonTokens = Tokens['button'];
type Variant = keyof ButtonTokens; // 'contained' | 'outlined' | 'text'
type Concept = keyof ButtonTokens['contained']; // 'primary' | 'secondary'

const capitalize = (value: string): string =>
	value.charAt(0).toUpperCase() + value.slice(1);

// MUI exposes per-variant/-color slots as `containedPrimary`, `textSecondary`, etc.
const slotKey = (variant: Variant, concept: Concept): string =>
	`${variant}${capitalize(concept)}`;

/**
 * Builds the MUI `MuiButton` overrides from a brand's token set.
 *
 * Pure function of `tokens` — the same logic applies to any brand whose tokens
 * share this structure. Variants and concepts are derived from the token tree,
 * so adding e.g. a `tertiary` concept in the tokens needs no change here.
 */
export const muiButton = (tokens: Tokens): Components<Theme>['MuiButton'] => {
	const { button } = tokens;
	const variants = Object.keys(button) as Variant[];
	const concepts = Object.keys(button.contained) as Concept[];

	const variantStyles = variants.reduce<Record<string, object>>(
		(styles, variant) => {
			concepts.forEach((concept) => {
				const t = button[variant][concept];
				// `border` only exists on the outlined variant's tokens.
				const border = 'border' in t ? t.border : undefined;

				styles[slotKey(variant, concept)] = {
					backgroundColor: t.background.default,
					color: t.text.default,
					...(border && { border: `1px solid ${border.default}` }),
					'&:hover': {
						backgroundColor: t.background.hover,
						color: t.text.hover,
						...(border && { borderColor: border.hover }),
					},
					'&:active': {
						backgroundColor: t.background.pressed,
						color: t.text.pressed,
						...(border && { borderColor: border.pressed }),
					},
				};
			});
			return styles;
		},
		{}
	);

	return {
		styleOverrides: {
			root: {
				textTransform: 'none',
				borderRadius: '4px',
				transition: 'all 0.3s ease',
			},
			...variantStyles,
		},
	};
};

export default muiButton;
