import Toast from "./Toast.js";

document.querySelector("button").addEventListener("click", () => {
	new Toast({
		text: "Hello",
		position: "top-right",
		closeOnClick: false,
		autoClose: false,
		animationClass: "zoom",
		pauseOnFocusLoss: false,
		icon: null,
		darkMode: false,
		newestOnTop: true,
		draggable: true,
		progressBarBackground: [],
	});
});
