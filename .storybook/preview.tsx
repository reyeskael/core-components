import type { Preview } from '@storybook/react-webpack5'
import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import theme from '../src/theme'
import './preview.css'

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
			color: /(background|color)$/i,
			date: /Date$/i,
			},
		},
	},
	decorators: [
		(Story) => (
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Story />
			</ThemeProvider>
		),
	],
};

export default preview;