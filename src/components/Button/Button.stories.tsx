import type { Meta, StoryObj } from '@storybook/react-webpack5';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

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
		},
		fullWidth: {
			control: 'boolean',
			table: {
				defaultValue: {
					summary: 'false'
				}
			}
		},
		size: {
			control: 'radio',
			options: [ 'small', 'medium', 'large' ],
			table: {
				defaultValue: {
					summary: 'medium'
				}
			}
		},
		children: { table: { disable: true } },
	},
	args: {
		onClick: fn(),
		children: 'Button',
		disabled: false,
		fullWidth: false,
	}
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Controls: Story = {
	argTypes: {
		onClick: { table: { disable: true } },
	},
}

export const BasicButtons: Story = {
	argTypes: {
		variant: { table: { disable: true } },
		onClick: { table: { disable: true } },
	},
	render: ({ ...args }) => (
		<div className="storybook-container">
			<Button { ...args } variant="text">Text</Button>
			<Button { ...args } variant="outlined">Outlined</Button>
			<Button { ...args } variant="contained">Contained</Button>
		</div>
	),
};

export const ButtonsWithIcons: Story = {
	argTypes: {
		variant: { table: { disable: true } },
		onClick: { table: { disable: true } },
	},
	render: ({ ...args }) => (
		<div className="storybook-container">
			<Button { ...args } variant="outlined" startIcon={<DeleteIcon />}>Delete</Button>
			<Button { ...args } variant="contained" endIcon={<SendIcon />}>Send</Button>
		</div>
	),
};
