const DEFAULT_OPTIONS = {
  autoClose: 5000,
  position: "top-right",
  onClose: () => {},
  canClose: true,
  showProgress: true,
  newestOnTop: false,
  animationClass: "bounce",
};

export default class Toast {
  #toast;
  #autoClose;
  #isPaused = false;
  #showProgress = false;
  #animationClass;

  constructor(options) {
    this.#toast = document.createElement("div");
    this.#toast.classList.add("toast");

    const toastClose = document.createElement("div");
    toastClose.textContent = "×";
    toastClose.addEventListener("click", () => {
      this.removeToast();
    });

    toastClose.classList.add("toast__close");

    const toastBody = document.createElement("div");
    toastBody.classList.add("toast__body");

    this.#toast.append(toastClose);
    this.#toast.append(toastBody);

    requestAnimationFrame(() => {
      this.#toast.classList.add("bounce");
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
   * @param {boolean} value
   */
  set showProgress(value) {
    this.#showProgress = value;

    if (value === true) this.#toast.classList.add("show-progress");
    else this.#toast.classList.remove("show-progress");
  }

  /**
   * @param {string} value
   */
  set position(value) {
    const currentContainer = this.#toast.parentElement;
    const container =
      document.querySelector(`.toast-container[data-position="${value}"]`) ||
      createToastContainer(value);

    container.append(this.#toast);
    if (currentContainer == null || currentContainer.hasChildNodes()) return;
    currentContainer.remove();
  }

  /**
   * @param {string} value
   */
  set text(value) {
    this.#toast.querySelector(".toast__body").textContent = value;
  }

  update(options) {
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  removeToast() {
    //this.#toast.classList.remove(`${this.#animationClass}`);
    this.#toast.classList.add(`${this.#animationClass}-backwards`);

    this.#toast.addEventListener("transitionend", () => {
      this.#toast.classList.remove(`${this.#animationClass}`);
      this.#toast.classList.remove(`${this.#animationClass}-backwards`);
      this.#toast.remove();
    });
    this.onClose();
  }
}

function createToastContainer(position) {
  const container = document.createElement("div");
  container.classList.add("toast-container");
  container.dataset.position = position;
  document.body.append(container);
  return container;
}
