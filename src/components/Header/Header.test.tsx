import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';

describe('Header', () => {
	it('renders with default props', () => {
		render(<Header />);
		const header = screen.getByRole('banner');
		expect(header).toBeInTheDocument();
		expect(screen.getByText('Acme')).toBeInTheDocument();
	});

	describe('unauthenticated state', () => {
		it('renders login and signup buttons when user is not logged in', () => {
			render(<Header />);
			const loginButton = screen.getByRole('button', { name: /log in/i });
			const signupButton = screen.getByRole('button', { name: /sign up/i });
			expect(loginButton).toBeInTheDocument();
			expect(signupButton).toBeInTheDocument();
		});

		it('does not show welcome message when user is not logged in', () => {
			render(<Header />);
			expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
		});
	});

	describe('authenticated state', () => {
		it('renders welcome message with user name when logged in', () => {
			render(<Header user={{ name: 'John Doe' }} />);
			expect(screen.getByText(/welcome/i)).toBeInTheDocument();
			expect(screen.getByText('John Doe')).toBeInTheDocument();
		});

		it('renders logout button when user is logged in', () => {
			render(<Header user={{ name: 'John Doe' }} />);
			const logoutButton = screen.getByRole('button', { name: /log out/i });
			expect(logoutButton).toBeInTheDocument();
		});

		it('does not render login and signup buttons when user is logged in', () => {
			render(<Header user={{ name: 'John Doe' }} />);
			expect(screen.queryByRole('button', { name: /log in/i })).not.toBeInTheDocument();
			expect(screen.queryByRole('button', { name: /sign up/i })).not.toBeInTheDocument();
		});
	});

	describe('click events', () => {
		it('calls onLogin when login button is clicked', async () => {
			const handleLogin = jest.fn();
			render(<Header onLogin={handleLogin} />);
			const loginButton = screen.getByRole('button', { name: /log in/i });
			await userEvent.click(loginButton);
			expect(handleLogin).toHaveBeenCalledTimes(1);
		});

		it('calls onCreateAccount when signup button is clicked', async () => {
			const handleCreateAccount = jest.fn();
			render(<Header onCreateAccount={handleCreateAccount} />);
			const signupButton = screen.getByRole('button', { name: /sign up/i });
			await userEvent.click(signupButton);
			expect(handleCreateAccount).toHaveBeenCalledTimes(1);
		});

		it('calls onLogout when logout button is clicked', async () => {
			const handleLogout = jest.fn();
			render(<Header user={{ name: 'John Doe' }} onLogout={handleLogout} />);
			const logoutButton = screen.getByRole('button', { name: /log out/i });
			await userEvent.click(logoutButton);
			expect(handleLogout).toHaveBeenCalledTimes(1);
		});
	});

	describe('logo', () => {
		it('renders logo image when logoUrl is provided', () => {
			render(<Header logoUrl="https://example.com/logo.png" />);
			const img = screen.getByRole('img', { name: /logo/i });
			expect(img).toBeInTheDocument();
			expect(img).toHaveAttribute('src', 'https://example.com/logo.png');
		});

		it('renders no logo when logoUrl is not provided', () => {
			render(<Header />);
			expect(screen.queryByRole('img', { name: /logo/i })).not.toBeInTheDocument();
		});
	});

	describe('button sizes', () => {
		it('renders buttons with small size', () => {
			render(<Header user={{ name: 'John Doe' }} />);
			const logoutButton = screen.getByRole('button', { name: /log out/i });
			expect(logoutButton).toHaveClass('MuiButton-sizeSmall');
		});

		it('renders login and signup buttons with small size', () => {
			render(<Header />);
			const loginButton = screen.getByRole('button', { name: /log in/i });
			const signupButton = screen.getByRole('button', { name: /sign up/i });
			expect(loginButton).toHaveClass('MuiButton-sizeSmall');
			expect(signupButton).toHaveClass('MuiButton-sizeSmall');
		});
	});

	describe('user name rendering', () => {
		it('renders different user names correctly', () => {
			const { rerender } = render(<Header user={{ name: 'Alice' }} />);
			expect(screen.getByText('Alice')).toBeInTheDocument();

			rerender(<Header user={{ name: 'Bob' }} />);
			expect(screen.getByText('Bob')).toBeInTheDocument();
		});
	});
});
