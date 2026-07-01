import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import { ProductCard } from './ProductCard';

const meta = {
	title: 'Stories/ProductCard',
	component: ProductCard,
	tags: ['autodocs'],
	argTypes: {
		mode:              { control: 'radio', options: ['grid', 'list'] },
		imageUrl:          { control: 'text' },
		imageAlt:          { control: 'text' },
		name:              { control: 'text' },
		description:       { control: 'text' },
		price:             { control: 'number' },
		currencySymbol:    { control: 'text' },
		inStock:           { control: 'boolean' },
		quantity:          { control: 'number' },
		minQuantity:       { control: 'number' },
		maxQuantity:       { control: 'number' },
		addToCartLabel:    { control: 'text' },
		isFavorite:        { control: 'boolean' },
		questionLabel:     { control: 'text' },
		tags:              { table: { disable: true } },
		onQuantityChange:  { table: { disable: true } },
		onAddToCart:       { table: { disable: true } },
		onToggleFavorite:  { table: { disable: true } },
		onQuestionClick:   { table: { disable: true } },
		tokens:            { table: { disable: true } },
	},
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImage = 'https://placehold.co/300x300/EEEEEE/333333?text=Greek+Yogurt';

const StatefulProductCard = (props: React.ComponentProps<typeof ProductCard>) => {
	const [quantity, setQuantity] = useState(props.quantity ?? 1);
	const [isFavorite, setIsFavorite] = useState(props.isFavorite ?? false);

	return (
		<ProductCard
			{...props}
			quantity={quantity}
			onQuantityChange={setQuantity}
			isFavorite={isFavorite}
			onToggleFavorite={props.onToggleFavorite && (() => setIsFavorite((prev) => !prev))}
		/>
	);
};

export const Controls: Story = {
	render: (args) => <StatefulProductCard {...args} />,
	args: {
		mode: 'grid',
		imageUrl: sampleImage,
		imageAlt: 'Home-Made Greek Yogurt (1L)',
		tags: ['KETO'],
		name: 'Home-Made Greek Yogurt (1L)',
		price: 280,
		quantity: 1,
		onQuantityChange: fn(),
		onAddToCart: fn(),
	},
};

export const Grid: Story = {
	render: (args) => <StatefulProductCard {...args} />,
	args: {
		mode: 'grid',
		imageUrl: sampleImage,
		imageAlt: 'Home-Made Greek Yogurt (1L)',
		tags: ['KETO'],
		name: 'Home-Made Greek Yogurt (1L)',
		price: 280,
		quantity: 1,
		onQuantityChange: fn(),
		onAddToCart: fn(),
	},
};

export const List: Story = {
	render: (args) => <StatefulProductCard {...args} />,
	args: {
		mode: 'list',
		imageUrl: sampleImage,
		imageAlt: 'Home-Made Greek Yogurt (1L)',
		tags: ['KETO'],
		name: 'Home-Made Greek Yogurt (1L)',
		description:
			'Experience the pure, creamy goodness of our 1L Home-Made Greek Yogurt. Handcrafted with care, this authentic Greek yogurt is proudly made in the Philippines.',
		price: 280,
		inStock: true,
		quantity: 1,
		onQuantityChange: fn(),
		onAddToCart: fn(),
		isFavorite: false,
		onToggleFavorite: fn(),
		onQuestionClick: fn(),
	},
};

export const OutOfStock: Story = {
	render: (args) => <StatefulProductCard {...args} />,
	args: {
		mode: 'list',
		imageUrl: sampleImage,
		imageAlt: 'Home-Made Greek Yogurt (1L)',
		tags: ['KETO'],
		name: 'Home-Made Greek Yogurt (1L)',
		description: 'Currently unavailable while we restock. Check back soon!',
		price: 280,
		inStock: false,
		quantity: 1,
		onQuantityChange: fn(),
		onAddToCart: fn(),
	},
};

export const MultipleTags: Story = {
	render: (args) => <StatefulProductCard {...args} />,
	args: {
		mode: 'grid',
		imageUrl: sampleImage,
		imageAlt: 'Home-Made Greek Yogurt (1L)',
		tags: ['KETO', 'VEGAN'],
		name: 'Home-Made Greek Yogurt (1L)',
		price: 280,
		quantity: 2,
		maxQuantity: 10,
		onQuantityChange: fn(),
		onAddToCart: fn(),
	},
};
