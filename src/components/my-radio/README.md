# my-radio Component

A Material Design 3 radio button component that works with `my-radio-group` for single-selection interfaces.

## Features

- Material Design 3 styling and interactions
- Ripple effect animations
- Keyboard navigation support
- Size variants (sm, md, lg)
- Error state styling
- Accessibility compliant
- Framework agnostic

## Usage

### Basic Usage

```html
<my-radio value="option1" label="Option 1"></my-radio>
<my-radio value="option2" label="Option 2"></my-radio>
```

### With Radio Group

```html
<my-radio-group name="choices" value="option1">
  <my-radio value="option1" label="Option 1"></my-radio>
  <my-radio value="option2" label="Option 2"></my-radio>
  <my-radio value="option3" label="Option 3"></my-radio>
</my-radio-group>
```

### Size Variants

```html
<my-radio size="sm" value="small" label="Small"></my-radio>
<my-radio size="md" value="medium" label="Medium (default)"></my-radio>
<my-radio size="lg" value="large" label="Large"></my-radio>
```

### States

```html
<!-- Checked -->
<my-radio checked value="checked" label="Checked"></my-radio>

<!-- Disabled -->
<my-radio disabled value="disabled" label="Disabled"></my-radio>

<!-- Error state -->
<my-radio error value="error" label="Error state"></my-radio>
```

### Slotted Content

```html
<my-radio value="custom">
  <span>Custom <strong>formatted</strong> label</span>
</my-radio>
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | string | `""` | The value of the radio button |
| `label` | string | `""` | The text label for the radio button |
| `name` | string | `""` | The name attribute (usually set by radio group) |
| `checked` | boolean | `false` | Whether the radio is selected |
| `disabled` | boolean | `false` | Whether the radio is disabled |
| `size` | string | `"md"` | Size variant: `"sm"`, `"md"`, `"lg"` |
| `error` | boolean | `false` | Whether to show error state styling |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ checked: boolean, value: string, name: string }` | Fired when the radio selection changes |

## CSS Custom Properties

The component uses the global design system variables and exposes these for customization:

```css
my-radio {
  --_radio-size: 20px;
  --_radio-color: var(--_global-color-primary);
  --_radio-state-layer-size: 40px;
}
```

## Accessibility

- Implements proper ARIA roles and attributes
- Keyboard navigation with Space key
- Screen reader friendly
- High contrast mode support
- Focus indicators
- State announcements

## Browser Support

Works in all modern browsers that support:
- Web Components
- CSS Custom Properties
- ES6 Classes

## Related Components

- `my-radio-group` - Container for managing radio button groups
- `my-checkbox` - For multi-select scenarios