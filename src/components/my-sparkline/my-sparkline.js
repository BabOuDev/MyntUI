/**
 * MyntUI my-sparkline Component
 * A small, simple line chart without axes or labels, designed to show trends in data within a compact space
 * Enhanced version using MyntUIBaseComponent with pure TailwindCSS and global config integration
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';
import { globalConfig } from '../../config/global-config.js';

class MySparkline extends MyntUIBaseComponent {
  constructor() {
    super();
    
    // Internal state
    this._data = [];
    this._animationId = null;
    this._currentAnimationValue = 0;
    
    // Bind event handlers
    this.handleResize = this.handleResize.bind(this);
    
    // Initialize with base component pattern
    this.log('Sparkline component initializing...');
  }

  // Extended observed attributes (inherits base ones)
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'data', 'color', 'width', 'height', 'line-width', 'animated', 
      'variant', 'size', 'fill', 'gradient', 'dots', 'smooth'
    ];
  }

  // Component-specific attribute handling
  handleAttributeChange(name, oldValue, newValue) {
    super.handleAttributeChange(name, oldValue, newValue);
    
    switch (name) {
      case 'data':
        this.parseData();
        this.announceToScreenReader(
          `Sparkline data updated with ${this._data.length} points`,
          'polite'
        );
        break;
      case 'animated':
        this.announceToScreenReader(
          `Sparkline animation ${newValue !== null ? 'enabled' : 'disabled'}`,
          'polite'
        );
        break;
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
    return this.getAttribute('color') || 'currentColor';
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

  // Get TailwindCSS classes from global config
  getSparklineClasses() {
    const config = globalConfig.get('theme.tailwind');
    const size = this.size || 'md';
    const variant = this.variant || 'line';
    
    return {
      container: `inline-block relative bg-gradient-to-br from-surface to-surface-container-low rounded-lg border border-outline-variant shadow-elevation-1 overflow-hidden transition-all duration-300 hover:shadow-elevation-2 hover:-translate-y-0.5 hover:scale-105 ${
        size === 'sm' ? 'p-2' : size === 'lg' ? 'p-4' : 'p-3'
      }`,
      svg: `block transition-all duration-300 hover:drop-shadow-lg ${
        size === 'sm' ? 'w-20 h-6' : size === 'lg' ? 'w-40 h-14' : 'w-32 h-10'
      }`,
      path: `fill-none stroke-current transition-all duration-500 ease-out ${
        size === 'sm' ? 'stroke-1' : size === 'lg' ? 'stroke-2' : 'stroke-1.5'
      } stroke-linecap-round stroke-linejoin-round`,
      area: `stroke-none opacity-0 transition-all duration-500 ${
        this.gradient ? 'fill-url(#sparkline-gradient)' : 'fill-current'
      }`,
      dot: `opacity-0 transition-all duration-300 hover:opacity-100 hover:scale-150 ${
        size === 'sm' ? 'r-1' : size === 'lg' ? 'r-2' : 'r-1.5'
      }`,
      noData: `flex items-center justify-center border-dashed border-2 border-outline-variant bg-surface-container rounded-md text-surface-on-surface-variant font-medium relative overflow-hidden ${
        size === 'sm' ? 'w-20 h-6 text-2xs' : size === 'lg' ? 'w-40 h-14 text-sm' : 'w-32 h-10 text-xs'
      }`
    };
  }

  // Get color based on variant
  getVariantColor() {
    switch (this.variant) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      case 'info': return 'text-info';
      case 'secondary': return 'text-secondary';
      default: return 'text-primary';
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

  // Override base connected callback
  onConnected() {
    this.parseData();
    this.log('Sparkline component connected with data points:', this._data.length);
  }

  // Override base disconnected callback
  onDisconnected() {
    if (this._animationId) {
      cancelAnimationFrame(this._animationId);
      this._animationId = null;
    }
    this.log('Sparkline component disconnected');
  }

  // Attach event listeners using base component pattern
  attachEventListeners() {
    this.removeEventListeners(); // Clean up existing listeners
    
    // Listen for resize events if responsive
    if (this.hasAttribute('responsive')) {
      this.addEventListeners([
        {
          element: window,
          events: ['resize'],
          handler: this.handleResize
        }
      ]);
    }
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
        class="sparkline-dot"
        fill="currentColor"
      />`;
    }).join('');
  }

  // Render the component using TailwindCSS classes
  render() {
    this.parseData();
    const classes = this.getSparklineClasses();
    const variantColor = this.getVariantColor();
    const width = this.width;
    const height = this.height;
    const color = this.color;
    const lineWidth = this.lineWidth;
    const linePath = this.createPath();
    const areaPath = this.fill ? this.createAreaPath() : '';
    const dots = this.generateDots();

    this.shadowRoot.innerHTML = `
      <style>
        @import 'tailwindcss/base';
        @import 'tailwindcss/components';
        @import 'tailwindcss/utilities';
        
        :host {
          display: inline-block;
          font-family: var(--_global-font-family-sans, system-ui);
          color: ${color};
        }
        
        /* Custom animations */
        @keyframes sparkline-draw {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        
        @keyframes sparkline-complete-pulse {
          0% { filter: drop-shadow(0 0 4px currentColor) brightness(1); }
          50% { filter: drop-shadow(0 0 12px currentColor) brightness(1.3) saturate(1.4); }
          100% { filter: drop-shadow(0 0 6px currentColor) brightness(1.1); }
        }
        
        @keyframes no-data-shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        
        /* Animated path */
        .sparkline-path.animated {
          stroke-dasharray: 1000;
          animation: sparkline-draw 1.5s ease-out;
        }
        
        .sparkline-dot {
          transition: opacity 0.3s, transform 0.3s;
          transform-origin: center;
        }
        
        .sparkline-dot:hover {
          opacity: 1 !important;
          transform: scale(1.5);
        }
        
        .sparkline-dot.visible {
          opacity: 0.8;
          transform: scale(1);
        }
        
        /* No data shimmer effect */
        .no-data::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
          animation: no-data-shimmer 3s linear infinite;
        }
        
        /* Accessibility and reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .sparkline-path,
          .sparkline-dot,
          .no-data::before {
            animation: none !important;
            transition: none !important;
          }
        }
        
        /* High contrast support */
        @media (prefers-contrast: high) {
          .sparkline-path {
            stroke-width: calc(var(--line-width, 2) + 1px);
          }
        }
      </style>

      ${this._data.length >= 2 ? `
        <div class="${classes.container} ${variantColor}">
          <svg class="${classes.svg}" 
               width="${width}" 
               height="${height}"
               viewBox="0 0 ${width} ${height}"
               role="img"
               aria-label="Sparkline chart showing trend for ${this._data.length} data points"
               ${this.disabled ? 'aria-disabled="true"' : 'tabindex="0"'}
          >
            <defs>
              <linearGradient id="sparkline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color: currentColor; stop-opacity: 0.4"/>
                <stop offset="40%" style="stop-color: color-mix(in srgb, currentColor 70%, white 30%); stop-opacity: 0.25"/>
                <stop offset="100%" style="stop-color: transparent; stop-opacity: 0"/>
              </linearGradient>
              <filter id="sparklineAreaGlow">
                <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            ${this.fill ? `<path d="${areaPath}" class="${classes.area}" fill="${this.gradient ? 'url(#sparkline-gradient)' : 'currentColor'}" opacity="0.2"/>` : ''}
            
            <path d="${linePath}" class="${classes.path} ${this.animated ? 'animated' : ''}"/>
            
            ${dots}
          </svg>
        </div>
      ` : `
        <div class="${classes.container}">
          <div class="${classes.noData}">
            No data
          </div>
        </div>
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