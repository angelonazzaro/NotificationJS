import Toast from "./Toast.js";

new Toast({
	progressBar: true,
	autoClose: 0,
	animation: "bounce",
});

document.querySelector("button").addEventListener("click", () => {
	new Toast({
		progressBar: true,
		autoClose: 0,
		animation: "zoom",
	});
});
