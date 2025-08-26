/**
 * MyntUI Comprehensive Validation System
 * A unified validation system for all form components
 * Provides consistent validation messages, patterns, and behaviors
 */

import { globalConfig } from '../config/global-config.js';

/**
 * Validation rule definitions with consistent error messages
 */
export const ValidationRules = {
  // Built-in validation rules
  required: {
    test: (value) => value !== null && value !== undefined && String(value).trim() !== '',
    message: (fieldName) => `${fieldName || 'Field'} is required`
  },

  email: {
    test: (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: () => 'Please enter a valid email address'
  },

  url: {
    test: (value) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    message: () => 'Please enter a valid URL'
  },

  phone: {
    test: (value) => !value || /^[\+]?[\d\s\-\(\)]{10,}$/.test(value),
    message: () => 'Please enter a valid phone number'
  },

  number: {
    test: (value) => !value || !isNaN(Number(value)),
    message: () => 'Please enter a valid number'
  },

  integer: {
    test: (value) => !value || (Number.isInteger(Number(value)) && !value.includes('.')),
    message: () => 'Please enter a whole number'
  },

  date: {
    test: (value) => {
      if (!value) return true;
      const date = new Date(value);
      return !isNaN(date.getTime());
    },
    message: () => 'Please enter a valid date'
  },

  time: {
    test: (value) => !value || /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value),
    message: () => 'Please enter a valid time (HH:MM)'
  },

  minLength: {
    test: (value, min) => !value || value.length >= parseInt(min),
    message: (fieldName, min) => `Must be at least ${min} characters`
  },

  maxLength: {
    test: (value, max) => !value || value.length <= parseInt(max),
    message: (fieldName, max) => `Must be no more than ${max} characters`
  },

  min: {
    test: (value, min) => !value || Number(value) >= Number(min),
    message: (fieldName, min) => `Value must be at least ${min}`
  },

  max: {
    test: (value, max) => !value || Number(value) <= Number(max),
    message: (fieldName, max) => `Value must be no more than ${max}`
  },

  pattern: {
    test: (value, pattern) => !value || new RegExp(pattern).test(value),
    message: () => 'Please enter a valid format'
  },

  // Enhanced validation rules for specialized inputs
  countryCode: {
    test: (value) => !value || /^[A-Z]{2}$/.test(value),
    message: () => 'Please select a valid country'
  },

  postalCode: {
    test: (value) => !value || /^[A-Za-z0-9\s\-]{3,10}$/.test(value),
    message: () => 'Please enter a valid postal code'
  },

  currency: {
    test: (value, options = {}) => {
      if (!value) return true;
      const num = parseFloat(value);
      if (isNaN(num)) return false;
      if (options.allowNegative === false && num < 0) return false;
      return true;
    },
    message: (fieldName, options) => options?.allowNegative === false ? 
      'Please enter a positive amount' : 'Please enter a valid amount'
  },

  creditCard: {
    test: (value) => {
      if (!value) return true;
      // Basic Luhn algorithm check
      const digits = value.replace(/\D/g, '');
      if (digits.length < 13 || digits.length > 19) return false;
      
      let sum = 0;
      for (let i = 0; i < digits.length; i++) {
        let digit = parseInt(digits[i]);
        if ((digits.length - i) % 2 === 0) {
          digit *= 2;
          if (digit > 9) digit -= 9;
        }
        sum += digit;
      }
      return sum % 10 === 0;
    },
    message: () => 'Please enter a valid credit card number'
  },

  password: {
    test: (value, options = {}) => {
      if (!value) return true;
      const minLength = options.minLength || 8;
      if (value.length < minLength) return false;
      
      const requirements = options.requirements || ['lowercase', 'uppercase', 'number'];
      const checks = {
        lowercase: /[a-z]/.test(value),
        uppercase: /[A-Z]/.test(value),
        number: /\d/.test(value),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(value)
      };
      
      return requirements.every(req => checks[req]);
    },
    message: (fieldName, options) => {
      const requirements = options?.requirements || ['lowercase', 'uppercase', 'number'];
      const reqText = requirements.map(req => {
        switch (req) {
          case 'lowercase': return 'lowercase letter';
          case 'uppercase': return 'uppercase letter';
          case 'number': return 'number';
          case 'special': return 'special character';
          default: return req;
        }
      }).join(', ');
      return `Password must contain ${reqText}`;
    }
  },

  dateOfBirth: {
    test: (value) => {
      if (!value) return true;
      const date = new Date(value);
      if (isNaN(date.getTime())) return false;
      return date <= new Date(); // Cannot be in the future
    },
    message: () => 'Birth date cannot be in the future'
  }
};

/**
 * Validation engine class
 */
export class ValidationEngine {
  constructor() {
    this.customRules = new Map();
  }

  /**
   * Add a custom validation rule
   */
  addRule(name, rule) {
    this.customRules.set(name, rule);
  }

  /**
   * Get a validation rule by name
   */
  getRule(name) {
    return this.customRules.get(name) || ValidationRules[name];
  }

  /**
   * Validate a single value against multiple rules
   */
  validate(value, rules, fieldName = 'Field') {
    const errors = [];

    for (const [ruleName, ruleOptions] of Object.entries(rules)) {
      const rule = this.getRule(ruleName);
      
      if (!rule) {
        console.warn(`Unknown validation rule: ${ruleName}`);
        continue;
      }

      const isValid = typeof ruleOptions === 'boolean' && ruleOptions ? 
        rule.test(value) : 
        rule.test(value, ruleOptions);

      if (!isValid) {
        const message = typeof ruleOptions === 'boolean' && ruleOptions ?
          rule.message(fieldName) :
          rule.message(fieldName, ruleOptions);
        
        errors.push({
          rule: ruleName,
          message,
          value
        });
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate an input schema
   */
  validateSchema(value, schema, fieldName) {
    const rules = {};

    // Extract validation rules from schema
    if (schema.required) rules.required = true;
    if (schema.minLength) rules.minLength = schema.minLength;
    if (schema.maxLength) rules.maxLength = schema.maxLength;
    if (schema.min !== null && schema.min !== undefined) rules.min = schema.min;
    if (schema.max !== null && schema.max !== undefined) rules.max = schema.max;
    if (schema.pattern) rules.pattern = schema.pattern;

    // Type-specific validation
    switch (schema.type) {
      case 'email':
        rules.email = true;
        break;
      case 'url':
        rules.url = true;
        break;
      case 'tel':
      case 'phone':
        rules.phone = true;
        break;
      case 'number':
        rules.number = true;
        break;
      case 'integer':
        rules.integer = true;
        break;
      case 'date':
      case 'datetime-local':
        rules.date = true;
        break;
      case 'time':
        rules.time = true;
        break;
      case 'date-of-birth':
        rules.dateOfBirth = true;
        break;
      case 'country':
        rules.countryCode = true;
        break;
      case 'postal-code':
        rules.postalCode = true;
        break;
      case 'currency':
        const typeConfig = globalConfig.get(`components.input.typeConfigs.currency`, {});
        rules.currency = { allowNegative: typeConfig.allowNegative };
        break;
      case 'credit-card':
        rules.creditCard = true;
        break;
      case 'password':
        const passwordConfig = globalConfig.get(`components.input.typeConfigs.password`, {});
        rules.password = {
          minLength: passwordConfig.minLength || 8,
          requirements: passwordConfig.requirements || ['lowercase', 'uppercase', 'number']
        };
        break;
    }

    // Custom validation function
    if (schema.validation && typeof schema.validation === 'function') {
      try {
        if (!schema.validation(value)) {
          return {
            isValid: false,
            errors: [{
              rule: 'custom',
              message: 'Please enter a valid value',
              value
            }]
          };
        }
      } catch (error) {
        console.warn('Custom validation function error:', error);
        return {
          isValid: false,
          errors: [{
            rule: 'custom',
            message: 'Validation error occurred',
            value
          }]
        };
      }
    }

    return this.validate(value, rules, fieldName || schema.label);
  }

  /**
   * Get validation message classes for TailwindCSS
   */
  getValidationClasses(hasErrors, touched = false) {
    const config = globalConfig.get('theme.tailwind.states', {});
    
    if (hasErrors && touched) {
      return {
        wrapper: config.error || 'border-error focus:border-error focus:ring-error/20',
        message: 'text-error text-label-small mt-xs flex items-center gap-xs',
        icon: 'text-error'
      };
    }

    return {
      wrapper: '',
      message: 'text-outline text-label-small mt-xs',
      icon: 'text-outline'
    };
  }

  /**
   * Format validation errors for display
   */
  formatErrors(errors) {
    return errors.map(error => error.message);
  }

  /**
   * Get the first error message
   */
  getFirstError(errors) {
    return errors.length > 0 ? errors[0].message : '';
  }
}

/**
 * Global validation engine instance
 */
export const validationEngine = new ValidationEngine();

/**
 * Validation mixin for components
 */
export const ValidationMixin = {
  // Validation state
  _validationErrors: [],
  _touched: false,
  _validationTimer: null,

  /**
   * Initialize validation
   */
  initializeValidation() {
    this._validationErrors = [];
    this._touched = false;
    this._validationTimer = null;
  },

  /**
   * Validate the component's value
   */
  validateComponent(value, schema, fieldName) {
    const result = validationEngine.validateSchema(value, schema, fieldName);
    this._validationErrors = result.errors;
    return result;
  },

  /**
   * Debounced validation
   */
  debouncedValidation(value, schema, fieldName, delay = 300) {
    clearTimeout(this._validationTimer);
    this._validationTimer = setTimeout(() => {
      this.validateComponent(value, schema, fieldName);
      this.updateValidationUI();
    }, delay);
  },

  /**
   * Mark component as touched
   */
  markAsTouched() {
    this._touched = true;
  },

  /**
   * Check if component has validation errors
   */
  hasValidationErrors() {
    return this._validationErrors.length > 0;
  },

  /**
   * Get validation errors
   */
  getValidationErrors() {
    return [...this._validationErrors];
  },

  /**
   * Get first validation error message
   */
  getFirstValidationError() {
    return validationEngine.getFirstError(this._validationErrors);
  },

  /**
   * Get validation classes
   */
  getValidationClasses() {
    return validationEngine.getValidationClasses(this.hasValidationErrors(), this._touched);
  },

  /**
   * Update validation UI (to be implemented by components)
   */
  updateValidationUI() {
    // Override in components
    console.warn('updateValidationUI not implemented in component');
  },

  /**
   * Clean up validation
   */
  cleanupValidation() {
    if (this._validationTimer) {
      clearTimeout(this._validationTimer);
      this._validationTimer = null;
    }
  }
};

/**
 * Input type configurations with validation
 */
export const InputTypeConfigs = {
  text: { icon: 'text_format' },
  email: { icon: 'mail', validation: { email: true } },
  password: { icon: 'lock', validation: { password: true } },
  url: { icon: 'link', validation: { url: true } },
  tel: { icon: 'phone', validation: { phone: true } },
  number: { icon: 'tag', validation: { number: true } },
  integer: { icon: 'tag', validation: { integer: true } },
  date: { icon: 'event', validation: { date: true } },
  time: { icon: 'access_time', validation: { time: true } },
  'datetime-local': { icon: 'schedule', validation: { date: true } },
  'date-of-birth': { icon: 'cake', validation: { dateOfBirth: true } },
  country: { icon: 'public', validation: { countryCode: true } },
  'postal-code': { icon: 'markunread_mailbox', validation: { postalCode: true } },
  currency: { icon: 'attach_money', validation: { currency: true } },
  'credit-card': { icon: 'credit_card', validation: { creditCard: true } }
};

export default {
  ValidationRules,
  ValidationEngine,
  validationEngine,
  ValidationMixin,
  InputTypeConfigs
};