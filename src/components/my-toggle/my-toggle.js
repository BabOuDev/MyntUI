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

  // Generate TailwindCSS classes using enhanced global config
  getTailwindClasses() {
    const size = this.size || 'md';
    const disabled = this.disabled;
    const checked = this.checked;
    const error = this.error;
    const config = globalConfig.get('theme.tailwind', {});
    const sizeConfig = config.sizes?.[size] || config.sizes?.md;
    const stateConfig = config.states || {};
    
    // Container classes using enhanced config
    let containerClasses = [
      'inline-flex',
      'items-center',
      sizeConfig?.spacing || 'gap-sm',
      'cursor-pointer',
      'select-none',
      'group'
    ].filter(Boolean);

    // Toggle track classes using enhanced global config
    let trackClasses = [
      'relative',
      'flex-shrink-0',
      'rounded-full',
      'border-2',
      'p-1',
      stateConfig.base || 'transition-all duration-medium1',
      stateConfig.focus || 'focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2'
    ].filter(Boolean);

    // Size classes for toggle using enhanced config
    if (sizeConfig?.spacing) {
      // Use size config if available
      const toggleSizes = {
        xs: 'w-8 h-5',
        sm: 'w-10 h-6',
        md: 'w-12 h-7',
        lg: 'w-14 h-8',
        xl: 'w-16 h-10'
      };
      trackClasses.push(toggleSizes[size] || toggleSizes.md);
    } else {
      // Fallback size classes
      const sizeClasses = {
        sm: 'w-10 h-6',
        md: 'w-12 h-7', 
        lg: 'w-14 h-8'
      };
      trackClasses.push(sizeClasses[size] || sizeClasses.md);
    }

    // Toggle thumb classes using enhanced global config
    let thumbClasses = [
      'block',
      'bg-surface',
      'rounded-full',
      'shadow-elevation1',
      'border',
      stateConfig.base || 'transition-transform duration-medium1'
    ].filter(Boolean);

    // Thumb size classes using enhanced config
    const thumbSizes = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8'
    };
    thumbClasses.push(thumbSizes[size] || thumbSizes.md);

    // Get toggle variant classes from enhanced global config
    const trackVariant = checked ? 'checked' : 'unchecked';
    const thumbVariant = checked ? 'checked' : 'unchecked';
    
    const trackConfig = config.variants?.toggle?.track?.[trackVariant];
    const thumbConfig = config.variants?.toggle?.thumb?.[thumbVariant];
    
    if (trackConfig) {
      trackClasses.push(trackConfig);
    } else {
      // Enhanced fallback styling using design tokens
      if (checked) {
        trackClasses.push('bg-primary/24', 'border-primary');
        thumbClasses.push('translate-x-5', 'border-primary', 'bg-primary');
      } else {
        trackClasses.push('bg-surface-variant', 'border-outline');
        thumbClasses.push('translate-x-0', 'border-outline', 'bg-outline');
      }
    }
    
    if (thumbConfig) {
      thumbClasses.push(thumbConfig);
    }

    // Apply enhanced state classes from global config
    if (disabled) {
      const disabledState = stateConfig.disabled || 'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:grayscale';
      containerClasses.push(disabledState);
    } else {
      // Interactive states from enhanced config
      if (stateConfig.hover) {
        trackClasses.push(stateConfig.hover);
      }
      
      if (stateConfig.active) {
        trackClasses.push(stateConfig.active);
      }
    }

    // Error state using enhanced config
    if (error) {
      const errorState = stateConfig.error || 'border-error focus:border-error focus:ring-error/20';
      trackClasses.push(errorState);
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