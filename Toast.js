import {
	searchStyles,
	applyStyles,
	createToastContainer,
	addIcon,
	collapse,
} from "./utils.js";

const DEFAULT_OPTIONS = {
	position: "top-right",
	text: "Hello World!",
	onClose: () => {},
	autoClose: 5000,
	progressBar: false,
	pauseOnHover: true,
	pauseOnFocusLoss: true,
	closeOnClick: false,
	draggable: true,
	newestOnTop: true,
	darkMode: false,
	icon: null,
	type: "default",
	styles: {},
	animation: "slide",
};

export default class Toast {
	#toast;
	#parent;
	#lifetime = 0;
	#progressBarInterval = null;
	#isPaused;
	#pause;
	#unpause;
	#isFocusLost = document.visibilityState !== "visible";
	#visibilityChange;
	#timeElapsed = 0;
	#animation = "slide";
	#darkMode = false;
	#type = "default";
	#newestOnTop = true;
	#icon;
	#styles = [
		{
			type: "light",
			style: {
				toast_bg: "#ffffff",
				toast_color: "#000000",
				close_toast_icon_color: "#b3b3b3",
				close_toast_icon_color_hover: "#000000",
				box_shadow: "#e6e6e6",
				progress_bar_bg_direction: "to right",
				progress_bar_first_bg_color: "#6e45e1",
				progress_bar_second_bg_color: "#89d4cf",
			},
		},
		{
			type: "dark",
			style: {
				toast_bg: "#000000",
				toast_color: "#ffffff",
				close_toast_icon_color: "#b3b3b3",
				close_toast_icon_color_hover: "#ffffff",
				box_shadow: "#e6e6e6",
				progress_bar_bg_direction: "to right",
				progress_bar_first_bg_color: "#bb86fc",
				progress_bar_second_bg_color: "#bb86fc",
			},
		},
		{
			type: "success",
			style: {
				toast_icon_color: "#0fbd1f",
				progress_bar_first_bg_color: "#0fbd1f",
				progress_bar_second_bg_color: "#0fbd1f",
			},
		},
		{
			type: "info",
			style: {
				toast_icon_color: "#4497d9",
				progress_bar_first_bg_color: "#4497d9",
				progress_bar_second_bg_color: "#4497d9",
			},
		},
		{
			type: "warning",
			style: {
				toast_icon_color: "#edc52a",
				progress_bar_first_bg_color: "#edc52a",
				progress_bar_second_bg_color: "#edc52a",
			},
		},
		{
			type: "danger",
			style: {
				toast_icon_color: "#e34d41",
				progress_bar_first_bg_color: "#e34d41",
				progress_bar_second_bg_color: "#e34d41",
			},
		},
		{
			type: "success-bg",
			style: {
				toast_bg: "#0fbd1f",
				toast_color: "#ffffff",
				close_toast_icon_color: "#a9e8ae",
				close_toast_icon_color_hover: "#6eb574",
				toast_icon_color: "#ffffff",
				progress_bar_first_bg_color: "#a9e8ae",
				progress_bar_second_bg_color: "#a9e8ae",
			},
		},
		{
			type: "info-bg",
			style: {
				toast_bg: "#4497d9",
				toast_color: "#ffffff",
				close_toast_icon_color: "#bae5fd",
				close_toast_icon_color_hover: "#b4d8ed",
				toast_icon_color: "#ffffff",
				progress_bar_first_bg_color: "#bae5fd",
				progress_bar_second_bg_color: "#bae5fd",
			},
		},
		{
			type: "warning-bg",
			style: {
				toast_bg: "#edc52a",
				toast_color: "#ffffff",
				close_toast_icon_color: "#f6e9ab",
				close_toast_icon_color_hover: "#c2b267",
				toast_icon_color: "#ffffff",
				progress_bar_first_bg_color: "#f6e9ab",
				progress_bar_second_bg_color: "#f6e9ab",
			},
		},
		{
			type: "danger-bg",
			style: {
				toast_bg: "#e34d41",
				toast_color: "#ffffff",
				close_toast_icon_color: "#e4c9c3",
				close_toast_icon_color_hover: "#a67d74",
				toast_icon_color: "#ffffff",
				progress_bar_first_bg_color: "#e4c9c3",
				progress_bar_second_bg_color: "#e4c9c3",
			},
		},
	];
	#icons = [
		{
			type: "success",
			d: "M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z",
		},
		{
			type: "info",
			d: "M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z",
		},
		{
			type: "warning",
			d: "M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z",
		},
		{
			type: "danger",
			d: "M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z",
		},
	];

	constructor(options) {
		this.#toast = document.createElement("div");
		this.#toast.className = "toast";
		this.#toast.setAttribute("role", "alert");

		// Disable drag & drop preview
		this.#toast.addEventListener("dragstart", (e) => e.preventDefault());
		this.#toast.addEventListener("dragenter", (e) => e.preventDefault());

		const closeIcon = addIcon(
			this.#toast,
			"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z",
			0,
			0,
			14,
			16,
			true
		);

		closeIcon.classList.add("close-toast-icon");

		closeIcon.addEventListener("click", () => {
			this.#removeToast();
		});

		const toastBody = document.createElement("div");
		toastBody.className = "toast-body";
		toastBody.appendChild(document.createElement("p"));

		this.#toast.append(closeIcon);
		this.#toast.append(toastBody);

		this.#visibilityChange = () => {
			this.#isFocusLost = document.visibilityState !== "visible";
		};

		this.#pause = () => {
			this.#isPaused = true;
		};
		this.#unpause = () => {
			this.#isPaused = false;
		};

		requestAnimationFrame(() => {
			this.#toast.classList.add(this.#animation);
		});

		this.#update({ ...DEFAULT_OPTIONS, ...options });
	}

	/**
	 * Make the new toast appear above or under the others.
	 *
	 * @param {boolean} value
	 */
	set newestOnTop(value) {
		if (typeof value !== "boolean") return;
		this.#newestOnTop = value;
	}

	/**
	 * Sets the container position and appends the new toast to the old container
	 * if it already existed; otherwise it creates a new container.
	 *
	 * @param {string} value
	 */
	set position(value) {
		const currentParent = this.#toast.parentElement;
		const parent =
			document.getElementById("toasts-container") ||
			createToastContainer(value);

		if (value.endsWith("left"))
			this.#toast.style.setProperty("--left-or-right", -1);

		if (this.#newestOnTop)
			parent.insertBefore(this.#toast, parent.firstChild);
		else parent.append(this.#toast);

		this.#parent = parent;

		if (
			currentParent === null ||
			currentParent === undefined ||
			currentParent.hasChildNodes()
		)
			return;

		currentParent.remove();
	}

	/**
	 * Sets the toast text
	 *
	 * @param {string} value
	 */
	set text(value) {
		this.#toast.querySelector(".toast-body p").textContent = value;
	}

	/**
	 * If true, adds an event listener that will make the toast disappear if clicked.
	 *
	 * @param {boolean} value
	 */
	set closeOnClick(value) {
		if (value === false) return;

		this.#toast.addEventListener("click", () => this.#removeToast());
	}

	/**
	 * Sets the lifetime of the toast in ms.
	 *
	 * @param {int | float | boolean} value
	 */
	set autoClose(value) {
		if (value <= 0 || value === false) return;

		this.#lifetime = typeof value === "number" ? value : 5000;
	}

	/**
	 * If true, adds the progress bar to the toast.
	 * If lifetime > 0, it sets an interval to make the progress bar represent how much time the toast has before it disappears.
	 *
	 * @param {boolean} value
	 */
	set progressBar(value) {
		if (value === false || this.#lifetime <= 0) return;

		this.#toast.classList.add("progress");

		if (this.#lifetime == 0) return;

		let lastTimeCalled = new Date();

		this.#progressBarInterval = setInterval(() => {
			if (this.#isPaused || this.#isFocusLost) {
				lastTimeCalled = new Date();
				return;
			}

			this.#timeElapsed += new Date() - lastTimeCalled;

			this.#toast.style.setProperty(
				"--progress-bar-width",
				1 - this.#timeElapsed / this.#lifetime
			);

			lastTimeCalled = new Date();

			if (this.#timeElapsed >= this.#lifetime) this.#removeToast();
		}, 20);
	}

	/**
	 * Stops the autoClose timer when the toast is hovered on & starts/keeps running the
	 * autoClose timer when the toast is not hovered on.
	 *
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
	 * autoClose timer when the windows is focused/regains the focus.
	 *
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
	 * Makes the toast draggable. The more it gets moved, the more it becomes transparent until it gets removed.
	 * When the user stops dragging, the toast goes back to its original position.
	 *
	 * @param {boolean} value
	 */
	set draggable(value) {
		if (typeof value !== "boolean" || value === false) return;

		let isDown = false;
		let offset = 0;
		let left = 0;
		const toastStyle = window.getComputedStyle(this.#toast);

		this.#toast.addEventListener("mousedown", (e) => {
			isDown = e.button === 0; // left click
			offset = this.#toast.offsetLeft - e.clientX;
		});

		document.addEventListener("mousemove", (e) => {
			e.preventDefault();

			if (e.target !== this.#toast || isDown === false) return;

			left = e.clientX + offset;

			this.#toast.style.setProperty("left", `${left}px`);

			const opacity =
				1 -
				(left <= 0 ? -left : left) /
					parseInt(toastStyle.getPropertyValue("width"), 10);

			this.#toast.style.setProperty("--opacity", opacity);

			if (opacity < 0) this.#toast.remove();
		});

		document.addEventListener("mouseup", () => {
			console.log("up " + isDown);
			if (isDown === true) {
				isDown = false;

				this.#toast.style.setProperty("--opacity", 1);

				const keyframeEffect = new KeyframeEffect(
					this.#toast,
					[
						{
							left: `${left}px`,
						},
						{
							left: "0",
						},
					],
					{
						duration: 650,
						fill: "forwards",
					}
				);

				const animation = new Animation(
					keyframeEffect,
					document.timeline
				);

				animation.onfinish = () => {
					this.#toast.style.left = "0";
				};

				animation.play();
			}
		});
	}

	/**
	 * Sets if the toast should use light style rules or dark style rules.
	 *
	 * @param {boolean} value
	 */
	set darkMode(value) {
		if (typeof value !== "boolean") return;
		this.#darkMode = value;
	}

	/**
	 * Sets the icon that will be displayed in the toast.
	 * Takes the d attribute of the path of the svg.
	 *
	 * @param {string} value
	 */
	set icon(value) {
		if (value === null || value === undefined || value.length === 0) return;

		this.#icon = value;
		addIcon(this.#toast.querySelector(".toast-body"), value);
	}

	/**
	 * Sets the type of the toast notification that will be used to apply the corresponding styles.
	 * Inserts the corresponding icon.
	 *
	 * @param {string} value
	 */
	set type(value) {
		if (
			value === null ||
			value === undefined ||
			value.length === 0 ||
			value === "default"
		)
			return;

		this.#type = value;

		if (
			this.#icon !== null &&
			this.#icon !== undefined &&
			this.#icon.length > 0
		)
			return;

		addIcon(
			this.#toast.querySelector(".toast-body"),
			this.#icons.filter((icon) =>
				icon.type.startsWith(value.split("-")[0])
			)[0].d
		);
	}

	/**
	 * Sets the style for the toast notification.
	 *
	 * @param {object} value
	 */
	set styles(value) {
		// Applying default (light or dark) styles

		// entry = [property, value]
		applyStyles(
			this.#toast,
			searchStyles(this.#styles, this.#darkMode ? "dark" : "light")
		);

		if (this.#type !== "default") {
			// Applying type styles

			applyStyles(
				this.#toast,
				searchStyles(
					this.#styles,
					this.#darkMode ? this.#type.split("-")[0] : this.#type
				)
			);
		}

		if (value === null || typeof value !== "object") return;

		/* Applying custom styles if any is present. 
		   There are 2 for since it would be complicated to understand if the user has passed 
		   wrong properties or a different number of properties.
        */
		applyStyles(this.#toast, value);
	}

	/**
	 * Sets the animation that will be added to the toast.
	 *
	 * @param {string} value
	 */
	set animation(value) {
		if (value === null || value === undefined || value.length === 0) return;

		this.#animation = value;
	}

	#removeToast() {
		if (this.#progressBarInterval !== null)
			clearInterval(this.#progressBarInterval);

		// Playing backwards the current animation
		const animationObj = new Animation(
			this.#toast.getAnimations()[0]?.effect
		);

		animationObj.playbackRate = -1;

		// Firefox fix
		animationObj.onfinish = () => {
			this.#toast.remove();
				// if (
				// 	this.#parent.childNodes[
				// 		this.#parent.childNodes.length - 1
				// 	] !== this.#toast
				// )
					collapse(this.#parent);
		};

		animationObj.play();

		// Perform task(s) when the toast is removed/closed
		this.onClose();
	}

	#update(options) {
		Object.entries(options).forEach(([key, value]) => {
			this[key] = value;
		});
	}
}
