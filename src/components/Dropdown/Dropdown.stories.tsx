import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Stack, MenuItem } from '@mui/material';

import { fn } from 'storybook/test';

import { Dropdown } from './Dropdown';

const countryOptions = [
	{ label: 'United States', value: 'us' },
	{ label: 'Canada', value: 'ca' },
	{ label: 'Mexico', value: 'mx' },
	{ label: 'Unavailable region', value: 'xx', disabled: true },
];

const meta = {
	title: 'Stories/Dropdown',
	component: Dropdown,
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
		options: { table: { disable: true } },
		onChange: { table: { disable: true } },
	},
	args: {
		onChange: fn(),
		label: 'Country',
		options: countryOptions,
		defaultValue: 'us',
		disabled: false,
		fullWidth: false,
		error: false,
		warning: false,
		required: false,
	}
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Controls: Story = {}

export const Variants: Story = {
	argTypes: {
		variant: { table: { disable: true } },
	},
	render: ({ ...args }) => (
		<div className="storybook-container">
			<Dropdown { ...args } variant="outlined" label="Outlined" />
			<Dropdown { ...args } variant="filled" label="Filled" />
			<Dropdown { ...args } variant="standard" label="Standard" />
		</div>
	),
};

export const WithChildren: Story = {
	args: {
		options: undefined,
	},
	render: ({ options: _options, ...args }) => (
		<Dropdown { ...args } label="Country">
			<MenuItem value="us">United States</MenuItem>
			<MenuItem value="ca">Canada</MenuItem>
			<MenuItem value="mx">Mexico</MenuItem>
		</Dropdown>
	),
};

export const HelperTextAndError: Story = {
	render: ({ ...args }) => (
		<Stack spacing={2}>
			<Dropdown { ...args } label="Country" helperText="Choose your country of residence." />
			<Dropdown
				{ ...args }
				label="Country"
				warning
				defaultValue="mx"
				helperText="Shipping to this region may be delayed."
			/>
			<Dropdown
				{ ...args }
				label="Country"
				error
				defaultValue={undefined}
				helperText="Please select a country."
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
			<Dropdown { ...args } size="small" label="Small" />
			<Dropdown { ...args } size="medium" label="Medium" />
		</Stack>
	),
};

export const DisabledAndRequired: Story = {
	render: ({ ...args }) => (
		<Stack direction="row" spacing={2}>
			<Dropdown { ...args } label="Disabled" disabled />
			<Dropdown { ...args } label="Required" required defaultValue="" />
		</Stack>
	),
};
