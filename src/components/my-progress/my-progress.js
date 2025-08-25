/**
 * MyntUI my-progress Component
 * Displays the progress of a task or process, typically as a bar
 * Enhanced version using MyntUIBaseComponent for improved consistency and maintainability
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';

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

  // Render the component
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Component-specific variables using global variables */
          --_progress-height-sm: 4px;
          --_progress-height-md: 6px;
          --_progress-height-lg: 8px;
          --_progress-height: var(--_progress-height-md);
          --_progress-border-radius: var(--_global-border-radius-full);
          --_progress-track-bg: var(--_global-color-surface-container-highest);
          --_progress-track-border: 1px solid var(--_global-color-outline-variant);
          --_progress-buffer-opacity: 0.3;
          --_progress-tooltip-bg: var(--_global-color-inverse-surface);
          --_progress-tooltip-text: var(--_global-color-inverse-on-surface);
          
          /* Variant colors - Material Design 3 semantic colors */
          --_progress-primary: var(--_global-color-primary);
          --_progress-primary-container: var(--_global-color-primary-container);
          --_progress-secondary: var(--_global-color-secondary);
          --_progress-secondary-container: var(--_global-color-secondary-container);
          --_progress-success: var(--_global-color-success);
          --_progress-success-container: var(--_global-color-success-container);
          --_progress-warning: var(--_global-color-warning);
          --_progress-warning-container: var(--_global-color-warning-container);
          --_progress-error: var(--_global-color-error);
          --_progress-error-container: var(--_global-color-error-container);
          --_progress-info: var(--_global-color-info);
          --_progress-info-container: var(--_global-color-info-container);
          
          /* Transition and animation */
          --_progress-transition: all var(--_global-motion-duration-medium1) var(--_global-motion-easing-emphasized);
          
          display: block;
          width: 100%;
          font-family: var(--_global-font-family-sans);
        }

        .progress-container {
          display: flex;
          flex-direction: column;
          gap: var(--_global-spacing-xs);
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--_global-spacing-sm);
        }

        .progress-label {
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-medium);
          color: var(--_global-color-on-surface);
          line-height: var(--_global-line-height-tight);
        }

        .progress-value {
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-medium);
          color: var(--_global-color-on-surface-variant);
          line-height: var(--_global-line-height-tight);
          font-variant-numeric: tabular-nums;
        }

        .progress-track {
          position: relative;
          width: 100%;
          height: var(--_progress-height);
          background-color: var(--_progress-track-bg);
          border: var(--_progress-track-border);
          border-radius: var(--_progress-border-radius);
          overflow: hidden;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }
        
        .progress-buffer {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background-color: var(--_progress-primary);
          opacity: var(--_progress-buffer-opacity);
          border-radius: var(--_progress-border-radius);
          transition: var(--_progress-transition);
          width: ${this.bufferPercentage}%;
        }

        .progress-fill {
          height: 100%;
          background-color: var(--_progress-primary);
          border-radius: var(--_progress-border-radius);
          transition: var(--_progress-transition);
          width: ${this.indeterminate ? '100%' : this.percentage + '%'};
          position: relative;
          overflow: hidden;
        }
        
        /* Add subtle gradient and shine effect */
        .progress-fill::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: progress-shine 3s infinite;
        }
        
        @keyframes progress-shine {
          0% {
            left: -100%;
          }
          50%,
          100% {
            left: 100%;
          }
        }
        
        /* Tooltip styles */
        .progress-tooltip {
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--_progress-tooltip-bg);
          color: var(--_progress-tooltip-text);
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
        
        .progress-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 4px solid transparent;
          border-top-color: var(--_progress-tooltip-bg);
        }
        
        .progress-track:hover .progress-tooltip {
          opacity: 1;
        }

        /* Indeterminate animation */
        .progress-fill.indeterminate {
          animation: progress-indeterminate 2s infinite var(--_global-motion-easing-standard);
          background: linear-gradient(
            90deg, 
            transparent 0%,
            var(--_progress-primary) 25%,
            var(--_progress-primary) 75%, 
            transparent 100%
          );
          width: 40%;
        }
        
        .progress-fill.indeterminate::before {
          display: none;
        }

        @keyframes progress-indeterminate {
          0% { 
            transform: translateX(-150%);
          }
          100% { 
            transform: translateX(400%);
          }
        }

        /* Size variants */
        :host([size="sm"]) {
          --_progress-height: var(--_progress-height-sm);
        }

        :host([size="lg"]) {
          --_progress-height: var(--_progress-height-lg);
        }

        /* Variant colors */
        :host([variant="primary"]) {
          --_progress-fill-color: var(--_progress-primary);
        }

        :host([variant="secondary"]) .progress-fill {
          background-color: var(--_progress-secondary);
        }

        :host([variant="success"]) .progress-fill {
          background-color: var(--_progress-success);
        }

        :host([variant="warning"]) .progress-fill {
          background-color: var(--_progress-warning);
        }

        :host([variant="error"]) .progress-fill {
          background-color: var(--_progress-error);
        }

        :host([variant="info"]) .progress-fill {
          background-color: var(--_progress-info);
        }

        /* Striped variant */
        :host([variant="striped"]) .progress-fill {
          background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.15) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.15) 75%,
            transparent 75%,
            transparent
          );
          background-size: 1rem 1rem;
          animation: progress-striped 1s linear infinite;
        }

        @keyframes progress-striped {
          0% {
            background-position-x: 0;
          }
          100% {
            background-position-x: 1rem;
          }
        }

        /* Pulsing variant */
        :host([variant="pulse"]) .progress-fill {
          animation: progress-pulse 2s ease-in-out infinite alternate;
        }

        @keyframes progress-pulse {
          0% {
            opacity: 0.6;
          }
          100% {
            opacity: 1;
          }
        }

        /* Accessibility improvements - High Contrast Mode Support */
        @media (prefers-contrast: high) {
          .progress-track {
            border: 2px solid currentColor;
            background-color: var(--_global-color-surface);
          }
          
          .progress-fill {
            outline: 2px solid;
            outline-offset: -2px;
          }
          
          .progress-label,
          .progress-value {
            font-weight: var(--_global-font-weight-bold);
          }
        }

        /* Accessibility improvements - Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          .progress-fill,
          .progress-fill.indeterminate,
          .progress-fill::before,
          .circular-progress,
          .circular-progress.indeterminate {
            animation: none;
            transition: none;
          }
        }

        /* Circular progress variant */
        :host([type="circular"]) .progress-track {
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          box-shadow: none;
          position: relative;
        }

        :host([type="circular"]) .progress-fill {
          display: none;
        }

        .circular-svg {
          width: 56px;
          height: 56px;
          transform: rotate(-90deg);
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        .circular-bg {
          fill: none;
          stroke: var(--_progress-track-bg);
          stroke-width: 6;
          opacity: 0.3;
        }

        .circular-progress {
          fill: none;
          stroke: var(--_progress-primary);
          stroke-width: 6;
          stroke-linecap: round;
          stroke-dasharray: 163.36;
          stroke-dashoffset: ${163.36 - (163.36 * this.percentage) / 100};
          transition: stroke-dashoffset var(--_progress-transition);
        }
        
        /* Circular indeterminate animation */
        .circular-progress.indeterminate {
          stroke-dasharray: 40.84;
          animation: circular-rotate 2s linear infinite;
        }
        
        @keyframes circular-rotate {
          0% {
            stroke-dashoffset: 163.36;
            transform: rotate(0deg);
          }
          50% {
            stroke-dashoffset: 40.84;
            transform: rotate(450deg);
          }
          100% {
            stroke-dashoffset: 163.36;
            transform: rotate(1080deg);
          }
        }

        .circular-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: var(--_global-font-size-xs);
          font-weight: var(--_global-font-weight-semibold);
          color: var(--_global-color-on-surface);
          font-variant-numeric: tabular-nums;
        }
        
        /* Circular size variants */
        :host([type="circular"][size="sm"]) .progress-track {
          height: 40px;
        }
        
        :host([type="circular"][size="sm"]) .circular-svg {
          width: 40px;
          height: 40px;
        }
        
        :host([type="circular"][size="sm"]) .circular-bg,
        :host([type="circular"][size="sm"]) .circular-progress {
          stroke-width: 4;
        }
        
        :host([type="circular"][size="lg"]) .progress-track {
          height: 72px;
        }
        
        :host([type="circular"][size="lg"]) .circular-svg {
          width: 72px;
          height: 72px;
        }
        
        :host([type="circular"][size="lg"]) .circular-bg,
        :host([type="circular"][size="lg"]) .circular-progress {
          stroke-width: 8;
        }

        /* Enhanced styling for better Material Design 3 alignment */
        .progress-container {
          position: relative;
        }
        
        .progress-track {
          box-sizing: border-box;
        }
        
        /* Enhanced hover and interaction states with micro-interactions */
        :host(:hover) {
          --_progress-track-bg: var(--_global-color-surface-container);
          transform: var(--_global-micro-translate-subtle);
          transition: transform var(--_global-motion-duration-short2) var(--_global-spring-gentle),
                      box-shadow var(--_global-motion-duration-short2) var(--_global-motion-easing-emphasized);
          box-shadow: var(--_global-shadow-interaction-subtle);
        }
        
        :host(:hover) .progress-fill {
          filter: brightness(1.08) saturate(1.1);
          transform: scaleY(1.1);
          transition: filter var(--_global-motion-duration-short2) var(--_global-spring-gentle),
                      transform var(--_global-motion-duration-short2) var(--_global-spring-wobbly);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        
        :host(:hover) .progress-buffer {
          opacity: calc(var(--_progress-buffer-opacity) + 0.1);
          transition: opacity var(--_global-motion-duration-short2) var(--_global-motion-easing-emphasized);
        }
        
        /* Enhanced active/pressed states */
        :host(:active) {
          transform: var(--_global-micro-translate-noticeable);
          transition: transform var(--_global-motion-duration-short1) var(--_global-spring-energetic);
        }
        
        :host(:active) .progress-fill {
          transform: scaleY(1.15);
          filter: brightness(1.12) saturate(1.15);
        }
        
        /* Focus states for accessibility */
        .progress-track:focus {
          outline: 2px solid var(--_global-color-primary);
          outline-offset: 2px;
        }
        
        .progress-track:focus-visible {
          outline: 2px solid var(--_global-color-primary);
          outline-offset: 2px;
        }
        
        /* Enhanced animation states */
        :host([animated]) .progress-fill {
          animation: progress-pulse 2s ease-in-out infinite alternate;
        }
        
        @keyframes progress-pulse {
          0% {
            filter: brightness(1) saturate(1);
          }
          100% {
            filter: brightness(1.05) saturate(1.05);
          }
        }
        
        /* Enhanced circular progress with better centering */
        :host([type="circular"]) .circular-text {
          font-feature-settings: 'tnum';
          letter-spacing: -0.02em;
        }
      </style>

      <div class="progress-container">
        ${this.label || this.showValue ? `
          <div class="progress-header">
            ${this.label ? `<span class="progress-label">${this.label}</span>` : ''}
            ${this.showValue ? `<span class="progress-value">${this.getDisplayValue()}</span>` : ''}
          </div>
        ` : ''}
        
        <div class="progress-track" role="progressbar" 
             aria-valuenow="${this.indeterminate ? undefined : this._value}"
             aria-valuemin="${this.min}"
             aria-valuemax="${this.max}"
             ${this.label ? `aria-label="${this.label}"` : ''}
             ${this.indeterminate ? 'aria-describedby="indeterminate-progress"' : ''}
             ${this.tooltip ? `title="${this.tooltip}"` : ''}
        >
          ${this.bufferValue > 0 ? `<div class="progress-buffer"></div>` : ''}
          ${this.tooltip ? `<div class="progress-tooltip">${this.tooltip}</div>` : ''}
          ${this.getAttribute('type') === 'circular' ? `
            <svg class="circular-svg" viewBox="0 0 60 60">
              <circle class="circular-bg" cx="30" cy="30" r="26"></circle>
              <circle class="circular-progress ${this.indeterminate ? 'indeterminate' : ''}" cx="30" cy="30" r="26"></circle>
            </svg>
            ${this.showValue ? `<span class="circular-text">${this.getDisplayValue()}</span>` : ''}
          ` : `
            <div class="progress-fill ${this.indeterminate ? 'indeterminate' : ''}" 
                 ${this.indeterminate ? 'id="indeterminate-progress"' : ''}></div>
          `}
        </div>
      </div>

      ${this.indeterminate ? '<div id="indeterminate-progress" style="display: none;">Loading in progress</div>' : ''}
    `;
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-progress')) {
  customElements.define('my-progress', MyProgress);
}