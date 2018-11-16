var head = document.getElementsByTagName('head')[0],
    body = document.getElementsByTagName('body')[0];

(function( root, factory ) {
  var pluginName = 'DarkMode';
  if (typeof define === 'function' && define.amd)
    define([], factory(pluginName));
  else if ( typeof exports === 'object' )
    module.exports = factory(pluginName);
  else
    root[pluginName] = factory(pluginName);
}(this, function(pluginName) {
  'use strict';
  // Default values
  var defaults = {
    light: false,
    dark: false,
    startAt: '21:00',
    endAt: '06:00',
    theme: false
  };

  /**
   * Merge defaults with user options
   * @param {Object} defaults Default settings
   * @param {Object} options User options
   */
  var extend = function(target, options) {
    var prop, extended = {};
    for(prop in defaults) {
      if(Object.prototype.hasOwnProperty.call(defaults, prop))
        extended[prop] = defaults[prop];
    }
    for (prop in options) {
      if(Object.prototype.hasOwnProperty.call(options, prop))
        extended[prop] = options[prop];
    }
    return extended;
  };

  /**
   * Normalize Time
   * @private
   * @param {String} time Time on NN:NN format
   * @return {Date}
   */
  var normalizeTime = function(time) {
    var date = new Date(),
        normalized = time.split(':');

    return date.setHours(normalized[0], normalized[1], 0, 0);
  }
  
  /**
   * Include Stylesheet to document
   * @private
   * @param {String} type Type of theme
   * @param {String} url URL of stylesheet
   * @return {Void}
   */
  var includeStyles = function(type, url) {
    var stylesheet = document.createElement('link');
    stylesheet.id = type;
    stylesheet.rel = 'stylesheet';
    stylesheet.type = 'text/css';
    stylesheet.href = url;
    if(head.getElementsByTagName('link')[0])
      head.insertBefore(stylesheet, head.getElementsByTagName('link')[0]);
    else
      head.appendChild(stylesheet);
  }

  /**
   * Plugin Object
   * @param {Object} options User options
   * @constructor
   */
  function Plugin(options) {
    this.options = extend(defaults, options);
    this.init();
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
      // Check if styles already loaded
      var loaded = {
        light: document.getElementById('dm-light') || false,
        dark: document.getElementById('dm-dark') || false
      }

      var type = this.options.theme || this.getMode();
      // Add class to body
      body.classList.add(
        type === 'dark'
          ? 'dm-dark'
          : 'dm-light'
      );

      // Is themes exist
      if(!loaded.light && this.options.light && type === 'light')
        includeStyles('dm-light', this.options.light);
      else if(!loaded.dark && this.options.dark && type === 'dark')
        includeStyles('dm-dark', this.options.dark);
      else
        document.getElementById('dm-' + type).removeAttribute('disabled');
    },
    /**
     * Reset Initialization
     * @return {Void}
     */
    resetInit: function() {
      body.classList.remove('dm-light', 'dm-dark');
      var light = document.getElementById('dm-light'),
          dark = document.getElementById('dm-dark');
      if(light)
        light.setAttribute('disabled', 'true');
      if(dark)
        dark.setAttribute('disabled', 'true');
    },
    /**
     * Get theme mode
     * @return {String} type
     */
    getMode: function() {
      if(this.options.theme)
        return this.options.theme;

      var startAt = normalizeTime(this.options.startAt),
          endAt = normalizeTime(this.options.endAt),
          now = new Date().getTime();

      return endAt < now && now > startAt ? 'dark' : 'light';
    },
    /**
     * Toggle Theme
     * @return {Void}
     */
    toggleTheme: function() {
      if(!this.options.theme)
        this.options.theme = this.getMode() === 'dark' ? 'light' : 'dark';
      else
        this.options.theme = this.options.theme === 'dark' ? 'light' : 'dark';

      this.resetInit();
      this.init();
    }
  };
  return Plugin;
}));