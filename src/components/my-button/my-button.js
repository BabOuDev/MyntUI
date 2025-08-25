/**
 * MyntUI my-button Component
 * A Material Design 3 button component with proper elevation, state layers, and ripple effects
 * Features: Filled, Outlined, Text variants, CSS-only ripple, density support, accessibility
 */

class MyButton extends HTMLElement {
  constructor() {
    super();
    
    // Create Shadow DOM for encapsulation
    this.attachShadow({ mode: 'open' });
    
    // Bind event handlers
    this.handleClick = this.handleClick.bind(this);
    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    
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

  // Create ripple effect
  createRipple(event) {
    const button = this.shadowRoot.querySelector('button');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    // Remove existing ripples
    const existingRipples = button.querySelectorAll('.ripple');
    existingRipples.forEach(r => r.remove());

    button.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.remove();
      }
    }, 600);
  }

  // Handle pointer down for ripple effect
  handlePointerDown(event) {
    if (this.disabled || this.loading) return;
    this.createRipple(event);
  }

  // Handle keyboard interactions
  handleKeyDown(event) {
    if (this.disabled || this.loading) return;
    
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      // Create ripple at center for keyboard activation
      const button = this.shadowRoot.querySelector('button');
      const rect = button.getBoundingClientRect();
      const syntheticEvent = {
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2
      };
      this.createRipple(syntheticEvent);
      
      // Trigger click after short delay
      setTimeout(() => {
        this.handleClick(event);
      }, 50);
    }
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
      button.removeEventListener('pointerdown', this.handlePointerDown);
      button.removeEventListener('keydown', this.handleKeyDown);
      
      // Add new listeners
      button.addEventListener('click', this.handleClick);
      button.addEventListener('pointerdown', this.handlePointerDown);
      button.addEventListener('keydown', this.handleKeyDown);
    }
  }

  // Get density suffix for CSS variables
  getDensityModifier() {
    const densityMap = {
      'comfortable': '-comfortable',
      'compact': '-compact',
      'dense': '-dense'
    };
    return densityMap[this.density] || '';
  }

  // Render the component
  render() {
    const densityModifier = this.getDensityModifier();
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Component-specific variables using global variables with density support */
          --_button-height-sm: var(--_global-component-height-sm${densityModifier}, var(--_global-component-height-sm));
          --_button-height-md: var(--_global-component-height-md${densityModifier}, var(--_global-component-height-md));
          --_button-height-lg: var(--_global-component-height-lg${densityModifier}, var(--_global-component-height-lg));
          --_button-height: var(--_button-height-${this.size});
          
          --_button-padding-x-sm: var(--_global-spacing-md);
          --_button-padding-x-md: var(--_global-spacing-lg);
          --_button-padding-x-lg: var(--_global-spacing-xl);
          --_button-padding-x: var(--_button-padding-x-${this.size});
          
          --_button-font-size-sm: var(--_global-font-size-sm);
          --_button-font-size-md: var(--_global-font-size-md);
          --_button-font-size-lg: var(--_global-font-size-lg);
          --_button-font-size: var(--_button-font-size-${this.size});
          
          /* Material Design 3 Variants */
          
          /* Filled (Primary) Button */
          --_button-filled-bg: var(--_global-color-primary);
          --_button-filled-text: var(--_global-color-white);
          --_button-filled-elevation: var(--_global-elevation-1);
          --_button-filled-elevation-hover: var(--_global-elevation-2);
          --_button-filled-state-layer: var(--_global-color-white);
          
          /* Filled Secondary Button */
          --_button-filled-secondary-bg: var(--_global-color-secondary);
          --_button-filled-secondary-text: var(--_global-color-white);
          
          /* Filled Success Button */
          --_button-filled-success-bg: var(--_global-color-success);
          --_button-filled-success-text: var(--_global-color-white);
          
          /* Filled Error/Danger Button */
          --_button-filled-danger-bg: var(--_global-color-error);
          --_button-filled-danger-text: var(--_global-color-white);
          
          /* Outlined Button */
          --_button-outlined-bg: transparent;
          --_button-outlined-text: var(--_global-color-primary);
          --_button-outlined-border: 1px solid var(--_global-color-border);
          --_button-outlined-elevation: var(--_global-elevation-0);
          --_button-outlined-elevation-hover: var(--_global-elevation-1);
          --_button-outlined-state-layer: var(--_global-color-primary);
          
          /* Text Button */
          --_button-text-bg: transparent;
          --_button-text-text: var(--_global-color-primary);
          --_button-text-elevation: var(--_global-elevation-0);
          --_button-text-elevation-hover: var(--_global-elevation-0);
          --_button-text-state-layer: var(--_global-color-primary);
          
          /* Ghost Button (Legacy support) */
          --_button-ghost-bg: transparent;
          --_button-ghost-text: var(--_global-color-primary);
          --_button-ghost-border: 1px solid var(--_global-color-primary);
          --_button-ghost-state-layer: var(--_global-color-primary);
          
          display: inline-block;
          position: relative;
        }

        button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--_global-spacing-xs);
          
          height: var(--_button-height);
          min-width: calc(var(--_button-height) * 2);
          padding: 0 var(--_button-padding-x);
          
          font-family: var(--_global-font-family-sans);
          font-size: var(--_button-font-size);
          font-weight: var(--_global-font-weight-medium);
          line-height: 1;
          letter-spacing: 0.01em;
          
          background: none;
          border: none;
          border-radius: var(--_global-border-radius-full);
          cursor: pointer;
          user-select: none;
          text-decoration: none;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          
          /* Material Design Motion */
          transition: 
            background-color var(--_global-motion-duration-short2) var(--_global-motion-easing-standard),
            box-shadow var(--_global-motion-duration-short2) var(--_global-motion-easing-standard),
            border-color var(--_global-motion-duration-short2) var(--_global-motion-easing-standard),
            transform var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
          
          /* Remove default focus outline */
          outline: none;
        }

        /* State Layer */
        button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: currentColor;
          opacity: 0;
          border-radius: inherit;
          transition: opacity var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          pointer-events: none;
        }

        /* Ripple Effect */
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.2;
          pointer-events: none;
          transform: scale(0);
          animation: ripple-animation var(--_global-motion-duration-long1) var(--_global-motion-easing-decelerate);
        }

        @keyframes ripple-animation {
          0% {
            transform: scale(0);
            opacity: 0.2;
          }
          50% {
            opacity: 0.1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        /* Filled Variants */
        button.filled,
        button.primary {
          background-color: var(--_button-filled-bg);
          color: var(--_button-filled-text);
          box-shadow: var(--_button-filled-elevation);
        }

        button.filled:hover:not(:disabled),
        button.primary:hover:not(:disabled) {
          box-shadow: var(--_button-filled-elevation-hover);
          transform: translateY(-1px);
        }

        button.filled:hover:not(:disabled)::before,
        button.primary:hover:not(:disabled)::before {
          opacity: var(--_global-state-layer-hover);
        }

        button.secondary {
          background-color: var(--_button-filled-secondary-bg);
          color: var(--_button-filled-secondary-text);
          box-shadow: var(--_button-filled-elevation);
        }

        button.secondary:hover:not(:disabled) {
          box-shadow: var(--_button-filled-elevation-hover);
          transform: translateY(-1px);
        }

        button.secondary:hover:not(:disabled)::before {
          opacity: var(--_global-state-layer-hover);
        }

        button.success {
          background-color: var(--_button-filled-success-bg);
          color: var(--_button-filled-success-text);
          box-shadow: var(--_button-filled-elevation);
        }

        button.success:hover:not(:disabled) {
          box-shadow: var(--_button-filled-elevation-hover);
          transform: translateY(-1px);
        }

        button.success:hover:not(:disabled)::before {
          opacity: var(--_global-state-layer-hover);
        }

        button.danger {
          background-color: var(--_button-filled-danger-bg);
          color: var(--_button-filled-danger-text);
          box-shadow: var(--_button-filled-elevation);
        }

        button.danger:hover:not(:disabled) {
          box-shadow: var(--_button-filled-elevation-hover);
          transform: translateY(-1px);
        }

        button.danger:hover:not(:disabled)::before {
          opacity: var(--_global-state-layer-hover);
        }

        /* Outlined Variant */
        button.outlined {
          background-color: var(--_button-outlined-bg);
          color: var(--_button-outlined-text);
          border: var(--_button-outlined-border);
          box-shadow: var(--_button-outlined-elevation);
        }

        button.outlined:hover:not(:disabled) {
          box-shadow: var(--_button-outlined-elevation-hover);
          border-color: var(--_global-color-primary);
        }

        button.outlined:hover:not(:disabled)::before {
          opacity: var(--_global-state-layer-hover);
        }

        /* Text Variant */
        button.text {
          background-color: var(--_button-text-bg);
          color: var(--_button-text-text);
          box-shadow: var(--_button-text-elevation);
          min-width: auto;
          padding: 0 var(--_global-spacing-sm);
        }

        button.text:hover:not(:disabled)::before {
          opacity: var(--_global-state-layer-hover);
        }

        /* Ghost Variant (Legacy Support) */
        button.ghost {
          background-color: var(--_button-ghost-bg);
          color: var(--_button-ghost-text);
          border: var(--_button-ghost-border);
          box-shadow: var(--_global-elevation-0);
        }

        button.ghost:hover:not(:disabled) {
          border-color: var(--_global-color-primary-hover);
          box-shadow: var(--_global-elevation-1);
        }

        button.ghost:hover:not(:disabled)::before {
          opacity: var(--_global-state-layer-hover);
        }

        /* Focus States - Use focus-visible for better UX */
        button:focus-visible {
          box-shadow: 0 0 0 2px var(--_global-color-border-focus);
        }

        button:focus-visible::before {
          opacity: var(--_global-state-layer-focus);
        }

        /* Active/Pressed State */
        button:active:not(:disabled) {
          transform: scale(0.98);
        }

        button:active:not(:disabled)::before {
          opacity: var(--_global-state-layer-pressed);
        }

        /* Disabled state */
        button:disabled {
          opacity: 0.38;
          cursor: not-allowed;
          pointer-events: none;
          box-shadow: none;
          transform: none;
        }

        button:disabled::before {
          opacity: 0;
        }

        /* Loading state */
        button.loading {
          cursor: progress;
          pointer-events: none;
        }

        button.loading::before {
          opacity: var(--_global-state-layer-hover);
        }

        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin var(--_global-motion-duration-long2) linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Hide content when loading but keep layout */
        button.loading .content {
          opacity: 0;
        }

        .content {
          display: inline-flex;
          align-items: center;
          gap: var(--_global-spacing-xs);
          position: relative;
          z-index: 1;
          transition: opacity var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
        }

        /* Dense variants */
        :host([density="comfortable"]) button {
          letter-spacing: 0;
        }

        :host([density="compact"]) button {
          letter-spacing: -0.01em;
          gap: calc(var(--_global-spacing-xs) * 0.5);
        }

        :host([density="dense"]) button {
          letter-spacing: -0.02em;
          gap: calc(var(--_global-spacing-xs) * 0.25);
          font-size: calc(var(--_button-font-size) * 0.9);
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          button,
          button::before,
          .ripple,
          .content {
            transition: none;
            animation: none;
          }
        }

        @media (forced-colors: active) {
          button {
            forced-color-adjust: none;
            border: 1px solid ButtonText;
          }
        }

        /* Screen reader only text */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      </style>
      <button 
        class="${this.variant}${this.loading ? ' loading' : ''}"
        ${this.disabled || this.loading ? 'disabled' : ''}
        role="button"
        tabindex="${this.disabled || this.loading ? '-1' : '0'}"
        aria-label="${this.label || 'button'}"
        ${this.loading ? 'aria-busy="true" aria-describedby="loading-text"' : ''}
        aria-pressed="false"
      >
        ${this.loading ? '<div class="loading-spinner" aria-hidden="true"></div>' : ''}
        <span class="content">
          <slot>${this.label}</slot>
        </span>
        ${this.loading ? '<span id="loading-text" class="sr-only">Loading</span>' : ''}
      </button>
    `;
  }
}

// Register the custom element
customElements.define('my-button', MyButton);