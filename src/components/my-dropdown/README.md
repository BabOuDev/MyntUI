# my-dropdown

A flexible dropdown component that displays a list of options when clicked, following Material Design 3 principles.

## Features

- ✅ **Keyboard Navigation**: Full arrow key, home/end, enter/space support
- ✅ **Accessibility**: Proper ARIA attributes and screen reader support
- ✅ **Auto-positioning**: Smart positioning with overflow detection
- ✅ **Icons & Dividers**: Support for option icons and visual separators
- ✅ **Customizable**: Size variants, disabled states, custom triggers
- ✅ **Event-driven**: Complete event system for integration
- ✅ **Native Web Components**: Framework-agnostic using Shadow DOM

## Basic Usage

```html
<my-dropdown 
  placeholder="Select an option"
  options='[{"label": "Option 1", "value": "1"}, {"label": "Option 2", "value": "2"}]'>
</my-dropdown>
```

## Advanced Usage

### With Icons and Dividers

```html
<my-dropdown 
  placeholder="Choose action"
  options='[
    {"label": "Home", "value": "home", "icon": "home"},
    {"label": "Settings", "value": "settings", "icon": "settings"},
    {"type": "divider"},
    {"label": "Logout", "value": "logout", "icon": "logout"}
  ]'>
</my-dropdown>
```

### Custom Trigger Content

```html
<my-dropdown options='[{"label": "Edit", "value": "edit"}]'>
  <span slot="trigger">
    <my-icon icon="more_vert"></my-icon>
    Actions
  </span>
</my-dropdown>
```

### JavaScript API

```javascript
const dropdown = document.querySelector('my-dropdown');

// Set options programmatically
dropdown.options = [
  { label: 'Create', value: 'create', icon: 'add' },
  { label: 'Edit', value: 'edit', icon: 'edit' },
  { label: 'Delete', value: 'delete', icon: 'delete', disabled: true }
];

// Listen for selection events
dropdown.addEventListener('select', (event) => {
  console.log('Selected:', event.detail.value, event.detail.option);
});

// Programmatic control
dropdown.open();
dropdown.close();
dropdown.value = 'edit'; // Set selected value
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `options` | `Array` | `[]` | Array of option objects with `label`, `value`, optional `icon`, `disabled` |
| `value` | `string` | `null` | Currently selected value |
| `placeholder` | `string` | `'Select an option'` | Placeholder text when no option selected |
| `disabled` | `boolean` | `false` | Disable the entire dropdown |
| `position` | `string` | `'bottom'` | Position preference: `'top'`, `'bottom'`, `'auto'` |
| `size` | `string` | `'md'` | Size variant: `'sm'`, `'md'`, `'lg'` |
| `trigger-text` | `string` | `''` | Custom trigger text (overrides placeholder) |

## Option Object Format

```javascript
{
  label: string,    // Display text (required)
  value: string,    // Option value (required)
  icon?: string,    // Material Icon name (optional)
  disabled?: boolean, // Disable this option (optional)
  action?: function  // Custom action function (optional)
}

// Special divider option
{ type: 'divider' }
```

## Events

| Event | Detail | Description |
|-------|---------|-------------|
| `select` | `{value, oldValue, option, index}` | Fired when option is selected |
| `open` | `{isOpen: true}` | Fired when dropdown opens |
| `close` | `{isOpen: false}` | Fired when dropdown closes |

## Keyboard Navigation

- **Enter/Space**: Open dropdown
- **Arrow Up/Down**: Navigate options
- **Home/End**: Jump to first/last option
- **Enter/Space**: Select focused option
- **Escape**: Close dropdown

## CSS Custom Properties

The component uses the global design system variables and can be customized:

```css
my-dropdown {
  --_dropdown-min-width: 140px;
  --_dropdown-border-radius: 8px;
  --_dropdown-shadow: var(--_global-elevation-2);
}
```

## Accessibility

- Full ARIA support with `role="listbox"` and `aria-expanded`
- Keyboard navigation following ARIA best practices
- Screen reader announcements for state changes
- Focus management with proper tabindex handling
- High contrast support for disabled states

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- All browsers supporting Custom Elements v1 and Shadow DOM

## Size Variants

```html
<!-- Small -->
<my-dropdown size="sm" options='[...]'></my-dropdown>

<!-- Medium (default) -->
<my-dropdown size="md" options='[...]'></my-dropdown>

<!-- Large -->
<my-dropdown size="lg" options='[...]'></my-dropdown>
```

## Integration Examples

### React
```jsx
import '../node_modules/mynt-ui/src/components/my-dropdown/my-dropdown.js';

function MyComponent() {
  const handleSelect = (event) => {
    console.log('Selected:', event.detail.value);
  };

  return (
    <my-dropdown 
      options={JSON.stringify([
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' }
      ])}
      onSelect={handleSelect}
    />
  );
}
```

### Vue
```vue
<template>
  <my-dropdown 
    :options="JSON.stringify(dropdownOptions)"
    @select="handleSelect"
  />
</template>

<script>
export default {
  data() {
    return {
      dropdownOptions: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' }
      ]
    };
  },
  methods: {
    handleSelect(event) {
      console.log('Selected:', event.detail.value);
    }
  }
};
</script>
```

---

Part of the [MyntUI Component Library](../../README.md) - Built with Web Components for universal compatibility.