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
          // Size mappings for components - comprehensive system
          sizes: {
            xs: {
              input: 'h-7 min-h-7 px-2 py-1 text-xs',
              button: 'h-7 min-w-16 px-2 py-1 text-xs',
              icon: 'w-4 h-4',
              spacing: 'gap-1 p-1'
            },
            sm: {
              input: 'h-input-sm min-h-input-sm px-sm py-xs text-label-medium',
              button: 'h-input-sm min-w-button px-sm py-xs text-label-medium',
              icon: 'w-5 h-5',
              spacing: 'gap-xs p-xs'
            },
            md: {
              input: 'h-input-md min-h-input-md px-md py-sm text-body-medium',
              button: 'h-input-md min-w-button px-md py-sm text-body-medium',
              icon: 'w-6 h-6',
              spacing: 'gap-sm p-sm'
            },
            lg: {
              input: 'h-input-lg min-h-input-lg px-lg py-md text-body-large',
              button: 'h-input-lg min-w-button px-lg py-md text-body-large',
              icon: 'w-7 h-7',
              spacing: 'gap-md p-md'
            },
            xl: {
              input: 'h-14 min-h-14 px-6 py-4 text-title-small',
              button: 'h-14 min-w-button px-6 py-4 text-title-small',
              icon: 'w-8 h-8',
              spacing: 'gap-lg p-lg'
            }
          },

          // Variant mappings for different component styles
          variants: {
            input: {
              filled: 'bg-surface-container border border-outline-variant text-surface-on-surface placeholder:text-outline hover:border-outline focus:border-primary',
              outlined: 'bg-surface border border-outline text-surface-on-surface placeholder:text-outline hover:border-surface-on-surface focus:border-primary',
              underlined: 'bg-transparent border-0 border-b-2 border-b-outline text-surface-on-surface placeholder:text-outline hover:border-b-surface-on-surface focus:border-b-primary rounded-none',
              text: 'bg-transparent border-transparent text-surface-on-surface placeholder:text-outline focus:bg-surface-variant/20'
            },
            button: {
              filled: 'bg-primary text-primary-on-primary border-0 shadow-elevation1 hover:shadow-elevation2 state-layer-primary',
              outlined: 'bg-transparent border border-outline text-primary hover:bg-primary/8 focus:bg-primary/12 state-layer-primary',
              text: 'bg-transparent border-0 text-primary hover:bg-primary/8 focus:bg-primary/12 state-layer-primary',
              'filled-tonal': 'bg-secondary-container text-secondary-on-container border-0 hover:shadow-elevation1 state-layer-secondary',
              elevated: 'bg-surface shadow-elevation1 text-primary border-0 hover:shadow-elevation2 focus:shadow-elevation1 state-layer-surface'
            },
            toggle: {
              track: {
                checked: 'bg-primary/24 border-primary',
                unchecked: 'bg-surface-variant border-outline'
              },
              thumb: {
                checked: 'bg-primary shadow-elevation1 translate-x-5',
                unchecked: 'bg-outline shadow-elevation1 translate-x-0'
              }
            },
            checkbox: {
              checked: 'bg-primary border-primary text-primary-on-primary shadow-none',
              unchecked: 'bg-transparent border-outline hover:border-primary',
              indeterminate: 'bg-primary border-primary text-primary-on-primary shadow-none'
            },
            radio: {
              checked: 'border-primary bg-primary shadow-none',
              unchecked: 'border-outline bg-transparent hover:border-primary'
            },
            card: {
              elevated: 'bg-surface shadow-elevation1 border-0',
              outlined: 'bg-surface border border-outline-variant shadow-none',
              filled: 'bg-surface-container border-0 shadow-none'
            },
            modal: {
              standard: 'bg-surface shadow-elevation4 border border-outline-variant',
              fullscreen: 'bg-surface shadow-none border-0'
            }
          },

          // Enhanced label positioning styles with all variants
          labelPositions: {
            top: {
              container: 'flex flex-col gap-xs',
              label: 'text-label-medium text-surface-on-surface mb-xs block font-medium',
              wrapper: 'relative',
              animation: 'transition-colors duration-medium1'
            },
            left: {
              container: 'flex items-center gap-md',
              label: 'text-label-medium text-surface-on-surface min-w-24 flex-shrink-0 font-medium',
              wrapper: 'flex-1',
              animation: 'transition-colors duration-medium1'
            },
            right: {
              container: 'flex items-center gap-md flex-row-reverse',
              label: 'text-label-medium text-surface-on-surface min-w-24 flex-shrink-0 font-medium',
              wrapper: 'flex-1',
              animation: 'transition-colors duration-medium1'
            },
            over: {
              container: 'relative',
              label: 'absolute left-3 top-0 transform -translate-y-1/2 bg-surface px-1 text-label-small text-outline transition-all duration-medium1 pointer-events-none z-10',
              labelActive: 'text-primary scale-90 font-medium',
              labelInactive: 'text-outline scale-100',
              wrapper: 'relative'
            },
            floating: {
              container: 'relative',
              label: 'absolute left-3 transition-all duration-medium1 pointer-events-none text-outline z-10',
              labelFloating: 'top-0 transform -translate-y-1/2 bg-surface px-1 text-label-small text-primary scale-90 font-medium',
              labelResting: 'top-1/2 transform -translate-y-1/2 text-body-medium scale-100',
              wrapper: 'relative'
            },
            inside: {
              container: 'relative',
              label: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-outline transition-all duration-medium1 pointer-events-none',
              labelActive: 'top-2 left-2 text-label-small text-primary bg-surface px-1 scale-90 font-medium',
              wrapper: 'relative pt-2'
            },
            none: {
              container: 'relative',
              label: 'sr-only',
              wrapper: 'relative'
            }
          },

          // State classes for interactive components
          states: {
            base: 'transition-all duration-medium1 ease-standard',
            hover: 'hover:bg-opacity-state-hover hover:scale-[1.02] hover:-translate-y-px',
            focus: 'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 focus-visible:ring-4 focus-visible:ring-primary/20',
            focusWithin: 'focus-within:outline-2 focus-within:outline-primary focus-within:outline-offset-2',
            active: 'active:bg-opacity-state-pressed active:scale-95 active:translate-y-0',
            disabled: 'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:grayscale',
            readonly: 'read-only:bg-surface-variant/50 read-only:cursor-default',
            loading: 'opacity-75 cursor-wait animate-pulse',
            error: 'border-error text-error bg-error-light/10 focus:border-error focus:ring-error/20',
            success: 'border-success text-success bg-success-light/10 focus:border-success focus:ring-success/20',
            warning: 'border-warning text-warning bg-warning-light/10 focus:border-warning focus:ring-warning/20',
            info: 'border-info text-info bg-info-light/10 focus:border-info focus:ring-info/20'
          },

          // Animation classes
          animations: {
            ripple: 'relative overflow-hidden before:absolute before:inset-0 before:bg-current before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-8 active:before:opacity-16',
            fadeIn: 'animate-fade-in',
            slideUp: 'animate-slide-up',
            bounce: 'animate-bounce',
            spin: 'animate-spin',
            pulse: 'animate-pulse',
            ping: 'animate-ping'
          },

          // Common component base classes with full specifications
          components: {
            input: {
              base: 'rounded-lg border font-sans transition-all duration-medium1 ease-standard focus-outline',
              container: 'relative w-full',
              field: 'w-full bg-transparent outline-none',
              addon: 'flex items-center justify-center text-outline',
              helperText: 'text-label-small text-outline mt-xs',
              errorText: 'text-label-small text-error mt-xs flex items-center gap-xs',
              successText: 'text-label-small text-success mt-xs flex items-center gap-xs'
            },
            button: {
              base: 'inline-flex items-center justify-center font-medium text-center cursor-pointer select-none transition-all duration-medium1 ease-standard focus-ring disabled:pointer-events-none min-w-button',
              icon: 'flex items-center justify-center',
              loading: 'opacity-75 cursor-wait',
              iconOnly: 'aspect-square min-w-0'
            },
            card: {
              base: 'rounded-lg overflow-hidden transition-all duration-medium1',
              header: 'px-lg py-md border-b border-outline-variant',
              body: 'px-lg py-md',
              footer: 'px-lg py-md border-t border-outline-variant bg-surface-variant/20',
              media: 'w-full object-cover'
            },
            modal: {
              overlay: 'fixed inset-0 bg-background-overlay backdrop-blur-sm z-modal flex items-center justify-center p-md',
              container: 'relative max-h-[90vh] w-full max-w-lg overflow-hidden rounded-xl transition-all duration-medium2',
              header: 'flex items-center justify-between p-lg border-b border-outline-variant',
              body: 'p-lg overflow-y-auto',
              footer: 'flex items-center justify-end gap-md p-lg border-t border-outline-variant'
            },
            tooltip: {
              base: 'absolute z-tooltip rounded-lg px-sm py-xs text-label-small shadow-elevation2 transition-all duration-short2',
              arrow: 'absolute w-2 h-2 rotate-45'
            },
            drawer: {
              overlay: 'fixed inset-0 bg-background-overlay backdrop-blur-sm z-drawer',
              container: 'fixed bg-surface border-outline-variant shadow-elevation3 transition-transform duration-medium2',
              header: 'flex items-center justify-between p-lg border-b border-outline-variant',
              body: 'flex-1 overflow-y-auto p-lg',
              footer: 'border-t border-outline-variant p-lg'
            },
            dropdown: {
              trigger: 'inline-flex items-center justify-between w-full',
              menu: 'absolute z-dropdown mt-1 w-full bg-surface border border-outline-variant rounded-lg shadow-elevation2 max-h-60 overflow-y-auto',
              item: 'px-md py-sm text-body-medium cursor-pointer transition-colors duration-short1 hover:bg-surface-variant focus:bg-surface-variant',
              separator: 'border-t border-outline-variant my-xs'
            },
            notification: {
              container: 'fixed z-notification space-y-md',
              item: 'flex items-start gap-md p-md rounded-lg shadow-elevation3 border transition-all duration-medium2 max-w-sm',
              icon: 'flex-shrink-0 mt-xs',
              content: 'flex-1 min-w-0',
              title: 'font-medium text-surface-on-surface',
              message: 'text-body-small text-outline mt-xs',
              close: 'flex-shrink-0 p-xs -m-xs rounded-full transition-colors hover:bg-surface-variant'
            },
            progress: {
              track: 'relative w-full bg-surface-variant rounded-full overflow-hidden',
              fill: 'absolute top-0 left-0 h-full bg-primary transition-all duration-medium2 rounded-full',
              text: 'text-label-small text-center'
            },
            gauge: {
              container: 'relative inline-flex items-center justify-center',
              track: 'rounded-full border-4 border-surface-variant',
              fill: 'rounded-full border-4 border-primary transition-all duration-medium2',
              text: 'absolute inset-0 flex items-center justify-center text-title-medium font-medium'
            },
            tabs: {
              container: 'w-full',
              list: 'flex border-b border-outline-variant',
              tab: 'px-md py-sm font-medium text-outline border-b-2 border-transparent transition-all duration-short2 hover:text-surface-on-surface focus:text-surface-on-surface',
              tabActive: 'text-primary border-primary',
              panel: 'py-md focus:outline-none'
            }
          },

          // Utility classes for common patterns
          utilities: {
            container: 'container mx-auto px-md',
            section: 'py-section-gap',
            divider: 'border-t border-outline-variant',
            visuallyHidden: 'sr-only',
            truncate: 'truncate',
            ellipsis: 'text-ellipsis overflow-hidden',
            backdrop: 'backdrop-blur-sm bg-background-overlay',
            skeleton: 'animate-pulse bg-surface-variant rounded',
            loading: 'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-surface-variant before:to-transparent before:animate-shimmer'
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
        
        // Enhanced border radius system with theme variations
        corners: {
          none: 'var(--_global-border-radius-none)', // 0
          xs: '2px', // Extra small corners
          sm: 'var(--_global-border-radius-sm)', // 4px - Small corners
          md: 'var(--_global-border-radius-md)', // 8px - Default corners
          lg: 'var(--_global-border-radius-lg)', // 12px - Large corners
          xl: 'var(--_global-border-radius-xl)', // 16px - Extra large corners
          '2xl': '20px', // Double extra large
          '3xl': '24px', // Triple extra large
          full: 'var(--_global-border-radius-full)', // 9999px - Fully rounded
          // Component-specific corner styles
          card: 'var(--_global-border-radius-lg)', // 12px
          button: 'var(--_global-border-radius-full)', // Fully rounded
          input: 'var(--_global-border-radius-md)', // 8px
          modal: 'var(--_global-border-radius-xl)', // 16px
          dropdown: 'var(--_global-border-radius-md)', // 8px
          notification: 'var(--_global-border-radius-lg)', // 12px
          tooltip: 'var(--_global-border-radius-sm)', // 4px
          fab: 'var(--_global-border-radius-xl)', // 16px
          chip: 'var(--_global-border-radius-full)' // Fully rounded
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
            },
            'video': {
              component: 'video-upload',
              accept: 'video/*',
              maxSize: '50MB',
              showPreview: true,
              previewThumbnail: true
            },
            'audio': {
              component: 'audio-upload',
              accept: 'audio/*',
              maxSize: '10MB',
              showWaveform: true,
              showControls: true
            },
            'document': {
              component: 'document-upload',
              accept: '.pdf,.doc,.docx,.txt,.rtf',
              maxSize: '25MB',
              showPreview: false,
              extractText: true
            },
            'json': {
              component: 'json-editor',
              syntax: 'json',
              validate: true,
              format: true,
              showLineNumbers: true
            },
            'code': {
              component: 'code-editor',
              syntax: 'javascript',
              showLineNumbers: true,
              autoComplete: true,
              theme: 'auto'
            },
            'markdown': {
              component: 'markdown-editor',
              preview: true,
              toolbar: true,
              autoPreview: false
            },
            'otp': {
              component: 'otp-input',
              length: 6,
              mask: false,
              placeholder: '•',
              autoSubmit: true
            },
            'signature': {
              component: 'signature-pad',
              width: 400,
              height: 200,
              penColor: '#000000',
              backgroundColor: '#ffffff'
            },
            'location': {
              component: 'location-picker',
              provider: 'browser', // 'browser' | 'google' | 'mapbox'
              showMap: true,
              accuracy: 'high'
            },
            'tags': {
              component: 'tag-input',
              delimiter: ',',
              duplicates: false,
              caseSensitive: false,
              maxTags: null,
              suggestions: []
            },
            'slider': {
              component: 'range-slider',
              showValue: true,
              showTicks: false,
              showLabels: true,
              thumbShape: 'circle',
              trackHeight: '4px'
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