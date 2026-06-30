import { ThemeOptions } from '@mui/material/styles';
import tokens from '../tokens/generated/tokens';

const { color, button } = tokens;

type Concept = 'primary' | 'secondary';
type Variant = 'contained' | 'outlined' | 'text';

const concepts: Concept[] = ['primary', 'secondary'];
const variants: Variant[] = ['contained', 'outlined', 'text'];

// MUI exposes per-variant/-color slots as `containedPrimary`, `textSecondary`, etc.
const styleOverrideKey = (variant: Variant, concept: Concept): string =>
	`${variant}${concept.charAt(0).toUpperCase()}${concept.slice(1)}`;

const buttonVariantStyles = () =>
	variants.reduce<Record<string, object>>((styles, variant) => {
		concepts.forEach((concept) => {
			const t = button[variant][concept];
			// `border` only exists on the outlined variant's tokens.
			const border = 'border' in t ? t.border : undefined;

			styles[styleOverrideKey(variant, concept)] = {
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
	}, {});

export const createThemeFromTokens = (): ThemeOptions => ({
	palette: {
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
			primary: color.black,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					borderRadius: '4px',
					transition: 'all 0.3s ease',
				},
				...buttonVariantStyles(),
			},
		},
	},
});
