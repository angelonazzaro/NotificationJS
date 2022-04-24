export function createToastContainer(position) {
	const toastContainer = document.createElement("div");

	toastContainer.id = "toasts-container";
	toastContainer.dataset.position = position;

	document.body.insertBefore(toastContainer, document.body.firstChild);

	return toastContainer;
}

export function searchStyles(styles, type) {
	return styles.filter((style) => style.type === type)[0].style;
}

export function applyStyles(elem, styles) {
	Object.entries(styles).forEach((entry) => {
		elem.style.setProperty(`--${entry[0].replaceAll("_", "-")}`, entry[1]);
	});
}

export function addIcon(
	parent,
	d,
	x = 0,
	y = 0,
	w = 512,
	h = 512,
	doReturn = false,
	before = true
) {
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("viewBox", `${x} ${y} ${w} ${h}`);

	const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
	path.setAttribute("d", d);

	svg.appendChild(path);

	if (doReturn) return svg;

	if (before) parent.insertBefore(svg, parent.firstChild);
	else parent.append(svg);
}

export function collapse(node) {
	const { scrollHeight, style } = node;

	requestAnimationFrame(() => {
		style.minHeight = "initial";
		style.height = scrollHeight + "px";
		style.transition = `all 300ms`;

		requestAnimationFrame(() => {
			style.height = "0";
			style.padding = "0";
		});
	});
}
