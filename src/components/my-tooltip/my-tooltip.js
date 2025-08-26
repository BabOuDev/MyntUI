/**
 * MyntUI my-tooltip Component
 * A small, contextual information pop-up displayed on hover or focus of an element
 */

class MyTooltip extends HTMLElement {
  constructor() {
    super();
    
    // Create Shadow DOM for encapsulation
    this.attachShadow({ mode: 'open' });
    
    // Internal state
    this._isVisible = false;
    this._showTimeout = null;
    this._hideTimeout = null;
    
    // Bind event handlers
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    
    // Initialize component
    this.render();
    this.attachEventListeners();
  }

  // Define which attributes to observe for changes
  static get observedAttributes() {
    return ['text', 'position', 'delay', 'disabled', 'size', 'variant', 'multiline'];
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.attachEventListeners();
    }
  }

  // Getters and setters
  get text() {
    return this.getAttribute('text') || '';
  }

  set text(value) {
    this.setAttribute('text', value);
  }

  get position() {
    return this.getAttribute('position') || 'top';
  }

  set position(value) {
    this.setAttribute('position', value);
  }

  get delay() {
    return parseInt(this.getAttribute('delay')) || 500;
  }

  set delay(value) {
    this.setAttribute('delay', value.toString());
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get size() {
    return this.getAttribute('size') || 'md';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  get variant() {
    return this.getAttribute('variant') || 'dark';
  }

  set variant(value) {
    this.setAttribute('variant', value);
  }

  get multiline() {
    return this.hasAttribute('multiline');
  }

  set multiline(value) {
    if (value) {
      this.setAttribute('multiline', '');
    } else {
      this.removeAttribute('multiline');
    }
  }

  // Show tooltip
  showTooltip() {
    if (this.disabled || this._isVisible) return;

    // Clear any existing timeouts
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
    }

    this._showTimeout = setTimeout(() => {
      this._isVisible = true;
      const tooltip = this.shadowRoot.querySelector('.tooltip');
      if (tooltip) {
        tooltip.classList.add('visible');
        this.positionTooltip();
      }
    }, this.delay);
  }

  // Hide tooltip
  hideTooltip() {
    if (!this._isVisible) return;

    // Clear any existing timeouts
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
      this._showTimeout = null;
    }

    this._hideTimeout = setTimeout(() => {
      this._isVisible = false;
      const tooltip = this.shadowRoot.querySelector('.tooltip');
      if (tooltip) {
        tooltip.classList.remove('visible');
      }
    }, 100);
  }

  // Position tooltip relative to target
  positionTooltip() {
    const tooltip = this.shadowRoot.querySelector('.tooltip');
    const trigger = this.shadowRoot.querySelector('.trigger');
    
    if (!tooltip || !trigger) return;

    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let position = this.position;
    
    // Auto positioning logic
    if (position === 'auto') {
      const spaceTop = triggerRect.top;
      const spaceBottom = viewportHeight - triggerRect.bottom;
      const spaceLeft = triggerRect.left;
      const spaceRight = viewportWidth - triggerRect.right;
      
      // Choose position with most space
      const maxSpace = Math.max(spaceTop, spaceBottom, spaceLeft, spaceRight);
      if (maxSpace === spaceTop) position = 'top';
      else if (maxSpace === spaceBottom) position = 'bottom';
      else if (maxSpace === spaceLeft) position = 'left';
      else position = 'right';
    }
    
    // Apply positioning class
    tooltip.className = `tooltip visible ${position}`;
    
    // Calculate position
    let top, left;
    
    switch (position) {
      case 'top':
        top = -tooltipRect.height - 8;
        left = (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.height + 8;
        left = (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = (triggerRect.height - tooltipRect.height) / 2;
        left = -tooltipRect.width - 8;
        break;
      case 'right':
        top = (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.width + 8;
        break;
    }
    
    // Ensure tooltip stays within viewport
    if (position === 'top' || position === 'bottom') {
      const minLeft = -triggerRect.left + 8;
      const maxLeft = viewportWidth - triggerRect.left - tooltipRect.width - 8;
      left = Math.max(minLeft, Math.min(left, maxLeft));
    } else {
      const minTop = -triggerRect.top + 8;
      const maxTop = viewportHeight - triggerRect.top - tooltipRect.height - 8;
      top = Math.max(minTop, Math.min(top, maxTop));
    }
    
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }

  // Event handlers
  handleMouseEnter() {
    this.showTooltip();
  }

  handleMouseLeave() {
    this.hideTooltip();
  }

  handleFocus() {
    this.showTooltip();
  }

  handleBlur() {
    this.hideTooltip();
  }

  handleKeyDown(event) {
    if (event.key === 'Escape') {
      this.hideTooltip();
    }
  }

  // Attach event listeners
  attachEventListeners() {
    const trigger = this.shadowRoot.querySelector('.trigger');
    if (trigger) {
      // Remove existing listeners
      trigger.removeEventListener('mouseenter', this.handleMouseEnter);
      trigger.removeEventListener('mouseleave', this.handleMouseLeave);
      trigger.removeEventListener('focus', this.handleFocus, true);
      trigger.removeEventListener('blur', this.handleBlur, true);
      trigger.removeEventListener('keydown', this.handleKeyDown);
      
      // Add new listeners
      trigger.addEventListener('mouseenter', this.handleMouseEnter);
      trigger.addEventListener('mouseleave', this.handleMouseLeave);
      trigger.addEventListener('focus', this.handleFocus, true);
      trigger.addEventListener('blur', this.handleBlur, true);
      trigger.addEventListener('keydown', this.handleKeyDown);
    }
  }

  // Cleanup on disconnect
  disconnectedCallback() {
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
    }
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
    }
  }

  // Render the component
  render() {
    // Size classes for tooltip
    const sizeClasses = {
      sm: 'px-2 py-1 text-xs max-w-[180px]',
      md: 'px-3 py-2 text-sm max-w-[240px]',
      lg: 'px-4 py-3 text-base max-w-[320px]'
    };

    // Variant color classes
    const variantClasses = {
      dark: 'bg-gray-900 text-white',
      light: 'bg-white text-gray-900 border border-gray-300',
      primary: 'bg-primary text-primary-on-primary',
      error: 'bg-error text-error-on-error'
    };

    // Arrow size classes
    const arrowSizes = {
      sm: 'w-2 h-2',
      md: 'w-3 h-3', 
      lg: 'w-4 h-4'
    };

    const currentSizeClass = sizeClasses[this.size] || sizeClasses.md;
    const currentVariantClass = variantClasses[this.variant] || variantClasses.dark;
    const currentArrowSize = arrowSizes[this.size] || arrowSizes.md;
    const visibilityClass = this._isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75';
    const multilineClass = this.multiline ? 'whitespace-normal break-words' : 'whitespace-nowrap truncate';
    const pointerEvents = this._isVisible ? 'pointer-events-none' : 'pointer-events-none';

    this.shadowRoot.innerHTML = `
      <div class="
        trigger inline-block w-full
      ">
        <slot></slot>
      </div>
      
      <div 
        class="
          tooltip absolute z-tooltip rounded-lg font-medium leading-tight
          shadow-elevation2 transition-all duration-150 ease-emphasized
          ${currentSizeClass} ${currentVariantClass} ${visibilityClass} 
          ${multilineClass} ${pointerEvents}
          transform origin-center
        "
        role="tooltip"
        aria-hidden="${!this._isVisible}"
        id="tooltip-${Math.random().toString(36).substr(2, 9)}"
      >
        ${this.text ? this.text : '<slot name="content"></slot>'}
        
        <!-- Arrow -->
        <div class="
          tooltip-arrow absolute ${currentArrowSize} rotate-45
          ${this.variant === 'light' ? 'bg-white border-gray-300' : 
            this.variant === 'primary' ? 'bg-primary' :
            this.variant === 'error' ? 'bg-error' : 'bg-gray-900'}
        "></div>
      </div>

      <style>
        /* Minimal CSS for complex positioning and arrow styling */
        :host {
          display: inline-block;
          position: relative;
          font-family: system-ui, -apple-system, sans-serif;
        }

        :host([disabled]) {
          pointer-events: none;
        }

        /* Position-specific arrow styling */
        .tooltip.top .tooltip-arrow {
          top: 100%;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          margin-top: -2px;
        }

        .tooltip.bottom .tooltip-arrow {
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          margin-bottom: -2px;
        }

        .tooltip.left .tooltip-arrow {
          top: 50%;
          left: 100%;
          transform: translateY(-50%) rotate(45deg);
          margin-left: -2px;
        }

        .tooltip.right .tooltip-arrow {
          top: 50%;
          right: 100%;
          transform: translateY(-50%) rotate(45deg);
          margin-right: -2px;
        }

        /* Arrow border adjustments for light variant */
        :host([variant="light"]) .tooltip.top .tooltip-arrow {
          border-top: 1px solid rgb(209, 213, 219); /* gray-300 */
          border-right: 1px solid rgb(209, 213, 219);
        }

        :host([variant="light"]) .tooltip.bottom .tooltip-arrow {
          border-bottom: 1px solid rgb(209, 213, 219);
          border-left: 1px solid rgb(209, 213, 219);
        }

        :host([variant="light"]) .tooltip.left .tooltip-arrow {
          border-top: 1px solid rgb(209, 213, 219);
          border-left: 1px solid rgb(209, 213, 219);
        }

        :host([variant="light"]) .tooltip.right .tooltip-arrow {
          border-bottom: 1px solid rgb(209, 213, 219);
          border-right: 1px solid rgb(209, 213, 219);
        }

        /* Accessibility - Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .tooltip {
            transition: opacity 75ms ease;
            transform: none !important;
          }
          
          .tooltip.visible {
            transform: none !important;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .tooltip {
            border: 2px solid currentColor;
          }
        }

        /* Ensure proper z-index stacking */
        .tooltip {
          z-index: 300; /* tooltip z-index from global config */
        }
      </style>
    `;
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-tooltip')) {
  customElements.define('my-tooltip', MyTooltip);
}