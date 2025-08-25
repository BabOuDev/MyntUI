/**
 * MyntUI my-button Component
 * A customizable button component for user interaction
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
    return ['label', 'variant', 'disabled', 'loading', 'size'];
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
    return this.getAttribute('variant') || 'primary';
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
        label: this.label
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
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Component-specific variables using global variables */
          --_button-height-sm: var(--_global-component-height-sm);
          --_button-height-md: var(--_global-component-height-md);
          --_button-height-lg: var(--_global-component-height-lg);
          --_button-height: var(--_button-height-${this.size});
          
          --_button-padding-x-sm: var(--_global-spacing-sm);
          --_button-padding-x-md: var(--_global-spacing-md);
          --_button-padding-x-lg: var(--_global-spacing-lg);
          --_button-padding-x: var(--_button-padding-x-${this.size});
          
          --_button-font-size-sm: var(--_global-font-size-sm);
          --_button-font-size-md: var(--_global-font-size-md);
          --_button-font-size-lg: var(--_global-font-size-lg);
          --_button-font-size: var(--_button-font-size-${this.size});
          
          /* Variant styles */
          --_button-bg-primary: var(--_global-color-primary);
          --_button-bg-primary-hover: var(--_global-color-primary-hover);
          --_button-text-primary: var(--_global-color-white);
          
          --_button-bg-secondary: var(--_global-color-secondary);
          --_button-bg-secondary-hover: var(--_global-color-secondary-hover);
          --_button-text-secondary: var(--_global-color-white);
          
          --_button-bg-ghost: transparent;
          --_button-bg-ghost-hover: var(--_global-color-gray-100);
          --_button-text-ghost: var(--_global-color-primary);
          --_button-border-ghost: 1px solid var(--_global-color-primary);
          
          --_button-bg-danger: var(--_global-color-error);
          --_button-bg-danger-hover: #c82333;
          --_button-text-danger: var(--_global-color-white);
          
          display: inline-block;
        }

        button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--_global-spacing-xs);
          
          height: var(--_button-height);
          padding: 0 var(--_button-padding-x);
          
          font-family: var(--_global-font-family-sans);
          font-size: var(--_button-font-size);
          font-weight: var(--_global-font-weight-medium);
          line-height: 1;
          
          border: none;
          border-radius: var(--_global-border-radius-md);
          cursor: pointer;
          user-select: none;
          text-decoration: none;
          text-align: center;
          white-space: nowrap;
          
          transition: all var(--_global-transition-fast);
          
          /* Focus outline */
          outline: none;
        }

        /* Variant styles */
        button.primary {
          background-color: var(--_button-bg-primary);
          color: var(--_button-text-primary);
        }

        button.primary:hover:not(:disabled) {
          background-color: var(--_button-bg-primary-hover);
        }

        button.secondary {
          background-color: var(--_button-bg-secondary);
          color: var(--_button-text-secondary);
        }

        button.secondary:hover:not(:disabled) {
          background-color: var(--_button-bg-secondary-hover);
        }

        button.ghost {
          background-color: var(--_button-bg-ghost);
          color: var(--_button-text-ghost);
          border: var(--_button-border-ghost);
        }

        button.ghost:hover:not(:disabled) {
          background-color: var(--_button-bg-ghost-hover);
        }

        button.danger {
          background-color: var(--_button-bg-danger);
          color: var(--_button-text-danger);
        }

        button.danger:hover:not(:disabled) {
          background-color: var(--_button-bg-danger-hover);
        }

        /* Focus state */
        button:focus {
          box-shadow: 0 0 0 2px var(--_global-color-border-focus);
        }

        /* Disabled state */
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          pointer-events: none;
        }

        /* Loading state */
        button.loading {
          opacity: 0.8;
          cursor: not-allowed;
        }

        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Hide content when loading */
        button.loading .content {
          visibility: hidden;
        }

        .content {
          display: inline-flex;
          align-items: center;
          gap: var(--_global-spacing-xs);
        }
      </style>
      <button 
        class="${this.variant}${this.loading ? ' loading' : ''}"
        ${this.disabled || this.loading ? 'disabled' : ''}
        role="button"
        tabindex="${this.disabled || this.loading ? '-1' : '0'}"
        aria-label="${this.label || 'button'}"
        ${this.loading ? 'aria-busy="true"' : ''}
      >
        ${this.loading ? '<div class="loading-spinner" aria-hidden="true"></div>' : ''}
        <span class="content">
          <slot>${this.label}</slot>
        </span>
      </button>
    `;
  }
}

// Register the custom element
customElements.define('my-button', MyButton);