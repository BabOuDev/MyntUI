# my-checkbox

A Material Design 3 compliant checkbox component built with native Web APIs and Shadow DOM for framework-agnostic usage.

## Features

✅ **Material Design 3 Principles**
- Custom CSS checkboxes (no Material Icons dependency)
- State layers with proper hover, focus, and pressed states
- Material Design 3 surface variants and semantic colors
- Smooth transitions with Material motion timing functions

✅ **Multiple States**
- `checked` - Selected state
- `unchecked` - Default/unselected state  
- `indeterminate` - Mixed/partial selection state
- `disabled` - Non-interactive state

✅ **Size Options**
- `sm` - Small (16px checkbox, 36px state layer)
- `md` - Medium (18px checkbox, 40px state layer, default)
- `lg` - Large (24px checkbox, 48px state layer)

✅ **Enhanced Interactions**
- Material Design 3 state layers for visual feedback
- Smooth animations with emphasized motion curves
- Custom CSS checkmarks with scale transformations
- Interactive state layers that respond to hover, focus, and press

✅ **Accessibility Features**
- Full ARIA support with `role="checkbox"`
- Dynamic `aria-checked` states including "mixed" for indeterminate
- Keyboard navigation (Space key activation)
- High contrast focus indicators
- Screen reader compatible with state announcements

## Usage

### Basic Usage

```html
<my-checkbox label="Accept terms and conditions"></my-checkbox>
```

### Checked State

```html
<my-checkbox label="Pre-selected option" checked></my-checkbox>
```

### Indeterminate State

```html
<my-checkbox label="Select all items" indeterminate></my-checkbox>
```

### Different Sizes

```html
<my-checkbox size="sm" label="Small checkbox"></my-checkbox>
<my-checkbox size="md" label="Medium checkbox"></my-checkbox>
<my-checkbox size="lg" label="Large checkbox"></my-checkbox>
```

### Disabled State

```html
<my-checkbox label="Disabled option" disabled></my-checkbox>
<my-checkbox label="Disabled checked" checked disabled></my-checkbox>
```

### Using Slots for Custom Content

```html
<my-checkbox>
  <span>Custom label with <strong>formatting</strong></span>
</my-checkbox>

<my-checkbox>
  <div>
    <div>Primary label text</div>
    <small style="color: var(--_global-color-on-surface-variant);">
      Additional description text
    </small>
  </div>
</my-checkbox>
```

### Form Integration

```html
<form id="myForm">
  <my-checkbox name="newsletter" value="yes" label="Subscribe to newsletter"></my-checkbox>
  <my-checkbox name="terms" value="accepted" label="I agree to terms" required></my-checkbox>
</form>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | string | `""` | Checkbox label text |
| `checked` | boolean | `false` | Checked state |
| `indeterminate` | boolean | `false` | Indeterminate/mixed state |
| `disabled` | boolean | `false` | Disables the checkbox |
| `name` | string | `""` | Form field name |
| `value` | string | `"on"` | Form field value when checked |
| `size` | string | `"md"` | Size variant (`sm`, `md`, `lg`) |

## Events

### `change`

Emitted when the checkbox state changes.

```javascript
checkbox.addEventListener('change', (event) => {
  console.log('Checkbox changed:', event.detail);
  // event.detail contains: { checked, indeterminate, value, name }
});
```

**Event Detail Object:**
- `checked` (boolean) - Current checked state
- `indeterminate` (boolean) - Current indeterminate state
- `value` (string|null) - Form value (null when unchecked)
- `name` (string) - Field name

## Methods

### `toggle()`

Programmatically toggle the checkbox state.

```javascript
const checkbox = document.querySelector('my-checkbox');
checkbox.toggle(); // Toggles between checked/unchecked
```

**Indeterminate State Behavior:**
When indeterminate, calling `toggle()` will move to the checked state, then subsequent toggles alternate between checked/unchecked.

## CSS Custom Properties

The checkbox component uses Material Design 3 design tokens and can be customized:

### Component-Specific Variables

```css
:host {
  /* Sizing */
  --_checkbox-size: 18px;
  --_checkbox-state-layer-size: 40px;
  
  /* Colors - Material Design 3 semantic tokens */
  --_checkbox-color: var(--_global-color-primary);
  --_checkbox-color-unchecked: var(--_global-color-on-surface-variant);
  --_checkbox-color-disabled: var(--_global-color-outline);
  --_checkbox-background: var(--_global-color-surface);
  --_checkbox-background-checked: var(--_global-color-primary);
  --_checkbox-background-disabled: var(--_global-color-surface-variant);
  
  /* Borders */
  --_checkbox-border: 2px solid var(--_global-color-outline);
  --_checkbox-border-checked: 2px solid var(--_global-color-primary);
  --_checkbox-border-hover: 2px solid var(--_global-color-on-surface);
  --_checkbox-border-radius: var(--_global-border-radius-xs);
  
  /* Transitions */
  --_checkbox-transition: all var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
}
```

### Material Design 3 Enhancements

The component includes several Material Design 3 specific features:

**State Layers:** Interactive feedback using opacity-based state layers
```css
.checkbox-container::before {
  /* State layer implementation */
  opacity: var(--_global-state-layer-hover); /* on hover */
  opacity: var(--_global-state-layer-focus); /* on focus */
  opacity: var(--_global-state-layer-pressed); /* on press */
}
```

**Custom Checkmarks:** CSS-only checkmarks with smooth animations
```css
.checkbox-input.checked::after {
  transform: translate(-50%, -60%) rotate(-45deg) scale(1);
  transition: transform var(--_global-motion-duration-short2) var(--_global-motion-easing-emphasized);
}
```

### Customization Example

```css
/* Custom theme */
my-checkbox[variant="success"] {
  --_checkbox-color: var(--_global-color-success);
  --_checkbox-background-checked: var(--_global-color-success);
  --_checkbox-border-checked: 2px solid var(--_global-color-success);
}

/* Custom size */
my-checkbox[variant="compact"] {
  --_checkbox-size: 14px;
  --_checkbox-state-layer-size: 32px;
}
```

## Accessibility

- ✅ **ARIA Compliance** - Complete `role="checkbox"` implementation
- ✅ **Dynamic States** - `aria-checked="true|false|mixed"` for all states
- ✅ **Keyboard Navigation** - Space key activation with proper event handling
- ✅ **Focus Management** - Visible focus indicators with high contrast
- ✅ **Screen Reader Support** - Proper labeling and state announcements
- ✅ **Disabled State Handling** - `aria-disabled` and `tabindex` management
- ✅ **Reduced Motion Support** - Respects `prefers-reduced-motion: reduce`

## Browser Support

Works in all modern browsers that support:
- Custom Elements v1
- Shadow DOM v1
- CSS Custom Properties
- CSS Grid and Flexbox

**Minimum Versions:**
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Framework Integration

### Vanilla JavaScript

```javascript
const checkbox = document.createElement('my-checkbox');
checkbox.label = 'Dynamic Checkbox';
checkbox.checked = true;
document.body.appendChild(checkbox);

checkbox.addEventListener('change', (e) => {
  console.log('State changed:', e.detail.checked);
});
```

### React

```jsx
function CheckboxExample() {
  const [isChecked, setIsChecked] = useState(false);
  
  const handleChange = (event) => {
    setIsChecked(event.detail.checked);
  };
  
  return (
    <my-checkbox
      label="React Checkbox"
      checked={isChecked}
      onChange={handleChange}
    />
  );
}
```

### Vue 3

```vue
<template>
  <my-checkbox
    :checked="isChecked"
    label="Vue Checkbox"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue';

const isChecked = ref(false);

const handleChange = (event) => {
  isChecked.value = event.detail.checked;
};
</script>
```

### Angular

```typescript
// component.ts
export class CheckboxComponent {
  isChecked = false;
  
  onCheckboxChange(event: CustomEvent) {
    this.isChecked = event.detail.checked;
  }
}
```

```html
<!-- template.html -->
<my-checkbox
  [attr.checked]="isChecked"
  label="Angular Checkbox"
  (change)="onCheckboxChange($event)">
</my-checkbox>
```

## Advanced Usage

### Form Validation

```javascript
const form = document.querySelector('form');
const termsCheckbox = form.querySelector('my-checkbox[name="terms"]');

form.addEventListener('submit', (e) => {
  if (!termsCheckbox.checked) {
    e.preventDefault();
    alert('Please accept the terms and conditions');
  }
});
```

### Managing Groups

```javascript
// Select all functionality
const selectAllCheckbox = document.querySelector('#select-all');
const itemCheckboxes = document.querySelectorAll('.item-checkbox');

selectAllCheckbox.addEventListener('change', (e) => {
  const isChecked = e.detail.checked;
  itemCheckboxes.forEach(checkbox => {
    checkbox.checked = isChecked;
  });
});

// Update select all state based on individual items
itemCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', updateSelectAllState);
});

function updateSelectAllState() {
  const checkedCount = Array.from(itemCheckboxes).filter(cb => cb.checked).length;
  const totalCount = itemCheckboxes.length;
  
  if (checkedCount === 0) {
    selectAllCheckbox.checked = false;
    selectAllCheckbox.indeterminate = false;
  } else if (checkedCount === totalCount) {
    selectAllCheckbox.checked = true;
    selectAllCheckbox.indeterminate = false;
  } else {
    selectAllCheckbox.checked = false;
    selectAllCheckbox.indeterminate = true;
  }
}
```

## Material Design 3 Changelog

### Enhanced from Previous Version

✅ **State Layer System**
- Added Material Design 3 state layers for hover, focus, and pressed states
- Implemented proper circular state layer with 40px hit target
- Added smooth opacity transitions for visual feedback

✅ **Custom CSS Checkboxes**
- Removed dependency on Material Icons
- Implemented pure CSS checkmark with proper scaling animations
- Added indeterminate state with custom dash styling

✅ **Material Design 3 Color System**
- Updated to use semantic color tokens (primary, surface, outline)
- Added surface variant support for proper contrast
- Implemented proper disabled state colors

✅ **Enhanced Motion**
- Added emphasized motion curves for checkmark animations
- Smooth state layer transitions with standard timing
- Scale-based transformations for modern feel

✅ **Improved Accessibility**
- Enhanced focus indicators with proper contrast
- Better keyboard navigation with state layer feedback
- Improved screen reader support with dynamic states

✅ **Size Variants**
- Added small (16px) and large (24px) size options
- Proportional state layer sizing for all variants
- Consistent spacing and proportions across sizes

## Design System Integration

This component follows the MyntUI design system and automatically inherits:

- **Global color palette** from `--_global-color-*` variables
- **Typography system** from `--_global-font-*` variables  
- **Spacing system** from `--_global-spacing-*` variables
- **Motion system** from `--_global-motion-*` variables
- **State layer standards** from `--_global-state-layer-*` variables

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for complete design system documentation.
