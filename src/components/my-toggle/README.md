# my-toggle

A Material Design 3 compliant toggle switch component built with native Web APIs and Shadow DOM for framework-agnostic usage.

## Features

✅ **Material Design 3 Principles**
- Modern track and thumb styling with proper proportions
- State layers with hover, focus, and pressed state animations
- Material Design 3 surface variants and semantic colors
- Smooth transitions with emphasized motion curves

✅ **Interactive States**
- `checked` - ON/enabled state
- `unchecked` - OFF/disabled state
- `disabled` - Non-interactive state
- Pressed state animations with thumb scaling

✅ **Size Options**
- `sm` - Small (44px × 14px track, 20px thumb, 36px state layer)
- `md` - Medium (52px × 16px track, 24px thumb, 40px state layer, default)
- `lg` - Large (60px × 18px track, 28px thumb, 48px state layer)

✅ **Enhanced Interactions**
- Material Design 3 state layers for visual feedback
- Pressed state with thumb expansion animation
- Smooth track color transitions
- Interactive state layers that respond to hover, focus, and press

✅ **Accessibility Features**
- Full ARIA support with `role="switch"`
- Dynamic `aria-checked` states
- Keyboard navigation (Space/Enter key activation)
- High contrast focus indicators
- Screen reader compatible with state announcements

## Usage

### Basic Usage

```html
<my-toggle label="Enable notifications"></my-toggle>
```

### Checked State

```html
<my-toggle label="Auto-save enabled" checked></my-toggle>
```

### Different Sizes

```html
<my-toggle size="sm" label="Small toggle"></my-toggle>
<my-toggle size="md" label="Medium toggle"></my-toggle>
<my-toggle size="lg" label="Large toggle"></my-toggle>
```

### Disabled State

```html
<my-toggle label="Disabled option" disabled></my-toggle>
<my-toggle label="Disabled checked" checked disabled></my-toggle>
```

### Without Label (Icon Only)

```html
<my-toggle name="darkMode" value="enabled" aria-label="Dark mode toggle"></my-toggle>
```

### Form Integration

```html
<form id="settingsForm">
  <my-toggle name="notifications" value="on" label="Push notifications"></my-toggle>
  <my-toggle name="analytics" value="enabled" label="Usage analytics"></my-toggle>
  <my-toggle name="marketing" value="yes" label="Marketing emails"></my-toggle>
</form>
```

### Grouped Settings

```html
<fieldset>
  <legend>Privacy Settings</legend>
  <my-toggle name="cookies" label="Accept cookies" checked></my-toggle>
  <my-toggle name="tracking" label="Allow tracking"></my-toggle>
  <my-toggle name="personalization" label="Personalized ads"></my-toggle>
</fieldset>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | string | `""` | Toggle label text |
| `checked` | boolean | `false` | Checked/ON state |
| `disabled` | boolean | `false` | Disables the toggle |
| `name` | string | `""` | Form field name |
| `value` | string | `"on"` | Form field value when checked |
| `size` | string | `"md"` | Size variant (`sm`, `md`, `lg`) |

## Events

### `change`

Emitted when the toggle state changes.

```javascript
toggle.addEventListener('change', (event) => {
  console.log('Toggle changed:', event.detail);
  // event.detail contains: { checked, value, name }
});
```

**Event Detail Object:**
- `checked` (boolean) - Current checked state
- `value` (string|null) - Form value (null when unchecked)
- `name` (string) - Field name

## Methods

### `toggle()`

Programmatically toggle the switch state.

```javascript
const toggle = document.querySelector('my-toggle');
toggle.toggle(); // Switches between checked/unchecked
```

## CSS Custom Properties

The toggle component uses Material Design 3 design tokens and can be customized:

### Component-Specific Variables

```css
:host {
  /* Sizing */
  --_toggle-width: 52px;
  --_toggle-height: 32px;
  --_toggle-thumb-size: 24px;
  --_toggle-thumb-size-pressed: 28px;
  --_toggle-track-height: 16px;
  --_toggle-state-layer-size: 40px;
  
  /* Colors - Material Design 3 semantic tokens */
  --_toggle-bg-off: var(--_global-color-surface-container-highest);
  --_toggle-bg-on: var(--_global-color-primary);
  --_toggle-bg-disabled: var(--_global-color-surface-variant);
  --_toggle-border-off: 2px solid var(--_global-color-outline);
  --_toggle-border-on: 2px solid var(--_global-color-primary);
  --_toggle-border-disabled: 2px solid var(--_global-color-outline);
  --_toggle-thumb-color-off: var(--_global-color-outline);
  --_toggle-thumb-color-on: var(--_global-color-on-primary);
  --_toggle-thumb-color-disabled: var(--_global-color-surface);
  
  /* Effects */
  --_toggle-border-radius: var(--_global-border-radius-full);
  --_toggle-transition: all var(--_global-motion-duration-short2) var(--_global-motion-easing-emphasized);
}
```

### Material Design 3 Enhancements

The component includes several Material Design 3 specific features:

**State Layers:** Interactive feedback using opacity-based state layers
```css
.toggle-container::before {
  /* State layer implementation */
  opacity: var(--_global-state-layer-hover); /* on hover */
  opacity: var(--_global-state-layer-focus); /* on focus */
  opacity: var(--_global-state-layer-pressed); /* on press */
}
```

**Pressed State Animation:** Thumb expands on press for tactile feedback
```css
.toggle-container:active .toggle-thumb {
  width: var(--_toggle-thumb-size-pressed);
  height: var(--_toggle-thumb-size-pressed);
  transition-duration: var(--_global-motion-duration-short1);
}
```

**Track Transitions:** Smooth color and border transitions
```css
.toggle-track {
  background-color: var(--_toggle-bg-off);
  border: var(--_toggle-border-off);
  transition: var(--_toggle-transition);
}

.toggle-track.checked {
  background-color: var(--_toggle-bg-on);
  border: var(--_toggle-border-on);
}
```

### Customization Example

```css
/* Custom theme */
my-toggle[variant="success"] {
  --_toggle-bg-on: var(--_global-color-success);
  --_toggle-border-on: 2px solid var(--_global-color-success);
}

/* High contrast theme */
my-toggle[variant="high-contrast"] {
  --_toggle-border-off: 3px solid var(--_global-color-outline);
  --_toggle-border-on: 3px solid var(--_global-color-primary);
}
```

## Accessibility

- ✅ **ARIA Compliance** - Complete `role="switch"` implementation
- ✅ **Dynamic States** - `aria-checked="true|false"` for current state
- ✅ **Keyboard Navigation** - Space and Enter key activation
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
const toggle = document.createElement('my-toggle');
toggle.label = 'Dynamic Toggle';
toggle.checked = true;
document.body.appendChild(toggle);

toggle.addEventListener('change', (e) => {
  console.log('Toggle state:', e.detail.checked);
});
```

### React

```jsx
function ToggleExample() {
  const [isEnabled, setIsEnabled] = useState(false);
  
  const handleChange = (event) => {
    setIsEnabled(event.detail.checked);
  };
  
  return (
    <my-toggle
      label="Enable feature"
      checked={isEnabled}
      onChange={handleChange}
    />
  );
}
```

### Vue 3

```vue
<template>
  <my-toggle
    :checked="isEnabled"
    label="Enable feature"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue';

const isEnabled = ref(false);

const handleChange = (event) => {
  isEnabled.value = event.detail.checked;
};
</script>
```

### Angular

```typescript
// component.ts
export class ToggleComponent {
  isEnabled = false;
  
  onToggleChange(event: CustomEvent) {
    this.isEnabled = event.detail.checked;
  }
}
```

```html
<!-- template.html -->
<my-toggle
  [attr.checked]="isEnabled"
  label="Enable feature"
  (change)="onToggleChange($event)">
</my-toggle>
```

## Advanced Usage

### Settings Panel

```javascript
class SettingsPanel {
  constructor() {
    this.settings = {
      notifications: true,
      darkMode: false,
      autoSave: true
    };
    
    this.initializeToggles();
  }
  
  initializeToggles() {
    Object.keys(this.settings).forEach(settingName => {
      const toggle = document.querySelector(`my-toggle[name="${settingName}"]`);
      if (toggle) {
        toggle.checked = this.settings[settingName];
        toggle.addEventListener('change', (e) => {
          this.settings[settingName] = e.detail.checked;
          this.saveSettings();
        });
      }
    });
  }
  
  saveSettings() {
    localStorage.setItem('userSettings', JSON.stringify(this.settings));
  }
}
```

### Form Validation

```javascript
const form = document.querySelector('#preferences');
const privacyToggle = form.querySelector('my-toggle[name="privacy"]');

form.addEventListener('submit', (e) => {
  if (!privacyToggle.checked) {
    e.preventDefault();
    showDialog('Privacy policy must be accepted to continue');
  }
});
```

### Bulk Toggle Control

```javascript
// Master toggle that controls multiple sub-toggles
const masterToggle = document.querySelector('#master-notifications');
const subToggles = document.querySelectorAll('.notification-toggle');

masterToggle.addEventListener('change', (e) => {
  const isEnabled = e.detail.checked;
  subToggles.forEach(toggle => {
    toggle.checked = isEnabled;
    toggle.disabled = !isEnabled;
  });
});
```

## Material Design 3 Changelog

### Enhanced from Previous Version

✅ **Track and Thumb Styling**
- Updated to Material Design 3 track proportions (16px height default)
- Modern thumb styling with proper elevation shadows
- Smooth color transitions between states

✅ **State Layer System**
- Added Material Design 3 state layers for hover, focus, and pressed states
- Implemented proper circular state layer with size-appropriate hit targets
- Added smooth opacity transitions for visual feedback

✅ **Pressed State Animation**
- Added thumb expansion on press (24px → 28px for medium size)
- Smooth position adjustment during pressed state
- Enhanced tactile feedback with proper timing

✅ **Material Design 3 Color System**
- Updated to use semantic color tokens (primary, surface-container-highest, outline)
- Added surface variant support for proper contrast
- Implemented proper disabled state colors

✅ **Enhanced Motion**
- Added emphasized motion curves for track and thumb transitions
- Smooth state layer transitions with standard timing
- Coordinated animations between track color and thumb position

✅ **Improved Accessibility**
- Enhanced focus indicators with proper contrast
- Better keyboard navigation with state layer feedback
- Improved screen reader support with dynamic states

✅ **Size Variants**
- Added small and large size options
- Proportional track, thumb, and state layer sizing
- Consistent spacing and proportions across sizes

## Design System Integration

This component follows the MyntUI design system and automatically inherits:

- **Global color palette** from `--_global-color-*` variables
- **Typography system** from `--_global-font-*` variables  
- **Spacing system** from `--_global-spacing-*` variables
- **Motion system** from `--_global-motion-*` variables
- **State layer standards** from `--_global-state-layer-*` variables

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for complete design system documentation.
