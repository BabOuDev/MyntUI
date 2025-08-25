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
    return ['icon', 'size', 'color', 'disabled', 'interactive', 'aria-label', 'variant', 'filled'];
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

  // Getter for variant
  get variant() {
    return this.getAttribute('variant') || 'outlined';
  }

  // Setter for variant
  set variant(value) {
    this.setAttribute('variant', value);
  }

  // Getter for filled
  get filled() {
    return this.hasAttribute('filled');
  }

  // Setter for filled
  set filled(value) {
    if (value) {
      this.setAttribute('filled', '');
    } else {
      this.removeAttribute('filled');
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
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">
      <style>
        :host {
          /* Icon-specific variables using global semantic variables */
          --_icon-color: ${this.color || 'var(--_global-color-on-surface)'};
          --_icon-size-xs: 16px;
          --_icon-size-sm: 20px;
          --_icon-size-md: 24px;
          --_icon-size-lg: 32px;
          --_icon-size-xl: 48px;
          --_icon-size: var(--_icon-size-${this.size});
          
          --_icon-transition: var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          --_icon-focus-ring: 2px solid var(--_global-color-primary);
          --_icon-focus-offset: 2px;
          --_icon-border-radius: var(--_global-border-radius-sm);
          --_icon-state-layer-size: calc(var(--_icon-size) + 16px);
          
          /* Material Design 3 state layer colors */
          --_icon-state-layer-color: var(--_global-color-on-surface);
          --_icon-state-layer-opacity-hover: var(--_global-state-layer-hover);
          --_icon-state-layer-opacity-pressed: var(--_global-state-layer-pressed);
          --_icon-state-layer-opacity-focus: var(--_global-state-layer-focus);
          
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: var(--_icon-size);
          min-height: var(--_icon-size);
          color: var(--_icon-color);
          transition: all var(--_icon-transition);
          position: relative;
        }

        .material-icons,
        .material-symbols {
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

        .material-icons {
          font-family: 'Material Icons';
        }

        .material-symbols.outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        .material-symbols.filled {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        .material-symbols.rounded {
          font-family: 'Material Symbols Rounded';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        .material-symbols.sharp {
          font-family: 'Material Symbols Sharp';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        /* Filled variants */
        :host([filled]) .material-symbols {
          font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
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
          min-width: var(--_icon-state-layer-size);
          min-height: var(--_icon-state-layer-size);
          position: relative;
        }

        /* Material Design 3 State Layer */
        :host([interactive])::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: var(--_icon-state-layer-size);
          height: var(--_icon-state-layer-size);
          border-radius: 50%;
          background-color: var(--_icon-state-layer-color);
          opacity: 0;
          transform: translate(-50%, -50%);
          transition: opacity var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
          pointer-events: none;
          z-index: -1;
        }

        :host([interactive]:hover)::before {
          opacity: var(--_icon-state-layer-opacity-hover);
        }

        :host([interactive]:active)::before {
          opacity: var(--_icon-state-layer-opacity-pressed);
          transform: translate(-50%, -50%) scale(0.95);
          transition-duration: var(--_global-motion-duration-short1);
        }

        :host([interactive]:focus)::before,
        :host([interactive]:focus-visible)::before {
          opacity: var(--_icon-state-layer-opacity-focus);
        }

        /* Focus state for accessibility - only for interactive icons */
        :host([interactive]:focus),
        :host([interactive]:focus-visible) {
          outline: var(--_icon-focus-ring);
          outline-offset: var(--_icon-focus-offset);
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
        class="${this.variant === 'symbols' || this.variant === 'outlined' || this.variant === 'rounded' || this.variant === 'sharp' ? `material-symbols ${this.variant}` : 'material-icons'}" 
        role="${this.interactive ? 'button' : 'img'}" 
        aria-label="${this.getAttribute('aria-label') || this.icon || 'icon'}"
        ${this.disabled ? 'aria-disabled="true"' : ''}
        ${this.interactive && !this.disabled ? 'tabindex="0"' : ''}
      >${this.icon}</span>
    `;
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-icon')) {
  customElements.define('my-icon', MyIcon);
}