/**
 * MyntUI my-input Component
 * A versatile input component that supports various HTML5 input types and custom validation
 */

class MyInput extends HTMLElement {
  constructor() {
    super();
    
    // Create Shadow DOM for encapsulation
    this.attachShadow({ mode: 'open' });
    
    // Internal state
    this._schema = {};
    this._value = '';
    this._errors = [];
    
    // Bind event handlers
    this.handleInput = this.handleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    
    // Initialize component
    this.parseAttributes();
    this.render();
    this.attachEventListeners();
  }

  // Define which attributes to observe for changes
  static get observedAttributes() {
    return [
      'type', 'label', 'name', 'placeholder', 'value', 'required', 'disabled', 'readonly',
      'min', 'max', 'minlength', 'maxlength', 'pattern', 'step', 'autocomplete',
      'label-position', 'schema', 'aria-label', 'aria-describedby', 'aria-invalid'
    ];
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.parseAttributes();
      this.render();
      this.attachEventListeners();
    }
  }

  // Parse attributes and build schema
  parseAttributes() {
    // Check if full schema is provided as JSON
    const schemaAttr = this.getAttribute('schema');
    if (schemaAttr) {
      try {
        this._schema = JSON.parse(schemaAttr);
      } catch (e) {
        console.warn('Invalid schema JSON in my-input:', e);
        this._schema = {};
      }
    }

    // Build schema from individual attributes
    this._schema = {
      type: this.getAttribute('type') || this._schema.type || 'text',
      label: this.getAttribute('label') || this._schema.label || '',
      name: this.getAttribute('name') || this._schema.name || '',
      placeholder: this.getAttribute('placeholder') || this._schema.placeholder || '',
      value: this.getAttribute('value') || this._schema.value || '',
      labelPosition: this.getAttribute('label-position') || this._schema.labelPosition || 'top',
      required: this.hasAttribute('required') || this._schema.required || false,
      disabled: this.hasAttribute('disabled') || this._schema.disabled || false,
      readonly: this.hasAttribute('readonly') || this._schema.readonly || false,
      min: this.getAttribute('min') || this._schema.min,
      max: this.getAttribute('max') || this._schema.max,
      minLength: this.getAttribute('minlength') || this._schema.minLength,
      maxLength: this.getAttribute('maxlength') || this._schema.maxLength,
      pattern: this.getAttribute('pattern') || this._schema.pattern,
      step: this.getAttribute('step') || this._schema.step,
      autocomplete: this.getAttribute('autocomplete') || this._schema.autocomplete,
      validation: this._schema.validation,
      options: this._schema.options || [],
      multiple: this._schema.multiple || false,
      ...this._schema
    };

    // Set initial value
    this._value = this._schema.value;
  }

  // Getters and setters
  get schema() {
    return this._schema;
  }

  set schema(value) {
    this._schema = { ...value };
    this.render();
    this.attachEventListeners();
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.setAttribute('value', value);
    const inputElement = this.shadowRoot.querySelector('input, textarea, select');
    if (inputElement) {
      inputElement.value = value;
    }
  }

  get valid() {
    return this._errors.length === 0;
  }

  get errors() {
    return this._errors;
  }

  // Public method to programmatically focus the input
  focus() {
    const inputElement = this.shadowRoot.querySelector('input, textarea, select');
    if (inputElement && !this._schema.disabled) {
      inputElement.focus();
    }
  }

  // Public method to programmatically blur the input
  blur() {
    const inputElement = this.shadowRoot.querySelector('input, textarea, select');
    if (inputElement) {
      inputElement.blur();
    }
  }

  // Validation methods
  validateRequired(value) {
    if (this._schema.required && (!value || value.toString().trim() === '')) {
      return `${this._schema.label || 'This field'} is required`;
    }
    return null;
  }

  validatePattern(value) {
    if (this._schema.pattern && value) {
      const regex = new RegExp(this._schema.pattern);
      if (!regex.test(value)) {
        return `${this._schema.label || 'This field'} format is invalid`;
      }
    }
    return null;
  }

  validateLength(value) {
    if (value) {
      const length = value.toString().length;
      if (this._schema.minLength && length < this._schema.minLength) {
        return `${this._schema.label || 'This field'} must be at least ${this._schema.minLength} characters`;
      }
      if (this._schema.maxLength && length > this._schema.maxLength) {
        return `${this._schema.label || 'This field'} must be no more than ${this._schema.maxLength} characters`;
      }
    }
    return null;
  }

  validateRange(value) {
    if (value && (this._schema.type === 'number' || this._schema.type === 'integer')) {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        if (this._schema.min !== undefined && num < this._schema.min) {
          return `${this._schema.label || 'This field'} must be at least ${this._schema.min}`;
        }
        if (this._schema.max !== undefined && num > this._schema.max) {
          return `${this._schema.label || 'This field'} must be no more than ${this._schema.max}`;
        }
      }
    }
    return null;
  }

  validateCustom(value) {
    if (this._schema.validation && typeof this._schema.validation === 'function') {
      try {
        const result = this._schema.validation(value);
        if (result !== true) {
          return result || `${this._schema.label || 'This field'} is invalid`;
        }
      } catch (e) {
        console.warn('Custom validation function error:', e);
        return `${this._schema.label || 'This field'} validation failed`;
      }
    }
    return null;
  }

  // Run all validations
  validate(value = this._value) {
    this._errors = [];

    const validations = [
      this.validateRequired(value),
      this.validatePattern(value),
      this.validateLength(value),
      this.validateRange(value),
      this.validateCustom(value)
    ];

    this._errors = validations.filter(error => error !== null);
    
    return this.valid;
  }

  // Event handlers
  handleInput(event) {
    this._value = event.target.value;
    this.validate();

    // Emit custom input event
    this.dispatchEvent(new CustomEvent('input', {
      detail: {
        value: this._value,
        valid: this.valid,
        errors: this._errors,
        name: this._schema.name
      },
      bubbles: true
    }));

    this.updateErrorDisplay();
  }

  handleChange(event) {
    this._value = event.target.value;
    this.validate();

    // Emit custom change event
    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        value: this._value,
        valid: this.valid,
        errors: this._errors,
        name: this._schema.name
      },
      bubbles: true
    }));

    this.updateErrorDisplay();
  }

  handleBlur(event) {
    this.validate();
    this.updateErrorDisplay();
    this.updateFocusState(false);
  }

  // Handle focus events
  handleFocus(event) {
    this.updateFocusState(true);
  }

  // Handle keyboard navigation
  handleKeyDown(event) {
    if (this._schema.disabled || this._schema.readonly) {
      return;
    }

    const inputElement = this.shadowRoot.querySelector('input, textarea, select');
    if (!inputElement) return;

    // Handle Escape key to clear input (for non-required fields)
    if (event.key === 'Escape' && !this._schema.required) {
      inputElement.value = '';
      this._value = '';
      this.validate();
      this.updateErrorDisplay();
      
      // Emit custom change event
      this.dispatchEvent(new CustomEvent('input', {
        detail: {
          value: this._value,
          valid: this.valid,
          errors: this._errors,
          name: this._schema.name
        },
        bubbles: true
      }));
    }

    // Handle Enter key for form submission
    if (event.key === 'Enter' && this._schema.type !== 'textarea') {
      this.validate();
      this.dispatchEvent(new CustomEvent('submit', {
        detail: {
          value: this._value,
          valid: this.valid,
          errors: this._errors,
          name: this._schema.name
        },
        bubbles: true
      }));
    }
  }

  // Update focus state for visual feedback
  updateFocusState(focused) {
    const inputElement = this.shadowRoot.querySelector('input, textarea, select');
    const container = this.shadowRoot.querySelector('.input-container');
    
    if (inputElement && container) {
      if (focused) {
        inputElement.classList.add('focused');
        container.classList.add('focused');
      } else {
        inputElement.classList.remove('focused');
        container.classList.remove('focused');
      }
    }
  }

  // Update error display with accessibility improvements
  updateErrorDisplay() {
    const errorElement = this.shadowRoot.querySelector('.error-message');
    const inputElement = this.shadowRoot.querySelector('input, textarea, select');
    const container = this.shadowRoot.querySelector('.input-container');
    
    if (errorElement && inputElement) {
      if (this._errors.length > 0) {
        errorElement.textContent = this._errors[0];
        errorElement.style.display = 'block';
        
        // Update ARIA attributes for accessibility
        inputElement.setAttribute('aria-invalid', 'true');
        inputElement.setAttribute('aria-describedby', `${this._schema.name}-error`);
        
        // Add error class to container for styling
        if (container) {
          container.classList.add('has-error');
        }
      } else {
        errorElement.style.display = 'none';
        
        // Clear ARIA attributes
        inputElement.setAttribute('aria-invalid', 'false');
        inputElement.removeAttribute('aria-describedby');
        
        // Remove error class
        if (container) {
          container.classList.remove('has-error');
        }
      }
    }
  }

  // Attach event listeners
  attachEventListeners() {
    const inputElement = this.shadowRoot.querySelector('input, textarea, select');
    if (inputElement) {
      // Remove existing listeners
      inputElement.removeEventListener('input', this.handleInput);
      inputElement.removeEventListener('change', this.handleChange);
      inputElement.removeEventListener('blur', this.handleBlur);
      inputElement.removeEventListener('focus', this.handleFocus);
      inputElement.removeEventListener('keydown', this.handleKeyDown);
      
      // Add new listeners
      inputElement.addEventListener('input', this.handleInput);
      inputElement.addEventListener('change', this.handleChange);
      inputElement.addEventListener('blur', this.handleBlur);
      inputElement.addEventListener('focus', this.handleFocus);
      inputElement.addEventListener('keydown', this.handleKeyDown);
    }

    // Make the custom element focusable if not disabled
    if (!this._schema.disabled) {
      this.setAttribute('tabindex', '0');
      // Remove existing listeners
      this.removeEventListener('focus', this.handleFocus);
      this.removeEventListener('blur', this.handleBlur);
      this.removeEventListener('keydown', this.handleKeyDown);
      
      // Add listeners to custom element for keyboard navigation
      this.addEventListener('focus', this.handleFocus);
      this.addEventListener('blur', this.handleBlur);
      this.addEventListener('keydown', this.handleKeyDown);
    } else {
      this.removeAttribute('tabindex');
    }
  }

  // Generate input element based on type with accessibility attributes
  generateInputElement() {
    const { type, name, placeholder, value, disabled, readonly, label } = this._schema;
    const inputId = `${name}-input`;
    const errorId = `${name}-error`;
    const hasErrors = this._errors.length > 0;

    // Get custom ARIA attributes
    const ariaLabel = this.getAttribute('aria-label') || label;
    const ariaDescribedBy = this.getAttribute('aria-describedby') || (hasErrors ? errorId : '');
    const ariaInvalid = this.getAttribute('aria-invalid') || (hasErrors ? 'true' : 'false');

    const commonAttributes = `
      id="${inputId}"
      name="${name}"
      class="input-field"
      ${placeholder ? `placeholder="${placeholder}"` : ''}
      ${disabled ? 'disabled' : ''}
      ${readonly ? 'readonly' : ''}
      ${this._schema.required ? 'required aria-required="true"' : ''}
      ${this._schema.autocomplete ? `autocomplete="${this._schema.autocomplete}"` : ''}
      ${ariaLabel ? `aria-label="${ariaLabel}"` : ''}
      ${ariaDescribedBy ? `aria-describedby="${ariaDescribedBy}"` : ''}
      aria-invalid="${ariaInvalid}"
    `.trim();

    switch (type) {
      case 'textarea':
        return `<textarea ${commonAttributes} role="textbox" aria-multiline="true">${value}</textarea>`;
        
      case 'select':
        const options = this._schema.options.map(option => 
          `<option value="${option.value}" ${value === option.value ? 'selected' : ''}>${option.label}</option>`
        ).join('');
        return `<select ${commonAttributes} role="combobox" aria-expanded="false" ${this._schema.multiple ? 'multiple aria-multiselectable="true"' : ''}>${options}</select>`;
        
      default:
        const inputAttributes = `
          type="${type}"
          value="${value}"
          ${this._schema.min !== undefined ? `min="${this._schema.min}"` : ''}
          ${this._schema.max !== undefined ? `max="${this._schema.max}"` : ''}
          ${this._schema.minLength ? `minlength="${this._schema.minLength}"` : ''}
          ${this._schema.maxLength ? `maxlength="${this._schema.maxLength}"` : ''}
          ${this._schema.pattern ? `pattern="${this._schema.pattern}"` : ''}
          ${this._schema.step ? `step="${this._schema.step}"` : ''}
        `.trim();
        
        // Add appropriate role based on input type
        let role = '';
        if (type === 'email') role = 'textbox';
        else if (type === 'tel') role = 'textbox';
        else if (type === 'url') role = 'textbox';
        else if (type === 'search') role = 'searchbox';
        else if (type === 'number') role = 'spinbutton';
        
        return `<input ${commonAttributes} ${inputAttributes} ${role ? `role="${role}"` : ''}>`;
    }
  }

  // Render the component
  render() {
    const { label, labelPosition } = this._schema;
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Input-specific variables using global semantic variables */
          --_input-height: var(--_global-input-height);
          --_input-padding-x: var(--_global-spacing-md);
          --_input-padding-y: var(--_global-spacing-sm);
          --_input-border-color: var(--_global-color-outline-variant);
          --_input-border-color-focus: var(--_global-color-primary);
          --_input-border-color-error: var(--_global-color-error);
          --_input-border-color-hover: var(--_global-color-outline);
          --_input-background: var(--_global-color-surface-container-low);
          --_input-background-hover: var(--_global-color-surface-container);
          --_input-background-focus: var(--_global-color-surface-container-high);
          --_input-text-color: var(--_global-color-on-surface);
          --_input-placeholder-color: var(--_global-color-on-surface-variant);
          --_input-label-color: var(--_global-color-on-surface-variant);
          --_input-label-color-focus: var(--_global-color-primary);
          
          --_input-elevation: var(--_global-elevation-1);
          --_input-elevation-hover: var(--_global-elevation-2);
          --_input-elevation-focus: var(--_global-elevation-3);
          --_input-border-radius: var(--_global-border-radius-sm);
          --_input-border-radius-top: var(--_global-border-radius-sm) var(--_global-border-radius-sm) 0 0;
          --_input-transition: all var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          --_input-state-layer-opacity: var(--_global-state-layer-hover);
          
          display: block;
          width: 100%;
          position: relative;
          font-family: var(--_global-font-family-sans);
        }

        /* Host focus management */
        :host(:focus-within) .input-container {
          transform: translateY(-1px);
        }

        :host([disabled]) {
          pointer-events: none;
          cursor: not-allowed;
        }

        .input-container {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: var(--_global-spacing-xs);
        }

        .input-container.label-left {
          flex-direction: row;
          align-items: center;
          gap: var(--_global-spacing-md);
        }

        .input-container.label-over {
          position: relative;
        }

        .label {
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-medium);
          color: var(--_input-label-color);
          line-height: var(--_global-line-height-tight);
          transition: color var(--_input-transition);
          display: block;
          margin-bottom: var(--_global-spacing-xs);
        }

        .label.required::after {
          content: ' *';
          color: var(--_global-color-error);
        }

        .label.over {
          position: absolute;
          top: 50%;
          left: var(--_input-padding-x);
          transform: translateY(-50%);
          background: var(--_input-background);
          padding: 0 var(--_global-spacing-xs);
          transition: all var(--_global-motion-duration-medium1) var(--_global-motion-easing-emphasized);
          pointer-events: none;
          z-index: 2;
          margin-bottom: 0;
          border-radius: var(--_global-border-radius-sm);
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
        }

        .input-field {
          width: 100%;
          height: var(--_input-height);
          padding: var(--_input-padding-y) var(--_input-padding-x);
          border: 1px solid var(--_input-border-color);
          border-radius: var(--_input-border-radius);
          background-color: var(--_input-background);
          color: var(--_input-text-color);
          font-size: var(--_global-font-size-md);
          font-family: var(--_global-font-family-sans);
          font-weight: var(--_global-font-weight-normal);
          line-height: var(--_global-line-height-normal);
          transition: var(--_input-transition);
          outline: none;
          box-shadow: var(--_input-elevation);
          position: relative;
          z-index: 1;
        }
        
        /* Material Design 3 State Layer */
        .input-field::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: currentColor;
          opacity: 0;
          transition: opacity var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
          pointer-events: none;
          border-radius: inherit;
        }

        .input-field::placeholder {
          color: var(--_input-placeholder-color);
        }

        /* Hover states */
        .input-field:hover:not(:disabled):not(:focus) {
          border-color: var(--_input-border-color-hover);
          background-color: var(--_input-background-hover);
          box-shadow: var(--_input-elevation-hover);
        }
        
        .input-field:hover:not(:disabled):not(:focus)::before {
          opacity: var(--_input-state-layer-opacity);
        }

        /* Enhanced Focus states with Material Design 3 emphasis */
        .input-field:focus,
        .input-field.focused {
          border-color: var(--_input-border-color-focus);
          border-width: 2px;
          background-color: var(--_input-background-focus);
          box-shadow: var(--_input-elevation-focus);
          outline: none;
          transform: translateY(-1px);
        }
        
        .input-field:focus::before,
        .input-field.focused::before {
          opacity: var(--_global-state-layer-focus);
        }

        /* Enhanced focus for container */
        .input-container.focused {
          transform: translateY(-1px);
          transition: transform var(--_input-transition);
        }
        
        .input-container.focused .label:not(.over) {
          color: var(--_input-label-color-focus);
        }

        /* Focus-visible for keyboard navigation */
        .input-field:focus-visible {
          outline: 2px solid var(--_input-border-color-focus);
          outline-offset: 2px;
        }

        /* Enhanced disabled state */
        .input-field:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background-color: var(--_global-color-gray-100);
          color: var(--_global-color-text-disabled);
          border-color: var(--_global-color-border-disabled);
        }

        .input-field:disabled::placeholder {
          color: var(--_global-color-text-disabled);
        }

        /* Host-level disabled state */
        :host([disabled]) {
          pointer-events: none;
          cursor: not-allowed;
        }

        :host([disabled]) .input-container {
          opacity: 0.6;
        }

        /* Enhanced error states */
        .input-field.error,
        .input-container.has-error .input-field {
          border-color: var(--_input-border-color-error);
          background-color: rgba(220, 53, 69, 0.05);
        }

        .input-field.error:focus,
        .input-container.has-error .input-field:focus {
          box-shadow: var(--_input-error-shadow);
          border-color: var(--_input-border-color-error);
        }

        /* Error state for container */
        .input-container.has-error {
          --_input-border-color: var(--_input-border-color-error);
        }

        /* Animate error state changes */
        .input-container.has-error .input-field {
          animation: shake 0.3s ease-in-out;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }

        /* Textarea specific styling */
        textarea.input-field {
          height: auto;
          min-height: calc(var(--_input-height) * 2);
          resize: vertical;
          line-height: var(--_global-line-height-normal);
        }

        /* Select specific styling */
        select.input-field {
          cursor: pointer;
        }

        /* Slot styling */
        .slot-left,
        .slot-right {
          display: flex;
          align-items: center;
          padding: 0 var(--_global-spacing-xs);
          color: var(--_global-color-text-muted);
          font-size: var(--_global-font-size-sm);
          white-space: nowrap;
        }

        .slot-left {
          border-right: 1px solid var(--_global-color-border);
        }

        .slot-right {
          border-left: 1px solid var(--_global-color-border);
        }

        .input-field.has-left-slot {
          border-left: none;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }

        .input-field.has-right-slot {
          border-right: none;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }

        /* Enhanced error message styling */
        .error-message {
          color: var(--_global-color-error);
          font-size: var(--_global-font-size-xs);
          margin-top: var(--_global-spacing-xs);
          display: none;
          line-height: var(--_global-line-height-tight);
          font-weight: var(--_global-font-weight-medium);
          opacity: 0;
          transform: translateY(-4px);
          transition: opacity var(--_input-transition), transform var(--_input-transition);
        }

        .error-message[style*="block"] {
          opacity: 1;
          transform: translateY(0);
        }

        /* Enhanced Floating label animation with Material Design 3 styling */
        .input-field:focus ~ .label.over,
        .input-field:not(:placeholder-shown) ~ .label.over {
          top: -8px;
          left: calc(var(--_input-padding-x) - 4px);
          transform: translateY(0) scale(0.75);
          font-size: var(--_global-font-size-xs);
          color: var(--_input-label-color-focus);
          background: var(--_global-color-surface);
          border-radius: var(--_global-border-radius-sm);
          font-weight: var(--_global-font-weight-medium);
          box-shadow: 0 0 0 4px var(--_global-color-surface);
          letter-spacing: 0.01em;
        }
        
        /* Error state for floating label */
        .input-container.has-error .input-field:focus ~ .label.over,
        .input-container.has-error .input-field:not(:placeholder-shown) ~ .label.over {
          color: var(--_input-border-color-error);
        }
        
        /* Ensure floating label stays elevated */
        .input-field:focus ~ .label.over,
        .input-field:not(:placeholder-shown) ~ .label.over {
          z-index: 3;
        }
      </style>

      <div class="input-container ${labelPosition === 'left' ? 'label-left' : labelPosition === 'over' ? 'label-over' : ''}">
        ${labelPosition !== 'over' ? `<label class="label ${this._schema.required ? 'required' : ''}" for="${this._schema.name}-input">${label}</label>` : ''}
        
        <div class="input-wrapper">
          <div class="slot-left">
            <slot name="left"></slot>
          </div>
          
          ${this.generateInputElement()}
          
          ${labelPosition === 'over' ? `<label class="label over ${this._schema.required ? 'required' : ''}" for="${this._schema.name}-input">${label}</label>` : ''}
          
          <div class="slot-right">
            <slot name="right"></slot>
          </div>
        </div>
        
        <div class="error-message" id="${this._schema.name}-error" role="alert" aria-live="polite" aria-atomic="true"></div>
      </div>
    `;

    // Apply conditional classes based on slots and state
    const inputField = this.shadowRoot.querySelector('.input-field');
    const container = this.shadowRoot.querySelector('.input-container');
    const leftSlot = this.shadowRoot.querySelector('slot[name="left"]');
    const rightSlot = this.shadowRoot.querySelector('slot[name="right"]');
    
    if (inputField && container) {
      // Add error class if there are validation errors
      if (this._errors.length > 0) {
        inputField.classList.add('error');
        container.classList.add('has-error');
      } else {
        inputField.classList.remove('error');
        container.classList.remove('has-error');
      }

      // Handle slot visibility
      if (leftSlot && leftSlot.assignedElements().length > 0) {
        inputField.classList.add('has-left-slot');
      }
      
      if (rightSlot && rightSlot.assignedElements().length > 0) {
        inputField.classList.add('has-right-slot');
      }
    }
    
    // Update error display to ensure proper ARIA attributes
    this.updateErrorDisplay();
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-input')) {
  customElements.define('my-input', MyInput);
}