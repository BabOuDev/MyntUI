/**
 * MyntUI my-checkbox Component
 * A standard checkbox input for selecting one or more options
 */

class MyCheckbox extends HTMLElement {
  constructor() {
    super();
    
    // Create Shadow DOM for encapsulation
    this.attachShadow({ mode: 'open' });
    
    // Bind event handlers
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.createRipple = this.createRipple.bind(this);
    
    // Initialize component
    this.render();
    this.attachEventListeners();
  }

  // Define which attributes to observe for changes
  static get observedAttributes() {
    return ['checked', 'indeterminate', 'disabled', 'label', 'name', 'value', 'size', 'error'];
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.attachEventListeners();
    }
  }

  // Getters and setters
  get checked() {
    return this.hasAttribute('checked');
  }

  set checked(value) {
    if (value) {
      this.setAttribute('checked', '');
      this.removeAttribute('indeterminate');
    } else {
      this.removeAttribute('checked');
    }
  }

  get indeterminate() {
    return this.hasAttribute('indeterminate');
  }

  set indeterminate(value) {
    if (value) {
      this.setAttribute('indeterminate', '');
      this.removeAttribute('checked');
    } else {
      this.removeAttribute('indeterminate');
    }
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

  get label() {
    return this.getAttribute('label') || '';
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get name() {
    return this.getAttribute('name') || '';
  }

  set name(value) {
    this.setAttribute('name', value);
  }

  get value() {
    return this.getAttribute('value') || 'on';
  }

  set value(value) {
    this.setAttribute('value', value);
  }

  get size() {
    return this.getAttribute('size') || 'md';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  get error() {
    return this.hasAttribute('error');
  }

  set error(value) {
    if (value) {
      this.setAttribute('error', '');
    } else {
      this.removeAttribute('error');
    }
  }

  // Event handlers
  handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    this.createRipple(event);
    this.toggle();
  }

  handleKeyDown(event) {
    if (this.disabled) return;

    if (event.key === ' ') {
      event.preventDefault();
      this.createRipple();
      this.toggle();
    }
  }

  // Create ripple effect for Material Design 3
  createRipple(event) {
    const container = this.shadowRoot.querySelector('.checkbox-container');
    if (!container || this.disabled) return;

    // Remove existing ripples
    const existingRipples = container.querySelectorAll('.ripple');
    existingRipples.forEach(ripple => ripple.remove());

    // Create ripple element
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    // Calculate ripple position and size
    const rect = container.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const radius = size / 2;

    let x, y;
    if (event && event.clientX !== undefined) {
      // Mouse click - position ripple at click point
      x = event.clientX - rect.left - radius;
      y = event.clientY - rect.top - radius;
    } else {
      // Keyboard activation - center ripple
      x = rect.width / 2 - radius;
      y = rect.height / 2 - radius;
    }

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    container.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  // Toggle the checked state
  toggle() {
    if (this.indeterminate) {
      // If indeterminate, go to checked
      this.checked = true;
    } else {
      // Normal toggle
      this.checked = !this.checked;
    }

    // Emit change event
    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        checked: this.checked,
        indeterminate: this.indeterminate,
        value: this.checked ? this.value : null,
        name: this.name
      },
      bubbles: true
    }));
  }

  // Attach event listeners - Standardized pattern for MyntUI components
  attachEventListeners() {
    // Clean up existing listeners first
    this.removeEventListeners();
    
    const checkboxContainer = this.shadowRoot.querySelector('.checkbox-container');
    if (!checkboxContainer) return;
    
    // Only attach listeners to the shadow DOM container element
    checkboxContainer.addEventListener('click', this.handleClick);
    checkboxContainer.addEventListener('keydown', this.handleKeyDown);
    
    // Store references for cleanup
    this._eventTargets = [
      { element: checkboxContainer, events: ['click', 'keydown'] }
    ];
  }

  // Remove event listeners - part of standardized cleanup pattern
  removeEventListeners() {
    if (this._eventTargets) {
      this._eventTargets.forEach(target => {
        target.element.removeEventListener('click', this.handleClick);
        target.element.removeEventListener('keydown', this.handleKeyDown);
      });
      this._eventTargets = null;
    }
  }

  // Cleanup on disconnect - part of standardized lifecycle
  disconnectedCallback() {
    this.removeEventListeners();
  }


  // Render the component
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Component-specific variables using global variables */
          --_checkbox-size: 18px;
          --_checkbox-color: var(--_global-color-primary);
          --_checkbox-color-unchecked: var(--_global-color-on-surface-variant);
          --_checkbox-color-disabled: var(--_global-color-outline);
          --_checkbox-background: var(--_global-color-surface);
          --_checkbox-background-checked: var(--_global-color-primary);
          --_checkbox-background-disabled: var(--_global-color-surface-variant);
          --_checkbox-border: 2px solid var(--_global-color-outline);
          --_checkbox-border-checked: 2px solid var(--_global-color-primary);
          --_checkbox-border-hover: 2px solid var(--_global-color-on-surface);
          --_checkbox-border-radius: var(--_global-border-radius-xs);
          --_checkbox-state-layer-size: 40px;
          --_checkbox-transition: all var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          
          display: inline-flex;
          align-items: center;
          gap: var(--_global-spacing-sm);
          cursor: pointer;
          user-select: none;
          line-height: var(--_global-line-height-normal);
          position: relative;
          min-height: var(--_checkbox-state-layer-size);
          font-family: var(--_global-font-family-sans);
        }

        :host([disabled]) {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }

        .checkbox-container {
          display: inline-flex;
          align-items: center;
          gap: var(--_global-spacing-sm);
          cursor: pointer;
          outline: none;
          position: relative;
          padding: calc((var(--_checkbox-state-layer-size) - var(--_checkbox-size)) / 2);
          margin: calc((var(--_checkbox-state-layer-size) - var(--_checkbox-size)) / -2);
          border-radius: 50%;
          overflow: hidden;
        }
        
        /* State layer for Material Design 3 */
        .checkbox-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background: var(--_checkbox-color);
          opacity: 0;
          transition: opacity var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
          pointer-events: none;
        }
        
        .checkbox-container:hover::before {
          opacity: var(--_global-state-layer-hover);
        }
        
        .checkbox-container:active::before {
          opacity: var(--_global-state-layer-pressed);
        }

        .checkbox-container:focus {
          outline: 2px solid var(--_global-color-primary);
          outline-offset: 2px;
        }
        
        .checkbox-container:focus::before {
          opacity: var(--_global-state-layer-focus);
        }

        .checkbox-input {
          width: var(--_checkbox-size);
          height: var(--_checkbox-size);
          position: relative;
          border: var(--_checkbox-border);
          border-radius: var(--_checkbox-border-radius);
          background-color: var(--_checkbox-background);
          transition: var(--_checkbox-transition);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .checkbox-input.checked {
          background-color: var(--_checkbox-background-checked);
          border-color: var(--_checkbox-background-checked);
        }
        
        .checkbox-input.indeterminate {
          background-color: var(--_checkbox-background-checked);
          border-color: var(--_checkbox-background-checked);
        }
        
        /* Checkmark */
        .checkbox-input::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 10px;
          height: 6px;
          border: 2px solid var(--_global-color-on-primary);
          border-top: none;
          border-right: none;
          transform-origin: center;
          transition: transform var(--_global-motion-duration-short2) var(--_global-motion-easing-emphasized);
        }
        
        .checkbox-input.checked::after {
          transform: translate(-50%, -60%) rotate(-45deg) scale(1);
        }
        
        /* Indeterminate state */
        .checkbox-input.indeterminate::after {
          width: 8px;
          height: 0;
          border: 1px solid var(--_global-color-on-primary);
          border-top: none;
          border-left: none;
          border-right: none;
          transform: translate(-50%, -50%) scale(1);
        }

        .label {
          color: var(--_global-color-on-surface);
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-normal);
          line-height: var(--_global-line-height-normal);
          cursor: pointer;
          flex: 1;
        }

        /* Hover states */
        .checkbox-container:hover:not([aria-disabled="true"]) .checkbox-input:not(.checked):not(.indeterminate) {
          border-color: var(--_global-color-on-surface);
        }

        /* Ripple effect styles */
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple-animation var(--_global-ripple-duration) var(--_global-ripple-easing);
          background-color: currentColor;
          opacity: var(--_global-ripple-opacity-pressed);
          pointer-events: none;
          z-index: 1;
        }

        @keyframes ripple-animation {
          0% {
            transform: scale(0);
            opacity: var(--_global-ripple-opacity-pressed);
          }
          50% {
            opacity: calc(var(--_global-ripple-opacity-pressed) * 0.5);
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        /* Size variants */
        :host([size="sm"]) {
          --_checkbox-size: 16px;
          --_checkbox-state-layer-size: 36px;
        }

        :host([size="lg"]) {
          --_checkbox-size: 24px;
          --_checkbox-state-layer-size: 48px;
        }

        /* Error state */
        :host([error]) {
          --_checkbox-color: var(--_global-color-error);
          --_checkbox-border: 2px solid var(--_global-color-error);
          --_checkbox-background-checked: var(--_global-color-error);
        }

        :host([error]) .checkbox-input.checked,
        :host([error]) .checkbox-input.indeterminate {
          background-color: var(--_global-color-error);
          border-color: var(--_global-color-error);
        }

        :host([error]) .label {
          color: var(--_global-color-error);
        }

        /* Disabled state */
        :host([disabled]) {
          --_checkbox-color: var(--_checkbox-color-disabled);
          --_checkbox-border: 2px solid var(--_checkbox-color-disabled);
        }
        
        :host([disabled]) .checkbox-container::before {
          display: none;
        }

        :host([disabled]) .checkbox-input {
          background-color: var(--_checkbox-background-disabled);
        }
        
        :host([disabled]) .checkbox-input.checked,
        :host([disabled]) .checkbox-input.indeterminate {
          background-color: var(--_checkbox-color-disabled);
          border-color: var(--_checkbox-color-disabled);
        }

        :host([disabled]) .label {
          color: var(--_global-color-outline);
        }
        
        /* Accessibility improvements - High Contrast Mode Support */
        @media (prefers-contrast: high) {
          .checkbox-input {
            border: 3px solid currentColor;
            background-color: var(--_global-color-surface);
          }
          
          .checkbox-input.checked,
          .checkbox-input.indeterminate {
            background-color: var(--_global-color-primary);
            outline: 2px solid;
            outline-offset: 2px;
          }
          
          .ripple {
            display: none;
          }
          
          .label {
            font-weight: var(--_global-font-weight-bold);
          }
        }

        /* Accessibility improvements - Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          .checkbox-input,
          .checkbox-input::after,
          .checkbox-container::before,
          .ripple {
            animation: none;
            transition: none;
          }
          
          .ripple {
            display: none;
          }
        }

        /* Enhanced focus-visible for better keyboard navigation */
        @supports selector(:focus-visible) {
          .checkbox-container:focus:not(:focus-visible) {
            outline: none;
          }
        }
      </style>

      <div 
        class="checkbox-container"
        role="checkbox"
        aria-checked="${this.indeterminate ? 'mixed' : this.checked}"
        aria-label="${this.label || 'checkbox'}"
        ${this.disabled ? 'aria-disabled="true"' : ''}
        tabindex="${this.disabled ? '-1' : '0'}"
      >
        <div class="checkbox-input ${this.checked ? 'checked' : ''} ${this.indeterminate ? 'indeterminate' : ''}"></div>
        
        ${this.label ? `<span class="label">${this.label}</span>` : '<slot></slot>'}
      </div>
    `;
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-checkbox')) {
  customElements.define('my-checkbox', MyCheckbox);
}