import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
	it('renders with default props', () => {
		render(<Input label="Name" />);
		const input = screen.getByLabelText('Name');
		expect(input).toBeInTheDocument();
	});

	describe('variants', () => {
		it('renders outlined variant by default', () => {
			render(<Input label="Outlined" />);
			expect(document.querySelector('.MuiOutlinedInput-root')).toBeInTheDocument();
		});

		it('renders filled variant', () => {
			render(<Input label="Filled" variant="filled" />);
			expect(document.querySelector('.MuiFilledInput-root')).toBeInTheDocument();
		});

		it('renders standard variant', () => {
			render(<Input label="Standard" variant="standard" />);
			expect(document.querySelector('.MuiInput-root')).toBeInTheDocument();
			expect(document.querySelector('.MuiOutlinedInput-root')).not.toBeInTheDocument();
		});
	});

	describe('label', () => {
		it('renders the label text', () => {
			render(<Input label="Email address" />);
			expect(document.querySelector('label')).toHaveTextContent('Email address');
		});
	});

	describe('helper text', () => {
		it('renders helper text', () => {
			render(<Input label="Email" helperText="We'll never share your email." />);
			expect(screen.getByText("We'll never share your email.")).toBeInTheDocument();
		});
	});

	describe('error state', () => {
		it('applies the Mui-error class when error is true', () => {
			render(<Input label="Email" error helperText="Invalid email" />);
			expect(document.querySelector('.Mui-error')).toBeInTheDocument();
		});
	});

	describe('warning state', () => {
		it('applies the Input-warning class when warning is true', () => {
			render(<Input label="Email" warning helperText="Unusual domain" />);
			expect(document.querySelector('.Input-warning')).toBeInTheDocument();
		});

		it('does not apply the Input-warning class by default', () => {
			render(<Input label="Email" />);
			expect(document.querySelector('.Input-warning')).not.toBeInTheDocument();
		});

		it('preserves a caller-supplied className alongside Input-warning', () => {
			render(<Input label="Email" warning className="custom-class" />);
			const warningEl = document.querySelector('.Input-warning');
			expect(warningEl).toHaveClass('custom-class');
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
			render(<Input label="Small" size="small" />);
			expect(document.querySelector('.MuiInputBase-sizeSmall')).toBeInTheDocument();
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
			render(<Input label="Name" fullWidth />);
			expect(document.querySelector('.MuiFormControl-fullWidth')).toBeInTheDocument();
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
});
