const items = Array.from(document.querySelectorAll(".item"));
const itemsWrapper = document.querySelector(".items-wrapper");
let previousYOrdinate;

const isGestureDownward = yOrdinate => {
	const isDownward = yOrdinate > previousYOrdinate;
	previousYOrdinate = yOrdinate;

	return isDownward;
};

// recognize when the finger moves in the range of any item's area
const isGestureInRange = (item, finger) => {
	const confirmVerticalRange = item.offsetTop <= finger.pageY && 
		(item.offsetTop + item.offsetHeight) >= finger.pageY;
	
	const confirmHorizontalRange = item.offsetLeft <= finger.pageX &&
		(item.offsetLeft + item.offsetWidth) >= finger.pageX;
	
	return confirmVerticalRange && confirmHorizontalRange;
}
	
// attach and remove event listeners to items
items.forEach(item => {

	item.addEventListener("touchstart", e => {
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
	
	const itemToChange = items.find(item => isGestureInRange(item, changedTouches[0]));

	itemToChange.children[0].checked = isGestureDownward(changedTouches[0].pageY);
}