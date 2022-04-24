# NotificationJS

NotificationJS is a personal project that I used to improve my front-end skills. <br>
It is build completely using ```Javascript Vanilla```, ```CSS3``` and ```HTML5```. No frameworks or third-party libraries used. <br>
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

- Define the lifetime of the toast
- Super customizable (styles, icons, type)
- Pause toast when the window loses focus
- Pause toast when the user hovers over it
- Has ```onClose``` hook
- Dark mode
- Define your animation
- Much more :D

## Options

| Option              | Type                    | Description  |
| -------------       |:-------------:          | -----        |
| text                | string                  |  Sets the text content of the toast. |
| position            | string                  |  Places the toast container in one of the following positions: top-right, top-left, bottom-left, bottom-right. |
| onClose             | function                |  Defines what should be done after the toast has been closed. |
| progressBar         | bool                    |  Defines if the toast should have a progress bar or not. |
| autoClose           | number \| bool          |  Sets the lifetime of the toast. If 0 or false the progress bar will not be displayed even if the ```progressBar```                                                      option has been                                      set to ```true```. |
| closeOnClick        | bool                    |  If set to ```true``` makes the toast disappear when clicked. |
| pauseOnHover        | bool                    |  If set to ```true``` makes the "toast aging" paused when hovered. |
| pauseOnFocusLoss    | bool                    |  If set to ```true``` makes the "toast aging" paused when the window loses focus. Ex. the user navigates to a new                                                         tab. |
| newestOnTop         | bool                    |  If set to ```true``` makes the new toast appear above the others. |
| darkMode            | bool                    |  Sets the dark or the light theme. |
| type                | string                  |  Renders the toast with one of the following styles: default (light or dark), success, info, warning, danger,                                                             success-bg, info-bg, warning- bg, danger-bg. |
| styles              | object                  |  Allows to override the default styles of the toast such as background color, color, the color of the progress bar                                                       etc. |
| icon                | string                  |  Sets the icon that will rendered with the text. You must pass the ```d``` attribute of the ```path``` of an                                                             ```svg```. |
| animation           | string                  |  Sets the animation the toast will perform when opened and closed. |
| draggable           | bool                    |  If set to ```true``` makes the toast draggable. When it gets dragged over a certain point, it will begin to fade. |

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change :shipit:

## People I'd like to mention
Again, I'd like to mention @fkhadra and @WebDevSimplified that inspired me to code this project.

## License
License under [MIT](https://choosealicense.com/licenses/mit/)
