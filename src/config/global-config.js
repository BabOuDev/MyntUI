/**
 * MyntUI Global Configuration
 * Central configuration for theme defaults, component settings, and API object keys
 */

export class MyntUIConfig {
  constructor() {
    this._config = {
      // Theme Configuration
      theme: {
        // Default label positions for inputs
        labelPosition: 'top', // 'top' | 'left' | 'over'
        
        // Component sizes used everywhere (buttons, inputs, icons, etc.)
        sizes: {
          small: 'sm',
          medium: 'md', // default
          large: 'lg'
        },
        
        // Color scheme preferences
        colorScheme: 'auto', // 'light' | 'dark' | 'auto'
        
        // TailwindCSS class mappings for consistent styling
        tailwind: {
          // Size mappings for components
          sizes: {
            sm: 'h-input-sm text-label-medium px-sm py-xs',
            md: 'h-input-md text-body-medium px-md py-sm',
            lg: 'h-input-lg text-body-large px-lg py-md'
          },
          // Variant mappings for components
          variants: {
            input: {
              filled: 'bg-surface-container border-outline-variant text-surface-on-surface',
              outlined: 'bg-surface border-outline text-surface-on-surface',
              underlined: 'bg-transparent border-transparent border-b-2 border-b-outline text-surface-on-surface',
              text: 'bg-transparent border-transparent text-surface-on-surface'
            },
            button: {
              filled: 'bg-primary text-primary-on-primary',
              outlined: 'bg-transparent border-2 border-outline text-primary hover:bg-primary/10',
              text: 'bg-transparent border-transparent text-primary hover:bg-primary/10',
              'filled-tonal': 'bg-secondary-container text-secondary-on-container',
              elevated: 'bg-surface shadow-elevation1 text-primary hover:shadow-elevation2'
            },
            toggle: {
              checked: 'bg-primary',
              unchecked: 'bg-outline',
              track: 'bg-surface-variant'
            },
            checkbox: {
              checked: 'bg-primary border-primary text-primary-on-primary',
              unchecked: 'bg-transparent border-outline',
              indeterminate: 'bg-primary border-primary text-primary-on-primary'
            }
          },
          // State classes for interactive components
          states: {
            hover: 'hover:bg-opacity-state-hover hover:scale-subtle transition-all duration-short2',
            focus: 'focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2',
            active: 'active:bg-opacity-state-pressed active:scale-95',
            disabled: 'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
            loading: 'opacity-75 cursor-wait',
            error: 'border-error text-error bg-error/5',
            success: 'border-success text-success bg-success/5',
            warning: 'border-warning text-warning bg-warning/5'
          },
          // Common component base classes
          components: {
            input: 'rounded-lg border transition-all duration-medium1 focus-outline font-medium',
            button: 'inline-flex items-center justify-center rounded-full transition-all duration-medium1 font-medium focus-ring state-layer min-w-button',
            card: 'rounded-lg bg-surface shadow-elevation1 border border-outline-variant p-md',
            modal: 'rounded-xl bg-surface shadow-elevation4 border border-outline-variant max-w-lg',
            tooltip: 'rounded-lg px-sm py-xs text-label-small bg-neutral-900 text-neutral-white shadow-elevation2',
            drawer: 'bg-surface border-outline-variant shadow-elevation2',
            dropdown: 'bg-surface border border-outline-variant rounded-lg shadow-elevation2 max-h-60 overflow-y-auto',
            notification: 'rounded-lg shadow-elevation3 p-md border border-outline-variant',
            progressBar: 'rounded-full bg-surface-variant overflow-hidden',
            gauge: 'rounded-full border-4 border-surface-variant'
          }
        },
        
        // Spacing/padding system
        spacing: {
          xs: 'var(--_global-spacing-xs)', // 4px
          sm: 'var(--_global-spacing-sm)', // 8px
          md: 'var(--_global-spacing-md)', // 16px
          lg: 'var(--_global-spacing-lg)', // 24px
          xl: 'var(--_global-spacing-xl)', // 32px
          xxl: 'var(--_global-spacing-xxl)' // 48px
        },
        
        // Border radius system
        corners: {
          none: 'var(--_global-border-radius-none)', // 0
          sm: 'var(--_global-border-radius-sm)', // 4px
          md: 'var(--_global-border-radius-md)', // 8px
          lg: 'var(--_global-border-radius-lg)', // 12px
          xl: 'var(--_global-border-radius-xl)', // 16px
          full: 'var(--_global-border-radius-full)' // 9999px
        },
        
        // Color system
        colors: {
          primary: 'var(--_global-color-primary)',
          secondary: 'var(--_global-color-secondary)',
          tertiary: 'var(--_global-color-tertiary)',
          success: 'var(--_global-color-success)',
          warning: 'var(--_global-color-warning)',
          error: 'var(--_global-color-error)',
          info: 'var(--_global-color-info)',
          surface: 'var(--_global-color-surface)',
          background: 'var(--_global-color-background-white)'
        }
      },
      
      // Component Logic Configuration
      components: {
        // Input component defaults
        input: {
          variant: 'outlined', // 'outlined' | 'filled' | 'text'
          size: 'md',
          labelPosition: 'top',
          characterCountThreshold: 80, // Show count when approaching limit
          debounceDelay: 300, // ms for validation debouncing
          showIconsOnly: 'when-relevant', // 'always' | 'never' | 'when-relevant'
          autoIconMapping: {
            // Automatic icon assignment for input types
            email: 'mail',
            password: 'lock',
            search: 'search',
            date: 'event',
            'datetime-local': 'schedule',
            time: 'access_time',
            'date-of-birth': 'cake',
            tel: 'phone',
            url: 'link',
            number: 'tag',
            currency: 'attach_money',
            select: 'arrow_drop_down',
            'dynamic-select': 'search',
            textarea: 'notes',
            checkbox: 'check_box_outline_blank',
            radio: 'radio_button_unchecked'
          },
          // Enhanced input type configurations
          typeConfigs: {
            'date': {
              component: 'date-picker',
              locale: 'auto',
              format: 'YYYY-MM-DD',
              showCalendarIcon: true,
              enableNativeInput: true,
              minDate: null,
              maxDate: null
            },
            'datetime-local': {
              component: 'datetime-picker',
              locale: 'auto',
              format: 'YYYY-MM-DD HH:mm',
              showCalendarIcon: true,
              enableNativeInput: true,
              step: 1
            },
            'time': {
              component: 'time-picker',
              format: '24h', // '12h' | '24h'
              showClockIcon: true,
              enableNativeInput: true,
              step: 1
            },
            'date-of-birth': {
              component: 'date-picker',
              locale: 'auto',
              maxDate: 'today',
              yearRange: 120,
              showCalendarIcon: true,
              placeholder: 'Select your date of birth'
            },
            'select': {
              component: 'select-dropdown',
              searchable: false,
              clearable: true,
              multiple: false,
              maxHeight: '240px',
              showArrowIcon: true,
              placeholder: 'Select an option'
            },
            'dynamic-select': {
              component: 'select-dropdown',
              searchable: true,
              clearable: true,
              remote: true,
              debounceDelay: 300,
              minSearchLength: 2,
              loadingText: 'Loading options...',
              noOptionsText: 'No options found'
            },
            'country': {
              component: 'country-selector',
              locale: 'auto',
              includePhoneCode: true,
              includeFlag: true,
              searchable: true,
              clearable: true,
              placeholder: 'Select a country'
            },
            'currency': {
              component: 'currency-input',
              locale: 'auto',
              symbol: 'auto',
              precision: 2,
              allowNegative: false,
              showSymbol: true,
              symbolPosition: 'left'
            },
            'multiple': {
              component: 'multi-select',
              searchable: true,
              clearable: true,
              chips: true,
              maxSelection: null,
              placeholder: 'Select multiple options',
              maxHeight: '200px'
            },
            'phone': {
              component: 'phone-input',
              locale: 'auto',
              includeCountryCode: true,
              format: 'international',
              showFlag: true
            },
            'postal-code': {
              component: 'postal-input',
              locale: 'auto',
              format: 'auto',
              validateFormat: true
            },
            'credit-card': {
              component: 'card-input',
              showCardType: true,
              maskNumber: true,
              validateCard: true
            },
            'password': {
              component: 'password-input',
              showStrength: true,
              toggleVisibility: true,
              minStrength: 'medium',
              strengthIndicator: true
            },
            'search': {
              component: 'search-input',
              showClearButton: true,
              instantSearch: false,
              debounceDelay: 300,
              searchIcon: 'search',
              clearIcon: 'clear'
            },
            'range': {
              component: 'range-slider',
              showValue: true,
              showTicks: false,
              showLabels: true,
              thumbShape: 'circle'
            },
            'color': {
              component: 'color-picker',
              format: 'hex',
              showPresets: true,
              allowAlpha: false,
              showInput: true
            },
            'file': {
              component: 'file-upload',
              multiple: false,
              accept: '*',
              maxSize: '10MB',
              showPreview: true,
              dragAndDrop: true
            },
            'image': {
              component: 'image-upload',
              accept: 'image/*',
              maxSize: '5MB',
              showPreview: true,
              cropAspectRatio: null,
              resizeQuality: 0.8
            }
          }
        },
        
        // Button component defaults
        button: {
          variant: 'filled', // 'filled' | 'outlined' | 'text'
          size: 'md',
          rippleEffect: true,
          loadingSpinner: true,
          iconPosition: 'left' // 'left' | 'right' | 'only'
        },
        
        // Modal component defaults
        modal: {
          closeOnBackdropClick: true,
          closeOnEscape: true,
          trapFocus: true,
          restoreFocus: true
        },
        
        // Data components defaults
        dataTable: {
          pageSize: 25,
          pageSizeOptions: [10, 25, 50, 100],
          showPagination: true,
          sortable: true,
          filterable: true
        }
      },
      
      // API Configuration - Standard keys for consistency
      api: {
        // Pagination keys
        pagination: {
          limit: 'limit', // Items per page
          offset: 'offset', // Starting index
          total: 'total', // Total items count
          page: 'page', // Current page (alternative to offset)
          pageSize: 'pageSize' // Alternative to limit
        },
        
        // Query/filter keys
        query: {
          search: 'search', // Search query parameter
          searchBy: 'searchBy', // Search field parameter
          sortBy: 'sortBy', // Sort field parameter
          sortOrder: 'sortOrder', // Sort direction parameter
          filters: 'filters', // Filter object parameter
          filtersBy: 'filtersBy' // Alternative filter parameter
        },
        
        // Response structure keys
        response: {
          data: 'data', // Main data array/object
          items: 'items', // Alternative to data
          results: 'results', // Alternative to data
          total: 'total', // Total count
          count: 'count', // Alternative to total
          page: 'page', // Current page info
          meta: 'meta', // Metadata object
          errors: 'errors', // Error messages array
          message: 'message', // Single message
          success: 'success', // Success flag
          status: 'status' // Status code/message
        },
        
        // Standard HTTP headers
        headers: {
          contentType: 'Content-Type',
          authorization: 'Authorization',
          accept: 'Accept',
          userAgent: 'User-Agent'
        }
      },
      
      // Accessibility Configuration
      accessibility: {
        // Screen reader settings
        announcements: true,
        liveRegions: true,
        focusManagement: true,
        keyboardNavigation: true,
        
        // ARIA settings
        ariaLive: 'polite', // 'polite' | 'assertive' | 'off'
        
        // Focus settings
        focusOutlineWidth: '2px',
        focusOutlineOffset: '2px',
        focusRingColor: 'var(--_global-color-primary)'
      },
      
      // Animation and Motion Configuration
      motion: {
        // Enable/disable animations globally
        enabled: true,
        
        // Respect user's motion preferences
        respectReducedMotion: true,
        
        // Default durations (in ms)
        duration: {
          fast: 150,
          normal: 250,
          slow: 400
        },
        
        // Easing functions
        easing: {
          standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
          decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
          accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
          emphasized: 'cubic-bezier(0.2, 0.0, 0, 1)'
        }
      },
      
      // Development Configuration
      development: {
        // Logging levels
        logLevel: 'warn', // 'error' | 'warn' | 'info' | 'debug'
        
        // Console warnings for common issues
        warnings: {
          missingLabels: true,
          accessibilityIssues: true,
          performanceIssues: true,
          deprecatedFeatures: true
        },
        
        // Development tools
        showComponentBoundaries: false,
        showFocusIndicators: true
      }
    };
  }

  /**
   * Get configuration value by path
   * @param {string} path - Dot-notation path to config value
   * @param {*} defaultValue - Default value if path not found
   * @returns {*} Configuration value
   */
  get(path, defaultValue = null) {
    return this._getNestedValue(this._config, path, defaultValue);
  }

  /**
   * Set configuration value by path
   * @param {string} path - Dot-notation path to config value
   * @param {*} value - Value to set
   */
  set(path, value) {
    this._setNestedValue(this._config, path, value);
    this._notifyChange(path, value);
  }

  /**
   * Update multiple configuration values
   * @param {Object} updates - Object with configuration updates
   */
  update(updates) {
    this._deepMerge(this._config, updates);
    this._notifyChange('*', updates);
  }

  /**
   * Get the entire configuration object
   * @returns {Object} Complete configuration
   */
  getAll() {
    return JSON.parse(JSON.stringify(this._config));
  }

  /**
   * Reset configuration to defaults
   */
  reset() {
    const backup = this._config;
    this._config = new MyntUIConfig()._config;
    this._notifyChange('*', this._config);
  }

  /**
   * Load configuration from JSON
   * @param {string|Object} config - JSON string or object
   */
  load(config) {
    const configObj = typeof config === 'string' ? JSON.parse(config) : config;
    this.update(configObj);
  }

  /**
   * Export configuration as JSON
   * @param {boolean} pretty - Pretty print JSON
   * @returns {string} JSON string
   */
  export(pretty = true) {
    return JSON.stringify(this._config, null, pretty ? 2 : 0);
  }

  // Helper methods
  _getNestedValue(obj, path, defaultValue) {
    const keys = path.split('.');
    let current = obj;
    
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return defaultValue;
      }
    }
    
    return current;
  }

  _setNestedValue(obj, path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    let current = obj;
    
    for (const key of keys) {
      if (!(key in current) || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }
    
    current[lastKey] = value;
  }

  _deepMerge(target, source) {
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!target[key] || typeof target[key] !== 'object') {
          target[key] = {};
        }
        this._deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  _notifyChange(path, value) {
    // Emit custom event for configuration changes
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('myntuiConfigChange', {
        detail: { path, value, config: this._config }
      }));
    }
  }
}

// Create singleton instance
export const globalConfig = new MyntUIConfig();

// Export individual getters for common configurations
export const getThemeConfig = () => globalConfig.get('theme');
export const getComponentConfig = (component) => globalConfig.get(`components.${component}`, {});
export const getAPIConfig = () => globalConfig.get('api');
export const getAccessibilityConfig = () => globalConfig.get('accessibility');
export const getMotionConfig = () => globalConfig.get('motion');

// Convenience functions for common operations
export const setTheme = (theme) => globalConfig.set('theme.colorScheme', theme);
export const setLabelPosition = (position) => globalConfig.set('theme.labelPosition', position);
export const setDefaultSize = (size) => globalConfig.set('theme.sizes.default', size);

// Theme application helper
export const applyThemeToDocument = () => {
  if (typeof document === 'undefined') return;
  
  const themeConfig = getThemeConfig();
  const root = document.documentElement;
  
  // Apply color scheme
  if (themeConfig.colorScheme !== 'auto') {
    root.setAttribute('data-color-scheme', themeConfig.colorScheme);
  }
  
  // Apply any custom CSS properties from config
  Object.entries(themeConfig.colors).forEach(([key, value]) => {
    root.style.setProperty(`--_config-color-${key}`, value);
  });
  
  Object.entries(themeConfig.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--_config-spacing-${key}`, value);
  });
  
  Object.entries(themeConfig.corners).forEach(([key, value]) => {
    root.style.setProperty(`--_config-corner-${key}`, value);
  });
};

// Auto-apply theme on import (if in browser)
if (typeof window !== 'undefined') {
  // Apply theme when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyThemeToDocument);
  } else {
    applyThemeToDocument();
  }
  
  // Listen for configuration changes and re-apply theme
  window.addEventListener('myntuiConfigChange', () => {
    applyThemeToDocument();
  });
}

export default globalConfig;