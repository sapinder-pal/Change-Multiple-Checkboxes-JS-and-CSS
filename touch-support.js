const items = Array.from(document.querySelectorAll(".item"));
const itemsWrapper = document.querySelector(".items-wrapper");
let previousYOrdinate;

const isGestureDownward = yOrdinate => {
	const isDownward = yOrdinate > previousYOrdinate;
	previousYOrdinate = yOrdinate;

	return isDownward;
};

// attach and remove event listeners to items
items.forEach(item => {

	item.addEventListener("touchstart", () => {
		// wait for 200ms before recognizing gesture
		setTimeout(() => {		
			itemsWrapper.addEventListener("touchmove", handleTouchMove)
		}, 200);
	});

	item.addEventListener("touchend", e => {
		// remove "touchmove" listener
		itemsWrapper.removeEventListener("touchmove", handleTouchMove);
		previousYOrdinate = e.changedTouches[0].pageX;
	});
});


function handleTouchMove({changedTouches}) {
	// recognize when the touch moves in the range of any item's area
	const isGestureInRange = item => {
		const confirmVerticalRange = item.offsetTop <= changedTouches[0].pageY && 
			(item.offsetTop + item.offsetHeight) >= changedTouches[0].pageY;
		
		const confirmHorizontalRange = item.offsetLeft <= changedTouches[0].pageX &&
			(item.offsetLeft + item.offsetWidth) >= changedTouches[0].pageX;

		return confirmVerticalRange && confirmHorizontalRange;
	}
	
	const itemToChange = items.find(isGestureInRange);

	itemToChange.children[0].checked = isGestureDownward(changedTouches[0].pageY);
}