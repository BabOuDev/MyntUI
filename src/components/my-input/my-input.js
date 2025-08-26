/**
 * MyntUI my-input Component - TailwindCSS Enhanced Version
 * A Material Design 3 input component using TailwindCSS for consistent styling
 * Supports comprehensive input types with enhanced validation and accessibility
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';
import { globalConfig } from '../../config/global-config.js';

class MyInput extends MyntUIBaseComponent {
  constructor() {
    super();
    
    // Component-specific internal state
    this._schema = {};
    this._value = '';
    this._errors = [];
    this._touched = false;
    this._focused = false;
    
    // Component-specific bindings
    this.handleInput = this.handleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    
    // Debounced validation for better performance 
    this._validationTimer = null;
    
    // Initialize with base component pattern
    this.log('Input component initializing...');
    this.parseAttributes();
  }

  // Extended observed attributes (inherits base ones)
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'type', 'label', 'name', 'placeholder', 'value', 'required', 'readonly',
      'min', 'max', 'minlength', 'maxlength', 'pattern', 'step', 'autocomplete',
      'label-position', 'schema', 'aria-label', 'aria-describedby', 'aria-invalid',
      'leading-icon', 'trailing-icon', 'helper-text', 'character-count'
    ];
  }

  // Component-specific attribute handling
  handleAttributeChange(name, oldValue, newValue) {
    super.handleAttributeChange(name, oldValue, newValue);
    
    // Re-parse attributes for complex input components
    this.parseAttributes();
    
    switch (name) {
      case 'disabled':
        this.announceToScreenReader(
          `Input ${this.disabled ? 'disabled' : 'enabled'}`,
          'polite'
        );
        break;
      case 'value':
        this._value = newValue || '';
        this.validateInput();
        break;
      case 'required':
        this.announceToScreenReader(
          `Input is ${newValue !== null ? 'required' : 'optional'}`,
          'polite'
        );
        break;
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

    // Get config defaults
    const inputConfig = globalConfig.get('components.input', {});
    
    // Build schema from individual attributes with config defaults
    this._schema = {
      type: this.getAttribute('type') || this._schema.type || 'text',
      label: this.getAttribute('label') || this._schema.label || '',
      name: this.getAttribute('name') || this._schema.name || '',
      placeholder: this.getAttribute('placeholder') || this._schema.placeholder || '',
      value: this.getAttribute('value') || this._schema.value || '',
      labelPosition: this.getAttribute('label-position') || this._schema.labelPosition || inputConfig.labelPosition || 'top',
      variant: this.getAttribute('variant') || this._schema.variant || inputConfig.variant || 'outlined',
      size: this.getAttribute('size') || this._schema.size || inputConfig.size || 'md',
      leadingIcon: this.getAttribute('leading-icon') || this._schema.leadingIcon || this.getAutoIcon(),
      trailingIcon: this.getAttribute('trailing-icon') || this._schema.trailingIcon || '',
      helperText: this.getAttribute('helper-text') || this._schema.helperText || '',
      characterCount: this.hasAttribute('character-count') || this._schema.characterCount || false,
      dense: this.hasAttribute('dense') || this._schema.dense || false,
      comfortable: this.hasAttribute('comfortable') || this._schema.comfortable || false,
      required: this.hasAttribute('required') || this._schema.required || false,
      disabled: this.hasAttribute('disabled') || this._schema.disabled || false,
      readonly: this.hasAttribute('readonly') || this._schema.readonly || false,
      autofocus: this.hasAttribute('autofocus') || this._schema.autofocus || false,
      autocomplete: this.getAttribute('autocomplete') || this._schema.autocomplete || '',
      // Validation attributes
      min: this.getAttribute('min') || this._schema.min || null,
      max: this.getAttribute('max') || this._schema.max || null,
      minLength: this.getAttribute('minlength') || this._schema.minLength || null,
      maxLength: this.getAttribute('maxlength') || this._schema.maxLength || null,
      pattern: this.getAttribute('pattern') || this._schema.pattern || null,
      step: this.getAttribute('step') || this._schema.step || null,
      validation: this._schema.validation || null
    };

    // Set current value
    this._value = this._schema.value;
    
    // Render if connected
    if (this.isConnected) {
      this.render();
    }
  }

  // Get automatic icon based on input type
  getAutoIcon() {
    const inputConfig = globalConfig.get('components.input', {});
    const autoIconMapping = inputConfig.autoIconMapping || {};
    return autoIconMapping[this._schema.type] || '';
  }

  // Generate TailwindCSS classes based on schema
  getTailwindClasses() {
    const { variant, size, labelPosition } = this._schema;
    const config = globalConfig.get('theme.tailwind', {});
    
    // Base container classes
    let containerClasses = [
      'relative',
      'w-full',
      'font-sans'
    ];

    // Size-specific classes
    const sizeClasses = config.sizes?.[size] || config.sizes?.md || 'h-input-md text-body-medium px-md';
    
    // Input field classes
    let inputClasses = [
      'w-full',
      'bg-transparent',
      'text-surface-on-surface',
      'placeholder:text-outline',
      'focus:outline-none',
      'transition-all',
      'duration-medium1',
      sizeClasses
    ];

    // Variant-specific classes
    let wrapperClasses = [
      'relative',
      'flex',
      'items-center',
      'transition-all',
      'duration-medium1',
      'focus-within:ring-2',
      'focus-within:ring-primary',
      'focus-within:ring-opacity-20'
    ];

    switch (variant) {
      case 'filled':
        wrapperClasses.push(
          'bg-surface-container',
          'border-0',
          'border-b-2',
          'border-b-outline-variant',
          'rounded-t-md',
          'focus-within:border-b-primary',
          'hover:bg-surface-container'
        );
        break;
      case 'outlined':
      default:
        wrapperClasses.push(
          'bg-surface',
          'border',
          'border-outline-variant',
          'rounded-md',
          'focus-within:border-primary',
          'hover:border-outline'
        );
        break;
    }

    // Error state classes
    if (this._errors.length > 0) {
      wrapperClasses.push('border-error', 'focus-within:border-error', 'focus-within:ring-error');
      inputClasses.push('text-error');
    }

    // Disabled state classes
    if (this._schema.disabled) {
      wrapperClasses.push('opacity-50', 'cursor-not-allowed');
      inputClasses.push('cursor-not-allowed');
    }

    // Label classes
    let labelClasses = [
      'text-outline',
      'transition-all',
      'duration-medium1',
      'select-none'
    ];

    if (labelPosition === 'over') {
      labelClasses.push(
        'absolute',
        'left-3',
        'pointer-events-none',
        'origin-left'
      );
      
      if (this._focused || this._value) {
        labelClasses.push(
          'top-0',
          'transform',
          '-translate-y-1/2',
          'scale-75',
          'bg-surface',
          'px-1',
          'text-primary'
        );
      } else {
        labelClasses.push('top-1/2', 'transform', '-translate-y-1/2');
      }
    } else if (labelPosition === 'left') {
      containerClasses.push('flex', 'items-center', 'gap-4');
      labelClasses.push('flex-shrink-0', 'w-32');
    } else {
      labelClasses.push('block', 'mb-1');
    }

    // Focus state for label
    if (this._focused) {
      labelClasses.push('text-primary');
    }

    // Required indicator
    if (this._schema.required) {
      labelClasses.push('after:content-["*"]', 'after:text-error', 'after:ml-1');
    }

    return {
      container: containerClasses.join(' '),
      wrapper: wrapperClasses.join(' '),
      input: inputClasses.join(' '),
      label: labelClasses.join(' ')
    };
  }

  // Generate the appropriate input element based on type
  generateInputElement() {
    const { type, name, placeholder, required, disabled, readonly, autofocus, autocomplete, min, max, minLength, maxLength, pattern, step } = this._schema;
    const classes = this.getTailwindClasses();
    
    const commonAttributes = [
      `id="${name}-input"`,
      `name="${name}"`,
      `class="${classes.input}"`,
      `value="${this._value || ''}"`,
      placeholder ? `placeholder="${placeholder}"` : '',
      required ? 'required' : '',
      disabled ? 'disabled' : '',
      readonly ? 'readonly' : '',
      autofocus ? 'autofocus' : '',
      autocomplete ? `autocomplete="${autocomplete}"` : '',
      'aria-describedby="' + [
        this._schema.helperText ? `${name}-helper` : '',
        this._errors.length ? `${name}-error` : '',
        this._schema.characterCount ? `${name}-count` : ''
      ].filter(Boolean).join(' ') + '"',
      this._errors.length ? 'aria-invalid="true"' : 'aria-invalid="false"'
    ].filter(Boolean);

    // Type-specific attributes
    const typeAttributes = [];
    switch (type) {
      case 'number':
      case 'integer':
        typeAttributes.push(`type="number"`);
        if (min !== null) typeAttributes.push(`min="${min}"`);
        if (max !== null) typeAttributes.push(`max="${max}"`);
        if (step !== null) typeAttributes.push(`step="${step}"`);
        break;
      case 'date':
      case 'datetime-local':
      case 'time':
      case 'date-of-birth':
        typeAttributes.push(`type="${type === 'date-of-birth' ? 'date' : type}"`);
        if (min !== null) typeAttributes.push(`min="${min}"`);
        if (max !== null) typeAttributes.push(`max="${max}"`);
        break;
      case 'textarea':
        return `<textarea ${commonAttributes.join(' ')} rows="3"></textarea>`;
      case 'select':
        return this.generateSelectElement(commonAttributes);
      default:
        typeAttributes.push(`type="${type}"`);
        if (minLength !== null) typeAttributes.push(`minlength="${minLength}"`);
        if (maxLength !== null) typeAttributes.push(`maxlength="${maxLength}"`);
        if (pattern) typeAttributes.push(`pattern="${pattern}"`);
        break;
    }

    return `<input ${[...typeAttributes, ...commonAttributes].join(' ')} />`;
  }

  // Generate select element with options
  generateSelectElement(commonAttributes) {
    const options = this._schema.options || [];
    const multiple = this._schema.multiple || false;
    
    const selectAttributes = [
      ...commonAttributes,
      multiple ? 'multiple' : ''
    ].filter(Boolean);

    const optionsHtml = options.map(option => {
      const selected = multiple 
        ? (Array.isArray(this._value) ? this._value.includes(option.value) : false)
        : this._value === option.value;
      
      return `<option value="${option.value}" ${selected ? 'selected' : ''}>${option.label}</option>`;
    }).join('');

    return `<select ${selectAttributes.join(' ')}>${optionsHtml}</select>`;
  }

  // Enhanced validation with better error messages
  validateInput() {
    const { required, minLength, maxLength, min, max, pattern, validation, type } = this._schema;
    this._errors = [];

    // Skip validation if not touched or empty and not required
    if (!this._touched && !this._value && !required) {
      return true;
    }

    const value = this._value || '';

    // Required validation
    if (required && !value.trim()) {
      this._errors.push(`${this._schema.label || 'Field'} is required`);
    }

    // Type-specific validation
    if (value) {
      switch (type) {
        case 'email':
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            this._errors.push('Please enter a valid email address');
          }
          break;
        case 'url':
          try {
            new URL(value);
          } catch {
            this._errors.push('Please enter a valid URL');
          }
          break;
        case 'tel':
          if (!/^[\+]?[\d\s\-\(\)]{10,}$/.test(value)) {
            this._errors.push('Please enter a valid phone number');
          }
          break;
        case 'number':
        case 'integer':
          const num = parseFloat(value);
          if (isNaN(num)) {
            this._errors.push('Please enter a valid number');
          } else {
            if (min !== null && num < parseFloat(min)) {
              this._errors.push(`Value must be at least ${min}`);
            }
            if (max !== null && num > parseFloat(max)) {
              this._errors.push(`Value must be no more than ${max}`);
            }
          }
          break;
      }

      // Length validation
      if (minLength !== null && value.length < parseInt(minLength)) {
        this._errors.push(`Must be at least ${minLength} characters`);
      }
      if (maxLength !== null && value.length > parseInt(maxLength)) {
        this._errors.push(`Must be no more than ${maxLength} characters`);
      }

      // Pattern validation
      if (pattern && !new RegExp(pattern).test(value)) {
        this._errors.push('Please enter a valid format');
      }

      // Custom validation function
      if (validation && typeof validation === 'function') {
        try {
          if (!validation(value)) {
            this._errors.push('Please enter a valid value');
          }
        } catch (error) {
          console.warn('Custom validation function error:', error);
        }
      }
    }

    // Update DOM if rendered
    if (this.shadowRoot) {
      this.updateValidationUI();
    }

    return this._errors.length === 0;
  }

  // Update validation UI
  updateValidationUI() {
    const errorElement = this.shadowRoot.querySelector('.error-message');
    const wrapper = this.shadowRoot.querySelector('.input-wrapper');
    
    if (errorElement) {
      errorElement.textContent = this._errors.length > 0 ? this._errors[0] : '';
      errorElement.style.display = this._errors.length > 0 ? 'block' : 'none';
    }

    if (wrapper) {
      // Update classes based on error state
      if (this._errors.length > 0) {
        wrapper.className = wrapper.className.replace(/border-\w+/g, '') + ' border-error focus-within:border-error focus-within:ring-error';
      } else {
        wrapper.className = wrapper.className.replace(/border-error|focus-within:border-error|focus-within:ring-error/g, '');
        if (this._schema.variant === 'outlined') {
          wrapper.className += ' border-outline-variant focus-within:border-primary';
        }
      }
    }

    // Update character count if enabled
    if (this._schema.characterCount) {
      const countElement = this.shadowRoot.querySelector('.character-count');
      if (countElement) {
        const current = this._value ? this._value.length : 0;
        const max = this._schema.maxLength;
        countElement.textContent = max ? `${current}/${max}` : current.toString();
        
        // Update color based on threshold
        if (max && current > max * 0.8) {
          countElement.className = countElement.className.replace(/text-\w+/g, '') + ' text-warning';
        } else {
          countElement.className = countElement.className.replace(/text-warning/g, '') + ' text-outline';
        }
      }
    }
  }

  // Event handlers
  handleInput(event) {
    this._value = event.target.value;
    this._touched = true;
    
    // Debounced validation
    clearTimeout(this._validationTimer);
    this._validationTimer = setTimeout(() => {
      this.validateInput();
    }, globalConfig.get('components.input.debounceDelay', 300));

    // Update character count immediately
    if (this._schema.characterCount) {
      this.updateValidationUI();
    }

    // Emit custom input event
    this.dispatchEvent(new CustomEvent('input', {
      detail: {
        value: this._value,
        valid: this._errors.length === 0,
        errors: [...this._errors]
      },
      bubbles: true
    }));
  }

  handleChange(event) {
    this._value = event.target.value;
    this._touched = true;
    this.validateInput();

    // Emit custom change event
    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        value: this._value,
        valid: this._errors.length === 0,
        errors: [...this._errors]
      },
      bubbles: true
    }));
  }

  handleFocus(event) {
    this._focused = true;
    this.render(); // Update floating label position

    // Emit custom focus event
    this.dispatchEvent(new CustomEvent('focus', {
      detail: { value: this._value },
      bubbles: true
    }));
  }

  handleBlur(event) {
    this._focused = false;
    this._touched = true;
    this.validateInput();
    this.render(); // Update floating label position

    // Emit custom blur event
    this.dispatchEvent(new CustomEvent('blur', {
      detail: {
        value: this._value,
        valid: this._errors.length === 0,
        errors: [...this._errors]
      },
      bubbles: true
    }));
  }

  // Public API methods
  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val || '';
    this.setAttribute('value', this._value);
    if (this.shadowRoot) {
      const input = this.shadowRoot.querySelector('input, textarea, select');
      if (input) {
        input.value = this._value;
      }
    }
  }

  get valid() {
    return this._errors.length === 0;
  }

  get errors() {
    return [...this._errors];
  }

  validate() {
    this._touched = true;
    return this.validateInput();
  }

  focus() {
    if (this.shadowRoot) {
      const input = this.shadowRoot.querySelector('input, textarea, select');
      if (input) {
        input.focus();
      }
    }
  }

  blur() {
    if (this.shadowRoot) {
      const input = this.shadowRoot.querySelector('input, textarea, select');
      if (input) {
        input.blur();
      }
    }
  }

  // Render method using TailwindCSS
  render() {
    if (!this.shadowRoot) return;

    const { label, labelPosition, name, leadingIcon, trailingIcon, helperText, characterCount } = this._schema;
    const classes = this.getTailwindClasses();
    
    this.shadowRoot.innerHTML = `
      <style>
        @import '/src/styles/tailwind.css';
        
        :host {
          display: block;
          width: 100%;
        }
        
        /* Material Icons support */
        .material-icons {
          font-family: 'Material Icons';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
        }
      </style>

      <div class="${classes.container}">
        ${labelPosition !== 'over' && labelPosition !== 'left' ? `
          <label class="${classes.label}" id="${name}-label" for="${name}-input">
            ${label}
          </label>
        ` : ''}
        
        <div class="${labelPosition === 'left' ? 'flex items-center gap-4' : ''}">
          ${labelPosition === 'left' ? `
            <label class="${classes.label}" id="${name}-label" for="${name}-input">
              ${label}
            </label>
          ` : ''}
          
          <div class="${classes.wrapper}">
            ${leadingIcon ? `
              <span class="flex-shrink-0 flex items-center justify-center w-6 h-6 text-outline ml-3">
                ${leadingIcon.includes('<') ? leadingIcon : `<my-icon icon="${leadingIcon}" class="w-5 h-5"></my-icon>`}
              </span>
            ` : ''}
            
            <slot name="prefix" class="flex-shrink-0"></slot>
            
            <div class="relative flex-1">
              ${this.generateInputElement()}
              ${labelPosition === 'over' ? `
                <label class="${classes.label}" id="${name}-label" for="${name}-input">
                  ${label}
                </label>
              ` : ''}
            </div>
            
            <slot name="suffix" class="flex-shrink-0"></slot>
            
            ${trailingIcon ? `
              <span class="flex-shrink-0 flex items-center justify-center w-6 h-6 text-outline mr-3">
                ${trailingIcon.includes('<') ? trailingIcon : `<my-icon icon="${trailingIcon}" class="w-5 h-5"></my-icon>`}
              </span>
            ` : ''}
          </div>
        </div>
        
        <div class="mt-1 flex items-start justify-between gap-2 text-label-small">
          <div class="flex-1">
            ${helperText ? `
              <div class="text-outline" id="${name}-helper" role="note">
                ${helperText}
              </div>
            ` : ''}
            <div class="error-message text-error" id="${name}-error" role="alert" aria-live="assertive" aria-atomic="true" style="display: none;"></div>
          </div>
          
          ${characterCount ? `
            <div class="character-count text-outline flex-shrink-0" id="${name}-count" role="status" aria-live="polite" aria-atomic="true">
              ${this._value ? this._value.length : 0}${this._schema.maxLength ? `/${this._schema.maxLength}` : ''}
            </div>
          ` : ''}
        </div>
      </div>
    `;

    // Attach event listeners
    const input = this.shadowRoot.querySelector('input, textarea, select');
    if (input) {
      input.addEventListener('input', this.handleInput);
      input.addEventListener('change', this.handleChange);
      input.addEventListener('focus', this.handleFocus);
      input.addEventListener('blur', this.handleBlur);
      
      // Set initial value
      if (this._value) {
        input.value = this._value;
      }
    }

    // Update validation UI
    this.updateValidationUI();
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Clean up validation timer
    if (this._validationTimer) {
      clearTimeout(this._validationTimer);
    }
  }
}

// Register the component
customElements.define('my-input', MyInput);

export { MyInput };