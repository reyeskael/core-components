import React from 'react';
import { Alert as MuiAlert, AlertProps as MuiAlertProps } from '@mui/material';

export interface AlertProps extends MuiAlertProps {}

export const Alert = ({ children, ...props }: AlertProps) => (
	<MuiAlert
		{...props}
	>
		{children}
	</MuiAlert>
);

Alert.displayName = 'Alert';
