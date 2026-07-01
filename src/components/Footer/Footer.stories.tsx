import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import { Footer } from './Footer';

const meta = {
	title: 'Stories/Footer',
	component: Footer,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	argTypes: {
		logoUrl:        { control: 'text' },
		logoAlt:        { control: 'text' },
		copyright:      { control: 'text' },
		contactInfo:    { table: { disable: true } },
		linkGroups:     { table: { disable: true } },
		newsletter:     { table: { disable: true } },
		paymentMethods: { table: { disable: true } },
		tokens:         { table: { disable: true } },
	},
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleLinkGroups = [
	{
		title: 'Support',
		links: [
			{ label: 'Help Center', href: '#' },
			{ label: 'Contact Us', href: '#' },
			{ label: 'Privacy Policy', href: '#' },
			{ label: 'Terms of Service', href: '#' },
		],
	},
	{
		title: 'Company',
		links: [
			{ label: 'About Us', href: '#' },
			{ label: 'Careers', href: '#' },
			{ label: 'Blog', href: '#' },
		],
	},
	{
		title: 'Product',
		links: [
			{ label: 'Features', href: '#' },
			{ label: 'Pricing', href: '#' },
			{ label: 'Changelog', href: '#' },
		],
	},
];

const sampleContactInfo = [
	{ type: 'location' as const, label: '123 Main Street, Suite 400, New York, NY 10001' },
	{ type: 'email' as const, label: 'hello@example.com', href: 'mailto:hello@example.com' },
	{ type: 'instagram' as const, label: '@exampleco', href: '#' },
	{ type: 'twitter' as const, label: '@exampleco', href: '#' },
];

const sampleNewsletter = {
	title: 'Stay in the loop',
	description: 'Get product updates and announcements delivered to your inbox.',
	placeholder: 'you@example.com',
	buttonLabel: 'Subscribe',
	privacyPolicyUrl: '#',
	privacyPolicyLabel: 'Privacy Policy',
	onSubscribe: fn(),
};

export const Controls: Story = {
	args: {
		copyright: '© 2026 Example Corp. All rights reserved.',
		linkGroups: sampleLinkGroups,
		paymentMethods: ['visa', 'mastercard', 'paypal'],
	},
};

export const Full: Story = {
	args: {
		contactInfo: sampleContactInfo,
		linkGroups: sampleLinkGroups,
		newsletter: sampleNewsletter,
		copyright: '© 2026 Example Corp. All rights reserved.',
		paymentMethods: ['visa', 'mastercard', 'paypal'],
	},
};

export const WithLogo: Story = {
	args: {
		logoUrl: 'https://placehold.co/160x56/128C7E/FFFFFF?text=Logo',
		logoAlt: 'Example Corp',
		contactInfo: sampleContactInfo,
		linkGroups: sampleLinkGroups,
		newsletter: sampleNewsletter,
		copyright: '© 2026 Example Corp. All rights reserved.',
		paymentMethods: ['visa', 'mastercard', 'paypal'],
	},
};

export const LinksOnly: Story = {
	args: {
		linkGroups: sampleLinkGroups,
		copyright: '© 2026 Example Corp. All rights reserved.',
	},
};

export const NewsletterOnly: Story = {
	args: {
		newsletter: sampleNewsletter,
		copyright: '© 2026 Example Corp. All rights reserved.',
	},
};

export const MinimalBottomBar: Story = {
	args: {
		copyright: '© 2026 Example Corp. All rights reserved.',
		paymentMethods: ['visa', 'mastercard', 'paypal'],
	},
};
