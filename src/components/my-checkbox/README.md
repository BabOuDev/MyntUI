# my-checkbox

**A production-ready checkbox component built on BaseComponent architecture with Material Design 3 compliance and advanced accessibility**

The my-checkbox component is a sophisticated, accessible checkbox solution that provides complete Material Design 3 compliance with custom CSS styling, interactive state layers, and comprehensive form integration. Built on MyntUI's BaseComponent foundation, it delivers consistent lifecycle management, memory leak prevention, and standardized accessibility features for seamless form and application integration.

## BaseComponent Architecture Benefits

### Performance & Memory Management
- **Optimized Event Handling**: Efficient event listener management with automatic cleanup
- **Memory Leak Prevention**: Complete event listener cleanup prevents memory leaks
- **Standardized Rendering**: Built-in requestAnimationFrame-based render optimization
- **Intersection Observers**: Viewport-based performance optimizations for large forms

### Accessibility & Standards
- **WCAG 2.1 AA Compliant**: Full accessibility support with comprehensive ARIA attributes
- **Screen Reader Integration**: Automatic state announcements and role management
- **Keyboard Navigation**: Complete keyboard support with space bar and tab navigation
- **High Contrast Support**: Enhanced visibility for accessibility preferences
- **Reduced Motion Support**: Respects user motion preferences for animations and transitions

### Developer Experience
- **Consistent API**: Standardized patterns inherited from BaseComponent architecture
- **Comprehensive Logging**: Built-in debug mode with detailed component lifecycle tracking
- **Error Handling**: Graceful error handling with proper error states and recovery
- **Framework Agnostic**: Works seamlessly with React, Vue, Angular, Svelte, or vanilla JavaScript

## Features

### Material Design 3 Excellence
✅ **Authentic Material Design 3**
- **Custom CSS Implementation**: No external icon dependencies with pure CSS checkmarks
- **State Layer System**: Proper hover, focus, and pressed state management
- **Color Role Integration**: Semantic color system following Material Design 3 guidelines
- **Motion Design**: Material motion timing functions with emphasized easing curves
- **Surface Variants**: Proper elevation and surface container integration

✅ **Advanced State Management**
- `checked` - Selected state with animated checkmark
- `unchecked` - Default unselected state with proper focus indicators
- `indeterminate` - Mixed/partial selection state for parent-child relationships
- `disabled` - Non-interactive state with proper visual indicators and ARIA support
- `error` - Error state for form validation feedback
- `loading` - Loading state for async operations

✅ **Comprehensive Size System**
- `sm` - Small (16px checkbox, 36px touch target)
- `md` - Medium (18px checkbox, 40px touch target, default)
- `lg` - Large (24px checkbox, 48px touch target)
- **Touch Accessible**: All sizes meet 44px minimum touch target requirements

✅ **Interactive Feedback System**
- **Ripple Effects**: Material Design 3 compliant ripple animations on interaction
- **State Layers**: Visual feedback for hover, focus, and pressed states
- **Smooth Animations**: Checkmark animations with proper timing and easing
- **Custom Checkmarks**: Pure CSS checkmarks with scale and opacity transitions

### Enhanced Accessibility Features
✅ **Complete WCAG Compliance**
- **Proper ARIA Attributes**: Comprehensive role, state, and property support
- **Screen Reader Support**: Descriptive announcements for state changes
- **Keyboard Navigation**: Full keyboard support with logical tab order
- **Focus Management**: Visible focus indicators with proper contrast ratios
- **Form Integration**: Seamless integration with form validation and submission

✅ **Advanced Accessibility Support**
- **High Contrast Mode**: Enhanced visibility for `prefers-contrast: high`
- **Reduced Motion**: Respects `prefers-reduced-motion: reduce` preference
- **Screen Reader Announcements**: Automatic state change announcements
- **Focus Visible**: Modern `:focus-visible` support with progressive enhancement
- **Touch Accessibility**: Proper touch targets exceeding accessibility guidelines

## Usage Examples

### Basic Checkbox with BaseComponent Benefits

```html
<!-- Simple checkbox with automatic state management -->
<my-checkbox
  label="I agree to the terms and conditions"
  name="terms"
  value="agreed"
  required>
</my-checkbox>
```

### Checkbox Group for Multiple Selections

```html
<!-- Checkbox group with proper form integration -->
<fieldset>
  <legend>Select your interests:</legend>
  
  <my-checkbox
    label="Web Development"
    name="interests"
    value="web-dev">
  </my-checkbox>
  
  <my-checkbox
    label="Mobile Development"
    name="interests"
    value="mobile-dev">
  </my-checkbox>
  
  <my-checkbox
    label="Data Science"
    name="interests"
    value="data-science">
  </my-checkbox>
  
  <my-checkbox
    label="Machine Learning"
    name="interests"
    value="ml">
  </my-checkbox>
</fieldset>
```

### Indeterminate Checkbox for Parent-Child Relationships

```html
<!-- Parent checkbox with indeterminate state -->
<my-checkbox
  id="select-all"
  label="Select All Features"
  indeterminate
  aria-controls="feature-list">
</my-checkbox>

<div id="feature-list" role="group" aria-labelledby="select-all">
  <my-checkbox
    label="Advanced Analytics"
    name="features"
    value="analytics">
  </my-checkbox>
  
  <my-checkbox
    label="Real-time Notifications"
    name="features"
    value="notifications"
    checked>
  </my-checkbox>
  
  <my-checkbox
    label="Custom Dashboards"
    name="features"
    value="dashboards">
  </my-checkbox>
</div>
```

### Different Sizes and States

```html
<!-- Small checkbox -->
<my-checkbox
  label="Small checkbox"
  size="sm"
  name="small-option">
</my-checkbox>

<!-- Default medium checkbox -->
<my-checkbox
  label="Medium checkbox (default)"
  name="medium-option"
  checked>
</my-checkbox>

<!-- Large checkbox -->
<my-checkbox
  label="Large checkbox"
  size="lg"
  name="large-option">
</my-checkbox>

<!-- Disabled checkbox -->
<my-checkbox
  label="Disabled checkbox"
  disabled
  checked>
</my-checkbox>

<!-- Error state checkbox -->
<my-checkbox
  label="Required checkbox"
  name="required-option"
  required
  error
  aria-describedby="checkbox-error">
</my-checkbox>
<div id="checkbox-error" class="u-text-sm u-text-error" role="alert">
  This field is required
</div>
```

### Form Validation Integration

```html
<!-- Form with checkbox validation -->
<form id="registration-form">
  <div class="form-section">
    <my-input
      label="Email Address"
      name="email"
      type="email"
      required>
    </my-input>
    
    <my-input
      label="Password"
      name="password"
      type="password"
      required>
    </my-input>
  </div>
  
  <div class="form-checkboxes">
    <my-checkbox
      label="I agree to the Privacy Policy"
      name="privacy"
      value="agreed"
      required
      aria-describedby="privacy-help">
    </my-checkbox>
    <div id="privacy-help" class="u-text-sm u-text-muted">
      Required to create an account
    </div>
    
    <my-checkbox
      label="Send me product updates and newsletters"
      name="newsletter"
      value="subscribed">
    </my-checkbox>
    
    <my-checkbox
      label="Enable two-factor authentication"
      name="two-factor"
      value="enabled">
    </my-checkbox>
  </div>
  
  <my-button type="submit" variant="filled">
    Create Account
  </my-button>
</form>
```

### Dynamic Checkbox Lists

```html
<!-- Dynamic checkbox list with JavaScript -->
<div id="permission-checkboxes"></div>

<script>
const permissions = [
  { id: 'read', label: 'Read Access', description: 'View content and data' },
  { id: 'write', label: 'Write Access', description: 'Create and edit content' },
  { id: 'delete', label: 'Delete Access', description: 'Remove content permanently' },
  { id: 'admin', label: 'Admin Access', description: 'Full system administration' }
];

const container = document.getElementById('permission-checkboxes');

permissions.forEach(permission => {
  const wrapper = document.createElement('div');
  wrapper.className = 'permission-item';
  
  const checkbox = document.createElement('my-checkbox');
  checkbox.setAttribute('label', permission.label);
  checkbox.setAttribute('name', 'permissions');
  checkbox.setAttribute('value', permission.id);
  checkbox.setAttribute('aria-describedby', `desc-${permission.id}`);
  
  const description = document.createElement('div');
  description.id = `desc-${permission.id}`;
  description.className = 'u-text-sm u-text-muted';
  description.textContent = permission.description;
  
  wrapper.appendChild(checkbox);
  wrapper.appendChild(description);
  container.appendChild(wrapper);
});
</script>
```

## Properties & Attributes

### BaseComponent Properties (Inherited)
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `disabled` | boolean | `false` | Disables the checkbox with proper ARIA states |
| `loading` | boolean | `false` | Shows loading state with accessibility announcements |
| `error` | boolean | `false` | Sets error state with enhanced visual indicators |
| `size` | string | `'md'` | Size variant: `'sm'`, `'md'`, `'lg'` |
| `variant` | string | `'default'` | Visual variant (future: `'outlined'`, `'filled'`) |
| `debug` | boolean | `false` | Enables comprehensive debug logging |

### Checkbox-Specific Properties
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `checked` | boolean | `false` | Checkbox checked state with proper form integration |
| `indeterminate` | boolean | `false` | Mixed state for parent-child checkbox relationships |
| `label` | string | `''` | Checkbox label text with proper association |
| `name` | string | `''` | Form field name for submission and grouping |
| `value` | string | `'on'` | Value submitted when checkbox is checked |
| `required` | boolean | `false` | Makes checkbox required for form validation |

### ARIA Attributes (Auto-Generated)
| Attribute | Description |
|-----------|-------------|
| `role` | Set to "checkbox" for proper screen reader identification |
| `aria-checked` | Indicates checked state: "true", "false", or "mixed" |
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

### Checkbox-Specific Events
| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ checked, indeterminate, value, name }` | Fired when checkbox state changes |
| `input` | `{ checked, indeterminate, value, name }` | Fired for form input compatibility |
| `toggle` | `{ checked, indeterminate, value, name }` | Fired when checkbox is toggled |

### Event Usage Examples

```javascript
// Listen for checkbox state changes
checkbox.addEventListener('change', (event) => {
  const { checked, indeterminate, value, name } = event.detail;
  console.log('Checkbox changed:', { checked, indeterminate, value, name });
  
  if (checked) {
    console.log(`${name} is now selected with value: ${value}`);
  }
});

// Handle form submission
form.addEventListener('submit', (event) => {
  const formData = new FormData(form);
  const selectedInterests = formData.getAll('interests');
  console.log('Selected interests:', selectedInterests);
});

// Manage parent-child checkbox relationships
const parentCheckbox = document.querySelector('#select-all');
const childCheckboxes = document.querySelectorAll('[name="features"]');

parentCheckbox.addEventListener('change', (event) => {
  const { checked } = event.detail;
  childCheckboxes.forEach(child => {
    child.checked = checked;
    child.indeterminate = false;
  });
});

childCheckboxes.forEach(child => {
  child.addEventListener('change', () => {
    updateParentState();
  });
});

function updateParentState() {
  const checkedChildren = Array.from(childCheckboxes).filter(cb => cb.checked);
  const totalChildren = childCheckboxes.length;
  
  if (checkedChildren.length === 0) {
    parentCheckbox.checked = false;
    parentCheckbox.indeterminate = false;
  } else if (checkedChildren.length === totalChildren) {
    parentCheckbox.checked = true;
    parentCheckbox.indeterminate = false;
  } else {
    parentCheckbox.checked = false;
    parentCheckbox.indeterminate = true;
  }
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

### Checkbox-Specific Methods
| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `toggle()` | none | void | Toggles the checkbox checked state |
| `check()` | none | void | Sets checkbox to checked state |
| `uncheck()` | none | void | Sets checkbox to unchecked state |
| `focus()` | none | void | Programmatically focuses the checkbox |
| `blur()` | none | void | Programmatically blurs the checkbox |
| `click()` | none | void | Programmatically clicks the checkbox |

### Method Usage Examples

```javascript
const checkbox = document.querySelector('my-checkbox');

// Programmatic state management
checkbox.check();   // Set to checked
checkbox.uncheck(); // Set to unchecked
checkbox.toggle();  // Toggle current state

// Focus management
checkbox.focus();   // Focus the checkbox
checkbox.blur();    // Remove focus

// Programmatic interaction
checkbox.click();   // Simulate user click
```

## CSS Custom Properties

### BaseComponent Variables (Inherited)
```css
my-checkbox {
  /* Size and spacing inherited from BaseComponent */
  --_component-size: var(--_global-size-md);
  --_component-padding: var(--_global-spacing-sm);
  --_component-border-radius: var(--_global-border-radius-sm);
}
```

### Checkbox-Specific Variables
```css
my-checkbox {
  /* Layout and sizing */
  --_checkbox-size: 18px;
  --_checkbox-touch-target: 40px;
  --_checkbox-border-radius: 2px;
  --_checkbox-border-width: 2px;
  
  /* Colors and states */
  --_checkbox-background: transparent;
  --_checkbox-background-checked: var(--_global-color-primary);
  --_checkbox-background-disabled: var(--_global-color-surface-variant);
  --_checkbox-border-color: var(--_global-color-outline);
  --_checkbox-border-color-checked: var(--_global-color-primary);
  --_checkbox-border-color-focus: var(--_global-color-primary);
  --_checkbox-border-color-error: var(--_global-color-error);
  --_checkbox-checkmark-color: var(--_global-color-on-primary);
  --_checkbox-checkmark-color-disabled: var(--_global-color-on-surface-variant);
  
  /* Label styling */
  --_checkbox-label-color: var(--_global-color-on-surface);
  --_checkbox-label-color-disabled: var(--_global-color-on-surface-variant);
  --_checkbox-label-font-family: var(--_global-font-family-sans);
  --_checkbox-label-font-size: var(--_global-font-size-body-lg);
  --_checkbox-label-font-weight: var(--_global-font-weight-body-lg);
  --_checkbox-label-line-height: var(--_global-line-height-body-lg);
  
  /* State layers and interactions */
  --_checkbox-state-layer-size: var(--_checkbox-touch-target);
  --_checkbox-state-layer-color-hover: var(--_global-color-on-surface);
  --_checkbox-state-layer-color-focus: var(--_global-color-primary);
  --_checkbox-state-layer-color-pressed: var(--_global-color-primary);
  --_checkbox-state-layer-opacity-hover: 0.08;
  --_checkbox-state-layer-opacity-focus: 0.12;
  --_checkbox-state-layer-opacity-pressed: 0.12;
  
  /* Ripple effects */
  --_checkbox-ripple-color: var(--_global-color-primary);
  --_checkbox-ripple-opacity: 0.12;
  --_checkbox-ripple-duration: var(--_global-motion-duration-medium2);
  
  /* Animations and transitions */
  --_checkbox-transition: all var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
  --_checkbox-checkmark-transition: all var(--_global-motion-duration-short3) var(--_global-motion-easing-emphasized);
  --_checkbox-state-layer-transition: opacity var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
  
  /* Focus and elevation */
  --_checkbox-focus-ring-width: 3px;
  --_checkbox-focus-ring-color: var(--_global-color-primary);
  --_checkbox-focus-ring-offset: 2px;
}
```

### Size Variants

```css
/* Small size variant */
my-checkbox[size="sm"] {
  --_checkbox-size: 16px;
  --_checkbox-touch-target: 36px;
  --_checkbox-label-font-size: var(--_global-font-size-body-md);
  --_checkbox-state-layer-size: 36px;
}

/* Large size variant */
my-checkbox[size="lg"] {
  --_checkbox-size: 24px;
  --_checkbox-touch-target: 48px;
  --_checkbox-label-font-size: var(--_global-font-size-body-lg);
  --_checkbox-state-layer-size: 48px;
}
```

### Customization Examples

```css
/* Custom branded checkbox theme */
my-checkbox[variant="brand"] {
  --_checkbox-background-checked: #1976d2;
  --_checkbox-border-color-checked: #1976d2;
  --_checkbox-border-color-focus: #1976d2;
  --_checkbox-state-layer-color-focus: #1976d2;
  --_checkbox-ripple-color: #1976d2;
  --_checkbox-focus-ring-color: #1976d2;
}

/* Premium checkbox with custom styling */
my-checkbox[variant="premium"] {
  --_checkbox-border-radius: 6px;
  --_checkbox-border-width: 2px;
  --_checkbox-background-checked: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --_checkbox-checkmark-color: white;
}

/* Minimal checkbox variant */
my-checkbox[variant="minimal"] {
  --_checkbox-border-color: var(--_global-color-outline-variant);
  --_checkbox-state-layer-opacity-hover: 0.04;
  --_checkbox-state-layer-opacity-focus: 0.08;
  --_checkbox-ripple-opacity: 0.08;
}
```

## Accessibility Features

### WCAG 2.1 AA Compliance
- ✅ **Color Contrast**: Minimum 4.5:1 contrast ratio for all text and interactive elements
- ✅ **Keyboard Navigation**: Complete keyboard accessibility with space bar and tab support
- ✅ **Screen Reader Support**: Comprehensive ARIA attributes and state announcements
- ✅ **Focus Management**: Visible focus indicators with proper contrast and positioning
- ✅ **Touch Targets**: Minimum 44px touch targets for mobile accessibility

### Enhanced Accessibility Features
- **High Contrast Mode**: Enhanced visibility for `prefers-contrast: high` with stronger borders
- **Reduced Motion**: Respects `prefers-reduced-motion: reduce` for animations and transitions
- **Screen Reader Announcements**: Automatic state change announcements with proper priority
- **Focus Visible**: Modern `:focus-visible` support with progressive enhancement fallbacks
- **Form Integration**: Seamless integration with form validation and error messaging

### Accessibility Examples

```html
<!-- Fully accessible checkbox with comprehensive ARIA -->
<my-checkbox
  label="I agree to receive marketing emails"
  name="marketing"
  value="agreed"
  aria-describedby="marketing-help marketing-error"
  aria-required="false">
</my-checkbox>
<div id="marketing-help" class="u-text-sm u-text-muted">
  You can unsubscribe at any time
</div>
<div id="marketing-error" class="u-text-sm u-text-error" role="alert" aria-live="polite">
  <!-- Error messages appear here -->
</div>

<!-- Checkbox group with proper fieldset structure -->
<fieldset>
  <legend class="u-text-lg u-font-medium">Notification Preferences</legend>
  
  <my-checkbox
    label="Email notifications"
    name="notifications"
    value="email"
    aria-describedby="email-desc">
  </my-checkbox>
  <div id="email-desc" class="u-text-sm u-text-muted">
    Receive updates via email
  </div>
  
  <my-checkbox
    label="SMS notifications"
    name="notifications"
    value="sms"
    aria-describedby="sms-desc">
  </my-checkbox>
  <div id="sms-desc" class="u-text-sm u-text-muted">
    Receive updates via text message
  </div>
  
  <my-checkbox
    label="Push notifications"
    name="notifications"
    value="push"
    aria-describedby="push-desc">
  </my-checkbox>
  <div id="push-desc" class="u-text-sm u-text-muted">
    Receive updates in your browser
  </div>
</fieldset>
```

## Form Integration

### Native Form Support
The my-checkbox component integrates seamlessly with native HTML forms:

```javascript
// Standard form submission
const form = document.querySelector('form');
const formData = new FormData(form);

// Get individual checkbox values
console.log('Terms accepted:', formData.get('terms')); // 'agreed' or null
console.log('Newsletter:', formData.get('newsletter')); // 'subscribed' or null

// Get multiple checkbox values
const interests = formData.getAll('interests'); // Array of selected values
console.log('Selected interests:', interests);
```

### Framework Integration

#### React Integration
```jsx
import { useState, useRef, useEffect } from 'react';

function SettingsForm() {
  const [settings, setSettings] = useState({
    notifications: false,
    newsletter: false,
    analytics: false
  });
  
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.detail;
    setSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  return (
    <form>
      <my-checkbox
        label="Enable notifications"
        name="notifications"
        checked={settings.notifications}
        onChange={handleCheckboxChange}
      />
      
      <my-checkbox
        label="Subscribe to newsletter"
        name="newsletter"
        checked={settings.newsletter}
        onChange={handleCheckboxChange}
      />
      
      <my-checkbox
        label="Share analytics data"
        name="analytics"
        checked={settings.analytics}
        onChange={handleCheckboxChange}
      />
    </form>
  );
}
```

#### Vue Integration
```vue
<template>
  <form @submit.prevent="handleSubmit">
    <my-checkbox
      v-for="option in options"
      :key="option.id"
      :label="option.label"
      :name="option.name"
      :value="option.value"
      :checked="selectedOptions.includes(option.value)"
      @change="handleCheckboxChange"
    />
    
    <button type="submit">Save Preferences</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      selectedOptions: [],
      options: [
        { id: 1, label: 'Email Updates', name: 'updates', value: 'email' },
        { id: 2, label: 'SMS Alerts', name: 'updates', value: 'sms' },
        { id: 3, label: 'Push Notifications', name: 'updates', value: 'push' }
      ]
    };
  },
  
  methods: {
    handleCheckboxChange(event) {
      const { checked, value } = event.detail;
      
      if (checked) {
        this.selectedOptions.push(value);
      } else {
        this.selectedOptions = this.selectedOptions.filter(v => v !== value);
      }
    },
    
    handleSubmit() {
      console.log('Selected options:', this.selectedOptions);
    }
  }
};
</script>
```

## Advanced Usage Patterns

### Parent-Child Checkbox Management

```javascript
// Comprehensive parent-child checkbox management
class CheckboxGroupManager {
  constructor(parentSelector, childrenSelector) {
    this.parent = document.querySelector(parentSelector);
    this.children = document.querySelectorAll(childrenSelector);
    
    this.setupEventListeners();
    this.updateParentState();
  }
  
  setupEventListeners() {
    // Handle parent checkbox changes
    this.parent.addEventListener('change', (event) => {
      const { checked } = event.detail;
      this.updateAllChildren(checked);
    });
    
    // Handle child checkbox changes
    this.children.forEach(child => {
      child.addEventListener('change', () => {
        this.updateParentState();
      });
    });
  }
  
  updateAllChildren(checked) {
    this.children.forEach(child => {
      child.checked = checked;
      child.indeterminate = false;
    });
  }
  
  updateParentState() {
    const checkedChildren = Array.from(this.children).filter(cb => cb.checked);
    const totalChildren = this.children.length;
    
    if (checkedChildren.length === 0) {
      this.parent.checked = false;
      this.parent.indeterminate = false;
    } else if (checkedChildren.length === totalChildren) {
      this.parent.checked = true;
      this.parent.indeterminate = false;
    } else {
      this.parent.checked = false;
      this.parent.indeterminate = true;
    }
  }
  
  getSelectedValues() {
    return Array.from(this.children)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
  }
}

// Usage
const manager = new CheckboxGroupManager('#select-all', '[name="features"]');
```

### Dynamic Checkbox Lists with Search

```javascript
// Dynamic checkbox list with search functionality
class SearchableCheckboxList {
  constructor(container, options) {
    this.container = container;
    this.options = options;
    this.searchTerm = '';
    this.selectedValues = new Set();
    
    this.render();
    this.setupSearch();
  }
  
  render() {
    this.container.innerHTML = `
      <div class="search-container">
        <input type="text" placeholder="Search options..." class="search-input">
      </div>
      <div class="checkbox-list"></div>
    `;
    
    this.searchInput = this.container.querySelector('.search-input');
    this.checkboxList = this.container.querySelector('.checkbox-list');
    
    this.renderCheckboxes();
  }
  
  renderCheckboxes() {
    const filteredOptions = this.options.filter(option =>
      option.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    
    this.checkboxList.innerHTML = '';
    
    filteredOptions.forEach(option => {
      const wrapper = document.createElement('div');
      wrapper.className = 'checkbox-item';
      
      const checkbox = document.createElement('my-checkbox');
      checkbox.setAttribute('label', option.label);
      checkbox.setAttribute('value', option.value);
      checkbox.checked = this.selectedValues.has(option.value);
      
      checkbox.addEventListener('change', (event) => {
        const { checked, value } = event.detail;
        if (checked) {
          this.selectedValues.add(value);
        } else {
          this.selectedValues.delete(value);
        }
      });
      
      wrapper.appendChild(checkbox);
      this.checkboxList.appendChild(wrapper);
    });
  }
  
  setupSearch() {
    this.searchInput.addEventListener('input', (event) => {
      this.searchTerm = event.target.value;
      this.renderCheckboxes();
    });
  }
  
  getSelectedValues() {
    return Array.from(this.selectedValues);
  }
}
```

## Performance Considerations

### Memory Management
Built on BaseComponent architecture for optimal performance:
- **Event Cleanup**: Automatic event listener cleanup prevents memory leaks
- **Efficient Rendering**: RequestAnimationFrame-based render optimization
- **State Management**: Efficient state tracking with minimal DOM manipulation

### Large Lists Optimization
For large checkbox lists, consider:
- **Virtual Scrolling**: Implement virtual scrolling for 1000+ items
- **Pagination**: Break large lists into manageable chunks
- **Search Filtering**: Reduce rendered items with search functionality
- **Lazy Loading**: Load checkbox options on demand

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

- **[my-input](../my-input/README.md)**: Text input component with form integration
- **[my-radio](../my-radio/README.md)**: Radio button component for single selection
- **[my-toggle](../my-toggle/README.md)**: Switch-style boolean input
- **[my-button](../my-button/README.md)**: Form submission and action buttons
- **[my-radio-group](../my-radio-group/README.md)**: Radio button group management

---

**Built with BaseComponent architecture for consistent performance, accessibility, and developer experience across the MyntUI ecosystem.**