/**
 * MyntUI my-toggle Component
 * A switch-like component for a boolean input, providing a visual on/off state
 * Enhanced version using MyntUIBaseComponent for improved consistency and maintainability
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';
import { globalConfig } from '../../config/global-config.js';

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

  // Generate TailwindCSS classes using global config
  getTailwindClasses() {
    const size = this.size || 'md';
    const disabled = this.disabled;
    const checked = this.checked;
    const error = this.error;
    const config = globalConfig.get('theme.tailwind', {});
    
    // Container classes
    let containerClasses = [
      'inline-flex',
      'items-center',
      'gap-3',
      'cursor-pointer',
      'select-none',
      'group'
    ];

    // Toggle track classes
    let trackClasses = [
      'relative',
      'flex-shrink-0',
      'rounded-full',
      'transition-all',
      'duration-medium1',
      'border-2',
      'p-1',
      'focus-visible:ring-2',
      'focus-visible:ring-primary/60',
      'focus-visible:ring-offset-2'
    ];

    // Size classes for toggle
    const sizeClasses = {
      sm: ['w-10', 'h-6'],
      md: ['w-12', 'h-7'], 
      lg: ['w-14', 'h-8']
    };
    trackClasses.push(...(sizeClasses[size] || sizeClasses.md));

    // Toggle thumb classes
    let thumbClasses = [
      'block',
      'bg-white',
      'rounded-full',
      'shadow-sm',
      'transition-transform',
      'duration-medium1',
      'border'
    ];

    // Thumb size classes
    const thumbSizeClasses = {
      sm: ['w-4', 'h-4'],
      md: ['w-5', 'h-5'],
      lg: ['w-6', 'h-6']
    };
    thumbClasses.push(...(thumbSizeClasses[size] || thumbSizeClasses.md));

    // Get toggle variant classes from global config
    const variantKey = checked ? 'checked' : 'unchecked';
    const variantConfig = config.variants?.toggle?.[variantKey] || '';
    
    if (variantConfig) {
      trackClasses.push(...variantConfig.split(' ').filter(Boolean));
    } else {
      // Fallback styling
      if (checked) {
        trackClasses.push('bg-primary', 'border-primary');
        thumbClasses.push('translate-x-full', 'border-primary');
      } else {
        trackClasses.push('bg-gray-200', 'border-gray-300');
        thumbClasses.push('translate-x-0', 'border-gray-300');
      }
    }

    // Apply state classes from global config
    const stateConfig = config.states || {};
    
    if (disabled) {
      const disabledState = stateConfig.disabled || 'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';
      containerClasses.push(...disabledState.split(' ').filter(Boolean));
    } else {
      // Interactive states
      const hoverState = stateConfig.hover || 'hover:bg-opacity-state-hover hover:scale-subtle transition-all duration-short2';
      trackClasses.push(...hoverState.split(' ').filter(Boolean));
    }

    // Error state
    if (error) {
      const errorState = stateConfig.error || 'border-error text-error bg-error/5';
      trackClasses.push(...errorState.split(' ').filter(Boolean));
    }

    // Label classes
    let labelClasses = [
      'text-surface-on-surface',
      'text-body-medium',
      'leading-normal',
      'select-none'
    ];

    if (disabled) {
      labelClasses.push('text-outline');
    } else if (error) {
      labelClasses.push('text-error');
    }

    return {
      container: containerClasses.join(' '),
      track: trackClasses.join(' '),
      thumb: thumbClasses.join(' '),
      label: labelClasses.join(' ')
    };
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
          /* Advanced Material Design 3 variables with superior semantic naming */
          --_toggle-width: 52px;
          --_toggle-height: 32px;
          --_toggle-thumb-size: 24px;
          --_toggle-thumb-size-pressed: 28px;
          --_toggle-thumb-size-expanded: 32px;
          --_toggle-track-height: 16px;
          --_toggle-state-layer-size: 40px;
          --_toggle-border-radius: var(--_global-border-radius-full);
          --_toggle-border-width: 2px;
          --_toggle-border-width-focus: 3px;
          
          /* Advanced color system with contextual variations */
          --_toggle-color-unchecked: var(--_global-color-outline);
          --_toggle-color-unchecked-hover: var(--_global-color-on-surface-variant);
          --_toggle-color-checked: var(--_global-color-primary);
          --_toggle-color-checked-hover: var(--_global-color-primary-60);
          --_toggle-color-disabled: var(--_global-color-outline-variant);
          --_toggle-color-error: var(--_global-color-error);
          --_toggle-color-error-hover: #E53E3E;
          
          /* Enhanced background colors with subtle gradients */
          --_toggle-track-color-off: var(--_global-color-surface-container-highest);
          --_toggle-track-color-off-hover: var(--_global-color-surface-container-high);
          --_toggle-track-color-on: var(--_global-color-primary);
          --_toggle-track-color-on-hover: var(--_global-color-primary-60);
          --_toggle-track-color-disabled: var(--_global-color-surface-variant);
          --_toggle-track-color-error: var(--_global-color-error);
          
          /* Enhanced border system with dynamic thickness */
          --_toggle-border-off: var(--_toggle-border-width) solid var(--_toggle-color-unchecked);
          --_toggle-border-on: var(--_toggle-border-width) solid var(--_toggle-color-checked);
          --_toggle-border-hover: var(--_toggle-border-width) solid var(--_toggle-color-unchecked-hover);
          --_toggle-border-focus: var(--_toggle-border-width-focus) solid var(--_toggle-color-checked);
          --_toggle-border-disabled: var(--_toggle-border-width) solid var(--_toggle-color-disabled);
          --_toggle-border-error: var(--_toggle-border-width) solid var(--_toggle-color-error);
          
          /* Advanced thumb color system */
          --_toggle-thumb-color-off: var(--_global-color-outline);
          --_toggle-thumb-color-off-hover: var(--_global-color-on-surface-variant);
          --_toggle-thumb-color-on: var(--_global-color-on-primary);
          --_toggle-thumb-color-on-hover: var(--_global-color-surface);
          --_toggle-thumb-color-disabled: var(--_global-color-surface);
          --_toggle-thumb-color-error: var(--_global-color-on-error);
          
          /* Advanced state layer colors with contextual awareness */
          --_toggle-state-layer-off: var(--_toggle-color-checked);
          --_toggle-state-layer-on: var(--_toggle-color-checked);
          --_toggle-state-layer-error: var(--_toggle-color-error);
          --_toggle-state-layer-hover: var(--_global-state-layer-hover);
          --_toggle-state-layer-focus: var(--_global-state-layer-focus);
          --_toggle-state-layer-pressed: var(--_global-state-layer-pressed);
          
          /* Spring-based motion system with enhanced easing */
          --_toggle-transition: all var(--_global-motion-duration-medium1) var(--_global-spring-gentle);
          --_toggle-transition-fast: all var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          --_toggle-transition-emphasized: all var(--_global-motion-duration-medium1) var(--_global-spring-energetic);
          --_toggle-transition-bounce: all var(--_global-motion-duration-medium2) var(--_global-spring-bouncy);
          --_toggle-transition-thumb: all var(--_global-motion-duration-medium1) var(--_global-spring-wobbly);
          
          /* Enhanced ripple system with better physics */
          --_toggle-ripple-size: calc(var(--_toggle-state-layer-size) * 1.4);
          --_toggle-ripple-duration: var(--_global-ripple-duration);
          --_toggle-ripple-duration-fast: var(--_global-ripple-duration-fast);
          --_toggle-ripple-easing: var(--_global-spring-gentle);
          --_toggle-ripple-easing-bounce: var(--_global-spring-wobbly);
          
          /* Enhanced typography with better hierarchy */
          --_toggle-label-color: var(--_global-color-on-surface);
          --_toggle-label-color-hover: var(--_global-color-primary-10);
          --_toggle-label-color-disabled: var(--_global-color-outline);
          --_toggle-label-color-error: var(--_global-color-error);
          
          /* Advanced elevation system for depth */
          --_toggle-thumb-elevation-rest: var(--_global-elevation-0);
          --_toggle-thumb-elevation-hover: var(--_global-shadow-interaction-subtle);
          --_toggle-thumb-elevation-focus: var(--_global-shadow-interaction-moderate);
          --_toggle-thumb-elevation-active: var(--_global-shadow-interaction-strong);
          --_toggle-track-elevation-rest: var(--_global-elevation-0);
          --_toggle-track-elevation-hover: var(--_global-shadow-surface-subtle);
          --_toggle-track-elevation-focus: var(--_global-shadow-surface-moderate);
          
          /* Micro-interaction enhancements */
          --_toggle-scale-rest: 1;
          --_toggle-scale-hover: var(--_global-micro-scale-subtle);
          --_toggle-scale-focus: var(--_global-micro-scale-noticeable);
          --_toggle-scale-active: 0.98;
          --_toggle-translate-hover: var(--_global-micro-translate-subtle);
          
          display: inline-flex;
          align-items: center;
          gap: var(--_global-spacing-sm);
          cursor: pointer;
          user-select: none;
          line-height: var(--_global-line-height-normal);
          position: relative;
          min-height: var(--_toggle-state-layer-size);
          font-family: var(--_global-font-family-sans);
          contain: layout style;
          isolation: isolate;
        }

        :host([disabled]) {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }

        .toggle-container {
          display: inline-flex;
          align-items: center;
          gap: var(--_global-spacing-sm);
          cursor: pointer;
          outline: none;
          position: relative;
          padding: calc((var(--_toggle-state-layer-size) - var(--_toggle-width)) / 2);
          margin: calc((var(--_toggle-state-layer-size) - var(--_toggle-width)) / -2);
          border-radius: 50%;
          overflow: visible;
          isolation: isolate;
          transform: var(--_toggle-scale-rest);
          transition: var(--_toggle-transition);
          will-change: transform, box-shadow;
        }
        
        /* Enhanced multi-layered state system for superior depth */
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
          transform: scale(0.8);
          transition: var(--_toggle-transition-emphasized);
          pointer-events: none;
          z-index: -1;
          box-shadow: var(--_toggle-track-elevation-rest);
        }
        
        /* Advanced state layer for focus ring enhancement */
        .toggle-container::after {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border-radius: 50%;
          background-color: var(--_toggle-state-layer-off);
          opacity: 0;
          transform: scale(0.6);
          transition: var(--_toggle-transition-bounce);
          pointer-events: none;
          z-index: -2;
          border: 2px solid transparent;
        }
        
        /* Enhanced state layer color changes for checked state */
        .toggle-container:has(.checked)::before,
        .toggle-container:has(.checked)::after {
          background-color: var(--_toggle-state-layer-on);
        }
        
        /* Superior hover state with spring physics and micro-interactions */
        .toggle-container:hover:not([aria-disabled="true"]) {
          transform: var(--_toggle-scale-hover) var(--_toggle-translate-hover);
          box-shadow: var(--_toggle-track-elevation-hover);
        }
        
        .toggle-container:hover:not([aria-disabled="true"])::before {
          opacity: var(--_toggle-state-layer-hover);
          transform: scale(1.2);
          box-shadow: var(--_toggle-track-elevation-hover);
        }
        
        .toggle-container:hover:not([aria-disabled="true"])::after {
          opacity: calc(var(--_toggle-state-layer-hover) * 0.6);
          transform: scale(1);
        }
        
        /* Enhanced active/pressed state with realistic physics */
        .toggle-container:active:not([aria-disabled="true"]) {
          transform: scale(var(--_toggle-scale-active));
          box-shadow: var(--_toggle-track-elevation-focus);
          transition: var(--_toggle-transition-fast);
        }
        
        .toggle-container:active:not([aria-disabled="true"])::before {
          opacity: var(--_toggle-state-layer-pressed);
          transform: scale(1);
          transition: var(--_toggle-transition-fast);
        }
        
        .toggle-container:active:not([aria-disabled="true"])::after {
          opacity: calc(var(--_toggle-state-layer-pressed) * 0.8);
          transform: scale(0.8);
          transition: var(--_toggle-transition-fast);
        }

        /* Superior focus indicators with advanced visual feedback */
        .toggle-container:focus {
          outline: var(--_toggle-border-focus);
          outline-offset: 3px;
          transform: var(--_toggle-scale-focus);
          box-shadow: var(--_toggle-track-elevation-focus);
          transition: var(--_toggle-transition-emphasized);
        }
        
        .toggle-container:focus::before {
          opacity: var(--_toggle-state-layer-focus);
          transform: scale(1.3);
          box-shadow: var(--_toggle-track-elevation-focus);
        }
        
        .toggle-container:focus::after {
          opacity: calc(var(--_toggle-state-layer-focus) * 0.7);
          transform: scale(1.1);
          border-color: var(--_toggle-color-checked);
        }
        
        /* Enhanced focus ring for superior keyboard navigation */
        .toggle-container:focus:not(:active) {
          outline-width: var(--_toggle-border-width-focus);
          animation: focus-pulse-advanced 2.5s var(--_global-spring-gentle) infinite;
        }
        
        .toggle-container:focus:not(:active)::after {
          animation: focus-ring-pulse 2.5s var(--_global-spring-gentle) infinite;
        }
        
        /* Advanced focus animations with spring physics */
        @keyframes focus-pulse-advanced {
          0%, 100% { 
            outline-offset: 3px;
            transform: var(--_toggle-scale-focus);
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
            opacity: calc(var(--_toggle-state-layer-focus) * 0.7);
          }
          50% { 
            transform: scale(1.2);
            opacity: calc(var(--_toggle-state-layer-focus) * 0.9);
          }
        }

        .toggle-track {
          position: relative;
          width: var(--_toggle-width);
          height: var(--_toggle-track-height);
          background-color: var(--_toggle-track-color-off);
          background-image: linear-gradient(135deg, var(--_toggle-track-color-off) 0%, var(--_global-color-surface-container-low) 100%);
          border: var(--_toggle-border-off);
          border-radius: var(--_toggle-border-radius);
          transition: var(--_toggle-transition);
          box-sizing: border-box;
          overflow: hidden;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), var(--_toggle-track-elevation-rest);
          will-change: background-color, border-color, box-shadow, transform;
        }

        .toggle-track.checked {
          background-color: var(--_toggle-track-color-on);
          background-image: linear-gradient(135deg, var(--_toggle-track-color-on) 0%, var(--_toggle-color-checked-hover) 100%);
          border: var(--_toggle-border-on);
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.15), var(--_toggle-track-elevation-hover);
          animation: track-checked-bounce var(--_global-motion-duration-medium1) var(--_global-spring-bouncy) forwards;
        }
        
        /* Enhanced hover state for track with superior visual feedback */
        .toggle-container:hover:not([aria-disabled="true"]) .toggle-track:not(.checked) {
          border: var(--_toggle-border-hover);
          background-color: var(--_toggle-track-color-off-hover);
          background-image: linear-gradient(135deg, var(--_toggle-track-color-off-hover) 0%, var(--_global-color-surface-container) 100%);
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12), var(--_toggle-track-elevation-hover);
          transform: var(--_toggle-scale-hover);
        }
        
        .toggle-container:hover:not([aria-disabled="true"]) .toggle-track.checked {
          background-color: var(--_toggle-track-color-on-hover);
          background-image: linear-gradient(135deg, var(--_toggle-track-color-on-hover) 0%, var(--_toggle-color-checked) 100%);
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.18), var(--_toggle-track-elevation-focus);
          transform: var(--_toggle-scale-hover);
        }
        
        /* Track bounce animation for checked state */
        @keyframes track-checked-bounce {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .toggle-thumb {
          position: absolute;
          top: 50%;
          left: calc(-1 * var(--_toggle-thumb-size) / 2 + var(--_toggle-border-width));
          width: var(--_toggle-thumb-size);
          height: var(--_toggle-thumb-size);
          background-color: var(--_toggle-thumb-color-off);
          background-image: linear-gradient(135deg, var(--_toggle-thumb-color-off) 0%, var(--_global-color-surface) 100%);
          border-radius: var(--_toggle-border-radius);
          transition: var(--_toggle-transition-thumb);
          transform: translateY(-50%);
          box-shadow: var(--_toggle-thumb-elevation-rest), 0 1px 3px rgba(0, 0, 0, 0.15);
          z-index: 2;
          border: 1px solid rgba(0, 0, 0, 0.1);
          will-change: transform, background-color, box-shadow, left, width, height;
        }
        
        /* Enhanced checked state for thumb with sophisticated animations */
        .toggle-track.checked .toggle-thumb {
          left: calc(100% - var(--_toggle-thumb-size) / 2 - var(--_toggle-border-width));
          background-color: var(--_toggle-thumb-color-on);
          background-image: linear-gradient(135deg, var(--_toggle-thumb-color-on) 0%, var(--_toggle-thumb-color-on-hover) 100%);
          box-shadow: var(--_toggle-thumb-elevation-hover), 0 2px 6px rgba(0, 0, 0, 0.2);
          transform: translateY(-50%) scale(1.1);
          animation: thumb-bounce-advanced var(--_global-motion-duration-medium1) var(--_global-spring-wobbly) forwards;
        }
        
        /* Enhanced pressed state for thumb with superior expansion physics */
        .toggle-container:active .toggle-thumb {
          width: var(--_toggle-thumb-size-pressed);
          height: var(--_toggle-thumb-size-pressed);
          box-shadow: var(--_toggle-thumb-elevation-active), 0 3px 8px rgba(0, 0, 0, 0.25);
          transition: var(--_toggle-transition-fast);
        }
        
        .toggle-container:active .toggle-track:not(.checked) .toggle-thumb {
          left: calc(-1 * var(--_toggle-thumb-size-pressed) / 2 + var(--_toggle-border-width));
          transform: translateY(-50%) scale(0.9);
          background-image: linear-gradient(135deg, var(--_toggle-thumb-color-off-hover) 0%, var(--_global-color-surface-variant) 100%);
        }
        
        .toggle-container:active .toggle-track.checked .toggle-thumb {
          left: calc(100% - var(--_toggle-thumb-size-pressed) / 2 - var(--_toggle-border-width));
          width: var(--_toggle-thumb-size-expanded);
          height: var(--_toggle-thumb-size-expanded);
          transform: translateY(-50%) scale(0.9);
          background-image: linear-gradient(135deg, var(--_toggle-thumb-color-on-hover) 0%, var(--_toggle-thumb-color-on) 100%);
        }
        
        /* Advanced thumb bounce animation with spring physics */
        @keyframes thumb-bounce-advanced {
          0% {
            transform: translateY(-50%) scale(1);
          }
          25% {
            transform: translateY(-50%) scale(1.2) rotate(2deg);
          }
          50% {
            transform: translateY(-50%) scale(1.15) rotate(-1deg);
          }
          75% {
            transform: translateY(-50%) scale(1.12) rotate(0.5deg);
          }
          100% {
            transform: translateY(-50%) scale(1.1) rotate(0deg);
          }
        }
        
        /* Superior hover enhancement for thumb with micro-interactions */
        .toggle-container:hover:not([aria-disabled="true"]) .toggle-thumb {
          box-shadow: var(--_toggle-thumb-elevation-hover), 0 2px 6px rgba(0, 0, 0, 0.18);
          transform: translateY(-50%) scale(1.05) translateZ(0);
          background-image: linear-gradient(135deg, var(--_toggle-thumb-color-off-hover) 0%, var(--_global-color-surface-container) 100%);
        }
        
        .toggle-container:hover:not([aria-disabled="true"]) .toggle-track.checked .toggle-thumb {
          transform: translateY(-50%) scale(1.15) translateZ(0);
          background-image: linear-gradient(135deg, var(--_toggle-thumb-color-on-hover) 0%, var(--_toggle-thumb-color-on) 100%);
          box-shadow: var(--_toggle-thumb-elevation-focus), 0 3px 8px rgba(0, 0, 0, 0.22);
        }

        .label {
          color: var(--_toggle-label-color);
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-normal);
          line-height: var(--_global-line-height-normal);
          cursor: pointer;
          flex: 1;
          transition: var(--_toggle-transition-fast);
          will-change: color;
        }
        
        /* Enhanced label hover states with contextual color changes */
        .toggle-container:hover:not([aria-disabled="true"]) + .label {
          color: var(--_toggle-label-color-hover);
        }

        /* Enhanced disabled states with sophisticated visual feedback */
        :host([disabled]) {
          --_toggle-color-unchecked: var(--_toggle-color-disabled);
          --_toggle-color-checked: var(--_toggle-color-disabled);
          --_toggle-track-color-off: var(--_toggle-track-color-disabled);
          --_toggle-track-color-on: var(--_toggle-track-color-disabled);
          --_toggle-border-off: var(--_toggle-border-disabled);
          --_toggle-border-on: var(--_toggle-border-disabled);
          --_toggle-thumb-color-off: var(--_toggle-thumb-color-disabled);
          --_toggle-thumb-color-on: var(--_toggle-thumb-color-disabled);
          --_toggle-label-color: var(--_toggle-label-color-disabled);
          opacity: 0.6;
          filter: grayscale(0.3);
        }
        
        :host([disabled]) .toggle-container::before,
        :host([disabled]) .toggle-container::after {
          display: none;
        }
        
        :host([disabled]) .toggle-thumb {
          box-shadow: none;
          transform: translateY(-50%) scale(0.9);
          cursor: not-allowed;
          background-image: none;
          filter: brightness(0.9);
        }
        
        :host([disabled]) .toggle-track.checked .toggle-thumb {
          transform: translateY(-50%) scale(0.9);
          animation: none;
          background-image: none;
        }
        
        :host([disabled]) .toggle-track {
          box-shadow: none;
          cursor: not-allowed;
          background-image: none;
          filter: brightness(0.95);
        }
        
        :host([disabled]) .label {
          cursor: not-allowed;
          filter: brightness(0.8);
        }

        /* Enhanced size variants with improved scaling */
        :host([size="xs"]) {
          --_toggle-width: 36px;
          --_toggle-track-height: 12px;
          --_toggle-thumb-size: 16px;
          --_toggle-thumb-size-pressed: 20px;
          --_toggle-thumb-size-expanded: 24px;
          --_toggle-state-layer-size: 32px;
        }

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
        
        /* Enhanced error state support with sophisticated visual feedback */
        :host([error]) {
          --_toggle-color-unchecked: var(--_toggle-color-error);
          --_toggle-color-checked: var(--_toggle-color-error);
          --_toggle-color-unchecked-hover: var(--_toggle-color-error-hover);
          --_toggle-color-checked-hover: var(--_toggle-color-error-hover);
          --_toggle-track-color-off: var(--_toggle-track-color-error);
          --_toggle-track-color-on: var(--_toggle-track-color-error);
          --_toggle-track-color-off-hover: var(--_toggle-color-error-hover);
          --_toggle-track-color-on-hover: var(--_toggle-color-error-hover);
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
        
        :host([error]) .toggle-container:focus::after {
          border-color: var(--_toggle-color-error);
        }
        
        /* Error state animations for enhanced feedback */
        :host([error]) .toggle-track {
          animation: error-pulse 2s var(--_global-spring-gentle) infinite;
        }
        
        @keyframes error-pulse {
          0%, 100% { 
            border-color: var(--_toggle-color-error);
          }
          50% { 
            border-color: var(--_toggle-color-error-hover);
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(229, 62, 62, 0.2);
          }
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

        /* Enhanced focus-visible support with advanced visual feedback */
        @supports selector(:focus-visible) {
          .toggle-container:focus:not(:focus-visible) {
            outline: none;
            animation: none;
            transform: var(--_toggle-scale-rest);
            box-shadow: var(--_toggle-track-elevation-rest);
          }
          
          .toggle-container:focus:not(:focus-visible)::before,
          .toggle-container:focus:not(:focus-visible)::after {
            opacity: 0;
            transform: scale(0.8);
          }
          
          .toggle-container:focus-visible {
            outline: var(--_toggle-border-width-focus) solid var(--_toggle-state-layer-on);
            outline-offset: 3px;
            animation: focus-pulse-advanced 2.5s var(--_global-spring-gentle) infinite;
            transform: var(--_toggle-scale-focus);
            box-shadow: var(--_toggle-track-elevation-focus);
          }
          
          .toggle-container:focus-visible::before {
            opacity: var(--_toggle-state-layer-focus);
            transform: scale(1.3);
            animation: focus-ring-pulse 2.5s var(--_global-spring-gentle) infinite;
          }
          
          .toggle-container:focus-visible::after {
            opacity: calc(var(--_toggle-state-layer-focus) * 0.7);
            transform: scale(1.1);
            border-color: var(--_toggle-color-checked);
            animation: focus-ring-pulse 2.5s var(--_global-spring-gentle) infinite;
          }
        }
        
        /* Enhanced color scheme adaptation with sophisticated dark mode support */
        @media (prefers-color-scheme: dark) {
          .toggle-track {
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), var(--_toggle-track-elevation-rest);
            background-image: linear-gradient(135deg, var(--_toggle-track-color-off) 0%, rgba(255, 255, 255, 0.05) 100%);
          }
          
          .toggle-track.checked {
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4), var(--_toggle-track-elevation-hover);
            background-image: linear-gradient(135deg, var(--_toggle-track-color-on) 0%, rgba(255, 255, 255, 0.1) 100%);
          }
          
          .toggle-thumb {
            border-color: rgba(255, 255, 255, 0.15);
            background-image: linear-gradient(135deg, var(--_toggle-thumb-color-off) 0%, rgba(255, 255, 255, 0.08) 100%);
            box-shadow: var(--_toggle-thumb-elevation-rest), 0 1px 3px rgba(0, 0, 0, 0.25);
          }
          
          .toggle-track.checked .toggle-thumb {
            background-image: linear-gradient(135deg, var(--_toggle-thumb-color-on) 0%, rgba(255, 255, 255, 0.12) 100%);
            box-shadow: var(--_toggle-thumb-elevation-hover), 0 2px 6px rgba(0, 0, 0, 0.3);
          }
          
          /* Enhanced hover states for dark mode */
          .toggle-container:hover:not([aria-disabled="true"]) .toggle-track:not(.checked) {
            background-image: linear-gradient(135deg, var(--_toggle-track-color-off-hover) 0%, rgba(255, 255, 255, 0.08) 100%);
          }
          
          .toggle-container:hover:not([aria-disabled="true"]) .toggle-track.checked {
            background-image: linear-gradient(135deg, var(--_toggle-track-color-on-hover) 0%, rgba(255, 255, 255, 0.15) 100%);
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