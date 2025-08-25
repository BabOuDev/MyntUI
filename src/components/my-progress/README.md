# my-progress

A Material Design 3 compliant progress indicator component that displays the progress of a task or process with advanced visual effects and animations.

## Features

✅ **Material Design 3 Principles**
- Gradients and shine effects for modern visual appeal
- Material Design 3 color system with semantic variants
- Smooth animations with proper motion curves
- Elevation and shadow effects for depth

✅ **Multiple Variants**
- `primary` - Standard progress indicator (default)
- `secondary` - Alternative color scheme
- `success` - Success/completion states
- `warning` - Warning/caution states
- `error` - Error/failure states
- `info` - Informational states
- `striped` - Animated striped pattern
- `pulse` - Pulsing animation effect

✅ **Progress Types**
- `linear` - Standard horizontal bar (default)
- `circular` - Radial/circular progress indicator
- `indeterminate` - Loading state with continuous animation

✅ **Size Options**
- `sm` - Small (4px height for linear, 40px diameter for circular)
- `md` - Medium (6px height for linear, 56px diameter for circular, default)
- `lg` - Large (8px height for linear, 72px diameter for circular)

✅ **Enhanced Features**
- Shine effect animation that sweeps across the progress bar
- Smooth value transitions with configurable animation
- Label and value display options
- Min/max range support with percentage calculation

## Usage

### Basic Progress Bar

```html
<my-progress value="65" max="100" label="Upload Progress"></my-progress>
```

### With Value Display

```html
<my-progress value="45" max="100" show-value label="Download Progress"></my-progress>
```

### Different Variants

```html
<my-progress value="80" variant="success" label="Completed"></my-progress>
<my-progress value="30" variant="warning" label="Storage Usage"></my-progress>
<my-progress value="95" variant="error" label="Critical Level"></my-progress>
<my-progress value="50" variant="info" label="Processing"></my-progress>
```

### Size Variants

```html
<my-progress value="40" size="sm" label="Small progress"></my-progress>
<my-progress value="60" size="md" label="Medium progress"></my-progress>
<my-progress value="80" size="lg" label="Large progress"></my-progress>
```

### Indeterminate (Loading) State

```html
<my-progress indeterminate label="Loading..."></my-progress>
```

### Circular Progress

```html
<my-progress type="circular" value="75" show-value></my-progress>
<my-progress type="circular" indeterminate size="sm"></my-progress>
```

### Striped and Animated Variants

```html
<my-progress value="60" variant="striped" label="Processing files"></my-progress>
<my-progress value="45" variant="pulse" label="Syncing data"></my-progress>
```

### Custom Range

```html
<my-progress value="150" min="0" max="200" label="Custom Range" show-value></my-progress>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | number | `0` | Current progress value |
| `min` | number | `0` | Minimum value |
| `max` | number | `100` | Maximum value |
| `label` | string | `""` | Progress label text |
| `variant` | string | `"primary"` | Color variant (`primary`, `secondary`, `success`, `warning`, `error`, `info`, `striped`, `pulse`) |
| `size` | string | `"md"` | Size variant (`sm`, `md`, `lg`) |
| `type` | string | `"linear"` | Progress type (`linear`, `circular`) |
| `indeterminate` | boolean | `false` | Indeterminate/loading state |
| `show-value` | boolean | `false` | Display percentage value |

## Methods

### `updateProgress(value, animated = true)`

Programmatically update the progress value with optional animation.

```javascript
const progress = document.querySelector('my-progress');
progress.updateProgress(85); // Smooth transition to 85%
progress.updateProgress(100, false); // Instant update to 100%
```

## CSS Custom Properties

The progress component uses Material Design 3 design tokens and can be customized:

### Component-Specific Variables

```css
:host {
  /* Sizing */
  --_progress-height-sm: 4px;
  --_progress-height-md: 6px;
  --_progress-height-lg: 8px;
  --_progress-border-radius: var(--_global-border-radius-full);
  
  /* Colors - Material Design 3 semantic tokens */
  --_progress-track-bg: var(--_global-color-surface-container-highest);
  --_progress-track-border: 1px solid var(--_global-color-outline-variant);
  --_progress-primary: var(--_global-color-primary);
  --_progress-secondary: var(--_global-color-secondary);
  --_progress-success: var(--_global-color-success);
  --_progress-warning: var(--_global-color-warning);
  --_progress-error: var(--_global-color-error);
  --_progress-info: var(--_global-color-info);
  
  /* Animation */
  --_progress-transition: all var(--_global-motion-duration-medium1) var(--_global-motion-easing-emphasized);
}
```

### Material Design 3 Enhancements

The component includes several Material Design 3 specific features:

**Shine Effect:** Animated shine that sweeps across the progress bar
```css
.progress-fill::before {
  content: '';
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: progress-shine 2s infinite;
}
```

**Gradient Fills:** Modern gradient effects for visual depth
```css
.progress-fill {
  background: linear-gradient(45deg, var(--_progress-primary), color-mix(in srgb, var(--_progress-primary) 80%, white));
}
```

**Elevation Effects:** Subtle shadows and borders for depth
```css
.progress-track {
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}
```

### Customization Example

```css
/* Custom gradient theme */
my-progress[variant="custom"] {
  --_progress-primary: linear-gradient(45deg, #ff6b35, #f7931e);
}

/* High contrast theme */
my-progress[variant="high-contrast"] {
  --_progress-track-bg: var(--_global-color-surface);
  --_progress-track-border: 2px solid var(--_global-color-outline);
}
```

## Accessibility

- ✅ **ARIA Compliance** - Complete `role="progressbar"` implementation
- ✅ **Dynamic States** - `aria-valuenow`, `aria-valuemin`, `aria-valuemax` attributes
- ✅ **Screen Reader Support** - Proper labeling and value announcements
- ✅ **Indeterminate Support** - `aria-describedby` for loading states
- ✅ **Reduced Motion Support** - Respects `prefers-reduced-motion: reduce`
- ✅ **High Contrast** - Maintains visibility in high contrast modes

## Browser Support

Works in all modern browsers that support:
- Custom Elements v1
- Shadow DOM v1
- CSS Custom Properties
- CSS Animations and Gradients

**Minimum Versions:**
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Framework Integration

### Vanilla JavaScript

```javascript
const progress = document.createElement('my-progress');
progress.label = 'File Upload';
progress.value = 0;
progress.showValue = true;
document.body.appendChild(progress);

// Simulate progress
let currentValue = 0;
const interval = setInterval(() => {
  currentValue += Math.random() * 10;
  if (currentValue >= 100) {
    currentValue = 100;
    clearInterval(interval);
  }
  progress.value = currentValue;
}, 500);
```

### React

```jsx
function ProgressExample() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const startProgress = () => {
    setIsLoading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newValue = prev + Math.random() * 15;
        if (newValue >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return newValue;
      });
    }, 300);
  };
  
  return (
    <div>
      <my-progress
        value={progress}
        label="Upload Progress"
        variant="success"
        show-value
        indeterminate={isLoading && progress === 0}
      />
      <button onClick={startProgress}>Start Upload</button>
    </div>
  );
}
```

### Vue 3

```vue
<template>
  <div>
    <my-progress
      :value="uploadProgress"
      label="File Upload"
      variant="primary"
      show-value
      :indeterminate="isUploading && uploadProgress === 0"
    />
    <button @click="simulateUpload">Start Upload</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const uploadProgress = ref(0);
const isUploading = ref(false);

const simulateUpload = () => {
  isUploading.value = true;
  uploadProgress.value = 0;
  
  const interval = setInterval(() => {
    uploadProgress.value += Math.random() * 12;
    
    if (uploadProgress.value >= 100) {
      uploadProgress.value = 100;
      isUploading.value = false;
      clearInterval(interval);
    }
  }, 400);
};
</script>
```

### Angular

```typescript
// component.ts
export class ProgressComponent implements OnInit {
  progress = 0;
  isLoading = false;
  
  startProgress() {
    this.isLoading = true;
    this.progress = 0;
    
    const interval = setInterval(() => {
      this.progress += Math.random() * 10;
      
      if (this.progress >= 100) {
        this.progress = 100;
        this.isLoading = false;
        clearInterval(interval);
      }
    }, 350);
  }
}
```

```html
<!-- template.html -->
<my-progress
  [attr.value]="progress"
  [attr.indeterminate]="isLoading && progress === 0"
  label="Processing"
  variant="info"
  show-value>
</my-progress>
```

## Advanced Usage

### Multi-Step Progress

```javascript
class MultiStepProgress {
  constructor(element, steps) {
    this.progress = element;
    this.steps = steps;
    this.currentStep = 0;
  }
  
  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.updateProgress();
    }
  }
  
  updateProgress() {
    const percentage = ((this.currentStep + 1) / this.steps.length) * 100;
    const currentStepLabel = this.steps[this.currentStep];
    
    this.progress.value = percentage;
    this.progress.label = `Step ${this.currentStep + 1}: ${currentStepLabel}`;
  }
}

// Usage
const steps = ['Validation', 'Processing', 'Saving', 'Complete'];
const multiProgress = new MultiStepProgress(
  document.querySelector('my-progress'),
  steps
);
```

### Real-time Data Sync

```javascript
class DataSyncProgress {
  constructor(progressElement) {
    this.progress = progressElement;
    this.ws = null;
  }
  
  connect() {
    this.ws = new WebSocket('wss://api.example.com/sync');
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.updateProgress(data);
    };
  }
  
  updateProgress(syncData) {
    const percentage = (syncData.processed / syncData.total) * 100;
    
    this.progress.value = percentage;
    this.progress.label = `Syncing ${syncData.type}`;
    
    // Change variant based on status
    if (syncData.hasErrors) {
      this.progress.variant = 'warning';
    } else if (percentage === 100) {
      this.progress.variant = 'success';
    }
  }
}
```

### Batch Operation Progress

```javascript
async function processBatch(items, progressElement) {
  progressElement.indeterminate = false;
  progressElement.value = 0;
  progressElement.max = items.length;
  
  for (let i = 0; i < items.length; i++) {
    progressElement.label = `Processing item ${i + 1} of ${items.length}`;
    
    try {
      await processItem(items[i]);
      progressElement.value = i + 1;
      
      // Update variant based on completion
      if (i + 1 === items.length) {
        progressElement.variant = 'success';
        progressElement.label = 'All items processed successfully';
      }
    } catch (error) {
      progressElement.variant = 'error';
      progressElement.label = `Error processing item ${i + 1}`;
      break;
    }
  }
}
```

## Material Design 3 Changelog

### Enhanced from Previous Version

✅ **Visual Effects**
- Added shine animation that sweeps across progress bars
- Implemented gradient fills for modern visual appeal
- Added subtle elevation shadows and inset borders
- Enhanced color vibrancy with proper contrast ratios

✅ **Animation System**
- Smooth progress transitions with emphasized motion curves
- Indeterminate animations with proper timing and easing
- Striped and pulse variant animations
- Coordinated shine effects with progress updates

✅ **Material Design 3 Color System**
- Updated to use semantic color tokens for all variants
- Added surface-container-highest for track backgrounds
- Proper outline-variant for borders and dividers
- Enhanced contrast in all color combinations

✅ **Circular Progress**
- Modern SVG-based circular progress implementation
- Gradient strokes with glow effects
- Smooth rotation animations for indeterminate state
- Responsive sizing with proper proportions

✅ **Enhanced Accessibility**
- Complete ARIA progressbar implementation
- Dynamic value announcements for screen readers
- Proper labeling for indeterminate states
- Reduced motion support for all animations

✅ **Advanced Features**
- Multiple progress types (linear, circular)
- Configurable min/max ranges
- Show/hide value display options
- Striped and pulse animation variants

## Design System Integration

This component follows the MyntUI design system and automatically inherits:

- **Global color palette** from `--_global-color-*` variables
- **Typography system** from `--_global-font-*` variables  
- **Spacing system** from `--_global-spacing-*` variables
- **Motion system** from `--_global-motion-*` variables
- **Elevation system** from `--_global-elevation-*` variables

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for complete design system documentation.
