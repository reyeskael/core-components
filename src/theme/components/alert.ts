import { Components } from '@mui/material/styles';
import type { Tokens } from '../../tokens/generated/tokens';

type AlertVariant = 'standard' | 'filled' | 'outlined';
type AlertSeverity = 'success' | 'info' | 'warning' | 'error';

export function muiAlert(tokens: Tokens): Components['MuiAlert'] {
	const variants = Object.keys(tokens.alert.component.variants) as AlertVariant[];
	const severities: AlertSeverity[] = ['success', 'info', 'warning', 'error'];

	const styleOverridesVariants = variants.reduce((acc, variant) => {
		severities.forEach((severity) => {
			const tokenPath = tokens.alert.component.variants[variant as keyof typeof tokens.alert.component.variants];
			
			if (tokenPath && severity in tokenPath) {
				const styles = (tokenPath as any)[severity];
				acc.push({
					props: { variant, severity },
					style: {
						backgroundColor: styles.backgroundColor,
						color: styles.color,
					},
				});
			}
		});
		return acc;
	}, [] as any[]);

	return {
		styleOverrides: {
			root: {
				padding: tokens.alert.component.root.padding,
				borderRadius: tokens.alert.component.root.borderRadius,
			},
		},
		variants: styleOverridesVariants,
	};
}
