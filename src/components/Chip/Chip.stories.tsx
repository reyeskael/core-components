import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import { Stack } from '@mui/material';

import { Chip } from './Chip';

const meta = {
	title: 'Stories/Chip',
	component: Chip,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		label: {
			control: 'text',
		},
		variant: {
			control: 'radio',
			options: ['filled', 'outlined'],
			table: {
				defaultValue: {
					summary: 'filled',
				},
			},
		},
		color: {
			control: 'radio',
			options: ['default', 'primary', 'secondary', 'error'],
			table: {
				defaultValue: {
					summary: 'default',
				},
			},
		},
		size: {
			control: 'radio',
			options: ['small', 'medium'],
			table: {
				defaultValue: {
					summary: 'medium',
				},
			},
		},
		disabled: {
			control: 'boolean',
			table: {
				defaultValue: {
					summary: 'false',
				},
			},
		},
		onDelete: { table: { disable: true } },
		onClick: { table: { disable: true } },
		deleteIcon: { table: { disable: true } },
		avatar: { table: { disable: true } },
		icon: { table: { disable: true } },
	},
	args: {
		label: 'Chip',
		variant: 'filled',
		color: 'default',
		size: 'medium',
		disabled: false,
		onClick: fn(),
	},
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Controls: Story = {};

export const Variants: Story = {
	argTypes: {
		variant: { table: { disable: true } },
	},
	render: ({ ...args }) => (
		<div className="storybook-container">
			<Chip {...args} variant="filled" label="Filled" />
			<Chip {...args} variant="outlined" label="Outlined" />
		</div>
	),
};

export const Colors: Story = {
	argTypes: {
		color: { table: { disable: true } },
	},
	render: ({ ...args }) => (
		<Stack spacing={2}>
			<Stack direction="row" spacing={1}>
				<Chip {...args} color="default" label="Default" />
				<Chip {...args} color="primary" label="Primary" />
				<Chip {...args} color="secondary" label="Secondary" />
				<Chip {...args} color="error" label="Error" />
			</Stack>
			<Stack direction="row" spacing={1}>
				<Chip {...args} variant="outlined" color="default" label="Default" />
				<Chip {...args} variant="outlined" color="primary" label="Primary" />
				<Chip {...args} variant="outlined" color="secondary" label="Secondary" />
				<Chip {...args} variant="outlined" color="error" label="Error" />
			</Stack>
		</Stack>
	),
};

export const Sizes: Story = {
	argTypes: {
		size: { table: { disable: true } },
	},
	render: ({ ...args }) => (
		<div className="storybook-container">
			<Chip {...args} size="small" label="Small" />
			<Chip {...args} size="medium" label="Medium" />
		</div>
	),
};

export const Deletable: Story = {
	args: {
		onDelete: fn(),
	},
	argTypes: {
		onDelete: { table: { disable: false } },
	},
	render: ({ ...args }) => (
		<Stack direction="row" spacing={1}>
			<Chip {...args} label="Default" color="default" />
			<Chip {...args} label="Primary" color="primary" />
			<Chip {...args} label="Secondary" color="secondary" />
			<Chip {...args} label="Error" color="error" />
		</Stack>
	),
};
