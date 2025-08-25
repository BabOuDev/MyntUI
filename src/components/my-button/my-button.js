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
          display: inline-flex;
          position: relative;
        }

        button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          position: relative;
          
          min-width: 64px;
          height: 40px;
          padding: 0 24px;
          
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          font-size: 16px;
          font-weight: 500;
          line-height: 1;
          text-align: center;
          white-space: nowrap;
          user-select: none;
          
          border: none;
          border-radius: 24px;
          cursor: pointer;
          
          transition: all 150ms ease;
          outline: none;
        }

        /* Size variants */
        button.size-sm {
          height: 32px;
          padding: 0 16px;
          font-size: 14px;
        }

        button.size-lg {
          height: 48px;
          padding: 0 32px;
          font-size: 18px;
        }

        /* Density variants */
        button.density-compact {
          min-width: 48px;
          letter-spacing: 0.01em;
        }

        button.density-compact.size-sm {
          height: 24px;
          padding: 0 12px;
        }

        button.density-compact.size-md {
          height: 32px;
          padding: 0 16px;
        }

        button.density-compact.size-lg {
          height: 40px;
          padding: 0 24px;
        }

        /* Filled variant (default) */
        button.variant-filled,
        button.variant-primary {
          background-color: #007bff;
          color: #ffffff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        }

        button.variant-filled:hover:not(:disabled),
        button.variant-primary:hover:not(:disabled) {
          background-color: #0056b3;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
          transform: translateY(-1px);
        }

        /* Secondary variant */
        button.variant-secondary {
          background-color: #6c757d;
          color: #ffffff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        }

        button.variant-secondary:hover:not(:disabled) {
          background-color: #545b62;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
          transform: translateY(-1px);
        }

        /* Outlined variant */
        button.variant-outlined {
          background-color: transparent;
          color: #007bff;
          border: 1px solid #dee2e6;
          box-shadow: none;
        }

        button.variant-outlined:hover:not(:disabled) {
          background-color: #e3f2fd;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        }

        /* Text variant */
        button.variant-text {
          background-color: transparent;
          color: #007bff;
          box-shadow: none;
          min-width: auto;
        }

        button.variant-text:hover:not(:disabled) {
          background-color: #e3f2fd;
        }

        /* Ghost variant (legacy) */
        button.variant-ghost {
          background-color: transparent;
          color: #007bff;
          border: 1px solid #007bff;
          box-shadow: none;
        }

        button.variant-ghost:hover:not(:disabled) {
          background-color: #e3f2fd;
        }

        /* Success variant */
        button.variant-success {
          background-color: #28a745;
          color: #ffffff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        }

        button.variant-success:hover:not(:disabled) {
          background-color: #218838;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
          transform: translateY(-1px);
        }

        /* Danger variant */
        button.variant-danger {
          background-color: #dc3545;
          color: #ffffff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        }

        button.variant-danger:hover:not(:disabled) {
          background-color: #c82333;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
          transform: translateY(-1px);
        }

        /* Focus state */
        button:focus-visible {
          box-shadow: 0 0 0 2px #80bdff;
          outline: none;
        }

        /* Active state */
        button:active:not(:disabled) {
          transform: translateY(0) scale(0.98);
          transition-duration: 75ms;
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