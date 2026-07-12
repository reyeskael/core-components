import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import generatedTokens from '../../tokens/generated/tokens';
import { promotionCardStyles } from '../../theme/components/promotionCard';

export interface PromotionCardProps {
	/** URL of the background image. */
	imageUrl: string;
	/** Alt text for the background image. */
	imageAlt?: string;
	/** Title text displayed in the top-left of the card. */
	title: string;
	/** Label rendered inside the CTA button. */
	buttonLabel?: string;
	/** Callback fired when the CTA button is clicked. */
	onButtonClick?: () => void;
	/** Token set — defaults to the generated single-brand tokens. */
	tokens?: typeof generatedTokens;
}

export const PromotionCard = ({
	imageUrl,
	imageAlt = '',
	title,
	buttonLabel = 'Shop Now!',
	onButtonClick,
	tokens = generatedTokens,
}: PromotionCardProps) => {
	const s = promotionCardStyles(tokens);

	return (
		<Card
			sx={{
				position: 'relative',
				borderRadius: s.spacing.borderRadius,
				overflow: 'hidden',
				minHeight: s.spacing.minHeight,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'flex-start',
			}}
		>
			{/* Background image */}
			<CardMedia
				component="img"
				src={imageUrl}
				alt={imageAlt}
				sx={{
					position: 'absolute',
					inset: 0,
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					m: 0,
				}}
			/>

			{/* Darkening overlay for legibility */}
			<Box
				sx={{
					position: 'absolute',
					inset: 0,
					backgroundColor: s.overlay,
				}}
			/>

			{/* Content layer */}
			<Box
				sx={{
					position: 'relative',
					zIndex: 1,
					p: s.spacing.padding,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					gap: 1.5,
				}}
			>
				<Typography
					variant="h6"
					component="h2"
					sx={{
						color: s.titleText,
						fontWeight: 700,
						fontSize: s.spacing.titleFontSize,
						lineHeight: 1.3,
						textShadow: '0 1px 4px rgba(0,0,0,0.5)',
					}}
				>
					{title}
				</Typography>

				<Button
					variant="contained"
					color="error"
					onClick={onButtonClick}
					sx={{ fontWeight: 700 }}
				>
					{buttonLabel}
				</Button>
			</Box>
		</Card>
	);
};

PromotionCard.displayName = 'PromotionCard';
