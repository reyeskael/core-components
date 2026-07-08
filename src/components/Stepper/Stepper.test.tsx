import { render, screen } from '@testing-library/react';
import { Stepper } from './Stepper';

const defaultSteps = ['Step 1', 'Step 2', 'Step 3'];

describe('Stepper', () => {
	it('renders all step labels', () => {
		render(<Stepper steps={defaultSteps} />);
		defaultSteps.forEach((step) => {
			expect(screen.getByText(step)).toBeInTheDocument();
		});
	});

	it('applies alternativeLabel class when set to true', () => {
		const { container } = render(<Stepper steps={defaultSteps} alternativeLabel />);
		expect(container.querySelector('.MuiStepper-alternativeLabel')).toBeInTheDocument();
	});

	it('applies vertical class when orientation is vertical', () => {
		const { container } = render(<Stepper steps={defaultSteps} orientation="vertical" />);
		expect(container.querySelector('.MuiStepper-vertical')).toBeInTheDocument();
	});
});
