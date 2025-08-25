/**
 * MyntUI my-sparkline Component
 * A small, simple line chart without axes or labels, designed to show trends in data within a compact space
 */

class MySparkline extends HTMLElement {
  constructor() {
    super();
    
    // Create Shadow DOM for encapsulation
    this.attachShadow({ mode: 'open' });
    
    // Internal state
    this._data = [];
    this._animationId = null;
    this._currentAnimationValue = 0;
    
    // Bind event handlers
    this.handleResize = this.handleResize.bind(this);
    
    // Initialize component
    this.parseData(); // Parse data first
    this.render();
    this.attachEventListeners();
  }

  // Define which attributes to observe for changes
  static get observedAttributes() {
    return [
      'data', 'color', 'width', 'height', 'line-width', 'animated', 
      'variant', 'size', 'fill', 'gradient', 'dots', 'smooth'
    ];
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'data') {
        this.parseData();
      }
      this.render();
      this.attachEventListeners();
    }
  }

  // Parse data from attribute or property
  parseData() {
    const dataAttr = this.getAttribute('data');
    if (dataAttr) {
      try {
        this._data = JSON.parse(dataAttr);
      } catch (e) {
        console.warn('Invalid data JSON in my-sparkline:', e);
        this._data = [];
      }
    }
    
    // Ensure data is an array of numbers
    if (!Array.isArray(this._data)) {
      this._data = [];
    }
    
    this._data = this._data.map(d => typeof d === 'number' ? d : parseFloat(d)).filter(d => !isNaN(d));
  }

  // Getters and setters
  get data() {
    return this._data;
  }

  set data(value) {
    this._data = Array.isArray(value) ? value : [];
    this.render();
  }

  get color() {
    return this.getAttribute('color') || 'var(--_global-color-primary)';
  }

  set color(value) {
    this.setAttribute('color', value);
  }

  get width() {
    return parseInt(this.getAttribute('width')) || 120;
  }

  set width(value) {
    this.setAttribute('width', value);
  }

  get height() {
    return parseInt(this.getAttribute('height')) || 40;
  }

  set height(value) {
    this.setAttribute('height', value);
  }

  get lineWidth() {
    return parseFloat(this.getAttribute('line-width')) || 2;
  }

  set lineWidth(value) {
    this.setAttribute('line-width', value);
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

  get variant() {
    return this.getAttribute('variant') || 'line';
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

  get fill() {
    return this.hasAttribute('fill');
  }

  set fill(value) {
    if (value) {
      this.setAttribute('fill', '');
    } else {
      this.removeAttribute('fill');
    }
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

  get dots() {
    return this.hasAttribute('dots');
  }

  set dots(value) {
    if (value) {
      this.setAttribute('dots', '');
    } else {
      this.removeAttribute('dots');
    }
  }

  get smooth() {
    return this.hasAttribute('smooth');
  }

  set smooth(value) {
    if (value) {
      this.setAttribute('smooth', '');
    } else {
      this.removeAttribute('smooth');
    }
  }

  // Create SVG path from data points
  createPath() {
    if (this._data.length < 2) return '';

    const width = this.width;
    const height = this.height;
    const padding = 4;
    const effectiveWidth = width - (padding * 2);
    const effectiveHeight = height - (padding * 2);

    // Find min/max values for scaling
    const minValue = Math.min(...this._data);
    const maxValue = Math.max(...this._data);
    const valueRange = maxValue - minValue || 1;

    // Convert data points to SVG coordinates
    const points = this._data.map((value, index) => {
      const x = padding + (index / (this._data.length - 1)) * effectiveWidth;
      const y = padding + effectiveHeight - ((value - minValue) / valueRange) * effectiveHeight;
      return { x, y, value };
    });

    if (this.smooth) {
      // Create smooth curved path
      return this.createSmoothPath(points);
    } else {
      // Create straight line path
      return this.createLinearPath(points);
    }
  }

  // Create linear path
  createLinearPath(points) {
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    return path;
  }

  // Create smooth curved path using quadratic curves
  createSmoothPath(points) {
    if (points.length < 2) return '';

    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const current = points[i];
      const previous = points[i - 1];
      
      if (i === 1) {
        // First curve point
        const next = points[i + 1] || current;
        const cpx = previous.x + (current.x - previous.x) * 0.5;
        const cpy = previous.y;
        path += ` Q ${cpx} ${cpy} ${current.x} ${current.y}`;
      } else if (i === points.length - 1) {
        // Last point
        path += ` L ${current.x} ${current.y}`;
      } else {
        // Middle points with smooth curves
        const next = points[i + 1];
        const cpx = previous.x + (next.x - previous.x) * 0.3;
        const cpy = previous.y + (next.y - previous.y) * 0.3;
        path += ` Q ${cpx} ${cpy} ${current.x} ${current.y}`;
      }
    }
    
    return path;
  }

  // Create area fill path
  createAreaPath() {
    const linePath = this.createPath();
    if (!linePath) return '';

    const width = this.width;
    const height = this.height;
    const padding = 4;

    // Add area fill by closing the path at the bottom
    const areaPath = linePath + ` L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`;
    return areaPath;
  }

  // Handle resize events
  handleResize() {
    this.render();
  }

  // Standardized event handling pattern for MyntUI components
  attachEventListeners() {
    // Clean up existing listeners first
    this.removeEventListeners();
    
    // Listen for resize events if responsive
    if (this.hasAttribute('responsive')) {
      window.addEventListener('resize', this.handleResize);
      this._eventTargets = [
        { element: window, events: ['resize'] }
      ];
    }
  }

  // Standardized event listener cleanup
  removeEventListeners() {
    if (this._eventTargets) {
      this._eventTargets.forEach(target => {
        target.element.removeEventListener('resize', this.handleResize);
      });
      this._eventTargets = null;
    }
    
    // Clean up animation
    if (this._animationId) {
      cancelAnimationFrame(this._animationId);
      this._animationId = null;
    }
  }

  // Standardized lifecycle cleanup
  disconnectedCallback() {
    this.removeEventListeners();
  }

  // Animation frame
  animate() {
    if (!this.animated) return;

    this._currentAnimationValue += 0.02;
    if (this._currentAnimationValue >= 1) {
      this._currentAnimationValue = 1;
    } else {
      this._animationId = requestAnimationFrame(() => this.animate());
    }

    const svg = this.shadowRoot.querySelector('svg');
    const path = svg?.querySelector('.sparkline-path');
    if (path) {
      const pathLength = path.getTotalLength();
      const drawLength = pathLength * this._currentAnimationValue;
      path.style.strokeDasharray = `${drawLength}, ${pathLength}`;
    }
  }

  // Start animation
  startAnimation() {
    if (!this.animated || this._animationId) return;
    
    this._currentAnimationValue = 0;
    
    // Wait for DOM to update
    setTimeout(() => {
      this.animate();
    }, 50);
  }

  // Stop animation
  stopAnimation() {
    if (this._animationId) {
      cancelAnimationFrame(this._animationId);
      this._animationId = null;
    }
  }

  // Generate dots for data points
  generateDots() {
    if (!this.dots || this._data.length < 2) return '';

    const width = this.width;
    const height = this.height;
    const padding = 4;
    const effectiveWidth = width - (padding * 2);
    const effectiveHeight = height - (padding * 2);

    const minValue = Math.min(...this._data);
    const maxValue = Math.max(...this._data);
    const valueRange = maxValue - minValue || 1;

    return this._data.map((value, index) => {
      const x = padding + (index / (this._data.length - 1)) * effectiveWidth;
      const y = padding + effectiveHeight - ((value - minValue) / valueRange) * effectiveHeight;
      
      return `<circle
        cx="${x}" 
        cy="${y}" 
        r="2"
        class="sparkline-dot"
        fill="currentColor"
      />`;
    }).join('');
  }

  // Render the component
  render() {
    this.parseData();

    const width = this.width;
    const height = this.height;
    const color = this.color;
    const lineWidth = this.lineWidth;
    const linePath = this.createPath();
    const areaPath = this.fill ? this.createAreaPath() : '';
    const dots = this.generateDots();

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Sparkline-specific variables using global semantic variables */
          --_sparkline-color: ${color};
          --_sparkline-line-width: ${lineWidth}px;
          --_sparkline-width: ${width}px;
          --_sparkline-height: ${height}px;
          
          /* Size variants */
          --_sparkline-width-sm: 80px;
          --_sparkline-height-sm: 24px;
          --_sparkline-width-md: 120px;
          --_sparkline-height-md: 40px;
          --_sparkline-width-lg: 160px;
          --_sparkline-height-lg: 56px;
          
          --_sparkline-transition: all var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          --_sparkline-gradient-start: var(--_sparkline-color);
          --_sparkline-gradient-end: transparent;
          
          display: inline-block;
          color: var(--_sparkline-color);
          transition: var(--_sparkline-transition);
          position: relative;
        }

        /* Size variants */
        :host([size="sm"]) {
          --_sparkline-width: var(--_sparkline-width-sm);
          --_sparkline-height: var(--_sparkline-height-sm);
        }

        :host([size="lg"]) {
          --_sparkline-width: var(--_sparkline-width-lg);
          --_sparkline-height: var(--_sparkline-height-lg);
        }

        svg {
          width: var(--_sparkline-width);
          height: var(--_sparkline-height);
          display: block;
          overflow: visible;
        }

        .sparkline-path {
          fill: none;
          stroke: currentColor;
          stroke-width: var(--_sparkline-line-width);
          stroke-linecap: round;
          stroke-linejoin: round;
          vector-effect: non-scaling-stroke;
          transition: var(--_sparkline-transition);
        }

        .sparkline-area {
          stroke: none;
          opacity: 0.1;
          transition: var(--_sparkline-transition);
        }

        .sparkline-dot {
          opacity: 0.8;
          transition: var(--_sparkline-transition);
        }

        .sparkline-dot:hover {
          opacity: 1;
          transform: scale(1.2);
        }

        /* Gradient fill */
        :host([gradient]) .sparkline-area {
          fill: url(#sparkline-gradient);
          opacity: 0.2;
        }

        /* Variant styles */
        :host([variant="success"]) {
          --_sparkline-color: var(--_global-color-success);
        }

        :host([variant="warning"]) {
          --_sparkline-color: var(--_global-color-warning);
        }

        :host([variant="error"]) {
          --_sparkline-color: var(--_global-color-error);
        }

        :host([variant="info"]) {
          --_sparkline-color: var(--_global-color-info);
        }

        /* Hover effects */
        :host(:hover) {
          transform: translateY(-1px);
        }

        :host(:hover) .sparkline-path {
          stroke-width: calc(var(--_sparkline-line-width) + 0.5px);
          filter: brightness(1.1);
        }

        :host(:hover) .sparkline-area {
          opacity: 0.15;
        }

        /* Animation styles */
        :host([animated]) .sparkline-path {
          stroke-dasharray: 0, 1000;
          animation: sparkline-draw 1s var(--_global-motion-easing-emphasized) forwards;
        }

        @keyframes sparkline-draw {
          to {
            stroke-dasharray: 1000, 0;
          }
        }

        /* Accessibility and reduced motion */
        @media (prefers-reduced-motion: reduce) {
          :host([animated]) .sparkline-path {
            animation: none;
            stroke-dasharray: none;
          }
          
          :host(:hover) {
            transform: none;
          }
          
          .sparkline-dot {
            transition: none;
          }
        }

        /* High contrast support */
        @media (prefers-contrast: high) {
          .sparkline-path {
            stroke-width: calc(var(--_sparkline-line-width) + 1px);
          }
        }

        /* No data state */
        .no-data {
          display: flex;
          align-items: center;
          justify-content: center;
          width: var(--_sparkline-width);
          height: var(--_sparkline-height);
          background: var(--_global-color-surface-container);
          border: 1px dashed var(--_global-color-outline-variant);
          border-radius: var(--_global-border-radius-sm);
          font-size: var(--_global-font-size-xs);
          color: var(--_global-color-on-surface-variant);
        }
      </style>

      ${this._data.length >= 2 ? `
        <svg 
          width="${width}" 
          height="${height}"
          viewBox="0 0 ${width} ${height}"
          role="img"
          aria-label="Sparkline chart showing data trend"
        >
          <defs>
            <linearGradient id="sparkline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color: var(--_sparkline-gradient-start); stop-opacity: 0.3"/>
              <stop offset="100%" style="stop-color: var(--_sparkline-gradient-end); stop-opacity: 0"/>
            </linearGradient>
          </defs>
          
          ${this.fill ? `<path d="${areaPath}" class="sparkline-area" fill="${this.gradient ? 'url(#sparkline-gradient)' : 'currentColor'}"/>` : ''}
          
          <path d="${linePath}" class="sparkline-path"/>
          
          ${dots}
        </svg>
      ` : `
        <div class="no-data">No data</div>
      `}
    `;

    // Start animation if enabled
    if (this.animated && this._data.length >= 2) {
      this.startAnimation();
    }
  }

  // Cleanup when component is removed
  disconnectedCallback() {
    this.stopAnimation();
    window.removeEventListener('resize', this.handleResize);
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-sparkline')) {
  customElements.define('my-sparkline', MySparkline);
}