import type { Components, Theme } from '@mui/material/styles';
import type { Tokens } from '../../tokens/generated/tokens';

/**
 * MuiAccordion overrides — the collapsible container's surface, border, and
 * removal of MUI's default top-divider/expanded-margin so stacked accordions
 * sit flush.
 */
export const muiAccordion = (tokens: Tokens): Components<Theme>['MuiAccordion'] => {
	const { accordion } = tokens;
	return {
		styleOverrides: {
			root: {
				backgroundColor: accordion.root.background,
				border: `1px solid ${accordion.root.border}`,
				borderRadius: accordion.root.borderRadius,
				'&:before': {
					display: 'none',
				},
				'&.Mui-expanded': {
					margin: 0,
				},
			},
		},
	};
};

/**
 * MuiAccordionSummary overrides — the always-visible question row, including
 * its expanded-state background and expand-icon color.
 */
export const muiAccordionSummary = (tokens: Tokens): Components<Theme>['MuiAccordionSummary'] => {
	const { accordion } = tokens;
	return {
		styleOverrides: {
			root: {
				minHeight: accordion.summary.minHeight,
				paddingLeft: accordion.summary.paddingX,
				paddingRight: accordion.summary.paddingX,
				color: accordion.summary.text,
				'&.Mui-expanded': {
					backgroundColor: accordion.summary.backgroundExpanded,
				},
			},
			expandIconWrapper: {
				color: accordion.summary.icon,
			},
		},
	};
};

/**
 * MuiAccordionDetails overrides — the answer content revealed on expand.
 */
export const muiAccordionDetails = (tokens: Tokens): Components<Theme>['MuiAccordionDetails'] => {
	const { accordion } = tokens;
	return {
		styleOverrides: {
			root: {
				color: accordion.details.text,
				paddingLeft: accordion.details.paddingX,
				paddingRight: accordion.details.paddingX,
				paddingTop: accordion.details.paddingY,
				paddingBottom: accordion.details.paddingY,
			},
		},
	};
};

export default muiAccordion;
