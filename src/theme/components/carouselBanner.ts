import type { Tokens } from '../../tokens/generated/tokens';

export interface CarouselBannerStyles {
	surface: string;
	overlay: string;
	text: { primary: string; secondary: string };
	arrow: { background: string; backgroundHover: string; icon: string };
	dot: { default: string; active: string };
	spacing: {
		height: string;
		borderRadius: string;
		arrowOffset: string;
		dotOffset: string;
		dotSize: string;
		dotGap: string;
		contentPaddingX: string;
		contentPaddingY: string;
	};
	timing: {
		autoplayInterval: number;
	};
}

/**
 * Derives CarouselBanner CSS values from the token set.
 *
 * CarouselBanner is a composite component with no single MUI counterpart, so
 * this returns a plain style config the component consumes via sx props
 * rather than registering a global MUI component override.
 */
export const carouselBannerStyles = (tokens: Tokens): CarouselBannerStyles => ({
	surface: tokens.carouselBanner.component.surface,
	overlay: tokens.carouselBanner.component.overlay,
	text: {
		primary: tokens.carouselBanner.component.text.primary,
		secondary: tokens.carouselBanner.component.text.secondary,
	},
	arrow: {
		background: tokens.carouselBanner.component.arrow.background,
		backgroundHover: tokens.carouselBanner.component.arrow.backgroundHover,
		icon: tokens.carouselBanner.component.arrow.icon,
	},
	dot: {
		default: tokens.carouselBanner.component.dot.default,
		active: tokens.carouselBanner.component.dot.active,
	},
	spacing: {
		height: tokens.carouselBanner.component.spacing.height,
		borderRadius: tokens.carouselBanner.component.spacing.borderRadius,
		arrowOffset: tokens.carouselBanner.component.spacing.arrowOffset,
		dotOffset: tokens.carouselBanner.component.spacing.dotOffset,
		dotSize: tokens.carouselBanner.component.spacing.dotSize,
		dotGap: tokens.carouselBanner.component.spacing.dotGap,
		contentPaddingX: tokens.carouselBanner.component.spacing.contentPaddingX,
		contentPaddingY: tokens.carouselBanner.component.spacing.contentPaddingY,
	},
	timing: {
		autoplayInterval: tokens.carouselBanner.component.timing.autoplayInterval,
	},
});

export default carouselBannerStyles;
