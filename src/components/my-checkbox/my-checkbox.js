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
          /* Enhanced Material Design 3 variables with better semantic naming */
          --_checkbox-size: 18px;
          --_checkbox-state-layer-size: 40px;
          --_checkbox-border-radius: var(--_global-border-radius-sm);
          
          /* Color tokens following Material Design 3 principles */
          --_checkbox-color-unchecked: var(--_global-color-outline);
          --_checkbox-color-checked: var(--_global-color-primary);
          --_checkbox-color-disabled: var(--_global-color-outline-variant);
          --_checkbox-color-error: var(--_global-color-error);
          
          /* Background colors */
          --_checkbox-background-unchecked: var(--_global-color-surface);
          --_checkbox-background-checked: var(--_global-color-primary);
          --_checkbox-background-disabled: var(--_global-color-surface-variant);
          --_checkbox-background-error: var(--_global-color-error);
          
          /* Border definitions */
          --_checkbox-border-width: 2px;
          --_checkbox-border-unchecked: var(--_checkbox-border-width) solid var(--_checkbox-color-unchecked);
          --_checkbox-border-checked: var(--_checkbox-border-width) solid var(--_checkbox-color-checked);
          --_checkbox-border-hover: var(--_checkbox-border-width) solid var(--_global-color-on-surface);
          --_checkbox-border-focus: var(--_checkbox-border-width) solid var(--_checkbox-color-checked);
          --_checkbox-border-disabled: var(--_checkbox-border-width) solid var(--_checkbox-color-disabled);
          --_checkbox-border-error: var(--_checkbox-border-width) solid var(--_checkbox-color-error);
          
          /* Enhanced state layer colors */
          --_checkbox-state-layer-unchecked: var(--_checkbox-color-checked);
          --_checkbox-state-layer-checked: var(--_checkbox-color-checked);
          --_checkbox-state-layer-error: var(--_checkbox-color-error);
          
          /* Improved motion and transitions */
          --_checkbox-transition: all var(--_global-interaction-feedback-duration) var(--_global-interaction-feedback-easing);
          --_checkbox-transition-fast: all var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
          --_checkbox-transition-emphasized: all var(--_global-motion-duration-short2) var(--_global-motion-easing-emphasized);
          
          /* Ripple enhancements */
          --_checkbox-ripple-size: calc(var(--_checkbox-state-layer-size) * 1.2);
          --_checkbox-ripple-duration: var(--_global-ripple-duration);
          --_checkbox-ripple-easing: var(--_global-ripple-easing);
          
          /* Typography */
          --_checkbox-label-color: var(--_global-color-on-surface);
          --_checkbox-label-color-disabled: var(--_global-color-outline);
          --_checkbox-label-color-error: var(--_global-color-error);
          
          display: inline-flex;
          align-items: center;
          gap: var(--_global-spacing-sm);
          cursor: pointer;
          user-select: none;
          line-height: var(--_global-line-height-normal);
          position: relative;
          min-height: var(--_checkbox-state-layer-size);
          font-family: var(--_global-font-family-sans);
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
          overflow: hidden;
          isolation: isolate;
        }
        
        /* Enhanced state layer with dynamic color */
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
          transition: var(--_checkbox-transition-fast);
          pointer-events: none;
          z-index: -1;
        }
        
        /* State layer color changes for checked state */
        .checkbox-container:has(.checked)::before,
        .checkbox-container:has(.indeterminate)::before {
          background-color: var(--_checkbox-state-layer-checked);
        }
        
        /* Hover state with enhanced interaction feedback */
        .checkbox-container:hover:not([aria-disabled="true"])::before {
          opacity: var(--_global-state-layer-hover);
          transform: scale(1.1);
        }
        
        /* Active/pressed state */
        .checkbox-container:active:not([aria-disabled="true"])::before {
          opacity: var(--_global-state-layer-pressed);
          transform: scale(0.95);
          transition: var(--_checkbox-transition-emphasized);
        }

        /* Enhanced focus indicators with smooth transitions */
        .checkbox-container:focus {
          outline: 2px solid var(--_checkbox-color-checked);
          outline-offset: 2px;
          transition: outline-color var(--_checkbox-transition-fast);
        }
        
        .checkbox-container:focus::before {
          opacity: var(--_global-state-layer-focus);
          transform: scale(1.05);
        }
        
        /* Focus ring enhancement for keyboard navigation */
        .checkbox-container:focus:not(:active) {
          outline-width: 3px;
          animation: focus-pulse 2s ease-in-out infinite;
        }
        
        @keyframes focus-pulse {
          0%, 100% { outline-offset: 2px; }
          50% { outline-offset: 4px; }
        }

        .checkbox-input {
          width: var(--_checkbox-size);
          height: var(--_checkbox-size);
          position: relative;
          border: var(--_checkbox-border-unchecked);
          border-radius: var(--_checkbox-border-radius);
          background-color: var(--_checkbox-background-unchecked);
          transition: var(--_checkbox-transition);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        /* Enhanced checked state with smooth color transition */
        .checkbox-input.checked {
          background-color: var(--_checkbox-background-checked);
          border: var(--_checkbox-border-checked);
          transform: scale(1.05);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
        
        /* Enhanced indeterminate state */
        .checkbox-input.indeterminate {
          background-color: var(--_checkbox-background-checked);
          border: var(--_checkbox-border-checked);
          transform: scale(1.05);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
        
        /* Hover enhancement for unchecked state */
        .checkbox-container:hover:not([aria-disabled="true"]) .checkbox-input:not(.checked):not(.indeterminate) {
          border: var(--_checkbox-border-hover);
          background-color: var(--_global-color-surface-variant);
          transform: scale(1.02);
        }
        
        /* Enhanced checkmark with smoother animation */
        .checkbox-input::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(0) rotate(-45deg);
          width: 10px;
          height: 6px;
          border: 2px solid var(--_global-color-on-primary);
          border-top: none;
          border-right: none;
          transform-origin: center;
          transition: var(--_checkbox-transition-emphasized);
          opacity: 0;
        }
        
        .checkbox-input.checked::after {
          transform: translate(-50%, -60%) scale(1) rotate(-45deg);
          opacity: 1;
          animation: checkmark-draw 0.3s var(--_global-motion-easing-emphasized) forwards;
        }
        
        /* Enhanced indeterminate state with better visual feedback */
        .checkbox-input.indeterminate::after {
          width: 8px;
          height: 2px;
          border: none;
          background-color: var(--_global-color-on-primary);
          border-radius: 1px;
          transform: translate(-50%, -50%) scale(1) rotate(0deg);
          opacity: 1;
          animation: indeterminate-draw 0.2s var(--_global-motion-easing-emphasized) forwards;
        }
        
        /* Checkmark drawing animation */
        @keyframes checkmark-draw {
          0% {
            transform: translate(-50%, -60%) scale(0.3) rotate(-45deg);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -60%) scale(1.1) rotate(-45deg);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -60%) scale(1) rotate(-45deg);
            opacity: 1;
          }
        }
        
        /* Indeterminate drawing animation */
        @keyframes indeterminate-draw {
          0% {
            transform: translate(-50%, -50%) scale(0, 1) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1, 1) rotate(0deg);
            opacity: 1;
          }
        }

        .label {
          color: var(--_checkbox-label-color);
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-normal);
          line-height: var(--_global-line-height-normal);
          cursor: pointer;
          flex: 1;
          transition: var(--_checkbox-transition-fast);
        }

        /* Enhanced ripple effect styles - using BaseComponent standardized ripple */
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple-animation var(--_global-ripple-duration) var(--_global-ripple-easing);
          background-color: var(--_global-ripple-color-light);
          opacity: var(--_global-ripple-opacity-pressed);
          pointer-events: none;
          z-index: 1;
          mix-blend-mode: normal;
        }
        
        /* Dynamic ripple color based on checkbox state */
        .checkbox-container:has(.checked) .ripple,
        .checkbox-container:has(.indeterminate) .ripple {
          background-color: var(--_checkbox-state-layer-checked);
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

        /* Enhanced focus-visible support with better keyboard navigation indicators */
        @supports selector(:focus-visible) {
          .checkbox-container:focus:not(:focus-visible) {
            outline: none;
            animation: none;
          }
          
          .checkbox-container:focus:not(:focus-visible)::before {
            opacity: 0;
          }
          
          .checkbox-container:focus-visible {
            outline: 3px solid var(--_checkbox-color-checked);
            outline-offset: 3px;
            animation: focus-pulse 2s ease-in-out infinite;
          }
        }
        
        /* Color scheme adaptation */
        @media (prefers-color-scheme: dark) {
          .checkbox-input {
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          }
          
          .checkbox-input.checked,
          .checkbox-input.indeterminate {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
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