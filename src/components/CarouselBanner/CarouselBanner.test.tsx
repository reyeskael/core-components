import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CarouselBanner } from './CarouselBanner';

const slides = [
	{ imageUrl: 'https://example.com/1.png', imageAlt: 'Slide 1', title: 'First Slide', subtitle: 'First subtitle' },
	{ imageUrl: 'https://example.com/2.png', imageAlt: 'Slide 2', title: 'Second Slide', subtitle: 'Second subtitle' },
	{ imageUrl: 'https://example.com/3.png', imageAlt: 'Slide 3', title: 'Third Slide', subtitle: 'Third subtitle' },
];

describe('CarouselBanner', () => {
	it('renders nothing when there are no slides', () => {
		const { container } = render(<CarouselBanner slides={[]} />);
		expect(container).toBeEmptyDOMElement();
	});

	it('renders the first slide by default', () => {
		render(<CarouselBanner slides={slides} />);
		expect(screen.getByAltText('Slide 1')).toBeInTheDocument();
		expect(screen.getByText('First Slide')).toBeInTheDocument();
		expect(screen.getByText('First subtitle')).toBeInTheDocument();
	});

	it('renders a call-to-action button when ctaLabel is provided', () => {
		const onCtaClick = jest.fn();
		render(
			<CarouselBanner
				slides={[{ imageUrl: 'https://example.com/1.png', ctaLabel: 'Shop Now', onCtaClick }]}
			/>
		);
		expect(screen.getByRole('button', { name: 'Shop Now' })).toBeInTheDocument();
	});

	it('calls onCtaClick when the call-to-action button is clicked', async () => {
		const onCtaClick = jest.fn();
		render(
			<CarouselBanner
				slides={[{ imageUrl: 'https://example.com/1.png', ctaLabel: 'Shop Now', onCtaClick }]}
			/>
		);
		await userEvent.click(screen.getByRole('button', { name: 'Shop Now' }));
		expect(onCtaClick).toHaveBeenCalledTimes(1);
	});

	describe('arrow navigation', () => {
		it('advances to the next slide', async () => {
			render(<CarouselBanner slides={slides} />);
			await userEvent.click(screen.getByRole('button', { name: /next slide/i }));
			expect(screen.getByText('Second Slide')).toBeInTheDocument();
		});

		it('wraps to the first slide after the last', async () => {
			render(<CarouselBanner slides={slides} />);
			await userEvent.click(screen.getByRole('button', { name: /next slide/i }));
			await userEvent.click(screen.getByRole('button', { name: /next slide/i }));
			await userEvent.click(screen.getByRole('button', { name: /next slide/i }));
			expect(screen.getByText('First Slide')).toBeInTheDocument();
		});

		it('goes back to the previous slide', async () => {
			render(<CarouselBanner slides={slides} />);
			await userEvent.click(screen.getByRole('button', { name: /next slide/i }));
			await userEvent.click(screen.getByRole('button', { name: /previous slide/i }));
			expect(screen.getByText('First Slide')).toBeInTheDocument();
		});

		it('wraps to the last slide when going back from the first', async () => {
			render(<CarouselBanner slides={slides} />);
			await userEvent.click(screen.getByRole('button', { name: /previous slide/i }));
			expect(screen.getByText('Third Slide')).toBeInTheDocument();
		});

		it('hides arrows when showArrows is false', () => {
			render(<CarouselBanner slides={slides} showArrows={false} />);
			expect(screen.queryByRole('button', { name: /next slide/i })).not.toBeInTheDocument();
			expect(screen.queryByRole('button', { name: /previous slide/i })).not.toBeInTheDocument();
		});

		it('hides arrows for a single slide', () => {
			render(<CarouselBanner slides={[slides[0]]} />);
			expect(screen.queryByRole('button', { name: /next slide/i })).not.toBeInTheDocument();
		});
	});

	describe('dot indicators', () => {
		it('renders one dot per slide', () => {
			render(<CarouselBanner slides={slides} />);
			expect(screen.getByRole('button', { name: 'Go to slide 1' })).toBeInTheDocument();
			expect(screen.getByRole('button', { name: 'Go to slide 2' })).toBeInTheDocument();
			expect(screen.getByRole('button', { name: 'Go to slide 3' })).toBeInTheDocument();
		});

		it('jumps to the clicked slide', async () => {
			render(<CarouselBanner slides={slides} />);
			await userEvent.click(screen.getByRole('button', { name: 'Go to slide 3' }));
			expect(screen.getByText('Third Slide')).toBeInTheDocument();
		});

		it('marks the current slide dot as active', async () => {
			render(<CarouselBanner slides={slides} />);
			await userEvent.click(screen.getByRole('button', { name: 'Go to slide 2' }));
			expect(screen.getByRole('button', { name: 'Go to slide 2' })).toHaveAttribute('aria-current', 'true');
			expect(screen.getByRole('button', { name: 'Go to slide 1' })).toHaveAttribute('aria-current', 'false');
		});

		it('hides dots when showDots is false', () => {
			render(<CarouselBanner slides={slides} showDots={false} />);
			expect(screen.queryByRole('button', { name: 'Go to slide 1' })).not.toBeInTheDocument();
		});
	});

	describe('autoplay', () => {
		beforeEach(() => jest.useFakeTimers());
		afterEach(() => jest.useRealTimers());

		it('advances slides automatically at the given interval', () => {
			render(<CarouselBanner slides={slides} autoplay autoplayInterval={1000} />);
			expect(screen.getByText('First Slide')).toBeInTheDocument();

			act(() => { jest.advanceTimersByTime(1000); });
			expect(screen.getByText('Second Slide')).toBeInTheDocument();

			act(() => { jest.advanceTimersByTime(1000); });
			expect(screen.getByText('Third Slide')).toBeInTheDocument();
		});

		it('does not advance when autoplay is false', () => {
			render(<CarouselBanner slides={slides} autoplay={false} />);
			act(() => { jest.advanceTimersByTime(10000); });
			expect(screen.getByText('First Slide')).toBeInTheDocument();
		});

		it('pauses while the pointer is hovering the banner', () => {
			render(<CarouselBanner slides={slides} autoplay autoplayInterval={1000} />);
			const region = screen.getByRole('region');

			fireEvent.mouseEnter(region);
			act(() => { jest.advanceTimersByTime(5000); });
			expect(screen.getByText('First Slide')).toBeInTheDocument();

			fireEvent.mouseLeave(region);
			act(() => { jest.advanceTimersByTime(1000); });
			expect(screen.getByText('Second Slide')).toBeInTheDocument();
		});
	});
});
