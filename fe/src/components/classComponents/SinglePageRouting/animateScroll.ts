// animateScroll.js

const pow = Math.pow;

// The easing function that makes the scroll decelerate over time
function easeOutQuart(x: number) {
	return 1 - pow(1 - x, 4);
}

type Config = {
	/**
	 * The element you want to scroll into view.
	 */
	targetElement: HTMLElement;
	/**
	 * The element containing the scroll view.
	 */
	containerElement: HTMLElement;
	duration: number;
};

export function animateScroll({
	targetElement,
	containerElement,
	duration,
}: Config) {
	let timestampStart: number = -1; // starting value
	let position: number;
	let animationFrame: number;

	const requestAnimationFrame = window.requestAnimationFrame;
	const cancelAnimationFrame = window.cancelAnimationFrame;

	// the position of the scroll bar before the user clicks the button
	const initialPosition = containerElement.scrollTop;
	const targetPosition = targetElement.offsetTop;

	// maximum amount of pixels we can scroll
	const maxAvailableScroll =
		containerElement.scrollHeight - containerElement.clientHeight;

	const amountOfPixelsToScroll = initialPosition - targetPosition;

	function step(timestamp: number) {
		if (timestampStart === -1) {
			timestampStart = timestamp;
		}

		const elapsed = timestamp - timestampStart;

		// this just gives us a number between 0 (start) and 1 (end)
		const relativeProgress = elapsed / duration;

		// ease out that number
		const easedProgress = easeOutQuart(relativeProgress);

		// calculate new position for every tick of the requestAnimationFrame
		position =
			initialPosition - amountOfPixelsToScroll * Math.min(easedProgress, 1);

		// set the scrollbar position
		containerElement.scrollTo(0, position);

		// Stop when max scroll is reached
		if (
			initialPosition !== maxAvailableScroll &&
			containerElement.scrollTop === maxAvailableScroll
		) {
			cancelAnimationFrame(animationFrame);
			return;
		}

		// repeat until the end is reached
		if (elapsed < duration) {
			animationFrame = requestAnimationFrame(step);
		}
	}

	animationFrame = requestAnimationFrame(step);
}
