/**
 * MyntUI my-icon Component
 * A component for rendering scalable vector icons from the Material Icons library
 */

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
    return ['icon', 'size', 'color', 'disabled', 'interactive', 'aria-label'];
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.attachEventListeners();
    }
  }

  // Getter for icon name
  get icon() {
    return this.getAttribute('icon') || '';
  }

  // Setter for icon name
  set icon(value) {
    this.setAttribute('icon', value);
  }

  // Getter for size
  get size() {
    return this.getAttribute('size') || 'md';
  }

  // Setter for size
  set size(value) {
    this.setAttribute('size', value);
  }

  // Getter for color
  get color() {
    return this.getAttribute('color') || '';
  }

  // Setter for color
  set color(value) {
    this.setAttribute('color', value);
  }

  // Getter for disabled
  get disabled() {
    return this.hasAttribute('disabled');
  }

  // Setter for disabled
  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  // Getter for interactive
  get interactive() {
    return this.hasAttribute('interactive');
  }

  // Setter for interactive
  set interactive(value) {
    if (value) {
      this.setAttribute('interactive', '');
    } else {
      this.removeAttribute('interactive');
    }
  }

  // Handle click events for interactive icons
  handleClick(event) {
    if (this.disabled || !this.interactive) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Emit custom click event
    this.dispatchEvent(new CustomEvent('icon-click', {
      detail: {
        icon: this.icon,
        size: this.size,
        color: this.color
      },
      bubbles: true,
      cancelable: true
    }));
  }

  // Handle keyboard events for interactive icons
  handleKeyDown(event) {
    if (this.disabled || !this.interactive) {
      event.preventDefault();
      return;
    }

    // Handle Enter and Space keys
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleClick(event);
    }
  }

  // Attach event listeners
  attachEventListeners() {
    // Remove existing listeners
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('keydown', this.handleKeyDown);

    // Add listeners only for interactive icons
    if (this.interactive && !this.disabled) {
      this.addEventListener('click', this.handleClick);
      this.addEventListener('keydown', this.handleKeyDown);
      this.setAttribute('tabindex', '0');
      this.setAttribute('role', 'button');
    } else {
      this.removeAttribute('tabindex');
      this.removeAttribute('role');
    }
  }

  // Render the component
  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <style>
        :host {
          /* Icon-specific variables using global semantic variables */
          --_icon-color: ${this.color || 'var(--_global-color-text-primary)'};
          --_icon-size-xs: var(--_global-font-size-xs);
          --_icon-size-sm: var(--_global-font-size-md);
          --_icon-size-md: var(--_global-font-size-lg);
          --_icon-size-lg: var(--_global-font-size-xxl);
          --_icon-size-xl: var(--_global-font-size-display);
          --_icon-size: var(--_icon-size-${this.size});
          
          --_icon-transition: var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          --_icon-focus-ring: 2px solid var(--_global-color-border-focus);
          --_icon-focus-offset: 2px;
          --_icon-border-radius: var(--_global-border-radius-sm);
          
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: var(--_icon-size);
          height: var(--_icon-size);
          color: var(--_icon-color);
          transition: color var(--_icon-transition);
        }

        .material-icons {
          font-family: 'Material Icons';
          font-weight: normal;
          font-style: normal;
          font-size: var(--_icon-size);
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
          color: inherit;
          user-select: none;
        }

        /* Size variants */
        :host([size="xs"]) { --_icon-size: var(--_icon-size-xs); }
        :host([size="sm"]) { --_icon-size: var(--_icon-size-sm); }
        :host([size="md"]) { --_icon-size: var(--_icon-size-md); }
        :host([size="lg"]) { --_icon-size: var(--_icon-size-lg); }
        :host([size="xl"]) { --_icon-size: var(--_icon-size-xl); }

        /* Interactive states - only apply to interactive icons */
        :host([interactive]) {
          cursor: pointer;
          border-radius: var(--_icon-border-radius);
          transition: all var(--_icon-transition);
        }

        :host([interactive]:hover) {
          opacity: 0.8;
          transform: scale(1.05);
          background-color: rgba(0, 0, 0, 0.04);
        }

        :host([interactive]:active) {
          transform: scale(0.95);
          transition-duration: var(--_global-motion-duration-short1);
        }

        /* Focus state for accessibility - only for interactive icons */
        :host([interactive]:focus),
        :host([interactive]:focus-visible) {
          outline: var(--_icon-focus-ring);
          outline-offset: var(--_icon-focus-offset);
          border-radius: var(--_icon-border-radius);
          background-color: rgba(0, 0, 0, 0.08);
        }

        /* Make interactive icons focusable */
        :host([interactive]) {
          tabindex: 0;
        }

        /* Disabled state */
        :host([disabled]) {
          opacity: 0.5;
          pointer-events: none;
          cursor: not-allowed;
        }

        /* Non-interactive icons should not be focusable */
        :host(:not([interactive])) {
          pointer-events: none;
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          :host([interactive]:focus) {
            outline-width: 3px;
            outline-color: var(--_global-color-text-primary);
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          :host([interactive]) {
            transition: none;
          }
          
          :host([interactive]:hover) {
            transform: none;
          }
          
          :host([interactive]:active) {
            transform: none;
          }
        }
      </style>
      <span 
        class="material-icons" 
        role="img" 
        aria-label="${this.getAttribute('aria-label') || this.icon || 'icon'}"
        ${this.disabled ? 'aria-disabled="true"' : ''}
        ${this.interactive ? 'tabindex="0"' : ''}
      >${this.icon}</span>
    `;
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-icon')) {
  customElements.define('my-icon', MyIcon);
}