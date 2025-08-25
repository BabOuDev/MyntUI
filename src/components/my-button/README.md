# my-button

A Material Design 3 compliant button component built with native Web APIs and Shadow DOM for framework-agnostic usage.

## Features

✅ **Material Design 3 Principles**
- Proper elevation and shadows  
- Material motion timing functions
- Consistent color system

✅ **Multiple Variants**
- `filled` (default/primary) - High emphasis actions
- `outlined` - Medium emphasis actions  
- `text` - Low emphasis actions
- `secondary` - Alternative filled variant
- `success` - Success state actions
- `danger` - Destructive actions
- `ghost` - Legacy outlined variant (still supported)

✅ **Size Options**
- `sm` - Small (32px height)
- `md` - Medium (40px height, default)
- `lg` - Large (48px height)

✅ **Density Variants**
- `default` - Standard Material Design spacing
- `compact` - Reduced spacing for dense layouts

✅ **States & Interactions**
- Loading state with spinner
- Disabled state
- Hover/focus effects with proper accessibility
- Active press feedback
- **Material Design ripple effects** for click feedback
- Enhanced keyboard navigation (Enter/Space key support)

## Usage

### Basic Usage

```html
<my-button label="Click Me"></my-button>
```

### With Variants

```html
<my-button variant="filled" label="Primary Action"></my-button>
<my-button variant="outlined" label="Secondary Action"></my-button>
<my-button variant="text" label="Text Action"></my-button>
```

### With Sizes and Density

```html
<my-button size="sm" label="Small Button"></my-button>
<my-button size="lg" density="compact" label="Large Compact"></my-button>
```

### With States

```html
<my-button label="Loading..." loading></my-button>
<my-button label="Disabled Button" disabled></my-button>
```

### With Custom Content via Slots

```html
<my-button>
  <my-icon icon="download"></my-icon>
  Download File
</my-button>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | string | `""` | Button text content |
| `variant` | string | `"filled"` | Visual variant (`filled`, `outlined`, `text`, `secondary`, `success`, `danger`, `ghost`) |
| `size` | string | `"md"` | Button size (`sm`, `md`, `lg`) |
| `density` | string | `"default"` | Spacing density (`default`, `compact`) |
| `disabled` | boolean | `false` | Disables the button |
| `loading` | boolean | `false` | Shows loading spinner and disables interaction |

## Events

### `click`

Emitted when the button is clicked (not when disabled or loading).

```javascript
button.addEventListener('click', (event) => {
  console.log('Button clicked:', event.detail);
  // event.detail contains: { variant, label, size, density }
});
```

## CSS Custom Properties

The button component uses a two-level CSS variable system following Material Design principles:

### Component-Specific Variables

```css
:host {
  /* Sizing */
  --_button-min-width: 64px;
  --_button-height-sm: var(--_global-component-height-sm);
  --_button-height-md: var(--_global-component-height-md);
  --_button-height-lg: var(--_global-component-height-lg);
  
  /* Spacing */
  --_button-padding-sm: 0 var(--_global-spacing-md);
  --_button-padding-md: 0 var(--_global-spacing-lg);
  --_button-padding-lg: 0 var(--_global-spacing-xl);
  
  /* Colors */
  --_button-primary-bg: var(--_global-color-primary);
  --_button-primary-text: var(--_global-color-white);
  
  /* Elevation */
  --_button-elevation: var(--_global-elevation-1);
  --_button-elevation-hover: var(--_global-elevation-2);
  
  /* Transitions */
  --_button-transition: var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
}
```

### Customization Example

```css
/* Custom button theme */
my-button[variant="custom"] {
  --_button-primary-bg: #ff6b35;
  --_button-primary-bg-hover: #e55a2b;
  --_button-border-radius: var(--_global-border-radius-lg);
}
```

## Accessibility

- ✅ **Enhanced ARIA labeling** with dynamic states
- ✅ **Full keyboard navigation** (Enter/Space key activation)
- ✅ **Visible focus indicators** with high contrast support
- ✅ **Screen reader compatible** with state announcements
- ✅ **Disabled state handling** with proper cursor states
- ✅ **Reduced motion support** - respects user preferences
- ✅ **Tabindex management** for proper focus flow

## Browser Support

Works in all modern browsers that support:
- Custom Elements v1
- Shadow DOM v1  
- CSS Custom Properties

## Framework Integration

### Vanilla JavaScript

```javascript
const button = document.createElement('my-button');
button.label = 'Dynamic Button';
button.variant = 'success';
document.body.appendChild(button);

button.addEventListener('click', () => {
  console.log('Button clicked!');
});
```

### React

```jsx
function MyComponent() {
  const handleClick = (event) => {
    console.log('Button clicked:', event.detail);
  };
  
  return (
    <my-button 
      label="React Button"
      variant="filled"
      onClick={handleClick}
    />
  );
}
```

### Vue

```vue
<template>
  <my-button
    :label="buttonText"
    variant="outlined"
    @click="handleClick"
  />
</template>

<script>
export default {
  data() {
    return {
      buttonText: 'Vue Button'
    };
  },
  methods: {
    handleClick(event) {
      console.log('Button clicked:', event.detail);
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
- **Elevation system** from `--_global-elevation-*` variables

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for complete design system documentation.