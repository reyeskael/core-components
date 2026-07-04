import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';
import type { InputProps } from './Input';

describe('Input', () => {
	it('renders with default props', () => {
		render(<Input label="Name" />);
		const input = screen.getByLabelText('Name');
		expect(input).toBeInTheDocument();
	});

	describe('variants', () => {
		it('renders outlined variant by default', () => {
			render(<Input label="Outlined" />);
			const input = screen.getByLabelText('Outlined');
			expect(input).toHaveClass('MuiOutlinedInput-input');
		});

		it('renders filled variant', () => {
			render(<Input label="Filled" variant="filled" />);
			const input = screen.getByLabelText('Filled');
			expect(input).toHaveClass('MuiFilledInput-input');
		});

		it('renders standard variant', () => {
			render(<Input label="Standard" variant="standard" />);
			const input = screen.getByLabelText('Standard');
			expect(input).toHaveClass('MuiInput-input');
			expect(input).not.toHaveClass('MuiOutlinedInput-input');
		});
	});

	describe('label', () => {
		it('renders the label text', () => {
			render(<Input label="Email address" />);
			expect(screen.getByText('Email address', { selector: 'label' })).toBeInTheDocument();
		});
	});

	describe('helper text', () => {
		it('renders helper text', () => {
			render(<Input label="Email" helperText="We'll never share your email." />);
			expect(screen.getByText("We'll never share your email.")).toBeInTheDocument();
		});
	});

	describe('error state', () => {
		it('marks the input as invalid when error is true', () => {
			render(<Input label="Email" error helperText="Invalid email" />);
			const input = screen.getByLabelText('Email');
			expect(input).toHaveAttribute('aria-invalid', 'true');
		});
	});

	describe('warning state', () => {
		it('applies the Input-warning class when warning is true', () => {
			render(<Input label="Email" warning helperText="Unusual domain" data-testid="input-root" />);
			expect(screen.getByTestId('input-root')).toHaveClass('Input-warning');
		});

		it('does not apply the Input-warning class by default', () => {
			render(<Input label="Email" data-testid="input-root" />);
			expect(screen.getByTestId('input-root')).not.toHaveClass('Input-warning');
		});

		it('preserves a caller-supplied className alongside Input-warning', () => {
			render(<Input label="Email" warning className="custom-class" data-testid="input-root" />);
			expect(screen.getByTestId('input-root')).toHaveClass('Input-warning', 'custom-class');
		});
	});

	describe('disabled state', () => {
		it('renders disabled input', () => {
			render(<Input label="Name" disabled />);
			const input = screen.getByLabelText('Name');
			expect(input).toBeDisabled();
		});
	});

	describe('sizes', () => {
		it('renders small size', () => {
			const slotProps = { input: { 'data-testid': 'input-wrapper' } } as InputProps['slotProps'];
			render(<Input label="Small" size="small" slotProps={slotProps} />);
			expect(screen.getByTestId('input-wrapper')).toHaveClass('MuiInputBase-sizeSmall');
		});
	});

	describe('change events', () => {
		it('calls onChange handler when typing', async () => {
			const handleChange = jest.fn();
			render(<Input label="Name" onChange={handleChange} />);
			const input = screen.getByLabelText('Name');
			await userEvent.type(input, 'a');
			expect(handleChange).toHaveBeenCalledTimes(1);
		});
	});

	describe('value', () => {
		it('renders with a default value', () => {
			render(<Input label="Name" defaultValue="Jane Doe" />);
			const input = screen.getByLabelText('Name') as HTMLInputElement;
			expect(input.value).toBe('Jane Doe');
		});
	});

	describe('full width', () => {
		it('renders full width input', () => {
			render(<Input label="Name" fullWidth data-testid="input-root" />);
			expect(screen.getByTestId('input-root')).toHaveClass('MuiFormControl-fullWidth');
		});
	});

	describe('required', () => {
		it('marks the input as required', () => {
			render(<Input label="Name" required />);
			const input = screen.getByLabelText(/Name/);
			expect(input).toBeRequired();
		});
	});

	describe('type', () => {
		it('renders with text type by default', () => {
			render(<Input label="Name" />);
			const input = screen.getByLabelText('Name');
			expect(input).toHaveAttribute('type', 'text');
		});

		it('renders with password type', () => {
			render(<Input label="Password" type="password" />);
			const input = screen.getByLabelText('Password');
			expect(input).toHaveAttribute('type', 'password');
		});

		it('renders with date type', () => {
			render(<Input label="Date" type="date" slotProps={{ inputLabel: { shrink: true } }} />);
			const input = screen.getByLabelText('Date');
			expect(input).toHaveAttribute('type', 'date');
		});

		it('renders with number type', () => {
			render(<Input label="Age" type="number" />);
			const input = screen.getByLabelText('Age');
			expect(input).toHaveAttribute('type', 'number');
		});
	});

	describe('multiline', () => {
		it('renders a textarea when multiline is true', () => {
			render(<Input label="Comments" multiline />);
			const textarea = screen.getByLabelText('Comments');
			expect(textarea.tagName.toLowerCase()).toBe('textarea');
		});

		it('renders a single-line input when multiline is false', () => {
			render(<Input label="Name" />);
			const input = screen.getByLabelText('Name');
			expect(input.tagName.toLowerCase()).toBe('input');
		});
	});

	describe('endIcon', () => {
		it('renders the icon when provided', () => {
			render(<Input label="Search" endIcon={<span data-testid="search-icon" />} />);
			expect(screen.getByTestId('search-icon')).toBeInTheDocument();
		});

		it('does not render an icon by default', () => {
			render(<Input label="Name" />);
			expect(screen.queryByTestId('search-icon')).not.toBeInTheDocument();
		});

		it('preserves other slotProps.input values when endIcon is provided', () => {
			render(
				<Input
					label="Search"
					endIcon={<span data-testid="search-icon" />}
					slotProps={{ input: { readOnly: true } }}
				/>
			);
			const input = screen.getByLabelText('Search');
			expect(input).toHaveAttribute('readonly');
		});
	});
});
