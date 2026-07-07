import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Alert } from './Alert';
import { AlertTitle, Button, Stack } from '@mui/material';

const meta: Meta<typeof Alert> = {
	title: 'Stories/Alert',
	component: Alert,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['standard', 'filled', 'outlined'],
		},
		severity: {
			control: 'select',
			options: ['success', 'info', 'warning', 'error'],
		},
		action: { table: { disable: true } },
		children: { control: 'text' },
	},
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof Alert>;

export const Controls: Story = {
	args: {
		variant: 'standard',
		severity: 'success',
		children: 'This is a successful alert message passed via children.',
	},
};

export const WithTitleAndDescription: Story = {
	render: (args) => (
		<Alert {...args}>
			<AlertTitle>Success Alert</AlertTitle>
			This is a successful alert description built dynamically via children composition.
		</Alert>
	),
	args: {
		variant: 'standard',
		severity: 'success',
	},
};

export const AllSeverities: Story = {
	render: (args) => (
		<Stack spacing={2}>
			<Alert {...args} severity="success">
				<AlertTitle>Success</AlertTitle>
				This is a success message.
			</Alert>
			<Alert {...args} severity="info">
				<AlertTitle>Info</AlertTitle>
				This is an informational message.
			</Alert>
			<Alert {...args} severity="warning">
				<AlertTitle>Warning</AlertTitle>
				This is a warning message.
			</Alert>
			<Alert {...args} severity="error">
				<AlertTitle>Error</AlertTitle>
				This is an error message.
			</Alert>
		</Stack>
	),
};

export const WithAction: Story = {
	args: {
		severity: 'warning',
		action: <Button size="small" color="inherit">UNDO</Button>,
		children: 'This alert has an actionable panel option on the side.',
	},
};
