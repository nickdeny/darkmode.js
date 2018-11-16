# DarkModeJS
Lightweight and cross-browser DarkModeJS helps you to auto detect user's time and switch theme to darkside. Also, it's weight only 2,4kb and written on pure Javascript, without any plugins and jQuery!

## Demo
You can test on: https://nickdeny.github.io/darkmode-js/

## Documentation
Just copy-paste this code to end of body tag
```
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
```

To display light theme for non-javascript user just copy-paste it to head (if you separate themes into light/dark stylesheets):
```
<noscript>
  <link rel="stylesheet" type="text/css" href="light.css">
</noscript>
```

### Options
Option | Description | Default | Type
--- | --- | --- | ---
light | Path to light stylesheet | `false` | String / Boolean
dark | Path to dark stylesheet | `false` | String / Boolean
startAt | Time to start Dark theme | 21:00 | String
endAt | Time to end Dark theme | 06:00 | String
theme | Set theme to `light` or `dark` | `false` | String / Boolean

## Author
nickdeny – [https://nickdeny.com/](https://nickdeny.com/?utm_source=darkmodejs&utm_medium=author&utm_campaign=github_repo)
