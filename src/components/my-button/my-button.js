/**
 * MyntUI my-button Component
 * A Material Design 3 button component with proper elevation and styling
 */

class MyButton extends HTMLElement {
  constructor() {
    super();
    
    // Create Shadow DOM for encapsulation
    this.attachShadow({ mode: 'open' });
    
    // Bind event handlers
    this.handleClick = this.handleClick.bind(this);
    
    // Initialize component
    this.render();
    this.attachEventListeners();
  }

  // Define which attributes to observe for changes
  static get observedAttributes() {
    return ['label', 'variant', 'disabled', 'loading', 'size', 'density'];
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.attachEventListeners();
    }
  }

  // Getters and setters for properties
  get label() {
    return this.getAttribute('label') || '';
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get variant() {
    return this.getAttribute('variant') || 'filled';
  }

  set variant(value) {
    this.setAttribute('variant', value);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get loading() {
    return this.hasAttribute('loading');
  }

  set loading(value) {
    if (value) {
      this.setAttribute('loading', '');
    } else {
      this.removeAttribute('loading');
    }
  }

  get size() {
    return this.getAttribute('size') || 'md';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  get density() {
    return this.getAttribute('density') || 'default';
  }

  set density(value) {
    this.setAttribute('density', value);
  }

  // Handle click events
  handleClick(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Emit custom click event
    this.dispatchEvent(new CustomEvent('click', {
      detail: {
        variant: this.variant,
        label: this.label,
        size: this.size,
        density: this.density
      },
      bubbles: true,
      cancelable: true
    }));
  }

  // Attach event listeners
  attachEventListeners() {
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      // Remove existing listeners
      button.removeEventListener('click', this.handleClick);
      // Add new listeners
      button.addEventListener('click', this.handleClick);
    }
  }

  // Render the component
  render() {
    const isLoading = this.loading;
    const isDisabled = this.disabled;
    const variant = this.variant;
    const size = this.size;
    const density = this.density;
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Button-specific variables using global semantic variables */
          --_button-min-width: 64px;
          --_button-height-sm: var(--_global-component-height-sm);
          --_button-height-md: var(--_global-component-height-md);
          --_button-height-lg: var(--_global-component-height-lg);
          
          --_button-padding-sm: 0 var(--_global-spacing-md);
          --_button-padding-md: 0 var(--_global-spacing-lg);
          --_button-padding-lg: 0 var(--_global-spacing-xl);
          
          --_button-font-family: var(--_global-font-family-sans);
          --_button-font-size-sm: var(--_global-font-size-sm);
          --_button-font-size-md: var(--_global-font-size-md);
          --_button-font-size-lg: var(--_global-font-size-lg);
          --_button-font-weight: var(--_global-font-weight-medium);
          --_button-line-height: var(--_global-line-height-tight);
          
          --_button-border-radius: var(--_global-border-radius-full);
          --_button-gap: var(--_global-spacing-sm);
          
          --_button-transition: var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          --_button-transition-fast: var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
          
          /* Primary colors */
          --_button-primary-bg: var(--_global-color-primary);
          --_button-primary-bg-hover: var(--_global-color-primary-hover);
          --_button-primary-bg-active: var(--_global-color-primary-active);
          --_button-primary-text: var(--_global-color-white);
          
          /* Secondary colors */
          --_button-secondary-bg: var(--_global-color-secondary);
          --_button-secondary-bg-hover: var(--_global-color-secondary-hover);
          --_button-secondary-bg-active: var(--_global-color-secondary-active);
          --_button-secondary-text: var(--_global-color-white);
          
          /* Status colors */
          --_button-success-bg: var(--_global-color-success);
          --_button-error-bg: var(--_global-color-error);
          
          /* Outlined variant */
          --_button-outlined-border: 1px solid var(--_global-color-border);
          --_button-outlined-text: var(--_global-color-primary);
          --_button-outlined-bg-hover: rgba(0, 123, 255, 0.08);
          
          /* Text variant */
          --_button-text-bg-hover: rgba(0, 123, 255, 0.08);
          
          /* Elevations */
          --_button-elevation: var(--_global-elevation-1);
          --_button-elevation-hover: var(--_global-elevation-2);
          
          /* Focus */
          --_button-focus-ring: 0 0 0 2px var(--_global-color-border-focus);
          
          /* State layers */
          --_button-state-hover: var(--_global-state-layer-hover);
          --_button-state-pressed: var(--_global-state-layer-pressed);
          
          display: inline-flex;
          position: relative;
        }

        button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--_button-gap);
          position: relative;
          
          min-width: var(--_button-min-width);
          height: var(--_button-height-md);
          padding: var(--_button-padding-md);
          
          font-family: var(--_button-font-family);
          font-size: var(--_button-font-size-md);
          font-weight: var(--_button-font-weight);
          line-height: var(--_button-line-height);
          text-align: center;
          white-space: nowrap;
          user-select: none;
          
          border: none;
          border-radius: var(--_button-border-radius);
          cursor: pointer;
          
          transition: all var(--_button-transition);
          outline: none;
        }

        /* Size variants */
        button.size-sm {
          height: var(--_button-height-sm);
          padding: var(--_button-padding-sm);
          font-size: var(--_button-font-size-sm);
        }

        button.size-lg {
          height: var(--_button-height-lg);
          padding: var(--_button-padding-lg);
          font-size: var(--_button-font-size-lg);
        }

        /* Density variants */
        button.density-compact {
          min-width: 48px;
          letter-spacing: 0.01em;
        }

        button.density-compact.size-sm {
          height: var(--_global-component-height-sm-compact);
          padding: 0 var(--_global-spacing-sm);
        }

        button.density-compact.size-md {
          height: var(--_global-component-height-md-compact);
          padding: 0 var(--_global-spacing-md);
        }

        button.density-compact.size-lg {
          height: var(--_global-component-height-lg-compact);
          padding: 0 var(--_global-spacing-lg);
        }

        /* Filled variant (default) */
        button.variant-filled,
        button.variant-primary {
          background-color: var(--_button-primary-bg);
          color: var(--_button-primary-text);
          box-shadow: var(--_button-elevation);
        }

        button.variant-filled:hover:not(:disabled),
        button.variant-primary:hover:not(:disabled) {
          background-color: var(--_button-primary-bg-hover);
          box-shadow: var(--_button-elevation-hover);
          transform: translateY(-1px);
        }

        /* Secondary variant */
        button.variant-secondary {
          background-color: var(--_button-secondary-bg);
          color: var(--_button-secondary-text);
          box-shadow: var(--_button-elevation);
        }

        button.variant-secondary:hover:not(:disabled) {
          background-color: var(--_button-secondary-bg-hover);
          box-shadow: var(--_button-elevation-hover);
          transform: translateY(-1px);
        }

        /* Outlined variant */
        button.variant-outlined {
          background-color: transparent;
          color: var(--_button-outlined-text);
          border: var(--_button-outlined-border);
          box-shadow: none;
        }

        button.variant-outlined:hover:not(:disabled) {
          background-color: var(--_button-outlined-bg-hover);
          box-shadow: var(--_button-elevation);
        }

        /* Text variant */
        button.variant-text {
          background-color: transparent;
          color: var(--_button-outlined-text);
          box-shadow: none;
          min-width: auto;
        }

        button.variant-text:hover:not(:disabled) {
          background-color: var(--_button-text-bg-hover);
        }

        /* Ghost variant (legacy) */
        button.variant-ghost {
          background-color: transparent;
          color: var(--_button-outlined-text);
          border: 1px solid var(--_button-outlined-text);
          box-shadow: none;
        }

        button.variant-ghost:hover:not(:disabled) {
          background-color: var(--_button-text-bg-hover);
        }

        /* Success variant */
        button.variant-success {
          background-color: var(--_button-success-bg);
          color: var(--_global-color-white);
          box-shadow: var(--_button-elevation);
        }

        button.variant-success:hover:not(:disabled) {
          background-color: var(--_global-color-success);
          filter: brightness(0.9);
          box-shadow: var(--_button-elevation-hover);
          transform: translateY(-1px);
        }

        /* Danger variant */
        button.variant-danger {
          background-color: var(--_button-error-bg);
          color: var(--_global-color-white);
          box-shadow: var(--_button-elevation);
        }

        button.variant-danger:hover:not(:disabled) {
          background-color: var(--_global-color-error);
          filter: brightness(0.9);
          box-shadow: var(--_button-elevation-hover);
          transform: translateY(-1px);
        }

        /* Focus state */
        button:focus-visible {
          box-shadow: var(--_button-focus-ring);
          outline: none;
        }

        /* Active state */
        button:active:not(:disabled) {
          transform: translateY(0) scale(0.98);
          transition-duration: var(--_button-transition-fast);
        }

        /* Disabled state */
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          pointer-events: none;
          transform: none;
          box-shadow: none;
        }

        /* Loading state */
        button.loading {
          opacity: 0.8;
          cursor: not-allowed;
        }

        /* Loading spinner */
        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: 8px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Content container */
        .content {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        /* Hide content when loading */
        button.loading .content {
          visibility: hidden;
        }
      </style>
      <button 
        class="variant-${variant} size-${size} density-${density} ${isLoading ? 'loading' : ''}"
        ${isDisabled || isLoading ? 'disabled' : ''}
        aria-label="${this.label || 'button'}"
        ${isLoading ? 'aria-busy="true"' : ''}
      >
        ${isLoading ? '<div class="loading-spinner" aria-hidden="true"></div>' : ''}
        <span class="content">
          <slot>${this.label}</slot>
        </span>
      </button>
    `;
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-button')) {
  customElements.define('my-button', MyButton);
}