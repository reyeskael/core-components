import React from 'react';
import { render, screen } from '@testing-library/react';
import { Alert } from './Alert';
import { AlertTitle } from '@mui/material';
import '@testing-library/jest-dom';

describe('Alert Component', () => {
	it('renders with default props and nested children text', () => {
		render(<Alert>Test message</Alert>);
		const alertEl = screen.getByRole('alert');
		expect(alertEl).toBeInTheDocument();
		expect(alertEl).toHaveClass('MuiAlert-root');
		expect(screen.getByText('Test message')).toBeInTheDocument();
	});

	it('renders complex nested sub-components correctly via children', () => {
		render(
			<Alert>
				<AlertTitle>Alert Title</AlertTitle>
				Alert Description
			</Alert>
		);
		expect(screen.getByText('Alert Title')).toBeInTheDocument();
		expect(screen.getByText('Alert Description')).toBeInTheDocument();
	});

	it('applies the appropriate variant and severity classes', () => {
		render(<Alert variant="filled" severity="error">Error layout</Alert>);
		const alertEl = screen.getByRole('alert');
		expect(alertEl).toHaveClass('MuiAlert-filledError');
		expect(alertEl).toHaveClass('MuiAlert-filled');
	});
});
