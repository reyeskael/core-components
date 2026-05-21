import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { fn } from 'storybook/test';

import { Button } from './Button';

const meta = {
	title: 'Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'radio',
			options: [ 'text', 'outlined', 'contained' ],
			table: {
				defaultValue: {
					summary: 'text'
				}
			}
		},
		disabled: {
			control: 'boolean',
			table: {
				defaultValue: {
					summary: 'false'
				}
			}
		},
		color: {
			control: 'radio',
			options: [ 'inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning' ],
			table: {
				defaultValue: {
					summary: 'primary'
				}
			}
		}
	},
	args: {
		onClick: fn(),
		children: 'Button',
		disabled: false
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
	args: {
		variant: 'text'
	},
};

export const Outlined: Story = {
	args: {

		variant: 'outlined'
	},
};

export const Contained: Story = {
	args: {
		variant: 'contained'
	},
};
