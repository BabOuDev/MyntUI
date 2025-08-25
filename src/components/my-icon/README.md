# my-icon

A flexible, accessible icon component for rendering Material Icons with interactive capabilities and full accessibility support.

## Features

✅ **Material Icons Integration**
- Direct access to Google's Material Icons library
- Scalable vector icons with crisp rendering
- Consistent iconography across the design system

✅ **Multiple Sizes**
- `xs` - Extra small (12px)
- `sm` - Small (16px)
- `md` - Medium (18px, default)
- `lg` - Large (24px)
- `xl` - Extra large (32px)

✅ **Interactive Mode**
- Optional interactive behavior with hover/focus states
- Keyboard navigation support (Enter/Space keys)
- Click events for actionable icons
- Proper accessibility for button-like behavior

✅ **Accessibility First**
- ARIA labeling with customizable descriptions
- Screen reader compatibility
- Keyboard navigation when interactive
- Focus indicators and disabled state support
- High contrast and reduced motion preferences

✅ **Customizable Styling**
- Custom colors via CSS properties
- Size variants with consistent scaling
- Seamless integration with design system

## Usage

### Basic Icon

```html
<my-icon icon="home"></my-icon>
<my-icon icon="settings"></my-icon>
<my-icon icon="favorite"></my-icon>
```

### Different Sizes

```html
<my-icon icon="star" size="xs"></my-icon>
<my-icon icon="star" size="sm"></my-icon>
<my-icon icon="star" size="md"></my-icon>
<my-icon icon="star" size="lg"></my-icon>
<my-icon icon="star" size="xl"></my-icon>
```

### Custom Colors

```html
<my-icon icon="home" color="#007bff"></my-icon>
<my-icon icon="favorite" color="#dc3545"></my-icon>
<my-icon icon="check" color="#28a745"></my-icon>
```

### Interactive Icons (Buttons)

```html
<!-- Interactive icon that can be clicked -->
<my-icon icon="delete" interactive aria-label="Delete item"></my-icon>
<my-icon icon="edit" interactive aria-label="Edit content"></my-icon>
<my-icon icon="close" interactive aria-label="Close dialog"></my-icon>
```

### Disabled State

```html
<my-icon icon="save" interactive disabled aria-label="Save (unavailable)"></my-icon>
```

### In Buttons and Components

```html
<my-button>
  <my-icon icon="download"></my-icon>
  Download
</my-button>

<my-input label="Search">
  <my-icon slot="left" icon="search"></my-icon>
  <my-icon slot="right" icon="clear" interactive></my-icon>
</my-input>
```

### Tooltips with Icons

```html
<my-tooltip text="Go to homepage">
  <my-icon icon="home" interactive></my-icon>
</my-tooltip>

<my-tooltip text="Settings panel">
  <my-icon icon="settings" interactive size="lg"></my-icon>
</my-tooltip>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `icon` | string | `""` | Material Icon name (e.g., "home", "settings", "favorite") |
| `size` | string | `"md"` | Icon size (`xs`, `sm`, `md`, `lg`, `xl`) |
| `color` | string | - | Custom color (CSS color value) |
| `interactive` | boolean | `false` | Makes icon focusable and clickable |
| `disabled` | boolean | `false` | Disables interactive functionality |
| `aria-label` | string | icon name | Custom accessibility label |

## Events

### `icon-click` (Interactive Mode Only)

Emitted when an interactive icon is clicked or activated via keyboard.

```javascript
icon.addEventListener('icon-click', (event) => {
  console.log('Icon clicked:', event.detail);
  // event.detail contains: { icon, size, color }
});
```

### Example Event Handling

```javascript
// Delete button icon
const deleteIcon = document.querySelector('my-icon[icon="delete"]');
deleteIcon.addEventListener('icon-click', () => {
  if (confirm('Are you sure you want to delete this item?')) {
    // Handle deletion
    console.log('Item deleted');
  }
});

// Settings icon
const settingsIcon = document.querySelector('my-icon[icon="settings"]');
settingsIcon.addEventListener('icon-click', () => {
  // Open settings panel
  document.getElementById('settings-panel').classList.add('open');
});
```

## CSS Custom Properties

### Component-Specific Variables

```css
:host {
  /* Sizing */
  --_icon-size-xs: var(--_global-font-size-xs);     /* 12px */
  --_icon-size-sm: var(--_global-font-size-md);     /* 16px */
  --_icon-size-md: var(--_global-font-size-lg);     /* 18px */
  --_icon-size-lg: var(--_global-font-size-xxl);    /* 24px */
  --_icon-size-xl: var(--_global-font-size-display); /* 32px */
  
  /* Colors */
  --_icon-color: var(--_global-color-text-primary);
  
  /* Interactive States */
  --_icon-transition: var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
  --_icon-focus-ring: 2px solid var(--_global-color-border-focus);
  --_icon-focus-offset: 2px;
  --_icon-border-radius: var(--_global-border-radius-sm);
}
```

### Customization Examples

```css
/* Custom icon colors for status indicators */
.status-icon.success {
  --_icon-color: var(--_global-color-success);
}

.status-icon.warning {
  --_icon-color: var(--_global-color-warning);
}

.status-icon.error {
  --_icon-color: var(--_global-color-error);
}

/* Custom interactive icon styling */
.toolbar-icon {
  --_icon-border-radius: var(--_global-border-radius-md);
  --_icon-transition: all var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
}

.toolbar-icon:hover {
  transform: scale(1.1);
}
```

## Material Icons Reference

### Common Icons

| Category | Icons |
|----------|-------|
| **Navigation** | `home`, `menu`, `arrow_back`, `arrow_forward`, `close`, `expand_more`, `expand_less` |
| **Actions** | `search`, `add`, `edit`, `delete`, `save`, `share`, `download`, `upload` |
| **Communication** | `mail`, `phone`, `chat`, `message`, `notifications`, `call` |
| **Content** | `copy`, `cut`, `paste`, `undo`, `redo`, `select_all`, `clear` |
| **Status** | `check`, `warning`, `error`, `info`, `help`, `favorite`, `star` |
| **Media** | `play_arrow`, `pause`, `stop`, `volume_up`, `volume_down`, `fullscreen` |
| **Files** | `folder`, `file_download`, `file_upload`, `attach_file`, `cloud` |
| **User** | `person`, `account_circle`, `face`, `group`, `login`, `logout` |

### Finding Icons

Visit [Material Icons Library](https://fonts.google.com/icons) to browse all available icons and their names.

## Interactive vs Decorative Usage

### Decorative Icons (Default)

```html
<!-- Non-interactive, purely visual -->
<my-icon icon="info"></my-icon>
<span>This is an information message</span>

<!-- In form labels -->
<label>
  <my-icon icon="email"></my-icon>
  Email Address
</label>
```

### Interactive Icons (Buttons)

```html
<!-- Clickable action icons -->
<my-icon icon="favorite" interactive aria-label="Add to favorites"></my-icon>
<my-icon icon="share" interactive aria-label="Share this content"></my-icon>
<my-icon icon="more_vert" interactive aria-label="More options"></my-icon>
```

## Accessibility Guidelines

### Screen Reader Labels

Always provide meaningful labels for interactive icons:

```html
<!-- Good: Descriptive labels -->
<my-icon icon="delete" interactive aria-label="Delete this task"></my-icon>
<my-icon icon="edit" interactive aria-label="Edit profile"></my-icon>

<!-- Avoid: Generic labels -->
<my-icon icon="delete" interactive aria-label="Delete"></my-icon>
<my-icon icon="edit" interactive aria-label="Edit"></my-icon>
```

### Keyboard Navigation

Interactive icons automatically support:
- **Tab navigation** - Icons appear in tab order
- **Enter/Space activation** - Standard button behavior
- **Focus indicators** - Visible focus rings
- **Disabled state** - Proper handling when disabled

### High Contrast Mode

Icons automatically adapt to high contrast preferences:

```css
@media (prefers-contrast: high) {
  :host([interactive]:focus) {
    outline-width: 3px;
    outline-color: var(--_global-color-text-primary);
  }
}
```

### Reduced Motion

Respects user motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  :host([interactive]) {
    transition: none;
  }
  
  :host([interactive]:hover) {
    transform: none;
  }
}
```

## Browser Support

Works in all modern browsers that support:
- Custom Elements v1
- Shadow DOM v1
- CSS Custom Properties
- Material Icons web font

## Framework Integration

### Vanilla JavaScript

```javascript
// Create interactive icon
const icon = document.createElement('my-icon');
icon.icon = 'favorite';
icon.interactive = true;
icon.setAttribute('aria-label', 'Add to favorites');

icon.addEventListener('icon-click', () => {
  console.log('Added to favorites!');
});

document.body.appendChild(icon);
```

### React

```jsx
function FavoriteButton({ isFavorited, onToggle }) {
  return (
    <my-icon 
      icon={isFavorited ? 'favorite' : 'favorite_border'}
      interactive
      color={isFavorited ? '#e91e63' : undefined}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      onClick={onToggle}
    />
  );
}
```

### Vue

```vue
<template>
  <my-icon
    :icon="iconName"
    :interactive="isClickable"
    :aria-label="accessibleLabel"
    @icon-click="handleIconClick"
  />
</template>

<script>
export default {
  props: {
    iconName: String,
    isClickable: Boolean,
    accessibleLabel: String
  },
  methods: {
    handleIconClick(event) {
      this.$emit('icon-action', event.detail);
    }
  }
};
</script>
```

## Best Practices

### Do's ✅

- Use interactive mode only for actionable icons
- Provide descriptive aria-labels for interactive icons
- Choose appropriate sizes for context
- Use consistent iconography throughout your application
- Test with keyboard navigation
- Verify with screen readers

### Don'ts ❌

- Don't make decorative icons interactive
- Don't use vague aria-labels like "icon" or "button"
- Don't override focus indicators without providing alternatives
- Don't use icons without labels for complex actions
- Don't make icons too small for touch targets (minimum 44px)

## Design System Integration

This component follows the MyntUI design system and automatically inherits:

- **Global color palette** from `--_global-color-*` variables
- **Typography system** for consistent sizing
- **Motion system** for smooth transitions
- **Focus system** for accessibility standards

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for complete design system documentation.