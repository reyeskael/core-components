import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductCard } from './ProductCard';

const baseProps = {
	imageUrl: 'https://example.com/yogurt.png',
	name: 'Home-Made Greek Yogurt (1L)',
	price: 280,
	quantity: 1,
	onQuantityChange: jest.fn(),
	onAddToCart: jest.fn(),
};

describe('ProductCard', () => {
	beforeEach(() => jest.clearAllMocks());

	it('renders the product name and formatted price', () => {
		render(<ProductCard {...baseProps} />);
		expect(screen.getByText('Home-Made Greek Yogurt (1L)')).toBeInTheDocument();
		expect(screen.getByText('₱280.00')).toBeInTheDocument();
	});

	it('renders a custom currency symbol', () => {
		render(<ProductCard {...baseProps} currencySymbol="$" />);
		expect(screen.getByText('$280.00')).toBeInTheDocument();
	});

	describe('grid mode', () => {
		it('renders the add to cart button', () => {
			render(<ProductCard {...baseProps} mode="grid" />);
			expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
		});

		it('does not render list-only elements', () => {
			render(<ProductCard {...baseProps} mode="grid" inStock onToggleFavorite={jest.fn()} onQuestionClick={jest.fn()} />);
			expect(screen.queryByText(/stock:/i)).not.toBeInTheDocument();
			expect(screen.queryByLabelText(/favorites/i)).not.toBeInTheDocument();
			expect(screen.queryByText('Question')).not.toBeInTheDocument();
		});
	});

	describe('list mode', () => {
		it('renders the description', () => {
			render(<ProductCard {...baseProps} mode="list" description="Creamy and delicious." />);
			expect(screen.getByText('Creamy and delicious.')).toBeInTheDocument();
		});

		it('renders in-stock status', () => {
			render(<ProductCard {...baseProps} mode="list" inStock />);
			expect(screen.getByText('Stock: In Stock')).toBeInTheDocument();
		});

		it('renders out-of-stock status', () => {
			render(<ProductCard {...baseProps} mode="list" inStock={false} />);
			expect(screen.getByText('Stock: Out of Stock')).toBeInTheDocument();
		});

		it('does not render stock status when inStock is omitted', () => {
			render(<ProductCard {...baseProps} mode="list" />);
			expect(screen.queryByText(/stock:/i)).not.toBeInTheDocument();
		});

		it('renders the favorite button when onToggleFavorite is provided', async () => {
			const onToggleFavorite = jest.fn();
			render(<ProductCard {...baseProps} mode="list" onToggleFavorite={onToggleFavorite} />);
			const favoriteButton = screen.getByRole('button', { name: /add to favorites/i });
			await userEvent.click(favoriteButton);
			expect(onToggleFavorite).toHaveBeenCalledTimes(1);
		});

		it('does not render the favorite button when onToggleFavorite is omitted', () => {
			render(<ProductCard {...baseProps} mode="list" />);
			expect(screen.queryByLabelText(/favorites/i)).not.toBeInTheDocument();
		});

		it('reflects isFavorite in the accessible name', () => {
			render(<ProductCard {...baseProps} mode="list" isFavorite onToggleFavorite={jest.fn()} />);
			expect(screen.getByRole('button', { name: /remove from favorites/i })).toBeInTheDocument();
		});

		it('renders the question link when onQuestionClick is provided', async () => {
			const onQuestionClick = jest.fn();
			render(<ProductCard {...baseProps} mode="list" onQuestionClick={onQuestionClick} questionLabel="Ask us" />);
			await userEvent.click(screen.getByText('Ask us'));
			expect(onQuestionClick).toHaveBeenCalledTimes(1);
		});
	});

	describe('tags', () => {
		it('renders each tag as a badge', () => {
			render(<ProductCard {...baseProps} tags={['KETO', 'VEGAN']} />);
			expect(screen.getByText('KETO')).toBeInTheDocument();
			expect(screen.getByText('VEGAN')).toBeInTheDocument();
		});

		it('renders no badges when tags is omitted', () => {
			render(<ProductCard {...baseProps} />);
			expect(screen.queryByText('KETO')).not.toBeInTheDocument();
		});
	});

	describe('quantity stepper', () => {
		it('renders the current quantity', () => {
			render(<ProductCard {...baseProps} quantity={3} />);
			expect(screen.getByText('3')).toBeInTheDocument();
		});

		it('increments quantity', async () => {
			const onQuantityChange = jest.fn();
			render(<ProductCard {...baseProps} quantity={1} onQuantityChange={onQuantityChange} />);
			await userEvent.click(screen.getByRole('button', { name: /increase quantity/i }));
			expect(onQuantityChange).toHaveBeenCalledWith(2);
		});

		it('decrements quantity', async () => {
			const onQuantityChange = jest.fn();
			render(<ProductCard {...baseProps} quantity={2} onQuantityChange={onQuantityChange} />);
			await userEvent.click(screen.getByRole('button', { name: /decrease quantity/i }));
			expect(onQuantityChange).toHaveBeenCalledWith(1);
		});

		it('does not go below minQuantity', () => {
			render(<ProductCard {...baseProps} quantity={1} minQuantity={1} />);
			expect(screen.getByRole('button', { name: /decrease quantity/i })).toBeDisabled();
		});

		it('does not go above maxQuantity', () => {
			render(<ProductCard {...baseProps} quantity={5} maxQuantity={5} />);
			expect(screen.getByRole('button', { name: /increase quantity/i })).toBeDisabled();
		});
	});

	describe('add to cart', () => {
		it('calls onAddToCart when clicked', async () => {
			const onAddToCart = jest.fn();
			render(<ProductCard {...baseProps} onAddToCart={onAddToCart} />);
			await userEvent.click(screen.getByRole('button', { name: /add to cart/i }));
			expect(onAddToCart).toHaveBeenCalledTimes(1);
		});

		it('renders a custom label', () => {
			render(<ProductCard {...baseProps} addToCartLabel="Buy Now" />);
			expect(screen.getByRole('button', { name: /buy now/i })).toBeInTheDocument();
		});
	});
});
