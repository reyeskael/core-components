import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Stepper } from './Stepper';

const defaultSteps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

const meta = {
	title: 'Stories/Stepper',
	component: Stepper,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		activeStep: {
			control: { type: 'number', min: 0, max: 3 },
			table: {
				defaultValue: {
					summary: '0'
				}
			}
		},
		orientation: {
			control: 'radio',
			options: ['horizontal', 'vertical'],
			table: {
				defaultValue: {
					summary: 'horizontal'
				}
			}
		},
		alternativeLabel: {
			control: 'boolean',
			table: {
				defaultValue: {
					summary: 'false'
				}
			}
		},
		steps: {
			control: 'object'
		}
	},
	args: {
		steps: defaultSteps,
		activeStep: 1,
		alternativeLabel: false,
		orientation: 'horizontal'
	}
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Controls: Story = {};

export const AlternativeLabel: Story = {
	args: {
		alternativeLabel: true,
		activeStep: 1,
	}
};

export const Vertical: Story = {
	args: {
		orientation: 'vertical',
		activeStep: 1,
	}
};

export const Completed: Story = {
	args: {
		activeStep: 3,
	}
};
