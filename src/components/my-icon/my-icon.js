/**
 * MyntUI my-icon Component - TailwindCSS Enhanced Version
 * A component for rendering scalable vector icons using TailwindCSS for consistent styling
 * Supports both built-in SVG icons and Material Icons font fallback
 */

import { globalConfig } from '../../config/global-config.js';

// Built-in SVG icon library with Material Design icons
const BUILTIN_ICONS = {
  // Navigation icons
  home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  menu: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  arrow_back: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
  arrow_forward: 'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z',
  close: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  expand_more: 'M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z',
  expand_less: 'M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z',

  // Action icons
  search: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  add: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
  delete: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
  edit: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
  check: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',

  // User icons
  person: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  settings: 'M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z',

  // Status icons
  favorite: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  star: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
  visibility: 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z',
  visibility_off: 'M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z',

  // Status and feedback icons
  error: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
  warning: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
  info: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
  success: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',

  // Additional commonly used icons
  face: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8.5 7C9.33 7 10 7.67 10 8.5S9.33 10 8.5 10 7 9.33 7 8.5 7.67 7 8.5 7zm7 0c.83 0 1.5.67 1.5 1.5S16.33 10 15.5 10 14 9.33 14 8.5 14.67 7 15.5 7zm-7.5 9c0-1.5 2.5-3 4-3s4 1.5 4 3',
  mail: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  phone: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1-.45 1-1V20c0-.55-.45-1-1-1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
  email: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  location: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
  notification: 'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z'
};

class MyIcon extends HTMLElement {
  constructor() {
    super();
    
    // Create Shadow DOM for encapsulation
    this.attachShadow({ mode: 'open' });
    
    // Bind event handlers
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    
    // Initialize component
    this.render();
    this.attachEventListeners();
  }

  // Define which attributes to observe for changes
  static get observedAttributes() {
    return ['icon', 'size', 'color', 'disabled', 'interactive', 'aria-label', 'variant', 'filled', 'use-font-fallback'];
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.attachEventListeners();
    }
  }

  // Getters and setters
  get icon() {
    return this.getAttribute('icon') || '';
  }

  set icon(value) {
    this.setAttribute('icon', value);
  }

  get size() {
    return this.getAttribute('size') || 'md';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  get color() {
    return this.getAttribute('color') || '';
  }

  set color(value) {
    this.setAttribute('color', value);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    this.toggleAttribute('disabled', Boolean(value));
  }

  get interactive() {
    return this.hasAttribute('interactive');
  }

  set interactive(value) {
    this.toggleAttribute('interactive', Boolean(value));
  }

  // Generate TailwindCSS classes based on props
  getTailwindClasses() {
    const size = this.size;
    const color = this.color;
    const disabled = this.disabled;
    const interactive = this.interactive;
    
    // Base classes
    let classes = [
      'inline-flex',
      'items-center',
      'justify-center',
      'flex-shrink-0'
    ];

    // Size classes
    const sizeClasses = {
      xs: ['w-4', 'h-4'],
      sm: ['w-5', 'h-5'],
      md: ['w-6', 'h-6'],
      lg: ['w-7', 'h-7'],
      xl: ['w-8', 'h-8'],
      '2xl': ['w-10', 'h-10']
    };

    classes.push(...(sizeClasses[size] || sizeClasses.md));

    // Color classes
    if (color) {
      // Handle predefined colors
      const colorClasses = {
        primary: 'text-primary',
        secondary: 'text-secondary',
        tertiary: 'text-tertiary',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-error',
        info: 'text-info',
        'on-surface': 'text-surface-on-surface',
        'on-primary': 'text-primary-on-primary',
        outline: 'text-outline',
        disabled: 'text-outline opacity-50'
      };

      classes.push(colorClasses[color] || `text-${color}`);
    } else {
      // Default color
      classes.push('text-surface-on-surface');
    }

    // Interactive states
    if (interactive && !disabled) {
      classes.push(
        'cursor-pointer',
        'transition-all',
        'duration-medium1',
        'ease-standard',
        'hover:scale-105',
        'hover:text-primary',
        'active:scale-95',
        'focus-visible:outline',
        'focus-visible:outline-2',
        'focus-visible:outline-primary',
        'focus-visible:outline-offset-2'
      );
    }

    // Disabled state
    if (disabled) {
      classes.push('opacity-50', 'cursor-not-allowed');
    }

    return classes.join(' ');
  }

  // Generate SVG icon
  generateSvgIcon(iconName, pathData) {
    const size = this.size;
    const classes = this.getTailwindClasses();
    
    return `
      <svg 
        class="${classes}" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        role="img"
        aria-labelledby="icon-title"
        aria-hidden="${this.interactive ? 'false' : 'true'}"
      >
        <title id="icon-title">${this.getAttribute('aria-label') || iconName}</title>
        <path d="${pathData}"/>
      </svg>
    `;
  }

  // Generate Material Icon font fallback
  generateFontIcon(iconName) {
    const classes = this.getTailwindClasses().replace(/w-\d+|h-\d+/g, '');
    
    // Size mapping for font icons
    const fontSizeClasses = {
      xs: 'text-base',      // 16px
      sm: 'text-lg',        // 18px  
      md: 'text-xl',        // 20px
      lg: 'text-2xl',       // 24px
      xl: 'text-3xl',       // 30px
      '2xl': 'text-4xl'     // 36px
    };

    const sizeClass = fontSizeClasses[this.size] || fontSizeClasses.md;
    
    return `
      <span 
        class="material-icons ${classes} ${sizeClass} leading-none"
        role="img"
        aria-label="${this.getAttribute('aria-label') || iconName}"
        aria-hidden="${this.interactive ? 'false' : 'true'}"
      >
        ${iconName}
      </span>
    `;
  }

  // Handle click events
  handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (this.interactive) {
      // Emit custom event
      this.dispatchEvent(new CustomEvent('icon-click', {
        detail: {
          icon: this.icon,
          size: this.size,
          color: this.color
        },
        bubbles: true,
        composed: true
      }));
    }
  }

  // Handle keyboard events
  handleKeyDown(event) {
    if (this.disabled || !this.interactive) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleClick(event);
    }
  }

  // Attach event listeners
  attachEventListeners() {
    // Remove existing listeners
    const iconElement = this.shadowRoot.querySelector('[role="img"]');
    if (iconElement) {
      iconElement.removeEventListener('click', this.handleClick);
      iconElement.removeEventListener('keydown', this.handleKeyDown);
    }

    if (this.interactive && !this.disabled) {
      const newIconElement = this.shadowRoot.querySelector('[role="img"]');
      if (newIconElement) {
        newIconElement.addEventListener('click', this.handleClick);
        newIconElement.addEventListener('keydown', this.handleKeyDown);
        
        // Make interactive icons focusable
        if (!newIconElement.hasAttribute('tabindex')) {
          newIconElement.setAttribute('tabindex', '0');
        }
      }
    }
  }

  // Render the component
  render() {
    const iconName = this.icon;
    const useFontFallback = this.hasAttribute('use-font-fallback');
    
    if (!iconName) {
      this.shadowRoot.innerHTML = `
        <style>
          @import '/src/styles/tailwind.css';
          
          :host {
            display: inline-flex;
          }
        </style>
        <div class="w-6 h-6 bg-outline rounded flex items-center justify-center text-surface text-xs">?</div>
      `;
      return;
    }

    // Check if we have a built-in SVG icon
    const pathData = BUILTIN_ICONS[iconName];
    let iconHtml;

    if (pathData && !useFontFallback) {
      // Use built-in SVG icon
      iconHtml = this.generateSvgIcon(iconName, pathData);
    } else {
      // Use Material Icons font fallback
      iconHtml = this.generateFontIcon(iconName);
    }

    this.shadowRoot.innerHTML = `
      <style>
        @import '/src/styles/tailwind.css';
        
        :host {
          display: inline-flex;
        }
        
        /* Material Icons font support */
        .material-icons {
          font-family: 'Material Icons';
          font-weight: normal;
          font-style: normal;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
        }
        
        /* Interactive states */
        [role="img"]:focus {
          outline: 2px solid theme(colors.primary.DEFAULT);
          outline-offset: 2px;
        }
        
        /* Accessibility enhancements */
        @media (prefers-reduced-motion: reduce) {
          [role="img"] {
            transition: none !important;
            transform: none !important;
          }
        }
        
        @media (prefers-contrast: high) {
          [role="img"] {
            outline: 1px solid currentColor;
            outline-offset: 1px;
          }
        }
      </style>
      
      ${iconHtml}
    `;

    // Attach event listeners after rendering
    this.attachEventListeners();
  }

  // Lifecycle callbacks
  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    // Clean up event listeners
    const iconElement = this.shadowRoot.querySelector('[role="img"]');
    if (iconElement) {
      iconElement.removeEventListener('click', this.handleClick);
      iconElement.removeEventListener('keydown', this.handleKeyDown);
    }
  }
}

// Register the custom element
if (!customElements.get('my-icon')) {
  customElements.define('my-icon', MyIcon);
}

export { MyIcon };