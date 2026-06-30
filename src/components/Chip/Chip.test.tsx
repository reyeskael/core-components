import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Chip } from './Chip';

describe('Chip', () => {
	it('renders with default props', () => {
		render(<Chip label="Test Chip" />);
		expect(screen.getByText('Test Chip')).toBeInTheDocument();
	});

	it('applies MuiChip-root class', () => {
		const { container } = render(<Chip label="Root" />);
		expect(container.querySelector('.MuiChip-root')).toBeInTheDocument();
	});

	describe('variants', () => {
		it('renders filled variant', () => {
			const { container } = render(<Chip label="Filled" variant="filled" />);
			expect(container.querySelector('.MuiChip-filled')).toBeInTheDocument();
		});

		it('renders outlined variant', () => {
			const { container } = render(<Chip label="Outlined" variant="outlined" />);
			expect(container.querySelector('.MuiChip-outlined')).toBeInTheDocument();
		});
	});

	describe('colors', () => {
		it('renders default color', () => {
			const { container } = render(<Chip label="Default" color="default" />);
			expect(container.querySelector('.MuiChip-colorDefault')).toBeInTheDocument();
		});

		it('renders primary color', () => {
			const { container } = render(<Chip label="Primary" color="primary" />);
			expect(container.querySelector('.MuiChip-colorPrimary')).toBeInTheDocument();
		});

		it('renders secondary color', () => {
			const { container } = render(<Chip label="Secondary" color="secondary" />);
			expect(container.querySelector('.MuiChip-colorSecondary')).toBeInTheDocument();
		});

		it('renders error color', () => {
			const { container } = render(<Chip label="Error" color="error" />);
			expect(container.querySelector('.MuiChip-colorError')).toBeInTheDocument();
		});
	});

	describe('sizes', () => {
		it('renders small size', () => {
			const { container } = render(<Chip label="Small" size="small" />);
			expect(container.querySelector('.MuiChip-sizeSmall')).toBeInTheDocument();
		});

		it('renders medium size', () => {
			const { container } = render(<Chip label="Medium" size="medium" />);
			expect(container.querySelector('.MuiChip-sizeMedium')).toBeInTheDocument();
		});
	});

	describe('delete icon', () => {
		it('renders delete icon when onDelete is provided', () => {
			const handleDelete = jest.fn();
			const { container } = render(<Chip label="Deletable" onDelete={handleDelete} />);
			expect(container.querySelector('.MuiChip-deleteIcon')).toBeInTheDocument();
		});

		it('does not render delete icon when onDelete is not provided', () => {
			const { container } = render(<Chip label="No Delete" />);
			expect(container.querySelector('.MuiChip-deleteIcon')).not.toBeInTheDocument();
		});

		it('calls onDelete when delete icon is clicked', async () => {
			const handleDelete = jest.fn();
			const { container } = render(<Chip label="Deletable" onDelete={handleDelete} />);
			const deleteIcon = container.querySelector('.MuiChip-deleteIcon') as HTMLElement;
			await userEvent.click(deleteIcon);
			expect(handleDelete).toHaveBeenCalledTimes(1);
		});
	});

	describe('disabled state', () => {
		it('renders disabled chip', () => {
			const { container } = render(<Chip label="Disabled" disabled />);
			expect(container.querySelector('.Mui-disabled')).toBeInTheDocument();
		});
	});

	describe('click events', () => {
		it('calls onClick handler when clicked', async () => {
			const handleClick = jest.fn();
			render(<Chip label="Clickable" onClick={handleClick} />);
			const chip = screen.getByText('Clickable').closest('.MuiChip-root') as HTMLElement;
			await userEvent.click(chip);
			expect(handleClick).toHaveBeenCalledTimes(1);
		});
	});

	describe('label', () => {
		it('renders the label text', () => {
			render(<Chip label="My Tag" />);
			expect(screen.getByText('My Tag')).toBeInTheDocument();
		});

		it('renders a label with special characters', () => {
			render(<Chip label="Tag & Filter #1" />);
			expect(screen.getByText('Tag & Filter #1')).toBeInTheDocument();
		});
	});
});
