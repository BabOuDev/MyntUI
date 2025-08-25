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
    
    // Debounced validation for better performance 
    this._validationTimer = null;
    
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
      'label-position', 'schema', 'aria-label', 'aria-describedby', 'aria-invalid',
      'variant', 'size', 'leading-icon', 'trailing-icon', 'helper-text', 'character-count'
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
      variant: this.getAttribute('variant') || this._schema.variant || 'outlined',
      size: this.getAttribute('size') || this._schema.size || 'medium',
      leadingIcon: this.getAttribute('leading-icon') || this._schema.leadingIcon || '',
      trailingIcon: this.getAttribute('trailing-icon') || this._schema.trailingIcon || '',
      helperText: this.getAttribute('helper-text') || this._schema.helperText || '',
      characterCount: this.hasAttribute('character-count') || this._schema.characterCount || false,
      dense: this.hasAttribute('dense') || this._schema.dense || false,
      comfortable: this.hasAttribute('comfortable') || this._schema.comfortable || false,
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

  // Enhanced focus method with accessibility announcements and label animation
  focus() {
    const inputElement = this.shadowRoot.querySelector('input, textarea, select');
    if (inputElement && !this._schema.disabled) {
      inputElement.focus();
      this.updateLabelState();
      
      // Announce focus to screen readers if there are errors or important info
      if (this._errors.length > 0) {
        this.announceToScreenReader(`Focused input with error: ${this._errors[0]}`);
      } else if (this._schema.helperText) {
        this.announceToScreenReader(`Focused input. ${this._schema.helperText}`);
      }
    }
  }
  
  // Update label floating state based on content
  updateLabelState() {
    const inputElement = this.shadowRoot.querySelector('input, textarea, select');
    const inputWrapper = this.shadowRoot.querySelector('.input-wrapper');
    
    if (!inputElement || !inputWrapper) return;
    
    const hasContent = inputElement.value && inputElement.value.trim() !== '';
    
    if (hasContent) {
      inputWrapper.classList.add('has-content');
    } else {
      inputWrapper.classList.remove('has-content');
    }
  }
  
  // Screen reader announcements
  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Clean up after announcement
    setTimeout(() => {
      if (announcement.parentNode) {
        announcement.parentNode.removeChild(announcement);
      }
    }, 1000);
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

  // Enhanced validation with better error prioritization
  validate(value = this._value) {
    const previousErrorCount = this._errors.length;
    this._errors = [];

    // Prioritized validation order - most important first
    const validations = [
      this.validateRequired(value),
      this.validatePattern(value),
      this.validateLength(value),
      this.validateRange(value),
      this.validateCustom(value)
    ];

    this._errors = validations.filter(error => error !== null);
    
    // Update character count validation for better UX
    if (this._schema.characterCount && this._schema.maxLength) {
      const characterCountEl = this.shadowRoot.querySelector('.character-count');
      if (characterCountEl) {
        const isOverLimit = value.length > this._schema.maxLength;
        characterCountEl.classList.toggle('over-limit', isOverLimit);
      }
    }
    
    // Emit validation event if error state changed
    if (previousErrorCount !== this._errors.length || (previousErrorCount > 0 && this._errors.length > 0)) {
      this.dispatchEvent(new CustomEvent('validation', {
        detail: {
          value: this._value,
          valid: this.valid,
          errors: this._errors,
          name: this._schema.name,
          previouslyValid: previousErrorCount === 0
        },
        bubbles: true
      }));
    }
    
    return this.valid;
  }

  // Enhanced debounced validation with smart timing
  debouncedValidate() {
    if (this._validationTimer) {
      clearTimeout(this._validationTimer);
    }
    
    // Shorter debounce for error recovery, longer for initial validation
    const debounceTime = this._errors.length > 0 ? 150 : 300;
    
    this._validationTimer = setTimeout(() => {
      const wasValid = this.valid;
      this.validate();
      this.updateErrorDisplay();
      
      // Provide immediate feedback for error recovery
      if (!wasValid && this.valid) {
        this.triggerSuccessAnimation();
      }
    }, debounceTime);
  }

  // Event handlers
  handleInput(event) {
    this._value = event.target.value;
    
    // Update label state for floating animation
    this.updateLabelState();
    
    // Use debounced validation instead of immediate validation for better performance
    this.debouncedValidate();

    // Emit custom input event immediately for responsiveness
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

  handleChange(event) {
    this._value = event.target.value;
    
    // Update label state for floating animation
    this.updateLabelState();
    
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
    
    // Emit custom blur event
    this.dispatchEvent(new CustomEvent('blur', {
      detail: {
        value: this._value,
        valid: this.valid,
        errors: this._errors,
        name: this._schema.name
      },
      bubbles: true
    }));
  }

  // Handle focus events with enhanced animations
  handleFocus(event) {
    this.updateFocusState(true);
    
    // Emit custom focus event
    this.dispatchEvent(new CustomEvent('focus', {
      detail: {
        value: this._value,
        valid: this.valid,
        errors: this._errors,
        name: this._schema.name
      },
      bubbles: true
    }));
  }

  // Enhanced keyboard navigation with accessibility
  handleKeyDown(event) {
    if (this._schema.disabled || this._schema.readonly) {
      event.preventDefault();
      return;
    }

    const inputElement = this.shadowRoot.querySelector('input, textarea, select');
    if (!inputElement) return;

    // Handle Escape key to clear input (for non-required fields)
    if (event.key === 'Escape' && !this._schema.required) {
      event.preventDefault();
      inputElement.value = '';
      this._value = '';
      this.validate();
      this.updateErrorDisplay();
      
      // Announce clearing to screen readers
      this.announceToScreenReader(`${this._schema.label || 'Input'} cleared`);
      
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
      
      // Announce validation result
      if (!this.valid) {
        this.announceToScreenReader(`Form submission blocked. ${this._errors[0]}`);
        event.preventDefault();
        return;
      }
      
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
    
    // Handle Tab key for better navigation flow
    if (event.key === 'Tab' && this._errors.length > 0) {
      // Announce error on tab navigation
      setTimeout(() => {
        this.announceToScreenReader(`Validation error: ${this._errors[0]}`);
      }, 100);
    }
    
    // Handle F1 key for contextual help
    if (event.key === 'F1' && this._schema.helperText) {
      event.preventDefault();
      this.announceToScreenReader(`Help for ${this._schema.label}: ${this._schema.helperText}`);
    }
  }

  // Enhanced focus state management with ripple effects
  updateFocusState(focused) {
    const inputElement = this.shadowRoot.querySelector('input, textarea, select');
    const container = this.shadowRoot.querySelector('.input-container');
    const label = this.shadowRoot.querySelector('.label');
    const leadingIcon = this.shadowRoot.querySelector('.leading-icon');
    const trailingIcon = this.shadowRoot.querySelector('.trailing-icon');
    
    if (inputElement && container) {
      if (focused) {
        inputElement.classList.add('focused');
        container.classList.add('focused');
        
        // Add ripple effect animation
        this.createRippleEffect();
        
        // Animate label and icons
        if (label && !label.classList.contains('over')) {
          label.style.transform = 'translateY(-2px)';
        }
        
        // Animate icons
        if (leadingIcon) {
          leadingIcon.style.transform = 'translateY(-50%) scale(1.1)';
        }
        if (trailingIcon) {
          trailingIcon.style.transform = 'translateY(-50%) scale(1.1)';
        }
        
      } else {
        inputElement.classList.remove('focused');
        container.classList.remove('focused');
        
        // Reset animations
        if (label && !label.classList.contains('over')) {
          label.style.transform = '';
        }
        
        if (leadingIcon) {
          leadingIcon.style.transform = 'translateY(-50%)';
        }
        if (trailingIcon) {
          trailingIcon.style.transform = 'translateY(-50%)';
        }
      }
    }
  }
  
  // Create subtle ripple effect on focus
  createRippleEffect() {
    const container = this.shadowRoot.querySelector('.input-wrapper');
    if (!container) return;
    
    // Remove existing ripple
    const existingRipple = container.querySelector('.focus-ripple');
    if (existingRipple) {
      existingRipple.remove();
    }
    
    // Create new ripple element
    const ripple = document.createElement('div');
    ripple.className = 'focus-ripple';
    ripple.style.cssText = `
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background-color: var(--_input-outline-color-focus);
      opacity: 0.12;
      transform: scale(0.8);
      animation: focusRipple 0.6s var(--_input-motion-easing) forwards;
      pointer-events: none;
      z-index: 0;
    `;
    
    container.insertBefore(ripple, container.firstChild);
    
    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.remove();
      }
    }, 600);
  }

  // Enhanced error display with smooth animations and better UX
  updateErrorDisplay() {
    const errorElement = this.shadowRoot.querySelector('.error-message');
    const helperText = this.shadowRoot.querySelector('.helper-text');
    const inputElement = this.shadowRoot.querySelector('input, textarea, select');
    const container = this.shadowRoot.querySelector('.input-container');
    const leadingIcon = this.shadowRoot.querySelector('.leading-icon');
    const trailingIcon = this.shadowRoot.querySelector('.trailing-icon');
    
    if (errorElement && inputElement) {
      const hasErrors = this._errors.length > 0;
      const previouslyHadErrors = container ? container.classList.contains('has-error') : false;
      
      if (hasErrors) {
        // Show error message with animation
        errorElement.textContent = this._errors[0];
        errorElement.style.display = 'block';
        
        // Hide helper text when showing error
        if (helperText && this._schema.helperText) {
          helperText.style.opacity = '0';
          helperText.style.transform = 'translateY(-4px)';
        }
        
        // Update ARIA attributes for accessibility
        inputElement.setAttribute('aria-invalid', 'true');
        inputElement.setAttribute('aria-describedby', `${this._schema.name}-error`);
        
        // Add error class to container for styling
        if (container) {
          container.classList.add('has-error');
          
          // Trigger error shake animation only for new errors
          if (!previouslyHadErrors) {
            this.triggerErrorAnimation();
          }
        }
        
        // Update host class
        this.classList.add('has-error');
        
      } else {
        // Hide error message with animation
        errorElement.style.display = 'none';
        
        // Show helper text when hiding error
        if (helperText && this._schema.helperText) {
          helperText.style.opacity = '1';
          helperText.style.transform = 'translateY(0)';
        }
        
        // Clear ARIA attributes
        inputElement.setAttribute('aria-invalid', 'false');
        inputElement.removeAttribute('aria-describedby');
        
        // Remove error class
        if (container) {
          container.classList.remove('has-error');
        }
        
        // Update host class
        this.classList.remove('has-error');
        
        // Success animation for resolved errors
        if (previouslyHadErrors) {
          this.triggerSuccessAnimation();
        }
      }
    }
  }
  
  // Trigger error animation with haptic-like feedback
  triggerErrorAnimation() {
    const container = this.shadowRoot.querySelector('.input-container');
    if (!container) return;
    
    // Remove existing animation class to restart animation
    container.classList.remove('error-animation');
    
    // Force reflow to ensure class removal takes effect
    container.offsetHeight;
    
    // Add animation class
    container.classList.add('error-animation');
    
    // Remove animation class after completion
    setTimeout(() => {
      container.classList.remove('error-animation');
    }, 300);
  }
  
  // Trigger success animation for resolved errors
  triggerSuccessAnimation() {
    const inputElement = this.shadowRoot.querySelector('input, textarea, select');
    if (!inputElement) return;
    
    // Add temporary success class
    inputElement.classList.add('success-flash');
    
    // Remove success class after animation
    setTimeout(() => {
      inputElement.classList.remove('success-flash');
    }, 400);
  }

  // Enhanced event listener attachment with slot support
  attachEventListeners() {
    // Clean up existing listeners first
    this.removeEventListeners();
    
    const inputElement = this.shadowRoot.querySelector('input, textarea, select');
    if (!inputElement) return;
    
    // Attach listeners to the shadow DOM input element
    inputElement.addEventListener('input', this.handleInput);
    inputElement.addEventListener('change', this.handleChange);
    inputElement.addEventListener('blur', this.handleBlur);
    inputElement.addEventListener('focus', this.handleFocus);
    inputElement.addEventListener('keydown', this.handleKeyDown);
    
    // Attach slot change listeners for dynamic content
    const prefixSlot = this.shadowRoot.querySelector('slot[name="prefix"]');
    const suffixSlot = this.shadowRoot.querySelector('slot[name="suffix"]');
    
    if (prefixSlot) {
      prefixSlot.addEventListener('slotchange', this.handleSlotChange.bind(this));
    }
    
    if (suffixSlot) {
      suffixSlot.addEventListener('slotchange', this.handleSlotChange.bind(this));
    }
    
    // Store references for cleanup
    this._eventTargets = [
      { element: inputElement, events: ['input', 'change', 'blur', 'focus', 'keydown'] }
    ];
    
    if (prefixSlot) {
      this._eventTargets.push({ element: prefixSlot, events: ['slotchange'] });
    }
    if (suffixSlot) {
      this._eventTargets.push({ element: suffixSlot, events: ['slotchange'] });
    }
  }
  
  // Handle slot content changes
  handleSlotChange(event) {
    // Re-render to update slot visibility and styling
    this.updateSlotVisibility();
  }
  
  // Update slot visibility and styling
  updateSlotVisibility() {
    const inputField = this.shadowRoot.querySelector('.input-field');
    const prefixSlot = this.shadowRoot.querySelector('slot[name="prefix"]');
    const suffixSlot = this.shadowRoot.querySelector('slot[name="suffix"]');
    
    if (!inputField) return;
    
    const hasPrefix = prefixSlot && prefixSlot.assignedElements().length > 0;
    const hasSuffix = suffixSlot && suffixSlot.assignedElements().length > 0;
    
    inputField.classList.toggle('has-prefix', hasPrefix);
    inputField.classList.toggle('has-suffix', hasSuffix);
    
    // Update accessibility attributes
    if (hasPrefix) {
      const prefixContent = prefixSlot.assignedElements()[0];
      if (prefixContent) {
        const prefixText = prefixContent.textContent || prefixContent.getAttribute('aria-label') || 'prefix';
        inputField.setAttribute('aria-describedby', 
          `${inputField.getAttribute('aria-describedby') || ''} prefix-${this._schema.name}`.trim()
        );
        prefixSlot.parentElement.setAttribute('aria-label', `Prefix: ${prefixText}`);
      }
    }
    
    if (hasSuffix) {
      const suffixContent = suffixSlot.assignedElements()[0];
      if (suffixContent) {
        const suffixText = suffixContent.textContent || suffixContent.getAttribute('aria-label') || 'suffix';
        inputField.setAttribute('aria-describedby', 
          `${inputField.getAttribute('aria-describedby') || ''} suffix-${this._schema.name}`.trim()
        );
        suffixSlot.parentElement.setAttribute('aria-label', `Suffix: ${suffixText}`);
      }
    }
  }

  // Standardized event listener cleanup
  removeEventListeners() {
    if (this._eventTargets) {
      this._eventTargets.forEach(target => {
        target.element.removeEventListener('input', this.handleInput);
        target.element.removeEventListener('change', this.handleChange);
        target.element.removeEventListener('blur', this.handleBlur);
        target.element.removeEventListener('focus', this.handleFocus);
        target.element.removeEventListener('keydown', this.handleKeyDown);
      });
      this._eventTargets = null;
    }
    
    // Clear validation timer
    if (this._validationTimer) {
      clearTimeout(this._validationTimer);
      this._validationTimer = null;
    }
  }

  // Standardized lifecycle cleanup
  disconnectedCallback() {
    this.removeEventListeners();
  }

  // Enhanced input generation with comprehensive accessibility
  generateInputElement() {
    const { type, name, placeholder, value, disabled, readonly, label, helperText } = this._schema;
    const inputId = `${name}-input`;
    const errorId = `${name}-error`;
    const helperId = `${name}-helper`;
    const hasErrors = this._errors.length > 0;
    const hasHelper = helperText && helperText.trim() !== '';

    // Build comprehensive ARIA describedby
    const describedByParts = [];
    if (hasErrors) describedByParts.push(errorId);
    if (hasHelper && !hasErrors) describedByParts.push(helperId);
    if (this._schema.characterCount) describedByParts.push(`${name}-count`);
    
    // Custom ARIA attributes with fallbacks
    const ariaLabel = this.getAttribute('aria-label') || (this._schema.labelPosition === 'over' ? label : '');
    const ariaDescribedBy = this.getAttribute('aria-describedby') || describedByParts.join(' ');
    const ariaInvalid = this.getAttribute('aria-invalid') || (hasErrors ? 'true' : 'false');
    
    // Enhanced placeholder for better accessibility
    const accessiblePlaceholder = placeholder || (this._schema.labelPosition === 'over' ? '' : label);
    
    const commonAttributes = `
      id="${inputId}"
      name="${name}"
      class="input-field"
      ${accessiblePlaceholder ? `placeholder="${accessiblePlaceholder}"` : ''}
      ${disabled ? 'disabled aria-disabled="true"' : ''}
      ${readonly ? 'readonly aria-readonly="true"' : ''}
      ${this._schema.required ? 'required aria-required="true"' : 'aria-required="false"'}
      ${this._schema.autocomplete ? `autocomplete="${this._schema.autocomplete}"` : 'autocomplete="off"'}
      ${ariaLabel ? `aria-label="${ariaLabel}"` : ''}
      ${ariaDescribedBy ? `aria-describedby="${ariaDescribedBy}"` : ''}
      aria-invalid="${ariaInvalid}"
      ${this._schema.leadingIcon ? 'aria-labelledby="' + inputId + '-label"' : ''}
    `.trim();

    switch (type) {
      case 'textarea':
        return `<textarea ${commonAttributes} 
          role="textbox" 
          aria-multiline="true"
          ${this._schema.minLength ? `aria-describedby="${ariaDescribedBy} ${name}-length-hint"` : ''}
          spellcheck="true"
          wrap="soft">${value}</textarea>`;
        
      case 'select':
        const options = this._schema.options.map(option => {
          const selected = Array.isArray(value) ? value.includes(option.value) : value === option.value;
          return `<option value="${option.value}" ${selected ? 'selected' : ''}>${option.label}</option>`;
        }).join('');
        
        return `<select ${commonAttributes} 
          role="combobox" 
          aria-expanded="false"
          aria-haspopup="listbox"
          ${this._schema.multiple ? 'multiple aria-multiselectable="true"' : 'aria-multiselectable="false"'}
          ${this._schema.multiple ? 'size="4"' : ''}>${options}</select>`;
        
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
          ${type === 'email' ? 'spellcheck="false"' : ''}
          ${type === 'password' ? 'spellcheck="false"' : ''}
          ${type === 'url' ? 'spellcheck="false"' : ''}
        `.trim();
        
        // Enhanced role assignment with ARIA properties
        let role = '';
        let ariaProps = '';
        
        switch (type) {
          case 'email':
            role = 'textbox';
            ariaProps = 'inputmode="email"';
            break;
          case 'tel':
            role = 'textbox';
            ariaProps = 'inputmode="tel"';
            break;
          case 'url':
            role = 'textbox';
            ariaProps = 'inputmode="url"';
            break;
          case 'search':
            role = 'searchbox';
            ariaProps = 'inputmode="search"';
            break;
          case 'number':
            role = 'spinbutton';
            ariaProps = `inputmode="decimal" aria-valuemin="${this._schema.min || ''}" aria-valuemax="${this._schema.max || ''}" aria-valuenow="${value || ''}"`;
            break;
          case 'password':
            ariaProps = 'autocomplete="current-password"';
            break;
          default:
            if (type === 'text') {
              ariaProps = 'inputmode="text"';
            }
        }
        
        return `<input ${commonAttributes} ${inputAttributes} 
          ${role ? `role="${role}"` : ''}
          ${ariaProps}
          ${type === 'password' ? 'aria-autocomplete="off"' : ''}>`;
    }
  }

  // Render the component
  render() {
    const { label, labelPosition } = this._schema;
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Material Design 3 Input Token System */
          --_input-height-small: 40px;
          --_input-height-medium: 48px;
          --_input-height-large: 56px;
          --_input-height: var(--_input-height-medium);
          
          /* Spacing tokens */
          --_input-padding-x-small: var(--_global-spacing-sm);
          --_input-padding-x-medium: var(--_global-spacing-md);
          --_input-padding-x-large: var(--_global-spacing-lg);
          --_input-padding-y-small: var(--_global-spacing-xs);
          --_input-padding-y-medium: var(--_global-spacing-sm);
          --_input-padding-y-large: var(--_global-spacing-md);
          
          /* Color tokens */
          --_input-outline-color: var(--_global-color-outline-variant);
          --_input-outline-color-focus: var(--_global-color-primary);
          --_input-outline-color-error: var(--_global-color-error);
          --_input-outline-color-hover: var(--_global-color-outline);
          --_input-outline-color-disabled: var(--_global-color-outline-variant);
          
          /* Filled variant colors */
          --_input-filled-container-color: var(--_global-color-surface-variant);
          --_input-filled-container-color-hover: color-mix(in srgb, var(--_global-color-on-surface) 8%, var(--_global-color-surface-variant));
          --_input-filled-container-color-focus: color-mix(in srgb, var(--_global-color-primary) 12%, var(--_global-color-surface-variant));
          --_input-filled-container-color-disabled: color-mix(in srgb, var(--_global-color-on-surface) 4%, var(--_global-color-surface));
          
          /* Text colors */
          --_input-text-color: var(--_global-color-on-surface);
          --_input-text-color-disabled: var(--_global-color-on-surface-variant);
          --_input-placeholder-color: var(--_global-color-on-surface-variant);
          --_input-label-color: var(--_global-color-on-surface-variant);
          --_input-label-color-focus: var(--_global-color-primary);
          --_input-label-color-error: var(--_global-color-error);
          
          /* Supporting text colors */
          --_input-supporting-text-color: var(--_global-color-on-surface-variant);
          --_input-supporting-text-color-error: var(--_global-color-error);
          --_input-supporting-text-color-disabled: var(--_global-color-on-surface-variant);
          
          /* Icon colors */
          --_input-leading-icon-color: var(--_global-color-on-surface-variant);
          --_input-trailing-icon-color: var(--_global-color-on-surface-variant);
          --_input-icon-color-focus: var(--_global-color-primary);
          --_input-icon-color-error: var(--_global-color-error);
          --_input-icon-color-disabled: var(--_global-color-on-surface-variant);
          
          /* Shape tokens */
          --_input-container-shape-small: var(--_global-border-radius-xs);
          --_input-container-shape-medium: var(--_global-border-radius-sm);
          --_input-container-shape-large: var(--_global-border-radius-md);
          --_input-container-shape: var(--_input-container-shape-medium);
          
          /* State layer */
          --_input-state-layer-opacity-hover: var(--_global-state-layer-hover);
          --_input-state-layer-opacity-focus: var(--_global-state-layer-focus);
          --_input-state-layer-opacity-pressed: var(--_global-state-layer-pressed);
          
          /* Animation tokens */
          --_input-motion-duration-short: var(--_global-motion-duration-short2);
          --_input-motion-duration-medium: var(--_global-motion-duration-medium2);
          --_input-motion-easing: var(--_global-motion-easing-emphasized);
          
          /* Elevation tokens */
          --_input-container-elevation: var(--_global-elevation-0);
          --_input-container-elevation-hover: var(--_global-elevation-1);
          --_input-container-elevation-focus: var(--_global-elevation-0);
          
          display: block;
          width: 100%;
          position: relative;
          font-family: var(--_global-font-family-sans);
          contain: layout style;
        }

        /* Size variants */
        :host([size="small"]) {
          --_input-height: var(--_input-height-small);
          --_input-padding-x: var(--_input-padding-x-small);
          --_input-padding-y: var(--_input-padding-y-small);
          --_input-container-shape: var(--_input-container-shape-small);
          font-size: var(--_global-font-size-sm);
        }
        
        :host([size="large"]) {
          --_input-height: var(--_input-height-large);
          --_input-padding-x: var(--_input-padding-x-large);
          --_input-padding-y: var(--_input-padding-y-large);
          --_input-container-shape: var(--_input-container-shape-large);
          font-size: var(--_global-font-size-lg);
        }
        
        /* Variant styles */
        :host([variant="filled"]) {
          --_input-container-color: var(--_input-filled-container-color);
          --_input-container-color-hover: var(--_input-filled-container-color-hover);
          --_input-container-color-focus: var(--_input-filled-container-color-focus);
          --_input-container-color-disabled: var(--_input-filled-container-color-disabled);
          --_input-container-elevation: var(--_global-elevation-1);
        }
        
        /* Host state management */
        :host(:focus-within) {
          --_input-outline-color: var(--_input-outline-color-focus);
          --_input-label-color: var(--_input-label-color-focus);
        }
        
        :host([disabled]) {
          pointer-events: none;
          cursor: not-allowed;
          --_input-text-color: var(--_input-text-color-disabled);
          --_input-outline-color: var(--_input-outline-color-disabled);
        }
        
        :host(.has-error) {
          --_input-outline-color: var(--_input-outline-color-error);
          --_input-label-color: var(--_input-label-color-error);
        }

        .input-container {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: var(--_global-spacing-xs);
          isolation: isolate;
        }

        .input-container.label-left {
          flex-direction: row;
          align-items: flex-start;
          gap: var(--_global-spacing-md);
        }

        .input-container.label-over {
          position: relative;
        }
        
        .input-container.variant-filled .input-field {
          background-color: var(--_input-container-color, var(--_input-filled-container-color));
          border: none;
          border-bottom: 1px solid var(--_input-outline-color);
          border-radius: var(--_input-container-shape) var(--_input-container-shape) 0 0;
          box-shadow: var(--_input-container-elevation);
        }
        
        .input-container.variant-outlined .input-field {
          background-color: transparent;
          border: 1px solid var(--_input-outline-color);
          border-radius: var(--_input-container-shape);
          box-shadow: var(--_input-container-elevation);
        }

        .label {
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-medium);
          color: var(--_input-label-color);
          line-height: var(--_global-line-height-tight);
          transition: color var(--_input-motion-duration-short) var(--_input-motion-easing);
          display: block;
          margin-bottom: var(--_global-spacing-xs);
          user-select: none;
        }

        .label.required::after {
          content: ' *';
          color: var(--_input-label-color-error);
          font-weight: var(--_global-font-weight-bold);
        }

        .label.over {
          position: absolute;
          top: 50%;
          left: var(--_input-padding-x, var(--_input-padding-x-medium));
          transform: translateY(-50%);
          background-color: transparent;
          padding: 0 var(--_global-spacing-xs);
          transition: all var(--_input-motion-duration-medium) var(--_input-motion-easing);
          pointer-events: none;
          z-index: 2;
          margin-bottom: 0;
          border-radius: var(--_global-border-radius-xs);
          transform-origin: left center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: calc(100% - 2 * var(--_input-padding-x, var(--_input-padding-x-medium)));
        }
        
        /* Floating label background for outlined variant */
        :host([variant="outlined"]) .label.over {
          background-color: var(--_global-color-surface);
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: stretch;
          flex: 1;
          background-color: inherit;
          border-radius: inherit;
          overflow: hidden;
        }
        
        .input-content {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 0;
        }

        .input-field {
          width: 100%;
          height: var(--_input-height);
          padding: var(--_input-padding-y, var(--_input-padding-y-medium)) var(--_input-padding-x, var(--_input-padding-x-medium));
          border: 1px solid var(--_input-outline-color);
          border-radius: var(--_input-container-shape);
          background-color: var(--_input-container-color, transparent);
          color: var(--_input-text-color);
          font-size: inherit;
          font-family: inherit;
          font-weight: var(--_global-font-weight-normal);
          line-height: var(--_global-line-height-normal);
          transition: all var(--_input-motion-duration-short) var(--_input-motion-easing),
                      border-color var(--_input-motion-duration-short) var(--_input-motion-easing),
                      box-shadow var(--_input-motion-duration-short) var(--_input-motion-easing);
          outline: none;
          box-shadow: var(--_input-container-elevation);
          position: relative;
          z-index: 1;
          appearance: none;
          resize: none;
          box-sizing: border-box;
        }
        
        /* Adjust padding when icons are present */
        .input-field.has-leading-icon {
          padding-left: calc(var(--_input-padding-x, var(--_input-padding-x-medium)) + 24px + var(--_global-spacing-sm));
        }
        
        .input-field.has-trailing-icon {
          padding-right: calc(var(--_input-padding-x, var(--_input-padding-x-medium)) + 24px + var(--_global-spacing-sm));
        }
        
        /* Material Design 3 State Layer */
        .input-field::before {
          content: '';
          position: absolute;
          inset: 0;
          background-color: currentColor;
          opacity: 0;
          transition: opacity var(--_input-motion-duration-short) var(--_input-motion-easing);
          pointer-events: none;
          border-radius: inherit;
          z-index: -1;
        }

        .input-field::placeholder {
          color: var(--_input-placeholder-color);
          opacity: 1;
          transition: color var(--_input-motion-duration-short) var(--_input-motion-easing);
        }

        /* Hover states */
        .input-field:hover:not(:disabled):not(:focus) {
          border-color: var(--_input-outline-color-hover);
          background-color: var(--_input-container-color-hover, var(--_input-container-color, transparent));
          box-shadow: var(--_input-container-elevation-hover);
        }
        
        .input-field:hover:not(:disabled):not(:focus)::before {
          opacity: var(--_input-state-layer-opacity-hover);
        }

        /* Enhanced Focus states with Material Design 3 emphasis */
        .input-field:focus,
        .input-field.focused {
          border-color: var(--_input-outline-color-focus);
          border-width: 2px;
          background-color: var(--_input-container-color-focus, var(--_input-container-color, transparent));
          box-shadow: var(--_input-container-elevation-focus);
          outline: none;
        }
        
        .input-field:focus::before,
        .input-field.focused::before {
          opacity: var(--_input-state-layer-opacity-focus);
        }
        
        /* Focus ring for accessibility */
        .input-field:focus-visible {
          outline: 2px solid var(--_input-outline-color-focus);
          outline-offset: 2px;
        }

        /* Enhanced focus for container */
        .input-container.focused .label:not(.over) {
          color: var(--_input-label-color-focus);
        }
        
        .input-container.focused .leading-icon,
        .input-container.focused .trailing-icon {
          color: var(--_input-icon-color-focus);
        }

        /* Additional focus styles for filled variant */
        :host([variant="filled"]) .input-field:focus,
        :host([variant="filled"]) .input-field.focused {
          border-bottom-width: 2px;
          border-bottom-color: var(--_input-outline-color-focus);
        }

        /* Enhanced disabled state */
        .input-field:disabled {
          opacity: var(--_global-opacity-disabled);
          cursor: not-allowed;
          background-color: var(--_input-container-color-disabled, var(--_global-color-surface-variant));
          color: var(--_input-text-color-disabled);
          border-color: var(--_input-outline-color-disabled);
        }

        .input-field:disabled::placeholder {
          color: var(--_input-text-color-disabled);
        }
        
        :host([disabled]) .label {
          color: var(--_input-text-color-disabled);
        }
        
        :host([disabled]) .leading-icon,
        :host([disabled]) .trailing-icon {
          color: var(--_input-icon-color-disabled);
        }

        /* Host-level disabled state */
        :host([disabled]) {
          pointer-events: none;
          cursor: not-allowed;
        }

        :host([disabled]) .input-container {
          opacity: var(--_global-opacity-disabled);
        }

        /* Enhanced error states */
        .input-field.error,
        .input-container.has-error .input-field {
          border-color: var(--_input-outline-color-error);
          background-color: color-mix(in srgb, var(--_input-outline-color-error) 4%, transparent);
        }

        .input-field.error:focus,
        .input-container.has-error .input-field:focus {
          border-color: var(--_input-outline-color-error);
          box-shadow: 0 0 0 1px var(--_input-outline-color-error);
        }

        /* Error state for container */
        .input-container.has-error {
          --_input-outline-color: var(--_input-outline-color-error);
          --_input-label-color: var(--_input-label-color-error);
        }
        
        .input-container.has-error .leading-icon,
        .input-container.has-error .trailing-icon {
          color: var(--_input-icon-color-error);
        }

        /* Enhanced error animations */
        .input-container.error-animation .input-field {
          animation: inputErrorShake var(--_input-motion-duration-medium) var(--_input-motion-easing);
        }
        
        .input-container.error-animation {
          animation: containerErrorPulse var(--_input-motion-duration-medium) var(--_input-motion-easing);
        }

        @keyframes inputErrorShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-3px); }
          40% { transform: translateX(3px); }
          60% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
        }
        
        @keyframes containerErrorPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        
        /* Success flash animation */
        .input-field.success-flash {
          animation: successFlash 0.4s var(--_input-motion-easing);
        }
        
        @keyframes successFlash {
          0% {
            border-color: var(--_input-outline-color);
            background-color: var(--_input-container-color, transparent);
          }
          50% {
            border-color: var(--_global-color-success);
            background-color: color-mix(in srgb, var(--_global-color-success) 8%, transparent);
          }
          100% {
            border-color: var(--_input-outline-color);
            background-color: var(--_input-container-color, transparent);
          }
        }
        
        @keyframes focusRipple {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            opacity: 0.12;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        
        /* Enhanced micro-interactions */
        .input-field {
          will-change: border-color, box-shadow, background-color;
        }
        
        .leading-icon,
        .trailing-icon {
          will-change: color, transform;
          transition: color var(--_input-motion-duration-short) var(--_input-motion-easing),
                      transform var(--_input-motion-duration-short) var(--_input-motion-easing);
        }
        
        .label:not(.over) {
          will-change: color, transform;
          transition: color var(--_input-motion-duration-short) var(--_input-motion-easing),
                      transform var(--_input-motion-duration-short) var(--_input-motion-easing);
        }

        /* Textarea specific styling */
        textarea.input-field {
          height: auto;
          min-height: calc(var(--_input-height) * 2);
          max-height: calc(var(--_input-height) * 4);
          resize: vertical;
          line-height: var(--_global-line-height-normal);
          padding-top: var(--_input-padding-y, var(--_input-padding-y-medium));
          padding-bottom: var(--_input-padding-y, var(--_input-padding-y-medium));
        }

        /* Select specific styling */
        select.input-field {
          cursor: pointer;
          background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTEuNSA1LjI1TDcgOS43NUwyLjUgNS4yNSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=');
          background-repeat: no-repeat;
          background-position: right var(--_input-padding-x, var(--_input-padding-x-medium)) center;
          background-size: 16px;
          padding-right: calc(var(--_input-padding-x, var(--_input-padding-x-medium)) + 24px);
        }
        
        select.input-field:focus {
          background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMi41IDguNzVMNyA0LjI1TDExLjUgOC43NSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=');
        }

        /* Icon styling */
        .leading-icon,
        .trailing-icon {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          color: var(--_input-leading-icon-color);
          pointer-events: none;
          z-index: 2;
          transition: color var(--_input-motion-duration-short) var(--_input-motion-easing);
        }
        
        .leading-icon {
          left: var(--_input-padding-x, var(--_input-padding-x-medium));
          color: var(--_input-leading-icon-color);
        }
        
        .trailing-icon {
          right: var(--_input-padding-x, var(--_input-padding-x-medium));
          color: var(--_input-trailing-icon-color);
        }
        
        /* Enhanced Prefix/Suffix slot styling */
        .prefix-slot,
        .suffix-slot {
          display: none;
          align-items: center;
          justify-content: center;
          min-height: var(--_input-height);
          padding: 0 var(--_global-spacing-sm);
          color: var(--_input-supporting-text-color);
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-medium);
          white-space: nowrap;
          user-select: none;
          background-color: var(--_global-color-surface-variant);
          border: 1px solid var(--_input-outline-color);
          transition: all var(--_input-motion-duration-short) var(--_input-motion-easing);
          position: relative;
          z-index: 1;
        }
        
        .prefix-slot:not(:empty),
        .suffix-slot:not(:empty) {
          display: flex;
        }
        
        /* Prefix slot styling */
        .prefix-slot {
          border-right: none;
          border-radius: var(--_input-container-shape) 0 0 var(--_input-container-shape);
          margin-right: 0;
        }
        
        /* Suffix slot styling */
        .suffix-slot {
          border-left: none;
          border-radius: 0 var(--_input-container-shape) var(--_input-container-shape) 0;
          margin-left: 0;
        }
        
        /* Input field adjustments when slots are present */
        .input-field.has-prefix {
          border-left: none;
          border-radius: 0;
          padding-left: var(--_input-padding-x, var(--_input-padding-x-medium));
        }
        
        .input-field.has-suffix {
          border-right: none;
          border-radius: 0;
          padding-right: var(--_input-padding-x, var(--_input-padding-x-medium));
        }
        
        .input-field.has-prefix.has-suffix {
          border-radius: 0;
        }
        
        .input-field.has-prefix:not(.has-suffix) {
          border-radius: 0 var(--_input-container-shape) var(--_input-container-shape) 0;
        }
        
        .input-field.has-suffix:not(.has-prefix) {
          border-radius: var(--_input-container-shape) 0 0 var(--_input-container-shape);
        }
        
        /* Filled variant adjustments */
        :host([variant="filled"]) .prefix-slot,
        :host([variant="filled"]) .suffix-slot {
          background-color: var(--_input-filled-container-color);
          border-bottom: 1px solid var(--_input-outline-color);
          border-top: none;
          border-radius: var(--_input-container-shape) var(--_input-container-shape) 0 0;
        }
        
        :host([variant="filled"]) .prefix-slot {
          border-left: 1px solid var(--_input-outline-color);
          border-right: none;
        }
        
        :host([variant="filled"]) .suffix-slot {
          border-right: 1px solid var(--_input-outline-color);
          border-left: none;
        }
        
        /* Hover states for slots */
        .prefix-slot:hover,
        .suffix-slot:hover {
          background-color: var(--_input-container-color-hover, var(--_global-color-surface-container));
          border-color: var(--_input-outline-color-hover);
        }
        
        /* Focus states for slots */
        .input-wrapper:focus-within .prefix-slot,
        .input-wrapper:focus-within .suffix-slot {
          border-color: var(--_input-outline-color-focus);
          background-color: var(--_input-container-color-focus, var(--_global-color-surface-container-high));
        }
        
        /* Error states for slots */
        .input-container.has-error .prefix-slot,
        .input-container.has-error .suffix-slot {
          border-color: var(--_input-outline-color-error);
          background-color: color-mix(in srgb, var(--_input-outline-color-error) 4%, var(--_global-color-surface-variant));
        }
        
        /* Disabled states for slots */
        :host([disabled]) .prefix-slot,
        :host([disabled]) .suffix-slot {
          opacity: var(--_global-opacity-disabled);
          background-color: var(--_global-color-surface-variant);
          color: var(--_input-text-color-disabled);
        }
        
        /* Slot content styling */
        .prefix-slot ::slotted(*),
        .suffix-slot ::slotted(*) {
          color: inherit;
          font-size: inherit;
        }
        
        .prefix-slot ::slotted(my-icon),
        .suffix-slot ::slotted(my-icon) {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }
        
        /* Size-specific adjustments */
        :host([size="small"]) .prefix-slot,
        :host([size="small"]) .suffix-slot {
          min-height: var(--_input-height-small);
          padding: 0 var(--_input-padding-x-small);
          font-size: calc(var(--_global-font-size-sm) * 0.875);
        }
        
        :host([size="large"]) .prefix-slot,
        :host([size="large"]) .suffix-slot {
          min-height: var(--_input-height-large);
          padding: 0 var(--_input-padding-x-large);
          font-size: var(--_global-font-size-md);
        }

        /* Supporting text styling */
        .supporting-text {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--_global-spacing-sm);
          margin-top: var(--_global-spacing-xs);
          min-height: 16px;
        }
        
        .helper-text,
        .error-message {
          font-size: var(--_global-font-size-xs);
          line-height: var(--_global-line-height-tight);
          font-weight: var(--_global-font-weight-normal);
          opacity: 0;
          transform: translateY(-4px);
          transition: opacity var(--_input-motion-duration-short) var(--_input-motion-easing),
                      transform var(--_input-motion-duration-short) var(--_input-motion-easing);
        }
        
        .helper-text {
          color: var(--_input-supporting-text-color);
          flex: 1;
        }
        
        .error-message {
          color: var(--_input-supporting-text-color-error);
          font-weight: var(--_global-font-weight-medium);
          flex: 1;
          display: none;
        }
        
        .character-count {
          color: var(--_input-supporting-text-color);
          font-size: var(--_global-font-size-xs);
          line-height: var(--_global-line-height-tight);
          font-weight: var(--_global-font-weight-normal);
          white-space: nowrap;
          opacity: 1;
        }
        
        .character-count.over-limit {
          color: var(--_input-supporting-text-color-error);
        }

        .helper-text:not(:empty),
        .error-message[style*="block"] {
          opacity: 1;
          transform: translateY(0);
        }

        /* Enhanced Material Design 3 Floating Label Animation */
        .label.over {
          transition: all var(--_input-motion-duration-medium) var(--_input-motion-easing),
                      color var(--_input-motion-duration-short) var(--_input-motion-easing);
        }
        
        /* Floating state - active when field has focus or content */
        .input-field:focus ~ .label.over,
        .input-field:not(:placeholder-shown) ~ .label.over,
        .input-field[value]:not([value=""]) ~ .label.over,
        .input-wrapper.has-content .label.over {
          top: -12px;
          left: calc(var(--_input-padding-x, var(--_input-padding-x-medium)) - 4px);
          transform: translateY(0) scale(0.75);
          font-size: var(--_global-font-size-xs);
          color: var(--_input-label-color-focus);
          background-color: var(--_global-color-surface);
          border-radius: var(--_global-border-radius-xs);
          font-weight: var(--_global-font-weight-medium);
          box-shadow: 0 0 0 6px var(--_global-color-surface);
          letter-spacing: 0.02em;
          z-index: 3;
          padding: 2px 6px;
        }
        
        /* Enhanced animation on focus */
        .input-field:focus ~ .label.over {
          animation: labelFloat var(--_input-motion-duration-medium) var(--_input-motion-easing) forwards;
        }
        
        @keyframes labelFloat {
          0% {
            transform: translateY(-50%) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-25%) scale(0.9);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0) scale(0.75);
            opacity: 1;
          }
        }
        
        /* Reverse animation when losing focus without content */
        .input-field:not(:focus):placeholder-shown:not([value]) ~ .label.over {
          animation: labelUnfloat var(--_input-motion-duration-medium) var(--_input-motion-easing) forwards;
        }
        
        @keyframes labelUnfloat {
          0% {
            transform: translateY(0) scale(0.75);
            opacity: 1;
          }
          50% {
            transform: translateY(-25%) scale(0.9);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-50%) scale(1);
            opacity: 0.7;
          }
        }
        
        /* Filled variant floating label - no background */
        :host([variant="filled"]) .input-field:focus ~ .label.over,
        :host([variant="filled"]) .input-field:not(:placeholder-shown) ~ .label.over,
        :host([variant="filled"]) .input-field[value]:not([value=""]) ~ .label.over {
          background-color: transparent;
          box-shadow: none;
          top: -8px;
          padding: 0 4px;
        }
        
        /* Error state for floating label with enhanced animation */
        .input-container.has-error .input-field:focus ~ .label.over,
        .input-container.has-error .input-field:not(:placeholder-shown) ~ .label.over,
        .input-container.has-error .input-field[value]:not([value=""]) ~ .label.over {
          color: var(--_input-label-color-error);
          animation: labelErrorFloat var(--_input-motion-duration-medium) var(--_input-motion-easing) forwards;
        }
        
        @keyframes labelErrorFloat {
          0% {
            transform: translateY(-50%) scale(1);
            color: var(--_input-label-color);
          }
          50% {
            transform: translateY(-25%) scale(0.9);
            color: color-mix(in srgb, var(--_input-label-color-error) 50%, var(--_input-label-color));
          }
          100% {
            transform: translateY(0) scale(0.75);
            color: var(--_input-label-color-error);
          }
        }
        
        /* Label state management for better UX */
        .input-field:focus ~ .label.over,
        .input-field:not(:placeholder-shown) ~ .label.over {
          will-change: transform, color, background-color;
        }
        
        /* Size-specific label adjustments */
        :host([size="small"]) .input-field:focus ~ .label.over,
        :host([size="small"]) .input-field:not(:placeholder-shown) ~ .label.over,
        :host([size="small"]) .input-field[value]:not([value=""]) ~ .label.over {
          top: -10px;
          font-size: calc(var(--_global-font-size-xs) * 0.9);
          padding: 1px 4px;
          box-shadow: 0 0 0 4px var(--_global-color-surface);
        }
        
        :host([size="large"]) .input-field:focus ~ .label.over,
        :host([size="large"]) .input-field:not(:placeholder-shown) ~ .label.over,
        :host([size="large"]) .input-field[value]:not([value=""]) ~ .label.over {
          top: -14px;
          font-size: var(--_global-font-size-sm);
          padding: 3px 8px;
          box-shadow: 0 0 0 8px var(--_global-color-surface);
        }
        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .input-field {
            border: 2px solid currentColor;
            background-color: var(--_global-color-surface);
          }
          
          .input-field:focus {
            outline: 3px solid;
            outline-offset: 2px;
          }
          
          .label {
            font-weight: var(--_global-font-weight-bold);
          }
          
          .leading-icon,
          .trailing-icon {
            opacity: 1;
            filter: contrast(2);
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .input-field,
          .label,
          .error-message,
          .helper-text,
          .leading-icon,
          .trailing-icon {
            animation: none !important;
            transition: none !important;
          }
          
          .label.over {
            transition: none !important;
          }
          
          .input-field:focus ~ .label.over,
          .input-field:not(:placeholder-shown) ~ .label.over,
          .input-field[value]:not([value=""]) ~ .label.over {
            transition: none !important;
            animation: none !important;
          }
          
          /* Instant positioning for reduced motion */
          .input-field:focus ~ .label.over,
          .input-field:not(:placeholder-shown) ~ .label.over,
          .input-field[value]:not([value=""]) ~ .label.over {
            top: -12px;
            transform: translateY(0) scale(0.75);
          }
        }

        /* Enhanced focus-visible support */
        @supports selector(:focus-visible) {
          .input-field:focus:not(:focus-visible) {
            outline: none;
            border-color: var(--_input-outline-color);
          }
          
          .input-field:focus-visible {
            outline: 2px solid var(--_input-outline-color-focus);
            outline-offset: 2px;
          }
        }
        
        /* Typography consistency improvements */
        .input-field {
          letter-spacing: var(--_global-letter-spacing-normal, 0.01em);
        }
        
        .label {
          letter-spacing: var(--_global-letter-spacing-wide, 0.02em);
        }
        
        .helper-text,
        .error-message {
          letter-spacing: var(--_global-letter-spacing-normal, 0.01em);
        }
        
        /* Consistent spacing system */
        .input-container {
          margin-bottom: var(--_global-spacing-component, var(--_global-spacing-lg));
        }
        
        /* Dense layout support */
        :host([dense]) {
          --_input-height: calc(var(--_input-height) * 0.875);
          --_input-padding-x: calc(var(--_input-padding-x, var(--_input-padding-x-medium)) * 0.875);
          --_input-padding-y: calc(var(--_input-padding-y, var(--_input-padding-y-medium)) * 0.75);
        }
        
        :host([dense]) .label {
          font-size: calc(var(--_global-font-size-sm) * 0.875);
        }
        
        :host([dense]) .helper-text,
        :host([dense]) .error-message,
        :host([dense]) .character-count {
          font-size: calc(var(--_global-font-size-xs) * 0.875);
        }
        
        /* Comfortable layout support */
        :host([comfortable]) {
          --_input-height: calc(var(--_input-height) * 1.125);
          --_input-padding-x: calc(var(--_input-padding-x, var(--_input-padding-x-medium)) * 1.125);
          --_input-padding-y: calc(var(--_input-padding-y, var(--_input-padding-y-medium)) * 1.25);
        }
        
        :host([comfortable]) .label {
          font-size: calc(var(--_global-font-size-sm) * 1.125);
          margin-bottom: calc(var(--_global-spacing-xs) * 1.5);
        }
        
        :host([comfortable]) .supporting-text {
          margin-top: calc(var(--_global-spacing-xs) * 1.5);
        }
        
        /* Responsive typography */
        @media (max-width: 768px) {
          :host {
            --_input-height: var(--_input-height-medium);
            font-size: var(--_global-font-size-md);
          }
          
          .input-field {
            font-size: max(16px, var(--_global-font-size-md)); /* Prevents zoom on iOS */
          }
          
          .label {
            font-size: var(--_global-font-size-sm);
          }
        }
        
        @media (min-width: 1200px) {
          :host([size="large"]) {
            --_input-height: calc(var(--_input-height-large) * 1.1);
          }
        }
        
        /* Print styles */
        @media print {
          .input-field {
            border: 1px solid #000;
            background: transparent;
            box-shadow: none;
            font-size: 12pt;
            line-height: 1.4;
          }
          
          .label {
            color: #000;
            font-size: 10pt;
            font-weight: bold;
          }
          
          .helper-text,
          .error-message {
            font-size: 9pt;
          }
          
          .supporting-text {
            margin-top: 2pt;
          }
        }
      </style>

      <div class="input-container ${labelPosition === 'left' ? 'label-left' : labelPosition === 'over' ? 'label-over' : ''} variant-${this._schema.variant} size-${this._schema.size}">
        ${labelPosition !== 'over' ? `<label class="label ${this._schema.required ? 'required' : ''}" id="${this._schema.name}-input-label" for="${this._schema.name}-input">${label}</label>` : ''}
        
        <div class="input-wrapper">
          ${this._schema.leadingIcon ? `<span class="leading-icon" aria-hidden="true" role="img" aria-label="${this._schema.label} icon">${this._schema.leadingIcon}</span>` : ''}
          
          <div class="prefix-slot">
            <slot name="prefix"></slot>
          </div>
          
          <div class="input-content">
            ${this.generateInputElement()}
            ${labelPosition === 'over' ? `<label class="label over ${this._schema.required ? 'required' : ''}" id="${this._schema.name}-input-label" for="${this._schema.name}-input">${label}</label>` : ''}
          </div>
          
          <div class="suffix-slot">
            <slot name="suffix"></slot>
          </div>
          
          ${this._schema.trailingIcon ? `<span class="trailing-icon" aria-hidden="true" role="img" aria-label="${this._schema.label} trailing icon">${this._schema.trailingIcon}</span>` : ''}
        </div>
        
        <div class="supporting-text">
          ${this._schema.helperText ? `<div class="helper-text" id="${this._schema.name}-helper" role="note">${this._schema.helperText}</div>` : '<div class="helper-text"></div>'}
          <div class="error-message" id="${this._schema.name}-error" role="alert" aria-live="assertive" aria-atomic="true"></div>
          ${this._schema.characterCount ? `<div class="character-count" id="${this._schema.name}-count" role="status" aria-live="polite" aria-atomic="true"></div>` : ''}
        </div>
      </div>
    `;

    // Apply conditional classes based on slots, icons, and state
    const inputField = this.shadowRoot.querySelector('.input-field');
    const container = this.shadowRoot.querySelector('.input-container');
    const prefixSlot = this.shadowRoot.querySelector('slot[name="prefix"]');
    const suffixSlot = this.shadowRoot.querySelector('slot[name="suffix"]');
    const leadingIcon = this.shadowRoot.querySelector('.leading-icon');
    const trailingIcon = this.shadowRoot.querySelector('.trailing-icon');
    const characterCountEl = this.shadowRoot.querySelector('.character-count');
    
    if (inputField && container) {
      // Add error class if there are validation errors
      if (this._errors.length > 0) {
        inputField.classList.add('error');
        container.classList.add('has-error');
      } else {
        inputField.classList.remove('error');
        container.classList.remove('has-error');
      }

      // Enhanced slot and icon visibility management
      const hasPrefix = prefixSlot && prefixSlot.assignedElements().length > 0;
      const hasSuffix = suffixSlot && suffixSlot.assignedElements().length > 0;
      const hasLeadingIcon = leadingIcon && this._schema.leadingIcon;
      const hasTrailingIcon = trailingIcon && this._schema.trailingIcon;
      
      // Update classes based on content
      inputField.classList.toggle('has-prefix', hasPrefix);
      inputField.classList.toggle('has-suffix', hasSuffix);
      inputField.classList.toggle('has-leading-icon', hasLeadingIcon);
      inputField.classList.toggle('has-trailing-icon', hasTrailingIcon);
      
      // Update ARIA attributes for slots
      if (hasPrefix) {
        const prefixContent = prefixSlot.assignedElements()[0];
        if (prefixContent) {
          prefixSlot.setAttribute('aria-label', `Prefix: ${prefixContent.textContent || prefixContent.getAttribute('aria-label') || 'content'}`);
        }
      }
      
      if (hasSuffix) {
        const suffixContent = suffixSlot.assignedElements()[0];
        if (suffixContent) {
          suffixSlot.setAttribute('aria-label', `Suffix: ${suffixContent.textContent || suffixContent.getAttribute('aria-label') || 'content'}`);
        }
      }
      
      // Update character count if enabled
      if (characterCountEl && this._schema.characterCount) {
        const currentLength = this._value.length;
        const maxLength = this._schema.maxLength;
        
        if (maxLength) {
          characterCountEl.textContent = `${currentLength}/${maxLength}`;
          characterCountEl.classList.toggle('over-limit', currentLength > maxLength);
        } else {
          characterCountEl.textContent = currentLength.toString();
        }
      }
    }
    
    // Update helper text visibility
    const helperText = this.shadowRoot.querySelector('.helper-text');
    if (helperText && this._schema.helperText) {
      helperText.style.opacity = '1';
      helperText.style.transform = 'translateY(0)';
    }
    
    // Update error display to ensure proper ARIA attributes
    this.updateErrorDisplay();
    
    // Update host class for error state
    if (this._errors.length > 0) {
      this.classList.add('has-error');
    } else {
      this.classList.remove('has-error');
    }
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-input')) {
  customElements.define('my-input', MyInput);
}