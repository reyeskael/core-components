import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './Accordion';

describe('Accordion', () => {
	it('renders with default props', () => {
		render(<Accordion summary="Question">Answer</Accordion>);
		expect(screen.getByText('Question')).toBeInTheDocument();
		expect(screen.getByText('Answer')).toBeInTheDocument();
	});

	it('renders the MUI accordion classes', () => {
		render(<Accordion summary="Question">Answer</Accordion>);
		const button = screen.getByRole('button', { name: /question/i });
		expect(button.closest('.MuiAccordion-root')).toBeInTheDocument();
		expect(button).toHaveClass('MuiAccordionSummary-root');
	});

	describe('expand/collapse behavior', () => {
		it('is collapsed by default', () => {
			render(<Accordion summary="Question">Answer</Accordion>);
			const button = screen.getByRole('button', { name: /question/i });
			expect(button).toHaveAttribute('aria-expanded', 'false');
		});

		it('expands when clicked', async () => {
			render(<Accordion summary="Question">Answer</Accordion>);
			const button = screen.getByRole('button', { name: /question/i });
			await userEvent.click(button);
			expect(button).toHaveAttribute('aria-expanded', 'true');
		});

		it('collapses again when clicked twice', async () => {
			render(<Accordion summary="Question">Answer</Accordion>);
			const button = screen.getByRole('button', { name: /question/i });
			await userEvent.click(button);
			await userEvent.click(button);
			expect(button).toHaveAttribute('aria-expanded', 'false');
		});

		it('renders expanded by default when defaultExpanded is set', () => {
			render(
				<Accordion summary="Question" defaultExpanded>
					Answer
				</Accordion>
			);
			const button = screen.getByRole('button', { name: /question/i });
			expect(button).toHaveAttribute('aria-expanded', 'true');
		});
	});

	describe('disabled state', () => {
		it('renders a disabled summary button', () => {
			render(
				<Accordion summary="Question" disabled>
					Answer
				</Accordion>
			);
			const button = screen.getByRole('button', { name: /question/i });
			expect(button).toBeDisabled();
		});
	});

	describe('controlled expanded state', () => {
		it('reflects the expanded prop', () => {
			render(
				<Accordion summary="Question" expanded onChange={() => {}}>
					Answer
				</Accordion>
			);
			const button = screen.getByRole('button', { name: /question/i });
			expect(button).toHaveAttribute('aria-expanded', 'true');
		});

		it('calls onChange when clicked', async () => {
			const handleChange = jest.fn();
			render(
				<Accordion summary="Question" expanded={false} onChange={handleChange}>
					Answer
				</Accordion>
			);
			const button = screen.getByRole('button', { name: /question/i });
			await userEvent.click(button);
			expect(handleChange).toHaveBeenCalledTimes(1);
		});
	});

	describe('children', () => {
		it('renders element children in the details region', () => {
			render(
				<Accordion summary="Question">
					<span>Detailed answer</span>
				</Accordion>
			);
			expect(screen.getByText('Detailed answer')).toBeInTheDocument();
		});

		it('renders element summary content', () => {
			render(<Accordion summary={<strong>Bold question</strong>}>Answer</Accordion>);
			expect(screen.getByText('Bold question')).toBeInTheDocument();
		});
	});
});
