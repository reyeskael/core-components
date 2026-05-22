import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Page } from './Page';

describe('Page', () => {
	it('renders page content', () => {
		render(<Page />);
		expect(screen.getByText(/pages in storybook/i)).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /component-driven/i })).toBeInTheDocument();
	});

	describe('header integration', () => {
		it('renders header component', () => {
			render(<Page />);
			const header = screen.getByRole('banner');
			expect(header).toBeInTheDocument();
			expect(screen.getByText('Acme')).toBeInTheDocument();
		});

		it('initially shows header in unauthenticated state', () => {
			render(<Page />);
			const loginButton = screen.getByRole('button', { name: /log in/i });
			const signupButton = screen.getByRole('button', { name: /sign up/i });
			expect(loginButton).toBeInTheDocument();
			expect(signupButton).toBeInTheDocument();
		});
	});

	describe('login flow', () => {
		it('shows welcome message after clicking login button', async () => {
			render(<Page />);
			const loginButton = screen.getByRole('button', { name: /log in/i });
			await userEvent.click(loginButton);
			expect(screen.getByText(/welcome/i)).toBeInTheDocument();
			expect(screen.getByText('Jane Doe')).toBeInTheDocument();
		});

		it('updates header to authenticated state after login', async () => {
			render(<Page />);
			const loginButton = screen.getByRole('button', { name: /log in/i });
			await userEvent.click(loginButton);
			expect(screen.queryByRole('button', { name: /log in/i })).not.toBeInTheDocument();
			expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
		});
	});

	describe('signup flow', () => {
		it('shows welcome message after clicking signup button', async () => {
			render(<Page />);
			const signupButton = screen.getByRole('button', { name: /sign up/i });
			await userEvent.click(signupButton);
			expect(screen.getByText(/welcome/i)).toBeInTheDocument();
			expect(screen.getByText('Jane Doe')).toBeInTheDocument();
		});

		it('updates header to authenticated state after signup', async () => {
			render(<Page />);
			const signupButton = screen.getByRole('button', { name: /sign up/i });
			await userEvent.click(signupButton);
			expect(screen.queryByRole('button', { name: /sign up/i })).not.toBeInTheDocument();
			expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
		});
	});

	describe('logout flow', () => {
		it('hides welcome message after clicking logout', async () => {
			render(<Page />);
			const signupButton = screen.getByRole('button', { name: /sign up/i });
			await userEvent.click(signupButton);
			expect(screen.getByText(/welcome/i)).toBeInTheDocument();
			expect(screen.getByText('Jane Doe')).toBeInTheDocument();

			const logoutButton = screen.getByRole('button', { name: /log out/i });
			await userEvent.click(logoutButton);
			expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
		});

		it('shows login and signup buttons again after logout', async () => {
			render(<Page />);
			const signupButton = screen.getByRole('button', { name: /sign up/i });
			await userEvent.click(signupButton);

			const logoutButton = screen.getByRole('button', { name: /log out/i });
			await userEvent.click(logoutButton);
			expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
			expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
		});
	});

	describe('page links', () => {
		it('renders link to component-driven development', () => {
			render(<Page />);
			const link = screen.getByRole('link', { name: /component-driven/i });
			expect(link).toHaveAttribute('href', 'https://componentdriven.org');
			expect(link).toHaveAttribute('target', '_blank');
		});

		it('renders link to storybook tutorials', () => {
			render(<Page />);
			const link = screen.getByRole('link', { name: /storybook tutorials/i });
			expect(link).toHaveAttribute('href', 'https://storybook.js.org/tutorials/');
			expect(link).toHaveAttribute('target', '_blank');
		});

		it('renders link to storybook docs', () => {
			render(<Page />);
			const link = screen.getByRole('link', { name: /docs/i });
			expect(link).toHaveAttribute('href', 'https://storybook.js.org/docs');
			expect(link).toHaveAttribute('target', '_blank');
		});
	});

	describe('page sections', () => {
		it('renders main article element', () => {
			const { container } = render(<Page />);
			const article = container.querySelector('article');
			expect(article).toBeInTheDocument();
		});

		it('renders storybook page section', () => {
			const { container } = render(<Page />);
			const section = container.querySelector('.storybook-page');
			expect(section).toBeInTheDocument();
		});

		it('renders tip about viewport addon', () => {
			render(<Page />);
			expect(screen.getByText(/viewports addon in the toolbar/i)).toBeInTheDocument();
		});
	});

	describe('sequential interactions', () => {
		it('handles multiple login and logout cycles', async () => {
			render(<Page />);

			// First login cycle
			const signupButton = screen.getByRole('button', { name: /sign up/i });
			await userEvent.click(signupButton);
			expect(screen.getByText(/welcome/i)).toBeInTheDocument();
			expect(screen.getByText('Jane Doe')).toBeInTheDocument();

			// Logout
			let logoutButton = screen.getByRole('button', { name: /log out/i });
			await userEvent.click(logoutButton);
			expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();

			// Login again
			const loginButton = screen.getByRole('button', { name: /log in/i });
			await userEvent.click(loginButton);
			expect(screen.getByText(/welcome/i)).toBeInTheDocument();
			expect(screen.getByText('Jane Doe')).toBeInTheDocument();

			// Logout again
			logoutButton = screen.getByRole('button', { name: /log out/i });
			await userEvent.click(logoutButton);
			expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
		});
	});
});
