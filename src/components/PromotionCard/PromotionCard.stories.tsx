import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import { PromotionCard } from './PromotionCard';

const meta = {
	title: 'Stories/PromotionCard',
	component: PromotionCard,
	tags: ['autodocs'],
	argTypes: {
		imageUrl:      { control: 'text' },
		imageAlt:      { control: 'text' },
		title:         { control: 'text' },
		buttonLabel:   { control: 'text' },
		onButtonClick: { table: { disable: true } },
		tokens:        { table: { disable: true } },
	},
} satisfies Meta<typeof PromotionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImage =
	'https://placehold.co/800x300/0EA5E9/FFFFFF?text=Promotion';

export const Controls: Story = {
	args: {
		imageUrl: sampleImage,
		imageAlt: 'Promotional banner',
		title: "Assassin's Creed Black Flag Resynced",
		buttonLabel: 'Shop Now!',
		onButtonClick: fn(),
	},
};

export const ShopNow: Story = {
	args: {
		imageUrl: sampleImage,
		imageAlt: 'Promotional banner',
		title: "Assassin's Creed Black Flag Resynced",
		buttonLabel: 'Shop Now!',
		onButtonClick: fn(),
	},
};

export const CustomLabel: Story = {
	args: {
		imageUrl: sampleImage,
		imageAlt: 'Sale banner',
		title: '50% Off — This Weekend Only!',
		buttonLabel: 'Grab the Deal',
		onButtonClick: fn(),
	},
};

export const LongTitle: Story = {
	args: {
		imageUrl: sampleImage,
		imageAlt: 'Product launch banner',
		title: 'Introducing Our Brand-New Summer Collection — Available Now',
		buttonLabel: 'Explore Collection',
		onButtonClick: fn(),
	},
};

export const NoButton: Story = {
	args: {
		imageUrl: sampleImage,
		imageAlt: 'Announcement banner',
		title: 'Store Closed on Public Holidays — See You Next Week!',
	},
};
