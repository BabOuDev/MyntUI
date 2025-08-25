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
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Component-specific variables using global variables */
          --_tooltip-bg-dark: var(--_global-color-on-surface);
          --_tooltip-text-color-dark: var(--_global-color-surface);
          --_tooltip-bg-light: var(--_global-color-surface);
          --_tooltip-text-color-light: var(--_global-color-on-surface);
          --_tooltip-bg-primary: var(--_global-color-primary);
          --_tooltip-text-color-primary: var(--_global-color-on-primary);
          --_tooltip-bg-error: var(--_global-color-error);
          --_tooltip-text-color-error: var(--_global-color-on-error);
          
          --_tooltip-border-radius: var(--_global-border-radius-sm);
          --_tooltip-padding-sm: var(--_global-spacing-xs) calc(var(--_global-spacing-sm) * 0.75);
          --_tooltip-padding-md: var(--_global-spacing-xs) var(--_global-spacing-sm);
          --_tooltip-padding-lg: var(--_global-spacing-sm) var(--_global-spacing-md);
          --_tooltip-font-size-sm: var(--_global-font-size-xs);
          --_tooltip-font-size-md: var(--_global-font-size-sm);
          --_tooltip-font-size-lg: var(--_global-font-size-md);
          --_tooltip-max-width-sm: 180px;
          --_tooltip-max-width-md: 240px;
          --_tooltip-max-width-lg: 320px;
          --_tooltip-z-index: var(--_global-z-index-tooltip);
          --_tooltip-arrow-size: 6px;
          --_tooltip-elevation: var(--_global-elevation-2);
          
          display: inline-block;
          position: relative;
          font-family: var(--_global-font-family-sans);
        }

        :host([disabled]) {
          pointer-events: none;
        }

        .trigger {
          display: inline-block;
          width: 100%;
        }

        .tooltip {
          position: absolute;
          background-color: var(--_tooltip-bg-dark);
          color: var(--_tooltip-text-color-dark);
          padding: var(--_tooltip-padding-md);
          border-radius: var(--_tooltip-border-radius);
          font-size: var(--_tooltip-font-size-md);
          font-weight: var(--_global-font-weight-medium);
          line-height: var(--_global-line-height-tight);
          max-width: var(--_tooltip-max-width-md);
          z-index: var(--_tooltip-z-index);
          opacity: 0;
          pointer-events: none;
          transition: all var(--_global-motion-duration-short2) var(--_global-motion-easing-emphasized);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          box-shadow: var(--_tooltip-elevation);
          transform: scale(0.8);
        }

        .tooltip.visible {
          opacity: 1;
          transform: scale(1);
        }

        /* Arrow styling */
        .tooltip::before {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          border: var(--_tooltip-arrow-size) solid transparent;
        }

        /* Top position arrow */
        .tooltip.top::before {
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-top-color: var(--_tooltip-bg-dark);
          border-bottom: none;
        }

        /* Bottom position arrow */
        .tooltip.bottom::before {
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-bottom-color: var(--_tooltip-bg-dark);
          border-top: none;
        }

        /* Left position arrow */
        .tooltip.left::before {
          top: 50%;
          left: 100%;
          transform: translateY(-50%);
          border-left-color: var(--_tooltip-bg-dark);
          border-right: none;
        }

        /* Right position arrow */
        .tooltip.right::before {
          top: 50%;
          right: 100%;
          transform: translateY(-50%);
          border-right-color: var(--_tooltip-bg-dark);
          border-left: none;
        }

        /* Multi-line tooltips */
        .tooltip.multiline {
          white-space: normal;
          word-wrap: break-word;
          text-overflow: clip;
        }

        /* Size variants */
        :host([size="sm"]) {
          --_tooltip-padding-md: var(--_tooltip-padding-sm);
          --_tooltip-font-size-md: var(--_tooltip-font-size-sm);
          --_tooltip-max-width-md: var(--_tooltip-max-width-sm);
          --_tooltip-arrow-size: 4px;
        }

        :host([size="lg"]) {
          --_tooltip-padding-md: var(--_tooltip-padding-lg);
          --_tooltip-font-size-md: var(--_tooltip-font-size-lg);
          --_tooltip-max-width-md: var(--_tooltip-max-width-lg);
          --_tooltip-arrow-size: 8px;
        }

        /* Variant styles */
        :host([variant="light"]) .tooltip {
          background-color: var(--_tooltip-bg-light);
          color: var(--_tooltip-text-color-light);
          border: 1px solid var(--_global-color-outline-variant);
        }

        :host([variant="light"]) .tooltip::before {
          border-top-color: var(--_tooltip-bg-light);
          border-bottom-color: var(--_tooltip-bg-light);
          border-left-color: var(--_tooltip-bg-light);
          border-right-color: var(--_tooltip-bg-light);
        }

        :host([variant="primary"]) .tooltip {
          background-color: var(--_tooltip-bg-primary);
          color: var(--_tooltip-text-color-primary);
        }

        :host([variant="primary"]) .tooltip::before {
          border-top-color: var(--_tooltip-bg-primary);
          border-bottom-color: var(--_tooltip-bg-primary);
          border-left-color: var(--_tooltip-bg-primary);
          border-right-color: var(--_tooltip-bg-primary);
        }

        :host([variant="error"]) .tooltip {
          background-color: var(--_tooltip-bg-error);
          color: var(--_tooltip-text-color-error);
        }

        :host([variant="error"]) .tooltip::before {
          border-top-color: var(--_tooltip-bg-error);
          border-bottom-color: var(--_tooltip-bg-error);
          border-left-color: var(--_tooltip-bg-error);
          border-right-color: var(--_tooltip-bg-error);
        }

        /* Enhanced multiline support */
        :host([multiline]) .tooltip {
          white-space: normal;
          word-wrap: break-word;
          text-overflow: clip;
          line-height: var(--_global-line-height-normal);
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .tooltip {
            transition: opacity var(--_global-motion-duration-short1) ease;
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
          
          :host([variant="light"]) .tooltip {
            border: 2px solid var(--_global-color-on-surface);
          }
        }
      </style>

      <div class="trigger">
        <slot></slot>
      </div>
      
      <div 
        class="tooltip ${this.position} ${this.multiline ? 'multiline' : ''}"
        role="tooltip"
        aria-hidden="${!this._isVisible}"
        id="tooltip-${Math.random().toString(36).substr(2, 9)}"
      >
        ${this.text ? this.text : '<slot name="content"></slot>'}
      </div>
    `;
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-tooltip')) {
  customElements.define('my-tooltip', MyTooltip);
}