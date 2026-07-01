import type { Tokens } from '../../tokens/generated/tokens';

export interface ProductCardStyles {
	surface: string;
	border: string;
	text: { primary: string; secondary: string };
	stock: { inStock: string; outOfStock: string };
	spacing: {
		borderRadius: string;
		badgeOffset: string;
		gridWidth: string;
		gridImageHeight: string;
		listImageSize: string;
		contentGap: string;
	};
}

/**
 * Derives ProductCard CSS values from the token set.
 *
 * ProductCard is a composite component with no single MUI counterpart, so this
 * returns a plain style config the component consumes via sx props rather than
 * registering a global MUI component override.
 */
export const productCardStyles = (tokens: Tokens): ProductCardStyles => ({
	surface: tokens.productCard.component.surface,
	border: tokens.productCard.component.border,
	text: {
		primary: tokens.productCard.component.text.primary,
		secondary: tokens.productCard.component.text.secondary,
	},
	stock: {
		inStock: tokens.productCard.component.stock.inStock,
		outOfStock: tokens.productCard.component.stock.outOfStock,
	},
	spacing: {
		borderRadius: tokens.productCard.component.spacing.borderRadius,
		badgeOffset: tokens.productCard.component.spacing.badgeOffset,
		gridWidth: tokens.productCard.component.spacing.gridWidth,
		gridImageHeight: tokens.productCard.component.spacing.gridImageHeight,
		listImageSize: tokens.productCard.component.spacing.listImageSize,
		contentGap: tokens.productCard.component.spacing.contentGap,
	},
});

export default productCardStyles;
