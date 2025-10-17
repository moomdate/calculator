# 🧮 Calculator

A simple and elegant calculator built with HTML, CSS, and JavaScript with a beautiful digital display and calculation history.

[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2025-blueviolet.svg)](https://hacktoberfest.com/)
[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://moomdate.github.io/calculator/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🌟 Features

- ✨ Clean and intuitive user interface
- 🔢 Basic arithmetic operations (addition, subtraction, multiplication, division)
- 📱 Responsive design for all devices
- 🎨 Three beautiful themes (Dark, Light, Neon)
- 🔟 Decimal point support
- ⌫ Backspace button to delete digits one by one
- 📜 **Calculation history panel** with up to 10 recent calculations
- 💾 Persistent storage using localStorage
- ⌨️ Full keyboard support
- 🖱️ Click on history items to load results

## 🚀 Live Demo

Check out the live demo: [https://moomdate.github.io/calculator/](https://moomdate.github.io/calculator/)

## ✨ New Features

### 📜 Calculation History (v1.2.0)
- View up to 10 recent calculations
- Click on any history item to load the result
- Toggle history panel with 📜 button or press `H` key
- Clear all history with one click
- Automatic save to localStorage
- Shows timestamp for each calculation

### ⌫ Backspace Function (v1.1.1)
- Delete digits one by one with ⌫ button
- Keyboard support: `Backspace` or `Delete` key
- Smart handling of edge cases

### 🔟 Decimal Point (v1.1.0)
- Add decimal point with `.` button
- Keyboard support: `.` or `,` key
- Prevents duplicate decimal points

## ⌨️ Keyboard Shortcuts

| Key | Function |
|-----|----------|
| `0-9` | Input numbers |
| `.` or `,` | Decimal point |
| `+` `-` `*` `/` | Operators |
| `Enter` or `=` | Calculate |
| `Backspace` or `Delete` | Delete last digit |
| `Escape` or `C` | Clear all |
| `H` | Toggle history panel |

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/moomdate/calculator.git
```

2. Navigate to the project directory:
```bash
cd calculator
```

3. Open `index.html` in your browser:
```bash
open index.html
# or simply double-click the index.html file
```

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with CSS Variables for theming
- **JavaScript (ES6+)** - Functionality
- **localStorage API** - Data persistence

## 📁 Project Structure

```
calculator/
├── index.html          # Main HTML file
├── styles/
│   └── calculator.css  # Main stylesheet with themes
├── js/
│   └── calculator.js   # Calculator logic and history management
├── LICENSE             # MIT License
└── README.md           # Project documentation
```

## 🎨 Themes

The calculator comes with three beautiful themes:

1. **Dark Theme** (Default) - Modern dark purple theme
2. **Light Theme** - Clean and bright theme
3. **Neon Theme** - Futuristic neon green theme

Theme preferences are saved automatically!

## 🤝 Contributing

We welcome contributions from the community! This project is participating in **Hacktoberfest 2025**! 🎃

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Recent Branches

- `feat/calculation-history` - Calculation history panel
- `feat/backspace-delete-button` - Backspace functionality
- `feat/decimal-point` - Decimal point support

### Good First Issues

Looking for ideas? Check out our [issues](https://github.com/moomdate/calculator/issues) labeled with `good-first-issue` or `hacktoberfest`!

**Some ideas for contributions:**
- 🎨 Improve UI/UX design
- 🔬 Add scientific calculator mode
- 📊 Add more themes
- ✨ Add animations
- 🌍 Add internationalization (i18n)
- ♿ Improve accessibility
- 🐛 Fix bugs
- 📝 Improve documentation

## 📝 Changelog

### v1.2.0 (2025-10-17)
- ✨ Added calculation history panel
- 💾 History persists using localStorage
- 🖱️ Click history items to load results
- 📜 Toggle history panel with button or `H` key
- 🗑️ Clear all history functionality

### v1.1.1 (2025-10-17)
- ⌫ Added backspace button
- ⌨️ Keyboard support for Backspace/Delete
- 🛡️ Smart edge case handling

### v1.1.0 (2025-10-17)
- 🔟 Added decimal point button
- ⌨️ Keyboard support for decimal input
- 🎨 Custom styling for decimal button

### v1.0.0 (2025-10-17)
- 🎉 Initial release
- ✨ Basic calculator functionality
- 🎨 Three themes (Dark, Light, Neon)
- ⌨️ Keyboard support
- 📱 Responsive design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**moomdate**
- GitHub: [@moomdate](https://github.com/moomdate)

## ⭐ Show your support

Give a ⭐️ if you like this project!

## 🎃 Hacktoberfest

This repository is participating in Hacktoberfest 2025! We encourage you to contribute and help make this project better. Happy coding! 🚀

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by modern calculator designs
- Built with ❤️ for the community

---

Made with ❤️ by [moomdate](https://github.com/moomdate)