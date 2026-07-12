import type { Tokens } from '../../tokens/generated/tokens';

export interface PromotionCardStyles {
	titleText: string;
	overlay: string;
	spacing: {
		borderRadius: string;
		padding: string;
		titleFontSize: string;
		minHeight: string;
	};
}

/**
 * Derives PromotionCard CSS values from the token set.
 *
 * PromotionCard is a composite component with no single MUI counterpart, so
 * this returns a plain style config the component consumes via sx props rather
 * than registering a global MUI component override.
 */
export const promotionCardStyles = (tokens: Tokens): PromotionCardStyles => ({
	titleText: tokens.promotionCard.component.titleText,
	overlay: tokens.promotionCard.component.overlay,
	spacing: {
		borderRadius: tokens.promotionCard.component.spacing.borderRadius,
		padding: tokens.promotionCard.component.spacing.padding,
		titleFontSize: tokens.promotionCard.component.spacing.titleFontSize,
		minHeight: tokens.promotionCard.component.spacing.minHeight,
	},
});

export default promotionCardStyles;
