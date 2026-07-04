import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Stack } from '@mui/material';

import { fn } from 'storybook/test';

import { Input } from './Input';

const meta = {
	title: 'Stories/Input',
	component: Input,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'radio',
			options: [ 'outlined', 'filled', 'standard' ],
			table: {
				defaultValue: {
					summary: 'outlined'
				}
			}
		},
		label: {
			control: 'text',
		},
		placeholder: {
			control: 'text',
		},
		helperText: {
			control: 'text',
		},
		error: {
			control: 'boolean',
			table: {
				defaultValue: {
					summary: 'false'
				}
			}
		},
		warning: {
			control: 'boolean',
			table: {
				defaultValue: {
					summary: 'false'
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
		required: {
			control: 'boolean',
			table: {
				defaultValue: {
					summary: 'false'
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
			options: [ 'small', 'medium' ],
			table: {
				defaultValue: {
					summary: 'medium'
				}
			}
		},
		children: { table: { disable: true } },
		onChange: { table: { disable: true } },
	},
	args: {
		onChange: fn(),
		label: 'Label',
		placeholder: 'Placeholder',
		disabled: false,
		fullWidth: false,
		error: false,
		warning: false,
		required: false,
	}
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Controls: Story = {}

export const Variants: Story = {
	argTypes: {
		variant: { table: { disable: true } },
	},
	render: ({ ...args }) => (
		<div className="storybook-container">
			<Input { ...args } variant="outlined" label="Outlined" />
			<Input { ...args } variant="filled" label="Filled" />
			<Input { ...args } variant="standard" label="Standard" />
		</div>
	),
};

export const HelperTextAndError: Story = {
	render: ({ ...args }) => (
		<Stack spacing={2}>
			<Input { ...args } label="Email" helperText="We'll never share your email." />
			<Input
				{ ...args }
				label="Email"
				warning
				defaultValue="jane@company"
				helperText="This domain looks unusual — double check it."
			/>
			<Input
				{ ...args }
				label="Email"
				error
				defaultValue="not-an-email"
				helperText="Enter a valid email address."
			/>
		</Stack>
	),
};

export const Sizes: Story = {
	argTypes: {
		size: { table: { disable: true } },
	},
	render: ({ ...args }) => (
		<Stack spacing={2}>
			<Input { ...args } size="small" label="Small" />
			<Input { ...args } size="medium" label="Medium" />
		</Stack>
	),
};

export const DisabledAndRequired: Story = {
	render: ({ ...args }) => (
		<Stack direction="row" spacing={2}>
			<Input { ...args } label="Disabled" disabled defaultValue="Can't edit this" />
			<Input { ...args } label="Required" required />
		</Stack>
	),
};
