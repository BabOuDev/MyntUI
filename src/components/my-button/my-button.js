/**
 * MyntUI my-button Component
 * A Material Design 3 button component with enhanced state layers, accessibility, and consistency
 */

class MyButton extends HTMLElement {
  constructor() {
    super();
    
    // Create Shadow DOM for encapsulation
    this.attachShadow({ mode: 'open' });
    
    // Bind event handlers
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.createRipple = this.createRipple.bind(this);
    
    // Initialize component
    this.render();
    this.attachEventListeners();
  }

  // Define which attributes to observe for changes
  static get observedAttributes() {
    return ['label', 'variant', 'disabled', 'loading', 'size', 'density', 'fab', 'icon-only', 'elevated', 'filled-tonal'];
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.attachEventListeners();
    }
  }

  // Getters and setters for properties
  get label() {
    return this.getAttribute('label') || '';
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get variant() {
    return this.getAttribute('variant') || 'filled';
  }

  set variant(value) {
    this.setAttribute('variant', value);
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

  get loading() {
    return this.hasAttribute('loading');
  }

  set loading(value) {
    if (value) {
      this.setAttribute('loading', '');
    } else {
      this.removeAttribute('loading');
    }
  }

  get size() {
    return this.getAttribute('size') || 'md';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  get density() {
    return this.getAttribute('density') || 'default';
  }

  set density(value) {
    this.setAttribute('density', value);
  }

  get fab() {
    return this.hasAttribute('fab');
  }

  set fab(value) {
    if (value) {
      this.setAttribute('fab', '');
    } else {
      this.removeAttribute('fab');
    }
  }

  get iconOnly() {
    return this.hasAttribute('icon-only');
  }

  set iconOnly(value) {
    if (value) {
      this.setAttribute('icon-only', '');
    } else {
      this.removeAttribute('icon-only');
    }
  }

  get elevated() {
    return this.hasAttribute('elevated');
  }

  set elevated(value) {
    if (value) {
      this.setAttribute('elevated', '');
    } else {
      this.removeAttribute('elevated');
    }
  }

  get filledTonal() {
    return this.hasAttribute('filled-tonal');
  }

  set filledTonal(value) {
    if (value) {
      this.setAttribute('filled-tonal', '');
    } else {
      this.removeAttribute('filled-tonal');
    }
  }

  // Handle click events
  handleClick(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Create ripple effect
    this.createRipple(event);

    // Emit custom click event
    this.dispatchEvent(new CustomEvent('click', {
      detail: {
        variant: this.variant,
        label: this.label,
        size: this.size,
        density: this.density
      },
      bubbles: true,
      cancelable: true
    }));
  }

  // Handle keyboard events
  handleKeyDown(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      return;
    }

    // Handle Enter and Space keys
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      
      // Create ripple effect centered
      this.createRipple();
      
      // Trigger click
      this.handleClick(event);
    }
  }

  // Handle focus events
  handleFocus(event) {
    if (this.disabled || this.loading) return;
    
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      button.classList.add('focused');
    }
  }

  // Handle blur events  
  handleBlur(event) {
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      button.classList.remove('focused', 'hovered', 'pressed');
    }
  }

  // Handle mouse enter for hover states
  handleMouseEnter(event) {
    if (this.disabled || this.loading) return;
    
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      button.classList.add('hovered');
    }
  }

  // Handle mouse leave
  handleMouseLeave(event) {
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      button.classList.remove('hovered', 'pressed');
    }
  }

  // Handle mouse down for pressed states
  handleMouseDown(event) {
    if (this.disabled || this.loading) return;
    
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      button.classList.add('pressed');
    }
  }

  // Handle mouse up
  handleMouseUp(event) {
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      button.classList.remove('pressed');
    }
  }

  // Create ripple effect
  createRipple(event) {
    const button = this.shadowRoot.querySelector('button');
    if (!button || this.disabled || this.loading) return;

    // Remove existing ripples
    const existingRipples = button.querySelectorAll('.ripple');
    existingRipples.forEach(ripple => ripple.remove());

    // Create ripple element
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    // Calculate ripple position and size
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const radius = size / 2;

    let x, y;
    if (event && event.clientX !== undefined) {
      // Mouse click - position ripple at click point
      x = event.clientX - rect.left - radius;
      y = event.clientY - rect.top - radius;
    } else {
      // Keyboard activation - center ripple
      x = rect.width / 2 - radius;
      y = rect.height / 2 - radius;
    }

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    button.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  // Attach event listeners - Enhanced for Material Design 3 state management
  attachEventListeners() {
    // Clean up existing listeners first
    this.removeEventListeners();
    
    const button = this.shadowRoot.querySelector('button');
    if (!button) return;
    
    // Attach all event listeners for enhanced state management
    button.addEventListener('click', this.handleClick);
    button.addEventListener('keydown', this.handleKeyDown);
    button.addEventListener('focus', this.handleFocus);
    button.addEventListener('blur', this.handleBlur);
    button.addEventListener('mouseenter', this.handleMouseEnter);
    button.addEventListener('mouseleave', this.handleMouseLeave);
    button.addEventListener('mousedown', this.handleMouseDown);
    button.addEventListener('mouseup', this.handleMouseUp);
    
    // Store references for cleanup
    this._eventTargets = [
      { element: button, events: ['click', 'keydown', 'focus', 'blur', 'mouseenter', 'mouseleave', 'mousedown', 'mouseup'] }
    ];
  }

  // Remove event listeners - Enhanced cleanup pattern
  removeEventListeners() {
    if (this._eventTargets) {
      this._eventTargets.forEach(target => {
        target.element.removeEventListener('click', this.handleClick);
        target.element.removeEventListener('keydown', this.handleKeyDown);
        target.element.removeEventListener('focus', this.handleFocus);
        target.element.removeEventListener('blur', this.handleBlur);
        target.element.removeEventListener('mouseenter', this.handleMouseEnter);
        target.element.removeEventListener('mouseleave', this.handleMouseLeave);
        target.element.removeEventListener('mousedown', this.handleMouseDown);
        target.element.removeEventListener('mouseup', this.handleMouseUp);
      });
      this._eventTargets = null;
    }
  }

  // Cleanup on disconnect - part of standardized lifecycle
  disconnectedCallback() {
    this.removeEventListeners();
  }

  // Render the component
  render() {
    const isLoading = this.loading;
    const isDisabled = this.disabled;
    const variant = this.variant;
    const size = this.size;
    const density = this.density;
    const isElevated = this.elevated;
    const isFilledTonal = this.filledTonal;
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Enhanced Material Design 3 button variables with better semantic naming */
          --_button-min-width: 64px;
          --_button-state-layer-size: 40px;
          --_button-border-width: 1px;
          
          /* Size system aligned with global variables */
          --_button-height-xs: 24px;
          --_button-height-sm: var(--_global-component-height-sm);
          --_button-height-md: var(--_global-component-height-md);
          --_button-height-lg: var(--_global-component-height-lg);
          --_button-height-xl: 56px;
          
          /* Padding system with improved spacing */
          --_button-padding-xs: 0 var(--_global-spacing-sm);
          --_button-padding-sm: 0 var(--_global-spacing-md);
          --_button-padding-md: 0 var(--_global-spacing-lg);
          --_button-padding-lg: 0 var(--_global-spacing-xl);
          --_button-padding-xl: 0 calc(var(--_global-spacing-xl) + 4px);
          
          /* Typography system */
          --_button-font-family: var(--_global-font-family-sans);
          --_button-font-size-xs: var(--_global-font-size-xs);
          --_button-font-size-sm: var(--_global-font-size-sm);
          --_button-font-size-md: var(--_global-font-size-md);
          --_button-font-size-lg: var(--_global-font-size-lg);
          --_button-font-size-xl: var(--_global-font-size-xl);
          --_button-font-weight: var(--_global-font-weight-medium);
          --_button-line-height: var(--_global-line-height-tight);
          
          /* Border radius system */
          --_button-border-radius: var(--_global-border-radius-full);
          --_button-border-radius-fab: var(--_global-border-radius-lg);
          --_button-gap: var(--_global-spacing-sm);
          
          /* Enhanced motion system */
          --_button-transition: var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          --_button-transition-fast: var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
          --_button-transition-emphasized: var(--_global-motion-duration-short2) var(--_global-motion-easing-emphasized);
          
          /* Material Design 3 color tokens */
          /* Filled variant colors */
          --_button-filled-bg: var(--_global-color-primary);
          --_button-filled-text: var(--_global-color-on-primary);
          --_button-filled-state-layer: var(--_global-color-on-primary);
          
          /* Filled-tonal variant colors */
          --_button-filled-tonal-bg: var(--_global-color-secondary-container);
          --_button-filled-tonal-text: var(--_global-color-on-secondary-container);
          --_button-filled-tonal-state-layer: var(--_global-color-on-secondary-container);
          
          /* Elevated variant colors */
          --_button-elevated-bg: var(--_global-color-surface-container-low);
          --_button-elevated-text: var(--_global-color-primary);
          --_button-elevated-state-layer: var(--_global-color-primary);
          
          /* Outlined variant colors */
          --_button-outlined-bg: transparent;
          --_button-outlined-text: var(--_global-color-primary);
          --_button-outlined-border: var(--_button-border-width) solid var(--_global-color-outline);
          --_button-outlined-state-layer: var(--_global-color-primary);
          
          /* Text variant colors */
          --_button-text-bg: transparent;
          --_button-text-text: var(--_global-color-primary);
          --_button-text-state-layer: var(--_global-color-primary);
          
          /* Status variant colors */
          --_button-success-bg: var(--_global-color-success);
          --_button-success-text: var(--_global-color-on-success);
          --_button-error-bg: var(--_global-color-error);
          --_button-error-text: var(--_global-color-on-error);
          
          /* Elevation system */
          --_button-elevation: var(--_global-elevation-1);
          --_button-elevation-hover: var(--_global-elevation-2);
          --_button-elevation-elevated: var(--_global-elevation-1);
          --_button-elevation-elevated-hover: var(--_global-elevation-2);
          
          /* Enhanced state layer system */
          --_button-state-layer-hover: var(--_global-state-layer-hover);
          --_button-state-layer-focus: var(--_global-state-layer-focus);
          --_button-state-layer-pressed: var(--_global-state-layer-pressed);
          
          /* Focus ring system */
          --_button-focus-ring: 2px solid var(--_global-color-primary);
          --_button-focus-ring-offset: 2px;
          
          /* Ripple system */
          --_button-ripple-size: calc(var(--_button-state-layer-size) * 1.5);
          --_button-ripple-duration: var(--_global-ripple-duration);
          --_button-ripple-easing: var(--_global-ripple-easing);
          
          /* Disabled state */
          --_button-disabled-opacity: 0.5;
          --_button-disabled-bg: var(--_global-color-outline-variant);
          --_button-disabled-text: var(--_global-color-outline);
          
          display: inline-flex;
          position: relative;
          isolation: isolate;
        }

        button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--_button-gap);
          position: relative;
          
          min-width: var(--_button-min-width);
          height: var(--_button-height-md);
          padding: var(--_button-padding-md);
          
          font-family: var(--_button-font-family);
          font-size: var(--_button-font-size-md);
          font-weight: var(--_button-font-weight);
          line-height: var(--_button-line-height);
          text-align: center;
          white-space: nowrap;
          user-select: none;
          
          border: none;
          border-radius: var(--_button-border-radius);
          cursor: pointer;
          
          transition: var(--_button-transition);
          outline: none;
          overflow: hidden;
          isolation: isolate;
          
          /* Default filled variant styling */
          background-color: var(--_button-filled-bg);
          color: var(--_button-filled-text);
          box-shadow: var(--_button-elevation);
        }

        /* Enhanced state layer with Material Design 3 principles */
        button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: inherit;
          background-color: var(--_button-filled-state-layer);
          opacity: 0;
          transition: var(--_button-transition-fast);
          pointer-events: none;
          z-index: -1;
        }

        /* Hover state layer */
        button.hovered:not(:disabled)::before {
          opacity: var(--_button-state-layer-hover);
        }

        /* Focus state layer */
        button.focused:not(:disabled)::before {
          opacity: var(--_button-state-layer-focus);
        }

        /* Pressed state layer */
        button.pressed:not(:disabled)::before {
          opacity: var(--_button-state-layer-pressed);
          transform: scale(0.98);
          transition: var(--_button-transition-emphasized);
        }

        /* Enhanced focus ring with proper accessibility */
        button.focused:not(:disabled) {
          outline: var(--_button-focus-ring);
          outline-offset: var(--_button-focus-ring-offset);
        }

        /* Hover elevation enhancement */
        button.hovered:not(:disabled) {
          box-shadow: var(--_button-elevation-hover);
          transform: translateY(-1px);
        }

        /* Enhanced size variants with proper scaling */
        button.size-xs {
          height: var(--_button-height-xs);
          padding: var(--_button-padding-xs);
          font-size: var(--_button-font-size-xs);
          min-width: 48px;
        }

        button.size-sm {
          height: var(--_button-height-sm);
          padding: var(--_button-padding-sm);
          font-size: var(--_button-font-size-sm);
        }

        button.size-lg {
          height: var(--_button-height-lg);
          padding: var(--_button-padding-lg);
          font-size: var(--_button-font-size-lg);
        }

        button.size-xl {
          height: var(--_button-height-xl);
          padding: var(--_button-padding-xl);
          font-size: var(--_button-font-size-xl);
        }

        /* Enhanced density variants */
        button.density-compact {
          min-width: 48px;
          letter-spacing: 0.01em;
        }

        button.density-compact.size-sm {
          height: var(--_global-component-height-sm-compact);
          padding: 0 var(--_global-spacing-sm);
        }

        button.density-compact.size-md {
          height: var(--_global-component-height-md-compact);
          padding: 0 var(--_global-spacing-md);
        }

        button.density-compact.size-lg {
          height: var(--_global-component-height-lg-compact);
          padding: 0 var(--_global-spacing-lg);
        }

        /* Material Design 3 Variant System */
        
        /* Filled variant (default) */
        button.variant-filled,
        button.variant-primary {
          background-color: var(--_button-filled-bg);
          color: var(--_button-filled-text);
          box-shadow: var(--_button-elevation);
        }

        button.variant-filled::before,
        button.variant-primary::before {
          background-color: var(--_button-filled-state-layer);
        }

        /* Filled-tonal variant */
        button.variant-filled-tonal {
          background-color: var(--_button-filled-tonal-bg);
          color: var(--_button-filled-tonal-text);
          box-shadow: none;
        }

        button.variant-filled-tonal::before {
          background-color: var(--_button-filled-tonal-state-layer);
        }

        /* Elevated variant */
        button.variant-elevated {
          background-color: var(--_button-elevated-bg);
          color: var(--_button-elevated-text);
          box-shadow: var(--_button-elevation-elevated);
        }

        button.variant-elevated::before {
          background-color: var(--_button-elevated-state-layer);
        }

        button.variant-elevated.hovered:not(:disabled) {
          box-shadow: var(--_button-elevation-elevated-hover);
        }

        /* Outlined variant */
        button.variant-outlined {
          background-color: var(--_button-outlined-bg);
          color: var(--_button-outlined-text);
          border: var(--_button-outlined-border);
          box-shadow: none;
        }

        button.variant-outlined::before {
          background-color: var(--_button-outlined-state-layer);
        }

        /* Text variant */
        button.variant-text {
          background-color: var(--_button-text-bg);
          color: var(--_button-text-text);
          box-shadow: none;
          min-width: auto;
        }

        button.variant-text::before {
          background-color: var(--_button-text-state-layer);
        }

        /* Legacy support variants */
        button.variant-secondary {
          background-color: var(--_global-color-secondary);
          color: var(--_global-color-on-secondary);
          box-shadow: var(--_button-elevation);
        }

        button.variant-secondary::before {
          background-color: var(--_global-color-on-secondary);
        }

        button.variant-ghost {
          background-color: transparent;
          color: var(--_global-color-primary);
          border: 1px solid var(--_global-color-outline);
          box-shadow: none;
        }

        button.variant-ghost::before {
          background-color: var(--_global-color-primary);
        }

        /* Status variants with enhanced styling */
        button.variant-success {
          background-color: var(--_button-success-bg);
          color: var(--_button-success-text);
          box-shadow: var(--_button-elevation);
        }

        button.variant-success::before {
          background-color: var(--_button-success-text);
        }

        button.variant-danger,
        button.variant-error {
          background-color: var(--_button-error-bg);
          color: var(--_button-error-text);
          box-shadow: var(--_button-elevation);
        }

        button.variant-danger::before,
        button.variant-error::before {
          background-color: var(--_button-error-text);
        }

        /* Enhanced Floating Action Button (FAB) styles */
        :host([fab]) button {
          border-radius: var(--_button-border-radius-fab);
          min-width: 56px;
          width: 56px;
          height: 56px;
          padding: 0;
          box-shadow: var(--_global-elevation-2);
          background-color: var(--_button-filled-bg);
          color: var(--_button-filled-text);
        }

        :host([fab]) button.hovered:not(:disabled) {
          box-shadow: var(--_global-elevation-3);
          transform: translateY(-2px);
        }

        :host([fab][size="xs"]) button {
          width: 32px;
          height: 32px;
          min-width: 32px;
        }

        :host([fab][size="sm"]) button {
          width: 40px;
          height: 40px;
          min-width: 40px;
        }

        :host([fab][size="lg"]) button {
          width: 72px;
          height: 72px;
          min-width: 72px;
        }

        :host([fab][size="xl"]) button {
          width: 96px;
          height: 96px;
          min-width: 96px;
        }

        /* Enhanced icon-only button styles */
        :host([icon-only]) button {
          min-width: var(--_button-height-md);
          width: var(--_button-height-md);
          padding: 0;
          border-radius: var(--_global-border-radius-full);
        }

        :host([icon-only][size="xs"]) button {
          min-width: var(--_button-height-xs);
          width: var(--_button-height-xs);
        }

        :host([icon-only][size="sm"]) button {
          min-width: var(--_button-height-sm);
          width: var(--_button-height-sm);
        }

        :host([icon-only][size="lg"]) button {
          min-width: var(--_button-height-lg);
          width: var(--_button-height-lg);
        }

        :host([icon-only][size="xl"]) button {
          min-width: var(--_button-height-xl);
          width: var(--_button-height-xl);
        }

        /* Enhanced disabled state following Material Design 3 */
        button:disabled,
        :host([disabled]) button,
        :host([loading]) button {
          background-color: var(--_button-disabled-bg);
          color: var(--_button-disabled-text);
          opacity: var(--_button-disabled-opacity);
          cursor: not-allowed;
          pointer-events: none;
          transform: none !important;
          box-shadow: none !important;
        }

        button:disabled::before,
        :host([disabled]) button::before,
        :host([loading]) button::before {
          display: none;
        }

        /* Enhanced loading state */
        button.loading {
          position: relative;
          cursor: not-allowed;
          pointer-events: none;
        }

        /* Improved loading spinner with Material Design aesthetics */
        .loading-spinner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin var(--_global-motion-duration-long2) linear infinite;
          z-index: 2;
        }

        .loading-spinner.size-xs {
          width: 12px;
          height: 12px;
          border-width: 1px;
        }

        .loading-spinner.size-sm {
          width: 16px;
          height: 16px;
          border-width: 2px;
        }

        .loading-spinner.size-lg {
          width: 24px;
          height: 24px;
          border-width: 3px;
        }

        .loading-spinner.size-xl {
          width: 28px;
          height: 28px;
          border-width: 3px;
        }

        @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* Enhanced content container */
        .content {
          display: inline-flex;
          align-items: center;
          gap: var(--_button-gap);
          position: relative;
          z-index: 1;
        }

        /* Hide content when loading with improved transition */
        button.loading .content {
          opacity: 0;
          transition: opacity var(--_button-transition-fast);
        }

        /* Enhanced ripple effect following Material Design 3 principles */
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple-animation var(--_button-ripple-duration) var(--_button-ripple-easing);
          background-color: var(--_global-ripple-color-light);
          opacity: var(--_global-ripple-opacity-pressed);
          pointer-events: none;
          z-index: 0;
          mix-blend-mode: normal;
        }

        /* Dynamic ripple colors based on variant */
        button.variant-outlined .ripple,
        button.variant-text .ripple,
        button.variant-ghost .ripple,
        button.variant-elevated .ripple {
          background-color: var(--_global-ripple-color-dark);
        }

        @keyframes ripple-animation {
          0% {
            transform: scale(0);
            opacity: var(--_global-ripple-opacity-pressed);
          }
          20% {
            transform: scale(0.3);
            opacity: calc(var(--_global-ripple-opacity-pressed) * 0.8);
          }
          50% {
            transform: scale(1);
            opacity: calc(var(--_global-ripple-opacity-pressed) * 0.4);
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        /* Enhanced High Contrast Mode Support */
        @media (prefers-contrast: high) {
          :host {
            --_button-border-width: 2px;
          }
          
          button {
            border: var(--_button-border-width) solid currentColor;
            background-color: var(--_global-color-surface);
            color: var(--_global-color-on-surface);
          }
          
          button.variant-filled,
          button.variant-primary,
          button.variant-secondary,
          button.variant-success,
          button.variant-danger,
          button.variant-error {
            background-color: var(--_global-color-primary);
            color: var(--_global-color-on-primary);
            outline: 2px solid var(--_global-color-on-surface);
            outline-offset: 2px;
          }
          
          button::before,
          .ripple {
            display: none;
          }
          
          button.focused:not(:disabled) {
            outline-width: 4px;
            outline-style: double;
          }
        }

        /* Enhanced Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          :host {
            --_button-transition: none;
            --_button-transition-fast: none;
            --_button-transition-emphasized: none;
          }
          
          button,
          button::before,
          .loading-spinner,
          .ripple,
          .content {
            animation: none !important;
            transition: none !important;
          }
          
          .ripple {
            display: none;
          }
          
          button.hovered:not(:disabled),
          button.pressed:not(:disabled) {
            transform: none;
          }
          
          button.loading .content {
            opacity: 0.5;
          }
        }

        /* Enhanced focus-visible support with better keyboard navigation */
        @supports selector(:focus-visible) {
          button:focus:not(:focus-visible) {
            outline: none;
          }
          
          button:focus:not(:focus-visible)::before {
            opacity: 0;
          }
          
          button:focus-visible,
          button.focused {
            outline: var(--_button-focus-ring);
            outline-offset: var(--_button-focus-ring-offset);
          }
        }
        
        /* Color scheme adaptation */
        @media (prefers-color-scheme: dark) {
          :host {
            --_button-elevation: 0 2px 8px rgba(0, 0, 0, 0.4);
            --_button-elevation-hover: 0 4px 12px rgba(0, 0, 0, 0.5);
          }
        }
      </style>
      <button 
        class="variant-${variant} size-${size} density-${density} ${isLoading ? 'loading' : ''}"
        ${isDisabled || isLoading ? 'disabled' : ''}
        aria-label="${this.label || 'button'}"
        ${isLoading ? 'aria-busy="true"' : ''}
        ${isDisabled ? 'aria-disabled="true"' : ''}
        role="button"
        tabindex="${isDisabled ? '-1' : '0'}"
        type="button"
      >
        ${isLoading ? `<div class="loading-spinner size-${size}" aria-hidden="true"></div>` : ''}
        <span class="content">
          <slot>${this.label}</slot>
        </span>
      </button>
    `;
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-button')) {
  customElements.define('my-button', MyButton);
}