# NotificationJS

NotificationJS is a personal project that I used to improve my front-end skills. <br>
It is build completely using Javascript Vanilla, CSS3 and HTML5. No frameworks or third-party libraries used. <br>
This project was inspired by [React-toastify](https://fkhadra.github.io/react-toastify/introduction/) and [Web dev Simplified](https://www.youtube.com/c/WebDevSimplified). 

## Usage

```javascript
import Toast from "/yourpathtothelib/Toast.js";

// instantiate toast
new Toast({
  text: "Hello World! :) (very original huh)",
  progressBar: true,
  autoClose: 5000,
  animation: "bounce"
})
```

## Features
  <ul>
    <li>Define the lifetime of the toast</li>
    <li>Super customizable (styles, icons, type)</li>
    <li>Pause toast when the window loses focus</li>
    <li>Pause toast when the user hovers over it</li>
    <li>Dark mode</li>
    <li>Define your animation</li>
    <li>Much more :D</li>
  </ul>

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
License under [MIT](https://choosealicense.com/licenses/mit/)
