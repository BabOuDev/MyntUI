/**
 * MyntUI my-radio Component  
 * Individual radio button component that works with my-radio-group
 * Enhanced version using MyntUIBaseComponent for improved consistency and maintainability
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';
import { globalConfig } from '../../config/global-config.js';

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

    this.createRipple(event);
    this.select();
  }

  handleKeyDown(event) {
    // Call parent handler first for common patterns
    super.handleKeyDown(event);
    
    if (this.disabled || this.loading) return;

    if (event.key === ' ') {
      event.preventDefault();
      this.createRipple(event);
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
    // Event listeners are now handled in the render method
    // This method is kept for compatibility
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

  // Generate TailwindCSS classes using global config
  getTailwindClasses() {
    const size = this.size || 'md';
    const disabled = this.disabled;
    const checked = this.checked;
    const error = this.error;
    const config = globalConfig.get('theme.tailwind', {});
    const sizeConfig = config.sizes?.[size] || config.sizes?.md || {};
    const stateConfig = config.states || {};
    
    // Container classes
    let containerClasses = [
      'inline-flex',
      'items-center',
      sizeConfig.spacing || 'gap-sm',
      'cursor-pointer',
      'group',
      'relative',
      'transition-all',
      'duration-200',
      'ease-standard',
      'select-none',
      'min-h-10'
    ];

    // Radio input base classes with Material Design 3 styling
    let radioClasses = [
      'relative',
      'flex-shrink-0',
      'border-2',
      'rounded-full',
      'transition-all',
      'duration-200',
      'ease-standard',
      'focus:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-primary/60',
      'focus-visible:ring-offset-2',
      'overflow-hidden'
    ];

    // Size classes with Material Design 3 proportions
    const sizeClasses = {
      xs: ['w-4', 'h-4'],
      sm: ['w-5', 'h-5'], 
      md: ['w-6', 'h-6'],
      lg: ['w-7', 'h-7'],
      xl: ['w-8', 'h-8']
    };
    radioClasses.push(...(sizeClasses[size] || sizeClasses.md));

    // Get radio variant classes from global config
    const variantKey = checked ? 'checked' : 'unchecked';
    const variantConfig = config.variants?.radio?.[variantKey] || '';
    
    if (variantConfig) {
      radioClasses.push(...variantConfig.split(' ').filter(Boolean));
    } else {
      // Material Design 3 styling with proper state layers
      if (checked) {
        radioClasses.push(
          'bg-primary',
          'border-primary',
          'shadow-sm'
        );
      } else {
        radioClasses.push(
          'bg-surface',
          'border-outline',
          'hover:border-primary',
          'hover:bg-primary/8'
        );
      }
    }

    // Apply state classes from global config
    if (disabled) {
      const disabledClasses = stateConfig.disabled || 'opacity-50 cursor-not-allowed pointer-events-none grayscale';
      containerClasses.push(...disabledClasses.split(' '));
      radioClasses.push('border-outline-variant', 'bg-surface-variant/20');
    } else {
      // Interactive states with Material Design ripple
      radioClasses.push(
        'hover:shadow-md',
        'active:scale-95',
        'group-hover:bg-opacity-90',
        config.animations?.ripple || 'relative'
      );
    }

    // Error state
    if (error) {
      const errorState = stateConfig.error || 'border-error text-error focus:border-error focus:ring-error/20';
      radioClasses.push(...errorState.split(' '));
    }

    // Label classes with Material Design 3 typography
    let labelClasses = [
      'text-surface-on-surface',
      'text-body-medium',
      'font-normal',
      'leading-normal',
      'select-none',
      'transition-colors',
      'duration-200',
      'flex-1'
    ];

    if (disabled) {
      labelClasses.push('text-outline');
    } else if (error) {
      labelClasses.push('text-error');
    } else if (checked) {
      labelClasses.push('font-medium');
    }

    // Inner dot classes
    let dotClasses = [
      'absolute',
      'top-1/2',
      'left-1/2',
      'transform',
      '-translate-x-1/2',
      '-translate-y-1/2',
      'rounded-full',
      'transition-all',
      'duration-200',
      'ease-standard'
    ];

    if (checked) {
      const dotSizes = {
        xs: 'w-1.5 h-1.5',
        sm: 'w-2 h-2',
        md: 'w-2.5 h-2.5',
        lg: 'w-3 h-3',
        xl: 'w-3.5 h-3.5'
      };
      dotClasses.push(
        dotSizes[size] || dotSizes.md,
        'bg-primary-on-primary',
        'scale-100',
        'opacity-100'
      );
    } else {
      dotClasses.push(
        'w-0',
        'h-0',
        'scale-0',
        'opacity-0'
      );
    }

    return {
      container: containerClasses.join(' '),
      radio: radioClasses.join(' '),
      dot: dotClasses.join(' '),
      label: labelClasses.join(' ')
    };
  }

  // Create ripple effect for Material Design authenticity
  createRipple(event) {
    const radio = this.shadowRoot.querySelector('.radio-input');
    if (!radio || this.disabled) return;

    const rect = radio.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.5;
    const x = (event?.clientX || rect.left + rect.width / 2) - rect.left - size / 2;
    const y = (event?.clientY || rect.top + rect.height / 2) - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // Remove any existing ripples
    const existingRipples = radio.querySelectorAll('.ripple');
    existingRipples.forEach(r => r.remove());

    radio.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Render the component
  render() {
    const classes = this.getTailwindClasses();
    
    this.shadowRoot.innerHTML = `
      <style>
        @import '/src/styles/tailwind.css';
        
        :host {
          display: inline-block;
        }
        
        /* Material Design 3 radio dot with enhanced animation */
        .radio-dot {
          transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Ripple effect for Material Design authenticity */
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple-animation 0.6s linear;
          background-color: currentColor;
          opacity: 0.2;
          pointer-events: none;
          z-index: 1;
        }
        
        @keyframes ripple-animation {
          to {
            transform: scale(1);
            opacity: 0;
          }
        }
        
        /* Enhanced accessibility */
        @media (prefers-reduced-motion: reduce) {
          .radio-dot,
          .ripple {
            animation: none !important;
            transition: none !important;
          }
        }
        
        @media (prefers-contrast: high) {
          .radio-input {
            outline: 3px solid currentColor;
            outline-offset: 2px;
          }
        }
      </style>
      
      <div class="${classes.container}">
        <div class="${classes.radio} radio-input" 
             role="radio" 
             aria-checked="${this.checked}"
             aria-label="${this.label || 'radio button'}"
             ${this.disabled ? 'aria-disabled="true"' : ''}
             ${this.error ? 'aria-invalid="true"' : ''}
             tabindex="${this.getAttribute('tabindex') || '0'}">
          <div class="${classes.dot} radio-dot"></div>
        </div>
        
        ${this.label ? `<label class="${classes.label}">${this.label}</label>` : ''}
      </div>
    `;
    
    // Use base component's standardized event listener management
    this.removeEventListeners();
    
    const radioContainer = this.shadowRoot.querySelector('.radio-input');
    if (radioContainer) {
      this.addEventListeners([
        {
          element: radioContainer,
          events: ['click'],
          handler: this.handleClick
        },
        {
          element: radioContainer,
          events: ['keydown'],
          handler: this.handleKeyDown
        }
      ]);
    }
  }
}

// Register the custom element using BaseComponent's registration helper
MyRadio.define('my-radio');