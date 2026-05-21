import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
	it('renders with default props', () => {
		render(<Button>Click me</Button>);
		const button = screen.getByRole('button', { name: /click me/i });
		expect(button).toBeInTheDocument();
	});

	describe('variants', () => {
		it('renders text variant', () => {
			render(<Button variant="text">Text Button</Button>);
			const button = screen.getByRole('button', { name: /text button/i });
			expect(button).toHaveClass('MuiButton-text');
		});

		it('renders outlined variant', () => {
			render(<Button variant="outlined">Outlined Button</Button>);
			const button = screen.getByRole('button', { name: /outlined button/i });
			expect(button).toHaveClass('MuiButton-outlined');
		});

		it('renders contained variant', () => {
			render(<Button variant="contained">Contained Button</Button>);
			const button = screen.getByRole('button', { name: /contained button/i });
			expect(button).toHaveClass('MuiButton-contained');
		});
	});

	describe('colors', () => {
		const colors = ['primary', 'secondary', 'success', 'error', 'info', 'warning', 'inherit'];

		colors.forEach((color) => {
			it(`renders ${color} color`, () => {
				render(<Button color={color as any}>{color}</Button>);
				const button = screen.getByRole('button', { name: new RegExp(color, 'i') });
				expect(button).toBeInTheDocument();
			});
		});
	});

	describe('disabled state', () => {
		it('renders disabled button', () => {
			render(<Button disabled>Disabled Button</Button>);
			const button = screen.getByRole('button', { name: /disabled button/i });
			expect(button).toBeDisabled();
		});
	});

	describe('click events', () => {
		it('calls onClick handler when clicked', async () => {
			const handleClick = jest.fn();
			render(<Button onClick={handleClick}>Click me</Button>);
			const button = screen.getByRole('button', { name: /click me/i });
			await userEvent.click(button);
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it('calls onClick handler multiple times on multiple clicks', async () => {
			const handleClick = jest.fn();
			render(<Button onClick={handleClick}>Click me</Button>);
			const button = screen.getByRole('button', { name: /click me/i });
			await userEvent.click(button);
			await userEvent.click(button);
			await userEvent.click(button);
			expect(handleClick).toHaveBeenCalledTimes(3);
		});
	});

	describe('sizes', () => {
		it('renders small size', () => {
			render(<Button size="small">Small</Button>);
			const button = screen.getByRole('button', { name: /small/i });
			expect(button).toHaveClass('MuiButton-sizeSmall');
		});

		it('renders medium size', () => {
			render(<Button size="medium">Medium</Button>);
			const button = screen.getByRole('button', { name: /medium/i });
			expect(button).toHaveClass('MuiButton-sizeMedium');
		});

		it('renders large size', () => {
			render(<Button size="large">Large</Button>);
			const button = screen.getByRole('button', { name: /large/i });
			expect(button).toHaveClass('MuiButton-sizeLarge');
		});
	});

	describe('children', () => {
		it('renders text children', () => {
			render(<Button>Text Content</Button>);
			expect(screen.getByText('Text Content')).toBeInTheDocument();
		});

		it('renders element children', () => {
			render(
				<Button>
					<span>Icon</span> Label
				</Button>
			);
			expect(screen.getByText('Icon')).toBeInTheDocument();
			expect(screen.getByText('Label')).toBeInTheDocument();
		});
	});

	describe('full width', () => {
		it('renders full width button', () => {
			render(<Button fullWidth>Full Width</Button>);
			const button = screen.getByRole('button', { name: /full width/i });
			expect(button).toHaveClass('MuiButton-fullWidth');
		});
	});

	describe('type attribute', () => {
		it('renders with submit type', () => {
			render(<Button type="submit">Submit</Button>);
			const button = screen.getByRole('button', { name: /submit/i });
			expect(button).toHaveAttribute('type', 'submit');
		});

		it('renders with button type by default', () => {
			render(<Button>Default</Button>);
			const button = screen.getByRole('button', { name: /default/i });
			expect(button).toHaveAttribute('type', 'button');
		});
	});
});
