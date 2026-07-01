import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Footer } from './Footer';

const linkGroups = [
	{
		title: 'Customer Service',
		links: [
			{ label: 'Contact', href: '/contact' },
			{ label: 'Privacy Policy', href: '/privacy' },
		],
	},
	{
		title: 'My Account',
		links: [{ label: 'Order History', href: '/orders' }],
	},
];

const contactInfo = [
	{ type: 'location' as const, label: '123 Main St' },
	{ type: 'instagram' as const, label: '@acme', href: 'https://instagram.com/acme' },
];

const newsletter = {
	title: 'Newsletter',
	description: 'Stay up to date',
	privacyPolicyUrl: '/privacy',
	onSubscribe: jest.fn(),
};

describe('Footer', () => {
	beforeEach(() => jest.clearAllMocks());

	it('renders as a footer element', () => {
		const { container } = render(<Footer />);
		expect(container.querySelector('footer')).toBeInTheDocument();
	});

	describe('logo', () => {
		it('renders logo when logoUrl is provided', () => {
			render(<Footer logoUrl="https://example.com/logo.png" logoAlt="Acme" />);
			const img = screen.getByRole('img', { name: /acme/i });
			expect(img).toBeInTheDocument();
			expect(img).toHaveAttribute('src', 'https://example.com/logo.png');
		});

		it('does not render logo when logoUrl is omitted', () => {
			render(<Footer />);
			expect(screen.queryByRole('img')).not.toBeInTheDocument();
		});
	});

	describe('contact info', () => {
		it('renders contact items', () => {
			render(<Footer contactInfo={contactInfo} />);
			expect(screen.getByText('123 Main St')).toBeInTheDocument();
		});

		it('renders contact item as link when href is provided', () => {
			render(<Footer contactInfo={contactInfo} />);
			const link = screen.getByRole('link', { name: /@acme/i });
			expect(link).toHaveAttribute('href', 'https://instagram.com/acme');
		});

		it('renders contact item as plain text when href is absent', () => {
			render(<Footer contactInfo={contactInfo} />);
			expect(screen.getByText('123 Main St')).not.toHaveAttribute('href');
		});
	});

	describe('link groups', () => {
		it('renders all group titles', () => {
			render(<Footer linkGroups={linkGroups} />);
			expect(screen.getByText('Customer Service')).toBeInTheDocument();
			expect(screen.getByText('My Account')).toBeInTheDocument();
		});

		it('renders all links in each group', () => {
			render(<Footer linkGroups={linkGroups} />);
			expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/contact');
			expect(screen.getByRole('link', { name: /privacy policy/i })).toHaveAttribute('href', '/privacy');
			expect(screen.getByRole('link', { name: /order history/i })).toHaveAttribute('href', '/orders');
		});

		it('renders nothing when linkGroups is empty', () => {
			render(<Footer linkGroups={[]} />);
			expect(screen.queryByRole('link')).not.toBeInTheDocument();
		});
	});

	describe('newsletter', () => {
		it('renders newsletter title and description', () => {
			render(<Footer newsletter={newsletter} />);
			expect(screen.getByText('Newsletter')).toBeInTheDocument();
			expect(screen.getByText('Stay up to date')).toBeInTheDocument();
		});

		it('renders email input', () => {
			render(<Footer newsletter={newsletter} />);
			expect(screen.getByRole('textbox', { name: /email address/i })).toBeInTheDocument();
		});

		it('renders privacy policy checkbox when privacyPolicyUrl is provided', () => {
			render(<Footer newsletter={newsletter} />);
			expect(screen.getByRole('checkbox')).toBeInTheDocument();
		});

		it('send button is disabled until email is entered and checkbox checked', async () => {
			render(<Footer newsletter={newsletter} />);
			const button = screen.getByRole('button', { name: /send/i });
			expect(button).toBeDisabled();

			await userEvent.type(screen.getByRole('textbox', { name: /email address/i }), 'test@example.com');
			expect(button).toBeDisabled();

			await userEvent.click(screen.getByRole('checkbox'));
			expect(button).toBeEnabled();
		});

		it('calls onSubscribe with the email value when send is clicked', async () => {
			render(<Footer newsletter={newsletter} />);
			await userEvent.type(screen.getByRole('textbox', { name: /email address/i }), 'test@example.com');
			await userEvent.click(screen.getByRole('checkbox'));
			await userEvent.click(screen.getByRole('button', { name: /send/i }));
			expect(newsletter.onSubscribe).toHaveBeenCalledWith('test@example.com');
		});

		it('does not render newsletter section when newsletter prop is omitted', () => {
			render(<Footer />);
			expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
		});
	});

	describe('bottom bar', () => {
		it('renders copyright text', () => {
			render(<Footer copyright="© 2026 Acme Co." />);
			expect(screen.getByText('© 2026 Acme Co.')).toBeInTheDocument();
		});

		it('renders payment method badges', () => {
			render(<Footer paymentMethods={['visa', 'mastercard', 'paypal']} />);
			expect(screen.getByText('VISA')).toBeInTheDocument();
			expect(screen.getByText('MC')).toBeInTheDocument();
			expect(screen.getByText('PayPal')).toBeInTheDocument();
		});

		it('does not render payment badges when paymentMethods is omitted', () => {
			render(<Footer copyright="© 2026 Acme Co." />);
			expect(screen.queryByText('VISA')).not.toBeInTheDocument();
		});
	});
});
