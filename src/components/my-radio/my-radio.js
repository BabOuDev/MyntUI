/**
 * MyntUI my-radio Component  
 * Individual radio button component that works with my-radio-group
 * Enhanced version using MyntUIBaseComponent for improved consistency and maintainability
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';

class MyRadio extends MyntUIBaseComponent {
  constructor() {
    super();
    
    // Component-specific bindings
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.select = this.select.bind(this);
    
    // Initialize with base component pattern
    this.log('Radio component initializing...');
  }

  // Extended observed attributes (inherits base ones)
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'checked', 'label', 'name', 'value'
    ];
  }

  // Component-specific attribute handling
  handleAttributeChange(name, oldValue, newValue) {
    super.handleAttributeChange(name, oldValue, newValue);
    
    switch (name) {
      case 'checked':
        this.announceToScreenReader(
          `Radio ${this.checked ? 'selected' : 'unselected'}`,
          'polite'
        );
        break;
      case 'disabled':
        this.announceToScreenReader(
          `Radio ${this.disabled ? 'disabled' : 'enabled'}`,
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
    this.toggleAttribute('checked', Boolean(value));
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
    return this.getAttribute('value') || '';
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
    const container = this.shadowRoot.querySelector('.radio-container');
    this.createRipple(event, container);
    this.select();
  }

  handleKeyDown(event) {
    // Call parent handler first for common patterns
    super.handleKeyDown(event);
    
    if (this.disabled || this.loading) return;

    if (event.key === ' ') {
      event.preventDefault();
      const container = this.shadowRoot.querySelector('.radio-container');
      this.createRipple(null, container);
      this.select();
    }
  }


  // Select this radio
  select() {
    if (!this.checked) {
      this.checked = true;
      
      // Use BaseComponent's standardized event emission
      this.emit('change', {
        checked: true,
        value: this.value,
        name: this.name
      });
    }
  }

  // Focus method for keyboard navigation
  focus() {
    const radioContainer = this.shadowRoot.querySelector('.radio-container');
    if (radioContainer) {
      radioContainer.focus();
    }
  }

  // Standardized event listener attachment using BaseComponent patterns
  attachEventListeners() {
    // Clean up existing listeners first
    this.removeEventListeners();
    
    const radioContainer = this.shadowRoot.querySelector('.radio-container');
    if (!radioContainer) return;
    
    // Use BaseComponent's addEventListeners method
    this.addEventListeners([
      {
        element: radioContainer,
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
    this.log('Radio connected to DOM');
    // Any additional connection logic can go here
  }

  onDisconnected() {
    this.log('Radio disconnected from DOM');
    // Any additional disconnection logic can go here
  }

  // Render the component
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Enhanced Material Design 3 variables with better semantic naming */
          --_radio-size: 20px;
          --_radio-dot-size: 10px;
          --_radio-state-layer-size: 40px;
          --_radio-border-width: 2px;
          
          /* Color tokens following Material Design 3 principles */
          --_radio-color-unchecked: var(--_global-color-outline);
          --_radio-color-checked: var(--_global-color-primary);
          --_radio-color-disabled: var(--_global-color-outline-variant);
          --_radio-color-error: var(--_global-color-error);
          
          /* Background colors */
          --_radio-background-unchecked: var(--_global-color-surface);
          --_radio-background-disabled: var(--_global-color-surface-variant);
          
          /* Border definitions */
          --_radio-border-unchecked: var(--_radio-border-width) solid var(--_radio-color-unchecked);
          --_radio-border-checked: var(--_radio-border-width) solid var(--_radio-color-checked);
          --_radio-border-hover: var(--_radio-border-width) solid var(--_global-color-on-surface);
          --_radio-border-focus: var(--_radio-border-width) solid var(--_radio-color-checked);
          --_radio-border-disabled: var(--_radio-border-width) solid var(--_radio-color-disabled);
          --_radio-border-error: var(--_radio-border-width) solid var(--_radio-color-error);
          
          /* Enhanced state layer colors */
          --_radio-state-layer-unchecked: var(--_radio-color-checked);
          --_radio-state-layer-checked: var(--_radio-color-checked);
          --_radio-state-layer-error: var(--_radio-color-error);
          
          /* Improved motion and transitions */
          --_radio-transition: all var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          --_radio-transition-fast: all var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
          --_radio-transition-emphasized: all var(--_global-motion-duration-short2) var(--_global-motion-easing-emphasized);
          
          /* Ripple enhancements */
          --_radio-ripple-size: calc(var(--_radio-state-layer-size) * 1.2);
          --_radio-ripple-duration: var(--_global-ripple-duration);
          --_radio-ripple-easing: var(--_global-ripple-easing);
          
          /* Typography */
          --_radio-label-color: var(--_global-color-on-surface);
          --_radio-label-color-disabled: var(--_global-color-outline);
          --_radio-label-color-error: var(--_global-color-error);
          
          display: inline-flex;
          align-items: center;
          gap: var(--_global-spacing-sm);
          cursor: pointer;
          user-select: none;
          line-height: var(--_global-line-height-normal);
          position: relative;
          min-height: var(--_radio-state-layer-size);
          font-family: var(--_global-font-family-sans);
        }

        :host([disabled]) {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }

        .radio-container {
          display: inline-flex;
          align-items: center;
          gap: var(--_global-spacing-sm);
          cursor: pointer;
          outline: none;
          position: relative;
          padding: calc((var(--_radio-state-layer-size) - var(--_radio-size)) / 2);
          margin: calc((var(--_radio-state-layer-size) - var(--_radio-size)) / -2);
          border-radius: 50%;
          overflow: hidden;
          isolation: isolate;
        }

        /* Enhanced state layer with dynamic color */
        .radio-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background-color: var(--_radio-state-layer-unchecked);
          opacity: 0;
          transition: var(--_radio-transition-fast);
          pointer-events: none;
          z-index: -1;
        }
        
        /* State layer color changes for checked state */
        .radio-container:has(.checked)::before {
          background-color: var(--_radio-state-layer-checked);
        }
        
        /* Hover state with enhanced interaction feedback */
        .radio-container:hover:not([aria-disabled="true"])::before {
          opacity: var(--_global-state-layer-hover);
          transform: scale(1.1);
        }
        
        /* Active/pressed state */
        .radio-container:active:not([aria-disabled="true"])::before {
          opacity: var(--_global-state-layer-pressed);
          transform: scale(0.95);
          transition: var(--_radio-transition-emphasized);
        }

        /* Enhanced focus indicators with smooth transitions */
        .radio-container:focus {
          outline: 2px solid var(--_radio-color-checked);
          outline-offset: 2px;
          transition: outline-color var(--_radio-transition-fast);
        }
        
        .radio-container:focus::before {
          opacity: var(--_global-state-layer-focus);
          transform: scale(1.05);
        }
        
        /* Focus ring enhancement for keyboard navigation */
        .radio-container:focus:not(:active) {
          outline-width: 3px;
          animation: focus-pulse 2s ease-in-out infinite;
        }
        
        @keyframes focus-pulse {
          0%, 100% { outline-offset: 2px; }
          50% { outline-offset: 4px; }
        }

        .radio-input {
          width: var(--_radio-size);
          height: var(--_radio-size);
          position: relative;
          border: var(--_radio-border-unchecked);
          border-radius: 50%;
          background-color: var(--_radio-background-unchecked);
          transition: var(--_radio-transition);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        /* Enhanced checked state with smooth color transition */
        .radio-input.checked {
          border: var(--_radio-border-checked);
          transform: scale(1.05);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
        
        /* Enhanced inner dot for checked state */
        .radio-input::after {
          content: '';
          position: absolute;
          width: var(--_radio-dot-size);
          height: var(--_radio-dot-size);
          border-radius: 50%;
          background-color: var(--_radio-color-checked);
          transform: scale(0);
          transition: var(--_radio-transition-emphasized);
          opacity: 0;
        }
        
        .radio-input.checked::after {
          transform: scale(1);
          opacity: 1;
          animation: radio-dot-appear 0.3s var(--_global-motion-easing-emphasized) forwards;
        }
        
        /* Radio dot appearance animation */
        @keyframes radio-dot-appear {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        /* Hover enhancement for unchecked state */
        .radio-container:hover:not([aria-disabled="true"]) .radio-input:not(.checked) {
          border: var(--_radio-border-hover);
          background-color: var(--_global-color-surface-variant);
          transform: scale(1.02);
        }

        .label {
          color: var(--_radio-label-color);
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-normal);
          line-height: var(--_global-line-height-normal);
          cursor: pointer;
          flex: 1;
          transition: var(--_radio-transition-fast);
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
        
        /* Dynamic ripple color based on radio state */
        .radio-container:has(.checked) .ripple {
          background-color: var(--_radio-state-layer-checked);
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

        /* Enhanced size variants */
        :host([size="sm"]) {
          --_radio-size: 16px;
          --_radio-dot-size: 8px;
          --_radio-state-layer-size: 36px;
        }

        :host([size="lg"]) {
          --_radio-size: 24px;
          --_radio-dot-size: 12px;
          --_radio-state-layer-size: 48px;
        }

        /* Enhanced error state */
        :host([error]) {
          --_radio-color-unchecked: var(--_radio-color-error);
          --_radio-color-checked: var(--_radio-color-error);
          --_radio-border-unchecked: var(--_radio-border-error);
          --_radio-border-checked: var(--_radio-border-error);
          --_radio-border-hover: var(--_radio-border-error);
          --_radio-state-layer-unchecked: var(--_radio-state-layer-error);
          --_radio-state-layer-checked: var(--_radio-state-layer-error);
          --_radio-label-color: var(--_radio-label-color-error);
        }

        :host([error]) .radio-container:focus {
          outline-color: var(--_radio-color-error);
        }

        /* Enhanced disabled state */
        :host([disabled]) {
          --_radio-color-unchecked: var(--_radio-color-disabled);
          --_radio-color-checked: var(--_radio-color-disabled);
          --_radio-background-unchecked: var(--_radio-background-disabled);
          --_radio-border-unchecked: var(--_radio-border-disabled);
          --_radio-border-checked: var(--_radio-border-disabled);
          --_radio-label-color: var(--_radio-label-color-disabled);
        }
        
        :host([disabled]) .radio-container::before {
          display: none;
        }

        :host([disabled]) .radio-input {
          box-shadow: none;
          cursor: not-allowed;
        }
        
        :host([disabled]) .radio-input.checked {
          transform: none;
          box-shadow: none;
        }
        
        :host([disabled]) .radio-input.checked::after {
          animation: none;
        }

        :host([disabled]) .label {
          cursor: not-allowed;
        }
        
        /* Enhanced High Contrast Mode Support */
        @media (prefers-contrast: high) {
          :host {
            --_radio-border-width: 3px;
          }
          
          .radio-input {
            border-width: var(--_radio-border-width);
            background-color: var(--_global-color-surface);
            box-shadow: none;
          }
          
          .radio-input.checked {
            background-color: var(--_global-color-primary);
            outline: 2px solid var(--_global-color-on-surface);
            outline-offset: 2px;
          }
          
          .radio-input.checked::after {
            background-color: var(--_global-color-on-primary);
          }
          
          .radio-container::before,
          .ripple {
            display: none;
          }
          
          .label {
            font-weight: var(--_global-font-weight-bold);
          }
          
          .radio-container:focus {
            outline-width: 4px;
            outline-style: double;
          }
        }

        /* Enhanced Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          :host {
            --_radio-transition: none;
            --_radio-transition-fast: none;
            --_radio-transition-emphasized: none;
          }
          
          .radio-input,
          .radio-input::after,
          .radio-container::before,
          .ripple,
          .label {
            animation: none !important;
            transition: none !important;
          }
          
          .ripple,
          .radio-container:focus:not(:active) {
            display: none;
          }
          
          .radio-input.checked {
            transform: none;
          }
          
          .radio-container:hover:not([aria-disabled="true"]) .radio-input:not(.checked) {
            transform: none;
          }
        }

        /* Enhanced focus-visible support with better keyboard navigation indicators */
        @supports selector(:focus-visible) {
          .radio-container:focus:not(:focus-visible) {
            outline: none;
            animation: none;
          }
          
          .radio-container:focus:not(:focus-visible)::before {
            opacity: 0;
          }
          
          .radio-container:focus-visible {
            outline: 3px solid var(--_radio-color-checked);
            outline-offset: 3px;
            animation: focus-pulse 2s ease-in-out infinite;
          }
        }
        
        /* Color scheme adaptation */
        @media (prefers-color-scheme: dark) {
          .radio-input {
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          }
          
          .radio-input.checked {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
          }
        }
      </style>

      <div 
        class="radio-container"
        role="radio"
        aria-checked="${this.checked}"
        aria-label="${this.label || 'radio button'}"
        ${this.disabled ? 'aria-disabled="true"' : ''}
        tabindex="${this.getAttribute('tabindex') || '0'}"
      >
        <div class="radio-input ${this.checked ? 'checked' : ''}"></div>
        
        ${this.label ? `<span class="label">${this.label}</span>` : '<slot></slot>'}
      </div>
    `;
  }
}

// Register the custom element using BaseComponent's registration helper
MyRadio.define('my-radio');