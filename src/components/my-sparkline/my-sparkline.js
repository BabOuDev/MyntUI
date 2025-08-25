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
    this.stopAnimation();
  }

  // Enhanced animation frame with spring physics
  animate() {
    if (!this.animated) return;

    // Spring-based animation progression
    const springStrength = 0.7;
    const damping = 0.8;
    const targetProgress = 1;
    
    // Increment with spring physics
    this._currentAnimationValue += (targetProgress - this._currentAnimationValue) * 0.08;
    
    // Apply spring easing
    const springProgress = this._currentAnimationValue < 1 
      ? 1 - Math.pow(2, -8 * this._currentAnimationValue) * Math.cos((this._currentAnimationValue * 6 - springStrength) * (2 * Math.PI) / 3)
      : 1;

    if (Math.abs(1 - this._currentAnimationValue) < 0.001) {
      this._currentAnimationValue = 1;
      this.triggerAnimationComplete();
    } else {
      this._animationId = requestAnimationFrame(() => this.animate());
    }

    const svg = this.shadowRoot.querySelector('svg');
    const path = svg?.querySelector('.sparkline-path');
    const area = svg?.querySelector('.sparkline-area');
    const dots = svg?.querySelectorAll('.sparkline-dot');
    
    if (path) {
      const pathLength = path.getTotalLength();
      const drawLength = pathLength * springProgress;
      path.style.strokeDasharray = `${drawLength}, ${pathLength}`;
      
      // Add dynamic glow effect during animation
      path.style.filter = `
        drop-shadow(0 0 ${2 + springProgress * 6}px currentColor)
        brightness(${1 + springProgress * 0.2})
      `;
    }
    
    // Animate area fill with delay
    if (area && springProgress > 0.3) {
      const areaProgress = Math.max(0, (springProgress - 0.3) / 0.7);
      area.style.opacity = (0.1 * areaProgress).toString();
    }
    
    // Animate dots with staggered timing
    if (dots.length > 0) {
      dots.forEach((dot, index) => {
        const dotDelay = index / dots.length;
        const dotProgress = Math.max(0, Math.min(1, (springProgress - dotDelay) / (1 - dotDelay)));
        dot.style.opacity = dotProgress.toString();
        dot.style.transform = `scale(${dotProgress})`;
      });
    }
  }
  
  // Trigger completion effect
  triggerAnimationComplete() {
    const path = this.shadowRoot.querySelector('.sparkline-path');
    if (path) {
      path.style.animation = 'sparkline-complete-pulse 0.6s var(--_global-spring-wobbly) forwards';
      setTimeout(() => {
        path.style.animation = '';
      }, 600);
    }
    
    this.dispatchEvent(new CustomEvent('sparkline-animation-complete', {
      detail: { data: this._data }
    }));
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
          /* Enhanced sparkline variables with premium styling */
          --_sparkline-color: ${color};
          --_sparkline-line-width: ${lineWidth}px;
          --_sparkline-width: ${width}px;
          --_sparkline-height: ${height}px;
          
          /* Size variants with refined dimensions */
          --_sparkline-width-sm: 80px;
          --_sparkline-height-sm: 24px;
          --_sparkline-width-md: 120px;
          --_sparkline-height-md: 40px;
          --_sparkline-width-lg: 160px;
          --_sparkline-height-lg: 56px;
          
          /* Enhanced transitions and effects */
          --_sparkline-transition: all var(--_global-motion-duration-medium1) var(--_global-spring-gentle);
          --_sparkline-gradient-start: var(--_sparkline-color);
          --_sparkline-gradient-mid: color-mix(in srgb, var(--_sparkline-color) 70%, white 30%);
          --_sparkline-gradient-end: transparent;
          --_sparkline-glow-intensity: 0;
          
          display: inline-block;
          color: var(--_sparkline-color);
          transition: var(--_sparkline-transition);
          position: relative;
          background: linear-gradient(145deg, 
            var(--_global-color-surface) 0%, 
            var(--_global-color-surface-container-low) 100%
          );
          border-radius: var(--_global-border-radius-lg);
          padding: var(--_global-spacing-sm);
          box-shadow: 
            var(--_global-elevation-1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          border: 1px solid var(--_global-color-outline-variant);
          overflow: hidden;
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
          filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.1));
          transition: filter var(--_global-motion-duration-medium1) var(--_global-motion-easing-emphasized);
        }

        .sparkline-path {
          fill: none;
          stroke: currentColor;
          stroke-width: var(--_sparkline-line-width);
          stroke-linecap: round;
          stroke-linejoin: round;
          vector-effect: non-scaling-stroke;
          transition: var(--_sparkline-transition);
          filter: drop-shadow(0 0 4px currentColor);
          opacity: 0.9;
        }

        .sparkline-area {
          stroke: none;
          opacity: 0;
          transition: var(--_sparkline-transition);
          filter: url(#sparklineAreaGlow);
        }

        .sparkline-dot {
          opacity: 0;
          transition: var(--_sparkline-transition);
          filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.3));
          transform: scale(0);
          transform-origin: center;
        }

        .sparkline-dot:hover {
          opacity: 1;
          transform: scale(1.4);
          filter: 
            drop-shadow(0 2px 8px currentColor)
            drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4));
        }
        
        .sparkline-dot.visible {
          opacity: 0.8;
          transform: scale(1);
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

        /* Enhanced hover effects with sophisticated micro-interactions */
        :host(:hover) {
          transform: translateY(-2px) scale(1.02);
          transition: transform var(--_global-motion-duration-medium1) var(--_global-spring-bouncy),
                      box-shadow var(--_global-motion-duration-medium1) var(--_global-motion-easing-emphasized);
          box-shadow: 
            var(--_global-shadow-interaction-moderate),
            0 0 20px var(--_sparkline-color)20,
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
          --_sparkline-glow-intensity: 0.6;
        }

        :host(:hover) svg {
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15));
        }

        :host(:hover) .sparkline-path {
          stroke-width: calc(var(--_sparkline-line-width) + 1px);
          filter: 
            drop-shadow(0 0 8px currentColor)
            brightness(1.15) 
            saturate(1.2);
        }

        :host(:hover) .sparkline-area {
          opacity: 0.2;
          filter: 
            url(#sparklineAreaGlow)
            brightness(1.1);
        }
        
        :host(:hover) .sparkline-dot {
          opacity: 0.9;
          transform: scale(1.1);
        }

        /* Enhanced animation styles with spring physics */
        :host([animated]) .sparkline-path {
          stroke-dasharray: 0, 1000;
          /* Animation handled by JavaScript for better control */
        }
        
        @keyframes sparkline-complete-pulse {
          0% {
            filter: 
              drop-shadow(0 0 4px currentColor)
              brightness(1) 
              saturate(1);
          }
          50% {
            filter: 
              drop-shadow(0 0 12px currentColor)
              drop-shadow(0 0 20px currentColor)
              brightness(1.3) 
              saturate(1.4);
            stroke-width: calc(var(--_sparkline-line-width) + 1px);
          }
          100% {
            filter: 
              drop-shadow(0 0 6px currentColor)
              brightness(1.1) 
              saturate(1.1);
            stroke-width: var(--_sparkline-line-width);
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

        /* Enhanced no data state */
        .no-data {
          display: flex;
          align-items: center;
          justify-content: center;
          width: var(--_sparkline-width);
          height: var(--_sparkline-height);
          background: linear-gradient(145deg, 
            var(--_global-color-surface-container) 0%, 
            var(--_global-color-surface-container-high) 100%
          );
          border: 1px dashed var(--_global-color-outline-variant);
          border-radius: var(--_global-border-radius-md);
          font-size: var(--_global-font-size-xs);
          font-weight: var(--_global-font-weight-medium);
          color: var(--_global-color-on-surface-variant);
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }
        
        .no-data::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 70%
          );
          animation: no-data-shimmer 3s linear infinite;
        }
        
        @keyframes no-data-shimmer {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }
      </style>

      ${this._data.length >= 2 ? `
        <svg 
          width="${width}" 
          height="${height}"
          viewBox="0 0 ${width} ${height}"
          role="img"
          aria-label="Sparkline chart showing trend for ${this._data.length} data points"
          ${this.disabled ? 'aria-disabled="true"' : 'tabindex="0"'}
        >
          <defs>
            <linearGradient id="sparkline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color: var(--_sparkline-gradient-start); stop-opacity: 0.4"/>
              <stop offset="40%" style="stop-color: var(--_sparkline-gradient-mid); stop-opacity: 0.25"/>
              <stop offset="100%" style="stop-color: var(--_sparkline-gradient-end); stop-opacity: 0"/>
            </linearGradient>
            <filter id="sparklineAreaGlow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="sparklineGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
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

}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-sparkline')) {
  customElements.define('my-sparkline', MySparkline);
}