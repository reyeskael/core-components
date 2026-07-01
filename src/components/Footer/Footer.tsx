import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SendIcon from '@mui/icons-material/Send';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import generatedTokens from '../../tokens/generated/tokens';
import { footerStyles } from '../../theme/components/footer';

export interface FooterLink {
	label: string;
	href: string;
}

export interface FooterLinkGroup {
	title: string;
	links: FooterLink[];
}

export type FooterContactItemType = 'location' | 'instagram' | 'twitter' | 'facebook' | 'email' | 'phone';

export interface FooterContactItem {
	type: FooterContactItemType;
	label: string;
	href?: string;
}

export interface FooterNewsletterConfig {
	title?: string;
	description?: string;
	placeholder?: string;
	buttonLabel?: string;
	privacyPolicyUrl?: string;
	privacyPolicyLabel?: string;
	onSubscribe: (email: string) => void;
}

export type PaymentMethod = 'visa' | 'mastercard' | 'paypal';

export interface FooterProps {
	logoUrl?: string;
	logoAlt?: string;
	contactInfo?: FooterContactItem[];
	linkGroups?: FooterLinkGroup[];
	newsletter?: FooterNewsletterConfig;
	copyright?: string;
	paymentMethods?: PaymentMethod[];
	tokens?: typeof generatedTokens;
}

const CONTACT_ICONS: Record<FooterContactItemType, React.ReactElement> = {
	location:  <LocationOnIcon fontSize="small" />,
	instagram: <InstagramIcon fontSize="small" />,
	twitter:   <TwitterIcon fontSize="small" />,
	facebook:  <FacebookIcon fontSize="small" />,
	email:     <EmailIcon fontSize="small" />,
	phone:     <PhoneIcon fontSize="small" />,
};

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
	visa:       'VISA',
	mastercard: 'MC',
	paypal:     'PayPal',
};

export const Footer = ({
	logoUrl,
	logoAlt = 'Logo',
	contactInfo,
	linkGroups = [],
	newsletter,
	copyright,
	paymentMethods,
	tokens = generatedTokens,
}: FooterProps) => {
	const s = footerStyles(tokens);
	const [email, setEmail] = useState('');
	const [agreed, setAgreed] = useState(false);

	const handleSubscribe = () => {
		if (newsletter?.onSubscribe) {
			newsletter.onSubscribe(email);
			setEmail('');
			setAgreed(false);
		}
	};

	const hasMainContent = (contactInfo && contactInfo.length > 0) || linkGroups.length > 0 || !!newsletter;

	return (
		<Box component="footer" sx={{ backgroundColor: s.background }}>
			{logoUrl && (
				<Box sx={{ textAlign: 'center', pt: s.padding.sectionY, pb: 3, borderBottom: `1px solid ${s.border}` }}>
					<Box
						component="img"
						src={logoUrl}
						alt={logoAlt}
						sx={{ maxHeight: 64, maxWidth: 200 }}
					/>
				</Box>
			)}

			{hasMainContent && (
				<Container maxWidth="lg" sx={{ py: s.padding.sectionY, px: s.padding.sectionX }}>
					<Grid container spacing={4}>
						{contactInfo && contactInfo.length > 0 && (
							<Grid size={{ xs: 12, sm: 6, md: 3 }}>
								<Stack spacing={1.5}>
									{contactInfo.map((item, i) => (
										<Stack key={i} direction="row" spacing={1} sx={{ alignItems: 'flex-start' }}>
											<Box sx={{ color: s.text.secondary, mt: '2px', flexShrink: 0 }}>
												{CONTACT_ICONS[item.type]}
											</Box>
											{item.href ? (
												<MuiLink
													href={item.href}
													underline="hover"
													sx={{ color: s.link.default, '&:hover': { color: s.link.hover }, fontSize: '0.875rem' }}
												>
													{item.label}
												</MuiLink>
											) : (
												<Typography variant="body2" sx={{ color: s.text.secondary }}>
													{item.label}
												</Typography>
											)}
										</Stack>
									))}
								</Stack>
							</Grid>
						)}

						{linkGroups.map((group, gi) => (
							<Grid key={gi} size={{ xs: 12, sm: 6, md: 2 }}>
								<Typography
									variant="subtitle1"
									sx={{ fontWeight: 700, color: s.text.primary, mb: 1.5 }}
								>
									{group.title}
								</Typography>
								<Stack spacing={1}>
									{group.links.map((link, li) => (
										<Stack key={li} direction="row" sx={{ alignItems: 'center' }}>
											<ChevronRightIcon sx={{ fontSize: 14, color: s.text.secondary, mr: 0.5 }} />
											<MuiLink
												href={link.href}
												underline="hover"
												sx={{ color: s.link.default, '&:hover': { color: s.link.hover }, fontSize: '0.875rem' }}
											>
												{link.label}
											</MuiLink>
										</Stack>
									))}
								</Stack>
							</Grid>
						))}

						{newsletter && (
							<Grid size={{ xs: 12, sm: 12, md: 3 }}>
								<Typography
									variant="subtitle1"
									sx={{ fontWeight: 700, color: s.text.primary, mb: 1, textAlign: 'center' }}
								>
									{newsletter.title ?? 'Newsletter'}
								</Typography>
								{newsletter.description && (
									<Typography
										variant="body2"
										sx={{ color: s.text.secondary, mb: 2, textAlign: 'center' }}
									>
										{newsletter.description}
									</Typography>
								)}
								<Stack direction="row" spacing={1} sx={{ mb: 1 }}>
									<TextField
										size="small"
										type="email"
										placeholder={newsletter.placeholder ?? 'Your email'}
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										sx={{ flex: 1 }}
										slotProps={{ input: { 'aria-label': 'Email address' } }}
									/>
									<Button
										variant="contained"
										size="small"
										endIcon={<SendIcon />}
										onClick={handleSubscribe}
										disabled={!email || !agreed}
									>
										{newsletter.buttonLabel ?? 'Send'}
									</Button>
								</Stack>
								{newsletter.privacyPolicyUrl && (
									<FormControlLabel
										control={
											<Checkbox
												size="small"
												checked={agreed}
												onChange={(e) => setAgreed(e.target.checked)}
											/>
										}
										label={
											<Typography variant="caption" sx={{ color: s.text.secondary }}>
												I have read and agree to the{' '}
												<MuiLink href={newsletter.privacyPolicyUrl} sx={{ color: s.link.default }}>
													{newsletter.privacyPolicyLabel ?? 'Privacy Policy'}
												</MuiLink>
											</Typography>
										}
									/>
								)}
							</Grid>
						)}
					</Grid>
				</Container>
			)}

			<Box
				sx={{
					backgroundColor: s.bottomBar.background,
					py: s.padding.bottomBarY,
					px: s.padding.sectionX,
				}}
			>
				<Container maxWidth="lg">
					<Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
						<Typography variant="caption" sx={{ color: s.bottomBar.text }}>
							{copyright}
						</Typography>
						{paymentMethods && paymentMethods.length > 0 && (
							<Stack direction="row" spacing={1}>
								{paymentMethods.map((method) => (
									<Box
										key={method}
										sx={{
											px: 1,
											py: 0.5,
											border: `1px solid ${s.bottomBar.text}`,
											borderRadius: '4px',
											color: s.bottomBar.text,
											fontSize: '0.7rem',
											fontWeight: 700,
											lineHeight: 1,
										}}
									>
										{PAYMENT_LABELS[method]}
									</Box>
								))}
							</Stack>
						)}
					</Stack>
				</Container>
			</Box>
		</Box>
	);
};
