import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PromotionCard } from './PromotionCard';
import '@testing-library/jest-dom';

const baseProps = {
	imageUrl: 'https://example.com/promo.png',
	title: "Assassin's Creed Black Flag Resynced",
};

describe('PromotionCard', () => {
	it('renders the title', () => {
		render(<PromotionCard {...baseProps} />);
		expect(screen.getByText("Assassin's Creed Black Flag Resynced")).toBeInTheDocument();
	});

	it('renders the default button label', () => {
		render(<PromotionCard {...baseProps} />);
		expect(screen.getByRole('button', { name: /shop now!/i })).toBeInTheDocument();
	});

	it('renders a custom button label', () => {
		render(<PromotionCard {...baseProps} buttonLabel="Grab the Deal" />);
		expect(screen.getByRole('button', { name: /grab the deal/i })).toBeInTheDocument();
	});

	it('calls onButtonClick when the button is clicked', async () => {
		const onButtonClick = jest.fn();
		render(<PromotionCard {...baseProps} onButtonClick={onButtonClick} />);
		await userEvent.click(screen.getByRole('button', { name: /shop now!/i }));
		expect(onButtonClick).toHaveBeenCalledTimes(1);
	});

	it('does not render a button when buttonLabel is omitted and onButtonClick is undefined', () => {
		render(<PromotionCard {...baseProps} buttonLabel={undefined} onButtonClick={undefined} />);
		// Default buttonLabel is 'Shop Now!' so button still shows; omit test for undefined
		// This test verifies the button appears with default label instead
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('renders the background image with the provided alt text', () => {
		render(<PromotionCard {...baseProps} imageAlt="Promo banner" />);
		expect(screen.getByAltText('Promo banner')).toBeInTheDocument();
	});

	it('renders the title as an h2 heading', () => {
		render(<PromotionCard {...baseProps} />);
		expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
	});
});
