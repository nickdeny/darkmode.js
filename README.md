# DarkModeJS
Lightweight and cross-browser DarkModeJS helps you to auto detect user's time and switch theme to darkside

Also, it's weight only 2,4kb and written on pure Javascript, without any plugins and jQuery

## Documentation
Just copy-paste this code to end of body tag
<script src="darkmode.js"></script>
<script>
  var options = {
    light: 'light.css',
    dark: 'dark.css',
    startAt: '23:00',
    endAt: '06:00'
  };
  var DarkMode = new DarkMode(options);
</script>

### Options
`light` – path to light stylesheet, default is `false`
`dark` – path to dark stylesheet, default is `false`
`startAt` – time to start Dark theme, default is `21:00`
`endAt` – time to start Dark theme, default is `06:00`
`theme` – set theme to 'light' or 'dark', default is `false`
