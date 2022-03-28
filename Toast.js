const DEFAULT_OPTIONS = {
  autoClose: 5000,
  position: "top-right",
  onClose: () => {},
  canClose: true,
  showProgress: true,
  newestOnTop: false,
};

export default class Toast {
  #toast;
  #autoClose;
  #isPaused = false;

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
      this.#toast.classList.add("show");
    });

    this.update({ ...DEFAULT_OPTIONS, ...options });
  }

  set position(position) {
    const currentContainer = this.#toast.parentElement;
    const container =
      document.querySelector(`.toast-container[data-position="${position}"]`) ||
      createToastContainer(position);

    container.append(this.#toast);
    if (currentContainer == null || currentContainer.hasChildNodes()) return;
    currentContainer.remove();
  }

  set text(text) {
    this.#toast.querySelector(".toast__body").textContent = text;
  }

  update(options) {
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  removeToast() {
    this.#toast.classList.remove("show");
    this.#toast.addEventListener("transitionend", () => {
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
