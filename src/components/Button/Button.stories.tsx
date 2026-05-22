import type { Meta, StoryObj } from '@storybook/react-webpack5';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';

import { fn } from 'storybook/test';

import { Button } from './Button';
import { Stack } from '@mui/material';

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
		onClick: { table: { disable: true } },
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

export const Controls: Story = {}

export const BasicButtons: Story = {
	argTypes: {
		variant: { table: { disable: true } },
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
	render: ({ ...args }) => (
		<div className="storybook-container">
			<Button variant="outlined" { ...args } startIcon={<DeleteIcon />}>Delete</Button>
			<Button variant="outlined" { ...args } endIcon={<SendIcon />}>Send</Button>
		</div>
	),
};

export const Loading: Story = {
	argTypes: {
		loading: {
			control: 'boolean',
		},
		disabled: { table: { disable: true } },
		fullWidth: { table: { disable: true } },
	},
	args: {
		loading: true
	},
	render: ({ ...args }) => (
		<div className="storybook-container">
			<Stack spacing={2}>
				<Stack direction="row" spacing={2}>
					<Button
						variant="outlined"
						{ ...args }
					>Submit</Button>
					<Button
						variant="outlined"
						{ ...args }
						loadingIndicator="Loading..."
					>Submit</Button>
					<Button
						variant="outlined"
						{ ...args }
						loadingPosition="start"
						startIcon={<SaveIcon />}
					>
						Save
					</Button>
				</Stack>
				<Button
					variant="outlined"
					{ ...args }
					fullWidth
					loadingPosition="start"
					startIcon={<SaveIcon />}
				>
					Full width
				</Button>
				<Button
					variant="outlined"
					{ ...args }
					fullWidth
					loadingPosition="end"
					endIcon={<SaveIcon />}
				>
					Full width
				</Button>
				<Stack direction="row" spacing={2}>
					<Button variant="outlined" { ...args } loadingPosition="start">
						Submit
					</Button>
					<Button variant="outlined" { ...args } loadingPosition="end">
						Submit
					</Button>
					<Button
						variant="outlined"
						{ ...args }
						loadingPosition="end"
						startIcon={<SaveIcon />}
					>
						Save
					</Button>
				</Stack>
			</Stack>
		</div>
	),
};
