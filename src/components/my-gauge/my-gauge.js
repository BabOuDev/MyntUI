/**
 * MyntUI my-gauge Component
 * Visualizes a single numerical value within a defined range, often with a radial or arc-shaped display
 * Enhanced version using MyntUIBaseComponent for improved consistency and maintainability
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';

class MyGauge extends MyntUIBaseComponent {
  constructor() {
    super();
    
    // Internal state
    this._value = 0;
    this._min = 0;
    this._max = 100;
    this._animationId = null;
    
    // Initialize with base component pattern
    this.log('Gauge component initializing...');
  }

  // Extended observed attributes (inherits base ones)
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'value', 'min', 'max', 'label', 'unit', 'show-value', 'animated', 'thresholds', 'tooltip', 'gradient'
    ];
  }

  // Component-specific attribute handling
  handleAttributeChange(name, oldValue, newValue) {
    super.handleAttributeChange(name, oldValue, newValue);
    
    switch (name) {
      case 'value':
        this._parseNumericValues();
        this.announceToScreenReader(
          `Gauge value changed to ${newValue} ${this.unit || ''}`,
          'polite'
        );
        // Only update gauge visuals for value changes
        setTimeout(() => this.updateGauge(), 0);
        return; // Don't trigger full re-render
      case 'min':
      case 'max':
        this._parseNumericValues();
        this.announceToScreenReader(
          `Gauge ${name} changed to ${newValue}`,
          'polite'
        );
        break;
      case 'thresholds':
        try {
          const thresholds = JSON.parse(newValue || '[]');
          this.log('Thresholds updated:', thresholds);
        } catch (error) {
          this.log('Invalid thresholds JSON:', error);
        }
        break;
    }
  }

  // Enhanced getters and setters with validation (inherits common ones from base)
  get value() {
    return this._value;
  }

  set value(value) {
    const numValue = Math.max(this.min, Math.min(this.max, parseFloat(value) || 0));
    
    if (this.validateAttribute('value', numValue, (v) => typeof v === 'number' && !isNaN(v))) {
      if (this.animated && this._value !== numValue) {
        this.animateToValue(numValue);
      } else {
        this._value = numValue;
        this.updateGauge();
        this.setAttribute('value', numValue.toString());
      }
      this.log('Value changed:', numValue);
    }
  }

  get min() {
    return this._min;
  }

  set min(value) {
    const numValue = parseFloat(value) || 0;
    if (this.validateAttribute('min', numValue, (v) => typeof v === 'number' && !isNaN(v))) {
      this._min = numValue;
      this.setAttribute('min', numValue.toString());
      this._parseNumericValues(); // Re-validate all values
    }
  }

  get max() {
    return this._max;
  }

  set max(value) {
    const numValue = parseFloat(value) || 100;
    if (this.validateAttribute('max', numValue, (v) => typeof v === 'number' && !isNaN(v))) {
      this._max = numValue;
      this.setAttribute('max', numValue.toString());
      this._parseNumericValues(); // Re-validate all values
    }
  }

  get label() {
    return this.getAttribute('label') || '';
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get unit() {
    return this.getAttribute('unit') || '';
  }

  set unit(value) {
    this.setAttribute('unit', value);
  }

  get size() {
    return this.getAttribute('size') || 'md';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  get variant() {
    return this.getAttribute('variant') || 'primary';
  }

  set variant(value) {
    this.setAttribute('variant', value);
  }

  get showValue() {
    return this.hasAttribute('show-value');
  }

  set showValue(value) {
    if (value) {
      this.setAttribute('show-value', '');
    } else {
      this.removeAttribute('show-value');
    }
  }

  get animated() {
    return this.hasAttribute('animated');
  }

  set animated(value) {
    if (value) {
      this.setAttribute('animated', '');
    } else {
      this.removeAttribute('animated');
    }
  }

  get thresholds() {
    const thresholdsAttr = this.getAttribute('thresholds');
    if (thresholdsAttr) {
      try {
        const parsed = JSON.parse(thresholdsAttr);
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        this.log('Invalid thresholds JSON:', error);
        this._handleError(error, 'thresholds parsing');
      }
    }
    return [];
  }

  set thresholds(value) {
    if (this.validateAttribute('thresholds', value, (v) => Array.isArray(v) || v === null || v === undefined)) {
      this.setAttribute('thresholds', JSON.stringify(value || []));
    }
  }

  get tooltip() {
    return this.getAttribute('tooltip') || '';
  }

  set tooltip(value) {
    this.setAttribute('tooltip', value);
  }

  get gradient() {
    return this.hasAttribute('gradient');
  }

  set gradient(value) {
    if (value) {
      this.setAttribute('gradient', '');
    } else {
      this.removeAttribute('gradient');
    }
  }

  // Calculate percentage
  get percentage() {
    if (this.max === this.min) return 0;
    return ((this._value - this.min) / (this.max - this.min)) * 100;
  }

  // Calculate angle for needle (in degrees)
  get angle() {
    const percentage = this.percentage;
    // Convert to angle: -90 to +90 degrees (180 degree arc)
    return -90 + (percentage * 180) / 100;
  }

  // Get current threshold status
  getCurrentThreshold() {
    const thresholds = this.thresholds;
    if (!thresholds || thresholds.length === 0) return null;
    
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (this._value >= thresholds[i].min) {
        return thresholds[i];
      }
    }
    return thresholds[0];
  }

  // Get color based on thresholds or variant
  getColor() {
    const threshold = this.getCurrentThreshold();
    if (threshold && threshold.color) {
      return threshold.color;
    }
    
    // Default colors based on variant
    switch (this.variant) {
      case 'success': return 'var(--_global-color-success)';
      case 'warning': return 'var(--_global-color-warning)';
      case 'error': return 'var(--_global-color-error)';
      case 'info': return 'var(--_global-color-info)';
      case 'secondary': return 'var(--_global-color-secondary)';
      default: return 'var(--_global-color-primary)';
    }
  }

  // Animate value change with spring physics
  animateToValue(targetValue) {
    if (this._animationId) {
      cancelAnimationFrame(this._animationId);
    }
    
    const startValue = this._value;
    const startTime = performance.now();
    const duration = 1200; // ms - increased for smoother spring animation
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Advanced spring physics with overshoot and settle
      let easedProgress;
      if (progress < 1) {
        const springStrength = 0.6;
        const damping = 0.8;
        easedProgress = 1 - Math.pow(2, -8 * progress) * Math.cos((progress * 8 - springStrength) * (2 * Math.PI) / 3);
      } else {
        easedProgress = 1;
      }
      
      const currentValue = startValue + (targetValue - startValue) * easedProgress;
      this._value = currentValue;
      this.updateGauge();
      
      if (progress < 1) {
        this._animationId = requestAnimationFrame(animate);
      } else {
        this._value = targetValue;
        this.setAttribute('value', targetValue.toString());
        this._animationId = null;
        this.triggerValueReachedEffect();
      }
    };
    
    this._animationId = requestAnimationFrame(animate);
  }

  // Update gauge visual elements with enhanced effects
  updateGauge() {
    const needle = this.shadowRoot.querySelector('.gauge-needle');
    const fill = this.shadowRoot.querySelector('.gauge-fill');
    const valueDisplay = this.shadowRoot.querySelector('.gauge-value');
    const gaugeContainer = this.shadowRoot.querySelector('.gauge-container');
    const track = this.shadowRoot.querySelector('.gauge-track');
    
    const color = this.getColor();
    const percentage = this.percentage;
    const intensity = percentage / 100;
    
    if (needle) {
      needle.style.transform = `rotate(${this.angle}deg)`;
      needle.style.filter = `
        drop-shadow(0 3px 8px ${color}60)
        drop-shadow(0 1px 4px rgba(0, 0, 0, 0.4))
      `;
      needle.style.transformOrigin = '50px 50px';
      
      // Add subtle pulsing effect at high values
      if (percentage > 80) {
        needle.style.animation = 'gauge-needle-pulse 2s var(--_global-spring-gentle) infinite alternate';
      } else {
        needle.style.animation = 'none';
      }
    }
    
    if (fill) {
      // Enhanced arc animation
      const circumference = Math.PI * 40;
      const offset = circumference - (circumference * percentage) / 100;
      fill.style.strokeDashoffset = offset.toString();
      
      // Dynamic gradient and glow based on value
      if (this.gradient) {
        fill.style.stroke = 'url(#gaugeGradient)';
      } else {
        fill.style.stroke = color;
      }
      
      // Enhanced glow and shadow effects
      fill.style.filter = `
        drop-shadow(0 0 ${4 + intensity * 8}px ${color}60)
        drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2))
        brightness(${1 + intensity * 0.1})
        saturate(${1 + intensity * 0.2})
      `;
      
      // Dynamic stroke width based on intensity
      const baseStrokeWidth = parseFloat(getComputedStyle(this).getPropertyValue('--_gauge-stroke-width')) || 12;
      fill.style.strokeWidth = `${baseStrokeWidth + intensity * 2}px`;
    }
    
    if (valueDisplay) {
      valueDisplay.textContent = `${this.formatValue(this._value)}${this.unit}`;
      valueDisplay.style.color = color;
      valueDisplay.style.textShadow = `0 0 ${4 + intensity * 8}px ${color}40`;
      
      // Scale animation for value changes
      valueDisplay.style.transform = `scale(${1 + intensity * 0.05})`;
    }
    
    // Enhanced container glow and shadow
    if (gaugeContainer) {
      const glowIntensity = Math.round(intensity * 40).toString(16).padStart(2, '0');
      gaugeContainer.style.boxShadow = `
        0 8px 32px ${color}${glowIntensity},
        var(--_gauge-shadow),
        inset 0 1px 0 rgba(255, 255, 255, 0.1)
      `;
    }
    
    // Dynamic track opacity based on progress
    if (track) {
      track.style.opacity = (0.2 + intensity * 0.15).toString();
    }
    
    // Update CSS custom properties for dynamic effects
    this.style.setProperty('--_gauge-current-intensity', intensity.toString());
    this.style.setProperty('--_gauge-current-color', color);
  }
  
  // Trigger effect when value reaches certain thresholds
  triggerValueReachedEffect() {
    const threshold = this.getCurrentThreshold();
    if (threshold) {
      const fill = this.shadowRoot.querySelector('.gauge-fill');
      if (fill) {
        fill.style.animation = 'gauge-threshold-reached 0.8s var(--_global-spring-wobbly) forwards';
        setTimeout(() => {
          fill.style.animation = '';
        }, 800);
      }
      
      this.emit('threshold-reached', {
        value: this._value,
        percentage: this.percentage,
        threshold: threshold
      });
    }
  }

  // Parse numeric values from attributes with validation
  _parseNumericValues() {
    this._min = parseFloat(this.getAttribute('min')) || 0;
    this._max = Math.max(this._min, parseFloat(this.getAttribute('max')) || 100);
    
    // Ensure min is not greater than max
    if (this._min > this._max) {
      this._min = this._max;
    }
    
    // Clamp value within bounds
    const rawValue = parseFloat(this.getAttribute('value')) || 0;
    this._value = Math.max(this._min, Math.min(this._max, rawValue));
  }

  // Override base connected callback
  onConnected() {
    this._parseNumericValues();
    this.log('Gauge component connected with values:', {
      value: this._value,
      min: this._min,
      max: this._max,
      thresholds: this.thresholds.length
    });
  }

  // Override base disconnected callback
  onDisconnected() {
    if (this._animationId) {
      cancelAnimationFrame(this._animationId);
      this._animationId = null;
    }
    this.log('Gauge component disconnected');
  }

  // Format display value
  formatValue(value) {
    if (Number.isInteger(value)) {
      return value.toString();
    }
    return value.toFixed(1);
  }

  // Attach event listeners using base component pattern
  attachEventListeners() {
    this.removeEventListeners(); // Clean up existing listeners
    
    const gaugeContainer = this.shadowRoot.querySelector('.gauge-container');
    if (!gaugeContainer) return;
    
    // Use base component's standardized event listener management
    this.addEventListeners([
      {
        element: gaugeContainer,
        events: ['click'],
        handler: this.handleClick.bind(this)
      },
      {
        element: gaugeContainer,
        events: ['keydown'],
        handler: this.handleKeyDown
      },
      {
        element: gaugeContainer,
        events: ['focus'],
        handler: this.handleFocus
      },
      {
        element: gaugeContainer,
        events: ['blur'],
        handler: this.handleBlur
      }
    ]);
  }

  // Handle click events on gauge
  handleClick(event) {
    if (this.disabled) return;
    
    // Emit gauge interaction event
    this.emit('gauge-click', {
      value: this._value,
      percentage: this.percentage,
      min: this.min,
      max: this.max,
      threshold: this.getCurrentThreshold()
    });
  }

  // Override base key handling for gauge-specific interactions
  handleKeyDown(event) {
    super.handleKeyDown(event);
    
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    const step = (this.max - this.min) / 100; // 1% steps
    let newValue = this._value;

    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        event.preventDefault();
        newValue = Math.min(this.max, this._value + step);
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        event.preventDefault();
        newValue = Math.max(this.min, this._value - step);
        break;
      case 'Home':
        event.preventDefault();
        newValue = this.min;
        break;
      case 'End':
        event.preventDefault();
        newValue = this.max;
        break;
      case 'PageUp':
        event.preventDefault();
        newValue = Math.min(this.max, this._value + step * 10);
        break;
      case 'PageDown':
        event.preventDefault();
        newValue = Math.max(this.min, this._value - step * 10);
        break;
    }

    if (newValue !== this._value) {
      this.value = newValue;
      this.emit('gauge-change', {
        value: newValue,
        percentage: this.percentage,
        oldValue: this._value
      });
    }
  }

  // Render the component
  render() {
    const color = this.getColor();
    const percentage = this.percentage;
    const circumference = Math.PI * 40; // Half circle
    const offset = circumference - (circumference * percentage) / 100;
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Component-specific variables using global variables */
          --_gauge-size-sm: 140px;
          --_gauge-size-md: 180px;
          --_gauge-size-lg: 240px;
          --_gauge-size: var(--_gauge-size-md);
          --_gauge-stroke-width: 12;
          --_gauge-stroke-width-bg: 8;
          --_gauge-needle-width: 3;
          --_gauge-bg-color: var(--_global-color-surface);
          --_gauge-track-color: var(--_global-color-surface-container-high);
          --_gauge-fill-color: var(--_global-color-primary);
          --_gauge-text-color: var(--_global-color-on-surface);
          --_gauge-label-color: var(--_global-color-on-surface-variant);
          --_gauge-range-color: var(--_global-color-on-surface-variant);
          --_gauge-needle-color: var(--_global-color-on-surface);
          --_gauge-shadow: var(--_global-elevation-3);
          --_gauge-transition: all var(--_global-motion-duration-medium2) var(--_global-motion-easing-emphasized);
          --_gauge-tooltip-bg: var(--_global-color-inverse-surface);
          --_gauge-tooltip-text: var(--_global-color-inverse-on-surface);
          --_gauge-glow-color: rgba(103, 80, 164, 0.3);
          --_gauge-pulse-duration: 2s;
          
          display: inline-block;
          width: var(--_gauge-size);
          height: calc(var(--_gauge-size) * 0.75);
          font-family: var(--_global-font-family-sans);
          background: linear-gradient(145deg, var(--_gauge-bg-color), var(--_global-color-surface-container-low));
          border-radius: var(--_global-border-radius-xl);
          box-shadow: var(--_gauge-shadow);
          padding: var(--_global-spacing-lg);
          box-sizing: border-box;
          position: relative;
          transition: var(--_gauge-transition);
          cursor: pointer;
          border: 1px solid var(--_global-color-outline-variant);
        }

        .gauge-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .gauge-svg {
          width: var(--_gauge-size);
          height: calc(var(--_gauge-size) * 0.6);
          overflow: visible;
        }

        .gauge-track {
          fill: none;
          stroke: var(--_gauge-track-color);
          stroke-width: var(--_gauge-stroke-width-bg);
          stroke-linecap: round;
          opacity: 0.3;
        }

        .gauge-fill {
          fill: none;
          stroke: ${this.gradient ? 'url(#gaugeGradient)' : color};
          stroke-width: var(--_gauge-stroke-width);
          stroke-linecap: round;
          stroke-dasharray: ${circumference};
          stroke-dashoffset: ${offset};
          transition: var(--_gauge-transition);
          transform: rotate(-180deg);
          transform-origin: center;
          filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.15));
        }

        .gauge-center {
          fill: var(--_gauge-bg-color);
          stroke: var(--_gauge-needle-color);
          stroke-width: var(--_gauge-needle-width);
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
        }

        .gauge-needle {
          fill: var(--_gauge-needle-color);
          transform-origin: 50px 50px;
          transform: rotate(${this.angle}deg);
          transition: var(--_gauge-transition);
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
        }

        .gauge-content {
          position: absolute;
          bottom: 20%;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          pointer-events: none;
        }

        .gauge-value {
          font-size: calc(var(--_gauge-size) * 0.14);
          font-weight: var(--_global-font-weight-bold);
          color: var(--_gauge-text-color);
          line-height: 1;
          margin-bottom: var(--_global-spacing-xs);
          transition: color var(--_global-motion-duration-short2) ease;
          font-variant-numeric: tabular-nums;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .gauge-label {
          font-size: calc(var(--_gauge-size) * 0.09);
          font-weight: var(--_global-font-weight-medium);
          color: var(--_gauge-label-color);
          line-height: 1;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .gauge-range {
          position: absolute;
          bottom: 8%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          justify-content: space-between;
          width: 85%;
          font-size: calc(var(--_gauge-size) * 0.07);
          font-weight: var(--_global-font-weight-medium);
          color: var(--_gauge-range-color);
          font-variant-numeric: tabular-nums;
        }

        .gauge-thresholds {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: var(--_global-spacing-xs);
          font-size: calc(var(--_gauge-size) * 0.055);
          color: var(--_global-color-text-muted);
        }

        .threshold-indicator {
          display: inline-flex;
          align-items: center;
          gap: 2px;
        }

        .threshold-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
        }

        /* Size variants */
        :host([size="sm"]) {
          --_gauge-size: var(--_gauge-size-sm);
          --_gauge-stroke-width: 6;
        }

        :host([size="lg"]) {
          --_gauge-size: var(--_gauge-size-lg);
          --_gauge-stroke-width: 10;
        }

        /* Disabled state */
        :host([disabled]) {
          opacity: 0.5;
          pointer-events: none;
        }

        /* Accessibility improvements - High Contrast Mode Support */
        @media (prefers-contrast: high) {
          .gauge-track {
            stroke: currentColor;
            opacity: 0.5;
            stroke-width: calc(var(--_gauge-stroke-width-bg) + 2px);
          }
          
          .gauge-fill {
            stroke-width: calc(var(--_gauge-stroke-width) + 2px);
            filter: none;
          }
          
          .gauge-needle {
            stroke: currentColor;
            stroke-width: 2px;
            filter: none;
          }
          
          .gauge-value,
          .gauge-label {
            font-weight: var(--_global-font-weight-bold);
            text-shadow: none;
          }
        }

        /* Accessibility improvements - Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          .gauge-fill,
          .gauge-needle,
          .gauge-value {
            animation: none;
            transition: none;
          }
        }

        /* Responsive adjustments */
        /* Enhanced hover effects with sophisticated micro-interactions */
        :host(:hover) {
          transform: translateY(-3px) scale(1.02);
          transition: transform var(--_global-motion-duration-medium2) var(--_global-spring-bouncy),
                      box-shadow var(--_global-motion-duration-medium2) var(--_global-motion-easing-emphasized);
          box-shadow: 
            var(--_global-shadow-interaction-strong),
            0 0 40px var(--_gauge-current-color, var(--_global-color-primary))30,
            var(--_gauge-shadow);
          cursor: pointer;
        }
        
        :host(:hover) .gauge-needle {
          filter: 
            drop-shadow(0 4px 12px rgba(0, 0, 0, 0.8))
            drop-shadow(0 0 8px var(--_gauge-current-color, var(--_global-color-primary))80);
          transition: filter var(--_global-motion-duration-medium1) var(--_global-spring-gentle);
          transform-origin: 50px 50px;
          animation: gauge-needle-hover-pulse 1.5s var(--_global-spring-gentle) infinite alternate;
        }
        
        :host(:hover) .gauge-fill {
          stroke-width: calc(var(--_gauge-stroke-width) + 2px);
          filter: 
            drop-shadow(0 0 16px var(--_gauge-current-color, var(--_global-color-primary))60)
            drop-shadow(0 4px 16px rgba(0, 0, 0, 0.3))
            brightness(1.15) 
            saturate(1.2) 
            contrast(1.05);
          transition: all var(--_global-motion-duration-medium1) var(--_global-spring-wobbly);
        }
        
        :host(:hover) .gauge-track {
          opacity: calc(0.2 + var(--_gauge-current-intensity, 0) * 0.2);
          stroke-width: calc(var(--_gauge-stroke-width-bg) + 1px);
          transition: all var(--_global-motion-duration-medium1) var(--_global-motion-easing-emphasized);
        }
        
        :host(:hover) .gauge-value {
          transform: scale(calc(1.05 + var(--_gauge-current-intensity, 0) * 0.1));
          text-shadow: 0 0 12px var(--_gauge-current-color, var(--_global-color-primary))50;
          transition: all var(--_global-motion-duration-medium1) var(--_global-spring-wobbly);
        }
        
        /* Enhanced active/pressed state with spring physics */
        :host(:active) {
          transform: translateY(-1px) scale(0.985);
          transition: transform var(--_global-motion-duration-short1) var(--_global-spring-energetic);
          box-shadow: 
            var(--_global-shadow-interaction-moderate),
            0 0 30px var(--_gauge-current-color, var(--_global-color-primary))40,
            inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        :host(:active) .gauge-fill {
          stroke-width: calc(var(--_gauge-stroke-width) + 3px);
          filter: 
            drop-shadow(0 0 20px var(--_gauge-current-color, var(--_global-color-primary))80)
            brightness(1.2) 
            saturate(1.3);
        }
        
        :host(:active) .gauge-needle {
          filter: 
            drop-shadow(0 5px 16px rgba(0, 0, 0, 0.9))
            drop-shadow(0 0 12px var(--_gauge-current-color, var(--_global-color-primary))90);
        }
        
        /* Enhanced focus state */
        :host(:focus-within) .gauge-container {
          box-shadow: 0 0 0 3px var(--_global-color-primary-container);
          transition: box-shadow var(--_global-motion-duration-short2) var(--_global-motion-easing-emphasized);
        }
        
        /* Enhanced pulse animations with sophisticated physics */
        @keyframes gauge-needle-pulse {
          0% {
            filter: 
              drop-shadow(0 3px 8px var(--_gauge-current-color, var(--_global-color-primary))60)
              drop-shadow(0 1px 4px rgba(0, 0, 0, 0.4));
          }
          100% {
            filter: 
              drop-shadow(0 4px 16px var(--_gauge-current-color, var(--_global-color-primary))80)
              drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6))
              brightness(1.1);
          }
        }
        
        @keyframes gauge-needle-hover-pulse {
          0% {
            filter: 
              drop-shadow(0 4px 12px rgba(0, 0, 0, 0.8))
              drop-shadow(0 0 8px var(--_gauge-current-color, var(--_global-color-primary))80);
          }
          100% {
            filter: 
              drop-shadow(0 6px 20px rgba(0, 0, 0, 0.9))
              drop-shadow(0 0 16px var(--_gauge-current-color, var(--_global-color-primary))90)
              brightness(1.05);
          }
        }
        
        @keyframes gauge-threshold-reached {
          0% {
            stroke-width: var(--_gauge-stroke-width);
            filter: none;
          }
          50% {
            stroke-width: calc(var(--_gauge-stroke-width) + 4px);
            filter: 
              drop-shadow(0 0 20px var(--_gauge-current-color, var(--_global-color-primary))90)
              brightness(1.3) 
              saturate(1.4);
          }
          100% {
            stroke-width: calc(var(--_gauge-stroke-width) + 1px);
            filter: 
              drop-shadow(0 0 12px var(--_gauge-current-color, var(--_global-color-primary))70)
              brightness(1.1);
          }
        }
        
        /* Tooltip styles */
        .gauge-tooltip {
          position: absolute;
          top: -45px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--_gauge-tooltip-bg);
          color: var(--_gauge-tooltip-text);
          padding: var(--_global-spacing-xs) var(--_global-spacing-sm);
          border-radius: var(--_global-border-radius-md);
          font-size: var(--_global-font-size-xs);
          font-weight: var(--_global-font-weight-medium);
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          z-index: 10;
          box-shadow: var(--_global-elevation-2);
        }
        
        .gauge-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 4px solid transparent;
          border-top-color: var(--_gauge-tooltip-bg);
        }
        
        :host(:hover) .gauge-tooltip {
          opacity: 1;
        }
        
        @media (max-width: 480px) {
          :host {
            --_gauge-size: var(--_gauge-size-sm);
          }
        }
      </style>

      <div class="gauge-container" 
           role="meter" 
           aria-valuenow="${this._value}"
           aria-valuemin="${this.min}"
           aria-valuemax="${this.max}"
           aria-label="${this.label || 'gauge'} - ${this.formatValue(this._value)}${this.unit}"
           ${this.getCurrentThreshold() ? `aria-describedby="threshold-${this.getCurrentThreshold().label || 'current'}"` : ''}
           ${this.tooltip ? `title="${this.tooltip}"` : ''}
           ${this.disabled ? 'aria-disabled="true"' : 'tabindex="0"'}
      >
        ${this.tooltip ? `<div class="gauge-tooltip">${this.tooltip}</div>` : ''}
        <svg class="gauge-svg" viewBox="0 0 100 60" aria-hidden="true">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:${color};stop-opacity:0.85" />
              <stop offset="25%" style="stop-color:color-mix(in srgb, ${color} 90%, white 10%);stop-opacity:0.95" />
              <stop offset="75%" style="stop-color:color-mix(in srgb, ${color} 85%, white 15%);stop-opacity:1" />
              <stop offset="100%" style="stop-color:${color};stop-opacity:0.9" />
            </linearGradient>
            <radialGradient id="gaugeNeedleGradient" cx="50%" cy="20%" r="80%">
              <stop offset="0%" style="stop-color:rgba(255, 255, 255, 0.9)" />
              <stop offset="100%" style="stop-color:var(--_gauge-needle-color)" />
            </radialGradient>
            <filter id="gaugeShadow">
              <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.3"/>
              <feDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity="0.2"/>
            </filter>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <!-- Track (background arc) -->
          <path class="gauge-track" 
                d="M 20,50 A 30,30 0 0,1 80,50" 
                stroke-dasharray="none"/>
          
          <!-- Fill arc -->
          <path class="gauge-fill" 
                d="M 20,50 A 30,30 0 0,1 80,50"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${offset}"
                filter="url(#glow)"/>
          
          <!-- Center circle -->
          <circle class="gauge-center" cx="50" cy="50" r="4"/>
          
          <!-- Enhanced needle with gradient and better shape -->
          <polygon class="gauge-needle" 
                   points="49,50 51,50 50.5,24 49.5,24"
                   fill="url(#gaugeNeedleGradient)"
                   filter="url(#gaugeShadow)"
                   transform="rotate(${this.angle} 50 50)"/>
        </svg>

        <div class="gauge-content">
          ${this.showValue ? `<div class="gauge-value">${this.formatValue(this._value)}${this.unit}</div>` : ''}
          ${this.label ? `<div class="gauge-label">${this.label}</div>` : ''}
        </div>

        <div class="gauge-range">
          <span>${this.formatValue(this.min)}</span>
          <span>${this.formatValue(this.max)}</span>
        </div>

        ${this.thresholds.length > 0 ? `
          <div class="gauge-thresholds">
            ${this.thresholds.map(threshold => `
              <div class="threshold-indicator">
                <span class="threshold-dot" style="background-color: ${threshold.color || color}"></span>
                <span>${threshold.label || threshold.min}+</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
    
    // Update gauge after render
    setTimeout(() => this.updateGauge(), 0);
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-gauge')) {
  customElements.define('my-gauge', MyGauge);
}