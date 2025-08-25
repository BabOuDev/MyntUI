# my-gauge

A Material Design 3 compliant gauge component that visualizes a single numerical value within a defined range using modern card-like containers, gradients, and interactive animations.

## Features

✅ **Material Design 3 Principles**
- Modern card-like containers with elevation and shadows
- Gradient fills and glow effects for visual depth
- Material Design 3 color system with semantic variants
- Enhanced typography with proper font weights and spacing

✅ **Visual Enhancements**
- SVG-based gauge with smooth needle animations
- Gradient fills with customizable color stops
- Glow and shadow effects for modern aesthetics
- Responsive sizing with consistent proportions

✅ **Multiple Variants**
- `primary` - Standard gauge color (default)
- `secondary` - Alternative color scheme
- `success` - Success/completion states
- `warning` - Warning/caution states
- `error` - Error/critical states
- `info` - Informational states

✅ **Size Options**
- `sm` - Small (140px width)
- `md` - Medium (180px width, default)
- `lg` - Large (240px width)

✅ **Advanced Features**
- Animated value transitions with easing
- Threshold-based color changes
- Min/max range support with custom scales
- Optional value display and unit labels
- Real-time value updates with smooth animations

✅ **Accessibility Features**
- Proper ARIA attributes for screen readers
- Keyboard accessible (when interactive)
- High contrast support
- Reduced motion support for animations

## Usage

### Basic Gauge

```html
<my-gauge value="75" max="100" label="CPU Usage" unit="%" show-value></my-gauge>
```

### Different Variants

```html
<my-gauge value="85" variant="success" label="Performance Score" show-value></my-gauge>
<my-gauge value="45" variant="warning" label="Memory Usage" unit="%" show-value></my-gauge>
<my-gauge value="95" variant="error" label="Temperature" unit="°C" show-value></my-gauge>
<my-gauge value="60" variant="info" label="Progress" show-value></my-gauge>
```

### Size Variants

```html
<my-gauge value="40" size="sm" label="Small Gauge" show-value></my-gauge>
<my-gauge value="60" size="md" label="Medium Gauge" show-value></my-gauge>
<my-gauge value="80" size="lg" label="Large Gauge" show-value></my-gauge>
```

### Custom Range

```html
<my-gauge value="2500" min="1000" max="5000" label="RPM" unit=" RPM" show-value></my-gauge>
```

### With Animation

```html
<my-gauge value="65" animated label="Loading Progress" show-value></my-gauge>
```

### Threshold-based Colors

```html
<my-gauge 
  value="75" 
  label="System Health"
  unit="%"
  show-value
  thresholds='[
    {"min": 0, "color": "var(--_global-color-error)", "label": "Critical"},
    {"min": 30, "color": "var(--_global-color-warning)", "label": "Low"},
    {"min": 70, "color": "var(--_global-color-success)", "label": "Good"},
    {"min": 90, "color": "var(--_global-color-primary)", "label": "Excellent"}
  ]'
></my-gauge>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | number | `0` | Current gauge value |
| `min` | number | `0` | Minimum value |
| `max` | number | `100` | Maximum value |
| `label` | string | `""` | Gauge label text |
| `unit` | string | `""` | Unit suffix (e.g., "%", "°C", "RPM") |
| `variant` | string | `"primary"` | Color variant (`primary`, `secondary`, `success`, `warning`, `error`, `info`) |
| `size` | string | `"md"` | Size variant (`sm`, `md`, `lg`) |
| `show-value` | boolean | `false` | Display current value |
| `animated` | boolean | `false` | Enable smooth value transitions |
| `thresholds` | string/array | `[]` | JSON array of threshold objects for color changes |

## Threshold Object Format

```javascript
{
  min: number,        // Minimum value for this threshold
  color: string,      // CSS color value
  label?: string      // Optional label for threshold
}
```

Example:
```javascript
[
  { min: 0, color: "#ef4444", label: "Critical" },
  { min: 30, color: "#f59e0b", label: "Warning" },
  { min: 70, color: "#10b981", label: "Good" }
]
```

## Methods

### `setValue(value, animated = true)`

Programmatically update the gauge value with optional animation.

```javascript
const gauge = document.querySelector('my-gauge');
gauge.setValue(85); // Smooth transition to 85
gauge.setValue(100, false); // Instant update to 100
```

### `animateToValue(targetValue)`

Animate gauge to a specific value with built-in easing.

```javascript
const gauge = document.querySelector('my-gauge');
gauge.animateToValue(75); // Animates with ease-out curve
```

## CSS Custom Properties

The gauge component uses Material Design 3 design tokens and can be customized:

### Component-Specific Variables

```css
:host {
  /* Sizing */
  --_gauge-size-sm: 140px;
  --_gauge-size-md: 180px;
  --_gauge-size-lg: 240px;
  --_gauge-stroke-width: 8;
  --_gauge-stroke-width-bg: 6;
  --_gauge-needle-width: 2;
  
  /* Colors - Material Design 3 semantic tokens */
  --_gauge-bg-color: var(--_global-color-surface-container);
  --_gauge-track-color: var(--_global-color-outline-variant);
  --_gauge-fill-color: var(--_global-color-primary);
  --_gauge-text-color: var(--_global-color-on-surface);
  --_gauge-label-color: var(--_global-color-on-surface-variant);
  --_gauge-range-color: var(--_global-color-on-surface-variant);
  --_gauge-needle-color: var(--_global-color-on-surface);
  
  /* Effects */
  --_gauge-shadow: var(--_global-elevation-1);
  --_gauge-transition: all var(--_global-motion-duration-medium2) var(--_global-motion-easing-emphasized);
}
```

### Material Design 3 Enhancements

The component includes several Material Design 3 specific features:

**Card-like Container:** Modern elevated surface with rounded corners
```css
:host {
  background: var(--_gauge-bg-color);
  border-radius: var(--_global-border-radius-lg);
  box-shadow: var(--_gauge-shadow);
  padding: var(--_global-spacing-md);
}
```

**Gradient Fills:** Dynamic gradients based on current value and thresholds
```css
.gauge-fill {
  stroke: url(#gaugeGradient);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}
```

**Enhanced Typography:** Proper font weights and text shadows
```css
.gauge-value {
  font-weight: var(--_global-font-weight-bold);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  font-variant-numeric: tabular-nums;
}
```

### Customization Example

```css
/* Custom theme */
my-gauge[variant="custom"] {
  --_gauge-fill-color: linear-gradient(45deg, #ff6b35, #f7931e);
  --_gauge-bg-color: var(--_global-color-surface-bright);
}

/* Minimal theme */
my-gauge[variant="minimal"] {
  --_gauge-shadow: none;
  --_gauge-bg-color: transparent;
}
```

## Accessibility

- ✅ **ARIA Compliance** - Proper `role="progressbar"` implementation
- ✅ **Value Announcements** - `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- ✅ **Screen Reader Support** - Descriptive labels and value formatting
- ✅ **High Contrast** - Maintains visibility in high contrast modes
- ✅ **Reduced Motion Support** - Respects `prefers-reduced-motion: reduce`
- ✅ **Keyboard Accessible** - Focusable when interactive features are enabled

## Browser Support

Works in all modern browsers that support:
- Custom Elements v1
- Shadow DOM v1
- CSS Custom Properties
- SVG and CSS Animations

**Minimum Versions:**
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Framework Integration

### Vanilla JavaScript

```javascript
const gauge = document.createElement('my-gauge');
gauge.label = 'System Performance';
gauge.value = 0;
gauge.unit = '%';
gauge.showValue = true;
gauge.animated = true;
document.body.appendChild(gauge);

// Simulate real-time updates
setInterval(() => {
  const newValue = Math.random() * 100;
  gauge.animateToValue(newValue);
}, 2000);
```

### React

```jsx
function GaugeExample() {
  const [value, setValue] = useState(0);
  const [thresholds] = useState([
    { min: 0, color: '#ef4444', label: 'Low' },
    { min: 30, color: '#f59e0b', label: 'Medium' },
    { min: 70, color: '#10b981', label: 'High' }
  ]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(Math.random() * 100);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <my-gauge
      value={value}
      label="Performance Score"
      unit="%"
      show-value
      animated
      thresholds={JSON.stringify(thresholds)}
    />
  );
}
```

### Vue 3

```vue
<template>
  <div class="gauge-dashboard">
    <my-gauge
      :value="cpuUsage"
      label="CPU Usage"
      unit="%"
      show-value
      animated
      variant="info"
      @value-change="handleValueChange"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const cpuUsage = ref(0);
let interval = null;

const handleValueChange = (event) => {
  console.log('Gauge value changed:', event.detail.value);
};

onMounted(() => {
  interval = setInterval(() => {
    cpuUsage.value = Math.random() * 100;
  }, 2000);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>
```

### Angular

```typescript
// component.ts
export class GaugeComponent implements OnInit, OnDestroy {
  cpuUsage = 0;
  memoryUsage = 0;
  private interval: any;
  
  thresholds = [
    { min: 0, color: 'var(--_global-color-success)', label: 'Normal' },
    { min: 50, color: 'var(--_global-color-warning)', label: 'High' },
    { min: 80, color: 'var(--_global-color-error)', label: 'Critical' }
  ];
  
  ngOnInit() {
    this.startMonitoring();
  }
  
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  
  private startMonitoring() {
    this.interval = setInterval(() => {
      this.cpuUsage = Math.random() * 100;
      this.memoryUsage = Math.random() * 100;
    }, 2500);
  }
}
```

```html
<!-- template.html -->
<div class="gauge-grid">
  <my-gauge
    [attr.value]="cpuUsage"
    [attr.thresholds]="thresholds | json"
    label="CPU Usage"
    unit="%"
    show-value
    animated>
  </my-gauge>
  
  <my-gauge
    [attr.value]="memoryUsage"
    label="Memory Usage"
    unit="%"
    show-value
    variant="secondary"
    animated>
  </my-gauge>
</div>
```

## Advanced Usage

### Real-time Monitoring Dashboard

```javascript
class MonitoringDashboard {
  constructor() {
    this.gauges = new Map();
    this.ws = null;
    this.initialize();
  }
  
  initialize() {
    // Create gauges for different metrics
    this.createGauge('cpu', {
      label: 'CPU Usage',
      unit: '%',
      thresholds: [
        { min: 0, color: '#10b981', label: 'Normal' },
        { min: 70, color: '#f59e0b', label: 'High' },
        { min: 90, color: '#ef4444', label: 'Critical' }
      ]
    });
    
    this.createGauge('memory', {
      label: 'Memory Usage',
      unit: '%',
      variant: 'info'
    });
    
    this.createGauge('disk', {
      label: 'Disk I/O',
      unit: ' MB/s',
      max: 1000,
      variant: 'secondary'
    });
    
    this.connectWebSocket();
  }
  
  createGauge(id, options) {
    const gauge = document.createElement('my-gauge');
    Object.assign(gauge, {
      showValue: true,
      animated: true,
      size: 'md',
      ...options
    });
    
    if (options.thresholds) {
      gauge.thresholds = options.thresholds;
    }
    
    document.getElementById(`${id}-gauge`).appendChild(gauge);
    this.gauges.set(id, gauge);
  }
  
  connectWebSocket() {
    this.ws = new WebSocket('wss://monitoring.example.com/metrics');
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.updateMetrics(data);
    };
  }
  
  updateMetrics(data) {
    Object.entries(data).forEach(([metricId, value]) => {
      const gauge = this.gauges.get(metricId);
      if (gauge) {
        gauge.animateToValue(value);
      }
    });
  }
}
```

### Performance Score Calculator

```javascript
class PerformanceScoreGauge {
  constructor(gaugeElement) {
    this.gauge = gaugeElement;
    this.metrics = {
      speed: 0,
      reliability: 0,
      usability: 0
    };
    
    this.setupGauge();
  }
  
  setupGauge() {
    this.gauge.label = 'Performance Score';
    this.gauge.unit = '/100';
    this.gauge.showValue = true;
    this.gauge.animated = true;
    this.gauge.size = 'lg';
    
    // Dynamic thresholds based on performance ranges
    this.gauge.thresholds = [
      { min: 0, color: '#ef4444', label: 'Poor' },
      { min: 40, color: '#f59e0b', label: 'Fair' },
      { min: 70, color: '#10b981', label: 'Good' },
      { min: 90, color: '#6366f1', label: 'Excellent' }
    ];
  }
  
  updateMetric(metricName, value) {
    if (this.metrics.hasOwnProperty(metricName)) {
      this.metrics[metricName] = Math.max(0, Math.min(100, value));
      this.calculateOverallScore();
    }
  }
  
  calculateOverallScore() {
    const weights = { speed: 0.4, reliability: 0.4, usability: 0.2 };
    const score = Object.entries(this.metrics)
      .reduce((total, [metric, value]) => {
        return total + (value * weights[metric]);
      }, 0);
    
    this.gauge.animateToValue(Math.round(score));
  }
}
```

### Battery Level Indicator

```javascript
class BatteryGauge {
  constructor(gaugeElement) {
    this.gauge = gaugeElement;
    this.battery = null;
    this.initialize();
  }
  
  async initialize() {
    if ('getBattery' in navigator) {
      this.battery = await navigator.getBattery();
      this.setupGauge();
      this.updateBatteryInfo();
      this.attachBatteryListeners();
    }
  }
  
  setupGauge() {
    this.gauge.label = 'Battery Level';
    this.gauge.unit = '%';
    this.gauge.showValue = true;
    this.gauge.animated = true;
    this.gauge.max = 100;
  }
  
  updateBatteryInfo() {
    const level = Math.round(this.battery.level * 100);
    this.gauge.animateToValue(level);
    
    // Update variant based on battery level and charging status
    if (this.battery.charging) {
      this.gauge.variant = 'info';
    } else if (level > 50) {
      this.gauge.variant = 'success';
    } else if (level > 20) {
      this.gauge.variant = 'warning';
    } else {
      this.gauge.variant = 'error';
    }
  }
  
  attachBatteryListeners() {
    this.battery.addEventListener('levelchange', () => {
      this.updateBatteryInfo();
    });
    
    this.battery.addEventListener('chargingchange', () => {
      this.updateBatteryInfo();
    });
  }
}
```

## Material Design 3 Changelog

### Enhanced from Previous Version

✅ **Modern Card Design**
- Added elevated card-like containers with proper shadows
- Rounded corners with Material Design 3 border radius tokens
- Surface container background for proper layering

✅ **Visual Enhancements**
- Gradient fills with customizable color stops and glow effects
- Enhanced needle design with proper shadows and depth
- Modern typography with improved font weights and spacing
- Tabular numerals for consistent value display

✅ **Interactive Animations**
- Smooth value transitions with easing curves
- Animated needle movement with emphasized motion timing
- Real-time threshold-based color changes
- Coordinated animations between needle, arc, and text elements

✅ **Material Design 3 Color System**
- Updated to use semantic color tokens for all variants
- Surface container backgrounds for proper elevation
- Enhanced contrast ratios for better accessibility
- Dynamic color changes based on thresholds

✅ **Enhanced Accessibility**
- Complete ARIA progressbar implementation
- Dynamic value announcements with units
- Proper labeling and state management
- High contrast mode support

✅ **Advanced Features**
- Threshold-based automatic color changes
- Configurable min/max ranges with proper scaling
- Real-time animation system with performance optimization
- Responsive sizing with consistent proportions

## Design System Integration

This component follows the MyntUI design system and automatically inherits:

- **Global color palette** from `--_global-color-*` variables
- **Typography system** from `--_global-font-*` variables  
- **Spacing system** from `--_global-spacing-*` variables
- **Motion system** from `--_global-motion-*` variables
- **Elevation system** from `--_global-elevation-*` variables

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for complete design system documentation.
