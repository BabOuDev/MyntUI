/**
 * MyntUI my-input Component
 * A Material Design 3 input component with enhanced state layers, floating labels, validation, and accessibility
 * Supports both outlined and filled variants with consistent styling and behavior patterns
 * Enhanced version using MyntUIBaseComponent for improved consistency and maintainability
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
    
    // Component-specific bindings
    this.handleInput = this.handleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
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
        // TODO: Add validation method
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

    // Apply automatic icon assignment if no explicit icons are set
    this.applyAutomaticIcons();

    // Set initial value
    this._value = this._schema.value;
  }

  // Automatic icon assignment based on input type using global configuration
  getDefaultIconForType(type) {
    const autoIconMapping = globalConfig.get('components.input.autoIconMapping', {});
    return autoIconMapping[type] || null;
  }

  // Apply automatic icon assignment if no explicit icons are provided
  applyAutomaticIcons() {
    const showIconsOnly = globalConfig.get('components.input.showIconsOnly', 'when-relevant');
    
    // Skip automatic icons if set to 'never'
    if (showIconsOnly === 'never') {
      return;
    }
    
    // Only assign automatic icons if no explicit icons are set
    if (!this._schema.leadingIcon && !this._schema.trailingIcon) {
      const autoIcon = this.getDefaultIconForType(this._schema.type);
      if (autoIcon) {
        // For 'when-relevant', only assign if the input type benefits from an icon
        if (showIconsOnly === 'when-relevant' || showIconsOnly === 'always') {
          this._schema.leadingIcon = autoIcon;
        }
      }
    }
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

  // Enhanced focus method with comprehensive accessibility announcements
  focus() {
    const inputElement = this.shadowRoot.querySelector('input, textarea, select');
    if (inputElement && !this._schema.disabled) {
      inputElement.focus();
      this.updateLabelState();
      this.updateFocusState(true);
      
      // Enhanced accessibility announcements
      if (this._errors.length > 0) {
        this.announceToScreenReader(`${this._schema.label || 'Input'} focused with error: ${this._errors[0]}`, 'assertive');
      } else if (this._schema.helperText) {
        this.announceToScreenReader(`${this._schema.label || 'Input'} focused. ${this._schema.helperText}`, 'polite');
      } else {
        this.announceToScreenReader(`${this._schema.label || 'Input'} focused`, 'polite');
      }
      
      // Update ARIA live region for status
      this.updateAriaLiveRegion('focus');
    }
  }
  
  // Enhanced label floating state management with animations
  updateLabelState(force = false) {
    const inputElement = this.shadowRoot.querySelector('input, textarea, select');
    const inputWrapper = this.shadowRoot.querySelector('.input-wrapper');
    const label = this.shadowRoot.querySelector('.label.over');
    
    if (!inputElement || !inputWrapper) return;
    
    const hasContent = inputElement.value && inputElement.value.trim() !== '';
    const isFocused = inputElement === document.activeElement || inputElement.matches(':focus');
    const shouldFloat = hasContent || isFocused;
    const currentlyFloating = inputWrapper.classList.contains('has-content');
    
    // Update state classes
    if (shouldFloat && !currentlyFloating) {
      inputWrapper.classList.add('has-content');
      if (label && !force) {
        label.classList.add('floating', 'animating');
        label.classList.remove('unfloating');
        
        // Clean up animation classes after animation completes
        setTimeout(() => {
          label.classList.remove('floating', 'animating');
        }, parseInt(getComputedStyle(label).transitionDuration) * 1000 || 300);
      }
    } else if (!shouldFloat && currentlyFloating) {
      inputWrapper.classList.remove('has-content');
      if (label && !force) {
        label.classList.add('unfloating', 'animating');
        label.classList.remove('floating');
        
        // Clean up animation classes after animation completes
        setTimeout(() => {
          label.classList.remove('unfloating', 'animating');
        }, parseInt(getComputedStyle(label).transitionDuration) * 1000 || 300);
      }
    }
    
    // Update ARIA attributes for label state
    if (label) {
      label.setAttribute('aria-hidden', shouldFloat ? 'false' : 'true');
      if (shouldFloat) {
        label.setAttribute('role', 'label');
      } else {
        label.removeAttribute('role');
      }
    }
  }
  
  // Enhanced screen reader announcements with priority levels
  announceToScreenReader(message, priority = 'polite') {
    if (!message || message.trim() === '') return;
    
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.setAttribute('role', priority === 'assertive' ? 'alert' : 'status');
    announcement.style.cssText = `
      position: absolute !important;
      left: -10000px !important;
      top: -10000px !important;
      width: 1px !important;
      height: 1px !important;
      overflow: hidden !important;
      clip: rect(1px, 1px, 1px, 1px) !important;
      white-space: nowrap !important;
      border: 0 !important;
      padding: 0 !important;
      margin: 0 !important;
    `;
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Clean up after announcement
    const cleanupTime = priority === 'assertive' ? 2000 : 1000;
    setTimeout(() => {
      if (announcement.parentNode) {
        announcement.parentNode.removeChild(announcement);
      }
    }, cleanupTime);
  }
  
  // Update ARIA live region for different states
  updateAriaLiveRegion(state) {
    const container = this.shadowRoot.querySelector('.input-container');
    if (!container) return;
    
    const liveRegion = container.querySelector('.aria-live-region') || 
      this.createAriaLiveRegion();
    
    switch (state) {
      case 'focus':
        liveRegion.textContent = this._errors.length > 0 ? 
          `Error: ${this._errors[0]}` : 
          (this._schema.helperText || '');
        break;
      case 'validation':
        liveRegion.textContent = this._errors.length > 0 ? 
          `Validation error: ${this._errors[0]}` : 
          'Input is valid';
        break;
      case 'clear':
        liveRegion.textContent = '';
        break;
    }
  }
  
  // Create ARIA live region for announcements
  createAriaLiveRegion() {
    const container = this.shadowRoot.querySelector('.input-container');
    if (!container) return null;
    
    const liveRegion = document.createElement('div');
    liveRegion.className = 'aria-live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    
    container.appendChild(liveRegion);
    return liveRegion;
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

  // Enhanced validation with comprehensive accessibility and error prioritization
  validate(value = this._value, announce = false) {
    const previousErrorCount = this._errors.length;
    const previousErrors = [...this._errors];
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
        
        // Update character count ARIA label
        characterCountEl.setAttribute('aria-label', 
          `Characters: ${value.length}${this._schema.maxLength ? ` of ${this._schema.maxLength}` : ''}${isOverLimit ? ' (over limit)' : ''}`);
      }
    }
    
    // Enhanced accessibility announcements
    if (announce) {
      const hasNewErrors = this._errors.length > 0 && JSON.stringify(this._errors) !== JSON.stringify(previousErrors);
      const errorsResolved = previousErrorCount > 0 && this._errors.length === 0;
      
      if (hasNewErrors) {
        this.announceToScreenReader(
          `${this._schema.label || 'Input'} validation failed: ${this._errors[0]}`,
          'assertive'
        );
      } else if (errorsResolved) {
        this.announceToScreenReader(
          `${this._schema.label || 'Input'} validation passed`,
          'polite'
        );
      }
    }
    
    // Update ARIA live region
    this.updateAriaLiveRegion('validation');
    
    // Emit enhanced validation event
    if (previousErrorCount !== this._errors.length || JSON.stringify(previousErrors) !== JSON.stringify(this._errors)) {
      this.dispatchEvent(new CustomEvent('validation', {
        detail: {
          value: this._value,
          valid: this.valid,
          errors: this._errors,
          previousErrors: previousErrors,
          name: this._schema.name,
          previouslyValid: previousErrorCount === 0,
          errorStateChanged: (previousErrorCount === 0) !== (this._errors.length === 0)
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

  // Enhanced keyboard navigation with comprehensive accessibility
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
      const oldValue = this._value;
      inputElement.value = '';
      this._value = '';
      this.validate(this._value, false); // Don't announce validation during clear
      this.updateErrorDisplay();
      this.updateLabelState();
      
      // Enhanced clearing announcement
      this.announceToScreenReader(
        `${this._schema.label || 'Input'} cleared. Value changed from "${oldValue}" to empty.`,
        'polite'
      );
      
      // Emit custom input event with clear context
      this.dispatchEvent(new CustomEvent('input', {
        detail: {
          value: this._value,
          oldValue: oldValue,
          valid: this.valid,
          errors: this._errors,
          name: this._schema.name,
          action: 'clear'
        },
        bubbles: true
      }));
    }

    // Handle Enter key for form submission with enhanced validation
    if (event.key === 'Enter' && this._schema.type !== 'textarea') {
      const wasValid = this.valid;
      this.validate(this._value, true); // Announce validation results
      
      // Enhanced validation announcement
      if (!this.valid) {
        this.announceToScreenReader(
          `Form submission prevented. ${this._schema.label || 'Input'} has error: ${this._errors[0]}`,
          'assertive'
        );
        event.preventDefault();
        return;
      } else if (!wasValid) {
        this.announceToScreenReader(
          `${this._schema.label || 'Input'} is now valid. Form can be submitted.`,
          'polite'
        );
      }
      
      // Emit enhanced submit event
      this.dispatchEvent(new CustomEvent('submit', {
        detail: {
          value: this._value,
          valid: this.valid,
          errors: this._errors,
          name: this._schema.name,
          validationChanged: wasValid !== this.valid
        },
        bubbles: true
      }));
    }
    
    // Enhanced Tab key handling for error navigation
    if (event.key === 'Tab') {
      if (this._errors.length > 0) {
        // Announce error with more context
        setTimeout(() => {
          this.announceToScreenReader(
            `${this._schema.label || 'Input'} has validation error: ${this._errors[0]}. Please correct before continuing.`,
            'polite'
          );
        }, 100);
      } else if (this._schema.helperText) {
        // Announce helper text when leaving valid field
        setTimeout(() => {
          this.announceToScreenReader(
            `Leaving ${this._schema.label || 'input'}. ${this._schema.helperText}`,
            'polite'
          );
        }, 100);
      }
    }
    
    // Enhanced F1 key for contextual help
    if (event.key === 'F1') {
      event.preventDefault();
      let helpMessage = `Help for ${this._schema.label || 'input'}:`;
      
      if (this._schema.helperText) {
        helpMessage += ` ${this._schema.helperText}.`;
      }
      
      if (this._schema.required) {
        helpMessage += ' This field is required.';
      }
      
      if (this._schema.maxLength) {
        helpMessage += ` Maximum ${this._schema.maxLength} characters.`;
      }
      
      if (this._schema.pattern) {
        helpMessage += ' Must match required format.';
      }
      
      this.announceToScreenReader(helpMessage, 'polite');
    }
  }
  
  // Build comprehensive ARIA describedby string
  buildAriaDescribedBy(hasError) {
    const parts = [];
    
    if (hasError && this._errors.length > 0) {
      parts.push(`${this._schema.name}-error`);
    }
    
    if (this._schema.helperText && !hasError) {
      parts.push(`${this._schema.name}-helper`);
    }
    
    if (this._schema.characterCount) {
      parts.push(`${this._schema.name}-count`);
    }
    
    // Add custom describedby from attributes
    const customDescribedBy = this.getAttribute('aria-describedby');
    if (customDescribedBy && !parts.includes(customDescribedBy)) {
      parts.push(customDescribedBy);
    }
    
    return parts.join(' ');
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
        inputElement.setAttribute('aria-describedby', this.buildAriaDescribedBy(true));
        
        // Enhanced error state management
        if (container) {
          container.classList.add('has-error');
          container.setAttribute('data-error-state', 'true');
          
          // Trigger error shake animation only for new errors
          if (!previouslyHadErrors) {
            this.triggerErrorAnimation();
          }
        }
        
        // Update host class and ARIA attributes
        this.classList.add('has-error');
        this.setAttribute('aria-invalid', 'true');
        
        // Update icon states for error
        const leadingIcon = this.shadowRoot.querySelector('.leading-icon');
        const trailingIcon = this.shadowRoot.querySelector('.trailing-icon');
        if (leadingIcon) leadingIcon.setAttribute('aria-hidden', 'false');
        if (trailingIcon) trailingIcon.setAttribute('aria-hidden', 'false');
        
      } else {
        // Hide error message with animation
        errorElement.style.display = 'none';
        
        // Show helper text when hiding error
        if (helperText && this._schema.helperText) {
          helperText.style.opacity = '1';
          helperText.style.transform = 'translateY(0)';
        }
        
        // Clear ARIA attributes with enhanced management
        inputElement.setAttribute('aria-invalid', 'false');
        inputElement.setAttribute('aria-describedby', this.buildAriaDescribedBy(false));
        
        // Enhanced error state cleanup
        if (container) {
          container.classList.remove('has-error');
          container.removeAttribute('data-error-state');
        }
        
        // Update host class and ARIA attributes
        this.classList.remove('has-error');
        this.removeAttribute('aria-invalid');
        
        // Reset icon states
        const leadingIcon = this.shadowRoot.querySelector('.leading-icon');
        const trailingIcon = this.shadowRoot.querySelector('.trailing-icon');
        if (leadingIcon) leadingIcon.setAttribute('aria-hidden', 'true');
        if (trailingIcon) trailingIcon.setAttribute('aria-hidden', 'true');
        
        // Success animation for resolved errors
        if (previouslyHadErrors) {
          this.triggerSuccessAnimation();
        }
      }
    }
  }
  
  // Enhanced error animation with label shake for better feedback
  triggerErrorAnimation() {
    const container = this.shadowRoot.querySelector('.input-container');
    const label = this.shadowRoot.querySelector('.label.over');
    
    if (!container) return;
    
    // Container shake animation
    container.classList.remove('error-animation');
    container.offsetHeight; // Force reflow
    container.classList.add('error-animation');
    
    // Enhanced label error shake animation
    if (label && label.classList.contains('floating')) {
      label.classList.remove('error-shake');
      label.offsetHeight; // Force reflow
      label.classList.add('error-shake');
      
      setTimeout(() => {
        label.classList.remove('error-shake');
      }, 300);
    }
    
    // Remove container animation class after completion
    setTimeout(() => {
      container.classList.remove('error-animation');
    }, 300);
    
    // Enhanced haptic feedback for touch devices
    if ('vibrate' in navigator && navigator.vibrate) {
      navigator.vibrate([50, 30, 50]); // Short error vibration pattern
    }
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
  
  // Enhanced slot content changes with icon integration
  handleSlotChange(event) {
    const slot = event.target;
    const slotName = slot.getAttribute('name');
    
    // Update slot visibility and styling
    this.updateSlotVisibility();
    
    // Enhanced accessibility for slot changes
    if (slotName === 'prefix' || slotName === 'suffix') {
      this.updateSlotAccessibility(slot, slotName);
    }
    
    // Update input field padding based on slot content
    this.updateInputPadding();
  }
  
  // Update slot accessibility attributes
  updateSlotAccessibility(slot, slotName) {
    const assignedElements = slot.assignedElements();
    if (assignedElements.length === 0) return;
    
    assignedElements.forEach(element => {
      // Enhanced accessibility for my-icon elements
      if (element.tagName === 'MY-ICON') {
        element.setAttribute('aria-hidden', 'false');
        if (!element.hasAttribute('aria-label')) {
          element.setAttribute('aria-label', `${slotName} icon`);
        }
        // Make icon interactive if it has click handlers
        if (element.hasAttribute('onclick') || element.onclick) {
          element.setAttribute('interactive', '');
          element.setAttribute('role', 'button');
          element.setAttribute('tabindex', '0');
        }
      }
      
      // Enhanced accessibility for buttons
      if (element.tagName === 'BUTTON') {
        if (!element.hasAttribute('aria-label')) {
          element.setAttribute('aria-label', `${slotName} button`);
        }
        element.setAttribute('type', 'button'); // Prevent form submission
      }
      
      // Enhanced accessibility for text content
      if (element.classList.contains('slot-text') || element.tagName === 'SPAN') {
        element.setAttribute('aria-hidden', 'true');
        element.setAttribute('role', 'presentation');
      }
    });
  }
  
  // Enhanced slot visibility and styling with icon integration
  updateSlotVisibility() {
    const inputField = this.shadowRoot.querySelector('.input-field');
    const prefixSlot = this.shadowRoot.querySelector('slot[name="prefix"]');
    const suffixSlot = this.shadowRoot.querySelector('slot[name="suffix"]');
    const container = this.shadowRoot.querySelector('.input-container');
    
    if (!inputField || !container) return;
    
    const hasPrefix = prefixSlot && prefixSlot.assignedElements().length > 0;
    const hasSuffix = suffixSlot && suffixSlot.assignedElements().length > 0;
    const hasLeadingIcon = this._schema.leadingIcon;
    const hasTrailingIcon = this._schema.trailingIcon;
    
    // Update classes for styling
    inputField.classList.toggle('has-prefix', hasPrefix);
    inputField.classList.toggle('has-suffix', hasSuffix);
    inputField.classList.toggle('has-leading-icon', hasLeadingIcon);
    inputField.classList.toggle('has-trailing-icon', hasTrailingIcon);
    
    container.classList.toggle('has-prefix', hasPrefix);
    container.classList.toggle('has-suffix', hasSuffix);
    container.classList.toggle('has-leading-icon', hasLeadingIcon);
    container.classList.toggle('has-trailing-icon', hasTrailingIcon);
    
    // Enhanced accessibility management
    this.updateSlotAriaDescribedBy(hasPrefix, hasSuffix, prefixSlot, suffixSlot);
  }
  
  // Update input padding based on slot and icon content
  updateInputPadding() {
    const inputField = this.shadowRoot.querySelector('.input-field');
    if (!inputField) return;
    
    const prefixSlot = this.shadowRoot.querySelector('slot[name="prefix"]');
    const suffixSlot = this.shadowRoot.querySelector('slot[name="suffix"]');
    
    const hasPrefix = prefixSlot && prefixSlot.assignedElements().length > 0;
    const hasSuffix = suffixSlot && suffixSlot.assignedElements().length > 0;
    const hasLeadingIcon = this._schema.leadingIcon;
    const hasTrailingIcon = this._schema.trailingIcon;
    
    // Calculate padding based on content
    let paddingLeft = 'var(--_input-padding-x, var(--_input-padding-x-medium))';
    let paddingRight = 'var(--_input-padding-x, var(--_input-padding-x-medium))';
    
    if (hasLeadingIcon) {
      paddingLeft = 'calc(var(--_input-padding-x, var(--_input-padding-x-medium)) + 32px)';
    }
    if (hasTrailingIcon) {
      paddingRight = 'calc(var(--_input-padding-x, var(--_input-padding-x-medium)) + 32px)';
    }
    
    // Additional padding for slots
    if (hasPrefix && !hasLeadingIcon) {
      paddingLeft = 'var(--_global-spacing-xs)';
    }
    if (hasSuffix && !hasTrailingIcon) {
      paddingRight = 'var(--_global-spacing-xs)';
    }
    
    inputField.style.paddingLeft = paddingLeft;
    inputField.style.paddingRight = paddingRight;
  }
  
  // Enhanced ARIA describedby management for slots
  updateSlotAriaDescribedBy(hasPrefix, hasSuffix, prefixSlot, suffixSlot) {
    const describedByParts = [];
    
    // Add standard ARIA describedby parts
    const standardDescribedBy = this.buildAriaDescribedBy(this._errors.length > 0);
    if (standardDescribedBy) {
      describedByParts.push(standardDescribedBy);
    }
    
    // Add prefix/suffix descriptions
    if (hasPrefix && prefixSlot) {
      const prefixContent = prefixSlot.assignedElements()[0];
      if (prefixContent) {
        const prefixId = `prefix-${this._schema.name}`;
        describedByParts.push(prefixId);
        
        // Create or update prefix description
        let prefixDesc = this.shadowRoot.querySelector(`#${prefixId}`);
        if (!prefixDesc) {
          prefixDesc = document.createElement('span');
          prefixDesc.id = prefixId;
          prefixDesc.className = 'sr-only';
          prefixSlot.parentElement.appendChild(prefixDesc);
        }
        
        const prefixText = this.getSlotContentDescription(prefixContent, 'prefix');
        prefixDesc.textContent = `Prefix: ${prefixText}`;
      }
    }
    
    if (hasSuffix && suffixSlot) {
      const suffixContent = suffixSlot.assignedElements()[0];
      if (suffixContent) {
        const suffixId = `suffix-${this._schema.name}`;
        describedByParts.push(suffixId);
        
        // Create or update suffix description
        let suffixDesc = this.shadowRoot.querySelector(`#${suffixId}`);
        if (!suffixDesc) {
          suffixDesc = document.createElement('span');
          suffixDesc.id = suffixId;
          suffixDesc.className = 'sr-only';
          suffixSlot.parentElement.appendChild(suffixDesc);
        }
        
        const suffixText = this.getSlotContentDescription(suffixContent, 'suffix');
        suffixDesc.textContent = `Suffix: ${suffixText}`;
      }
    }
    
    // Update input aria-describedby
    const inputField = this.shadowRoot.querySelector('.input-field');
    if (inputField && describedByParts.length > 0) {
      inputField.setAttribute('aria-describedby', describedByParts.join(' '));
    }
  }
  
  // Get accessible description for slot content
  getSlotContentDescription(element, slotType) {
    if (element.tagName === 'MY-ICON') {
      return element.getAttribute('aria-label') || 
             element.getAttribute('icon') || 
             `${slotType} icon`;
    }
    
    if (element.tagName === 'BUTTON') {
      return element.getAttribute('aria-label') || 
             element.textContent?.trim() || 
             `${slotType} button`;
    }
    
    return element.textContent?.trim() || 
           element.getAttribute('aria-label') || 
           `${slotType} content`;
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
    
    // Enhanced ARIA attributes with comprehensive fallbacks
    const ariaLabel = this.getAttribute('aria-label') || 
      (this._schema.labelPosition === 'over' && !label ? `${this._schema.type} input` : '');
    const ariaDescribedBy = this.buildAriaDescribedBy(hasErrors);
    const ariaInvalid = this.getAttribute('aria-invalid') || (hasErrors ? 'true' : 'false');
    const ariaRequired = this._schema.required ? 'true' : 'false';
    const ariaReadOnly = this._schema.readonly ? 'true' : 'false';
    
    // Enhanced placeholder for better accessibility - hide when using floating labels
    const accessiblePlaceholder = this._schema.labelPosition === 'over' ? '' : 
      (placeholder || label || `Enter ${this._schema.type === 'email' ? 'email address' : this._schema.type}`);
    
    const commonAttributes = `
      id="${inputId}"
      name="${name}"
      class="input-field"
      ${accessiblePlaceholder ? `placeholder="${accessiblePlaceholder}"` : ''}
      ${disabled ? 'disabled aria-disabled="true"' : 'aria-disabled="false"'}
      ${readonly ? 'readonly aria-readonly="' + ariaReadOnly + '"' : 'aria-readonly="false"'}
      ${this._schema.required ? 'required aria-required="' + ariaRequired + '"' : 'aria-required="' + ariaRequired + '"'}
      ${this._schema.autocomplete ? `autocomplete="${this._schema.autocomplete}"` : 'autocomplete="off"'}
      ${ariaLabel ? `aria-label="${ariaLabel}"` : ''}
      ${ariaDescribedBy ? `aria-describedby="${ariaDescribedBy}"` : ''}
      aria-invalid="${ariaInvalid}"
      ${label ? `aria-labelledby="${this._schema.name}-input-label"` : ''}
      role="${this._schema.type === 'email' ? 'textbox' : 'textbox'}"
      ${this._schema.type === 'password' ? 'aria-description="Password will be hidden"' : ''}
    `.trim();

    switch (type) {
      case 'textarea':
        return `<textarea ${commonAttributes} 
          role="textbox" 
          aria-multiline="true"
          ${this._schema.minLength ? `minlength="${this._schema.minLength}" aria-describedby="${ariaDescribedBy}"` : ''}
          spellcheck="true"
          wrap="soft"
          aria-label="${ariaLabel || label || 'Textarea input'}"
          ${this._schema.maxLength ? `aria-describedby="${ariaDescribedBy}" data-max-length="${this._schema.maxLength}"` : ''}>${value}</textarea>`;
        
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
          ${this._schema.multiple ? 'size="4"' : ''}
          aria-label="${ariaLabel || label || 'Select an option'}">
          ${!this._schema.multiple && !value ? `<option value="" disabled selected hidden>${accessiblePlaceholder || 'Select an option'}</option>` : ''}
          ${options}
        </select>`;
        
      case 'checkbox':
        return `<input type="checkbox" ${commonAttributes} 
          ${value === 'true' || value === true || value === 'on' ? 'checked' : ''}
          role="checkbox"
          aria-checked="${value === 'true' || value === true || value === 'on' ? 'true' : 'false'}"
          aria-label="${ariaLabel || label || 'Checkbox input'}">`;
        
      case 'radio':
        return `<input type="radio" ${commonAttributes} 
          ${value === 'true' || value === true || value === this._schema.value ? 'checked' : ''}
          role="radio"
          aria-checked="${value === 'true' || value === true || value === this._schema.value ? 'true' : 'false'}"
          aria-label="${ariaLabel || label || 'Radio input'}">`;
        
      case 'dynamic-select':
        // For dynamic-select, render as a text input with autocomplete functionality
        return `<input type="text" ${commonAttributes} 
          value="${value}"
          role="combobox"
          aria-expanded="false"
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-label="${ariaLabel || label || 'Dynamic select input'}"
          autocomplete="off"
          spellcheck="false">`;
        
      default:
        // Map custom types to appropriate HTML input types
        let htmlType = type;
        if (type === 'integer') htmlType = 'number';
        if (type === 'pattern') htmlType = 'text';
        if (type === 'date-of-birth') htmlType = 'date';
        
        const inputAttributes = `
          type="${htmlType}"
          value="${value}"
          ${this._schema.min !== undefined ? `min="${this._schema.min}"` : ''}
          ${this._schema.max !== undefined ? `max="${this._schema.max}"` : ''}
          ${this._schema.minLength ? `minlength="${this._schema.minLength}"` : ''}
          ${this._schema.maxLength ? `maxlength="${this._schema.maxLength}"` : ''}
          ${this._schema.pattern || (type === 'pattern') ? `pattern="${this._schema.pattern || '.*'}"` : ''}
          ${this._schema.step || (type === 'integer' ? 'step="1"' : '') ? `step="${this._schema.step || (type === 'integer' ? '1' : '')}"` : ''}
          ${type === 'email' ? 'spellcheck="false"' : ''}
          ${type === 'password' ? 'spellcheck="false"' : ''}
          ${type === 'url' ? 'spellcheck="false"' : ''}
          ${type === 'pattern' ? 'spellcheck="false"' : ''}
          ${type === 'integer' ? 'inputmode="numeric"' : ''}
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
          case 'integer':
            role = 'spinbutton';
            ariaProps = `inputmode="numeric" aria-valuemin="${this._schema.min || ''}" aria-valuemax="${this._schema.max || ''}" aria-valuenow="${value || ''}"`;
            break;
          case 'pattern':
            role = 'textbox';
            ariaProps = `inputmode="text" aria-describedby="${ariaDescribedBy}" title="Input must match required pattern"`;
            break;
          case 'date':
            role = 'textbox';
            ariaProps = 'aria-label="Date input"';
            break;
          case 'datetime-local':
            role = 'textbox';
            ariaProps = 'aria-label="Date and time input"';
            break;
          case 'time':
            role = 'textbox';
            ariaProps = 'aria-label="Time input"';
            break;
          case 'date-of-birth':
            role = 'textbox';
            ariaProps = 'inputmode="numeric" aria-label="Date of birth input"';
            break;
          case 'checkbox':
            role = 'checkbox';
            ariaProps = `aria-checked="${value === 'true' || value === true ? 'true' : 'false'}"`;
            break;
          case 'radio':
            role = 'radio';
            ariaProps = `aria-checked="${value === 'true' || value === true ? 'true' : 'false'}"`;
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
          ${role ? `role="${role}"` : 'role="textbox"'}
          ${ariaProps}
          ${type === 'password' ? 'aria-autocomplete="off"' : ''}
          ${type === 'search' ? 'aria-label="Search input"' : ''}
          ${this._schema.pattern ? `aria-describedby="${ariaDescribedBy}" title="Input must match required format"` : ''}>`;
    }
  }

  // Render the component
  render() {
    const { label, labelPosition } = this._schema;
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Tailwind-Inspired Input Token System - Clean and Minimal */
          --_input-height-small: 36px;
          --_input-height-medium: 40px;
          --_input-height-large: 44px;
          --_input-height: var(--_input-height-medium);
          
          /* Clean spacing tokens aligned with Tailwind spacing scale */
          --_input-padding-x-small: 12px;
          --_input-padding-x-medium: 14px;
          --_input-padding-x-large: 16px;
          --_input-padding-y-small: 8px;
          --_input-padding-y-medium: 10px;
          --_input-padding-y-large: 12px;
          --_input-gap: 8px;
          
          /* Tailwind-inspired clean color system */
          /* Outlined variant - clean borders */
          --_input-outlined-outline-color: rgb(209 213 219); /* gray-300 */
          --_input-outlined-outline-color-focus: rgb(59 130 246); /* blue-500 */
          --_input-outlined-outline-color-error: rgb(239 68 68); /* red-500 */
          --_input-outlined-outline-color-hover: rgb(156 163 175); /* gray-400 */
          --_input-outlined-outline-color-disabled: rgb(229 231 235); /* gray-200 */
          --_input-outlined-container-color: rgb(255 255 255); /* white */
          --_input-outlined-container-color-hover: rgb(249 250 251); /* gray-50 */
          --_input-outlined-container-color-focus: rgb(255 255 255); /* white */
          
          /* Filled variant - subtle background */
          --_input-filled-container-color: rgb(243 244 246); /* gray-100 */
          --_input-filled-container-color-hover: rgb(229 231 235); /* gray-200 */
          --_input-filled-container-color-focus: rgb(255 255 255); /* white */
          --_input-filled-container-color-disabled: rgb(249 250 251); /* gray-50 */
          --_input-filled-active-indicator-color: rgb(59 130 246); /* blue-500 */
          --_input-filled-active-indicator-color-error: rgb(239 68 68); /* red-500 */
          --_input-filled-active-indicator-height: 1px;
          --_input-filled-active-indicator-height-focus: 2px;
          
          /* Clean text colors with high contrast */
          --_input-text-color: rgb(17 24 39); /* gray-900 */
          --_input-text-color-disabled: rgb(156 163 175); /* gray-400 */
          --_input-placeholder-color: rgb(107 114 128); /* gray-500 */
          --_input-label-color: rgb(75 85 99); /* gray-600 */
          --_input-label-color-focus: rgb(59 130 246); /* blue-500 */
          --_input-label-color-error: rgb(239 68 68); /* red-500 */
          --_input-label-color-disabled: rgb(156 163 175); /* gray-400 */
          --_input-label-color-hover: rgb(55 65 81); /* gray-700 */
          
          /* Clean supporting text colors */
          --_input-supporting-text-color: rgb(107 114 128); /* gray-500 */
          --_input-supporting-text-color-error: rgb(239 68 68); /* red-500 */
          --_input-supporting-text-color-disabled: rgb(156 163 175); /* gray-400 */
          --_input-supporting-text-color-success: rgb(34 197 94); /* green-500 */
          
          /* Clean icon colors */
          --_input-leading-icon-color: rgb(107 114 128); /* gray-500 */
          --_input-trailing-icon-color: rgb(107 114 128); /* gray-500 */
          --_input-icon-color-hover: rgb(75 85 99); /* gray-600 */
          --_input-icon-color-focus: rgb(59 130 246); /* blue-500 */
          --_input-icon-color-error: rgb(239 68 68); /* red-500 */
          --_input-icon-color-disabled: rgb(156 163 175); /* gray-400 */
          --_input-icon-color-success: rgb(34 197 94); /* green-500 */
          
          /* Tailwind-inspired border radius system */
          --_input-container-shape-small: 4px; /* rounded */
          --_input-container-shape-medium: 6px; /* rounded-md */
          --_input-container-shape-large: 8px; /* rounded-lg */
          --_input-container-shape: var(--_input-container-shape-medium);
          --_input-state-layer-shape: 9999px; /* rounded-full */
          --_input-container-shape-top: var(--_input-container-shape) var(--_input-container-shape) 0 0;
          
          /* Simplified state layer system */
          --_input-state-layer-color: rgb(59 130 246); /* blue-500 */
          --_input-state-layer-opacity-hover: 0.04;
          --_input-state-layer-opacity-focus: 0.08;
          --_input-state-layer-opacity-pressed: 0.12;
          
          /* Clean animation tokens */
          --_input-motion-duration-short: 150ms;
          --_input-motion-duration-medium: 200ms;
          --_input-motion-duration-long: 300ms;
          --_input-motion-easing: cubic-bezier(0.4, 0, 0.2, 1); /* ease-out */
          --_input-motion-easing-decelerate: cubic-bezier(0, 0, 0.2, 1); /* ease-out */
          --_input-motion-easing-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55);
          --_input-motion-easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
          
          /* Clean focus ring system - no elevation, just clean rings */
          --_input-container-elevation: none;
          --_input-container-elevation-hover: none;
          --_input-container-elevation-focus: none;
          --_input-container-elevation-filled: none;
          --_input-container-elevation-filled-hover: none;
          --_input-container-elevation-filled-focus: none;
          
          /* Tailwind-style focus rings */
          --_input-focus-ring: 2px solid rgb(147 197 253); /* blue-300 */
          --_input-focus-ring-offset: 2px;
          --_input-focus-ring-error: 2px solid rgb(252 165 165); /* red-300 */
          
          display: block;
          width: 100%;
          position: relative;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
          contain: layout style;
          isolation: isolate;
        }

        /* Clean size variants with consistent spacing */
        :host([size="small"]) {
          --_input-height: var(--_input-height-small);
          --_input-padding-x: var(--_input-padding-x-small);
          --_input-padding-y: var(--_input-padding-y-small);
          --_input-container-shape: var(--_input-container-shape-small);
          --_input-container-shape-top: var(--_input-container-shape-small) var(--_input-container-shape-small) 0 0;
          font-size: 14px;
        }
        
        :host([size="large"]) {
          --_input-height: var(--_input-height-large);
          --_input-padding-x: var(--_input-padding-x-large);
          --_input-padding-y: var(--_input-padding-y-large);
          --_input-container-shape: var(--_input-container-shape-large);
          --_input-container-shape-top: var(--_input-container-shape-large) var(--_input-container-shape-large) 0 0;
          font-size: 18px;
        }
        
        /* Clean variant styles - no elevation, just borders */
        :host([variant="outlined"]),
        :host(:not([variant])) {
          --_input-container-color: var(--_input-outlined-container-color);
          --_input-container-color-hover: var(--_input-outlined-container-color-hover);
          --_input-container-color-focus: var(--_input-outlined-container-color-focus);
          --_input-outline-color: var(--_input-outlined-outline-color);
        }
        
        :host([variant="filled"]) {
          --_input-container-color: var(--_input-filled-container-color);
          --_input-container-color-hover: var(--_input-filled-container-color-hover);
          --_input-container-color-focus: var(--_input-filled-container-color-focus);
          --_input-container-color-disabled: var(--_input-filled-container-color-disabled);
        }
        
        /* Clean focus state management */
        :host(:focus-within) {
          --_input-outline-color: var(--_input-outlined-outline-color-focus);
          --_input-label-color: var(--_input-label-color-focus);
        }
        
        :host([disabled]) {
          pointer-events: none;
          cursor: not-allowed;
          --_input-text-color: var(--_input-text-color-disabled);
          --_input-outline-color: var(--_input-outlined-outline-color-disabled);
        }
        
        :host(.has-error) {
          --_input-outline-color: var(--_input-outlined-outline-color-error);
          --_input-label-color: var(--_input-label-color-error);
        }

        .input-container {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 6px;
          isolation: isolate;
        }

        .input-container.label-left {
          flex-direction: row;
          align-items: flex-start;
          gap: 12px;
        }

        .input-container.label-over {
          position: relative;
        }
        
        /* Clean Tailwind-inspired variant system - no complex shadows */
        .input-container.variant-filled .input-field {
          background-color: var(--_input-filled-container-color);
          border: 1px solid transparent;
          border-bottom: var(--_input-filled-active-indicator-height) solid var(--_input-outlined-outline-color);
          border-radius: var(--_input-container-shape-top);
          position: relative;
          transition: all var(--_input-motion-duration-short) var(--_input-motion-easing);
        }
        
        /* Simple filled variant active indicator */
        .input-container.variant-filled .input-field::after {
          content: '';
          position: absolute;
          bottom: calc(-1 * var(--_input-filled-active-indicator-height));
          left: 0;
          right: 0;
          height: var(--_input-filled-active-indicator-height-focus);
          background-color: var(--_input-filled-active-indicator-color);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform var(--_input-motion-duration-short) var(--_input-motion-easing);
        }
        
        .input-container.variant-outlined .input-field {
          background-color: var(--_input-outlined-container-color);
          border: 1px solid var(--_input-outlined-outline-color);
          border-radius: var(--_input-container-shape);
          position: relative;
          transition: all var(--_input-motion-duration-short) var(--_input-motion-easing);
        }

        .label {
          font-size: 14px;
          font-weight: 500;
          color: var(--_input-label-color);
          line-height: 1.25;
          transition: color var(--_input-motion-duration-short) var(--_input-motion-easing);
          display: block;
          margin-bottom: 6px;
          user-select: none;
          letter-spacing: 0.01em;
        }

        .label.required::after {
          content: ' *';
          color: var(--_input-label-color-error);
          font-weight: 600;
          margin-left: 1px;
        }

        .label.over {
          position: absolute;
          top: 50%;
          left: var(--_input-padding-x, var(--_input-padding-x-medium));
          transform: translateY(-50%);
          background-color: transparent;
          padding: 0 4px;
          transition: all var(--_input-motion-duration-medium) var(--_input-motion-easing);
          pointer-events: none;
          z-index: 10;
          margin-bottom: 0;
          transform-origin: left center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: calc(100% - 2 * var(--_input-padding-x, var(--_input-padding-x-medium)));
        }
        
        /* Clean floating label background for outlined variant */
        :host([variant="outlined"]) .label.over {
          background-color: var(--_input-outlined-container-color);
          box-shadow: 0 0 0 2px var(--_input-outlined-container-color);
          border-radius: 2px;
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
          background-color: var(--_input-container-color, rgb(255 255 255));
          color: var(--_input-text-color);
          font-size: 16px;
          font-family: inherit;
          font-weight: 400;
          line-height: 1.5;
          transition: border-color var(--_input-motion-duration-short) var(--_input-motion-easing),
                      background-color var(--_input-motion-duration-short) var(--_input-motion-easing),
                      box-shadow var(--_input-motion-duration-short) var(--_input-motion-easing);
          outline: none;
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
        
        /* Enhanced Material Design 3 State Layer System */
        .input-field::before {
          content: '';
          position: absolute;
          inset: 0;
          background-color: var(--_input-state-layer-color);
          opacity: 0;
          transition: opacity var(--_input-motion-duration-short) var(--_input-motion-easing);
          pointer-events: none;
          border-radius: inherit;
          z-index: -1;
        }
        
        /* State layer for interactive elements within input */
        .leading-icon,
        .trailing-icon {
          position: relative;
        }
        
        .leading-icon::before,
        .trailing-icon::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 40px;
          height: 40px;
          border-radius: var(--_input-state-layer-shape);
          background-color: var(--_input-state-layer-color);
          opacity: 0;
          transform: translate(-50%, -50%);
          transition: opacity var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
          pointer-events: none;
          z-index: -1;
        }

        .input-field::placeholder {
          color: var(--_input-placeholder-color);
          opacity: 1;
          transition: opacity var(--_input-motion-duration-short) var(--_input-motion-easing),
                      color var(--_input-motion-duration-short) var(--_input-motion-easing);
          font-style: normal;
          letter-spacing: 0.01em;
        }
        
        /* Hide placeholder when floating label is present */
        :host([label-position="over"]) .input-field::placeholder {
          opacity: 0;
        }
        
        /* Show placeholder only when focused and no floating label conflict */
        :host([label-position="over"]) .input-field:focus::placeholder {
          opacity: 0.6;
          color: color-mix(in srgb, var(--_input-placeholder-color) 80%, transparent);
          transition-delay: var(--_input-motion-duration-medium);
        }
        
        /* Enhanced label hover states */
        .label:not(.over):hover {
          color: var(--_input-label-color-hover);
          transform: translateY(-1px);
          transition: all var(--_input-motion-duration-short) var(--_input-motion-easing-spring);
        }

        /* Clean hover states - subtle and minimal */
        .input-field:hover:not(:disabled):not(:focus) {
          border-color: var(--_input-outlined-outline-color-hover);
          transition: border-color var(--_input-motion-duration-short) var(--_input-motion-easing);
        }
        
        .input-container.variant-outlined .input-field:hover:not(:disabled):not(:focus) {
          border-color: var(--_input-outlined-outline-color-hover);
          background-color: var(--_input-outlined-container-color-hover);
        }
        
        .input-container.variant-filled .input-field:hover:not(:disabled):not(:focus) {
          background-color: var(--_input-filled-container-color-hover);
        }
        
        /* Clean icon hover states */
        .leading-icon:hover,
        .trailing-icon:hover {
          color: var(--_input-icon-color-hover);
          transition: color var(--_input-motion-duration-short) var(--_input-motion-easing);
        }

        /* Clean Tailwind-style focus states with focus rings */
        .input-field:focus,
        .input-field.focused {
          outline: none;
          border-color: var(--_input-outlined-outline-color-focus);
          box-shadow: 0 0 0 3px rgb(147 197 253 / 0.3); /* blue-300 with opacity */
          transition: border-color var(--_input-motion-duration-short) var(--_input-motion-easing),
                      box-shadow var(--_input-motion-duration-short) var(--_input-motion-easing);
        }
        
        /* Outlined variant focus - clean ring */
        .input-container.variant-outlined .input-field:focus,
        .input-container.variant-outlined .input-field.focused {
          border-color: var(--_input-outlined-outline-color-focus);
          background-color: var(--_input-outlined-container-color-focus);
          box-shadow: 0 0 0 3px rgb(147 197 253 / 0.3); /* blue-300 with opacity */
        }
        
        /* Filled variant focus - clean indicator */
        .input-container.variant-filled .input-field:focus,
        .input-container.variant-filled .input-field.focused {
          background-color: var(--_input-filled-container-color-focus);
          border-bottom-color: var(--_input-filled-active-indicator-color);
          border-bottom-width: var(--_input-filled-active-indicator-height-focus);
          box-shadow: 0 0 0 3px rgb(147 197 253 / 0.3); /* blue-300 with opacity */
        }
        
        .input-container.variant-filled .input-field:focus::after,
        .input-container.variant-filled .input-field.focused::after {
          transform: scaleX(1);
        }
        
        /* Clean focus ring for accessibility */
        .input-field:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgb(147 197 253 / 0.5); /* stronger focus ring for keyboard navigation */
        }

        /* Enhanced container focus states with icon animations */
        .input-container.focused .label:not(.over) {
          color: var(--_input-label-color-focus);
          transform: translateY(-1px) scale(1.02);
          transition: all var(--_input-motion-duration-short) var(--_input-motion-easing-spring);
          text-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.1);
        }
        
        .input-container.focused .leading-icon,
        .input-container.focused .trailing-icon {
          color: var(--_input-icon-color-focus);
          transform: translateY(-50%) scale(1.05);
          transition: all var(--_input-motion-duration-short) var(--_input-motion-easing-spring);
          filter: brightness(1.1) saturate(1.2);
        }
        
        /* Enhanced focus states for icons */
        .leading-icon:focus::before,
        .trailing-icon:focus::before {
          opacity: var(--_input-state-layer-opacity-focus);
        }

        /* Enhanced filled variant focus with active indicator */
        :host([variant="filled"]) .input-field:focus,
        :host([variant="filled"]) .input-field.focused {
          border-bottom-width: var(--_input-filled-active-indicator-height-focus);
          border-bottom-color: var(--_input-filled-active-indicator-color);
        }
        
        :host([variant="filled"]) .input-field:focus::after,
        :host([variant="filled"]) .input-field.focused::after {
          transform: scaleX(1);
          background-color: var(--_input-filled-active-indicator-color);
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

        /* Host-level disabled state with enhanced visual feedback */
        :host([disabled]) {
          pointer-events: none;
          cursor: not-allowed;
          filter: grayscale(0.3);
        }

        :host([disabled]) .input-container {
          opacity: var(--_global-opacity-disabled);
          transform: scale(0.99);
        }

        /* Clean error states - Tailwind-inspired */
        .input-field.error,
        .input-container.has-error .input-field {
          border-color: var(--_input-outlined-outline-color-error);
          transition: border-color var(--_input-motion-duration-short) var(--_input-motion-easing),
                      box-shadow var(--_input-motion-duration-short) var(--_input-motion-easing);
        }
        
        /* Outlined variant error states */
        .input-container.variant-outlined.has-error .input-field {
          border-color: var(--_input-outlined-outline-color-error);
          background-color: rgb(255 255 255); /* keep clean white background */
        }
        
        .input-container.variant-outlined.has-error .input-field:focus {
          border-color: var(--_input-outlined-outline-color-error);
          box-shadow: 0 0 0 3px rgb(252 165 165 / 0.3); /* red-300 with opacity */
        }
        
        /* Filled variant error states */
        .input-container.variant-filled.has-error .input-field {
          background-color: var(--_input-filled-container-color);
          border-bottom-color: var(--_input-filled-active-indicator-color-error);
        }
        
        .input-container.variant-filled.has-error .input-field:focus {
          border-bottom-color: var(--_input-filled-active-indicator-color-error);
          border-bottom-width: var(--_input-filled-active-indicator-height-focus);
          box-shadow: 0 0 0 3px rgb(252 165 165 / 0.3); /* red-300 with opacity */
        }
        
        .input-container.variant-filled.has-error .input-field::after {
          background-color: var(--_input-filled-active-indicator-color-error);
        }
        
        /* Clean error focus ring */
        .input-container.has-error .input-field:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgb(252 165 165 / 0.5); /* stronger error focus ring */
        }

        /* Enhanced error state for container with variant support */
        .input-container.has-error {
          --_input-label-color: var(--_input-label-color-error);
          --_input-supporting-text-color: var(--_input-supporting-text-color-error);
        }
        
        .input-container.variant-outlined.has-error {
          --_input-outlined-outline-color: var(--_input-outlined-outline-color-error);
          --_input-outlined-outline-color-hover: var(--_input-outlined-outline-color-error);
          --_input-outlined-outline-color-focus: var(--_input-outlined-outline-color-error);
        }
        
        .input-container.variant-filled.has-error {
          --_input-filled-active-indicator-color: var(--_input-filled-active-indicator-color-error);
        }
        
        .input-container.has-error .leading-icon,
        .input-container.has-error .trailing-icon {
          color: var(--_input-icon-color-error);
          transform: translateY(-50%) scale(1.02);
        }
        
        /* Enhanced error animations with spring physics */
        .input-container.has-error .leading-icon,
        .input-container.has-error .trailing-icon {
          animation: iconErrorPulse var(--_input-motion-duration-medium) var(--_input-motion-easing-bounce);
          filter: drop-shadow(0 0 2px var(--_input-icon-color-error));
        }
        
        @keyframes iconErrorPulse {
          0% {
            transform: translateY(-50%) scale(1);
          }
          30% {
            transform: translateY(-50%) scale(1.15) rotate(2deg);
          }
          60% {
            transform: translateY(-50%) scale(0.95) rotate(-1deg);
          }
          100% {
            transform: translateY(-50%) scale(1.02) rotate(0deg);
          }
        }

        /* Enhanced error animations with better spring motion */
        .input-container.error-animation .input-field {
          animation: inputErrorShake var(--_input-motion-duration-long) var(--_input-motion-easing-bounce);
        }
        
        .input-container.error-animation {
          animation: containerErrorPulse var(--_input-motion-duration-long) var(--_input-motion-easing-spring);
        }

        @keyframes inputErrorShake {
          0%, 100% { transform: translateX(0) translateY(0); }
          10% { transform: translateX(-4px) translateY(-1px); }
          20% { transform: translateX(4px) translateY(1px); }
          30% { transform: translateX(-3px) translateY(-0.5px); }
          40% { transform: translateX(3px) translateY(0.5px); }
          50% { transform: translateX(-2px) translateY(-0.25px); }
          60% { transform: translateX(2px) translateY(0.25px); }
          70% { transform: translateX(-1px) translateY(0); }
          80% { transform: translateX(1px) translateY(0); }
        }
        
        @keyframes containerErrorPulse {
          0% { transform: scale(1); }
          25% { transform: scale(1.03); }
          50% { transform: scale(0.98); }
          75% { transform: scale(1.01); }
          100% { transform: scale(1); }
        }
        
        /* Success flash animation with enhanced visual feedback */
        .input-field.success-flash {
          animation: successFlash var(--_input-motion-duration-long) var(--_input-motion-easing-spring);
        }
        
        @keyframes successFlash {
          0% {
            border-color: var(--_input-outline-color);
            background-color: var(--_input-container-color, var(--_global-color-surface));
            box-shadow: var(--_input-container-elevation);
            transform: scale(1);
          }
          30% {
            border-color: var(--_global-color-success);
            background-color: color-mix(in srgb, var(--_global-color-success) 12%, transparent);
            box-shadow: 0 0 0 2px color-mix(in srgb, var(--_global-color-success) 20%, transparent), var(--_input-container-elevation-hover);
            transform: scale(1.02);
          }
          70% {
            border-color: var(--_global-color-success);
            background-color: color-mix(in srgb, var(--_global-color-success) 6%, transparent);
            box-shadow: 0 0 0 1px color-mix(in srgb, var(--_global-color-success) 10%, transparent), var(--_input-container-elevation);
            transform: scale(1.01);
          }
          100% {
            border-color: var(--_input-outline-color);
            background-color: var(--_input-container-color, var(--_global-color-surface));
            box-shadow: var(--_input-container-elevation);
            transform: scale(1);
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

        /* Enhanced icon styling with Material Design 3 principles */
        .leading-icon,
        .trailing-icon {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--_input-leading-icon-color);
          pointer-events: auto;
          z-index: 2;
          transition: color var(--_input-motion-duration-short) var(--_input-motion-easing),
                      transform var(--_input-motion-duration-short) var(--_input-motion-easing);
          cursor: pointer;
          border-radius: var(--_input-state-layer-shape);
          min-width: 40px;
          min-height: 40px;
        }
        
        .leading-icon {
          left: var(--_global-spacing-xs);
          color: var(--_input-leading-icon-color);
        }
        
        .trailing-icon {
          right: var(--_global-spacing-xs);
          color: var(--_input-trailing-icon-color);
        }
        
        /* Enhanced icon integration with my-icon component */
        .leading-icon my-icon,
        .trailing-icon my-icon,
        .leading-icon ::slotted(my-icon),
        .trailing-icon ::slotted(my-icon) {
          width: 20px;
          height: 20px;
          color: inherit;
          --_icon-size: 20px;
          --_icon-color: inherit;
        }
        
        /* Icon interactive states */
        .leading-icon:hover,
        .trailing-icon:hover {
          transform: translateY(-50%) scale(1.05);
        }
        
        .leading-icon:active,
        .trailing-icon:active {
          transform: translateY(-50%) scale(0.95);
        }
        
        /* Enhanced Material Design 3 Prefix/Suffix slot styling */
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
          background-color: var(--_global-color-surface-container-low);
          border: 1px solid var(--_input-outlined-outline-color);
          transition: all var(--_input-motion-duration-short) var(--_input-motion-easing);
          position: relative;
          z-index: 1;
          gap: var(--_input-gap);
        }
        
        .prefix-slot:not(:empty),
        .suffix-slot:not(:empty) {
          display: flex;
        }
        
        /* Enhanced slot state layer */
        .prefix-slot::before,
        .suffix-slot::before {
          content: '';
          position: absolute;
          inset: 0;
          background-color: var(--_input-state-layer-color);
          opacity: 0;
          transition: opacity var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
          pointer-events: none;
          border-radius: inherit;
          z-index: -1;
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
        
        /* Enhanced filled variant adjustments */
        :host([variant="filled"]) .prefix-slot,
        :host([variant="filled"]) .suffix-slot {
          background-color: var(--_input-filled-container-color);
          border-bottom: var(--_input-filled-active-indicator-height) solid var(--_input-outlined-outline-color);
          border-top: none;
          border-radius: var(--_input-container-shape) var(--_input-container-shape) 0 0;
        }
        
        :host([variant="filled"]) .prefix-slot {
          border-left: none;
          border-right: none;
        }
        
        :host([variant="filled"]) .suffix-slot {
          border-right: none;
          border-left: none;
        }
        
        /* Filled variant hover states */
        :host([variant="filled"]) .prefix-slot:hover,
        :host([variant="filled"]) .suffix-slot:hover {
          background-color: var(--_input-filled-container-color-hover);
        }
        
        /* Filled variant focus states */
        :host([variant="filled"]) .input-wrapper:focus-within .prefix-slot,
        :host([variant="filled"]) .input-wrapper:focus-within .suffix-slot {
          background-color: var(--_input-filled-container-color-focus);
          border-bottom-color: var(--_input-filled-active-indicator-color);
          border-bottom-width: var(--_input-filled-active-indicator-height-focus);
        }
        
        /* Enhanced hover states for slots with state layers */
        .prefix-slot:hover,
        .suffix-slot:hover {
          border-color: var(--_input-outlined-outline-color-hover);
        }
        
        .prefix-slot:hover::before,
        .suffix-slot:hover::before {
          opacity: var(--_input-state-layer-opacity-hover);
        }
        
        /* Enhanced focus states for slots */
        .input-wrapper:focus-within .prefix-slot,
        .input-wrapper:focus-within .suffix-slot {
          border-color: var(--_input-outlined-outline-color-focus);
        }
        
        .input-wrapper:focus-within .prefix-slot::before,
        .input-wrapper:focus-within .suffix-slot::before {
          opacity: var(--_input-state-layer-opacity-focus);
        }
        
        /* Enhanced error states for slots */
        .input-container.has-error .prefix-slot,
        .input-container.has-error .suffix-slot {
          border-color: var(--_input-outlined-outline-color-error);
        }
        
        .input-container.has-error .prefix-slot::before,
        .input-container.has-error .suffix-slot::before {
          background-color: var(--_input-outlined-outline-color-error);
          opacity: 0.04;
        }
        
        .input-container.has-error .prefix-slot ::slotted(my-icon),
        .input-container.has-error .suffix-slot ::slotted(my-icon) {
          --_icon-color: var(--_input-icon-color-error);
        }
        
        /* Disabled states for slots */
        :host([disabled]) .prefix-slot,
        :host([disabled]) .suffix-slot {
          opacity: var(--_global-opacity-disabled);
          background-color: var(--_global-color-surface-variant);
          color: var(--_input-text-color-disabled);
        }
        
        /* Enhanced slot content styling with my-icon integration */
        .prefix-slot ::slotted(*),
        .suffix-slot ::slotted(*) {
          color: inherit;
          font-size: inherit;
          display: flex;
          align-items: center;
          gap: var(--_input-gap);
        }
        
        .prefix-slot ::slotted(my-icon),
        .suffix-slot ::slotted(my-icon) {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          --_icon-size: 20px;
          --_icon-color: inherit;
          --_icon-state-layer-color: var(--_input-state-layer-color);
        }
        
        /* Enhanced slot text styling */
        .prefix-slot ::slotted(.slot-text),
        .suffix-slot ::slotted(.slot-text) {
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-medium);
          line-height: var(--_global-line-height-tight);
          color: inherit;
        }
        
        /* Enhanced slot button styling */
        .prefix-slot ::slotted(button),
        .suffix-slot ::slotted(button) {
          background: none;
          border: none;
          color: inherit;
          padding: var(--_global-spacing-xs);
          border-radius: var(--_input-state-layer-shape);
          cursor: pointer;
          transition: all var(--_input-motion-duration-short) var(--_input-motion-easing);
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 32px;
          min-height: 32px;
        }
        
        .prefix-slot ::slotted(button:hover),
        .suffix-slot ::slotted(button:hover) {
          background-color: color-mix(in srgb, var(--_input-state-layer-color) calc(var(--_input-state-layer-opacity-hover) * 100%), transparent);
        }
        
        .prefix-slot ::slotted(button:active),
        .suffix-slot ::slotted(button:active) {
          background-color: color-mix(in srgb, var(--_input-state-layer-color) calc(var(--_input-state-layer-opacity-pressed) * 100%), transparent);
          transform: scale(0.95);
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

        /* Enhanced supporting text styling with better animations */
        .supporting-text {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 8px;
          margin-top: 6px;
          min-height: 20px;
        }
        
        .helper-text,
        .error-message {
          font-size: 14px;
          line-height: 1.25;
          font-weight: 400;
          opacity: 1;
          transition: color var(--_input-motion-duration-short) var(--_input-motion-easing);
        }
        
        .helper-text {
          color: var(--_input-supporting-text-color);
          flex: 1;
        }
        
        .error-message {
          color: var(--_input-supporting-text-color-error);
          font-weight: 500;
          flex: 1;
          display: none;
        }
        
        .character-count {
          color: var(--_input-supporting-text-color);
          font-size: 14px;
          line-height: 1.25;
          font-weight: 400;
          white-space: nowrap;
          opacity: 1;
          transition: color var(--_input-motion-duration-short) var(--_input-motion-easing);
          min-width: 40px;
          text-align: right;
        }
        
        .character-count.over-limit {
          color: var(--_input-supporting-text-color-error);
          font-weight: 500;
        }
        
        .character-count.near-limit {
          color: rgb(245 158 11); /* amber-500 */
          font-weight: 500;
        }
        
        /* Enhanced character count animations */
        .character-count.warning-pulse {
          animation: characterCountWarning var(--_input-motion-duration-medium) var(--_input-motion-easing) ease-out;
        }
        
        @keyframes characterCountWarning {
          0% {
            transform: scale(1);
            color: var(--_input-supporting-text-color);
          }
          50% {
            transform: scale(1.1);
            color: var(--_global-color-warning);
          }
          100% {
            transform: scale(1.05);
            color: var(--_global-color-warning);
          }
        }
        
        .character-count.error-pulse {
          animation: characterCountError var(--_input-motion-duration-medium) var(--_input-motion-easing) ease-out;
        }
        
        @keyframes characterCountError {
          0% {
            transform: scale(1.05);
            color: var(--_global-color-warning);
          }
          25% {
            transform: scale(1.2);
          }
          50% {
            transform: scale(0.95);
          }
          75% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1.05);
            color: var(--_input-supporting-text-color-error);
          }
        }

        .helper-text:not(:empty),
        .error-message[style*="block"] {
          opacity: 1;
          transform: translateY(0);
          max-height: 40px;
        }
        
        .error-message[style*="block"]::before {
          opacity: 1;
        }
        
        /* Enhanced error message animations */
        .error-message.show {
          animation: errorMessageSlideIn var(--_input-motion-duration-medium) var(--_input-motion-easing) forwards;
        }
        
        .error-message.hide {
          animation: errorMessageSlideOut var(--_input-motion-duration-short) var(--_input-motion-easing) forwards;
        }
        
        @keyframes errorMessageSlideIn {
          0% {
            opacity: 0;
            transform: translateY(-8px);
            max-height: 0;
          }
          50% {
            max-height: 20px;
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            max-height: 40px;
          }
        }
        
        @keyframes errorMessageSlideOut {
          0% {
            opacity: 1;
            transform: translateY(0);
            max-height: 40px;
          }
          50% {
            opacity: 0;
            transform: translateY(-4px);
            max-height: 20px;
          }
          100% {
            opacity: 0;
            transform: translateY(-8px);
            max-height: 0;
          }
        }

        /* Enhanced Material Design 3 Floating Label Animation System */
        .label.over {
          transition: all var(--_input-motion-duration-medium) var(--_input-motion-easing),
                      color var(--_input-motion-duration-short) var(--_input-motion-easing),
                      background-color var(--_input-motion-duration-short) var(--_input-motion-easing);
          will-change: transform, color, background-color, font-size;
          backface-visibility: hidden;
          transform-origin: left center;
        }
        
        /* Enhanced floating state with improved animations */
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
          z-index: 15;
          padding: 2px 6px;
          backdrop-filter: blur(4px);
        }
        
        /* Enhanced label positioning for different states */
        .label.over.floating {
          animation: labelFloatUp var(--_input-motion-duration-medium) var(--_input-motion-easing) forwards;
        }
        
        .label.over.unfloating {
          animation: labelFloatDown var(--_input-motion-duration-medium) var(--_input-motion-easing) forwards;
        }
        
        /* Enhanced animation on focus */
        .input-field:focus ~ .label.over {
          animation: labelFloat var(--_input-motion-duration-medium) var(--_input-motion-easing) forwards;
        }
        
        /* Simplified reverse animation - use transitions instead of keyframes */
        .input-field:not(:focus):placeholder-shown:not([value]) ~ .label.over {
          transition: all var(--_input-motion-duration-medium) var(--_input-motion-easing);
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
        
        /* Simplified error state for floating label */
        .input-container.has-error .input-field:focus ~ .label.over,
        .input-container.has-error .input-field:not(:placeholder-shown) ~ .label.over,
        .input-container.has-error .input-field[value]:not([value=""]) ~ .label.over {
          color: var(--_input-label-color-error);
          transition: all var(--_input-motion-duration-medium) var(--_input-motion-easing);
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
          z-index: 15;
        }
        
        :host([size="large"]) .input-field:focus ~ .label.over,
        :host([size="large"]) .input-field:not(:placeholder-shown) ~ .label.over,
        :host([size="large"]) .input-field[value]:not([value=""]) ~ .label.over {
          top: -14px;
          font-size: var(--_global-font-size-sm);
          padding: 3px 8px;
          box-shadow: 0 0 0 8px var(--_global-color-surface);
          z-index: 15;
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
        
        /* Enhanced responsive design with comprehensive breakpoints */
        
        /* Mobile devices (up to 480px) */
        @media (max-width: 480px) {
          :host {
            --_input-height: calc(var(--_input-height-medium) * 1.1);
            --_input-padding-x: calc(var(--_input-padding-x-medium) * 1.1);
            font-size: var(--_global-font-size-md);
          }
          
          .input-field {
            font-size: max(16px, var(--_global-font-size-md)); /* Prevents zoom on iOS */
            min-height: 44px; /* Touch target minimum */
          }
          
          .label {
            font-size: var(--_global-font-size-sm);
          }
          
          .prefix-slot,
          .suffix-slot {
            padding: 0 var(--_global-spacing-xs);
            min-height: 44px;
          }
          
          .leading-icon,
          .trailing-icon {
            min-width: 44px;
            min-height: 44px;
          }
          
          /* Enhanced touch targets for mobile */
          .label.over {
            touch-action: none;
            user-select: none;
          }
        }
        
        /* Tablet devices (481px - 768px) */
        @media (min-width: 481px) and (max-width: 768px) {
          :host {
            --_input-height: var(--_input-height-medium);
            font-size: var(--_global-font-size-md);
          }
          
          .input-field {
            font-size: var(--_global-font-size-md);
          }
        }
        
        /* Desktop and larger screens */
        @media (min-width: 1200px) {
          :host([size="large"]) {
            --_input-height: calc(var(--_input-height-large) * 1.1);
          }
          
          .input-field:hover {
            transition-duration: calc(var(--_input-motion-duration-short) * 0.8);
          }
        }
        
        /* Enhanced accessibility features */
        
        /* Screen reader only content */
        .sr-only {
          position: absolute !important;
          left: -10000px !important;
          top: -10000px !important;
          width: 1px !important;
          height: 1px !important;
          overflow: hidden !important;
          clip: rect(1px, 1px, 1px, 1px) !important;
          white-space: nowrap !important;
          border: 0 !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        
        /* Enhanced Windows High Contrast mode */
        @media screen and (-ms-high-contrast: active) {
          .input-field {
            border: 2px solid WindowText;
            background-color: Window;
            color: WindowText;
          }
          
          .input-field:focus {
            outline: 2px solid Highlight;
            outline-offset: 2px;
          }
          
          .label {
            color: WindowText;
            font-weight: bold;
          }
          
          .error-message {
            color: WindowText;
            font-weight: bold;
          }
        }
        
        /* Enhanced pointer device adaptations */
        @media (pointer: coarse) {
          .input-field {
            min-height: 44px; /* Ensure touch target size */
            padding: calc(var(--_input-padding-y, var(--_input-padding-y-medium)) + 2px) var(--_input-padding-x, var(--_input-padding-x-medium));
          }
          
          .leading-icon,
          .trailing-icon {
            min-width: 44px;
            min-height: 44px;
          }
          
          .label.over {
            font-size: calc(var(--_global-font-size-xs) * 1.1);
            padding: 3px 8px;
          }
        }
        
        @media (pointer: fine) {
          .input-field:hover {
            transition-duration: calc(var(--_input-motion-duration-short) * 0.8);
          }
          
          .leading-icon:hover,
          .trailing-icon:hover {
            transform: translateY(-50%) scale(1.05);
          }
        }
        
        /* Enhanced hover device support */
        @media (hover: none) {
          .input-field:hover {
            border-color: inherit;
            background-color: inherit;
            transform: none;
          }
          
          .leading-icon:hover,
          .trailing-icon:hover {
            transform: translateY(-50%);
          }
        }
        
        /* Enhanced print styles */
        @media print {
          :host {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          .input-field {
            border: 1px solid #000 !important;
            background: transparent !important;
            box-shadow: none !important;
            font-size: 12pt;
            line-height: 1.4;
            color: #000 !important;
            -webkit-appearance: none;
            appearance: none;
          }
          
          .label {
            color: #000 !important;
            font-size: 10pt;
            font-weight: bold;
            position: static !important;
            transform: none !important;
            background: transparent !important;
            box-shadow: none !important;
          }
          
          .helper-text,
          .error-message {
            font-size: 9pt;
            color: #000 !important;
          }
          
          .supporting-text {
            margin-top: 2pt;
          }
          
          .prefix-slot,
          .suffix-slot {
            border: 1px solid #000 !important;
            background: transparent !important;
            color: #000 !important;
          }
          
          /* Hide interactive elements in print */
          .focus-ripple,
          .error-animation {
            display: none !important;
          }
        }

        /* Dark theme support via data-color-scheme attribute and media query */
        :host([data-color-scheme="dark"]),
        :host-context([data-color-scheme="dark"]) {
          --_input-background: var(--_global-color-scheme-dark-surface);
          --_input-color: var(--_global-color-scheme-dark-on-surface);
          --_input-border-color: var(--_global-color-scheme-dark-outline-variant);
          --_input-border-color-hover: var(--_global-color-scheme-dark-outline);
          --_input-border-color-focus: var(--_global-color-scheme-dark-primary);
          --_input-label-color: var(--_global-color-scheme-dark-on-surface-variant);
          --_input-label-color-focus: var(--_global-color-scheme-dark-primary);
          --_input-helper-text-color: var(--_global-color-scheme-dark-on-surface-variant);
        }

        @media (prefers-color-scheme: dark) {
          :host {
            --_input-background: var(--_global-color-scheme-dark-surface);
            --_input-color: var(--_global-color-scheme-dark-on-surface);
            --_input-border-color: var(--_global-color-scheme-dark-outline-variant);
            --_input-border-color-hover: var(--_global-color-scheme-dark-outline);
            --_input-border-color-focus: var(--_global-color-scheme-dark-primary);
            --_input-label-color: var(--_global-color-scheme-dark-on-surface-variant);
            --_input-label-color-focus: var(--_global-color-scheme-dark-primary);
            --_input-helper-text-color: var(--_global-color-scheme-dark-on-surface-variant);
          }
        }
      </style>

      <div class="input-container ${labelPosition === 'left' ? 'label-left' : labelPosition === 'over' ? 'label-over' : ''} variant-${this._schema.variant} size-${this._schema.size}">
        ${labelPosition !== 'over' ? `<label class="label ${this._schema.required ? 'required' : ''}" id="${this._schema.name}-input-label" for="${this._schema.name}-input">${label}</label>` : ''}
        
        <div class="input-wrapper">
          ${this._schema.leadingIcon ? `<span class="leading-icon" aria-hidden="false" role="img" aria-label="${this._schema.label} leading icon" tabindex="-1">${this._schema.leadingIcon.includes('<') ? this._schema.leadingIcon : `<my-icon icon="${this._schema.leadingIcon}" size="md" aria-hidden="false"></my-icon>`}</span>` : ''}
          
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
          
          ${this._schema.trailingIcon ? `<span class="trailing-icon" aria-hidden="false" role="img" aria-label="${this._schema.label} trailing icon" tabindex="-1">${this._schema.trailingIcon.includes('<') ? this._schema.trailingIcon : `<my-icon icon="${this._schema.trailingIcon}" size="md" aria-hidden="false"></my-icon>`}</span>` : ''}
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