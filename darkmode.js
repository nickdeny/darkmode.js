/*! DarkModeJS by nickdeny (v1.2): https://github.com/nickdeny/darkmode-js */

;(function(root, factory) {
  var pluginName = 'DarkMode'
  if (typeof define === 'function' && define.amd)
    define([], factory(pluginName))
  else if (typeof exports === 'object') module.exports = factory(pluginName)
  else root[pluginName] = factory(pluginName)
})(this, function(pluginName) {
  'use strict'
  // Default values
  var defaults = {
    light: false,
    dark: false,
    startAt: '21:00',
    endAt: '06:00',
    checkSystemScheme: true,
    saveOnToggle: true,
  }

  /**
   * Merge defaults with user options
   * @param {Object} defaults Default settings
   * @param {Object} options User options
   */
  var extend = function(target, options) {
    var prop,
      extended = {}
    for (prop in defaults) {
      if (Object.prototype.hasOwnProperty.call(defaults, prop))
        extended[prop] = defaults[prop]
    }
    for (prop in options) {
      if (Object.prototype.hasOwnProperty.call(options, prop))
        extended[prop] = options[prop]
    }
    return extended
  }

  // Common DOMs
  var Head = document.getElementsByTagName('head')[0],
    Body = document.getElementsByTagName('body')[0]

  /**
   * Normalize Time
   * @private
   * @param {String} time Time on hh:mm format
   * @return {Date}
   */
  var normalizeTime = function(time) {
    var date = new Date(),
      normalized = time.split(':')

    return date.setHours(normalized[0], normalized[1], 0, 0)
  }

  /**
   * Include Stylesheet to document
   * @private
   * @param {String} type Type of theme
   * @param {String} url URL of stylesheet
   * @return {Void}
   */
  var includeStyles = function(type, url) {
    var stylesheet = document.createElement('link')
    stylesheet.id = type
    stylesheet.rel = 'stylesheet'
    stylesheet.type = 'text/css'
    stylesheet.href = url
    if (Head.getElementsByTagName('link')[0])
      Head.insertBefore(stylesheet, Head.getElementsByTagName('link')[0])
    else Head.appendChild(stylesheet)
  }

  /**
   * Get value of opposite Mode
   * @param {String} mode
   * @return {String} Opposite Mode
   */
  var oppositeMode = function(mode) {
    return mode === 'light' ? 'dark' : 'light'
  }

  /**
   * Plugin Object
   * @param {Object} options User options
   * @constructor
   */
  function Plugin(options) {
    this.options = extend(defaults, options)
    this.init()
  }

  /**
   * Plugin prototype
   * @public
   * @constructor
   */
  Plugin.prototype = {
    /**
     * Initialization
     * @return {Void}
     */
    init: function() {
      // Clear localStorage value if options is disabled
      if (!this.options.saveOnToggle) localStorage.removeItem('dm-mode')

      // Dynamic System Scheme
      if (window.matchMedia && this.options.checkSystemScheme) {
        var plugin = this
        setSystemScheme('light')
        setSystemScheme('dark')

        function setSystemScheme(mode) {
          window
            .matchMedia('(prefers-color-scheme: ' + mode + ')')
            .addListener(function(e) {
              return e.matches && plugin.setMode(mode)
            })
        }
      }

      return this.setMode(this.getMode())
    },

    /**
     * Get Mode Value
     * @return {String}
     */
    getMode: function() {
      // Check plugin storage
      if (this.mode) return this.mode

      // Check localStorage value
      var localStorageMode = localStorage.getItem('dm-mode')
      if (localStorageMode) return localStorageMode

      // Check System Scheme
      if (window.matchMedia && this.options.checkSystemScheme)
        return this.getSystemScheme()

      // Get value based on time
      var startAt = normalizeTime(this.options.startAt),
        endAt = normalizeTime(this.options.endAt),
        now = new Date().getTime()

      return (endAt < now && now > startAt) || (startAt > now && now < endAt)
        ? 'dark'
        : 'light'
    },

    /**
     * Set Mode
     * @param {String} mode
     * @return {Void}
     */
    setMode: function(enabledMode) {
      if (enabledMode !== 'light' && enabledMode !== 'dark') {
        console.error('setMode', 'Invalid value')
        return false
      }

      this.mode = enabledMode
      var disabledMode = oppositeMode(enabledMode)

      // If custom styles existed – process it
      if (this.options[enabledMode]) {
        var enabledStyles = document.getElementById('dm-' + enabledMode),
          disabledStyles = document.getElementById('dm-' + disabledMode)

        if (!enabledStyles)
          includeStyles('dm-' + enabledMode, this.options[enabledMode])
        else if (!!enabledStyles) enabledStyles.removeAttribute('disabled')

        if (!!disabledStyles) disabledStyles.setAttribute('disabled', true)
      }

      // Process classes on body
      Body.classList.add('dm-' + enabledMode)
      Body.classList.remove('dm-' + disabledMode)

      return true
    },

    /**
     * Check localStorage Value
     */
    isModeSaved: function() {
      return Boolean(localStorage.getItem('dm-mode'))
    },

    /**
     * Clear localStorage Value
     */
    clearSavedMode: function() {
      localStorage.removeItem('dm-mode')
      this.mode = null
      this.setMode(this.getMode())
      return true
    },

    /**
     * Toggle Mode
     * @return {String} Enabled Mode
     */
    toggleMode: function() {
      var newMode = oppositeMode(this.mode)
      this.setMode(newMode)
      if (this.options.saveOnToggle) localStorage.setItem('dm-mode', newMode)
      return newMode
    },

    /**
     * Get Mode from System Scheme (css: prefers-color-scheme)
     * @return {String} System Scheme Mode
     */
    getSystemScheme: function() {
      return window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    },
  }

  return Plugin
})
