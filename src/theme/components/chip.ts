import type { Components, Theme } from '@mui/material/styles';
import type { Tokens } from '../../tokens/generated/tokens';

type ChipTokens = Tokens['chip'];
type Variant = 'filled' | 'outlined';
type Color = 'default' | 'primary' | 'secondary' | 'error';

const capitalize = (value: string): string =>
	value.charAt(0).toUpperCase() + value.slice(1);

/**
 * Builds the MUI `MuiChip` overrides from a brand's token set.
 *
 * Pure function of `tokens` — the same logic applies to any brand whose tokens
 * share this structure.
 */
export const muiChip = (tokens: Tokens): Components<Theme>['MuiChip'] => {
	const { chip } = tokens;
	const variants = Object.keys(chip).filter(
		(k): k is Variant => k === 'filled' || k === 'outlined'
	);
	const colors = Object.keys(chip.filled) as Color[];

	const variantStyles = variants.reduce<Record<string, object>>(
		(styles, variant) => {
			colors.forEach((color) => {
				const t = (chip as ChipTokens)[variant][color];
				const border = 'border' in t ? (t as { border: string }).border : undefined;

				styles[`${variant}${capitalize(color)}`] = {
					backgroundColor: t.background,
					color: t.text,
					...(border && { border: `1px solid ${border}` }),
					'& .MuiChip-deleteIcon': {
						color: t.deleteIcon,
					},
				};
			});
			return styles;
		},
		{}
	);

	return {
		defaultProps: {
			variant: 'filled',
		},
		styleOverrides: {
			root: {
				borderRadius: chip.borderRadius,
				transition: 'all 0.2s ease',
			},
			sizeSmall: {
				height: chip.size.small.height,
				fontSize: chip.size.small.fontSize,
				paddingLeft: chip.size.small.paddingX,
				paddingRight: chip.size.small.paddingX,
			},
			sizeMedium: {
				height: chip.size.medium.height,
				fontSize: chip.size.medium.fontSize,
				paddingLeft: chip.size.medium.paddingX,
				paddingRight: chip.size.medium.paddingX,
			},
			...variantStyles,
		},
	};
};

export default muiChip;
