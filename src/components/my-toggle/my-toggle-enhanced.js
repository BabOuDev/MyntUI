/**
 * MyntUI my-toggle Component (Enhanced)
 * A switch-like component for a boolean input, providing a visual on/off state
 * Enhanced version using MyntUIBaseComponent for improved consistency and maintainability
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';

class MyToggleEnhanced extends MyntUIBaseComponent {
  constructor() {
    super();
    
    // Component-specific bindings
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
    // Initialize with base component
    this.log('Toggle component initializing...');
  }

  // Extended observed attributes (inherits base ones)
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'checked', 'label', 'name', 'value', 'required', 'readonly'
    ];
  }

  // Component-specific attribute handling
  handleAttributeChange(name, oldValue, newValue) {
    super.handleAttributeChange(name, oldValue, newValue);
    
    switch (name) {
      case 'checked':
        this.emit('change', { 
          checked: this.checked, 
          value: this.value,
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

  // Enhanced getters and setters with validation
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
    if (this.validateAttribute('label', value, (v) => typeof v === 'string')) {
      this.setAttribute('label', value);
    }
  }

  get name() {
    return this.getAttribute('name') || '';
  }

  set name(value) {
    if (this.validateAttribute('name', value, (v) => typeof v === 'string')) {
      this.setAttribute('name', value);
    }
  }

  get value() {
    return this.getAttribute('value') || 'on';
  }

  set value(value) {
    this.setAttribute('value', value);
  }

  get required() {
    return this.hasAttribute('required');
  }

  set required(value) {
    this.toggleAttribute('required', Boolean(value));
  }

  get readonly() {
    return this.hasAttribute('readonly');
  }

  set readonly(value) {
    this.toggleAttribute('readonly', Boolean(value));
  }

  // Enhanced keyboard handling
  handleKeyDown(event) {
    super.handleKeyDown(event);
    
    if (this.disabled || this.readonly) return;

    switch (event.key) {
      case ' ':
      case 'Enter':
        event.preventDefault();
        this.toggle();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (this.checked) this.toggle();
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (!this.checked) this.toggle();
        break;
    }
  }

  // Click handling with enhanced accessibility
  handleClick(event) {
    if (this.disabled || this.readonly) {
      event.preventDefault();
      return;
    }

    // Create ripple effect using base component method
    this.createRipple(event);
    
    this.toggle();
  }

  // Change event handling
  handleChange(event) {
    if (event.target === this) return; // Prevent infinite loops
    
    this.log('Change event triggered');
    this.validateState();
  }

  // Public methods
  toggle() {
    if (this.disabled || this.readonly) return;
    
    const wasChecked = this.checked;
    this.checked = !wasChecked;
    
    // Enhanced accessibility announcement
    this.announceToScreenReader(
      `${this.label || 'Toggle'} ${this.checked ? 'on' : 'off'}`,
      'assertive'
    );
    
    this.log('Toggle switched:', { from: wasChecked, to: this.checked });
  }

  check() {
    if (!this.checked) this.toggle();
  }

  uncheck() {
    if (this.checked) this.toggle();
  }

  // Validation
  validateState() {
    const isValid = !this.required || this.checked;
    this.toggleClass('invalid', !isValid);
    this.setAttribute('aria-invalid', !isValid);
    
    if (!isValid) {
      this.announceToScreenReader('Required field not selected', 'assertive');
    }
    
    return isValid;
  }

  // Enhanced focus handling
  handleFocus() {
    super.handleFocus();
    
    const toggle = this.shadowRoot.querySelector('.toggle-track');
    if (toggle) {
      toggle.classList.add('focused');
    }
    
    this.emit('focus', { name: this.name, checked: this.checked });
  }

  handleBlur() {
    super.handleBlur();
    
    const toggle = this.shadowRoot.querySelector('.toggle-track');
    if (toggle) {
      toggle.classList.remove('focused');
    }
    
    // Validate on blur
    this.validateState();
    this.emit('blur', { name: this.name, checked: this.checked });
  }

  // Event listener management using base component system
  attachEventListeners() {
    this.removeEventListeners(); // Clean up first
    
    const toggle = this.shadowRoot.querySelector('.toggle-container');
    
    if (toggle) {
      this.addEventListeners([
        {
          element: toggle,
          events: ['click'],
          handler: this.handleClick
        },
        {
          element: toggle,
          events: ['keydown'],
          handler: this.handleKeyDown
        },
        {
          element: toggle,
          events: ['focus'],
          handler: this.handleFocus
        },
        {
          element: toggle,
          events: ['blur'],
          handler: this.handleBlur
        }
      ]);
    }
    
    // Listen for our own change events
    this.addEventListener('change', this.handleChange);
  }

  // Component lifecycle hooks
  onConnected() {
    this.log('Toggle connected, initial validation');
    // Set initial ARIA state
    this.setAttribute('role', 'switch');
    this.setAttribute('aria-checked', this.checked);
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
    
    // Validate initial state
    this.validateState();
  }

  onDisconnected() {
    this.log('Toggle disconnected');
    this.removeEventListener('change', this.handleChange);
  }

  // Render method with enhanced styling and accessibility
  render() {
    return this.measurePerformance('render', () => {
      const isChecked = this.checked;
      const isDisabled = this.disabled;
      const isReadonly = this.readonly;
      const hasError = this.error;
      const size = this.size;
      const label = this.label;

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            /* Enhanced toggle variables using design system */
            --_toggle-width: 52px;
            --_toggle-height: 32px;
            --_toggle-thumb-size: 20px;
            --_toggle-track-radius: 16px;
            --_toggle-thumb-radius: 10px;
            --_toggle-padding: 6px;
            
            /* Size variants */
            --_toggle-width-sm: 40px;
            --_toggle-height-sm: 24px;
            --_toggle-thumb-size-sm: 16px;
            --_toggle-width-lg: 64px;
            --_toggle-height-lg: 40px;
            --_toggle-thumb-size-lg: 28px;
            
            /* Color system aligned with Material Design 3 */
            --_toggle-track-color-unchecked: var(--_global-color-outline);
            --_toggle-track-color-checked: var(--_global-color-primary);
            --_toggle-track-color-disabled: var(--_global-color-outline-variant);
            --_toggle-track-color-error: var(--_global-color-error);
            
            --_toggle-thumb-color-unchecked: var(--_global-color-outline);
            --_toggle-thumb-color-checked: var(--_global-color-on-primary);
            --_toggle-thumb-color-disabled: var(--_global-color-on-surface-variant);
            
            --_toggle-background-color-unchecked: var(--_global-color-surface-variant);
            --_toggle-background-color-checked: var(--_global-color-primary);
            --_toggle-background-color-disabled: var(--_global-color-surface-variant);
            
            /* Enhanced state layers */
            --_toggle-state-layer-color: var(--_global-color-primary);
            --_toggle-state-layer-size: 40px;
            
            /* Transitions with easing */
            --_toggle-transition: all var(--_global-motion-duration-short2) var(--_global-motion-easing-emphasized);
            --_toggle-transition-fast: all var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
            
            display: inline-flex;
            align-items: center;
            gap: var(--_global-spacing-sm);
            font-family: var(--_global-font-family-sans);
            cursor: pointer;
            user-select: none;
          }

          :host([disabled]),
          :host([readonly]) {
            opacity: 0.6;
            cursor: not-allowed;
            pointer-events: none;
          }

          /* Size variants */
          :host([size="sm"]) {
            --_toggle-width: var(--_toggle-width-sm);
            --_toggle-height: var(--_toggle-height-sm);
            --_toggle-thumb-size: var(--_toggle-thumb-size-sm);
            --_toggle-state-layer-size: 32px;
          }

          :host([size="lg"]) {
            --_toggle-width: var(--_toggle-width-lg);
            --_toggle-height: var(--_toggle-height-lg);
            --_toggle-thumb-size: var(--_toggle-thumb-size-lg);
            --_toggle-state-layer-size: 48px;
          }

          .toggle-container {
            position: relative;
            display: inline-flex;
            align-items: center;
            gap: var(--_global-spacing-sm);
            outline: none;
            border-radius: var(--_global-border-radius-full);
            padding: var(--_global-spacing-xs);
            margin: calc(var(--_global-spacing-xs) * -1);
          }

          /* Enhanced focus indicators */
          .toggle-container:focus,
          .toggle-container.focused {
            outline: 2px solid var(--_global-color-primary);
            outline-offset: 2px;
          }

          /* State layer for interactions */
          .toggle-container::before {
            content: '';
            position: absolute;
            top: 50%;
            left: calc(var(--_toggle-width) / 2);
            transform: translate(-50%, -50%);
            width: var(--_toggle-state-layer-size);
            height: var(--_toggle-state-layer-size);
            border-radius: 50%;
            background-color: var(--_toggle-state-layer-color);
            opacity: 0;
            transition: var(--_toggle-transition-fast);
            pointer-events: none;
            z-index: 0;
          }

          .toggle-container:hover:not([aria-disabled="true"])::before {
            opacity: var(--_global-state-layer-hover);
          }

          .toggle-container:active:not([aria-disabled="true"])::before {
            opacity: var(--_global-state-layer-pressed);
          }

          .toggle-track {
            position: relative;
            width: var(--_toggle-width);
            height: var(--_toggle-height);
            background-color: var(--_toggle-background-color-unchecked);
            border-radius: var(--_toggle-track-radius);
            transition: var(--_toggle-transition);
            border: 2px solid var(--_toggle-track-color-unchecked);
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            isolation: isolate;
          }

          /* Checked state styling */
          :host([checked]) .toggle-track {
            background-color: var(--_toggle-background-color-checked);
            border-color: var(--_toggle-track-color-checked);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          }

          /* Error state */
          :host([error]) .toggle-track {
            border-color: var(--_toggle-track-color-error);
            background-color: var(--_global-color-error-container);
          }

          /* Disabled state */
          :host([disabled]) .toggle-track {
            background-color: var(--_toggle-background-color-disabled);
            border-color: var(--_toggle-track-color-disabled);
            box-shadow: none;
          }

          .toggle-thumb {
            position: absolute;
            top: 50%;
            left: var(--_toggle-padding);
            transform: translateY(-50%);
            width: var(--_toggle-thumb-size);
            height: var(--_toggle-thumb-size);
            background-color: var(--_toggle-thumb-color-unchecked);
            border-radius: var(--_toggle-thumb-radius);
            transition: var(--_toggle-transition);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            z-index: 1;
          }

          /* Checked thumb position */
          :host([checked]) .toggle-thumb {
            left: calc(100% - var(--_toggle-thumb-size) - var(--_toggle-padding));
            background-color: var(--_toggle-thumb-color-checked);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          }

          /* Disabled thumb */
          :host([disabled]) .toggle-thumb {
            background-color: var(--_toggle-thumb-color-disabled);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }

          /* Label styling */
          .toggle-label {
            color: var(--_global-color-on-surface);
            font-size: var(--_global-font-size-sm);
            font-weight: var(--_global-font-weight-normal);
            line-height: var(--_global-line-height-normal);
            cursor: pointer;
          }

          :host([disabled]) .toggle-label,
          :host([readonly]) .toggle-label {
            cursor: not-allowed;
            color: var(--_global-color-on-surface-variant);
          }

          :host([error]) .toggle-label {
            color: var(--_global-color-error);
          }

          /* Required indicator */
          .toggle-label.required::after {
            content: ' *';
            color: var(--_global-color-error);
          }

          /* Enhanced ripple container */
          .toggle-track {
            position: relative;
            overflow: hidden;
          }

          .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation var(--_global-ripple-duration) var(--_global-ripple-easing);
            background-color: var(--_toggle-state-layer-color);
            opacity: var(--_global-ripple-opacity-pressed);
            pointer-events: none;
            z-index: 2;
          }

          /* Accessibility enhancements */
          @media (prefers-contrast: high) {
            .toggle-track {
              border-width: 3px;
            }
            
            .toggle-container:focus {
              outline-width: 3px;
              outline-style: double;
            }
            
            .toggle-thumb {
              border: 2px solid var(--_global-color-on-surface);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .toggle-track,
            .toggle-thumb,
            .toggle-container::before,
            .ripple {
              transition: none !important;
              animation: none !important;
            }
          }

          /* High contrast for better visibility */
          @media (prefers-color-scheme: dark) {
            .toggle-thumb {
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
            }
            
            :host([checked]) .toggle-thumb {
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
            }
          }
        </style>

        <div 
          class="toggle-container ripple-container"
          role="switch"
          aria-checked="${isChecked}"
          aria-label="${label || 'Toggle switch'}"
          aria-disabled="${isDisabled}"
          aria-readonly="${isReadonly}"
          aria-required="${this.required}"
          aria-invalid="${hasError}"
          tabindex="${isDisabled ? '-1' : '0'}"
        >
          <div class="toggle-track">
            <div class="toggle-thumb"></div>
          </div>
          
          ${label ? `
            <span class="toggle-label ${this.required ? 'required' : ''}">${label}</span>
          ` : ''}
        </div>
      `;

      // Update ARIA attributes on the host
      this.setAttribute('aria-checked', isChecked);
      this.setAttribute('aria-disabled', isDisabled);
      
      this.log('Toggle rendered', { checked: isChecked, disabled: isDisabled });
    });
  }
}

// Register component using base class helper
MyToggleEnhanced.define('my-toggle-enhanced');

export default MyToggleEnhanced;