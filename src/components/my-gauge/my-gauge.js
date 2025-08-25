/**
 * MyntUI my-gauge Component
 * Visualizes a single numerical value within a defined range, often with a radial or arc-shaped display
 */

class MyGauge extends HTMLElement {
  constructor() {
    super();
    
    // Create Shadow DOM for encapsulation
    this.attachShadow({ mode: 'open' });
    
    // Internal state
    this._value = 0;
    this._min = 0;
    this._max = 100;
    this._animationId = null;
    
    // Initialize component
    this.render();
  }

  // Define which attributes to observe for changes
  static get observedAttributes() {
    return ['value', 'min', 'max', 'label', 'unit', 'size', 'variant', 'show-value', 'animated', 'thresholds'];
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'value' || name === 'min' || name === 'max') {
        this.updateGauge();
      } else {
        this.render();
      }
    }
  }

  // Getters and setters
  get value() {
    return this._value;
  }

  set value(value) {
    const numValue = Math.max(this.min, Math.min(this.max, parseFloat(value) || 0));
    if (this.animated && this._value !== numValue) {
      this.animateToValue(numValue);
    } else {
      this._value = numValue;
      this.setAttribute('value', numValue.toString());
    }
  }

  get min() {
    return this._min;
  }

  set min(value) {
    this._min = parseFloat(value) || 0;
    this.setAttribute('min', this._min.toString());
    // Ensure value is still within bounds
    this.value = this._value;
  }

  get max() {
    return this._max;
  }

  set max(value) {
    this._max = parseFloat(value) || 100;
    this.setAttribute('max', this._max.toString());
    // Ensure value is still within bounds
    this.value = this._value;
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
        return JSON.parse(thresholdsAttr);
      } catch (e) {
        console.warn('Invalid thresholds JSON in my-gauge:', e);
      }
    }
    return [];
  }

  set thresholds(value) {
    this.setAttribute('thresholds', JSON.stringify(value || []));
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

  // Animate value change
  animateToValue(targetValue) {
    if (this._animationId) {
      cancelAnimationFrame(this._animationId);
    }
    
    const startValue = this._value;
    const startTime = performance.now();
    const duration = 800; // ms
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      this._value = startValue + (targetValue - startValue) * easedProgress;
      this.updateGauge();
      
      if (progress < 1) {
        this._animationId = requestAnimationFrame(animate);
      } else {
        this._value = targetValue;
        this.setAttribute('value', targetValue.toString());
        this._animationId = null;
      }
    };
    
    this._animationId = requestAnimationFrame(animate);
  }

  // Update gauge visual elements
  updateGauge() {
    const needle = this.shadowRoot.querySelector('.gauge-needle');
    const fill = this.shadowRoot.querySelector('.gauge-fill');
    const valueDisplay = this.shadowRoot.querySelector('.gauge-value');
    
    if (needle) {
      needle.style.transform = `rotate(${this.angle}deg)`;
    }
    
    if (fill) {
      const percentage = this.percentage;
      // For arc: circumference = 2π * radius, we want 180 degrees = π * radius
      const circumference = Math.PI * 40; // radius = 40
      const offset = circumference - (circumference * percentage) / 100;
      fill.style.strokeDashoffset = offset.toString();
      fill.style.stroke = this.getColor();
    }
    
    if (valueDisplay) {
      valueDisplay.textContent = `${Math.round(this._value)}${this.unit}`;
      valueDisplay.style.color = this.getColor();
    }
  }

  // Connected callback
  connectedCallback() {
    // Parse initial values
    this._value = Math.max(this.min, Math.min(this.max, parseFloat(this.getAttribute('value')) || 0));
    this._min = parseFloat(this.getAttribute('min')) || 0;
    this._max = parseFloat(this.getAttribute('max')) || 100;
  }

  // Disconnected callback
  disconnectedCallback() {
    if (this._animationId) {
      cancelAnimationFrame(this._animationId);
    }
  }

  // Format display value
  formatValue(value) {
    if (Number.isInteger(value)) {
      return value.toString();
    }
    return value.toFixed(1);
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
          --_gauge-stroke-width: 8;
          --_gauge-stroke-width-bg: 6;
          --_gauge-needle-width: 2;
          --_gauge-bg-color: var(--_global-color-surface-container);
          --_gauge-track-color: var(--_global-color-outline-variant);
          --_gauge-fill-color: var(--_global-color-primary);
          --_gauge-text-color: var(--_global-color-on-surface);
          --_gauge-label-color: var(--_global-color-on-surface-variant);
          --_gauge-range-color: var(--_global-color-on-surface-variant);
          --_gauge-needle-color: var(--_global-color-on-surface);
          --_gauge-shadow: var(--_global-elevation-1);
          --_gauge-transition: all var(--_global-motion-duration-medium2) var(--_global-motion-easing-emphasized);
          
          display: inline-block;
          width: var(--_gauge-size);
          height: calc(var(--_gauge-size) * 0.7);
          font-family: var(--_global-font-family-sans);
          background: var(--_gauge-bg-color);
          border-radius: var(--_global-border-radius-lg);
          box-shadow: var(--_gauge-shadow);
          padding: var(--_global-spacing-md);
          box-sizing: border-box;
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
          stroke: ${color};
          stroke-width: var(--_gauge-stroke-width);
          stroke-linecap: round;
          stroke-dasharray: ${circumference};
          stroke-dashoffset: ${offset};
          transition: var(--_gauge-transition);
          transform: rotate(-180deg);
          transform-origin: center;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }
        
        /* Gradient fill for more modern look */
        .gauge-fill {
          stroke: url(#gaugeGradient);
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
          filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.3));
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

        /* Responsive adjustments */
        @media (max-width: 480px) {
          :host {
            --_gauge-size: var(--_gauge-size-sm);
          }
        }
      </style>

      <div class="gauge-container">
        <svg class="gauge-svg" viewBox="0 0 100 60">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:${color};stop-opacity:0.8" />
              <stop offset="100%" style="stop-color:${color};stop-opacity:1" />
            </linearGradient>
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
          
          <!-- Needle -->
          <polygon class="gauge-needle" 
                   points="49.5,50 50.5,50 50,22"
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