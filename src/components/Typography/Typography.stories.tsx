import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Stack } from '@mui/material';

import { Typography } from './Typography';

const meta = {
	title: 'Stories/Typography',
	component: Typography,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'overline'],
			table: {
				defaultValue: { summary: 'body1' },
			},
		},
		align: {
			control: 'radio',
			options: ['left', 'center', 'right', 'justify'],
			table: {
				defaultValue: { summary: 'left' },
			},
		},
		gutterBottom: {
			control: 'boolean',
			table: {
				defaultValue: { summary: 'false' },
			},
		},
		noWrap: {
			control: 'boolean',
			table: {
				defaultValue: { summary: 'false' },
			},
		},
		children: { table: { disable: true } },
	},
	args: {
		children: 'The quick brown fox jumps over the lazy dog',
	},
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Controls: Story = {
	args: {
		variant: 'body1',
	},
};

export const TypeScale: Story = {
	argTypes: {
		variant: { table: { disable: true } },
	},
	render: ({ ...args }) => (
		<Stack spacing={2} sx={{ maxWidth: 600 }}>
			<Typography {...args} variant="h1">h1 — Heading Display</Typography>
			<Typography {...args} variant="h2">h2 — Heading Large</Typography>
			<Typography {...args} variant="h3">h3 — Heading Medium</Typography>
			<Typography {...args} variant="h4">h4 — Heading Small</Typography>
			<Typography {...args} variant="h5">h5 — Heading XSmall</Typography>
			<Typography {...args} variant="h6">h6 — Heading XXSmall</Typography>
			<Typography {...args} variant="subtitle1">subtitle1 — Label Medium</Typography>
			<Typography {...args} variant="subtitle2">subtitle2 — Label Small</Typography>
			<Typography {...args} variant="body1">body1 — Body Regular</Typography>
			<Typography {...args} variant="body2">body2 — Body Small</Typography>
			<Typography {...args} variant="caption">caption — Caption</Typography>
			<Typography {...args} variant="overline">overline — Overline</Typography>
		</Stack>
	),
};

export const Headings: Story = {
	argTypes: {
		variant: { table: { disable: true } },
	},
	render: ({ ...args }) => (
		<Stack spacing={1}>
			<Typography {...args} variant="h1">Heading 1</Typography>
			<Typography {...args} variant="h2">Heading 2</Typography>
			<Typography {...args} variant="h3">Heading 3</Typography>
			<Typography {...args} variant="h4">Heading 4</Typography>
			<Typography {...args} variant="h5">Heading 5</Typography>
			<Typography {...args} variant="h6">Heading 6</Typography>
		</Stack>
	),
};

export const Body: Story = {
	argTypes: {
		variant: { table: { disable: true } },
	},
	render: ({ ...args }) => (
		<Stack spacing={2} sx={{ maxWidth: 480 }}>
			<Typography {...args} variant="body1">
				body1 — Regular body text used for paragraphs and general content.
				The quick brown fox jumps over the lazy dog.
			</Typography>
			<Typography {...args} variant="body2">
				body2 — Small body text used for secondary content and descriptions.
				The quick brown fox jumps over the lazy dog.
			</Typography>
			<Typography {...args} variant="caption">
				caption — Smallest text for labels and footnotes.
			</Typography>
			<Typography {...args} variant="overline">
				overline — Used above headings for category labels
			</Typography>
		</Stack>
	),
};
