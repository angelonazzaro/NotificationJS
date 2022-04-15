const DEFAULT_OPTIONS = {
	position: "top-right",
	autoClose: 5000,
	icon: null,
	onClose: () => {},
	canClose: true,
	closeOnClick: false,
	showProgress: true,
	newestOnTop: false,
	pauseOnHover: true,
	pauseOnFocusLoss: true,
	draggable: true,
	animationClass: "bounce",
	darkMode: false,
	progressBarBackground: [],
	type: "default",
};

export default class Toast {
	#container;
	#icon;
	#toast;
	#position;
	#autoClose;
	#progressBarInterval;
	#isPaused;
	#pause;
	#unpause;
	#newestOnTop;
	#showProgress;
	#closeOnClick;
	#animationClass;
	#timeElapsed;
	#visibilityChange;
	#isFocusLost = document.visibilityState !== "visible";
	#darkMode;
	#progressBarBackgroundWhite = ["#6e45e1", "#89d4cf"];
	#progressBarBackgroundDark = ["#bb86fc"];
	#type;
	#draggable;
	#isDown = false;
	#offset = [0, 0];

	constructor(options) {
		this.#toast = document.createElement("div");
		this.#toast.classList.add("toast");
		this.#toast.setAttribute("draggable", false);
		// Remove drag & drop "preview"
		this.#toast.addEventListener("dragstart", (e) => e.preventDefault());
		this.#toast.addEventListener("drop", (e) => e.preventDefault());

		const toastClose = document.createElement("div");
		toastClose.textContent = "×";
		toastClose.addEventListener("click", () => {
			this.removeToast();
		});

		this.#visibilityChange = () => {
			this.#isFocusLost = document.visibilityState !== "visible";
		};

		this.#pause = () => {
			this.#isPaused = true;
		};
		this.#unpause = () => {
			this.#isPaused = false;
		};

		toastClose.classList.add("toast__close");

		const toastBody = document.createElement("div");
		toastBody.classList.add("toast__body");
		toastBody.append(document.createElement("p"));

		this.#toast.append(toastClose);
		this.#toast.append(toastBody);

		requestAnimationFrame(() => {
			this.#toast.classList.add(this.#animationClass);
		});

		this.update({ ...DEFAULT_OPTIONS, ...options });
	}

	/**
	 * @param {string} value
	 */
	set animationClass(value) {
		this.#animationClass = value;
	}

	/**
	 * @param {float | boolean} value
	 */
	set autoClose(value) {
		this.#autoClose = value === true ? 5000 : value === false ? 0 : value;

		if (this.#autoClose <= 0) return;

		this.#timeElapsed = 0;
	}

	/**
	 * Regulates the progress bar animation
	 * @param {boolean} value
	 */
	set showProgress(value) {
		this.#showProgress = value;

		this.#toast.classList.toggle("show-progress", this.#showProgress);

		let lastTimeCalled = null;

		/*
		If the toast is hovered, the progress bar animation will pause.
		Since we do not want that when the toast is not hovered anymore the animation finishes immediately,
		we save the moment it was hovered and we use that moment to have a nice smooth animation.

		Post edit: a similar logic is applied when the windows loses focus
    	*/

		if (this.#autoClose > 0) {
			lastTimeCalled = new Date();

			this.#progressBarInterval = setInterval(() => {
				if (this.#isPaused || this.#isFocusLost) {
					lastTimeCalled = new Date();
					return;
				}

				this.#timeElapsed += new Date() - lastTimeCalled;

				this.#toast.style.setProperty(
					"--progress",
					1 - this.#timeElapsed / this.#autoClose
				);

				lastTimeCalled = new Date();

				if (this.#timeElapsed >= this.#autoClose) this.removeToast();
			}, 20);
		}
	}

	/**
	 * Stops the autoClose timer when the toast is hovered on & starts/keeps running the
	 * autoClose timer when the toast is not hovered on
	 * @param {boolean} value
	 */
	set pauseOnHover(value) {
		if (value) {
			this.#toast.addEventListener("mouseover", this.#pause);
			this.#toast.addEventListener("mouseleave", this.#unpause);
		} else {
			this.#toast.removeEventListener("mouseover", this.#pause);
			this.#toast.removeEventListener("mouseleave", this.#unpause);
		}
	}

	/**
	 * Stops the autoClose timer when the window loses focus & starts/keeps running the
	 * autoClose timer when the windows is focused/regains the focus
	 * @param {boolean} value
	 */
	set pauseOnFocusLoss(value) {
		if (value) {
			document.addEventListener(
				"visibilitychange",
				this.#visibilityChange
			);
		} else {
			document.removeEventListener(
				"visibilitychange",
				this.#visibilityChange
			);
		}
	}

	/**
	 * Makes the toast disappear if clicked on it (not only on the close btn)
	 * @param {boolean} value
	 */
	set closeOnClick(value) {
		this.#closeOnClick = value;

		if (this.#closeOnClick === true)
			this.#toast.addEventListener("click", () => {
				this.removeToast();
			});
		else
			this.#toast.removeEventListener(
				"click",
				() => {
					this.removeToast();
				},
				true
			);
	}

	/**
	 * @param {string} value
	 */
	set position(value) {
		this.#position = value;
		const currentContainer = this.#toast.parentElement;
		const container =
			document.querySelector(
				`.toast-container[data-position="${this.#position}"]`
			) || createToastContainer(this.#position);

		this.#container = container;

		if (this.#newestOnTop === false) container.append(this.#toast);
		else container.insertBefore(this.#toast, container.firstChild);

		if (currentContainer == null || currentContainer.hasChildNodes())
			return;
		currentContainer.remove();
	}

	/**
	 * @param {string} value
	 */

	set icon(value) {
		this.#icon = value;
	}

	/**
	 * @param {boolean} value
	 */
	set draggable(value) {
		this.#draggable = value;

		if (this.#draggable === false) return;

		// Make element more and more transparent when its get moved on the right or on the left
		const computedStyle = window.getComputedStyle(this.#toast);

		this.#toast.addEventListener("mousedown", (e) => {
			
			this.#isDown = true;
			this.#offset = [
				this.#toast.offsetLeft - e.clientX,
				this.#toast.offsetTop - e.clientY,
			];
		});

		document.addEventListener("mouseup", () => {
			this.#isDown = false;

			// Reset opacity when mouse is lifted
			this.#toast.style.opacity = 1;

			this.#toast.addEventListener("animationend", () => {
				this.#toast.style.setProperty("--originalPosition", `0px`);
				this.#toast.classList.remove("slide-back");
				this.#toast.style.left = 0;
			});

			// Make element go back to its original position
			this.#toast.classList.remove(`${this.#animationClass}`);
			this.#toast.classList.add("slide-back");

			const left = parseInt(
				computedStyle.getPropertyValue("left").split("px")[0]
			);

			this.#toast.style.setProperty(
				"--originalPosition",
				`${-1 * left}px`
			);
		});

		this.#toast.addEventListener("mousemove", (e) => {
			e.preventDefault();

			if (this.#isDown === false) return;

			this.#toast.style.left = `${
				e.clientX + this.#offset[0] + this.#offset[1]
			}px`;

			let left = e.clientX + this.#offset[0] + this.#offset[1];

			if (left <= 0) left *= -1;

			const width = parseInt(
				computedStyle.getPropertyValue("width").split("px")[0]
			);

			if (this.#position.endsWith("-right") && left >= 180)
				this.#toast.style.opacity = 0;
			else this.#toast.style.opacity = `${1 - (left / width)}`;

			if (computedStyle.getPropertyValue("opacity") <= 0)
				this.removeToast();
		});
	}

	/**
	 * Render toast as a success/warning/error/info/default notification.
	 * @param {string} value
	 */
	set type(value) {
		this.#type = value;

		this.#toast.classList.add(`${this.#type}`);

		if (
			this.#icon === null ||
			this.#icon === undefined ||
			this.icon === ""
		) {
			switch (this.#type) {
				case "success":
					this.#icon = "fa-solid fa-circle-check";
					break;
				case "info":
					this.#icon = "fa-solid fa-circle-info";
					break;
				case "error":
					this.#icon = "fa-solid fa-circle-exclamation";
					break;
				case "warning":
					this.#icon = "fa-solid fa-triangle-exclamation";
					break;
				default:
					break;
			}
		}
	}

	/**
	 * @param {string} value
	 */
	set text(value) {
		const toastBody = this.#toast.querySelector(".toast__body");
		toastBody.querySelector("p").textContent = value;
		toastBody.insertBefore(createIcon(this.#icon), toastBody.firstChild);
	}

	/**
	 * @param {boolean} value
	 */
	set darkMode(value) {
		this.#darkMode = value;
		if (this.#darkMode) this.#toast.classList.add("dark-mode");
	}

	/**
	 * @param {Array} value
	 */
	set progressBarBackground(value) {
		const values =
			value.length === 0
				? this.#darkMode
					? this.#progressBarBackgroundDark
					: this.#progressBarBackgroundWhite
				: value;

		if (values.length > 2) return;

		let first = "--progressBarWhiteModeFirst",
			second = "--progressBarWhiteModeSecond";

		if (this.#darkMode) {
			first = "--progressBarDarkModeFirst";
			second = "--progressBarDarkModeSecond";
		}

		this.#toast.style.setProperty(first, values[0]);

		if (values.length > 1) this.#toast.style.setProperty(second, values[1]);
	}

	/**
	 * Makes the toast appear at the top of the toast's list.
	 * @param {boolean} value
	 */
	set newestOnTop(value) {
		this.#newestOnTop = value;
	}

	update(options) {
		Object.entries(options).forEach(([key, value]) => {
			this[key] = value;
		});
	}

	removeToast() {
		clearInterval(this.#progressBarInterval);

		// Set dynamic class
		this.#toast.classList.remove(`${this.#animationClass}`);
		this.#toast.classList.add(`${this.#animationClass}-backwards`);

		// Convert from "0.5s" to 0.5
		const animDuration = parseFloat(
			window
				.getComputedStyle(this.#toast)
				.getPropertyValue("animation-duration")
				.split("s")[0]
		);

		// Add a greater value to the transform transition so that it has time to elaborate things "smoothly"
		this.#toast.style.setProperty(
			"--transitionPropertyDuration",
			animDuration + animDuration / 2
		);
		this.#toast.style.setProperty(
			"--transitionAnimationDuration",
			animDuration
		);

		this.#toast.addEventListener("animationend", () => {
			this.#toast.remove();
		});

		// Perform task(s) when the toast is removed/closed
		this.onClose();
	}
}

function createIcon(icon) {
	const span = document.createElement("span");

	if (icon === null || icon == "" || icon == undefined) return span;

	const i = document.createElement("i");

	const classes = icon.split(" ");

	for (const singleClass of classes) i.classList.add(singleClass);
	span.append(i);

	return span;
}

function createToastContainer(position) {
	const container = document.createElement("div");

	container.classList.add("toast-container");

	container.dataset.position = position;
	document.body.append(container);

	return container;
}
