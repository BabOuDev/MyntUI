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

  // Connected callback
  connectedCallback() {
    // Parse initial values
    this._value = Math.max(this.min, Math.min(this.max, parseFloat(this.getAttribute('value')) || 0));
    this._max = parseFloat(this.getAttribute('max')) || 100;
    this._min = parseFloat(this.getAttribute('min')) || 0;
  }

  // Render the component
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Component-specific variables using global variables */
          --_progress-height-sm: 4px;
          --_progress-height-md: 8px;
          --_progress-height-lg: 12px;
          --_progress-height: var(--_progress-height-md);
          --_progress-border-radius: var(--_global-border-radius-full);
          --_progress-bg: var(--_global-color-surface-container-high);
          --_progress-track-color: var(--_global-color-outline-variant);
          
          /* Variant colors */
          --_progress-primary: var(--_global-color-primary);
          --_progress-secondary: var(--_global-color-secondary);
          --_progress-success: var(--_global-color-success);
          --_progress-warning: var(--_global-color-warning);
          --_progress-error: var(--_global-color-error);
          --_progress-info: var(--_global-color-info);
          
          display: block;
          width: 100%;
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
          color: var(--_global-color-text-primary);
          line-height: var(--_global-line-height-tight);
        }

        .progress-value {
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-medium);
          color: var(--_global-color-text-secondary);
          line-height: var(--_global-line-height-tight);
        }

        .progress-track {
          position: relative;
          width: 100%;
          height: var(--_progress-height);
          background-color: var(--_progress-track-color);
          border-radius: var(--_progress-border-radius);
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background-color: var(--_progress-primary);
          border-radius: var(--_progress-border-radius);
          transition: width var(--_global-motion-duration-medium1) var(--_global-motion-easing-emphasized);
          width: ${this.indeterminate ? '100%' : this.percentage + '%'};
        }

        /* Indeterminate animation */
        .progress-fill.indeterminate {
          animation: progress-indeterminate 2s infinite;
          background: linear-gradient(
            90deg, 
            transparent 0%,
            var(--_progress-primary) 50%, 
            transparent 100%
          );
          width: 50%;
        }

        @keyframes progress-indeterminate {
          0% { 
            transform: translateX(-100%);
          }
          100% { 
            transform: translateX(300%);
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

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .progress-fill,
          .progress-fill.indeterminate {
            transition: none;
            animation: none;
          }
        }

        /* Circular progress variant */
        :host([type="circular"]) .progress-track {
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          position: relative;
        }

        :host([type="circular"]) .progress-fill {
          display: none;
        }

        .circular-svg {
          width: 48px;
          height: 48px;
          transform: rotate(-90deg);
        }

        .circular-bg {
          fill: none;
          stroke: var(--_progress-track-color);
          stroke-width: 4;
        }

        .circular-progress {
          fill: none;
          stroke: var(--_progress-primary);
          stroke-width: 4;
          stroke-linecap: round;
          stroke-dasharray: 150.796;
          stroke-dashoffset: ${150.796 - (150.796 * this.percentage) / 100};
          transition: stroke-dashoffset var(--_global-motion-duration-medium1) var(--_global-motion-easing-emphasized);
        }

        .circular-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: var(--_global-font-size-xs);
          font-weight: var(--_global-font-weight-medium);
          color: var(--_global-color-text-primary);
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
            <svg class="circular-svg" viewBox="0 0 52 52">
              <circle class="circular-bg" cx="26" cy="26" r="24"></circle>
              <circle class="circular-progress" cx="26" cy="26" r="24"
                      ${this.indeterminate ? 'style="animation: circular-indeterminate 2s linear infinite"' : ''}></circle>
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