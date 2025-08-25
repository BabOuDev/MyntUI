# my-tooltip Component

A Material Design 3 tooltip component that provides contextual information on hover or focus.

## Features

- Material Design 3 styling with elevation shadows
- Multiple positioning options with auto-collision detection
- Color variants (dark, light, primary, error)
- Size variants (sm, md, lg)
- Smooth scale animations
- Multiline text support
- Accessibility compliant
- Framework agnostic

## Usage

### Basic Usage

```html
<my-tooltip text="This is a helpful tooltip">
  <button>Hover me</button>
</my-tooltip>
```

### Different Positions

```html
<my-tooltip text="Top tooltip" position="top">
  <button>Top</button>
</my-tooltip>

<my-tooltip text="Bottom tooltip" position="bottom">
  <button>Bottom</button>
</my-tooltip>

<my-tooltip text="Left tooltip" position="left">
  <button>Left</button>
</my-tooltip>

<my-tooltip text="Right tooltip" position="right">
  <button>Right</button>
</my-tooltip>

<my-tooltip text="Auto positioned" position="auto">
  <button>Auto</button>
</my-tooltip>
```

### Color Variants

```html
<my-tooltip text="Dark tooltip (default)" variant="dark">
  <button>Dark</button>
</my-tooltip>

<my-tooltip text="Light tooltip" variant="light">
  <button>Light</button>
</my-tooltip>

<my-tooltip text="Primary tooltip" variant="primary">
  <button>Primary</button>
</my-tooltip>

<my-tooltip text="Error tooltip" variant="error">
  <button>Error</button>
</my-tooltip>
```

### Size Variants

```html
<my-tooltip text="Small tooltip" size="sm">
  <button>Small</button>
</my-tooltip>

<my-tooltip text="Medium tooltip" size="md">
  <button>Medium</button>
</my-tooltip>

<my-tooltip text="Large tooltip" size="lg">
  <button>Large</button>
</my-tooltip>
```

### Multiline Content

```html
<my-tooltip 
  text="This is a longer tooltip that will wrap to multiple lines"
  multiline
>
  <button>Multiline</button>
</my-tooltip>
```

### Rich Content with Slots

```html
<my-tooltip>
  <button slot="">Rich Content</button>
  <div slot="content">
    <strong>Rich Tooltip</strong><br>
    With <em>formatted</em> text
  </div>
</my-tooltip>
```

### Custom Delay

```html
<my-tooltip text="Fast tooltip" delay="200">
  <button>Fast</button>
</my-tooltip>

<my-tooltip text="Slow tooltip" delay="1000">
  <button>Slow</button>
</my-tooltip>
```

### Disabled State

```html
<my-tooltip text="This won't show" disabled>
  <button>Disabled Tooltip</button>
</my-tooltip>
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `text` | string | `""` | The tooltip text content |
| `position` | string | `"top"` | Position: `"top"`, `"bottom"`, `"left"`, `"right"`, `"auto"` |
| `variant` | string | `"dark"` | Color variant: `"dark"`, `"light"`, `"primary"`, `"error"` |
| `size` | string | `"md"` | Size variant: `"sm"`, `"md"`, `"lg"` |
| `delay` | number | `500` | Show delay in milliseconds |
| `disabled` | boolean | `false` | Whether the tooltip is disabled |
| `multiline` | boolean | `false` | Whether to allow multiline text |

## Methods

| Method | Description |
|--------|-------------|
| `showTooltip()` | Show the tooltip immediately |
| `hideTooltip()` | Hide the tooltip immediately |
| `positionTooltip()` | Recalculate and update tooltip position |

## CSS Custom Properties

The component uses the global design system variables and exposes these for customization:

```css
my-tooltip {
  --_tooltip-bg-dark: var(--_global-color-on-surface);
  --_tooltip-text-color-dark: var(--_global-color-surface);
  --_tooltip-border-radius: var(--_global-border-radius-sm);
  --_tooltip-z-index: var(--_global-z-index-tooltip);
  --_tooltip-arrow-size: 6px;
  --_tooltip-elevation: var(--_global-elevation-2);
}
```

## Positioning Logic

The tooltip automatically positions itself to stay within the viewport:

- **Auto positioning**: Chooses the position with the most available space
- **Collision detection**: Adjusts horizontal/vertical position to avoid viewport edges
- **Smart arrows**: Arrows automatically adjust color to match tooltip background

## Accessibility

- Implements proper `tooltip` role
- ARIA attributes for screen readers
- Keyboard navigation support (Escape to close)
- Focus and hover triggers
- Reduced motion support
- High contrast mode support

## Browser Support

Works in all modern browsers that support:
- Web Components
- CSS Custom Properties
- ES6 Classes

## Related Components

- `my-dropdown` - For actionable popup content
- `my-modal` - For larger contextual content