# my-radio-group Component

A Material Design 3 radio group component that manages a collection of radio buttons, ensuring only one can be selected at a time.

## Features

- Material Design 3 styling and interactions
- Keyboard navigation support (arrow keys, Home, End)
- Accessibility compliant with proper ARIA attributes
- Size variants and layout options
- Error state styling
- Framework agnostic
- Focus management

## Usage

### Basic Usage

```html
<my-radio-group name="size" label="Choose size:">
  <my-radio value="small" label="Small"></my-radio>
  <my-radio value="medium" label="Medium"></my-radio>
  <my-radio value="large" label="Large"></my-radio>
</my-radio-group>
```

### With Initial Selection

```html
<my-radio-group name="color" label="Choose color:" value="blue">
  <my-radio value="red" label="Red"></my-radio>
  <my-radio value="green" label="Green"></my-radio>
  <my-radio value="blue" label="Blue"></my-radio>
</my-radio-group>
```

### Horizontal Layout

```html
<my-radio-group name="alignment" label="Text alignment:" layout="horizontal">
  <my-radio value="left" label="Left"></my-radio>
  <my-radio value="center" label="Center"></my-radio>
  <my-radio value="right" label="Right"></my-radio>
</my-radio-group>
```

### Size Variants

```html
<my-radio-group name="options" label="Small size:" size="sm">
  <my-radio value="option1" label="Option 1"></my-radio>
  <my-radio value="option2" label="Option 2"></my-radio>
</my-radio-group>

<my-radio-group name="options" label="Large size:" size="lg">
  <my-radio value="option1" label="Option 1"></my-radio>
  <my-radio value="option2" label="Option 2"></my-radio>
</my-radio-group>
```

### States

```html
<!-- Required field -->
<my-radio-group name="required" label="Required field:" required>
  <my-radio value="yes" label="Yes"></my-radio>
  <my-radio value="no" label="No"></my-radio>
</my-radio-group>

<!-- Disabled -->
<my-radio-group name="disabled" label="Disabled:" disabled>
  <my-radio value="option1" label="Option 1"></my-radio>
  <my-radio value="option2" label="Option 2"></my-radio>
</my-radio-group>

<!-- Error state -->
<my-radio-group name="error" label="Error state:" error>
  <my-radio value="option1" label="Option 1"></my-radio>
  <my-radio value="option2" label="Option 2"></my-radio>
</my-radio-group>
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | string | `""` | The name attribute for the radio group |
| `label` | string | `""` | The label text for the radio group |
| `value` | string | `""` | The currently selected radio button value |
| `disabled` | boolean | `false` | Whether the entire group is disabled |
| `required` | boolean | `false` | Whether the field is required |
| `size` | string | `"md"` | Size variant: `"sm"`, `"md"`, `"lg"` |
| `layout` | string | `"vertical"` | Layout: `"vertical"` or `"horizontal"` |
| `error` | boolean | `false` | Whether to show error state styling |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ value: string, oldValue: string, name: string }` | Fired when the selection changes |

## Methods

| Method | Description |
|--------|-------------|
| `getRadios()` | Returns array of all my-radio elements in the group |
| `updateRadioSelection()` | Updates the selection state of all radio buttons |

## CSS Custom Properties

The component uses the global design system variables and exposes these for customization:

```css
my-radio-group {
  --_radio-group-gap: var(--_global-spacing-sm);
  --_radio-group-gap-horizontal: var(--_global-spacing-md);
}
```

## Keyboard Navigation

- **Arrow Keys**: Navigate between options
- **Home**: Select first option
- **End**: Select last option
- **Tab**: Move focus to/from the radio group

## Accessibility

- Implements proper `radiogroup` role
- ARIA labels and required attributes
- Screen reader friendly
- Focus management and indicators
- Keyboard navigation support

## Browser Support

Works in all modern browsers that support:
- Web Components
- CSS Custom Properties  
- ES6 Classes

## Related Components

- `my-radio` - Individual radio button component
- `my-checkbox` - For multi-select scenarios