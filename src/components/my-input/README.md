# my-input

A comprehensive, accessible input component that supports various HTML5 input types with advanced validation and Material Design 3 styling.

## Features

✅ **Multiple Input Types**
- `text` - Standard text input
- `email` - Email validation
- `password` - Password input with masking
- `number` - Numeric input with constraints
- `url` - URL validation
- `tel` - Telephone number input
- `date` - Date picker
- `textarea` - Multi-line text input
- `select` - Dropdown selection

✅ **Advanced Validation**
- Required field validation
- Pattern matching (regex)
- Length constraints (min/max)
- Range validation for numbers
- Custom validation functions
- Real-time error feedback

✅ **Label Positioning**
- `top` - Label above input (default)
- `left` - Label beside input
- `over` - Floating label over input

✅ **Enhanced Accessibility**
- Proper ARIA attributes and roles
- Screen reader compatibility
- Enhanced focus management
- Error state announcements
- Keyboard navigation support

✅ **Slotted Content**
- `left` slot for icons or text
- `right` slot for buttons or indicators
- Seamless integration with visual elements

## Usage

### Basic Text Input

```html
<my-input
  label="Full Name"
  name="fullName"
  type="text"
  placeholder="Enter your full name"
  required
  minlength="2"
  maxlength="50"
></my-input>
```

### Email Input with Icon

```html
<my-input
  label="Email Address"
  name="email"
  type="email"
  required
>
  <my-icon slot="left" icon="mail"></my-icon>
</my-input>
```

### Password Input

```html
<my-input
  label="Password"
  name="password"
  type="password"
  required
  minlength="8"
  placeholder="Enter a strong password"
></my-input>
```

### Number Input with Constraints

```html
<my-input
  label="Age"
  name="age"
  type="number"
  min="0"
  max="120"
  placeholder="Enter your age"
></my-input>
```

### Textarea

```html
<my-input
  label="Comments"
  name="comments"
  type="textarea"
  placeholder="Share your thoughts..."
  maxlength="500"
></my-input>
```

### Select Dropdown

```html
<my-input
  label="Country"
  name="country"
  type="select"
  schema='{"options": [
    {"label": "United States", "value": "US"},
    {"label": "Canada", "value": "CA"},
    {"label": "Mexico", "value": "MX"}
  ]}'
></my-input>
```

### Different Label Positions

```html
<!-- Top label (default) -->
<my-input label="Label Top" name="top" type="text"></my-input>

<!-- Left label -->
<my-input label="Label Left" name="left" type="text" label-position="left"></my-input>

<!-- Floating label -->
<my-input label="Label Over" name="over" type="text" label-position="over" placeholder="Type here..."></my-input>
```

### With Slots for Enhanced UX

```html
<my-input label="Price" name="price" type="number" placeholder="0.00">
  <span slot="left">$</span>
  <span slot="right">.00</span>
</my-input>

<my-input label="Search" name="search" type="text" placeholder="Search...">
  <my-icon slot="left" icon="search"></my-icon>
  <my-icon slot="right" icon="clear" interactive></my-icon>
</my-input>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | string | `"text"` | Input type (`text`, `email`, `password`, `number`, `url`, `tel`, `date`, `textarea`, `select`) |
| `label` | string | `""` | Input label text |
| `name` | string | `""` | Input name attribute |
| `placeholder` | string | `""` | Placeholder text |
| `value` | string | `""` | Input value |
| `label-position` | string | `"top"` | Label position (`top`, `left`, `over`) |
| `required` | boolean | `false` | Makes the field required |
| `disabled` | boolean | `false` | Disables the input |
| `readonly` | boolean | `false` | Makes input read-only |
| `min` | number | - | Minimum value (for number/date inputs) |
| `max` | number | - | Maximum value (for number/date inputs) |
| `minlength` | number | - | Minimum text length |
| `maxlength` | number | - | Maximum text length |
| `pattern` | string | - | Regex pattern for validation |
| `step` | number | - | Step interval for number inputs |
| `autocomplete` | string | - | Browser autocomplete hint |
| `schema` | string | - | JSON schema for complex configuration |

## Schema-Based Configuration

For complex configurations, you can pass a complete schema:

```javascript
const inputSchema = {
  type: "select",
  label: "Priority Level",
  name: "priority",
  required: true,
  options: [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
    { label: "Critical", value: "critical" }
  ]
};

// Set via JavaScript
inputElement.schema = inputSchema;

// Or via HTML attribute
// <my-input schema='{"type":"select",...}'></my-input>
```

## Events

### `input`

Fired on every input change with validation status.

```javascript
input.addEventListener('input', (event) => {
  console.log('Input changed:', event.detail);
  // event.detail contains: { value, valid, errors, name }
});
```

### `change`

Fired when input loses focus after value change.

```javascript
input.addEventListener('change', (event) => {
  console.log('Input changed:', event.detail);
  // event.detail contains: { value, valid, errors, name }
});
```

## Methods

### `validate(value?)`

Manually trigger validation.

```javascript
const isValid = input.validate();
console.log('Is valid:', isValid);
console.log('Errors:', input.errors);
```

### `focus()`

Programmatically focus the input.

```javascript
input.focus();
```

### `blur()`

Programmatically blur the input.

```javascript
input.blur();
```

## CSS Custom Properties

### Component-Specific Variables

```css
:host {
  /* Sizing */
  --_input-height: var(--_global-input-height);
  --_input-padding-x: var(--_global-input-padding-x);
  --_input-padding-y: var(--_global-input-padding-y);
  
  /* Colors */
  --_input-border-color: var(--_global-color-border);
  --_input-border-color-focus: var(--_global-color-border-focus);
  --_input-border-color-error: var(--_global-color-border-error);
  --_input-background: var(--_global-color-white);
  --_input-text-color: var(--_global-color-text-primary);
  
  /* Effects */
  --_input-focus-shadow: 0 0 0 2px rgba(128, 189, 255, 0.2);
  --_input-error-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
  --_input-border-radius: var(--_global-border-radius-md);
  --_input-transition: var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
}
```

### Customization Example

```css
/* Custom input theme */
my-input[variant="custom"] {
  --_input-border-color: #ff6b35;
  --_input-border-color-focus: #e55a2b;
  --_input-border-radius: var(--_global-border-radius-lg);
}
```

## Validation

### Built-in Validators

- **Required**: Ensures field has a value
- **Pattern**: Regex pattern matching
- **Length**: Min/max character limits
- **Range**: Min/max numeric values
- **Email**: Valid email format
- **URL**: Valid URL format

### Custom Validation

```javascript
const input = document.querySelector('my-input');
input.schema = {
  ...input.schema,
  validation: function(value) {
    if (value.includes('admin')) {
      return 'Username cannot contain "admin"';
    }
    return true; // Valid
  }
};
```

## Accessibility

- ✅ **Complete ARIA support** - proper labels, describedby, invalid states
- ✅ **Screen reader compatibility** - error announcements, state changes
- ✅ **Keyboard navigation** - Tab, Escape, Enter key handling
- ✅ **Focus management** - visible focus indicators, focus trapping
- ✅ **Error handling** - accessible error messages with animations
- ✅ **Label association** - proper for/id relationships
- ✅ **Required field indicators** - visual and screen reader cues

## Browser Support

Works in all modern browsers that support:
- Custom Elements v1
- Shadow DOM v1
- CSS Custom Properties
- HTML5 input types

## Framework Integration

### Vanilla JavaScript

```javascript
const input = document.createElement('my-input');
input.label = 'Dynamic Input';
input.type = 'email';
input.required = true;

input.addEventListener('change', (e) => {
  if (e.detail.valid) {
    console.log('Valid email:', e.detail.value);
  } else {
    console.log('Validation errors:', e.detail.errors);
  }
});

document.body.appendChild(input);
```

### React

```jsx
function MyForm() {
  const handleInputChange = (event) => {
    const { value, valid, errors } = event.detail;
    console.log('Input changed:', { value, valid, errors });
  };
  
  return (
    <my-input 
      label="Email Address"
      type="email"
      required
      onInput={handleInputChange}
    />
  );
}
```

### Vue

```vue
<template>
  <my-input
    :label="inputLabel"
    type="email"
    required
    @input="handleInputChange"
  />
</template>

<script>
export default {
  data() {
    return {
      inputLabel: 'Email Address'
    };
  },
  methods: {
    handleInputChange(event) {
      const { value, valid, errors } = event.detail;
      console.log('Input changed:', { value, valid, errors });
    }
  }
};
</script>
```

## Design System Integration

This component follows the MyntUI design system and automatically inherits:

- **Global color palette** from `--_global-color-*` variables
- **Typography system** from `--_global-font-*` variables  
- **Spacing system** from `--_global-spacing-*` variables
- **Motion system** from `--_global-motion-*` variables
- **Form element standards** from `--_global-input-*` variables

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for complete design system documentation.