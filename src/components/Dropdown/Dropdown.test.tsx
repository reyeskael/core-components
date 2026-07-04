import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MenuItem } from '@mui/material';
import { Dropdown } from './Dropdown';

const countryOptions = [
	{ label: 'United States', value: 'us' },
	{ label: 'Canada', value: 'ca' },
	{ label: 'Mexico', value: 'mx', disabled: true },
];

describe('Dropdown', () => {
	it('renders with default props', () => {
		render(<Dropdown label="Country" options={countryOptions} />);
		expect(screen.getByRole('combobox', { name: 'Country' })).toBeInTheDocument();
	});

	describe('variants', () => {
		it('renders outlined variant by default', () => {
			render(<Dropdown label="Outlined" options={countryOptions} />);
			expect(screen.getByRole('combobox', { name: 'Outlined' })).toHaveClass('MuiOutlinedInput-input');
		});

		it('renders filled variant', () => {
			render(<Dropdown label="Filled" variant="filled" options={countryOptions} />);
			expect(screen.getByRole('combobox', { name: 'Filled' })).toHaveClass('MuiFilledInput-input');
		});

		it('renders standard variant', () => {
			render(<Dropdown label="Standard" variant="standard" options={countryOptions} />);
			const select = screen.getByRole('combobox', { name: 'Standard' });
			expect(select).toHaveClass('MuiInput-input');
			expect(select).not.toHaveClass('MuiOutlinedInput-input');
		});
	});

	describe('label', () => {
		it('renders the label text', () => {
			render(<Dropdown label="Country" options={countryOptions} />);
			expect(screen.getByText('Country', { selector: '.MuiInputLabel-root' })).toBeInTheDocument();
		});
	});

	describe('helper text', () => {
		it('renders helper text', () => {
			render(<Dropdown label="Country" options={countryOptions} helperText="Pick one." />);
			expect(screen.getByText('Pick one.')).toBeInTheDocument();
		});
	});

	describe('error state', () => {
		it('marks the field as invalid when error is true', () => {
			render(<Dropdown label="Country" options={countryOptions} error helperText="Required" />);
			expect(screen.getByRole('combobox', { name: /Country/ })).toHaveAttribute('aria-invalid', 'true');
		});
	});

	describe('warning state', () => {
		it('applies the Input-warning class when warning is true', () => {
			render(<Dropdown label="Country" options={countryOptions} warning data-testid="dropdown-root" />);
			expect(screen.getByTestId('dropdown-root')).toHaveClass('Input-warning');
		});

		it('does not apply the Input-warning class by default', () => {
			render(<Dropdown label="Country" options={countryOptions} data-testid="dropdown-root" />);
			expect(screen.getByTestId('dropdown-root')).not.toHaveClass('Input-warning');
		});

		it('preserves a caller-supplied className alongside Input-warning', () => {
			render(
				<Dropdown
					label="Country"
					options={countryOptions}
					warning
					className="custom-class"
					data-testid="dropdown-root"
				/>
			);
			expect(screen.getByTestId('dropdown-root')).toHaveClass('Input-warning', 'custom-class');
		});
	});

	describe('disabled state', () => {
		it('renders a disabled field', () => {
			render(<Dropdown label="Country" options={countryOptions} disabled />);
			expect(screen.getByRole('combobox', { name: 'Country' })).toHaveAttribute('aria-disabled', 'true');
		});
	});

	describe('full width', () => {
		it('renders full width', () => {
			render(<Dropdown label="Country" options={countryOptions} fullWidth data-testid="dropdown-root" />);
			expect(screen.getByTestId('dropdown-root')).toHaveClass('MuiFormControl-fullWidth');
		});
	});

	describe('required', () => {
		it('marks the field as required', () => {
			render(<Dropdown label="Country" options={countryOptions} required />);
			expect(screen.getByRole('combobox', { name: /Country/ })).toBeRequired();
		});
	});

	describe('options', () => {
		it('renders each option in the menu', async () => {
			render(<Dropdown label="Country" options={countryOptions} />);
			await userEvent.click(screen.getByRole('combobox', { name: 'Country' }));
			expect(screen.getByRole('option', { name: 'United States' })).toBeInTheDocument();
			expect(screen.getByRole('option', { name: 'Canada' })).toBeInTheDocument();
			expect(screen.getByRole('option', { name: 'Mexico' })).toBeInTheDocument();
		});

		it('renders a disabled option as disabled', async () => {
			render(<Dropdown label="Country" options={countryOptions} />);
			await userEvent.click(screen.getByRole('combobox', { name: 'Country' }));
			expect(screen.getByRole('option', { name: 'Mexico' })).toHaveAttribute('aria-disabled', 'true');
		});

		it('selects an option on click', async () => {
			const handleChange = jest.fn();
			render(<Dropdown label="Country" options={countryOptions} onChange={handleChange} />);
			await userEvent.click(screen.getByRole('combobox', { name: 'Country' }));
			await userEvent.click(screen.getByRole('option', { name: 'Canada' }));
			expect(handleChange).toHaveBeenCalledTimes(1);
			expect(screen.getByRole('combobox', { name: 'Country' })).toHaveTextContent('Canada');
		});
	});

	describe('children', () => {
		it('renders caller-supplied MenuItem children instead of options', async () => {
			render(
				<Dropdown label="Country" options={countryOptions}>
					<MenuItem value="us">USA</MenuItem>
				</Dropdown>
			);
			await userEvent.click(screen.getByRole('combobox', { name: 'Country' }));
			expect(screen.getByRole('option', { name: 'USA' })).toBeInTheDocument();
			expect(screen.queryByRole('option', { name: 'United States' })).not.toBeInTheDocument();
		});
	});

	describe('value', () => {
		it('renders with a default value', () => {
			render(<Dropdown label="Country" options={countryOptions} defaultValue="ca" />);
			expect(screen.getByRole('combobox', { name: 'Country' })).toHaveTextContent('Canada');
		});
	});
});
