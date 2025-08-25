# my-sparkline

A small, simple line chart without axes or labels, designed to show trends in data within a compact space. Perfect for dashboards and inline data visualization.

## Features

- **Compact Design**: Minimal space usage while showing data trends effectively
- **Multiple Variants**: Line, area, dots, and smooth curve options
- **Material Design 3**: Follows Material Design principles with proper theming
- **Animations**: Optional smooth drawing animations
- **Responsive**: Adapts to different sizes and screen densities
- **Accessibility**: Screen reader friendly with proper ARIA labels
- **Performance**: Efficient SVG rendering with minimal DOM manipulation

## Usage

### Basic Sparkline

```html
<my-sparkline data='[1, 4, 2, 8, 5, 7, 3]'></my-sparkline>
```

### With Custom Styling

```html
<my-sparkline 
  data='[12, 19, 3, 5, 2, 3, 15, 8, 12, 6]'
  color="#007bff"
  width="200"
  height="60"
  line-width="3"
  animated
></my-sparkline>
```

### Area Chart with Gradient

```html
<my-sparkline 
  data='[1, 3, 2, 8, 5, 9, 4]'
  variant="success"
  fill
  gradient
  smooth
  size="lg"
></my-sparkline>
```

### With Data Points

```html
<my-sparkline 
  data='[10, 15, 12, 18, 14, 16, 11]'
  dots
  smooth
  animated
></my-sparkline>
```

## Properties

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data` | `string` | `[]` | JSON array of numbers to visualize |
| `color` | `string` | `var(--_global-color-primary)` | Color of the line and fill |
| `width` | `number` | `120` | Width in pixels |
| `height` | `number` | `40` | Height in pixels |
| `line-width` | `number` | `2` | Stroke width of the line |
| `animated` | `boolean` | `false` | Enable draw-in animation |
| `variant` | `string` | `line` | Visual variant (line, success, warning, error, info) |
| `size` | `string` | `md` | Predefined size (sm, md, lg) |
| `fill` | `boolean` | `false` | Fill area under the line |
| `gradient` | `boolean` | `false` | Use gradient fill (requires fill=true) |
| `dots` | `boolean` | `false` | Show dots at data points |
| `smooth` | `boolean` | `false` | Use smooth curves instead of straight lines |

### JavaScript Properties

```javascript
const sparkline = document.querySelector('my-sparkline');

// Data manipulation
sparkline.data = [1, 5, 3, 8, 4, 6, 2];

// Styling
sparkline.color = '#ff6b6b';
sparkline.width = 180;
sparkline.height = 50;

// Features
sparkline.animated = true;
sparkline.smooth = true;
sparkline.fill = true;
```

## Size Variants

| Size | Width | Height | Use Case |
|------|-------|--------|----------|
| `sm` | 80px | 24px | Inline metrics, tables |
| `md` | 120px | 40px | Cards, summaries (default) |
| `lg` | 160px | 56px | Prominent displays |

## Color Variants

| Variant | Color | Use Case |
|---------|-------|----------|
| `default` | Primary theme color | General data |
| `success` | Green | Positive metrics, growth |
| `warning` | Orange | Caution metrics |
| `error` | Red | Negative metrics, alerts |
| `info` | Blue | Informational data |

## Styling

### CSS Custom Properties

```css
my-sparkline {
  --_sparkline-color: #007bff;
  --_sparkline-line-width: 2px;
  --_sparkline-transition: all 0.15s ease;
}
```

### Custom Colors

```css
.revenue-sparkline {
  --_sparkline-color: var(--color-revenue);
}

.users-sparkline {
  --_sparkline-color: var(--color-users);
}
```

## Data Format

The `data` attribute accepts a JSON array of numbers:

```javascript
// Simple array
[1, 2, 3, 4, 5]

// Real-world example - daily sales
[120, 150, 130, 180, 165, 200, 175]

// Percentage values
[85.5, 87.2, 86.8, 89.1, 88.5, 90.2, 89.8]
```

## Examples

### Dashboard Metrics

```html
<div class="metrics-grid">
  <div class="metric-card">
    <h3>Revenue</h3>
    <span class="value">$12,345</span>
    <my-sparkline 
      data='[1000, 1200, 1100, 1400, 1350, 1500, 1245]'
      variant="success"
      size="sm"
      fill
    ></my-sparkline>
  </div>
  
  <div class="metric-card">
    <h3>Users</h3>
    <span class="value">1,234</span>
    <my-sparkline 
      data='[800, 900, 850, 950, 920, 1000, 1234]'
      variant="info"
      size="sm"
      animated
    ></my-sparkline>
  </div>
</div>
```

### Interactive Chart

```html
<my-sparkline id="interactive-chart" animated smooth dots></my-sparkline>

<script>
const chart = document.getElementById('interactive-chart');

// Update with live data
setInterval(() => {
  const newValue = Math.random() * 100;
  const currentData = chart.data;
  currentData.push(newValue);
  
  // Keep only last 20 points
  if (currentData.length > 20) {
    currentData.shift();
  }
  
  chart.data = [...currentData];
}, 1000);
</script>
```

## Browser Support

- Chrome 54+
- Firefox 63+
- Safari 10+
- Edge 79+

## Performance

- Lightweight: ~8KB minified
- Efficient SVG rendering
- No external dependencies
- Smooth 60fps animations
- Memory efficient for large datasets

## Accessibility

- Screen reader support with ARIA labels
- High contrast mode support
- Reduced motion support
- Keyboard navigation (when interactive)
- Semantic HTML structure