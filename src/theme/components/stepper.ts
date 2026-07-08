import type { Components, Theme } from '@mui/material/styles';
import type { Tokens } from '../../tokens/generated/tokens';

export const muiStepper = (tokens: Tokens): Components<Theme>['MuiStepper'] => {
	const { stepper } = tokens;
	return {
		styleOverrides: {
			root: {
				padding: stepper.root.padding,
			},
		},
	};
};

export const muiStepLabel = (tokens: Tokens): Components<Theme>['MuiStepLabel'] => {
	const { stepper } = tokens;
	return {
		styleOverrides: {
			label: {
				color: stepper.label.inactive,
				'&.Mui-active': {
					color: stepper.label.active,
				},
				'&.Mui-completed': {
					color: stepper.label.completed,
				},
			},
		},
	};
};

export const muiStepIcon = (tokens: Tokens): Components<Theme>['MuiStepIcon'] => {
	const { stepper } = tokens;
	return {
		styleOverrides: {
			root: {
				color: stepper.icon.inactive,
				width: stepper.icon.size,
				height: stepper.icon.size,
				'&.Mui-active': {
					color: stepper.icon.active,
				},
				'&.Mui-completed': {
					color: stepper.icon.completed,
				},
			},
		},
	};
};

export const muiStepConnector = (tokens: Tokens): Components<Theme>['MuiStepConnector'] => {
	const { stepper } = tokens;
	return {
		styleOverrides: {
			line: {
				borderColor: stepper.connector.inactive,
				'&.MuiStepConnector-lineHorizontal': {
					borderTopWidth: stepper.connector.thickness,
				},
				'&.MuiStepConnector-lineVertical': {
					borderLeftWidth: stepper.connector.thickness,
				},
			},
			root: {
				'&.Mui-active': {
					'& .MuiStepConnector-line': {
						borderColor: stepper.connector.active,
					},
				},
				'&.Mui-completed': {
					'& .MuiStepConnector-line': {
						borderColor: stepper.connector.active,
					},
				},
			},
		},
	};
};
