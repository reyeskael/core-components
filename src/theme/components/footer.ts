import type { Tokens } from '../../tokens/generated/tokens';

export interface FooterStyles {
	background: string;
	border: string;
	text: { primary: string; secondary: string };
	link: { default: string; hover: string };
	bottomBar: { background: string; text: string };
	padding: { sectionY: string; sectionX: string; bottomBarY: string; groupGap: string };
}

/**
 * Derives Footer CSS values from the token set.
 *
 * Footer is a composite component with no single MUI counterpart, so this
 * returns a plain style config the component consumes via sx props rather than
 * registering a global MUI component override.
 */
export const footerStyles = (tokens: Tokens): FooterStyles => ({
	background: tokens.footer.component.background,
	border: tokens.footer.component.border,
	text: {
		primary: tokens.footer.component.text.primary,
		secondary: tokens.footer.component.text.secondary,
	},
	link: {
		default: tokens.footer.component.link.default,
		hover: tokens.footer.component.link.hover,
	},
	bottomBar: {
		background: tokens.footer.component.bottomBar.background,
		text: tokens.footer.component.bottomBar.text,
	},
	padding: {
		sectionY: tokens.footer.component.padding.sectionY,
		sectionX: tokens.footer.component.padding.sectionX,
		bottomBarY: tokens.footer.component.padding.bottomBarY,
		groupGap: tokens.footer.component.padding.groupGap,
	},
});

export default footerStyles;
