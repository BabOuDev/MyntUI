# my-radio

**A production-ready radio button component built on BaseComponent architecture with Material Design 3 compliance and seamless group integration**

The my-radio component is a sophisticated, accessible radio button solution that provides complete Material Design 3 compliance with authentic radio button styling, ripple effects, and comprehensive group management. Built on MyntUI's BaseComponent foundation, it delivers consistent lifecycle management, memory leak prevention, and standardized accessibility features for seamless form integration and single-selection interfaces.

## BaseComponent Architecture Benefits

### Performance & Memory Management
- **Optimized Event Handling**: Efficient event listener management with automatic cleanup
- **Memory Leak Prevention**: Complete event listener cleanup prevents memory leaks
- **Standardized Rendering**: Built-in requestAnimationFrame-based render optimization
- **Group Coordination**: Intelligent coordination with my-radio-group for performance

### Accessibility & Standards
- **WCAG 2.1 AA Compliant**: Full accessibility support with comprehensive ARIA attributes
- **Screen Reader Integration**: Automatic state announcements and group context
- **Keyboard Navigation**: Complete keyboard support with arrow key navigation within groups
- **High Contrast Support**: Enhanced visibility for accessibility preferences
- **Reduced Motion Support**: Respects user motion preferences for animations

### Developer Experience
- **Consistent API**: Standardized patterns inherited from BaseComponent architecture
- **Comprehensive Logging**: Built-in debug mode with detailed component lifecycle tracking
- **Error Handling**: Graceful error handling with proper error states and recovery
- **Framework Agnostic**: Works seamlessly with React, Vue, Angular, Svelte, or vanilla JavaScript

## Features

### Material Design 3 Excellence
✅ **Authentic Material Design 3**
- **True MD3 Radio Styling**: Authentic radio button appearance with proper proportions
- **Interactive Ripple Effects**: Material Design 3 compliant ripple animations
- **State Layer System**: Proper hover, focus, and pressed state management
- **Color Role Integration**: Semantic color system following Material Design 3 guidelines
- **Motion Design**: Material motion timing functions with emphasized easing curves

✅ **Advanced State Management**
- `checked` - Selected state with animated radio indicator
- `unchecked` - Default unselected state with proper focus indicators
- `disabled` - Non-interactive state with proper visual indicators and ARIA support
- `error` - Error state for form validation feedback
- `loading` - Loading state for async operations

✅ **Comprehensive Size System**
- `sm` - Small (16px radio, 36px touch target)
- `md` - Medium (20px radio, 40px touch target, default)
- `lg` - Large (24px radio, 48px touch target)
- **Touch Accessible**: All sizes meet or exceed 44px minimum touch target requirements

✅ **Group Integration**
- **Seamless Group Coordination**: Works perfectly with my-radio-group component
- **Automatic Group Management**: Single selection enforcement across radio groups
- **Keyboard Navigation**: Arrow key navigation within radio groups
- **Form Integration**: Proper form submission with group name and selected value

### Enhanced Accessibility Features
✅ **Complete WCAG Compliance**
- **Proper ARIA Attributes**: Comprehensive role, state, and property support
- **Screen Reader Support**: Descriptive announcements for state changes and group context
- **Keyboard Navigation**: Full keyboard support with logical tab order and arrow key navigation
- **Focus Management**: Visible focus indicators with proper contrast ratios
- **Group Context**: Proper grouping semantics for screen reader navigation

✅ **Advanced Accessibility Support**
- **High Contrast Mode**: Enhanced visibility for `prefers-contrast: high`
- **Reduced Motion**: Respects `prefers-reduced-motion: reduce` preference
- **Screen Reader Announcements**: Automatic state change announcements with group context
- **Focus Visible**: Modern `:focus-visible` support with progressive enhancement
- **Touch Accessibility**: Proper touch targets exceeding accessibility guidelines

## Usage Examples

### Basic Radio Buttons with BaseComponent Benefits

```html
<!-- Individual radio buttons with automatic group coordination -->
<my-radio
  name="payment"
  value="credit-card"
  label="Credit Card"
  checked>
</my-radio>

<my-radio
  name="payment"
  value="paypal"
  label="PayPal">
</my-radio>

<my-radio
  name="payment"
  value="bank-transfer"
  label="Bank Transfer">
</my-radio>
```

### Radio Group with my-radio-group Integration

```html
<!-- Recommended: Use with my-radio-group for enhanced management -->
<my-radio-group
  name="subscription"
  value="premium"
  label="Choose your subscription plan"
  required>
  
  <my-radio
    value="basic"
    label="Basic Plan"
    aria-describedby="basic-desc">
  </my-radio>
  <div id="basic-desc" class="u-text-sm u-text-muted">
    $9/month - Essential features
  </div>
  
  <my-radio
    value="premium"
    label="Premium Plan"
    aria-describedby="premium-desc">
  </my-radio>
  <div id="premium-desc" class="u-text-sm u-text-muted">
    $19/month - All features included
  </div>
  
  <my-radio
    value="enterprise"
    label="Enterprise Plan"
    aria-describedby="enterprise-desc">
  </my-radio>
  <div id="enterprise-desc" class="u-text-sm u-text-muted">
    $49/month - Custom solutions
  </div>
</my-radio-group>
```

### Different Sizes and States

```html
<!-- Small radio buttons -->
<fieldset>
  <legend>Notification Frequency (Small)</legend>
  
  <my-radio
    name="frequency-sm"
    value="immediate"
    label="Immediate"
    size="sm">
  </my-radio>
  
  <my-radio
    name="frequency-sm"
    value="daily"
    label="Daily Digest"
    size="sm"
    checked>
  </my-radio>
  
  <my-radio
    name="frequency-sm"
    value="weekly"
    label="Weekly Summary"
    size="sm">
  </my-radio>
</fieldset>

<!-- Default medium radio buttons -->
<fieldset>
  <legend>Theme Preference</legend>
  
  <my-radio
    name="theme"
    value="light"
    label="Light Theme"
    checked>
  </my-radio>
  
  <my-radio
    name="theme"
    value="dark"
    label="Dark Theme">
  </my-radio>
  
  <my-radio
    name="theme"
    value="auto"
    label="System Theme">
  </my-radio>
</fieldset>

<!-- Large radio buttons -->
<fieldset>
  <legend>Priority Level (Large)</legend>
  
  <my-radio
    name="priority"
    value="low"
    label="Low Priority"
    size="lg">
  </my-radio>
  
  <my-radio
    name="priority"
    value="medium"
    label="Medium Priority"
    size="lg"
    checked>
  </my-radio>
  
  <my-radio
    name="priority"
    value="high"
    label="High Priority"
    size="lg">
  </my-radio>
</fieldset>

<!-- Disabled and error states -->
<fieldset>
  <legend>Account Type</legend>
  
  <my-radio
    name="account-type"
    value="personal"
    label="Personal Account"
    checked>
  </my-radio>
  
  <my-radio
    name="account-type"
    value="business"
    label="Business Account">
  </my-radio>
  
  <my-radio
    name="account-type"
    value="enterprise"
    label="Enterprise Account"
    disabled>
  </my-radio>
  
  <my-radio
    name="account-type"
    value="premium"
    label="Premium Account"
    error
    aria-describedby="account-error">
  </my-radio>
</fieldset>
<div id="account-error" class="u-text-sm u-text-error" role="alert">
  Premium accounts require additional verification
</div>
```

### Form Integration with Validation

```html
<!-- Complete form with radio button validation -->
<form id="survey-form">
  <div class="form-section">
    <my-input
      label="Full Name"
      name="fullName"
      required>
    </my-input>
    
    <my-input
      label="Email Address"
      name="email"
      type="email"
      required>
    </my-input>
  </div>
  
  <fieldset class="form-section">
    <legend class="u-text-lg u-font-medium">How did you hear about us?</legend>
    
    <my-radio
      name="referral-source"
      value="search-engine"
      label="Search Engine"
      required>
    </my-radio>
    
    <my-radio
      name="referral-source"
      value="social-media"
      label="Social Media">
    </my-radio>
    
    <my-radio
      name="referral-source"
      value="word-of-mouth"
      label="Word of Mouth">
    </my-radio>
    
    <my-radio
      name="referral-source"
      value="advertisement"
      label="Advertisement">
    </my-radio>
    
    <my-radio
      name="referral-source"
      value="other"
      label="Other">
    </my-radio>
  </fieldset>
  
  <fieldset class="form-section">
    <legend class="u-text-lg u-font-medium">Experience Level</legend>
    
    <my-radio
      name="experience"
      value="beginner"
      label="Beginner"
      required
      aria-describedby="beginner-desc">
    </my-radio>
    <div id="beginner-desc" class="u-text-sm u-text-muted">
      New to this field
    </div>
    
    <my-radio
      name="experience"
      value="intermediate"
      label="Intermediate"
      aria-describedby="intermediate-desc">
    </my-radio>
    <div id="intermediate-desc" class="u-text-sm u-text-muted">
      Some experience with similar tools
    </div>
    
    <my-radio
      name="experience"
      value="advanced"
      label="Advanced"
      aria-describedby="advanced-desc">
    </my-radio>
    <div id="advanced-desc" class="u-text-sm u-text-muted">
      Expert level with extensive experience
    </div>
  </fieldset>
  
  <my-button type="submit" variant="filled" size="lg">
    Submit Survey
  </my-button>
</form>
```

### Dynamic Radio Lists

```html
<!-- Dynamic radio list generated with JavaScript -->
<div id="dynamic-options-container">
  <h3>Select your preferred programming language:</h3>
  <div id="language-radios" role="radiogroup" aria-labelledby="language-heading"></div>
</div>

<script>
const languages = [
  { value: 'javascript', label: 'JavaScript', description: 'Versatile web development language' },
  { value: 'python', label: 'Python', description: 'Data science and web development' },
  { value: 'typescript', label: 'TypeScript', description: 'Type-safe JavaScript' },
  { value: 'rust', label: 'Rust', description: 'Systems programming language' },
  { value: 'go', label: 'Go', description: 'Concurrent programming language' },
  { value: 'swift', label: 'Swift', description: 'iOS and macOS development' }
];

const container = document.getElementById('language-radios');

languages.forEach((lang, index) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'radio-item';
  
  const radio = document.createElement('my-radio');
  radio.setAttribute('name', 'programming-language');
  radio.setAttribute('value', lang.value);
  radio.setAttribute('label', lang.label);
  radio.setAttribute('aria-describedby', `desc-${lang.value}`);
  
  // Set first option as default
  if (index === 0) {
    radio.setAttribute('checked', '');
  }
  
  const description = document.createElement('div');
  description.id = `desc-${lang.value}`;
  description.className = 'u-text-sm u-text-muted';
  description.textContent = lang.description;
  
  wrapper.appendChild(radio);
  wrapper.appendChild(description);
  container.appendChild(wrapper);
});
</script>
```

### Advanced Group Coordination

```html
<!-- Multiple radio groups with coordination -->
<form id="preferences-form">
  <my-radio-group
    name="color-scheme"
    label="Color Scheme"
    value="auto"
    required>
    
    <my-radio value="light" label="Light Mode"></my-radio>
    <my-radio value="dark" label="Dark Mode"></my-radio>
    <my-radio value="auto" label="System Default"></my-radio>
  </my-radio-group>
  
  <my-radio-group
    name="font-size"
    label="Font Size"
    value="medium">
    
    <my-radio value="small" label="Small" size="sm"></my-radio>
    <my-radio value="medium" label="Medium"></my-radio>
    <my-radio value="large" label="Large" size="lg"></my-radio>
  </my-radio-group>
  
  <my-radio-group
    name="layout"
    label="Layout Preference"
    value="comfortable">
    
    <my-radio 
      value="compact" 
      label="Compact"
      aria-describedby="compact-desc">
    </my-radio>
    <div id="compact-desc" class="u-text-sm u-text-muted">
      Dense layout with minimal spacing
    </div>
    
    <my-radio 
      value="comfortable" 
      label="Comfortable"
      aria-describedby="comfortable-desc">
    </my-radio>
    <div id="comfortable-desc" class="u-text-sm u-text-muted">
      Standard layout with balanced spacing
    </div>
    
    <my-radio 
      value="spacious" 
      label="Spacious"
      aria-describedby="spacious-desc">
    </my-radio>
    <div id="spacious-desc" class="u-text-sm u-text-muted">
      Generous spacing for enhanced readability
    </div>
  </my-radio-group>
</form>
```

## Properties & Attributes

### BaseComponent Properties (Inherited)
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `disabled` | boolean | `false` | Disables the radio button with proper ARIA states |
| `loading` | boolean | `false` | Shows loading state with accessibility announcements |
| `error` | boolean | `false` | Sets error state with enhanced visual indicators |
| `size` | string | `'md'` | Size variant: `'sm'`, `'md'`, `'lg'` |
| `variant` | string | `'default'` | Visual variant (future extensions) |
| `debug` | boolean | `false` | Enables comprehensive debug logging |

### Radio-Specific Properties
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `checked` | boolean | `false` | Radio button checked state with group coordination |
| `label` | string | `''` | Radio button label text with proper association |
| `name` | string | `''` | Form field name for grouping and submission |
| `value` | string | `''` | Value submitted when radio button is selected |
| `required` | boolean | `false` | Makes radio group required for form validation |

### ARIA Attributes (Auto-Generated)
| Attribute | Description |
|-----------|-------------|
| `role` | Set to "radio" for proper screen reader identification |
| `aria-checked` | Indicates checked state: "true" or "false" |
| `aria-labelledby` | Associates with label element for screen readers |
| `aria-describedby` | Associates with helper or error text |
| `aria-required` | Indicates required state for form validation |
| `aria-invalid` | Indicates validation state for screen readers |

## Events

### BaseComponent Events (Inherited)
| Event | Detail | Description |
|-------|--------|-------------|
| `error` | `{ error, context, component }` | Fired when component errors occur |
| `escape` | `{}` | Fired when Escape key is pressed (for focus management) |

### Radio-Specific Events
| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ checked, value, name, previousValue }` | Fired when radio button state changes |
| `select` | `{ value, name, previousValue }` | Fired when radio button is selected |
| `group-change` | `{ selectedValue, previousValue, name }` | Fired when any radio in group changes |

### Event Usage Examples

```javascript
// Listen for radio button selection
radio.addEventListener('change', (event) => {
  const { checked, value, name, previousValue } = event.detail;
  console.log('Radio changed:', { checked, value, name, previousValue });
  
  if (checked) {
    console.log(`${name} group now has value: ${value}`);
    if (previousValue) {
      console.log(`Previous value was: ${previousValue}`);
    }
  }
});

// Listen for group-wide changes
const radios = document.querySelectorAll('[name="preferences"]');
radios.forEach(radio => {
  radio.addEventListener('group-change', (event) => {
    const { selectedValue, previousValue, name } = event.detail;
    console.log(`Group ${name} changed from ${previousValue} to ${selectedValue}`);
  });
});

// Handle form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  
  console.log('Selected theme:', formData.get('theme'));
  console.log('Selected plan:', formData.get('subscription-plan'));
  console.log('Selected language:', formData.get('programming-language'));
});

// Custom validation
function validateRadioGroups() {
  const requiredGroups = ['payment-method', 'subscription-plan'];
  const errors = [];
  
  requiredGroups.forEach(groupName => {
    const selectedRadio = document.querySelector(`[name="${groupName}"]:checked`);
    if (!selectedRadio) {
      errors.push(`Please select a ${groupName.replace('-', ' ')}`);
    }
  });
  
  if (errors.length > 0) {
    console.error('Validation errors:', errors);
    return false;
  }
  
  return true;
}
```

## Methods

### BaseComponent Methods (Inherited)
| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `emit(eventName, detail, options)` | string, object, object | boolean | Emits custom events with proper bubbling |
| `announceToScreenReader(message, priority)` | string, string | void | Announces messages to screen readers |
| `requestUpdate()` | none | void | Triggers component re-render |
| `addClass(className)` | string | void | Adds CSS class with component tracking |
| `removeClass(className)` | string | void | Removes CSS class safely |
| `toggleClass(className, force)` | string, boolean | void | Toggles CSS class state |

### Radio-Specific Methods
| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `select()` | none | void | Selects this radio button (unchecks others in group) |
| `focus()` | none | void | Programmatically focuses the radio button |
| `blur()` | none | void | Programmatically blurs the radio button |
| `click()` | none | void | Programmatically clicks the radio button |
| `getGroupValue()` | none | string | Returns the currently selected value in the group |
| `getGroupRadios()` | none | NodeList | Returns all radio buttons in the same group |

### Method Usage Examples

```javascript
const radio = document.querySelector('my-radio[value="premium"]');

// Programmatic selection
radio.select();  // Select this radio (unselects others in group)

// Focus management
radio.focus();   // Focus the radio button
radio.blur();    // Remove focus

// Get group information
const currentValue = radio.getGroupValue();
console.log('Currently selected:', currentValue);

const allRadios = radio.getGroupRadios();
console.log('All radios in group:', allRadios.length);

// Programmatic interaction
radio.click();   // Simulate user click
```

## CSS Custom Properties

### BaseComponent Variables (Inherited)
```css
my-radio {
  /* Size and spacing inherited from BaseComponent */
  --_component-size: var(--_global-size-md);
  --_component-padding: var(--_global-spacing-sm);
  --_component-border-radius: var(--_global-border-radius-full);
}
```

### Radio-Specific Variables
```css
my-radio {
  /* Layout and sizing */
  --_radio-size: 20px;
  --_radio-touch-target: 40px;
  --_radio-border-width: 2px;
  --_radio-inner-circle-size: 10px;
  
  /* Colors and states */
  --_radio-background: transparent;
  --_radio-background-selected: transparent;
  --_radio-background-disabled: var(--_global-color-surface-variant);
  --_radio-border-color: var(--_global-color-outline);
  --_radio-border-color-selected: var(--_global-color-primary);
  --_radio-border-color-focus: var(--_global-color-primary);
  --_radio-border-color-error: var(--_global-color-error);
  --_radio-inner-circle-color: var(--_global-color-primary);
  --_radio-inner-circle-color-disabled: var(--_global-color-on-surface-variant);
  
  /* Label styling */
  --_radio-label-color: var(--_global-color-on-surface);
  --_radio-label-color-disabled: var(--_global-color-on-surface-variant);
  --_radio-label-font-family: var(--_global-font-family-sans);
  --_radio-label-font-size: var(--_global-font-size-body-lg);
  --_radio-label-font-weight: var(--_global-font-weight-body-lg);
  --_radio-label-line-height: var(--_global-line-height-body-lg);
  
  /* State layers and interactions */
  --_radio-state-layer-size: var(--_radio-touch-target);
  --_radio-state-layer-color-hover: var(--_global-color-on-surface);
  --_radio-state-layer-color-focus: var(--_global-color-primary);
  --_radio-state-layer-color-pressed: var(--_global-color-primary);
  --_radio-state-layer-opacity-hover: 0.08;
  --_radio-state-layer-opacity-focus: 0.12;
  --_radio-state-layer-opacity-pressed: 0.12;
  
  /* Ripple effects */
  --_radio-ripple-color: var(--_global-color-primary);
  --_radio-ripple-opacity: 0.12;
  --_radio-ripple-duration: var(--_global-motion-duration-medium2);
  
  /* Animations and transitions */
  --_radio-transition: all var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
  --_radio-inner-circle-transition: all var(--_global-motion-duration-short3) var(--_global-motion-easing-emphasized);
  --_radio-state-layer-transition: opacity var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
  
  /* Focus and elevation */
  --_radio-focus-ring-width: 3px;
  --_radio-focus-ring-color: var(--_global-color-primary);
  --_radio-focus-ring-offset: 2px;
}
```

### Size Variants

```css
/* Small size variant */
my-radio[size="sm"] {
  --_radio-size: 16px;
  --_radio-touch-target: 36px;
  --_radio-inner-circle-size: 8px;
  --_radio-label-font-size: var(--_global-font-size-body-md);
  --_radio-state-layer-size: 36px;
}

/* Large size variant */
my-radio[size="lg"] {
  --_radio-size: 24px;
  --_radio-touch-target: 48px;
  --_radio-inner-circle-size: 12px;
  --_radio-label-font-size: var(--_global-font-size-body-lg);
  --_radio-state-layer-size: 48px;
}
```

### Customization Examples

```css
/* Custom branded radio theme */
my-radio[variant="brand"] {
  --_radio-border-color-selected: #1976d2;
  --_radio-border-color-focus: #1976d2;
  --_radio-inner-circle-color: #1976d2;
  --_radio-state-layer-color-focus: #1976d2;
  --_radio-ripple-color: #1976d2;
  --_radio-focus-ring-color: #1976d2;
}

/* Premium radio with gradient inner circle */
my-radio[variant="premium"] {
  --_radio-inner-circle-color: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --_radio-border-color-selected: #667eea;
  --_radio-border-width: 3px;
}

/* Minimal radio variant */
my-radio[variant="minimal"] {
  --_radio-border-color: var(--_global-color-outline-variant);
  --_radio-state-layer-opacity-hover: 0.04;
  --_radio-state-layer-opacity-focus: 0.08;
  --_radio-ripple-opacity: 0.08;
}
```

## Accessibility Features

### WCAG 2.1 AA Compliance
- ✅ **Color Contrast**: Minimum 4.5:1 contrast ratio for all text and interactive elements
- ✅ **Keyboard Navigation**: Complete keyboard accessibility with arrow key group navigation
- ✅ **Screen Reader Support**: Comprehensive ARIA attributes and group context announcements
- ✅ **Focus Management**: Visible focus indicators with proper contrast and roving tabindex
- ✅ **Touch Targets**: Minimum 44px touch targets for mobile accessibility

### Enhanced Accessibility Features
- **High Contrast Mode**: Enhanced visibility for `prefers-contrast: high` with stronger borders
- **Reduced Motion**: Respects `prefers-reduced-motion: reduce` for animations and transitions
- **Screen Reader Announcements**: Automatic state change announcements with group context
- **Focus Visible**: Modern `:focus-visible` support with progressive enhancement fallbacks
- **Group Navigation**: Proper arrow key navigation within radio groups

### Accessibility Examples

```html
<!-- Fully accessible radio group with comprehensive ARIA -->
<fieldset>
  <legend class="u-text-lg u-font-medium">
    Payment Method
    <span class="u-text-sm u-text-error" aria-hidden="true">*</span>
  </legend>
  
  <my-radio
    name="payment"
    value="credit-card"
    label="Credit Card"
    required
    aria-describedby="credit-desc">
  </my-radio>
  <div id="credit-desc" class="u-text-sm u-text-muted">
    Visa, MasterCard, or American Express
  </div>
  
  <my-radio
    name="payment"
    value="debit-card"
    label="Debit Card"
    aria-describedby="debit-desc">
  </my-radio>
  <div id="debit-desc" class="u-text-sm u-text-muted">
    Direct debit from your bank account
  </div>
  
  <my-radio
    name="payment"
    value="paypal"
    label="PayPal"
    aria-describedby="paypal-desc">
  </my-radio>
  <div id="paypal-desc" class="u-text-sm u-text-muted">
    Pay securely with your PayPal account
  </div>
  
  <my-radio
    name="payment"
    value="apple-pay"
    label="Apple Pay"
    disabled
    aria-describedby="apple-desc">
  </my-radio>
  <div id="apple-desc" class="u-text-sm u-text-muted">
    Not available on this device
  </div>
</fieldset>

<!-- Error state with proper ARIA live region -->
<div id="payment-error" class="u-text-sm u-text-error" role="alert" aria-live="polite">
  <!-- Error messages appear here dynamically -->
</div>
```

## Form Integration

### Native Form Support
The my-radio component integrates seamlessly with native HTML forms:

```javascript
// Standard form submission
const form = document.querySelector('form');
const formData = new FormData(form);

// Get selected radio values
console.log('Theme:', formData.get('theme')); // Selected value or null
console.log('Plan:', formData.get('subscription-plan'));
console.log('Priority:', formData.get('priority-level'));

// Form validation
if (!formData.get('payment-method')) {
  console.error('Payment method is required');
}
```

### Framework Integration

#### React Integration
```jsx
import { useState, useEffect } from 'react';

function PreferencesForm() {
  const [preferences, setPreferences] = useState({
    theme: 'system',
    notifications: 'email',
    privacy: 'public'
  });
  
  const handleRadioChange = (event) => {
    const { name, value } = event.detail;
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  useEffect(() => {
    // Set up event listeners for radio changes
    const radios = document.querySelectorAll('my-radio');
    radios.forEach(radio => {
      radio.addEventListener('change', handleRadioChange);
    });
    
    return () => {
      radios.forEach(radio => {
        radio.removeEventListener('change', handleRadioChange);
      });
    };
  }, []);
  
  return (
    <form>
      <fieldset>
        <legend>Theme Preference</legend>
        {['light', 'dark', 'system'].map(theme => (
          <my-radio
            key={theme}
            name="theme"
            value={theme}
            label={theme.charAt(0).toUpperCase() + theme.slice(1)}
            checked={preferences.theme === theme}
          />
        ))}
      </fieldset>
      
      <fieldset>
        <legend>Notification Preference</legend>
        {[
          { value: 'email', label: 'Email Only' },
          { value: 'sms', label: 'SMS Only' },
          { value: 'both', label: 'Email and SMS' },
          { value: 'none', label: 'No Notifications' }
        ].map(option => (
          <my-radio
            key={option.value}
            name="notifications"
            value={option.value}
            label={option.label}
            checked={preferences.notifications === option.value}
          />
        ))}
      </fieldset>
    </form>
  );
}
```

#### Vue Integration
```vue
<template>
  <form @submit.prevent="handleSubmit">
    <fieldset v-for="group in radioGroups" :key="group.name">
      <legend>{{ group.label }}</legend>
      
      <my-radio
        v-for="option in group.options"
        :key="option.value"
        :name="group.name"
        :value="option.value"
        :label="option.label"
        :checked="formData[group.name] === option.value"
        @change="handleRadioChange"
      />
    </fieldset>
    
    <button type="submit">Save Preferences</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        difficulty: 'medium',
        category: 'technology',
        format: 'multiple-choice'
      },
      
      radioGroups: [
        {
          name: 'difficulty',
          label: 'Difficulty Level',
          options: [
            { value: 'easy', label: 'Easy' },
            { value: 'medium', label: 'Medium' },
            { value: 'hard', label: 'Hard' }
          ]
        },
        {
          name: 'category',
          label: 'Category',
          options: [
            { value: 'technology', label: 'Technology' },
            { value: 'science', label: 'Science' },
            { value: 'history', label: 'History' },
            { value: 'literature', label: 'Literature' }
          ]
        },
        {
          name: 'format',
          label: 'Question Format',
          options: [
            { value: 'multiple-choice', label: 'Multiple Choice' },
            { value: 'true-false', label: 'True/False' },
            { value: 'short-answer', label: 'Short Answer' }
          ]
        }
      ]
    };
  },
  
  methods: {
    handleRadioChange(event) {
      const { name, value } = event.detail;
      this.formData[name] = value;
    },
    
    handleSubmit() {
      console.log('Form submitted:', this.formData);
    }
  }
};
</script>
```

## Advanced Usage Patterns

### Dynamic Radio Group Management

```javascript
// Advanced radio group manager with validation
class RadioGroupManager {
  constructor(groupName, options = {}) {
    this.groupName = groupName;
    this.options = {
      required: false,
      onChange: null,
      validation: null,
      ...options
    };
    
    this.radios = document.querySelectorAll(`[name="${groupName}"]`);
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    this.radios.forEach(radio => {
      radio.addEventListener('change', (event) => {
        const { value, name } = event.detail;
        
        if (this.options.onChange) {
          this.options.onChange(value, name);
        }
        
        this.validate();
      });
    });
  }
  
  getValue() {
    const selectedRadio = document.querySelector(`[name="${this.groupName}"]:checked`);
    return selectedRadio ? selectedRadio.value : null;
  }
  
  setValue(value) {
    const targetRadio = document.querySelector(`[name="${this.groupName}"][value="${value}"]`);
    if (targetRadio) {
      targetRadio.select();
    }
  }
  
  validate() {
    const value = this.getValue();
    
    if (this.options.required && !value) {
      this.setError('This field is required');
      return false;
    }
    
    if (this.options.validation && value) {
      const validationResult = this.options.validation(value);
      if (validationResult !== true) {
        this.setError(validationResult);
        return false;
      }
    }
    
    this.clearError();
    return true;
  }
  
  setError(message) {
    this.radios.forEach(radio => {
      radio.error = true;
      radio.setAttribute('aria-describedby', `${this.groupName}-error`);
    });
    
    this.showErrorMessage(message);
  }
  
  clearError() {
    this.radios.forEach(radio => {
      radio.error = false;
      radio.removeAttribute('aria-describedby');
    });
    
    this.hideErrorMessage();
  }
  
  showErrorMessage(message) {
    let errorElement = document.getElementById(`${this.groupName}-error`);
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.id = `${this.groupName}-error`;
      errorElement.className = 'u-text-sm u-text-error';
      errorElement.setAttribute('role', 'alert');
      errorElement.setAttribute('aria-live', 'polite');
      
      // Insert after the radio group
      const lastRadio = this.radios[this.radios.length - 1];
      lastRadio.parentNode.insertBefore(errorElement, lastRadio.nextSibling);
    }
    
    errorElement.textContent = message;
  }
  
  hideErrorMessage() {
    const errorElement = document.getElementById(`${this.groupName}-error`);
    if (errorElement) {
      errorElement.remove();
    }
  }
  
  reset() {
    this.radios.forEach(radio => {
      radio.checked = false;
    });
    this.clearError();
  }
}

// Usage examples
const paymentManager = new RadioGroupManager('payment-method', {
  required: true,
  onChange: (value) => {
    console.log('Payment method changed:', value);
    updatePaymentForm(value);
  },
  validation: (value) => {
    if (value === 'credit-card' && !isCreditCardValid()) {
      return 'Please enter valid credit card information';
    }
    return true;
  }
});

const subscriptionManager = new RadioGroupManager('subscription-plan', {
  required: true,
  onChange: (value) => {
    updatePricingDisplay(value);
    showPlanFeatures(value);
  }
});
```

### Multi-Step Form with Radio Groups

```javascript
// Multi-step form with radio group validation
class MultiStepForm {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    this.steps = Array.from(this.form.querySelectorAll('.form-step'));
    this.currentStep = 0;
    this.radioManagers = new Map();
    
    this.initializeRadioGroups();
    this.setupNavigation();
  }
  
  initializeRadioGroups() {
    // Find all radio groups and create managers
    const radioGroups = new Set();
    this.form.querySelectorAll('my-radio').forEach(radio => {
      if (radio.name) {
        radioGroups.add(radio.name);
      }
    });
    
    radioGroups.forEach(groupName => {
      const isRequired = this.form.querySelector(`[name="${groupName}"][required]`);
      this.radioManagers.set(groupName, new RadioGroupManager(groupName, {
        required: !!isRequired
      }));
    });
  }
  
  setupNavigation() {
    const nextButtons = this.form.querySelectorAll('.btn-next');
    const prevButtons = this.form.querySelectorAll('.btn-prev');
    
    nextButtons.forEach(btn => {
      btn.addEventListener('click', () => this.nextStep());
    });
    
    prevButtons.forEach(btn => {
      btn.addEventListener('click', () => this.prevStep());
    });
  }
  
  nextStep() {
    if (this.validateCurrentStep()) {
      if (this.currentStep < this.steps.length - 1) {
        this.hideStep(this.currentStep);
        this.currentStep++;
        this.showStep(this.currentStep);
      } else {
        this.submitForm();
      }
    }
  }
  
  prevStep() {
    if (this.currentStep > 0) {
      this.hideStep(this.currentStep);
      this.currentStep--;
      this.showStep(this.currentStep);
    }
  }
  
  validateCurrentStep() {
    const currentStepElement = this.steps[this.currentStep];
    const radioGroupsInStep = new Set();
    
    currentStepElement.querySelectorAll('my-radio').forEach(radio => {
      if (radio.name) {
        radioGroupsInStep.add(radio.name);
      }
    });
    
    let allValid = true;
    radioGroupsInStep.forEach(groupName => {
      const manager = this.radioManagers.get(groupName);
      if (manager && !manager.validate()) {
        allValid = false;
      }
    });
    
    return allValid;
  }
  
  showStep(stepIndex) {
    this.steps[stepIndex].style.display = 'block';
    this.steps[stepIndex].setAttribute('aria-hidden', 'false');
    
    // Focus first radio in the step
    const firstRadio = this.steps[stepIndex].querySelector('my-radio');
    if (firstRadio) {
      firstRadio.focus();
    }
  }
  
  hideStep(stepIndex) {
    this.steps[stepIndex].style.display = 'none';
    this.steps[stepIndex].setAttribute('aria-hidden', 'true');
  }
  
  submitForm() {
    if (this.validateAllSteps()) {
      // Collect all form data
      const formData = this.getFormData();
      console.log('Form submitted:', formData);
      
      // Submit to server or handle as needed
      this.handleFormSubmission(formData);
    }
  }
  
  validateAllSteps() {
    let allValid = true;
    this.radioManagers.forEach(manager => {
      if (!manager.validate()) {
        allValid = false;
      }
    });
    return allValid;
  }
  
  getFormData() {
    const data = {};
    this.radioManagers.forEach((manager, groupName) => {
      data[groupName] = manager.getValue();
    });
    return data;
  }
  
  handleFormSubmission(data) {
    // Implementation depends on your needs
    console.log('Submitting form data:', data);
  }
}

// Initialize multi-step form
const multiStepForm = new MultiStepForm('#survey-form');
```

## Performance Considerations

### Memory Management
Built on BaseComponent architecture for optimal performance:
- **Event Cleanup**: Automatic event listener cleanup prevents memory leaks
- **Efficient Rendering**: RequestAnimationFrame-based render optimization
- **Group Coordination**: Efficient group management with minimal DOM queries

### Large Form Optimization
For forms with many radio groups, consider:
- **Lazy Initialization**: Initialize radio managers only when needed
- **Virtual Scrolling**: Use virtual scrolling for very long radio lists
- **Progressive Enhancement**: Load radio groups progressively as user scrolls
- **Event Delegation**: Use event delegation for dynamic radio groups

## Browser Support

**Minimum Requirements:**
- Custom Elements v1 support
- Shadow DOM v1 support
- CSS Custom Properties support
- ES2018+ JavaScript features

**Fully Tested Browsers:**
- Chrome/Edge 80+
- Firefox 75+
- Safari 13+
- iOS Safari 13+
- Chrome Android 80+

## Related Components

- **[my-radio-group](../my-radio-group/README.md)**: Radio group container with enhanced management
- **[my-checkbox](../my-checkbox/README.md)**: Checkbox input for multiple selections
- **[my-input](../my-input/README.md)**: Text input component with form integration
- **[my-toggle](../my-toggle/README.md)**: Switch-style boolean input
- **[my-button](../my-button/README.md)**: Form submission and action buttons

---

**Built with BaseComponent architecture for consistent performance, accessibility, and developer experience across the MyntUI ecosystem.**