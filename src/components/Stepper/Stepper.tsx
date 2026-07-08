import MuiStepper from '@mui/material/Stepper';
import MuiStep from '@mui/material/Step';
import MuiStepLabel from '@mui/material/StepLabel';
import type { StepperProps as MuiStepperProps } from '@mui/material/Stepper';

export interface StepperProps extends Omit<MuiStepperProps, 'children'> {
	/**
	 * Array of string labels for each step
	 */
	steps: string[];
	/**
	 * Zero-based index of the currently active step
	 */
	activeStep?: number;
}

export const Stepper = ({ steps, activeStep = 0, ...props }: StepperProps) => (
	<MuiStepper activeStep={activeStep} {...props}>
		{steps.map((label, index) => (
			<MuiStep key={index}>
				<MuiStepLabel>{label}</MuiStepLabel>
			</MuiStep>
		))}
	</MuiStepper>
);
