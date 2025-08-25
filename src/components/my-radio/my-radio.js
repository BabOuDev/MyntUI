/**
 * MyntUI my-radio Component  
 * Individual radio button component that works with my-radio-group
 */

class MyRadio extends HTMLElement {
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
    return ['checked', 'disabled', 'label', 'name', 'value', 'size', 'error'];
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
    } else {
      this.removeAttribute('checked');
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
    return this.getAttribute('value') || '';
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
    this.select();
  }

  handleKeyDown(event) {
    if (this.disabled) return;

    if (event.key === ' ') {
      event.preventDefault();
      this.createRipple();
      this.select();
    }
  }

  // Create ripple effect for Material Design 3
  createRipple(event) {
    const container = this.shadowRoot.querySelector('.radio-container');
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

  // Select this radio
  select() {
    if (!this.checked) {
      this.checked = true;
      
      // Emit change event that the radio group will handle
      this.dispatchEvent(new CustomEvent('change', {
        detail: {
          checked: true,
          value: this.value,
          name: this.name
        },
        bubbles: true
      }));
    }
  }

  // Focus method for keyboard navigation
  focus() {
    const radioContainer = this.shadowRoot.querySelector('.radio-container');
    if (radioContainer) {
      radioContainer.focus();
    }
  }

  // Attach event listeners
  attachEventListeners() {
    const radioContainer = this.shadowRoot.querySelector('.radio-container');
    if (radioContainer) {
      // Remove existing listeners
      radioContainer.removeEventListener('click', this.handleClick);
      radioContainer.removeEventListener('keydown', this.handleKeyDown);
      
      // Add new listeners
      radioContainer.addEventListener('click', this.handleClick);
      radioContainer.addEventListener('keydown', this.handleKeyDown);
    }
  }

  // Render the component
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Component-specific variables using global variables */
          --_radio-size: 20px;
          --_radio-color: var(--_global-color-primary);
          --_radio-color-unchecked: var(--_global-color-on-surface-variant);
          --_radio-color-disabled: var(--_global-color-outline);
          --_radio-background: var(--_global-color-surface);
          --_radio-border: 2px solid var(--_global-color-outline);
          --_radio-border-checked: 2px solid var(--_global-color-primary);
          --_radio-border-hover: 2px solid var(--_global-color-on-surface);
          --_radio-state-layer-size: 40px;
          --_radio-transition: all var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          
          display: inline-flex;
          align-items: center;
          gap: var(--_global-spacing-sm);
          cursor: pointer;
          user-select: none;
          line-height: var(--_global-line-height-normal);
          position: relative;
          min-height: var(--_radio-state-layer-size);
          font-family: var(--_global-font-family-sans);
        }

        :host([disabled]) {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }

        .radio-container {
          display: inline-flex;
          align-items: center;
          gap: var(--_global-spacing-sm);
          cursor: pointer;
          outline: none;
          position: relative;
          padding: calc((var(--_radio-state-layer-size) - var(--_radio-size)) / 2);
          margin: calc((var(--_radio-state-layer-size) - var(--_radio-size)) / -2);
          border-radius: 50%;
          overflow: hidden;
        }

        /* Material Design 3 State Layer */
        .radio-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background: var(--_radio-color);
          opacity: 0;
          transition: opacity var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
          pointer-events: none;
        }
        
        .radio-container:hover::before {
          opacity: var(--_global-state-layer-hover);
        }
        
        .radio-container:active::before {
          opacity: var(--_global-state-layer-pressed);
        }

        .radio-container:focus {
          outline: 2px solid var(--_global-color-primary);
          outline-offset: 2px;
        }
        
        .radio-container:focus::before {
          opacity: var(--_global-state-layer-focus);
        }

        .radio-input {
          width: var(--_radio-size);
          height: var(--_radio-size);
          position: relative;
          border: var(--_radio-border);
          border-radius: 50%;
          background-color: var(--_radio-background);
          transition: var(--_radio-transition);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .radio-input.checked {
          border: var(--_radio-border-checked);
        }
        
        /* Inner dot for checked state */
        .radio-input::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: var(--_radio-color);
          transform: scale(0);
          transition: transform var(--_global-motion-duration-short2) var(--_global-motion-easing-emphasized);
        }
        
        .radio-input.checked::after {
          transform: scale(1);
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
        .radio-container:hover:not([aria-disabled="true"]) .radio-input:not(.checked) {
          border: var(--_radio-border-hover);
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
          --_radio-size: 16px;
          --_radio-state-layer-size: 36px;
        }

        :host([size="lg"]) {
          --_radio-size: 24px;
          --_radio-state-layer-size: 48px;
        }

        /* Error state */
        :host([error]) {
          --_radio-color: var(--_global-color-error);
          --_radio-border: 2px solid var(--_global-color-error);
          --_radio-border-checked: 2px solid var(--_global-color-error);
        }

        :host([error]) .radio-input.checked {
          border-color: var(--_global-color-error);
        }

        :host([error]) .radio-input.checked::after {
          background-color: var(--_global-color-error);
        }

        :host([error]) .label {
          color: var(--_global-color-error);
        }

        /* Disabled state */
        :host([disabled]) {
          --_radio-color: var(--_radio-color-disabled);
          --_radio-border: 2px solid var(--_radio-color-disabled);
        }
        
        :host([disabled]) .radio-container::before {
          display: none;
        }

        :host([disabled]) .radio-input {
          background-color: var(--_global-color-surface-variant);
        }
        
        :host([disabled]) .radio-input.checked {
          border-color: var(--_radio-color-disabled);
        }

        :host([disabled]) .radio-input.checked::after {
          background-color: var(--_radio-color-disabled);
        }

        :host([disabled]) .label {
          color: var(--_global-color-outline);
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .radio-input,
          .radio-input::after,
          .radio-container::before {
            transition: none;
          }
        }
      </style>

      <div 
        class="radio-container"
        role="radio"
        aria-checked="${this.checked}"
        aria-label="${this.label || 'radio button'}"
        ${this.disabled ? 'aria-disabled="true"' : ''}
        tabindex="${this.getAttribute('tabindex') || '0'}"
      >
        <div class="radio-input ${this.checked ? 'checked' : ''}"></div>
        
        ${this.label ? `<span class="label">${this.label}</span>` : '<slot></slot>'}
      </div>
    `;
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-radio')) {
  customElements.define('my-radio', MyRadio);
}