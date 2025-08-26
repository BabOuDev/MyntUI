/**
 * MyntUI my-gauge Component
 * Visualizes a single numerical value within a defined range, often with a radial or arc-shaped display
 * Enhanced version using MyntUIBaseComponent with pure TailwindCSS and global config integration
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';
import { globalConfig } from '../../config/global-config.js';

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

  // Get TailwindCSS classes from global config
  getGaugeClasses() {
    const config = globalConfig.get('theme.tailwind');
    const size = this.size || 'md';
    const variant = this.variant || 'primary';
    
    return {
      container: `relative inline-flex items-center justify-center bg-gradient-to-br from-surface to-surface-container-low rounded-2xl border border-outline-variant shadow-elevation-3 transition-all duration-300 hover:shadow-elevation-4 hover:-translate-y-1 hover:scale-105 focus-within:outline-2 focus-within:outline-primary cursor-pointer ${
        size === 'sm' ? 'w-36 h-28 p-4' : size === 'lg' ? 'w-60 h-44 p-8' : 'w-48 h-36 p-6'
      }`,
      svg: `transform -rotate-90 drop-shadow-lg transition-all duration-500 ${
        size === 'sm' ? 'w-24 h-24' : size === 'lg' ? 'w-40 h-40' : 'w-32 h-32'
      }`,
      track: `fill-none stroke-surface-container-high opacity-30 transition-all duration-300 ${
        size === 'sm' ? 'stroke-2' : size === 'lg' ? 'stroke-4' : 'stroke-3'
      }`,
      fill: `fill-none stroke-linecap-round transition-all duration-700 ease-out filter drop-shadow-sm ${
        variant === 'success' ? 'stroke-success' :
        variant === 'warning' ? 'stroke-warning' :
        variant === 'error' ? 'stroke-error' :
        variant === 'info' ? 'stroke-info' :
        variant === 'secondary' ? 'stroke-secondary' : 'stroke-primary'
      } ${
        size === 'sm' ? 'stroke-3' : size === 'lg' ? 'stroke-5' : 'stroke-4'
      }`,
      content: 'absolute inset-0 flex flex-col items-center justify-center pointer-events-none',
      value: `font-mono font-bold text-surface-on-surface transition-all duration-300 tabular-nums ${
        size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-2xl'
      }`,
      label: `font-medium text-surface-on-surface-variant text-center uppercase tracking-wide mt-1 ${
        size === 'sm' ? 'text-2xs' : size === 'lg' ? 'text-sm' : 'text-xs'
      }`,
      range: `absolute bottom-2 left-1/2 transform -translate-x-1/2 flex justify-between w-5/6 font-mono text-surface-on-surface-variant tabular-nums ${
        size === 'sm' ? 'text-2xs' : size === 'lg' ? 'text-xs' : 'text-2xs'
      }`,
      thresholds: `absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2 text-surface-on-surface-variant ${
        size === 'sm' ? 'text-3xs' : size === 'lg' ? 'text-xs' : 'text-2xs'
      }`,
      thresholdDot: 'inline-block w-1.5 h-1.5 rounded-full'
    };
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

  // Render the component using TailwindCSS classes
  render() {
    const classes = this.getGaugeClasses();
    const color = this.getColor();
    const percentage = this.percentage;
    const size = this.size || 'md';
    const radius = size === 'sm' ? 20 : size === 'lg' ? 35 : 28;
    const circumference = Math.PI * radius; // Half circle for gauge
    const offset = circumference - (circumference * percentage) / 100;
    const centerX = size === 'sm' ? 48 : size === 'lg' ? 80 : 64;
    const centerY = centerX;
    
    this.shadowRoot.innerHTML = `
      <style>
        @import 'tailwindcss/base';
        @import 'tailwindcss/components';
        @import 'tailwindcss/utilities';
        
        :host {
          display: inline-block;
          font-family: var(--_global-font-family-sans, system-ui);
        }
        
        /* Gauge needle animation */
        @keyframes gauge-needle-pulse {
          0% { filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4)); }
          100% { filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6)) brightness(1.1); }
        }
        
        @keyframes gauge-threshold-reached {
          0% { transform: scale(1); filter: none; }
          50% { transform: scale(1.05); filter: brightness(1.2) saturate(1.3); }
          100% { transform: scale(1.02); filter: brightness(1.1); }
        }
        
        /* Gauge needle */
        .gauge-needle {
          transform-origin: ${centerX}px ${centerY}px;
          transition: transform 0.7s ease-out, filter 0.3s ease;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
        }
        
        /* Tooltip */
        .gauge-tooltip {
          position: absolute;
          top: -2.5rem;
          left: 50%;
          transform: translateX(-50%);
          background: var(--_global-color-inverse-surface, #1f2937);
          color: var(--_global-color-inverse-on-surface, #f9fafb);
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-size: 0.75rem;
          font-weight: 500;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s;
          z-index: 10;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .gauge-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 4px solid transparent;
          border-top-color: var(--_global-color-inverse-surface, #1f2937);
        }
        
        /* Hover effects */
        :host(:hover) .gauge-tooltip {
          opacity: 1;
        }
        
        /* Accessibility and reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .gauge-needle,
          .gauge-fill {
            animation: none !important;
            transition: none !important;
          }
        }
        
        /* High contrast support */
        @media (prefers-contrast: high) {
          .gauge-track {
            stroke-width: calc(var(--gauge-track-width, 3) + 1px);
          }
          
          .gauge-fill {
            stroke-width: calc(var(--gauge-fill-width, 4) + 1px);
          }
        }
        
        /* Disabled state */
        :host([disabled]) {
          opacity: 0.5;
          pointer-events: none;
        }
      </style>

      <div class="${classes.container}" 
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
        <svg class="${classes.svg}" 
             width="${size === 'sm' ? 96 : size === 'lg' ? 160 : 128}" 
             height="${size === 'sm' ? 60 : size === 'lg' ? 100 : 80}" 
             viewBox="0 0 ${size === 'sm' ? 96 : size === 'lg' ? 160 : 128} ${size === 'sm' ? 60 : size === 'lg' ? 100 : 80}" 
             aria-hidden="true">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:${color};stop-opacity:0.85" />
              <stop offset="25%" style="stop-color:color-mix(in srgb, ${color} 90%, white 10%);stop-opacity:0.95" />
              <stop offset="75%" style="stop-color:color-mix(in srgb, ${color} 85%, white 15%);stop-opacity:1" />
              <stop offset="100%" style="stop-color:${color};stop-opacity:0.9" />
            </linearGradient>
            <radialGradient id="gaugeNeedleGradient" cx="50%" cy="20%" r="80%">
              <stop offset="0%" style="stop-color:rgba(255, 255, 255, 0.9)" />
              <stop offset="100%" style="stop-color:var(--_global-color-on-surface, #374151)" />
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
          <path class="${classes.track}" 
                d="M ${centerX * 0.4},${centerY * 0.8} A ${radius},${radius} 0 0,1 ${centerX * 1.6},${centerY * 0.8}" 
                stroke-dasharray="none"/>
          
          <!-- Fill arc -->
          <path class="${classes.fill}" 
                d="M ${centerX * 0.4},${centerY * 0.8} A ${radius},${radius} 0 0,1 ${centerX * 1.6},${centerY * 0.8}"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${offset}"
                fill="${this.gradient ? 'url(#gaugeGradient)' : 'none'}"
                stroke="${this.gradient ? 'url(#gaugeGradient)' : color}"
                filter="url(#glow)"/>
          
          <!-- Center circle -->
          <circle cx="${centerX}" cy="${centerY * 0.8}" r="4" 
                  fill="var(--_global-color-surface, #ffffff)" 
                  stroke="var(--_global-color-on-surface, #374151)" 
                  stroke-width="2" 
                  filter="url(#gaugeShadow)"/>
          
          <!-- Enhanced needle with gradient and better shape -->
          <polygon class="gauge-needle" 
                   points="${centerX - 1},${centerY * 0.8} ${centerX + 1},${centerY * 0.8} ${centerX + 0.5},${centerY * 0.4} ${centerX - 0.5},${centerY * 0.4}"
                   fill="url(#gaugeNeedleGradient)"
                   filter="url(#gaugeShadow)"
                   transform="rotate(${this.angle} ${centerX} ${centerY * 0.8})"/>
        </svg>

        <div class="${classes.content}">
          ${this.showValue ? `<div class="${classes.value}">${this.formatValue(this._value)}${this.unit}</div>` : ''}
          ${this.label ? `<div class="${classes.label}">${this.label}</div>` : ''}
        </div>

        <div class="${classes.range}">
          <span>${this.formatValue(this.min)}</span>
          <span>${this.formatValue(this.max)}</span>
        </div>

        ${this.thresholds.length > 0 ? `
          <div class="${classes.thresholds}">
            ${this.thresholds.map(threshold => `
              <div class="inline-flex items-center gap-1">
                <span class="${classes.thresholdDot}" style="background-color: ${threshold.color || color}"></span>
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