import type { ReactNode } from 'react';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { AccordionProps as MuiAccordionProps } from '@mui/material/Accordion';

export interface AccordionProps extends Omit<MuiAccordionProps, 'children'> {
	summary: ReactNode;
	children: ReactNode;
}

export const Accordion = ({ summary, children, ...props }: AccordionProps) => (
	<MuiAccordion {...props}>
		<MuiAccordionSummary expandIcon={<ExpandMoreIcon />}>
			{summary}
		</MuiAccordionSummary>
		<MuiAccordionDetails>
			{children}
		</MuiAccordionDetails>
	</MuiAccordion>
);
