/**
 * MyntUI my-radio-group Component
 * Manages a set of my-radio components, ensuring only one can be selected at a time
 */

// Import the my-radio component
import '../my-radio/my-radio.js';

class MyRadioGroup extends HTMLElement {
  constructor() {
    super();
    
    // Create Shadow DOM for encapsulation
    this.attachShadow({ mode: 'open' });
    
    // Internal state
    this._value = '';
    
    // Bind event handlers
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    
    // Initialize component
    this.render();
    this.attachEventListeners();
  }

  // Define which attributes to observe for changes
  static get observedAttributes() {
    return ['name', 'value', 'disabled', 'label', 'required', 'size', 'layout', 'error'];
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'value') {
        this._value = newValue || '';
        this.updateRadioSelection();
      }
      this.render();
      this.attachEventListeners();
    }
  }

  // Getters and setters
  get name() {
    return this.getAttribute('name') || '';
  }

  set name(value) {
    this.setAttribute('name', value);
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value || '';
    this.setAttribute('value', this._value);
    this.updateRadioSelection();
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

  get required() {
    return this.hasAttribute('required');
  }

  set required(value) {
    if (value) {
      this.setAttribute('required', '');
    } else {
      this.removeAttribute('required');
    }
  }

  get size() {
    return this.getAttribute('size') || 'md';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  get layout() {
    return this.getAttribute('layout') || 'vertical';
  }

  set layout(value) {
    this.setAttribute('layout', value);
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

  // Get all radio elements
  getRadios() {
    return Array.from(this.querySelectorAll('my-radio'));
  }

  // Update radio selection based on current value
  updateRadioSelection() {
    const radios = this.getRadios();
    radios.forEach(radio => {
      radio.checked = radio.value === this._value;
      if (this.disabled) {
        radio.disabled = true;
      }
      if (this.error) {
        radio.error = true;
      }
    });
  }

  // Handle radio change events
  handleRadioChange(event) {
    if (event.target.tagName.toLowerCase() === 'my-radio') {
      const oldValue = this._value;
      this._value = event.target.value;
      this.setAttribute('value', this._value);
      
      // Update all radios
      this.updateRadioSelection();

      // Emit change event
      this.dispatchEvent(new CustomEvent('change', {
        detail: {
          value: this._value,
          oldValue: oldValue,
          name: this.name
        },
        bubbles: true
      }));
    }
  }

  // Handle keyboard navigation
  handleKeyDown(event) {
    if (this.disabled) return;

    const radios = this.getRadios().filter(radio => !radio.disabled);
    const currentIndex = radios.findIndex(radio => radio.value === this._value);
    
    let nextIndex = -1;
    
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        nextIndex = currentIndex < radios.length - 1 ? currentIndex + 1 : 0;
        break;
        
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : radios.length - 1;
        break;
        
      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        break;
        
      case 'End':
        event.preventDefault();
        nextIndex = radios.length - 1;
        break;
    }
    
    if (nextIndex >= 0 && nextIndex < radios.length) {
      this.value = radios[nextIndex].value;
      radios[nextIndex].focus();
    }
  }

  // Attach event listeners
  attachEventListeners() {
    // Listen for radio change events
    this.removeEventListener('change', this.handleRadioChange);
    this.addEventListener('change', this.handleRadioChange);
    
    // Listen for keyboard events
    this.removeEventListener('keydown', this.handleKeyDown);
    this.addEventListener('keydown', this.handleKeyDown);
  }

  // Connected callback - when element is added to DOM
  connectedCallback() {
    // Set up initial state
    setTimeout(() => {
      const radios = this.getRadios();
      radios.forEach((radio, index) => {
        radio.name = this.name;
        if (this.disabled) {
          radio.disabled = true;
        }
        if (this.error) {
          radio.error = true;
        }
        if (this.size && this.size !== 'md') {
          radio.setAttribute('size', this.size);
        }
        // Set tabindex for keyboard navigation
        radio.setAttribute('tabindex', index === 0 ? '0' : '-1');
      });
      
      // If no value is set but we have radios, don't select any by default
      if (this._value) {
        this.updateRadioSelection();
      }
    }, 0);
  }

  // Render the component
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Component-specific variables using global variables */
          --_radio-group-gap: var(--_global-spacing-sm);
          --_radio-group-gap-horizontal: var(--_global-spacing-md);
          
          display: block;
          position: relative;
        }

        :host([disabled]) {
          opacity: 0.6;
          cursor: not-allowed;
          pointer-events: none;
        }

        .radio-group {
          display: flex;
          flex-direction: column;
          gap: var(--_radio-group-gap);
          position: relative;
        }

        .radio-group.horizontal {
          flex-direction: row;
          flex-wrap: wrap;
          gap: var(--_radio-group-gap-horizontal);
          align-items: center;
        }

        .group-label {
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-medium);
          color: var(--_global-color-on-surface);
          line-height: var(--_global-line-height-tight);
          margin-bottom: var(--_global-spacing-sm);
          font-family: var(--_global-font-family-sans);
        }

        .group-label.required::after {
          content: ' *';
          color: var(--_global-color-error);
        }

        .group-label.error {
          color: var(--_global-color-error);
        }

        /* Focus management for keyboard navigation */
        :host(:focus-within) {
          outline: none;
        }

        /* Size variants */
        :host([size="sm"]) {
          --_radio-group-gap: var(--_global-spacing-xs);
          --_radio-group-gap-horizontal: var(--_global-spacing-sm);
        }

        :host([size="lg"]) {
          --_radio-group-gap: var(--_global-spacing-md);
          --_radio-group-gap-horizontal: var(--_global-spacing-lg);
        }

        /* Error state styling */
        :host([error]) .group-label {
          color: var(--_global-color-error);
        }

        /* Enhanced accessibility */
        :host(:focus-within) .radio-group::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border: 2px solid var(--_global-color-primary);
          border-radius: var(--_global-border-radius-sm);
          opacity: 0.3;
          pointer-events: none;
          z-index: -1;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          :host(:focus-within) .radio-group::before {
            transition: none;
          }
        }
      </style>

      ${this.label ? `<div class="group-label ${this.required ? 'required' : ''} ${this.error ? 'error' : ''}">${this.label}</div>` : ''}
      
      <div 
        class="radio-group ${this.layout === 'horizontal' ? 'horizontal' : ''}"
        role="radiogroup"
        ${this.label ? `aria-labelledby="radio-group-label"` : ''}
        ${this.disabled ? 'aria-disabled="true"' : ''}
        ${this.required ? 'aria-required="true"' : ''}
        ${this.error ? 'aria-invalid="true"' : ''}
      >
        <slot></slot>
      </div>
    `;
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-radio-group')) {
  customElements.define('my-radio-group', MyRadioGroup);
}