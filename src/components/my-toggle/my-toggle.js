/**
 * MyntUI my-toggle Component
 * A switch-like component for a boolean input, providing a visual on/off state
 * Enhanced version using MyntUIBaseComponent for improved consistency and maintainability
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';

class MyToggle extends MyntUIBaseComponent {
  constructor() {
    super();
    
    // Component-specific bindings
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
    
    // Initialize with base component pattern
    this.log('Toggle component initializing...');
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
        this.emit('change', { 
          checked: this.checked, 
          value: this.checked ? this.value : null,
          name: this.name 
        });
        break;
      case 'disabled':
        this.announceToScreenReader(
          `Toggle ${this.disabled ? 'disabled' : 'enabled'}`,
          'polite'
        );
        break;
    }
  }

  // Enhanced getters and setters with validation (inherits common ones from base)
  get checked() {
    return this.hasAttribute('checked');
  }

  set checked(value) {
    const boolValue = Boolean(value);
    this.toggleAttribute('checked', boolValue);
    this.log('Checked state changed:', boolValue);
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

  get error() {
    return this.hasAttribute('error');
  }

  set error(value) {
    if (value) {
      this.setAttribute('error', '');
    } else {
      this.removeAttribute('error');
    }
  }

  get size() {
    return this.getAttribute('size') || 'md';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  // Event handlers
  handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    this.toggle();
  }

  handleKeyDown(event) {
    if (this.disabled) return;

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  }

  // Toggle the checked state
  toggle() {
    const oldChecked = this.checked;
    this.checked = !oldChecked;

    // Emit change event using base component method
    this.emit('change', {
      checked: this.checked,
      value: this.checked ? this.value : null,
      name: this.name
    });
  }

  // Attach event listeners using base component pattern
  attachEventListeners() {
    this.removeEventListeners(); // Clean up existing listeners
    
    const toggleContainer = this.shadowRoot.querySelector('.toggle-container');
    if (!toggleContainer) return;
    
    // Use base component's standardized event listener management
    this.addEventListeners([
      {
        element: toggleContainer,
        events: ['click'],
        handler: this.handleClick
      },
      {
        element: toggleContainer,
        events: ['keydown'],
        handler: this.handleKeyDown
      }
    ]);
  }

  // Render the component
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Enhanced Material Design 3 variables with better semantic naming */
          --_toggle-width: 52px;
          --_toggle-height: 32px;
          --_toggle-thumb-size: 24px;
          --_toggle-thumb-size-pressed: 28px;
          --_toggle-thumb-size-expanded: 32px;
          --_toggle-track-height: 16px;
          --_toggle-state-layer-size: 40px;
          --_toggle-border-radius: var(--_global-border-radius-full);
          --_toggle-border-width: 2px;
          
          /* Enhanced color tokens following Material Design 3 principles */
          --_toggle-track-color-off: var(--_global-color-surface-container-highest);
          --_toggle-track-color-on: var(--_global-color-primary);
          --_toggle-track-color-disabled: var(--_global-color-surface-variant);
          --_toggle-track-color-error: var(--_global-color-error);
          
          /* Enhanced border definitions */
          --_toggle-border-off: var(--_toggle-border-width) solid var(--_global-color-outline);
          --_toggle-border-on: var(--_toggle-border-width) solid var(--_global-color-primary);
          --_toggle-border-hover: var(--_toggle-border-width) solid var(--_global-color-on-surface);
          --_toggle-border-focus: var(--_toggle-border-width) solid var(--_global-color-primary);
          --_toggle-border-disabled: var(--_toggle-border-width) solid var(--_global-color-outline);
          --_toggle-border-error: var(--_toggle-border-width) solid var(--_global-color-error);
          
          /* Enhanced thumb colors */
          --_toggle-thumb-color-off: var(--_global-color-outline);
          --_toggle-thumb-color-on: var(--_global-color-on-primary);
          --_toggle-thumb-color-disabled: var(--_global-color-surface);
          --_toggle-thumb-color-error: var(--_global-color-on-error);
          
          /* Enhanced state layer colors */
          --_toggle-state-layer-off: var(--_global-color-on-surface);
          --_toggle-state-layer-on: var(--_global-color-primary);
          --_toggle-state-layer-error: var(--_global-color-error);
          
          /* Improved motion and transitions */
          --_toggle-transition: all var(--_global-motion-duration-short2) var(--_global-motion-easing-emphasized);
          --_toggle-transition-fast: all var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
          --_toggle-transition-thumb: all var(--_global-motion-duration-short2) var(--_global-motion-easing-emphasized-decelerate);
          
          /* Enhanced shadows and elevations */
          --_toggle-thumb-shadow-off: var(--_global-elevation-1);
          --_toggle-thumb-shadow-on: var(--_global-elevation-2);
          --_toggle-thumb-shadow-pressed: var(--_global-elevation-3);
          
          /* Typography */
          --_toggle-label-color: var(--_global-color-on-surface);
          --_toggle-label-color-disabled: var(--_global-color-outline);
          --_toggle-label-color-error: var(--_global-color-error);
          
          display: inline-flex;
          align-items: center;
          gap: var(--_global-spacing-sm);
          cursor: pointer;
          user-select: none;
          position: relative;
          min-height: var(--_toggle-state-layer-size);
          font-family: var(--_global-font-family-sans);
        }

        :host([disabled]) {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }

        .toggle-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: var(--_toggle-state-layer-size);
          height: var(--_toggle-state-layer-size);
          border-radius: 50%;
          cursor: pointer;
          outline: none;
          isolation: isolate;
        }
        
        /* Enhanced state layer with dynamic color */
        .toggle-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background-color: var(--_toggle-state-layer-off);
          opacity: 0;
          transition: var(--_toggle-transition-fast);
          pointer-events: none;
          z-index: -1;
        }
        
        /* State layer color changes for checked state */
        .toggle-container:has(.checked)::before {
          background-color: var(--_toggle-state-layer-on);
        }
        
        /* Enhanced hover state with interaction feedback */
        .toggle-container:hover:not([aria-disabled="true"])::before {
          opacity: var(--_global-state-layer-hover);
          transform: scale(1.1);
        }
        
        /* Active/pressed state */
        .toggle-container:active:not([aria-disabled="true"])::before {
          opacity: var(--_global-state-layer-pressed);
          transform: scale(0.95);
          transition: var(--_toggle-transition);
        }
        
        /* Enhanced focus indicators */
        .toggle-container:focus {
          outline: 2px solid var(--_toggle-state-layer-on);
          outline-offset: 2px;
          transition: outline-color var(--_toggle-transition-fast);
        }
        
        .toggle-container:focus::before {
          opacity: var(--_global-state-layer-focus);
          transform: scale(1.05);
        }
        
        /* Focus ring enhancement for keyboard navigation */
        .toggle-container:focus:not(:active) {
          outline-width: 3px;
          animation: focus-pulse 2s ease-in-out infinite;
        }
        
        @keyframes focus-pulse {
          0%, 100% { outline-offset: 2px; }
          50% { outline-offset: 4px; }
        }

        .toggle-track {
          position: relative;
          width: var(--_toggle-width);
          height: var(--_toggle-track-height);
          background-color: var(--_toggle-track-color-off);
          border: var(--_toggle-border-off);
          border-radius: var(--_toggle-border-radius);
          transition: var(--_toggle-transition);
          box-sizing: border-box;
          overflow: hidden;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .toggle-track.checked {
          background-color: var(--_toggle-track-color-on);
          border: var(--_toggle-border-on);
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.15);
        }
        
        /* Enhanced hover state for track */
        .toggle-container:hover:not([aria-disabled="true"]) .toggle-track:not(.checked) {
          border: var(--_toggle-border-hover);
          background-color: var(--_global-color-surface-variant);
        }

        .toggle-thumb {
          position: absolute;
          top: 50%;
          left: calc(-1 * var(--_toggle-thumb-size) / 2 + var(--_toggle-border-width));
          width: var(--_toggle-thumb-size);
          height: var(--_toggle-thumb-size);
          background-color: var(--_toggle-thumb-color-off);
          border-radius: var(--_toggle-border-radius);
          transition: var(--_toggle-transition-thumb);
          transform: translateY(-50%);
          box-shadow: var(--_toggle-thumb-shadow-off);
          z-index: 2;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        /* Enhanced checked state for thumb */
        .toggle-track.checked .toggle-thumb {
          left: calc(100% - var(--_toggle-thumb-size) / 2 - var(--_toggle-border-width));
          background-color: var(--_toggle-thumb-color-on);
          box-shadow: var(--_toggle-thumb-shadow-on);
          transform: translateY(-50%) scale(1.1);
          animation: thumb-bounce 0.3s var(--_global-motion-easing-emphasized) forwards;
        }
        
        /* Enhanced pressed state for thumb with better expansion */
        .toggle-container:active .toggle-thumb {
          width: var(--_toggle-thumb-size-pressed);
          height: var(--_toggle-thumb-size-pressed);
          box-shadow: var(--_toggle-thumb-shadow-pressed);
          transition: var(--_toggle-transition-fast);
        }
        
        .toggle-container:active .toggle-track:not(.checked) .toggle-thumb {
          left: calc(-1 * var(--_toggle-thumb-size-pressed) / 2 + var(--_toggle-border-width));
          transform: translateY(-50%) scale(0.9);
        }
        
        .toggle-container:active .toggle-track.checked .toggle-thumb {
          left: calc(100% - var(--_toggle-thumb-size-pressed) / 2 - var(--_toggle-border-width));
          width: var(--_toggle-thumb-size-expanded);
          height: var(--_toggle-thumb-size-expanded);
          transform: translateY(-50%) scale(0.9);
        }
        
        /* Thumb bounce animation */
        @keyframes thumb-bounce {
          0% {
            transform: translateY(-50%) scale(1);
          }
          50% {
            transform: translateY(-50%) scale(1.15);
          }
          100% {
            transform: translateY(-50%) scale(1.1);
          }
        }
        
        /* Hover enhancement for thumb */
        .toggle-container:hover:not([aria-disabled="true"]) .toggle-thumb {
          box-shadow: var(--_toggle-thumb-shadow-on);
          transform: translateY(-50%) scale(1.05);
        }
        
        .toggle-container:hover:not([aria-disabled="true"]) .toggle-track.checked .toggle-thumb {
          transform: translateY(-50%) scale(1.15);
        }

        .label {
          color: var(--_toggle-label-color);
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-normal);
          line-height: var(--_global-line-height-normal);
          cursor: pointer;
          flex: 1;
          transition: var(--_toggle-transition-fast);
        }

        /* Enhanced disabled states */
        :host([disabled]) {
          --_toggle-track-color-off: var(--_toggle-track-color-disabled);
          --_toggle-track-color-on: var(--_toggle-track-color-disabled);
          --_toggle-border-off: var(--_toggle-border-disabled);
          --_toggle-border-on: var(--_toggle-border-disabled);
          --_toggle-thumb-color-off: var(--_toggle-thumb-color-disabled);
          --_toggle-thumb-color-on: var(--_toggle-thumb-color-disabled);
          --_toggle-label-color: var(--_toggle-label-color-disabled);
        }
        
        :host([disabled]) .toggle-container::before {
          display: none;
        }
        
        :host([disabled]) .toggle-thumb {
          box-shadow: none;
          transform: translateY(-50%) scale(0.9);
          cursor: not-allowed;
        }
        
        :host([disabled]) .toggle-track.checked .toggle-thumb {
          transform: translateY(-50%) scale(0.9);
          animation: none;
        }
        
        :host([disabled]) .toggle-track {
          box-shadow: none;
          cursor: not-allowed;
        }
        
        :host([disabled]) .label {
          cursor: not-allowed;
        }

        /* Enhanced size variants */
        :host([size="sm"]) {
          --_toggle-width: 44px;
          --_toggle-track-height: 14px;
          --_toggle-thumb-size: 20px;
          --_toggle-thumb-size-pressed: 24px;
          --_toggle-thumb-size-expanded: 28px;
          --_toggle-state-layer-size: 36px;
        }

        :host([size="lg"]) {
          --_toggle-width: 60px;
          --_toggle-track-height: 18px;
          --_toggle-thumb-size: 28px;
          --_toggle-thumb-size-pressed: 32px;
          --_toggle-thumb-size-expanded: 36px;
          --_toggle-state-layer-size: 48px;
        }
        
        /* Enhanced error state support */
        :host([error]) {
          --_toggle-track-color-off: var(--_toggle-track-color-error);
          --_toggle-track-color-on: var(--_toggle-track-color-error);
          --_toggle-border-off: var(--_toggle-border-error);
          --_toggle-border-on: var(--_toggle-border-error);
          --_toggle-border-hover: var(--_toggle-border-error);
          --_toggle-thumb-color-on: var(--_toggle-thumb-color-error);
          --_toggle-state-layer-off: var(--_toggle-state-layer-error);
          --_toggle-state-layer-on: var(--_toggle-state-layer-error);
          --_toggle-label-color: var(--_toggle-label-color-error);
        }
        
        :host([error]) .toggle-container:focus {
          outline-color: var(--_toggle-state-layer-error);
        }

        /* Enhanced High Contrast Mode Support */
        @media (prefers-contrast: high) {
          :host {
            --_toggle-border-width: 3px;
          }
          
          .toggle-track {
            border-width: var(--_toggle-border-width);
            background-color: var(--_global-color-surface);
            box-shadow: none;
          }
          
          .toggle-track.checked {
            background-color: var(--_global-color-primary);
            outline: 2px solid var(--_global-color-on-surface);
            outline-offset: 2px;
          }
          
          .toggle-thumb {
            border: 3px solid var(--_global-color-on-surface);
            background-color: var(--_global-color-surface);
            box-shadow: none;
          }
          
          .toggle-track.checked .toggle-thumb {
            background-color: var(--_global-color-on-primary);
            border-color: var(--_global-color-on-primary);
          }
          
          .toggle-container::before {
            display: none;
          }
          
          .label {
            font-weight: var(--_global-font-weight-bold);
          }
          
          .toggle-container:focus {
            outline-width: 4px;
            outline-style: double;
          }
        }

        /* Enhanced Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          :host {
            --_toggle-transition: none;
            --_toggle-transition-fast: none;
            --_toggle-transition-thumb: none;
          }
          
          .toggle-track,
          .toggle-thumb,
          .toggle-container::before,
          .label {
            animation: none !important;
            transition: none !important;
          }
          
          .toggle-container:focus:not(:active) {
            animation: none;
          }
          
          .toggle-track.checked .toggle-thumb {
            transform: translateY(-50%);
            animation: none;
          }
          
          .toggle-container:hover:not([aria-disabled="true"]) .toggle-thumb,
          .toggle-container:hover:not([aria-disabled="true"]) .toggle-track.checked .toggle-thumb {
            transform: translateY(-50%);
          }
        }

        /* Enhanced focus-visible support */
        @supports selector(:focus-visible) {
          .toggle-container:focus:not(:focus-visible) {
            outline: none;
            animation: none;
          }
          
          .toggle-container:focus:not(:focus-visible)::before {
            opacity: 0;
          }
          
          .toggle-container:focus-visible {
            outline: 3px solid var(--_toggle-state-layer-on);
            outline-offset: 3px;
            animation: focus-pulse 2s ease-in-out infinite;
          }
        }
        
        /* Color scheme adaptation */
        @media (prefers-color-scheme: dark) {
          .toggle-track {
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
          }
          
          .toggle-track.checked {
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
          }
          
          .toggle-thumb {
            border-color: rgba(255, 255, 255, 0.1);
          }
        }
      </style>

      <div 
        class="toggle-container"
        role="switch"
        aria-checked="${this.checked}"
        aria-label="${this.label || 'toggle switch'}"
        ${this.disabled ? 'aria-disabled="true"' : ''}
        tabindex="${this.disabled ? '-1' : '0'}"
      >
        <div class="toggle-track ${this.checked ? 'checked' : ''}">
          <div class="toggle-thumb"></div>
        </div>
      </div>
      
      ${this.label ? `<span class="label">${this.label}</span>` : ''}
    `;
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-toggle')) {
  customElements.define('my-toggle', MyToggle);
}