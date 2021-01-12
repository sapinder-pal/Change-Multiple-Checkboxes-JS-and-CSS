let holdShift = false;
let lastChangedIndex = 0;
const inputs = document.querySelectorAll("input");

// set holdShift to true/false on "keydown" & "keyup" respectively
document.addEventListener("keydown", e => {
	holdShift = e.shiftKey && true;
})
document.addEventListener("keyup", () => {
	holdShift = false;
})


inputs.forEach((elem, index) => 
	elem.addEventListener("change",  e => handleChange(e, index))
);

function handleChange(e, index) {
	// do nothing if shift key not holded
	if(!holdShift) {
		lastChangedIndex = index;
		return;
	}

	const isAscendingOrder = lastChangedIndex < index;

	// get selectionRange to be used for slicing inputs array.
	const selectionRange = isAscendingOrder 
		? [lastChangedIndex, index] 
		: [index,	lastChangedIndex + 1]; // add 1 because slice(x, y) means 'y' is exclusive

	const elementsToSelect = Array.from(inputs).slice(...selectionRange);

	for(elem of elementsToSelect) {
		elem.checked = e.target.checked;
	}
	
	lastChangedIndex = index;
}