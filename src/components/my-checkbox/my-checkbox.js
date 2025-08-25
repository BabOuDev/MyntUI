/**
 * MyntUI my-checkbox Component
 * A Material Design 3 checkbox input for selecting one or more options
 * Enhanced version using MyntUIBaseComponent for improved consistency and maintainability
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';

class MyCheckbox extends MyntUIBaseComponent {
  constructor() {
    super();
    
    // Component-specific bindings
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.toggle = this.toggle.bind(this);
    
    // Initialize with base component pattern
    this.log('Checkbox component initializing...');
  }

  // Extended observed attributes (inherits base ones)
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'checked', 'indeterminate', 'label', 'name', 'value'
    ];
  }

  // Component-specific attribute handling
  handleAttributeChange(name, oldValue, newValue) {
    super.handleAttributeChange(name, oldValue, newValue);
    
    switch (name) {
      case 'checked':
      case 'indeterminate':
        this.announceToScreenReader(
          `Checkbox ${this.checked ? 'checked' : this.indeterminate ? 'indeterminate' : 'unchecked'}`,
          'polite'
        );
        break;
      case 'disabled':
        this.announceToScreenReader(
          `Checkbox ${this.disabled ? 'disabled' : 'enabled'}`,
          'polite'
        );
        break;
    }
  }

  // Component-specific getters and setters (inherits common ones from BaseComponent)
  get checked() {
    return this.hasAttribute('checked');
  }

  set checked(value) {
    if (value) {
      this.setAttribute('checked', '');
      this.removeAttribute('indeterminate');
    } else {
      this.removeAttribute('checked');
    }
  }

  get indeterminate() {
    return this.hasAttribute('indeterminate');
  }

  set indeterminate(value) {
    if (value) {
      this.setAttribute('indeterminate', '');
      this.removeAttribute('checked');
    } else {
      this.removeAttribute('indeterminate');
    }
  }

  get label() {
    return this.getAttribute('label') || '';
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get name() {
    return this.getAttribute('name') || '';
  }

  set name(value) {
    this.setAttribute('name', value);
  }

  get value() {
    return this.getAttribute('value') || 'on';
  }

  set value(value) {
    this.setAttribute('value', value);
  }

  // Component-specific event handlers
  handleClick(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      return;
    }

    // Use BaseComponent's standardized ripple
    const container = this.shadowRoot.querySelector('.checkbox-container');
    this.createRipple(event, container);
    this.toggle();
  }

  handleKeyDown(event) {
    // Call parent handler first for common patterns
    super.handleKeyDown(event);
    
    if (this.disabled || this.loading) return;

    if (event.key === ' ') {
      event.preventDefault();
      const container = this.shadowRoot.querySelector('.checkbox-container');
      this.createRipple(null, container);
      this.toggle();
    }
  }

  // Toggle the checked state
  toggle() {
    if (this.indeterminate) {
      // If indeterminate, go to checked
      this.checked = true;
    } else {
      // Normal toggle
      this.checked = !this.checked;
    }

    // Use BaseComponent's standardized event emission
    this.emit('change', {
      checked: this.checked,
      indeterminate: this.indeterminate,
      value: this.checked ? this.value : null,
      name: this.name
    });
  }

  // Standardized event listener attachment using BaseComponent patterns
  attachEventListeners() {
    // Clean up existing listeners first
    this.removeEventListeners();
    
    const checkboxContainer = this.shadowRoot.querySelector('.checkbox-container');
    if (!checkboxContainer) return;
    
    // Use BaseComponent's addEventListeners method
    this.addEventListeners([
      {
        element: checkboxContainer,
        events: ['click', 'keydown'],
        handler: (event) => {
          if (event.type === 'click') {
            this.handleClick(event);
          } else if (event.type === 'keydown') {
            this.handleKeyDown(event);
          }
        }
      }
    ]);
  }

  // Lifecycle methods using BaseComponent patterns
  onConnected() {
    this.log('Checkbox connected to DOM');
    // Any additional connection logic can go here
  }

  onDisconnected() {
    this.log('Checkbox disconnected from DOM');
    // Any additional disconnection logic can go here
  }

  // Render the component
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Enhanced Material Design 3 variables with superior semantic naming */
          --_checkbox-size: 18px;
          --_checkbox-state-layer-size: 40px;
          --_checkbox-border-radius: var(--_global-border-radius-sm);
          
          /* Enhanced color system with expanded Material Design 3 palette */
          --_checkbox-color-unchecked: var(--_global-color-outline);
          --_checkbox-color-unchecked-hover: var(--_global-color-primary-40);
          --_checkbox-color-checked: var(--_global-color-primary);
          --_checkbox-color-checked-hover: var(--_global-color-primary-60);
          --_checkbox-color-disabled: var(--_global-color-outline-variant);
          --_checkbox-color-error: var(--_global-color-error);
          --_checkbox-color-error-hover: #E53E3E;
          
          /* Enhanced background colors with subtle gradients */
          --_checkbox-background-unchecked: var(--_global-color-surface);
          --_checkbox-background-unchecked-hover: var(--_global-color-surface-container-low);
          --_checkbox-background-checked: var(--_global-color-primary);
          --_checkbox-background-checked-hover: var(--_global-color-primary-60);
          --_checkbox-background-disabled: var(--_global-color-surface-variant);
          --_checkbox-background-error: var(--_global-color-error);
          
          /* Enhanced border system with dynamic thickness */
          --_checkbox-border-width: 2px;
          --_checkbox-border-width-focus: 3px;
          --_checkbox-border-unchecked: var(--_checkbox-border-width) solid var(--_checkbox-color-unchecked);
          --_checkbox-border-checked: var(--_checkbox-border-width) solid var(--_checkbox-color-checked);
          --_checkbox-border-hover: var(--_checkbox-border-width) solid var(--_checkbox-color-unchecked-hover);
          --_checkbox-border-focus: var(--_checkbox-border-width-focus) solid var(--_checkbox-color-checked);
          --_checkbox-border-disabled: var(--_checkbox-border-width) solid var(--_checkbox-color-disabled);
          --_checkbox-border-error: var(--_checkbox-border-width) solid var(--_checkbox-color-error);
          
          /* Advanced state layer colors with contextual awareness */
          --_checkbox-state-layer-unchecked: var(--_checkbox-color-checked);
          --_checkbox-state-layer-checked: var(--_checkbox-color-checked);
          --_checkbox-state-layer-error: var(--_checkbox-color-error);
          --_checkbox-state-layer-hover: var(--_global-state-layer-hover);
          --_checkbox-state-layer-focus: var(--_global-state-layer-focus);
          --_checkbox-state-layer-pressed: var(--_global-state-layer-pressed);
          
          /* Spring-based motion system with enhanced easing */
          --_checkbox-transition: all var(--_global-motion-duration-medium1) var(--_global-spring-gentle);
          --_checkbox-transition-fast: all var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          --_checkbox-transition-emphasized: all var(--_global-motion-duration-medium1) var(--_global-spring-energetic);
          --_checkbox-transition-bounce: all var(--_global-motion-duration-medium2) var(--_global-spring-bouncy);
          
          /* Enhanced ripple system with better physics */
          --_checkbox-ripple-size: calc(var(--_checkbox-state-layer-size) * 1.4);
          --_checkbox-ripple-duration: var(--_global-ripple-duration);
          --_checkbox-ripple-duration-fast: var(--_global-ripple-duration-fast);
          --_checkbox-ripple-easing: var(--_global-spring-gentle);
          --_checkbox-ripple-easing-bounce: var(--_global-spring-wobbly);
          
          /* Enhanced typography with better hierarchy */
          --_checkbox-label-color: var(--_global-color-on-surface);
          --_checkbox-label-color-hover: var(--_global-color-primary-10);
          --_checkbox-label-color-disabled: var(--_global-color-outline);
          --_checkbox-label-color-error: var(--_global-color-error);
          
          /* Advanced elevation system for depth */
          --_checkbox-elevation-rest: var(--_global-elevation-0);
          --_checkbox-elevation-hover: var(--_global-shadow-interaction-subtle);
          --_checkbox-elevation-focus: var(--_global-shadow-interaction-moderate);
          --_checkbox-elevation-active: var(--_global-shadow-interaction-strong);
          
          /* Micro-interaction enhancements */
          --_checkbox-scale-rest: 1;
          --_checkbox-scale-hover: var(--_global-micro-scale-subtle);
          --_checkbox-scale-focus: var(--_global-micro-scale-noticeable);
          --_checkbox-scale-active: 0.98;
          --_checkbox-translate-hover: var(--_global-micro-translate-subtle);
          
          display: inline-flex;
          align-items: center;
          gap: var(--_global-spacing-sm);
          cursor: pointer;
          user-select: none;
          line-height: var(--_global-line-height-normal);
          position: relative;
          min-height: var(--_checkbox-state-layer-size);
          font-family: var(--_global-font-family-sans);
          contain: layout style;
          isolation: isolate;
        }

        :host([disabled]) {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }

        .checkbox-container {
          display: inline-flex;
          align-items: center;
          gap: var(--_global-spacing-sm);
          cursor: pointer;
          outline: none;
          position: relative;
          padding: calc((var(--_checkbox-state-layer-size) - var(--_checkbox-size)) / 2);
          margin: calc((var(--_checkbox-state-layer-size) - var(--_checkbox-size)) / -2);
          border-radius: 50%;
          overflow: visible;
          isolation: isolate;
          transform: var(--_checkbox-scale-rest);
          transition: var(--_checkbox-transition);
          will-change: transform, box-shadow;
        }
        
        /* Enhanced multi-layered state system for superior depth */
        .checkbox-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background-color: var(--_checkbox-state-layer-unchecked);
          opacity: 0;
          transform: scale(0.8);
          transition: var(--_checkbox-transition-emphasized);
          pointer-events: none;
          z-index: -1;
          box-shadow: var(--_checkbox-elevation-rest);
        }
        
        /* Advanced state layer for focus ring enhancement */
        .checkbox-container::after {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border-radius: 50%;
          background-color: var(--_checkbox-state-layer-unchecked);
          opacity: 0;
          transform: scale(0.6);
          transition: var(--_checkbox-transition-bounce);
          pointer-events: none;
          z-index: -2;
          border: 2px solid transparent;
        }
        
        /* Enhanced state layer color changes for checked state */
        .checkbox-container:has(.checked)::before,
        .checkbox-container:has(.indeterminate)::before {
          background-color: var(--_checkbox-state-layer-checked);
        }
        
        .checkbox-container:has(.checked)::after,
        .checkbox-container:has(.indeterminate)::after {
          background-color: var(--_checkbox-state-layer-checked);
        }
        
        /* Superior hover state with spring physics and micro-interactions */
        .checkbox-container:hover:not([aria-disabled="true"]) {
          transform: var(--_checkbox-scale-hover) var(--_checkbox-translate-hover);
          box-shadow: var(--_checkbox-elevation-hover);
        }
        
        .checkbox-container:hover:not([aria-disabled="true"])::before {
          opacity: var(--_checkbox-state-layer-hover);
          transform: scale(1.2);
          box-shadow: var(--_checkbox-elevation-hover);
        }
        
        .checkbox-container:hover:not([aria-disabled="true"])::after {
          opacity: calc(var(--_checkbox-state-layer-hover) * 0.6);
          transform: scale(1);
        }
        
        /* Enhanced active/pressed state with realistic physics */
        .checkbox-container:active:not([aria-disabled="true"]) {
          transform: scale(var(--_checkbox-scale-active));
          box-shadow: var(--_checkbox-elevation-active);
          transition: var(--_checkbox-transition-fast);
        }
        
        .checkbox-container:active:not([aria-disabled="true"])::before {
          opacity: var(--_checkbox-state-layer-pressed);
          transform: scale(1);
          transition: var(--_checkbox-transition-fast);
        }
        
        .checkbox-container:active:not([aria-disabled="true"])::after {
          opacity: calc(var(--_checkbox-state-layer-pressed) * 0.8);
          transform: scale(0.8);
          transition: var(--_checkbox-transition-fast);
        }

        /* Superior focus indicators with advanced visual feedback */
        .checkbox-container:focus {
          outline: var(--_checkbox-border-focus);
          outline-offset: 3px;
          transform: var(--_checkbox-scale-focus);
          box-shadow: var(--_checkbox-elevation-focus);
          transition: var(--_checkbox-transition-emphasized);
        }
        
        .checkbox-container:focus::before {
          opacity: var(--_checkbox-state-layer-focus);
          transform: scale(1.3);
          box-shadow: var(--_checkbox-elevation-focus);
        }
        
        .checkbox-container:focus::after {
          opacity: calc(var(--_checkbox-state-layer-focus) * 0.7);
          transform: scale(1.1);
          border-color: var(--_checkbox-color-checked);
        }
        
        /* Enhanced focus ring for superior keyboard navigation */
        .checkbox-container:focus:not(:active) {
          outline-width: var(--_checkbox-border-width-focus);
          animation: focus-pulse-advanced 2.5s var(--_global-spring-gentle) infinite;
        }
        
        .checkbox-container:focus:not(:active)::after {
          animation: focus-ring-pulse 2.5s var(--_global-spring-gentle) infinite;
        }
        
        /* Advanced focus animations with spring physics */
        @keyframes focus-pulse-advanced {
          0%, 100% { 
            outline-offset: 3px;
            transform: var(--_checkbox-scale-focus);
          }
          25% { 
            outline-offset: 5px;
            transform: scale(1.08);
          }
          50% { 
            outline-offset: 6px;
            transform: scale(1.1);
          }
          75% { 
            outline-offset: 5px;
            transform: scale(1.08);
          }
        }
        
        @keyframes focus-ring-pulse {
          0%, 100% { 
            transform: scale(1.1);
            opacity: calc(var(--_checkbox-state-layer-focus) * 0.7);
          }
          50% { 
            transform: scale(1.2);
            opacity: calc(var(--_checkbox-state-layer-focus) * 0.9);
          }
        }

        .checkbox-input {
          width: var(--_checkbox-size);
          height: var(--_checkbox-size);
          position: relative;
          border: var(--_checkbox-border-unchecked);
          border-radius: var(--_checkbox-border-radius);
          background-color: var(--_checkbox-background-unchecked);
          background-image: linear-gradient(135deg, var(--_checkbox-background-unchecked) 0%, var(--_global-color-surface-container-low) 100%);
          transition: var(--_checkbox-transition);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: var(--_global-elevation-1), inset 0 1px 2px rgba(255, 255, 255, 0.1);
          overflow: hidden;
          will-change: transform, background-color, border-color, box-shadow;
        }
        
        /* Enhanced checked state with superior visual feedback */
        .checkbox-input.checked {
          background-color: var(--_checkbox-background-checked);
          background-image: linear-gradient(135deg, var(--_checkbox-background-checked) 0%, var(--_checkbox-background-checked-hover) 100%);
          border: var(--_checkbox-border-checked);
          transform: scale(1.08);
          box-shadow: var(--_global-elevation-2), 0 0 0 1px var(--_checkbox-color-checked), inset 0 1px 3px rgba(255, 255, 255, 0.2);
          animation: checkbox-check-bounce var(--_global-motion-duration-medium1) var(--_global-spring-bouncy) forwards;
        }
        
        /* Enhanced indeterminate state with sophisticated styling */
        .checkbox-input.indeterminate {
          background-color: var(--_checkbox-background-checked);
          background-image: linear-gradient(135deg, var(--_checkbox-background-checked) 0%, var(--_checkbox-background-checked-hover) 100%);
          border: var(--_checkbox-border-checked);
          transform: scale(1.08);
          box-shadow: var(--_global-elevation-2), 0 0 0 1px var(--_checkbox-color-checked), inset 0 1px 3px rgba(255, 255, 255, 0.2);
          animation: checkbox-indeterminate-bounce var(--_global-motion-duration-medium1) var(--_global-spring-bouncy) forwards;
        }
        
        /* Superior hover enhancements for unchecked state */
        .checkbox-container:hover:not([aria-disabled="true"]) .checkbox-input:not(.checked):not(.indeterminate) {
          border: var(--_checkbox-border-hover);
          background-color: var(--_checkbox-background-unchecked-hover);
          background-image: linear-gradient(135deg, var(--_checkbox-background-unchecked-hover) 0%, var(--_global-color-surface-container) 100%);
          transform: scale(1.04);
          box-shadow: var(--_global-elevation-2), inset 0 1px 3px rgba(255, 255, 255, 0.15);
        }
        
        /* Enhanced hover effects for checked states */
        .checkbox-container:hover:not([aria-disabled="true"]) .checkbox-input.checked,
        .checkbox-container:hover:not([aria-disabled="true"]) .checkbox-input.indeterminate {
          background-color: var(--_checkbox-background-checked-hover);
          background-image: linear-gradient(135deg, var(--_checkbox-background-checked-hover) 0%, var(--_global-color-primary-70) 100%);
          transform: scale(1.1);
          box-shadow: var(--_global-elevation-3), 0 0 0 1px var(--_checkbox-color-checked-hover), inset 0 1px 4px rgba(255, 255, 255, 0.25);
        }
        
        /* Advanced check/indeterminate bounce animations */
        @keyframes checkbox-check-bounce {
          0% {
            transform: scale(1);
          }
          30% {
            transform: scale(0.9);
          }
          60% {
            transform: scale(1.15);
          }
          80% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1.08);
          }
        }
        
        @keyframes checkbox-indeterminate-bounce {
          0% {
            transform: scale(1);
          }
          40% {
            transform: scale(0.95);
          }
          70% {
            transform: scale(1.12);
          }
          100% {
            transform: scale(1.08);
          }
        }
        
        /* Superior checkmark with advanced spring animations */
        .checkbox-input::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(0) rotate(-45deg);
          width: 10px;
          height: 6px;
          border: 2.5px solid var(--_global-color-on-primary);
          border-top: none;
          border-right: none;
          border-radius: 0 0 1px 1px;
          transform-origin: center;
          transition: var(--_checkbox-transition-bounce);
          opacity: 0;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
          will-change: transform, opacity;
        }
        
        .checkbox-input.checked::after {
          transform: translate(-50%, -60%) scale(1) rotate(-45deg);
          opacity: 1;
          animation: checkmark-draw-advanced var(--_global-motion-duration-medium1) var(--_global-spring-energetic) forwards;
        }
        
        /* Enhanced indeterminate mark with sophisticated styling */
        .checkbox-input.indeterminate::after {
          width: 8px;
          height: 2.5px;
          border: none;
          background-color: var(--_global-color-on-primary);
          background-image: linear-gradient(90deg, var(--_global-color-on-primary) 0%, rgba(255, 255, 255, 0.3) 50%, var(--_global-color-on-primary) 100%);
          border-radius: 2px;
          transform: translate(-50%, -50%) scale(1) rotate(0deg);
          opacity: 1;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
          animation: indeterminate-draw-advanced var(--_global-motion-duration-medium1) var(--_global-spring-energetic) forwards;
        }
        
        /* Advanced checkmark drawing animation with spring physics */
        @keyframes checkmark-draw-advanced {
          0% {
            transform: translate(-50%, -60%) scale(0) rotate(-45deg);
            opacity: 0;
            filter: drop-shadow(0 0 0 rgba(0, 0, 0, 0));
          }
          20% {
            opacity: 1;
            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
          }
          40% {
            transform: translate(-50%, -60%) scale(0.7) rotate(-45deg);
          }
          60% {
            transform: translate(-50%, -60%) scale(1.2) rotate(-45deg);
          }
          80% {
            transform: translate(-50%, -60%) scale(0.95) rotate(-45deg);
          }
          90% {
            transform: translate(-50%, -60%) scale(1.05) rotate(-45deg);
          }
          100% {
            transform: translate(-50%, -60%) scale(1) rotate(-45deg);
            opacity: 1;
            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
          }
        }
        
        /* Advanced indeterminate drawing animation with spring physics */
        @keyframes indeterminate-draw-advanced {
          0% {
            transform: translate(-50%, -50%) scale(0, 0.8) rotate(0deg);
            opacity: 0;
            filter: drop-shadow(0 0 0 rgba(0, 0, 0, 0));
          }
          30% {
            opacity: 1;
            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1, 1.2) rotate(0deg);
          }
          70% {
            transform: translate(-50%, -50%) scale(0.95, 0.9) rotate(0deg);
          }
          85% {
            transform: translate(-50%, -50%) scale(1.02, 1.05) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) scale(1, 1) rotate(0deg);
            opacity: 1;
            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
          }
        }

        .label {
          color: var(--_checkbox-label-color);
          font-size: var(--_global-font-size-body-small);
          font-weight: var(--_global-font-weight-medium);
          line-height: var(--_global-line-height-normal);
          cursor: pointer;
          flex: 1;
          transition: var(--_checkbox-transition);
          letter-spacing: var(--_global-letter-spacing-normal);
          user-select: none;
          will-change: color, transform;
        }
        
        /* Enhanced label hover effects */
        .checkbox-container:hover:not([aria-disabled="true"]) .label {
          color: var(--_checkbox-label-color-hover);
          transform: var(--_checkbox-translate-hover);
        }
        
        /* Advanced ripple effect with superior physics */
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple-animation-advanced var(--_checkbox-ripple-duration) var(--_checkbox-ripple-easing);
          background-color: var(--_global-ripple-color-light);
          opacity: var(--_global-ripple-opacity-pressed);
          pointer-events: none;
          z-index: 1;
          mix-blend-mode: normal;
          filter: blur(0.5px);
          will-change: transform, opacity;
        }
        
        /* Dynamic ripple color with contextual awareness */
        .checkbox-container:has(.checked) .ripple,
        .checkbox-container:has(.indeterminate) .ripple {
          background-color: var(--_checkbox-state-layer-checked);
          filter: blur(0);
        }
        
        /* Enhanced ripple for error states */
        :host([error]) .checkbox-container .ripple {
          background-color: var(--_checkbox-state-layer-error);
          animation-name: ripple-animation-error;
        }

        /* Superior ripple animation with spring physics */
        @keyframes ripple-animation-advanced {
          0% {
            transform: scale(0);
            opacity: var(--_global-ripple-opacity-pressed);
            filter: blur(0);
          }
          15% {
            transform: scale(0.2);
            opacity: calc(var(--_global-ripple-opacity-pressed) * 0.9);
            filter: blur(0.5px);
          }
          30% {
            transform: scale(0.6);
            opacity: calc(var(--_global-ripple-opacity-pressed) * 0.7);
            filter: blur(1px);
          }
          50% {
            transform: scale(1.1);
            opacity: calc(var(--_global-ripple-opacity-pressed) * 0.5);
            filter: blur(1.5px);
          }
          70% {
            transform: scale(1.8);
            opacity: calc(var(--_global-ripple-opacity-pressed) * 0.25);
            filter: blur(2px);
          }
          85% {
            transform: scale(2.3);
            opacity: calc(var(--_global-ripple-opacity-pressed) * 0.1);
            filter: blur(2.5px);
          }
          100% {
            transform: scale(2.8);
            opacity: 0;
            filter: blur(3px);
          }
        }
        
        /* Enhanced error state ripple animation */
        @keyframes ripple-animation-error {
          0% {
            transform: scale(0);
            opacity: var(--_global-ripple-opacity-pressed);
            background-color: var(--_checkbox-state-layer-error);
          }
          25% {
            transform: scale(0.4);
            opacity: calc(var(--_global-ripple-opacity-pressed) * 0.8);
            background-color: var(--_checkbox-color-error-hover);
          }
          50% {
            transform: scale(1);
            opacity: calc(var(--_global-ripple-opacity-pressed) * 0.4);
          }
          75% {
            transform: scale(2);
            opacity: calc(var(--_global-ripple-opacity-pressed) * 0.15);
          }
          100% {
            transform: scale(2.8);
            opacity: 0;
          }
        }

        /* Size variants */
        :host([size="sm"]) {
          --_checkbox-size: 16px;
          --_checkbox-state-layer-size: 36px;
        }

        :host([size="lg"]) {
          --_checkbox-size: 24px;
          --_checkbox-state-layer-size: 48px;
        }

        /* Enhanced error state */
        :host([error]) {
          --_checkbox-color-unchecked: var(--_checkbox-color-error);
          --_checkbox-color-checked: var(--_checkbox-color-error);
          --_checkbox-background-checked: var(--_checkbox-background-error);
          --_checkbox-border-unchecked: var(--_checkbox-border-error);
          --_checkbox-border-checked: var(--_checkbox-border-error);
          --_checkbox-border-hover: var(--_checkbox-border-error);
          --_checkbox-state-layer-unchecked: var(--_checkbox-state-layer-error);
          --_checkbox-state-layer-checked: var(--_checkbox-state-layer-error);
          --_checkbox-label-color: var(--_checkbox-label-color-error);
        }

        :host([error]) .checkbox-container:focus {
          outline-color: var(--_checkbox-color-error);
        }

        /* Enhanced disabled state */
        :host([disabled]) {
          --_checkbox-color-unchecked: var(--_checkbox-color-disabled);
          --_checkbox-color-checked: var(--_checkbox-color-disabled);
          --_checkbox-background-unchecked: var(--_checkbox-background-disabled);
          --_checkbox-background-checked: var(--_checkbox-color-disabled);
          --_checkbox-border-unchecked: var(--_checkbox-border-disabled);
          --_checkbox-border-checked: var(--_checkbox-border-disabled);
          --_checkbox-label-color: var(--_checkbox-label-color-disabled);
        }
        
        :host([disabled]) .checkbox-container::before {
          display: none;
        }
        
        :host([disabled]) .checkbox-input {
          box-shadow: none;
          cursor: not-allowed;
        }
        
        :host([disabled]) .checkbox-input.checked,
        :host([disabled]) .checkbox-input.indeterminate {
          transform: none;
          box-shadow: none;
        }

        :host([disabled]) .label {
          cursor: not-allowed;
        }
        
        /* Enhanced High Contrast Mode Support */
        @media (prefers-contrast: high) {
          :host {
            --_checkbox-border-width: 3px;
          }
          
          .checkbox-input {
            border-width: var(--_checkbox-border-width);
            background-color: var(--_global-color-surface);
            box-shadow: none;
          }
          
          .checkbox-input.checked,
          .checkbox-input.indeterminate {
            background-color: var(--_global-color-primary);
            outline: 2px solid var(--_global-color-on-surface);
            outline-offset: 2px;
          }
          
          .checkbox-container::before,
          .ripple {
            display: none;
          }
          
          .label {
            font-weight: var(--_global-font-weight-bold);
          }
          
          .checkbox-container:focus {
            outline-width: 4px;
            outline-style: double;
          }
        }

        /* Enhanced Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          :host {
            --_checkbox-transition: none;
            --_checkbox-transition-fast: none;
            --_checkbox-transition-emphasized: none;
          }
          
          .checkbox-input,
          .checkbox-input::after,
          .checkbox-container::before,
          .ripple,
          .label {
            animation: none !important;
            transition: none !important;
          }
          
          .ripple,
          .checkbox-container:focus:not(:active) {
            display: none;
          }
          
          .checkbox-input.checked,
          .checkbox-input.indeterminate {
            transform: none;
          }
        }

        /* Superior focus-visible support with advanced accessibility */
        @supports selector(:focus-visible) {
          .checkbox-container:focus:not(:focus-visible) {
            outline: none;
            animation: none;
            transform: var(--_checkbox-scale-rest);
            box-shadow: var(--_checkbox-elevation-rest);
          }
          
          .checkbox-container:focus:not(:focus-visible)::before,
          .checkbox-container:focus:not(:focus-visible)::after {
            opacity: 0;
            transform: scale(0.8);
          }
          
          .checkbox-container:focus-visible {
            outline: var(--_checkbox-border-width-focus) solid var(--_checkbox-color-checked);
            outline-offset: 4px;
            transform: var(--_checkbox-scale-focus);
            box-shadow: var(--_checkbox-elevation-focus);
            animation: focus-pulse-advanced 2.5s var(--_global-spring-gentle) infinite;
          }
          
          .checkbox-container:focus-visible::before {
            opacity: var(--_checkbox-state-layer-focus);
            transform: scale(1.3);
            animation: focus-state-pulse 2.5s var(--_global-spring-gentle) infinite;
          }
          
          .checkbox-container:focus-visible::after {
            opacity: calc(var(--_checkbox-state-layer-focus) * 0.7);
            transform: scale(1.1);
            border-color: var(--_checkbox-color-checked);
            animation: focus-ring-pulse 2.5s var(--_global-spring-gentle) infinite;
          }
          
          /* Enhanced focus state animations */
          @keyframes focus-state-pulse {
            0%, 100% {
              transform: scale(1.3);
              opacity: var(--_checkbox-state-layer-focus);
            }
            50% {
              transform: scale(1.4);
              opacity: calc(var(--_checkbox-state-layer-focus) * 1.2);
            }
          }
        }
        
        /* Enhanced dark theme adaptation with sophisticated styling */
        @media (prefers-color-scheme: dark) {
          :host {
            --_checkbox-color-unchecked: var(--_global-color-scheme-dark-outline);
            --_checkbox-color-unchecked-hover: var(--_global-color-scheme-dark-primary);
            --_checkbox-color-checked: var(--_global-color-scheme-dark-primary);
            --_checkbox-color-checked-hover: #E0B3FF;
            --_checkbox-background-unchecked: var(--_global-color-scheme-dark-surface);
            --_checkbox-background-unchecked-hover: var(--_global-color-scheme-dark-surface-variant);
            --_checkbox-background-checked: var(--_global-color-scheme-dark-primary);
            --_checkbox-label-color: var(--_global-color-scheme-dark-on-surface);
            --_checkbox-label-color-hover: var(--_global-color-scheme-dark-primary);
          }
          
          .checkbox-input {
            box-shadow: var(--_global-elevation-1), inset 0 1px 2px rgba(255, 255, 255, 0.05);
            background-image: linear-gradient(135deg, var(--_checkbox-background-unchecked) 0%, rgba(255, 255, 255, 0.02) 100%);
          }
          
          .checkbox-input.checked,
          .checkbox-input.indeterminate {
            box-shadow: var(--_global-elevation-2), 0 0 0 1px var(--_checkbox-color-checked), inset 0 1px 3px rgba(255, 255, 255, 0.1);
            background-image: linear-gradient(135deg, var(--_checkbox-background-checked) 0%, var(--_checkbox-background-checked-hover) 100%);
          }
          
          .checkbox-container:hover:not([aria-disabled="true"]) .checkbox-input:not(.checked):not(.indeterminate) {
            box-shadow: var(--_global-elevation-2), inset 0 1px 3px rgba(255, 255, 255, 0.08);
            background-image: linear-gradient(135deg, var(--_checkbox-background-unchecked-hover) 0%, rgba(255, 255, 255, 0.05) 100%);
          }
          
          .checkbox-container:hover:not([aria-disabled="true"]) .checkbox-input.checked,
          .checkbox-container:hover:not([aria-disabled="true"]) .checkbox-input.indeterminate {
            box-shadow: var(--_global-elevation-3), 0 0 0 1px var(--_checkbox-color-checked-hover), inset 0 1px 4px rgba(255, 255, 255, 0.15);
          }
          
          .ripple {
            background-color: rgba(208, 188, 255, 0.2);
            filter: blur(0.3px);
          }
        }
      </style>

      <div 
        class="checkbox-container"
        role="checkbox"
        aria-checked="${this.indeterminate ? 'mixed' : this.checked}"
        aria-label="${this.label || 'checkbox'}"
        ${this.disabled ? 'aria-disabled="true"' : ''}
        tabindex="${this.disabled ? '-1' : '0'}"
      >
        <div class="checkbox-input ${this.checked ? 'checked' : ''} ${this.indeterminate ? 'indeterminate' : ''}"></div>
        
        ${this.label ? `<span class="label">${this.label}</span>` : '<slot></slot>'}
      </div>
    `;
  }
}

// Register the custom element using BaseComponent's registration helper
MyCheckbox.define('my-checkbox');