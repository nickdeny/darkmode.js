# DarkModeJS
Lightweight and cross-browser DarkModeJS helps you to auto detect user's time and switch theme to darkside. Also, it's weight only **2.39KB** (1.05KB gzipped) and written on pure Javascript, without any plugins and jQuery!

## Demo
You can test on: https://nickdeny.github.io/darkmode-js/

## Documentation
Just copy-paste this code to end of body tag:
```html
<script src="darkmode.js"></script>
<script>var DarkMode = new DarkMode();</script>
```

Or use it with options:
```html
<script src="darkmode.js"></script>
<script>
  var options = {
    light: "light.css",
    dark: "dark.css",
    startAt: "23:00",
    endAt: "06:00",
    checkSystemScheme: true,
    saveOnToggle: true
  };
  var DarkMode = new DarkMode(options);
</script>
```

To display light theme for non-javascript user just copy-paste it to head (if you separate themes into light/dark stylesheets):
```html
<noscript>
  <link rel="stylesheet" type="text/css" href="light.css">
</noscript>
```

### Options
Option | Description | Default | Type
--- | --- | --- | ---
light | Path to light stylesheet | `false` | String / Boolean
dark | Path to dark stylesheet | `false` | String / Boolean
startAt | Time to start Dark theme | "21:00" | String
endAt | Time to end Dark theme | "06:00" | String
checkSystemScheme | Check [System Scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) | `true` | Boolean
saveOnToggle | Save current Mode on Toggle (Local Storage) | `true` | Boolean

### Events
Event | Description
--- | ---
`getMode()` | Get current Mode
`setMode("light"/"dark")` | Set Mode
`isModeSaved()` | Check is Mode saved (Local Storage)
`clearSavedMode()` | Remove Mode value (Local Storage), reinit Mode
`toggleMode()` | Toggle current Mode
`getSystemScheme()` | Get System Scheme (Returns `light`/`dark`/`auto`)

## Author
nickdeny – [https://nickdeny.com/](https://nickdeny.com/?utm_source=darkmodejs&utm_medium=author&utm_campaign=repo)

Read us on Telegram[RU] – [https://t.me/webdevblog](http://bit.ly/2RSYBuk)
