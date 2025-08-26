/**
 * MyntUI my-button Component
 * A Material Design 3 button component with enhanced state layers, accessibility, and consistency
 * Enhanced version using MyntUIBaseComponent for improved consistency and maintainability
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';

class MyButton extends MyntUIBaseComponent {
  constructor() {
    super();
    
    // Component-specific bindings (base class handles common ones)
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    
    // Initialize with base component pattern
    this.log('Button component initializing...');
  }

  // Extended observed attributes (inherits base ones)
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'label', 'density', 'fab', 'icon-only', 'elevated', 'filled-tonal'
    ];
  }

  // Component-specific attribute handling
  handleAttributeChange(name, oldValue, newValue) {
    super.handleAttributeChange(name, oldValue, newValue);
    
    switch (name) {
      case 'disabled':
      case 'loading':
        this.announceToScreenReader(
          `Button ${name} ${newValue !== null ? 'enabled' : 'disabled'}`,
          'polite'
        );
        break;
      case 'label':
        this.announceToScreenReader(
          `Button label changed to ${newValue}`,
          'polite'
        );
        break;
    }
  }

  // Enhanced getters and setters with validation (inherits common ones from base)
  get label() {
    return this.getAttribute('label') || '';
  }

  set label(value) {
    if (this.validateAttribute('label', value, (v) => typeof v === 'string')) {
      this.setAttribute('label', value);
      this.log('Label changed:', value);
    }
  }

  get density() {
    return this.getAttribute('density') || 'default';
  }

  set density(value) {
    const validDensities = ['default', 'compact', 'comfortable'];
    if (this.validateAttribute('density', value, validDensities)) {
      this.setAttribute('density', value);
    }
  }

  get fab() {
    return this.hasAttribute('fab');
  }

  set fab(value) {
    this.toggleAttribute('fab', Boolean(value));
  }

  get iconOnly() {
    return this.hasAttribute('icon-only');
  }

  set iconOnly(value) {
    this.toggleAttribute('icon-only', Boolean(value));
  }

  get elevated() {
    return this.hasAttribute('elevated');
  }

  set elevated(value) {
    this.toggleAttribute('elevated', Boolean(value));
  }

  get filledTonal() {
    return this.hasAttribute('filled-tonal');
  }

  set filledTonal(value) {
    this.toggleAttribute('filled-tonal', Boolean(value));
  }

  // Handle click events
  handleClick(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Create ripple effect using base component method
    this.createRipple(event);

    // Emit click event using base component method
    this.emit('click', {
      variant: this.variant,
      label: this.label,
      size: this.size,
      density: this.density
    });
  }

  // Handle keyboard events (extends base class)
  handleKeyDown(event) {
    super.handleKeyDown(event); // Handle common key patterns
    
    if (this.disabled || this.loading) {
      event.preventDefault();
      return;
    }

    // Handle Enter and Space keys for button activation
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      
      // Create ripple effect centered
      this.createRipple();
      
      // Trigger click
      this.handleClick(event);
    }
  }

  // Override base focus/blur handling for button-specific behavior
  handleFocus() {
    super.handleFocus(); // Call base class behavior
    if (this.disabled || this.loading) return;
    
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      button.classList.add('focused');
    }
  }

  handleBlur() {
    super.handleBlur(); // Call base class behavior
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


  // Attach event listeners using base component pattern
  attachEventListeners() {
    this.removeEventListeners(); // Clean up existing listeners
    
    const button = this.shadowRoot.querySelector('button');
    if (!button) return;
    
    // Use base component's standardized event listener management
    this.addEventListeners([
      {
        element: button,
        events: ['click'],
        handler: this.handleClick
      },
      {
        element: button,
        events: ['keydown'],
        handler: this.handleKeyDown
      },
      {
        element: button,
        events: ['focus'],
        handler: this.handleFocus
      },
      {
        element: button,
        events: ['blur'],
        handler: this.handleBlur
      },
      {
        element: button,
        events: ['mouseenter'],
        handler: this.handleMouseEnter
      },
      {
        element: button,
        events: ['mouseleave'],
        handler: this.handleMouseLeave
      },
      {
        element: button,
        events: ['mousedown'],
        handler: this.handleMouseDown
      },
      {
        element: button,
        events: ['mouseup'],
        handler: this.handleMouseUp
      }
    ]);
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
          /* Enhanced Material Design 3 button variables using global system */
          --_button-min-width: var(--_global-button-min-width);
          --_button-state-layer-size: 40px;
          --_button-border-width: 1px;
          
          /* Size system aligned with global variables */
          --_button-height-xs: 24px;
          --_button-height-sm: var(--_global-component-height-sm);
          --_button-height-md: var(--_global-component-height-md);
          --_button-height-lg: var(--_global-component-height-lg);
          --_button-height-xl: 56px;
          
          /* Padding system using global variables */
          --_button-padding-xs: var(--_global-button-padding-xs);
          --_button-padding-sm: var(--_global-button-padding-sm);
          --_button-padding-md: var(--_global-button-padding-md);
          --_button-padding-lg: var(--_global-button-padding-lg);
          --_button-padding-xl: 0 calc(var(--_global-spacing-xl) + 4px);
          
          /* Typography system with enhanced weights */
          --_button-font-family: var(--_global-font-family-sans);
          --_button-font-size-xs: var(--_global-font-size-xs);
          --_button-font-size-sm: var(--_global-font-size-sm);
          --_button-font-size-md: var(--_global-font-size-md);
          --_button-font-size-lg: var(--_global-font-size-lg);
          --_button-font-size-xl: var(--_global-font-size-xl);
          --_button-font-weight: var(--_global-font-weight-semibold);
          --_button-font-weight-emphasized: var(--_global-font-weight-bold);
          --_button-line-height: var(--_global-line-height-tight);
          --_button-letter-spacing: 0.02em;
          
          /* Border radius system - Material Design 3 standard */
          --_button-border-radius: var(--_global-border-radius-full);
          --_button-border-radius-fab: var(--_global-border-radius-lg);
          --_button-gap: var(--_global-spacing-sm);
          
          /* Advanced spring-based motion system using global variables */
          --_button-spring-bounce: var(--_global-spring-bounce);
          --_button-spring-smooth: var(--_global-spring-smooth);
          --_button-spring-snappy: var(--_global-spring-snappy);
          --_button-transition: 280ms var(--_button-spring-smooth);
          --_button-transition-fast: 180ms var(--_button-spring-smooth);
          --_button-transition-bounce: 320ms var(--_button-spring-bounce);
          --_button-transition-snappy: 240ms var(--_button-spring-snappy);
          
          /* Enhanced Material Design 3 color system with gradients */
          /* Filled variant colors */
          --_button-filled-bg: linear-gradient(135deg, var(--_global-color-primary) 0%, color-mix(in srgb, var(--_global-color-primary) 85%, var(--_global-color-primary-container)) 100%);
          --_button-filled-bg-solid: var(--_global-color-primary);
          --_button-filled-text: var(--_global-color-on-primary);
          --_button-filled-state-layer: var(--_global-color-on-primary);
          --_button-filled-shadow: 0 2px 8px color-mix(in srgb, var(--_global-color-primary) 35%, transparent);
          --_button-filled-shadow-hover: 0 6px 20px color-mix(in srgb, var(--_global-color-primary) 45%, transparent);
          
          /* Filled-tonal variant colors */
          --_button-filled-tonal-bg: linear-gradient(135deg, var(--_global-color-secondary-container) 0%, color-mix(in srgb, var(--_global-color-secondary-container) 90%, var(--_global-color-tertiary-container)) 100%);
          --_button-filled-tonal-bg-solid: var(--_global-color-secondary-container);
          --_button-filled-tonal-text: var(--_global-color-on-secondary-container);
          --_button-filled-tonal-state-layer: var(--_global-color-on-secondary-container);
          --_button-filled-tonal-shadow: 0 2px 8px color-mix(in srgb, var(--_global-color-secondary-container) 25%, transparent);
          
          /* Elevated variant colors */
          --_button-elevated-bg: linear-gradient(135deg, var(--_global-color-surface-container-low) 0%, color-mix(in srgb, var(--_global-color-surface-container-low) 95%, var(--_global-color-surface-container)) 100%);
          --_button-elevated-bg-solid: var(--_global-color-surface-container-low);
          --_button-elevated-text: var(--_global-color-primary);
          --_button-elevated-state-layer: var(--_global-color-primary);
          --_button-elevated-shadow: 0 4px 16px color-mix(in srgb, var(--_global-color-outline) 15%, transparent);
          --_button-elevated-shadow-hover: 0 8px 24px color-mix(in srgb, var(--_global-color-outline) 25%, transparent);
          
          /* Outlined variant colors */
          --_button-outlined-bg: transparent;
          --_button-outlined-text: var(--_global-color-primary);
          --_button-outlined-border: var(--_button-border-width) solid var(--_global-color-outline);
          --_button-outlined-border-hover: var(--_button-border-width) solid var(--_global-color-primary);
          --_button-outlined-state-layer: var(--_global-color-primary);
          
          /* Text variant colors */
          --_button-text-bg: transparent;
          --_button-text-text: var(--_global-color-primary);
          --_button-text-state-layer: var(--_global-color-primary);
          
          /* Status variant colors with enhanced gradients */
          --_button-success-bg: linear-gradient(135deg, var(--_global-color-success) 0%, color-mix(in srgb, var(--_global-color-success) 85%, #22c55e) 100%);
          --_button-success-text: var(--_global-color-on-success);
          --_button-error-bg: linear-gradient(135deg, var(--_global-color-error) 0%, color-mix(in srgb, var(--_global-color-error) 85%, #ef4444) 100%);
          --_button-error-text: var(--_global-color-on-error);
          
          /* Advanced elevation system */
          --_button-elevation: var(--_global-elevation-1);
          --_button-elevation-hover: 0 6px 20px color-mix(in srgb, var(--_global-color-shadow) 12%, transparent), 0 2px 8px color-mix(in srgb, var(--_global-color-shadow) 8%, transparent);
          --_button-elevation-elevated: 0 4px 16px color-mix(in srgb, var(--_global-color-shadow) 10%, transparent);
          --_button-elevation-elevated-hover: 0 8px 28px color-mix(in srgb, var(--_global-color-shadow) 16%, transparent), 0 4px 12px color-mix(in srgb, var(--_global-color-shadow) 12%, transparent);
          
          /* Enhanced state layer system using global variables */
          --_button-state-layer-hover: var(--_global-state-layer-hover);
          --_button-state-layer-focus: var(--_global-state-layer-focus);
          --_button-state-layer-pressed: var(--_global-state-layer-pressed);
          --_button-state-layer-dragged: var(--_global-state-layer-dragged);
          
          /* Multi-layered focus ring system using global variables */
          --_button-focus-ring-primary: var(--_global-focus-ring-primary);
          --_button-focus-ring-secondary: var(--_global-focus-ring-secondary);
          --_button-focus-ring-offset: var(--_global-focus-ring-offset);
          --_button-focus-glow: var(--_global-focus-glow);
          
          /* Enhanced ripple system */
          --_button-ripple-size: calc(var(--_button-state-layer-size) * 1.5);
          --_button-ripple-duration: 480ms;
          --_button-ripple-easing: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          --_button-ripple-scale-start: 0;
          --_button-ripple-scale-end: 2.5;
          
          /* Premium disabled state */
          --_button-disabled-opacity: 0.38;
          --_button-disabled-bg: color-mix(in srgb, var(--_global-color-on-surface) 12%, transparent);
          --_button-disabled-text: color-mix(in srgb, var(--_global-color-on-surface) 38%, transparent);
          
          display: inline-flex;
          position: relative;
          isolation: isolate;
          will-change: transform, box-shadow;
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
          letter-spacing: var(--_button-letter-spacing);
          text-align: center;
          white-space: nowrap;
          user-select: none;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          
          border: none;
          border-radius: var(--_button-border-radius);
          cursor: pointer;
          
          /* Enhanced spring-based transitions */
          transition: 
            transform var(--_button-transition),
            box-shadow var(--_button-transition),
            background var(--_button-transition-fast),
            color var(--_button-transition-fast),
            border-color var(--_button-transition-fast),
            filter var(--_button-transition-fast);
          
          outline: none;
          overflow: hidden;
          isolation: isolate;
          will-change: transform, box-shadow, filter;
          
          /* Default filled variant with enhanced styling */
          background: var(--_button-filled-bg);
          color: var(--_button-filled-text);
          box-shadow: var(--_button-filled-shadow);
          
          /* Premium backdrop filter for glass effect on light backgrounds */
          backdrop-filter: saturate(180%) blur(20px);
          
          /* Enhanced micro-interaction preparation */
          transform: translateZ(0) scale(1);
          filter: brightness(1) contrast(1);
        }

        /* Simplified state layer system */
        button::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: var(--_global-state-layer-color-primary);
          opacity: 0;
          transition: opacity var(--_button-transition-fast);
          pointer-events: none;
          z-index: 1;
        }

        /* Enhanced hover state with spring physics */
        button.hovered:not(:disabled) {
          transform: var(--_global-micro-scale-subtle) var(--_global-micro-translate-subtle);
          box-shadow: var(--_button-elevation-hover);
          filter: brightness(1.05);
          transition: 
            transform var(--_button-transition-bounce),
            box-shadow var(--_button-transition-bounce),
            filter var(--_button-transition-fast);
        }

        button.hovered:not(:disabled)::before {
          opacity: var(--_button-state-layer-hover);
        }

        /* Simplified focus state with global focus system */
        button.focused:not(:disabled) {
          outline: none;
          box-shadow: var(--_button-focus-glow);
          filter: brightness(1.08);
        }

        button.focused:not(:disabled)::before {
          opacity: var(--_button-state-layer-focus);
        }

        /* Simplified pressed state */
        button.pressed:not(:disabled) {
          transform: scale(0.98) translateY(1px);
          box-shadow: var(--_global-elevation-1);
          filter: brightness(0.95);
          transition: all var(--_button-transition-snappy);
        }

        button.pressed:not(:disabled)::before {
          opacity: var(--_button-state-layer-pressed);
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

        /* Enhanced Material Design 3 Variant System with Premium Styling */
        
        /* Filled variant (default) with gradient background */
        button.variant-filled,
        button.variant-primary {
          background: var(--_button-filled-bg);
          color: var(--_button-filled-text);
          box-shadow: var(--_button-filled-shadow);
          font-weight: var(--_button-font-weight);
        }

        button.variant-filled::before,
        button.variant-primary::before {
          background: radial-gradient(circle at center, var(--_button-filled-state-layer) 0%, transparent 70%);
        }

        button.variant-filled::after,
        button.variant-primary::after {
          background: var(--_button-filled-state-layer);
        }

        button.variant-filled.hovered:not(:disabled),
        button.variant-primary.hovered:not(:disabled) {
          box-shadow: var(--_button-filled-shadow-hover);
          filter: brightness(1.08) saturate(1.05);
        }

        /* Filled-tonal variant with enhanced gradient */
        button.variant-filled-tonal {
          background: var(--_button-filled-tonal-bg);
          color: var(--_button-filled-tonal-text);
          box-shadow: var(--_button-filled-tonal-shadow);
          font-weight: var(--_button-font-weight);
        }

        button.variant-filled-tonal::before {
          background: radial-gradient(circle at center, var(--_button-filled-tonal-state-layer) 0%, transparent 70%);
        }

        button.variant-filled-tonal::after {
          background: var(--_button-filled-tonal-state-layer);
        }

        button.variant-filled-tonal.hovered:not(:disabled) {
          filter: brightness(1.05) saturate(1.1);
        }

        /* Elevated variant with premium glass effect */
        button.variant-elevated {
          background: var(--_button-elevated-bg);
          color: var(--_button-elevated-text);
          box-shadow: var(--_button-elevated-shadow);
          backdrop-filter: saturate(180%) blur(20px);
          border: 1px solid color-mix(in srgb, var(--_global-color-surface-variant) 30%, transparent);
        }

        button.variant-elevated::before {
          background: radial-gradient(circle at center, var(--_button-elevated-state-layer) 0%, transparent 70%);
        }

        button.variant-elevated::after {
          background: var(--_button-elevated-state-layer);
        }

        button.variant-elevated.hovered:not(:disabled) {
          box-shadow: var(--_button-elevated-shadow-hover);
          border-color: color-mix(in srgb, var(--_global-color-primary) 20%, transparent);
          filter: brightness(1.02) saturate(1.05);
        }

        /* Outlined variant with enhanced border animations */
        button.variant-outlined {
          background: var(--_button-outlined-bg);
          color: var(--_button-outlined-text);
          border: var(--_button-outlined-border);
          box-shadow: none;
          position: relative;
          overflow: hidden;
        }

        button.variant-outlined::before {
          background: radial-gradient(circle at center, var(--_button-outlined-state-layer) 0%, transparent 70%);
        }

        button.variant-outlined::after {
          background: var(--_button-outlined-state-layer);
        }

        button.variant-outlined.hovered:not(:disabled) {
          border-color: var(--_global-color-primary);
          background: color-mix(in srgb, var(--_global-color-primary) 4%, transparent);
          filter: brightness(1.02);
        }

        button.variant-outlined.focused:not(:disabled) {
          border-color: var(--_global-color-primary);
          box-shadow: 
            var(--_button-focus-glow),
            0 0 0 1px color-mix(in srgb, var(--_global-color-primary) 40%, transparent);
        }

        /* Text variant with subtle hover area */
        button.variant-text {
          background: var(--_button-text-bg);
          color: var(--_button-text-text);
          box-shadow: none;
          min-width: auto;
          padding: var(--_global-spacing-sm) var(--_global-spacing-md);
        }

        button.variant-text::before {
          background: radial-gradient(circle at center, var(--_button-text-state-layer) 0%, transparent 70%);
        }

        button.variant-text::after {
          background: var(--_button-text-state-layer);
        }

        button.variant-text.hovered:not(:disabled) {
          background: color-mix(in srgb, var(--_global-color-primary) 6%, transparent);
          transform: translateZ(0) scale(1.01);
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

        /* Status variants with premium gradient styling */
        button.variant-success {
          background: var(--_button-success-bg);
          color: var(--_button-success-text);
          box-shadow: 0 2px 8px color-mix(in srgb, var(--_global-color-success) 35%, transparent);
          font-weight: var(--_button-font-weight);
        }

        button.variant-success::before {
          background: radial-gradient(circle at center, var(--_button-success-text) 0%, transparent 70%);
        }

        button.variant-success::after {
          background: var(--_button-success-text);
        }

        button.variant-success.hovered:not(:disabled) {
          box-shadow: 0 6px 20px color-mix(in srgb, var(--_global-color-success) 45%, transparent);
          filter: brightness(1.08) saturate(1.1);
        }

        button.variant-danger,
        button.variant-error {
          background: var(--_button-error-bg);
          color: var(--_button-error-text);
          box-shadow: 0 2px 8px color-mix(in srgb, var(--_global-color-error) 35%, transparent);
          font-weight: var(--_button-font-weight);
        }

        button.variant-danger::before,
        button.variant-error::before {
          background: radial-gradient(circle at center, var(--_button-error-text) 0%, transparent 70%);
        }

        button.variant-danger::after,
        button.variant-error::after {
          background: var(--_button-error-text);
        }

        button.variant-danger.hovered:not(:disabled),
        button.variant-error.hovered:not(:disabled) {
          box-shadow: 0 6px 20px color-mix(in srgb, var(--_global-color-error) 45%, transparent);
          filter: brightness(1.08) saturate(1.1);
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

        /* Premium loading spinner with sophisticated animations */
        .loading-spinner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          z-index: 2;
        }

        .loading-spinner::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-right: 1px solid color-mix(in srgb, currentColor 40%, transparent);
          border-radius: 50%;
          animation: 
            spinner-rotate 1200ms cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite,
            spinner-pulse 2000ms cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .loading-spinner::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          right: 2px;
          bottom: 2px;
          border: 1px solid transparent;
          border-top: 1px solid color-mix(in srgb, currentColor 60%, transparent);
          border-radius: 50%;
          animation: spinner-rotate 800ms linear infinite reverse;
        }

        .loading-spinner.size-xs {
          width: 12px;
          height: 12px;
        }

        .loading-spinner.size-xs::before {
          border-width: 1px;
        }

        .loading-spinner.size-xs::after {
          border-width: 1px;
          top: 1px;
          left: 1px;
          right: 1px;
          bottom: 1px;
        }

        .loading-spinner.size-sm {
          width: 16px;
          height: 16px;
        }

        .loading-spinner.size-lg {
          width: 24px;
          height: 24px;
        }

        .loading-spinner.size-lg::before {
          border-width: 3px;
        }

        .loading-spinner.size-xl {
          width: 28px;
          height: 28px;
        }

        .loading-spinner.size-xl::before {
          border-width: 3px;
        }

        @keyframes spinner-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes spinner-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
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

        /* Premium ripple effect with realistic physics */
        .ripple {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          will-change: transform, opacity;
          mix-blend-mode: normal;
        }

        /* Primary ripple layer */
        .ripple::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          background: radial-gradient(circle, var(--_global-ripple-color-light) 0%, transparent 70%);
          transform: scale(var(--_button-ripple-scale-start));
          opacity: var(--_global-ripple-opacity-pressed);
          animation: ripple-expand var(--_button-ripple-duration) var(--_button-ripple-easing);
        }

        /* Secondary ripple glow */
        .ripple::after {
          content: '';
          position: absolute;
          top: -10%;
          left: -10%;
          width: 120%;
          height: 120%;
          border-radius: inherit;
          background: var(--_global-ripple-color-light);
          transform: scale(0);
          opacity: 0.1;
          filter: blur(2px);
          animation: ripple-glow var(--_button-ripple-duration) cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Dynamic ripple colors based on variant */
        button.variant-outlined .ripple::before,
        button.variant-text .ripple::before,
        button.variant-ghost .ripple::before,
        button.variant-elevated .ripple::before {
          background: radial-gradient(circle, var(--_global-ripple-color-dark) 0%, transparent 70%);
        }

        button.variant-outlined .ripple::after,
        button.variant-text .ripple::after,
        button.variant-ghost .ripple::after,
        button.variant-elevated .ripple::after {
          background: var(--_global-ripple-color-dark);
        }

        /* Enhanced ripple animations with spring physics */
        @keyframes ripple-expand {
          0% {
            transform: scale(var(--_button-ripple-scale-start));
            opacity: var(--_global-ripple-opacity-pressed);
          }
          15% {
            transform: scale(0.4);
            opacity: calc(var(--_global-ripple-opacity-pressed) * 0.9);
          }
          30% {
            transform: scale(0.8);
            opacity: calc(var(--_global-ripple-opacity-pressed) * 0.6);
          }
          50% {
            transform: scale(1.2);
            opacity: calc(var(--_global-ripple-opacity-pressed) * 0.3);
          }
          70% {
            transform: scale(1.8);
            opacity: calc(var(--_global-ripple-opacity-pressed) * 0.15);
          }
          100% {
            transform: scale(var(--_button-ripple-scale-end));
            opacity: 0;
          }
        }

        @keyframes ripple-glow {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          20% {
            transform: scale(0.3);
            opacity: 0.1;
          }
          50% {
            transform: scale(0.8);
            opacity: 0.05;
          }
          100% {
            transform: scale(1.5);
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
            --_button-transition: 150ms ease;
            --_button-transition-fast: 100ms ease;
            --_button-transition-bounce: 150ms ease;
            --_button-transition-snappy: 120ms ease;
          }
          
          button,
          button::before,
          button::after,
          .loading-spinner,
          .loading-spinner::before,
          .loading-spinner::after,
          .ripple,
          .ripple::before,
          .ripple::after,
          .content {
            animation: none !important;
          }
          
          .ripple,
          .ripple::before,
          .ripple::after {
            display: none;
          }
          
          button.hovered:not(:disabled),
          button.pressed:not(:disabled),
          button.focused:not(:disabled) {
            transform: none;
            filter: none;
          }
          
          button.loading .content {
            opacity: 0.5;
          }
          
          /* Simple loading indicator for reduced motion */
          .loading-spinner::before {
            animation: none;
            opacity: 0.6;
          }
          
          .loading-spinner::after {
            display: none;
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
        
        /* Enhanced color scheme adaptation */
        @media (prefers-color-scheme: dark) {
          :host {
            /* Enhanced dark mode shadows with better depth */
            --_button-elevation: 0 2px 8px rgba(0, 0, 0, 0.6);
            --_button-elevation-hover: 0 6px 20px rgba(0, 0, 0, 0.7), 0 2px 8px rgba(0, 0, 0, 0.4);
            --_button-elevation-elevated: 0 4px 16px rgba(0, 0, 0, 0.5);
            --_button-elevation-elevated-hover: 0 8px 28px rgba(0, 0, 0, 0.8), 0 4px 12px rgba(0, 0, 0, 0.6);
            
            /* Enhanced dark mode gradients */
            --_button-filled-bg: linear-gradient(135deg, var(--_global-color-primary) 0%, color-mix(in srgb, var(--_global-color-primary) 90%, var(--_global-color-surface)) 100%);
            --_button-filled-tonal-bg: linear-gradient(135deg, var(--_global-color-secondary-container) 0%, color-mix(in srgb, var(--_global-color-secondary-container) 95%, var(--_global-color-surface)) 100%);
            --_button-elevated-bg: linear-gradient(135deg, var(--_global-color-surface-container-low) 0%, color-mix(in srgb, var(--_global-color-surface-container-low) 98%, var(--_global-color-surface-bright)) 100%);
            
            /* Better backdrop filters for dark mode */
            --_button-backdrop-filter: saturate(200%) blur(16px);
          }
          
          /* Enhanced outlined border in dark mode */
          button.variant-outlined {
            border-color: color-mix(in srgb, var(--_global-color-outline) 80%, transparent);
          }
          
          button.variant-outlined.hovered:not(:disabled) {
            border-color: var(--_global-color-primary);
            background: color-mix(in srgb, var(--_global-color-primary) 8%, transparent);
          }
          
          /* Enhanced text variant in dark mode */
          button.variant-text.hovered:not(:disabled) {
            background: color-mix(in srgb, var(--_global-color-primary) 12%, transparent);
          }
          
          /* Better loading spinner contrast */
          .loading-spinner::before {
            border-top-color: currentColor;
            border-right-color: color-mix(in srgb, currentColor 60%, transparent);
          }
          
          .loading-spinner::after {
            border-top-color: color-mix(in srgb, currentColor 80%, transparent);
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