# MyntUI Validation System Documentation

## Overview

The MyntUI validation system provides comprehensive, real-time validation for all input components with enhanced error messaging, type-specific validation rules, and seamless integration with the TailwindCSS styling system.

## Core Features

### ✅ Real-Time Validation
- **Debounced input checking** (300ms default, configurable)
- **Immediate feedback** on focus/blur events
- **Progressive validation** - only shows errors after user interaction
- **Live character counting** for inputs with length limits

### ✅ Type-Specific Validation
- **Built-in validators** for all HTML5 input types
- **Enhanced email validation** with RFC-compliant patterns
- **Phone number validation** supporting international formats
- **URL validation** with proper protocol checking
- **Date validation** with locale-aware formatting

### ✅ Custom Validation Support
- **JavaScript function validation** via schema
- **Regular expression patterns** for complex validation
- **Async validation support** for server-side checks
- **Conditional validation** based on other field values

## Validation Rules

### Basic Input Types

#### Text Input
```javascript
{
  type: "text",
  label: "Name",
  name: "name",
  required: true,
  minLength: 2,
  maxLength: 50,
  pattern: "^[A-Za-z\\s]+$", // Letters and spaces only
  validation: "function(value) { return value.trim().length >= 2; }"
}
```

#### Email Input
```javascript
{
  type: "email",
  label: "Email Address",
  name: "email",
  required: true,
  validation: "function(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }"
}
```

#### Password Input
```javascript
{
  type: "password",
  label: "Password",
  name: "password",
  required: true,
  minLength: 8,
  maxLength: 128,
  validation: `function(value) {
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /\\d/.test(value);
    const hasSpecial = /[!@#$%^&*]/.test(value);
    return hasUpper && hasLower && hasNumber && hasSpecial;
  }`
}
```

### Number Inputs

#### Number Input
```javascript
{
  type: "number",
  label: "Age",
  name: "age",
  required: true,
  min: 0,
  max: 120,
  step: 1,
  validation: "function(value) { return Number.isInteger(parseFloat(value)); }"
}
```

#### Currency Input
```javascript
{
  type: "currency",
  label: "Price",
  name: "price",
  required: true,
  min: 0.01,
  max: 999999.99,
  step: 0.01,
  validation: "function(value) { return parseFloat(value) > 0; }"
}
```

### Date/Time Inputs

#### Date Input
```javascript
{
  type: "date",
  label: "Event Date",
  name: "eventDate",
  required: true,
  min: "2024-01-01",
  max: "2025-12-31",
  validation: `function(value) {
    const date = new Date(value);
    const today = new Date();
    return date >= today;
  }`
}
```

#### Date of Birth
```javascript
{
  type: "date-of-birth",
  label: "Date of Birth",
  name: "dateOfBirth",
  required: true,
  max: new Date().toISOString().split('T')[0], // Today
  validation: `function(value) {
    const birthDate = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 13 && age <= 120; // Age restrictions
  }`
}
```

### Selection Inputs

#### Select Input
```javascript
{
  type: "select",
  label: "Country",
  name: "country",
  required: true,
  options: [
    { label: "United States", value: "US" },
    { label: "Canada", value: "CA" },
    { label: "United Kingdom", value: "UK" }
  ],
  validation: "function(value) { return ['US', 'CA', 'UK'].includes(value); }"
}
```

#### Multiple Select
```javascript
{
  type: "select",
  label: "Interests",
  name: "interests",
  multiple: true,
  required: true,
  options: [
    { label: "Technology", value: "tech" },
    { label: "Sports", value: "sports" },
    { label: "Music", value: "music" }
  ],
  validation: `function(value) {
    return Array.isArray(value) && value.length >= 1 && value.length <= 5;
  }`
}
```

## Error Messages

### Default Error Messages
The validation system provides contextual error messages based on validation type:

```javascript
const defaultErrorMessages = {
  required: (label) => `${label} is required`,
  minLength: (label, min) => `${label} must be at least ${min} characters`,
  maxLength: (label, max) => `${label} must be no more than ${max} characters`,
  min: (label, min) => `${label} must be at least ${min}`,
  max: (label, max) => `${label} must be no more than ${max}`,
  pattern: (label) => `Please enter a valid ${label.toLowerCase()}`,
  email: () => 'Please enter a valid email address',
  url: () => 'Please enter a valid URL',
  tel: () => 'Please enter a valid phone number',
  number: () => 'Please enter a valid number',
  date: () => 'Please enter a valid date',
  custom: () => 'Please enter a valid value'
};
```

### Custom Error Messages
```javascript
{
  type: "password",
  label: "Password",
  name: "password",
  required: true,
  validation: `function(value) {
    if (value.length < 8) {
      this.setCustomError('Password must be at least 8 characters long');
      return false;
    }
    if (!/[A-Z]/.test(value)) {
      this.setCustomError('Password must contain at least one uppercase letter');
      return false;
    }
    if (!/[a-z]/.test(value)) {
      this.setCustomError('Password must contain at least one lowercase letter');  
      return false;
    }
    if (!/\\d/.test(value)) {
      this.setCustomError('Password must contain at least one number');
      return false;
    }
    if (!/[!@#$%^&*]/.test(value)) {
      this.setCustomError('Password must contain at least one special character');
      return false;
    }
    return true;
  }`
}
```

## Configuration

### Global Validation Settings
```javascript
// In global-config.js
components: {
  input: {
    debounceDelay: 300, // Validation delay in ms
    characterCountThreshold: 80, // Show count when approaching limit
    showValidationOnFocus: false, // Show validation immediately on focus
    showValidationOnBlur: true, // Show validation on blur
    clearErrorsOnFocus: true, // Clear errors when user starts typing
    validateOnChange: true, // Validate on every change
    validateOnSubmit: true // Validate when form is submitted
  }
}
```

### Per-Component Configuration
```javascript
{
  type: "email",
  label: "Email",
  name: "email",
  required: true,
  debounceDelay: 500, // Override global setting
  showValidationOnFocus: true, // Override global setting
  customErrorMessages: {
    required: "We need your email address to contact you",
    pattern: "Please enter a valid email address like name@example.com"
  }
}
```

## Validation States

### Visual States
The validation system provides visual feedback through TailwindCSS classes:

```css
/* Success state */
.validation-success {
  @apply border-success text-success;
}

/* Warning state */  
.validation-warning {
  @apply border-warning text-warning;
}

/* Error state */
.validation-error {
  @apply border-error text-error;
}

/* Focus states with validation */
.input-wrapper.has-error {
  @apply border-error focus-within:border-error focus-within:ring-error;
}
```

### Accessibility States
- **`aria-invalid`** - Set to "true" when validation fails
- **`aria-describedby`** - Links to error message for screen readers  
- **`role="alert"`** - Error messages announced to screen readers
- **Live regions** - Real-time validation updates announced

## Advanced Validation

### Async Validation
```javascript
{
  type: "text",
  label: "Username",
  name: "username",
  required: true,
  validation: `async function(value) {
    if (value.length < 3) return false;
    
    try {
      const response = await fetch('/api/check-username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: value })
      });
      const result = await response.json();
      
      if (!result.available) {
        this.setCustomError('Username is already taken');
        return false;
      }
      return true;
    } catch (error) {
      this.setCustomError('Unable to check username availability');
      return false;
    }
  }`
}
```

### Cross-Field Validation
```javascript
{
  type: "password",
  label: "Confirm Password", 
  name: "confirmPassword",
  required: true,
  validation: `function(value) {
    const password = document.querySelector('my-input[name="password"]')?.value;
    if (value !== password) {
      this.setCustomError('Passwords do not match');
      return false;
    }
    return true;
  }`
}
```

### Conditional Validation
```javascript
{
  type: "text",
  label: "Company Name",
  name: "companyName", 
  validation: `function(value) {
    const accountType = document.querySelector('my-input[name="accountType"]')?.value;
    
    // Required only for business accounts
    if (accountType === 'business') {
      if (!value || value.trim().length === 0) {
        this.setCustomError('Company name is required for business accounts');
        return false;
      }
    }
    return true;
  }`
}
```

## Form Integration

### Form Validation
```javascript
// Validate entire form
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll('my-input');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.validate()) {
      isValid = false;
    }
  });
  
  return isValid;
}

// Usage
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  if (!validateForm(form)) {
    e.preventDefault();
    // Focus first invalid input
    const firstInvalid = form.querySelector('my-input[aria-invalid="true"]');
    if (firstInvalid) {
      firstInvalid.focus();
    }
  }
});
```

### Validation Events
```javascript
// Listen for validation events
input.addEventListener('validation', (e) => {
  const { valid, errors, value } = e.detail;
  
  if (!valid) {
    console.log('Validation failed:', errors);
    // Show custom error handling
  }
});

// Listen for input changes with validation
input.addEventListener('input', (e) => {
  const { valid, errors, value } = e.detail;
  
  // Real-time validation feedback
  if (valid) {
    showSuccessIndicator();
  } else if (errors.length > 0) {
    showErrorIndicator(errors[0]);
  }
});
```

## Best Practices

### 1. Progressive Enhancement
- Start with basic HTML5 validation
- Add custom validation for enhanced UX
- Provide fallbacks for unsupported features

### 2. User Experience
- Show validation after user interaction, not immediately
- Use debouncing to avoid excessive validation calls
- Provide clear, actionable error messages
- Clear errors when user starts correcting them

### 3. Performance
- Debounce validation calls (300ms default)
- Use async validation sparingly
- Cache validation results when possible
- Avoid blocking the UI during validation

### 4. Accessibility
- Always provide proper ARIA attributes
- Ensure error messages are announced to screen readers
- Maintain focus management during validation
- Support keyboard navigation for all validation states

### 5. Internationalization
- Use locale-aware validation for dates, numbers
- Provide translatable error messages
- Support RTL languages in validation UI
- Consider cultural differences in validation rules

## Testing Validation

### Unit Testing
```javascript
// Test validation logic
describe('Email Validation', () => {
  test('valid email passes validation', () => {
    const input = new MyInput();
    input.schema = { type: 'email', required: true };
    input.value = 'test@example.com';
    
    expect(input.validate()).toBe(true);
    expect(input.errors).toHaveLength(0);
  });
  
  test('invalid email fails validation', () => {
    const input = new MyInput();
    input.schema = { type: 'email', required: true };
    input.value = 'invalid-email';
    
    expect(input.validate()).toBe(false);
    expect(input.errors).toContain('Please enter a valid email address');
  });
});
```

### Integration Testing
```javascript
// Test form validation
describe('Form Validation Integration', () => {
  test('form prevents submission with invalid inputs', async () => {
    const form = await fixture(html`
      <form>
        <my-input type="email" name="email" required></my-input>
        <my-input type="password" name="password" required minlength="8"></my-input>
        <button type="submit">Submit</button>
      </form>
    `);
    
    const submitButton = form.querySelector('button');
    const emailInput = form.querySelector('my-input[name="email"]');
    const passwordInput = form.querySelector('my-input[name="password"]');
    
    emailInput.value = 'invalid';
    passwordInput.value = 'short';
    
    submitButton.click();
    
    expect(emailInput.getAttribute('aria-invalid')).toBe('true');
    expect(passwordInput.getAttribute('aria-invalid')).toBe('true');
  });
});
```

The MyntUI validation system provides a robust, accessible, and user-friendly approach to form validation that integrates seamlessly with the TailwindCSS styling system and Material Design 3 principles.