/**
 * MyntUI my-progress Component
 * Displays the progress of a task or process, typically as a bar
 */

class MyProgress extends HTMLElement {
  constructor() {
    super();
    
    // Create Shadow DOM for encapsulation
    this.attachShadow({ mode: 'open' });
    
    // Internal state
    this._value = 0;
    this._max = 100;
    this._min = 0;
    
    // Initialize component
    this.render();
  }

  // Define which attributes to observe for changes
  static get observedAttributes() {
    return ['value', 'max', 'min', 'label', 'variant', 'size', 'indeterminate', 'show-value'];
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  // Getters and setters
  get value() {
    return this._value;
  }

  set value(value) {
    const numValue = Math.max(this.min, Math.min(this.max, parseFloat(value) || 0));
    this._value = numValue;
    this.setAttribute('value', numValue.toString());
  }

  get max() {
    return this._max;
  }

  set max(value) {
    this._max = Math.max(0, parseFloat(value) || 100);
    this.setAttribute('max', this._max.toString());
    // Recalculate value to ensure it's within bounds
    this.value = this._value;
  }

  get min() {
    return this._min;
  }

  set min(value) {
    this._min = Math.max(0, parseFloat(value) || 0);
    this.setAttribute('min', this._min.toString());
    // Recalculate value to ensure it's within bounds
    this.value = this._value;
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

  // Calculate percentage
  get percentage() {
    if (this.max === this.min) return 0;
    return ((this._value - this.min) / (this.max - this.min)) * 100;
  }

  // Get display value
  getDisplayValue() {
    if (this.indeterminate) {
      return 'Loading...';
    }
    
    const percentage = Math.round(this.percentage);
    return `${percentage}%`;
  }

  // Connected callback - ensures proper initialization
  connectedCallback() {
    // Parse initial values from attributes
    this._max = parseFloat(this.getAttribute('max')) || 100;
    this._min = parseFloat(this.getAttribute('min')) || 0;
    this._value = Math.max(this._min, Math.min(this._max, parseFloat(this.getAttribute('value')) || 0));
    
    // Re-render with parsed values
    this.render();
  }

  // Standardized lifecycle cleanup - part of MyntUI component pattern
  disconnectedCallback() {
    // Clean up any running timers or animations if needed
    // Currently no cleanup needed for progress component, but following pattern
  }

  // Public method to programmatically update progress
  updateProgress(newValue, emitEvent = true) {
    const oldValue = this._value;
    this.value = newValue;
    
    if (emitEvent && oldValue !== this._value) {
      // Emit progress update event for external listeners
      this.dispatchEvent(new CustomEvent('progress-change', {
        detail: {
          value: this._value,
          percentage: this.percentage,
          oldValue: oldValue,
          min: this.min,
          max: this.max
        },
        bubbles: true
      }));
    }
    
    this.render();
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
          animation: progress-shine 2s infinite;
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
        
        /* Better container states */
        :host(:hover) .progress-fill {
          filter: brightness(1.05);
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
        >
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