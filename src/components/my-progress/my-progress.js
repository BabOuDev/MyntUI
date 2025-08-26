/**
 * MyntUI my-progress Component
 * Displays the progress of a task or process, typically as a bar
 * Enhanced version using MyntUIBaseComponent with pure TailwindCSS and global config integration
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';
import { globalConfig } from '../../config/global-config.js';

class MyProgress extends MyntUIBaseComponent {
  constructor() {
    super();
    
    // Internal state
    this._value = 0;
    this._max = 100;
    this._min = 0;
    this._animationId = null;
    this._previousValue = 0;
    
    // Initialize with base component pattern
    this.log('Progress component initializing...');
  }

  // Extended observed attributes (inherits base ones)
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'value', 'max', 'min', 'label', 'indeterminate', 'show-value', 'animated', 'tooltip', 'buffer-value', 'type'
    ];
  }

  // Component-specific attribute handling
  handleAttributeChange(name, oldValue, newValue) {
    super.handleAttributeChange(name, oldValue, newValue);
    
    switch (name) {
      case 'value':
      case 'min':
      case 'max':
        this._parseNumericValues();
        this.announceToScreenReader(
          `Progress ${name} changed to ${newValue}${name === 'value' ? ` (${Math.round(this.percentage)}%)` : ''}`,
          'polite'
        );
        break;
      case 'indeterminate':
        this.announceToScreenReader(
          `Progress ${newValue !== null ? 'is loading' : 'value is ' + Math.round(this.percentage) + '%'}`,
          'polite'
        );
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
      if (this.animated && Math.abs(numValue - this._value) > 0.01) {
        this.animateToValue(numValue);
      } else {
        this._value = numValue;
        this.updateProgressVisuals();
      }
      this.setAttribute('value', numValue.toString());
      this.log('Value changed:', numValue);
    }
  }

  get max() {
    return this._max;
  }

  set max(value) {
    const numValue = Math.max(0, parseFloat(value) || 100);
    if (this.validateAttribute('max', numValue, (v) => typeof v === 'number' && !isNaN(v) && v >= 0)) {
      this._max = numValue;
      this.setAttribute('max', numValue.toString());
      this._parseNumericValues(); // Re-validate all values
    }
  }

  get min() {
    return this._min;
  }

  set min(value) {
    const numValue = Math.max(0, parseFloat(value) || 0);
    if (this.validateAttribute('min', numValue, (v) => typeof v === 'number' && !isNaN(v) && v >= 0)) {
      this._min = numValue;
      this.setAttribute('min', numValue.toString());
      this._parseNumericValues(); // Re-validate all values
    }
  }

  get label() {
    return this.getAttribute('label') || '';
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get variant() {
    return this.getAttribute('variant') || 'primary';
  }

  set variant(value) {
    this.setAttribute('variant', value);
  }

  get size() {
    return this.getAttribute('size') || 'md';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  get indeterminate() {
    return this.hasAttribute('indeterminate');
  }

  set indeterminate(value) {
    if (value) {
      this.setAttribute('indeterminate', '');
    } else {
      this.removeAttribute('indeterminate');
    }
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

  get tooltip() {
    return this.getAttribute('tooltip') || '';
  }

  set tooltip(value) {
    this.setAttribute('tooltip', value);
  }

  get bufferValue() {
    return parseFloat(this.getAttribute('buffer-value')) || 0;
  }

  set bufferValue(value) {
    this.setAttribute('buffer-value', value);
  }

  // Calculate percentage
  get percentage() {
    if (this.max === this.min) return 0;
    return ((this._value - this.min) / (this.max - this.min)) * 100;
  }
  
  // Calculate buffer percentage
  get bufferPercentage() {
    if (this.max === this.min) return 0;
    const bufferValue = Math.max(this.min, Math.min(this.max, this.bufferValue));
    return ((bufferValue - this.min) / (this.max - this.min)) * 100;
  }

  // Get TailwindCSS classes from global config
  getProgressClasses() {
    const config = globalConfig.get('theme.tailwind');
    const size = this.size || 'md';
    const variant = this.variant || 'primary';
    
    return {
      container: 'flex flex-col gap-2',
      header: 'flex justify-between items-center gap-4',
      label: 'text-sm font-medium text-surface-on-surface leading-tight',
      value: 'text-sm font-medium text-surface-on-surface-variant leading-tight font-mono',
      track: `relative w-full bg-surface-container-highest border border-outline-variant rounded-full overflow-hidden cursor-pointer transition-all duration-300 hover:bg-surface-container shadow-inner ${
        size === 'sm' ? 'h-1' : size === 'lg' ? 'h-2' : 'h-1.5'
      }`,
      fill: `h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden ${
        variant === 'success' ? 'bg-success' :
        variant === 'warning' ? 'bg-warning' :
        variant === 'error' ? 'bg-error' :
        variant === 'info' ? 'bg-info' :
        variant === 'secondary' ? 'bg-secondary' : 'bg-primary'
      }`,
      buffer: 'absolute top-0 left-0 h-full bg-current opacity-30 rounded-full transition-all duration-500',
      circularContainer: 'relative inline-flex items-center justify-center bg-gradient-to-br from-surface to-surface-container-low rounded-2xl border border-outline-variant shadow-elevation-3 p-6',
      circularSvg: 'transform -rotate-90 drop-shadow-lg',
      circularTrack: 'fill-none stroke-surface-container-high opacity-30',
      circularFill: `fill-none stroke-linecap-round transition-all duration-700 ease-out ${
        variant === 'success' ? 'stroke-success' :
        variant === 'warning' ? 'stroke-warning' :
        variant === 'error' ? 'stroke-error' :
        variant === 'info' ? 'stroke-info' :
        variant === 'secondary' ? 'stroke-secondary' : 'stroke-primary'
      }`,
      circularText: `absolute inset-0 flex items-center justify-center text-xs font-bold text-surface-on-surface font-mono ${
        size === 'sm' ? 'text-2xs' : size === 'lg' ? 'text-sm' : 'text-xs'
      }`
    };
  }

  // Get display value
  getDisplayValue() {
    if (this.indeterminate) {
      return 'Loading...';
    }
    
    const percentage = Math.round(this.percentage);
    return `${percentage}%`;
  }

  // Parse numeric values from attributes with validation
  _parseNumericValues() {
    this._max = Math.max(0, parseFloat(this.getAttribute('max')) || 100);
    this._min = Math.max(0, parseFloat(this.getAttribute('min')) || 0);
    
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
    this.log('Progress component connected with values:', {
      value: this._value,
      min: this._min,
      max: this._max
    });
  }

  // Override base disconnected callback
  onDisconnected() {
    if (this._animationId) {
      cancelAnimationFrame(this._animationId);
      this._animationId = null;
    }
    this.log('Progress component disconnected');
  }

  // Animate value change
  animateToValue(targetValue) {
    if (this._animationId) {
      cancelAnimationFrame(this._animationId);
    }
    
    const startValue = this._value;
    const startTime = performance.now();
    const duration = 600; // ms
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out cubic animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      this._value = startValue + (targetValue - startValue) * easedProgress;
      this.updateProgressVisuals();
      
      if (progress < 1) {
        this._animationId = requestAnimationFrame(animate);
      } else {
        this._value = targetValue;
        this._animationId = null;
      }
    };
    
    this._animationId = requestAnimationFrame(animate);
  }

  // Update progress visuals without full re-render
  updateProgressVisuals() {
    const progressFill = this.shadowRoot.querySelector('.progress-fill');
    const circularProgress = this.shadowRoot.querySelector('.circular-progress');
    const progressValue = this.shadowRoot.querySelector('.progress-value');
    const circularText = this.shadowRoot.querySelector('.circular-text');
    
    if (progressFill && !this.indeterminate) {
      progressFill.style.width = this.percentage + '%';
    }
    
    if (circularProgress && !this.indeterminate) {
      const circumference = 163.36;
      const offset = circumference - (circumference * this.percentage) / 100;
      circularProgress.style.strokeDashoffset = offset.toString();
    }
    
    if (progressValue) {
      progressValue.textContent = this.getDisplayValue();
    }
    
    if (circularText) {
      circularText.textContent = this.getDisplayValue();
    }
  }

  // Public method to programmatically update progress using base component pattern
  updateProgress(newValue, emitEvent = true) {
    const oldValue = this._value;
    const targetValue = Math.max(this.min, Math.min(this.max, parseFloat(newValue) || 0));
    
    if (this.animated && Math.abs(targetValue - this._value) > 0.01) {
      this.animateToValue(targetValue);
    } else {
      this._value = targetValue;
      this.updateProgressVisuals();
    }
    
    this.setAttribute('value', targetValue.toString());
    
    if (emitEvent && oldValue !== this._value) {
      // Use base component emit method
      this.emit('progress-change', {
        value: this._value,
        percentage: this.percentage,
        oldValue: oldValue,
        min: this.min,
        max: this.max
      });
    }
  }

  // Attach event listeners using base component pattern
  attachEventListeners() {
    this.removeEventListeners(); // Clean up existing listeners
    
    const progressTrack = this.shadowRoot.querySelector('.progress-track');
    if (!progressTrack) return;
    
    // Use base component's standardized event listener management
    this.addEventListeners([
      {
        element: progressTrack,
        events: ['click'],
        handler: this.handleClick.bind(this)
      },
      {
        element: progressTrack,
        events: ['keydown'],
        handler: this.handleKeyDown
      },
      {
        element: progressTrack,
        events: ['focus'],
        handler: this.handleFocus
      },
      {
        element: progressTrack,
        events: ['blur'],
        handler: this.handleBlur
      }
    ]);
  }

  // Handle click events on progress track
  handleClick(event) {
    if (this.disabled || this.indeterminate) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const clickPosition = (event.clientX - rect.left) / rect.width;
    const newValue = this.min + (this.max - this.min) * clickPosition;
    
    this.updateProgress(newValue);
  }

  // Render the component using TailwindCSS classes
  render() {
    const classes = this.getProgressClasses();
    const isCircular = this.getAttribute('type') === 'circular';
    const strokeWidth = this.size === 'sm' ? 4 : this.size === 'lg' ? 8 : 6;
    const radius = this.size === 'sm' ? 16 : this.size === 'lg' ? 28 : 22;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (circumference * this.percentage) / 100;

    this.shadowRoot.innerHTML = `
      <style>
        @import 'tailwindcss/base';
        @import 'tailwindcss/components';
        @import 'tailwindcss/utilities';
        
        :host {
          display: block;
          width: 100%;
          font-family: var(--_global-font-family-sans, system-ui);
        }

        /* Custom animations for progress effects */
        @keyframes progress-shine {
          0% { transform: translateX(-100%); }
          50%, 100% { transform: translateX(100%); }
        }
        @keyframes progress-indeterminate {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(400%); }
        }
        @keyframes progress-striped {
          0% { background-position-x: 0; }
          100% { background-position-x: 1rem; }
        }
        @keyframes circular-rotate {
          0% { 
            stroke-dashoffset: ${circumference};
            transform: rotate(0deg);
          }
          50% {
            stroke-dashoffset: ${circumference * 0.25};
            transform: rotate(450deg);
          }
          100% {
            stroke-dashoffset: ${circumference};
            transform: rotate(1080deg);
          }
        }
        
        /* Shine effect */
        .progress-fill::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: progress-shine 3s infinite;
        }
        
        /* Indeterminate state */
        .progress-fill.indeterminate {
          animation: progress-indeterminate 2s infinite ease-in-out;
          background: linear-gradient(90deg, transparent 0%, currentColor 25%, currentColor 75%, transparent 100%);
          width: 40% !important;
        }
        
        .progress-fill.indeterminate::before {
          display: none;
        }
        
        /* Circular indeterminate */
        .circular-progress.indeterminate {
          stroke-dasharray: ${circumference * 0.25};
          animation: circular-rotate 2s linear infinite;
        }
        
        /* Striped variant */
        .progress-striped {
          background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
          background-size: 1rem 1rem;
          animation: progress-striped 1s linear infinite;
        }
        
        /* Tooltip */
        .progress-tooltip {
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
        
        .progress-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 4px solid transparent;
          border-top-color: var(--_global-color-inverse-surface, #1f2937);
        }
        
        .progress-track:hover .progress-tooltip {
          opacity: 1;
        }
        
        /* Accessibility and reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .progress-fill,
          .progress-fill.indeterminate,
          .progress-fill::before,
          .circular-progress,
          .circular-progress.indeterminate {
            animation: none !important;
            transition: none !important;
          }
        }
        
        /* High contrast support */
        @media (prefers-contrast: high) {
          .progress-track {
            border: 2px solid currentColor;
          }
          
          .progress-fill {
            outline: 2px solid;
            outline-offset: -2px;
          }
        }
      </style>

      <div class="${classes.container}">
        ${this.label || this.showValue ? `
          <div class="${classes.header}">
            ${this.label ? `<span class="${classes.label}">${this.label}</span>` : ''}
            ${this.showValue ? `<span class="${classes.value}">${this.getDisplayValue()}</span>` : ''}
          </div>
        ` : ''}
        
        ${isCircular ? `
          <div class="${classes.circularContainer}" 
               role="progressbar" 
               aria-valuenow="${this.indeterminate ? undefined : this._value}"
               aria-valuemin="${this.min}"
               aria-valuemax="${this.max}"
               ${this.label ? `aria-label="${this.label}"` : ''}
               ${this.indeterminate ? 'aria-describedby="indeterminate-progress"' : ''}
               ${this.tooltip ? `title="${this.tooltip}"` : ''}
               tabindex="0"
          >
            ${this.tooltip ? `<div class="progress-tooltip">${this.tooltip}</div>` : ''}
            <svg class="${classes.circularSvg}" 
                 width="${this.size === 'sm' ? 48 : this.size === 'lg' ? 80 : 64}" 
                 height="${this.size === 'sm' ? 48 : this.size === 'lg' ? 80 : 64}" 
                 viewBox="0 0 ${this.size === 'sm' ? 48 : this.size === 'lg' ? 80 : 64} ${this.size === 'sm' ? 48 : this.size === 'lg' ? 80 : 64}">
              <defs>
                <linearGradient id="circularGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:currentColor;stop-opacity:0.9" />
                  <stop offset="50%" style="stop-color:color-mix(in srgb, currentColor 80%, white 20%);stop-opacity:1" />
                  <stop offset="100%" style="stop-color:currentColor;stop-opacity:0.95" />
                </linearGradient>
              </defs>
              <circle class="${classes.circularTrack}" 
                      cx="${this.size === 'sm' ? 24 : this.size === 'lg' ? 40 : 32}" 
                      cy="${this.size === 'sm' ? 24 : this.size === 'lg' ? 40 : 32}" 
                      r="${radius}"
                      stroke-width="${strokeWidth}"></circle>
              <circle class="${classes.circularFill} ${this.indeterminate ? 'indeterminate' : ''}" 
                      cx="${this.size === 'sm' ? 24 : this.size === 'lg' ? 40 : 32}" 
                      cy="${this.size === 'sm' ? 24 : this.size === 'lg' ? 40 : 32}" 
                      r="${radius}"
                      stroke-width="${strokeWidth}"
                      stroke-dasharray="${circumference}"
                      stroke-dashoffset="${this.indeterminate ? circumference * 0.75 : strokeDashoffset}"
                      fill="url(#circularGradient)"></circle>
            </svg>
            ${this.showValue ? `<span class="${classes.circularText}">${this.getDisplayValue()}</span>` : ''}
          </div>
        ` : `
          <div class="${classes.track} group" 
               role="progressbar" 
               aria-valuenow="${this.indeterminate ? undefined : this._value}"
               aria-valuemin="${this.min}"
               aria-valuemax="${this.max}"
               ${this.label ? `aria-label="${this.label}"` : ''}
               ${this.indeterminate ? 'aria-describedby="indeterminate-progress"' : ''}
               ${this.tooltip ? `title="${this.tooltip}"` : ''}
               tabindex="0"
          >
            ${this.bufferValue > 0 ? `
              <div class="${classes.buffer}" 
                   style="width: ${this.bufferPercentage}%"></div>
            ` : ''}
            ${this.tooltip ? `<div class="progress-tooltip">${this.tooltip}</div>` : ''}
            <div class="${classes.fill} ${this.indeterminate ? 'indeterminate' : ''} ${this.getAttribute('variant') === 'striped' ? 'progress-striped' : ''}" 
                 ${this.indeterminate ? 'id="indeterminate-progress"' : ''}
                 style="width: ${this.indeterminate ? '100%' : this.percentage + '%'}"></div>
          </div>
        `}
      </div>

      ${this.indeterminate ? '<div id="indeterminate-progress" class="sr-only">Loading in progress</div>' : ''}
    `;
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-progress')) {
  customElements.define('my-progress', MyProgress);
}