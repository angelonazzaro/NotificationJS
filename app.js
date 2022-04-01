import Toast from "./Toast.js";

document.querySelector("button").addEventListener("click", () => {
  new Toast({
    text: "Hello",
    position: "top-right",
    closeOnClick: false,
    autoClose: true,
    animationClass: "zoom",
    icon: null,
    darkMode: false,
    newestOnTop: true,
    progressBarBackground: [],
  });
});
