import Toast from "./Toast.js";

document.querySelector("button").addEventListener("click", () => {
  new Toast({
    text: "Hello",
    position: "top-right",
    closeOnClick: false,
    autoClose: true,
    animationClass: "zoom",
    pauseOnFocusLoss: false,
    icon: null,
    darkMode: false,
    newestOnTop: true,
    progressBarBackground: [],
  });
  //   new Toast({
  //     text: "Hello",
  //     position: "top-right",
  //     closeOnClick: false,
  //     autoClose: true,
  //     animationClass: "zoom",
  //     pauseOnFocusLoss: false,
  //     icon: null,
  //     darkMode: false,
  //     newestOnTop: true,
  //     progressBarBackground: [],
  //     type: "info",
  //   });
  //   new Toast({
  //     text: "Hello",
  //     position: "top-right",
  //     closeOnClick: false,
  //     autoClose: true,
  //     animationClass: "zoom",
  //     pauseOnFocusLoss: false,
  //     icon: null,
  //     darkMode: false,
  //     newestOnTop: true,
  //     progressBarBackground: [],
  //     type: "warning",
  //   });
  //   new Toast({
  //     text: "Hello",
  //     position: "top-right",
  //     closeOnClick: false,
  //     autoClose: true,
  //     animationClass: "zoom",
  //     pauseOnFocusLoss: false,
  //     icon: null,
  //     darkMode: false,
  //     newestOnTop: true,
  //     progressBarBackground: [],
  //     type: "error",
  //   });

  //   new Toast({
  //     text: "Hello",
  //     position: "top-right",
  //     closeOnClick: false,
  //     autoClose: true,
  //     animationClass: "zoom",
  //     pauseOnFocusLoss: false,
  //     icon: null,
  //     darkMode: true,
  //     newestOnTop: true,
  //     progressBarBackground: [],
  //     type: "success",
  //   });
  //   new Toast({
  //     text: "Hello",
  //     position: "top-right",
  //     closeOnClick: false,
  //     autoClose: true,
  //     animationClass: "zoom",
  //     pauseOnFocusLoss: false,
  //     icon: null,
  //     darkMode: true,
  //     newestOnTop: true,
  //     progressBarBackground: [],
  //     type: "info",
  //   });
  //   new Toast({
  //     text: "Hello",
  //     position: "top-right",
  //     closeOnClick: false,
  //     autoClose: true,
  //     animationClass: "zoom",
  //     pauseOnFocusLoss: false,
  //     icon: null,
  //     darkMode: true,
  //     newestOnTop: true,
  //     progressBarBackground: [],
  //     type: "warning",
  //   });
  //   new Toast({
  //     text: "Hello",
  //     position: "top-right",
  //     closeOnClick: false,
  //     autoClose: true,
  //     animationClass: "zoom",
  //     pauseOnFocusLoss: false,
  //     icon: null,
  //     darkMode: true,
  //     newestOnTop: true,
  //     progressBarBackground: [],
  //     type: "error",
  //   });
});
