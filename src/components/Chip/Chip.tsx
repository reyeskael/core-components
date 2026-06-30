import { Chip as MuiChip } from '@mui/material';
import type { ChipProps as MuiChipProps } from '@mui/material';

export interface ChipProps extends MuiChipProps {}

export const Chip = (props: ChipProps) => (
	<MuiChip {...props} />
);
