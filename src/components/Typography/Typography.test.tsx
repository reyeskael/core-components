import { render, screen } from '@testing-library/react';
import { Typography } from './Typography';

describe('Typography', () => {
	it('renders with default props', () => {
		render(<Typography>Hello world</Typography>);
		expect(screen.getByText('Hello world')).toBeInTheDocument();
	});

	describe('variants', () => {
		const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'overline'] as const;

		variants.forEach((variant) => {
			it(`renders ${variant} variant`, () => {
				render(<Typography variant={variant}>{variant} text</Typography>);
				expect(screen.getByText(`${variant} text`)).toBeInTheDocument();
			});
		});
	});

	describe('MUI class application', () => {
		it('applies MuiTypography-root class', () => {
			const { container } = render(<Typography>Text</Typography>);
			expect(container.firstChild).toHaveClass('MuiTypography-root');
		});

		it('applies variant-specific class for h1', () => {
			const { container } = render(<Typography variant="h1">Heading</Typography>);
			expect(container.firstChild).toHaveClass('MuiTypography-h1');
		});

		it('applies variant-specific class for body2', () => {
			const { container } = render(<Typography variant="body2">Body</Typography>);
			expect(container.firstChild).toHaveClass('MuiTypography-body2');
		});
	});

	describe('html element mapping', () => {
		it('renders h1 variant as <h1> tag', () => {
			const { container } = render(<Typography variant="h1">Heading</Typography>);
			expect(container.querySelector('h1')).toBeInTheDocument();
		});

		it('renders body1 variant as <p> tag', () => {
			const { container } = render(<Typography variant="body1">Body</Typography>);
			expect(container.querySelector('p')).toBeInTheDocument();
		});
	});

	describe('children', () => {
		it('renders text children', () => {
			render(<Typography>Plain text</Typography>);
			expect(screen.getByText('Plain text')).toBeInTheDocument();
		});

		it('renders element children', () => {
			render(
				<Typography>
					<span>Nested</span> content
				</Typography>
			);
			expect(screen.getByText('Nested')).toBeInTheDocument();
			expect(screen.getByText('content')).toBeInTheDocument();
		});
	});

	describe('alignment', () => {
		it('applies center alignment', () => {
			const { container } = render(<Typography align="center">Centered</Typography>);
			expect(container.firstChild).toHaveClass('MuiTypography-alignCenter');
		});
	});

	describe('gutterBottom', () => {
		it('applies gutterBottom class', () => {
			const { container } = render(<Typography gutterBottom>Text</Typography>);
			expect(container.firstChild).toHaveClass('MuiTypography-gutterBottom');
		});
	});
});
