import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import { CarouselBanner } from './CarouselBanner';

const meta = {
	title: 'Stories/CarouselBanner',
	component: CarouselBanner,
	tags: ['autodocs'],
	argTypes: {
		showArrows:       { control: 'boolean' },
		showDots:         { control: 'boolean' },
		autoplay:         { control: 'boolean' },
		autoplayInterval: { control: 'number' },
		slides:           { table: { disable: true } },
		tokens:           { table: { disable: true } },
	},
} satisfies Meta<typeof CarouselBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

const slides = [
	{
		imageUrl: 'https://placehold.co/1200x400/128C7E/FFFFFF?text=Summer+Sale',
		imageAlt: 'Summer Sale',
		title: 'Summer Sale',
		subtitle: 'Up to 50% off on selected items',
		ctaLabel: 'Shop Now',
		onCtaClick: fn(),
	},
	{
		imageUrl: 'https://placehold.co/1200x400/FFD600/000000?text=New+Arrivals',
		imageAlt: 'New Arrivals',
		title: 'New Arrivals',
		subtitle: 'Check out the latest additions to our catalog',
		ctaLabel: 'Explore',
		onCtaClick: fn(),
	},
	{
		imageUrl: 'https://placehold.co/1200x400/333333/FFFFFF?text=Free+Shipping',
		imageAlt: 'Free Shipping',
		title: 'Free Shipping',
		subtitle: 'On all orders over ₱1,000',
		ctaLabel: 'Learn More',
		onCtaClick: fn(),
	},
];

export const Controls: Story = {
	args: {
		slides,
		showArrows: true,
		showDots: true,
		autoplay: false,
	},
};

export const Autoplay: Story = {
	args: {
		slides,
		showArrows: true,
		showDots: true,
		autoplay: true,
		autoplayInterval: 3000,
	},
};

export const NoArrows: Story = {
	args: {
		slides,
		showArrows: false,
		showDots: true,
	},
};

export const NoDots: Story = {
	args: {
		slides,
		showArrows: true,
		showDots: false,
	},
};

export const ImageOnly: Story = {
	args: {
		slides: slides.map(({ imageUrl, imageAlt }) => ({ imageUrl, imageAlt })),
		showArrows: true,
		showDots: true,
	},
};
