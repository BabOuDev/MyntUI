/**
 * MyntUI my-radio-group Component
 * Manages a set of my-radio components, ensuring only one can be selected at a time
 */

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
    return ['name', 'value', 'disabled', 'label'];
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

    const radios = this.getRadios();
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
          
          display: block;
        }

        :host([disabled]) {
          opacity: 0.5;
          pointer-events: none;
        }

        .radio-group {
          display: flex;
          flex-direction: column;
          gap: var(--_radio-group-gap);
        }

        .radio-group.horizontal {
          flex-direction: row;
          flex-wrap: wrap;
        }

        .group-label {
          font-size: var(--_global-font-size-md);
          font-weight: var(--_global-font-weight-medium);
          color: var(--_global-color-text-primary);
          margin-bottom: var(--_global-spacing-sm);
        }

        /* Focus management for keyboard navigation */
        :host(:focus-within) {
          outline: none;
        }
      </style>

      ${this.label ? `<div class="group-label">${this.label}</div>` : ''}
      
      <div 
        class="radio-group ${this.getAttribute('layout') === 'horizontal' ? 'horizontal' : ''}"
        role="radiogroup"
        ${this.label ? `aria-label="${this.label}"` : ''}
        ${this.disabled ? 'aria-disabled="true"' : ''}
      >
        <slot></slot>
      </div>
    `;
  }
}

// Register the custom element
customElements.define('my-radio-group', MyRadioGroup);

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
    
    // Initialize component
    this.render();
    this.attachEventListeners();
  }

  // Define which attributes to observe for changes
  static get observedAttributes() {
    return ['checked', 'disabled', 'label', 'name', 'value'];
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

  // Event handlers
  handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    this.select();
  }

  handleKeyDown(event) {
    if (this.disabled) return;

    if (event.key === ' ') {
      event.preventDefault();
      this.select();
    }
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
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <style>
        :host {
          /* Component-specific variables using global variables */
          --_radio-size: 20px;
          --_radio-color: var(--_global-color-primary);
          --_radio-color-disabled: var(--_global-color-gray-400);
          
          display: inline-flex;
          align-items: flex-start;
          gap: var(--_global-spacing-sm);
          cursor: pointer;
          user-select: none;
          line-height: var(--_global-line-height-normal);
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
        }

        .radio-container:focus .radio-icon {
          box-shadow: 0 0 0 2px var(--_global-color-border-focus);
          border-radius: 50%;
        }

        .radio-icon {
          width: var(--_radio-size);
          height: var(--_radio-size);
          color: var(--_radio-color);
          transition: color var(--_global-transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--_radio-size);
          line-height: 1;
        }

        .radio-icon.unchecked {
          color: var(--_global-color-gray-600);
        }

        .radio-icon:hover {
          color: var(--_radio-color);
          opacity: 0.8;
        }

        .label {
          color: var(--_global-color-text-primary);
          font-size: var(--_global-font-size-md);
          font-weight: var(--_global-font-weight-normal);
          line-height: var(--_global-line-height-normal);
          cursor: pointer;
        }

        /* Size variants */
        :host([size="sm"]) {
          --_radio-size: 16px;
        }

        :host([size="lg"]) {
          --_radio-size: 24px;
        }

        /* Disabled state */
        :host([disabled]) .radio-icon {
          color: var(--_radio-color-disabled);
        }

        :host([disabled]) .label {
          color: var(--_global-color-text-muted);
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
        <span class="material-icons radio-icon ${!this.checked ? 'unchecked' : ''}">
          ${this.checked ? 'radio_button_checked' : 'radio_button_unchecked'}
        </span>
        
        ${this.label ? `<span class="label">${this.label}</span>` : '<slot></slot>'}
      </div>
    `;
  }
}

// Register the custom element
customElements.define('my-radio', MyRadio);