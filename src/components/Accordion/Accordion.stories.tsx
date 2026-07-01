import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Stack } from '@mui/material';

import { Accordion } from './Accordion';

const meta = {
	title: 'Stories/Accordion',
	component: Accordion,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		disabled: {
			control: 'boolean',
			table: {
				defaultValue: {
					summary: 'false'
				}
			}
		},
		defaultExpanded: {
			control: 'boolean',
			table: {
				defaultValue: {
					summary: 'false'
				}
			}
		},
		summary: { table: { disable: true } },
		children: { table: { disable: true } },
	},
	args: {
		summary: 'What is your return policy?',
		children: 'You can return any item within 30 days of purchase for a full refund.',
		disabled: false,
	}
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Controls: Story = {}

export const FAQList: Story = {
	argTypes: {
		summary: { table: { disable: true } },
		children: { table: { disable: true } },
	},
	render: ({ ...args }) => (
		<div className="storybook-container">
			<Stack spacing={1} sx={{ width: 400 }}>
				<Accordion { ...args } summary="What is your return policy?">
					You can return any item within 30 days of purchase for a full refund.
				</Accordion>
				<Accordion { ...args } summary="Do you ship internationally?">
					Yes, we ship to most countries worldwide. Shipping costs vary by destination.
				</Accordion>
				<Accordion { ...args } summary="How can I track my order?">
					Once your order ships, you will receive a tracking number via email.
				</Accordion>
			</Stack>
		</div>
	),
};

export const DefaultExpanded: Story = {
	args: {
		defaultExpanded: true,
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
