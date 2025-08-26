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
    const sizeConfig = config.sizes?.[size] || config.sizes?.md || {};
    const stateConfig = config.states || {};
    
    // Container classes using enhanced config
    let containerClasses = [
      'inline-flex',
      'items-center',
      sizeConfig.spacing || 'gap-sm',
      'cursor-pointer',
      'select-none',
      'group',
      'relative',
      'transition-all',
      'duration-200',
      'ease-standard'
    ];

    // Toggle track classes using enhanced global config
    let trackClasses = [
      'relative',
      'flex-shrink-0',
      'rounded-full',
      'border-2',
      'transition-all',
      'duration-200',
      'ease-standard',
      'focus:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-primary/60',
      'focus-visible:ring-offset-2'
    ];

    // Size classes for toggle using Material Design 3 proportions
    const toggleSizes = {
      xs: { track: 'w-7 h-4', thumb: 'w-2.5 h-2.5', translate: 'translate-x-3' },
      sm: { track: 'w-9 h-5', thumb: 'w-3.5 h-3.5', translate: 'translate-x-4' },
      md: { track: 'w-11 h-6', thumb: 'w-4 h-4', translate: 'translate-x-5' },
      lg: { track: 'w-13 h-7', thumb: 'w-5 h-5', translate: 'translate-x-6' },
      xl: { track: 'w-16 h-8', thumb: 'w-6 h-6', translate: 'translate-x-8' }
    };
    
    const currentSize = toggleSizes[size] || toggleSizes.md;
    trackClasses.push(currentSize.track);

    // Toggle thumb classes using enhanced global config
    let thumbClasses = [
      'absolute',
      'top-0.5',
      'left-0.5',
      'bg-surface',
      'rounded-full',
      'shadow-md',
      'transition-all',
      'duration-200',
      'ease-standard',
      'transform',
      currentSize.thumb
    ];

    // Get toggle variant classes from enhanced global config
    const trackVariant = checked ? 'checked' : 'unchecked';
    const thumbVariant = checked ? 'checked' : 'unchecked';
    
    const trackConfig = config.variants?.toggle?.track?.[trackVariant];
    const thumbConfig = config.variants?.toggle?.thumb?.[thumbVariant];
    
    if (trackConfig) {
      trackClasses.push(trackConfig);
    } else {
      // Material Design 3 styling
      if (checked) {
        trackClasses.push('bg-primary', 'border-primary');
        thumbClasses.push(currentSize.translate, 'bg-primary-on-primary');
      } else {
        trackClasses.push('bg-surface-variant', 'border-outline');
        thumbClasses.push('translate-x-0', 'bg-outline');
      }
    }
    
    if (thumbConfig) {
      thumbClasses.push(thumbConfig);
    }

    // Apply enhanced state classes from global config
    if (disabled) {
      const disabledClasses = stateConfig.disabled || 'opacity-50 cursor-not-allowed pointer-events-none grayscale';
      containerClasses.push(...disabledClasses.split(' '));
    } else {
      // Interactive states with ripple effect
      trackClasses.push(
        'hover:shadow-lg',
        'active:scale-95',
        'group-hover:bg-opacity-90',
        config.animations?.ripple || 'relative overflow-hidden'
      );
    }

    // Error state using enhanced config
    if (error) {
      const errorState = stateConfig.error || 'border-error focus:border-error focus:ring-error/20';
      trackClasses.push(...errorState.split(' '));
    }

    // Label classes with Material Design 3 typography
    let labelClasses = [
      'text-surface-on-surface',
      'text-body-medium',
      'font-normal',
      'leading-normal',
      'select-none',
      'transition-colors',
      'duration-200'
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

  // Create ripple effect for Material Design authenticity
  createRipple(event) {
    const button = this.shadowRoot.querySelector('.toggle-track');
    if (!button || this.disabled) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = (event?.clientX || rect.left + rect.width / 2) - rect.left - size / 2;
    const y = (event?.clientY || rect.top + rect.height / 2) - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // Remove any existing ripples
    const existingRipples = button.querySelectorAll('.ripple');
    existingRipples.forEach(r => r.remove());

    button.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Event handlers
  handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    this.createRipple(event);
    this.toggle();
  }

  handleKeyDown(event) {
    if (this.disabled) return;

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.createRipple(event);
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
          display: inline-block;
          width: fit-content;
        }
        
        /* Ripple effect for Material Design authenticity */
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple-animation 0.6s linear;
          background-color: currentColor;
          opacity: 0.3;
          pointer-events: none;
        }
        
        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        /* Enhanced accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
        
        @media (prefers-contrast: high) {
          .toggle-track {
            border-width: 3px;
          }
        }
      </style>

      <div class="${classes.container}">
        <button 
          class="${classes.track} toggle-track"
          role="switch"
          aria-checked="${this.checked}"
          aria-label="${this.label || 'toggle switch'}"
          ${this.disabled ? 'aria-disabled="true" disabled' : ''}
          ${this.error ? 'aria-invalid="true"' : ''}
          tabindex="${this.disabled ? '-1' : '0'}"
        >
          <span class="${classes.thumb} toggle-thumb" aria-hidden="true"></span>
        </button>
        
        ${this.label ? `<label class="${classes.label}">${this.label}</label>` : ''}
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