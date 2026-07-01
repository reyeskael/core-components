import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import MuiLink from '@mui/material/Link';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlineOutlined';
import generatedTokens from '../../tokens/generated/tokens';
import { productCardStyles } from '../../theme/components/productCard';

export type ProductCardMode = 'grid' | 'list';

export interface ProductCardProps {
	mode?: ProductCardMode;
	imageUrl: string;
	imageAlt?: string;
	tags?: string[];
	name: string;
	description?: string;
	price: number;
	currencySymbol?: string;
	inStock?: boolean;
	quantity: number;
	onQuantityChange: (quantity: number) => void;
	minQuantity?: number;
	maxQuantity?: number;
	onAddToCart: () => void;
	addToCartLabel?: string;
	isFavorite?: boolean;
	onToggleFavorite?: () => void;
	onQuestionClick?: () => void;
	questionLabel?: string;
	tokens?: typeof generatedTokens;
}

interface QuantityStepperProps {
	quantity: number;
	onQuantityChange: (quantity: number) => void;
	minQuantity: number;
	maxQuantity?: number;
	borderColor: string;
	borderRadius: string;
}

const QuantityStepper = ({
	quantity,
	onQuantityChange,
	minQuantity,
	maxQuantity,
	borderColor,
	borderRadius,
}: QuantityStepperProps) => {
	const decrement = () => onQuantityChange(Math.max(minQuantity, quantity - 1));
	const increment = () =>
		onQuantityChange(maxQuantity !== undefined ? Math.min(maxQuantity, quantity + 1) : quantity + 1);

	return (
		<Stack
			direction="row"
			sx={{ border: `1px solid ${borderColor}`, borderRadius, overflow: 'hidden' }}
		>
			<Typography sx={{ width: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				{quantity}
			</Typography>
			<Stack sx={{ borderLeft: `1px solid ${borderColor}` }}>
				<IconButton
					size="small"
					aria-label="Increase quantity"
					onClick={increment}
					disabled={maxQuantity !== undefined && quantity >= maxQuantity}
					sx={{ borderRadius: 0, p: '2px' }}
				>
					<KeyboardArrowUpIcon fontSize="inherit" />
				</IconButton>
				<IconButton
					size="small"
					aria-label="Decrease quantity"
					onClick={decrement}
					disabled={quantity <= minQuantity}
					sx={{ borderRadius: 0, p: '2px' }}
				>
					<KeyboardArrowDownIcon fontSize="inherit" />
				</IconButton>
			</Stack>
		</Stack>
	);
};

export const ProductCard = ({
	mode = 'grid',
	imageUrl,
	imageAlt = '',
	tags,
	name,
	description,
	price,
	currencySymbol = '₱',
	inStock,
	quantity,
	onQuantityChange,
	minQuantity = 1,
	maxQuantity,
	onAddToCart,
	addToCartLabel = 'Add to Cart',
	isFavorite = false,
	onToggleFavorite,
	onQuestionClick,
	questionLabel = 'Question',
	tokens = generatedTokens,
}: ProductCardProps) => {
	const s = productCardStyles(tokens);
	const formattedPrice = `${currencySymbol}${price.toFixed(2)}`;

	const badges = tags && tags.length > 0 && (
		<Stack direction="row" spacing={0.5}>
			{tags.map((tag) => (
				<Chip key={tag} label={tag} color="secondary" size="small" />
			))}
		</Stack>
	);

	const stepper = (
		<QuantityStepper
			quantity={quantity}
			onQuantityChange={onQuantityChange}
			minQuantity={minQuantity}
			maxQuantity={maxQuantity}
			borderColor={s.border}
			borderRadius={s.spacing.borderRadius}
		/>
	);

	if (mode === 'list') {
		return (
			<Card sx={{ display: 'flex', backgroundColor: s.surface, borderRadius: s.spacing.borderRadius }}>
				<Box sx={{ position: 'relative', flexShrink: 0 }}>
					<CardMedia
						component="img"
						src={imageUrl}
						alt={imageAlt}
						sx={{ width: s.spacing.listImageSize, height: '100%', minHeight: s.spacing.listImageSize, objectFit: 'cover', display: 'block', m: 0 }}
					/>
					{badges && (
						<Box sx={{ position: 'absolute', top: s.spacing.badgeOffset, left: s.spacing.badgeOffset }}>
							{badges}
						</Box>
					)}
				</Box>
				<CardContent sx={{ flex: 1 }}>
					{inStock !== undefined && (
						<Typography
							variant="caption"
							sx={{ display: 'block', color: inStock ? s.stock.inStock : s.stock.outOfStock, fontWeight: 600 }}
						>
							Stock: {inStock ? 'In Stock' : 'Out of Stock'}
						</Typography>
					)}
					<Typography variant="h6" sx={{ color: s.text.primary }}>
						{name}
					</Typography>
					{description && (
						<Typography variant="body2" sx={{ color: s.text.secondary, mt: 0.5 }}>
							{description}
						</Typography>
					)}
					<Typography variant="subtitle1" sx={{ color: s.text.primary, fontWeight: 700, mt: 1 }}>
						{formattedPrice}
					</Typography>
					<Stack direction="row" spacing={1} sx={{ alignItems: 'center', mt: 1.5 }}>
						{stepper}
						<Button variant="contained" startIcon={<ShoppingCartIcon />} onClick={onAddToCart}>
							{addToCartLabel}
						</Button>
						{onToggleFavorite && (
							<IconButton
								onClick={onToggleFavorite}
								aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
							>
								{isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
							</IconButton>
						)}
					</Stack>
					{onQuestionClick && (
						<Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', mt: 1 }}>
							<HelpOutlineIcon fontSize="small" sx={{ color: s.text.secondary }} />
							<MuiLink
								component="button"
								type="button"
								onClick={onQuestionClick}
								sx={{ color: s.text.secondary }}
							>
								{questionLabel}
							</MuiLink>
						</Stack>
					)}
				</CardContent>
			</Card>
		);
	}

	return (
		<Card sx={{ width: s.spacing.gridWidth, backgroundColor: s.surface, borderRadius: s.spacing.borderRadius }}>
			<Box sx={{ position: 'relative' }}>
				<CardMedia
					component="img"
					src={imageUrl}
					alt={imageAlt}
					sx={{ height: s.spacing.gridImageHeight, objectFit: 'cover', display: 'block', width: '100%', m: 0 }}
				/>
				{badges && (
					<Box sx={{ position: 'absolute', top: s.spacing.badgeOffset, right: s.spacing.badgeOffset }}>
						{badges}
					</Box>
				)}
			</Box>
			<CardContent sx={{ textAlign: 'center' }}>
				<Typography variant="subtitle1" sx={{ color: s.text.primary, fontWeight: 600 }}>
					{name}
				</Typography>
				<Typography variant="subtitle1" sx={{ color: s.text.primary, fontWeight: 700, mt: 0.5 }}>
					{formattedPrice}
				</Typography>
			</CardContent>
			<CardActions sx={{ px: 2, pb: 2, gap: s.spacing.contentGap }}>
				{stepper}
				<Button variant="contained" fullWidth onClick={onAddToCart} sx={{ flex: 1 }}>
					{addToCartLabel}
				</Button>
			</CardActions>
		</Card>
	);
};
