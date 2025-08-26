/**
 * MyntUI my-toggle Component - TailwindCSS Enhanced Version
 * A switch-like component for a boolean input, providing a visual on/off state
 * Completely rewritten using TailwindCSS and global config integration
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
    
    const toggleButton = this.shadowRoot.querySelector('.toggle-track');
    if (!toggleButton) return;
    
    // Use base component's standardized event listener management
    this.addEventListeners([
      {
        element: toggleButton,
        events: ['click'],
        handler: this.handleClick
      },
      {
        element: toggleButton,
        events: ['keydown'],
        handler: this.handleKeyDown.bind(this)
      }
    ]);
  }

  // Render the component using TailwindCSS
  render() {
    if (!this.shadowRoot) return;

    const classes = this.getTailwindClasses();

    this.shadowRoot.innerHTML = `
      <style>
        @import '/src/styles/tailwind.css';
        
        :host {
          display: block;
          width: fit-content;
        }
        
        /* Custom thumb positioning */
        .toggle-thumb {
          transition-property: transform;
        }
        
        .toggle-track[aria-checked="true"] .toggle-thumb {
          transform: translateX(100%);
        }
      </style>

      <div class="${classes.container}">
        <button 
          class="${classes.track}"
          role="switch"
          aria-checked="${this.checked}"
          aria-label="${this.label || 'toggle switch'}"
          ${this.disabled ? 'aria-disabled="true" disabled' : ''}
          tabindex="${this.disabled ? '-1' : '0'}"
        >
          <span class="${classes.thumb}" aria-hidden="true"></span>
        </button>
        
        ${this.label ? `<span class="${classes.label}">${this.label}</span>` : ''}
      </div>
    `;

    // Re-attach event listeners after render
    this.attachEventListeners();
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-toggle')) {
  customElements.define('my-toggle', MyToggle);
}

export { MyToggle };