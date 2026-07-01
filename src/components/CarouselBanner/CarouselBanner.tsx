import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import generatedTokens from '../../tokens/generated/tokens';
import { carouselBannerStyles } from '../../theme/components/carouselBanner';

export interface CarouselBannerSlide {
	imageUrl: string;
	imageAlt?: string;
	title?: string;
	subtitle?: string;
	ctaLabel?: string;
	onCtaClick?: () => void;
}

export interface CarouselBannerProps {
	slides: CarouselBannerSlide[];
	showArrows?: boolean;
	showDots?: boolean;
	autoplay?: boolean;
	autoplayInterval?: number;
	tokens?: typeof generatedTokens;
}

export const CarouselBanner = ({
	slides,
	showArrows = true,
	showDots = true,
	autoplay = false,
	autoplayInterval,
	tokens = generatedTokens,
}: CarouselBannerProps) => {
	const s = carouselBannerStyles(tokens);
	const interval = autoplayInterval ?? s.timing.autoplayInterval;
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

	useEffect(() => {
		if (!autoplay || isPaused || slides.length <= 1) return undefined;
		const id = setInterval(() => {
			setCurrentIndex((i) => (i + 1) % slides.length);
		}, interval);
		return () => clearInterval(id);
	}, [autoplay, isPaused, interval, slides.length]);

	if (slides.length === 0) return null;

	const slide = slides[currentIndex];
	const hasContent = Boolean(slide.title || slide.subtitle || slide.ctaLabel);

	const goToPrev = () => setCurrentIndex((i) => (i - 1 + slides.length) % slides.length);
	const goToNext = () => setCurrentIndex((i) => (i + 1) % slides.length);

	return (
		<Box
			role="region"
			aria-roledescription="carousel"
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
			sx={{
				position: 'relative',
				overflow: 'hidden',
				height: s.spacing.height,
				borderRadius: s.spacing.borderRadius,
				backgroundColor: s.surface,
			}}
		>
			<Box
				component="img"
				src={slide.imageUrl}
				alt={slide.imageAlt ?? ''}
				sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
			/>
			{hasContent && (
				<Box
					sx={{
						position: 'absolute',
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: s.overlay,
						px: s.spacing.contentPaddingX,
						py: s.spacing.contentPaddingY,
					}}
				>
					{slide.title && (
						<Typography variant="h4" sx={{ color: s.text.primary, fontWeight: 700 }}>
							{slide.title}
						</Typography>
					)}
					{slide.subtitle && (
						<Typography variant="body1" sx={{ color: s.text.secondary, mt: 0.5 }}>
							{slide.subtitle}
						</Typography>
					)}
					{slide.ctaLabel && (
						<Button variant="contained" onClick={slide.onCtaClick} sx={{ mt: 1.5 }}>
							{slide.ctaLabel}
						</Button>
					)}
				</Box>
			)}
			{showArrows && slides.length > 1 && (
				<>
					<IconButton
						aria-label="Previous slide"
						onClick={goToPrev}
						sx={{
							position: 'absolute',
							top: '50%',
							left: s.spacing.arrowOffset,
							transform: 'translateY(-50%)',
							backgroundColor: s.arrow.background,
							color: s.arrow.icon,
							'&:hover': { backgroundColor: s.arrow.backgroundHover },
						}}
					>
						<ArrowBackIosNewIcon fontSize="small" />
					</IconButton>
					<IconButton
						aria-label="Next slide"
						onClick={goToNext}
						sx={{
							position: 'absolute',
							top: '50%',
							right: s.spacing.arrowOffset,
							transform: 'translateY(-50%)',
							backgroundColor: s.arrow.background,
							color: s.arrow.icon,
							'&:hover': { backgroundColor: s.arrow.backgroundHover },
						}}
					>
						<ArrowForwardIosIcon fontSize="small" />
					</IconButton>
				</>
			)}
			{showDots && slides.length > 1 && (
				<Stack
					direction="row"
					spacing={s.spacing.dotGap}
					sx={{
						position: 'absolute',
						bottom: s.spacing.dotOffset,
						left: '50%',
						transform: 'translateX(-50%)',
					}}
				>
					{slides.map((_, index) => (
						<Box
							key={index}
							component="button"
							type="button"
							aria-label={`Go to slide ${index + 1}`}
							aria-current={index === currentIndex}
							onClick={() => setCurrentIndex(index)}
							sx={{
								width: s.spacing.dotSize,
								height: s.spacing.dotSize,
								borderRadius: '50%',
								border: 'none',
								p: 0,
								cursor: 'pointer',
								backgroundColor: index === currentIndex ? s.dot.active : s.dot.default,
							}}
						/>
					))}
				</Stack>
			)}
		</Box>
	);
};
