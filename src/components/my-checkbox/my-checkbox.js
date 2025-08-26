/**
 * MyntUI my-checkbox Component - TailwindCSS Enhanced Version
 * A Material Design 3 checkbox input using TailwindCSS for consistent styling
 * Enhanced with proper state management and accessibility support
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';
import { globalConfig } from '../../config/global-config.js';

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

  // Enhanced getters and setters
  get checked() {
    return this.hasAttribute('checked');
  }

  set checked(value) {
    if (Boolean(value)) {
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
    if (Boolean(value)) {
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
    this.setAttribute('label', value || '');
  }

  get name() {
    return this.getAttribute('name') || '';
  }

  set name(value) {
    this.setAttribute('name', value || '');
  }

  get value() {
    return this.getAttribute('value') || '';
  }

  set value(value) {
    this.setAttribute('value', value || '');
  }

  // Generate TailwindCSS classes using global config
  getTailwindClasses() {
    const size = this.size || 'md';
    const disabled = this.disabled;
    const checked = this.checked;
    const indeterminate = this.indeterminate;
    const error = this.error;
    const config = globalConfig.get('theme.tailwind', {});
    const sizeConfig = config.sizes?.[size] || config.sizes?.md || {};
    const stateConfig = config.states || {};
    
    // Container classes
    let containerClasses = [
      'inline-flex',
      'items-start',
      sizeConfig.spacing || 'gap-sm',
      'cursor-pointer',
      'group',
      'relative',
      'transition-all',
      'duration-200',
      'ease-standard'
    ];

    // Checkbox input base classes with Material Design 3 styling
    let checkboxClasses = [
      'relative',
      'flex-shrink-0',
      'border-2',
      'rounded',
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
      xs: ['w-4', 'h-4', 'text-xs'],
      sm: ['w-5', 'h-5', 'text-sm'], 
      md: ['w-6', 'h-6', 'text-base'],
      lg: ['w-7', 'h-7', 'text-lg'],
      xl: ['w-8', 'h-8', 'text-xl']
    };
    checkboxClasses.push(...(sizeClasses[size] || sizeClasses.md));

    // Get checkbox variant classes from global config
    let variantKey = 'unchecked';
    if (checked) {
      variantKey = 'checked';
    } else if (indeterminate) {
      variantKey = 'indeterminate';
    }

    const variantConfig = config.variants?.checkbox?.[variantKey] || '';
    if (variantConfig) {
      checkboxClasses.push(...variantConfig.split(' ').filter(Boolean));
    } else {
      // Material Design 3 styling with proper state layers
      if (checked || indeterminate) {
        checkboxClasses.push(
          'bg-primary',
          'border-primary',
          'text-primary-on-primary',
          'shadow-sm'
        );
      } else {
        checkboxClasses.push(
          'bg-surface',
          'border-outline',
          'text-transparent',
          'hover:border-primary',
          'hover:bg-primary/8'
        );
      }
    }

    // Apply state classes from global config
    if (disabled) {
      const disabledClasses = stateConfig.disabled || 'opacity-50 cursor-not-allowed pointer-events-none grayscale';
      containerClasses.push(...disabledClasses.split(' '));
      checkboxClasses.push('border-outline-variant', 'bg-surface-variant/20');
    } else {
      // Interactive states with Material Design ripple
      checkboxClasses.push(
        'hover:shadow-md',
        'active:scale-95',
        'group-hover:bg-opacity-90',
        config.animations?.ripple || 'relative'
      );
    }

    // Error state
    if (error) {
      const errorState = stateConfig.error || 'border-error text-error focus:border-error focus:ring-error/20';
      checkboxClasses.push(...errorState.split(' '));
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
    }

    return {
      container: containerClasses.join(' '),
      checkbox: checkboxClasses.join(' '),
      label: labelClasses.join(' ')
    };
  }

  // Create ripple effect for Material Design authenticity
  createRipple(event) {
    const checkbox = this.shadowRoot.querySelector('.checkbox-input');
    if (!checkbox || this.disabled) return;

    const rect = checkbox.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.5;
    const x = (event?.clientX || rect.left + rect.width / 2) - rect.left - size / 2;
    const y = (event?.clientY || rect.top + rect.height / 2) - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // Remove any existing ripples
    const existingRipples = checkbox.querySelectorAll('.ripple');
    existingRipples.forEach(r => r.remove());

    checkbox.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Toggle checkbox state
  toggle() {
    if (this.disabled) return;

    if (this.indeterminate) {
      this.indeterminate = false;
      this.checked = true;
    } else {
      this.checked = !this.checked;
    }

    // Emit change event using base component method
    this.emit('change', {
      checked: this.checked,
      indeterminate: this.indeterminate,
      value: this.checked ? this.value : null,
      name: this.name
    });
  }

  // Handle click events
  handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    this.createRipple(event);
    this.toggle();
  }

  // Handle keyboard events
  handleKeyDown(event) {
    if (this.disabled) return;

    if (event.key === ' ') {
      event.preventDefault();
      this.createRipple(event);
      this.toggle();
    }
  }

  // Render the component
  render() {
    const { checked, indeterminate, label, name, value, disabled, error } = this;
    const classes = this.getTailwindClasses();
    const checkboxId = name ? `${name}-checkbox` : 'checkbox';
    
    this.shadowRoot.innerHTML = `
      <style>
        @import '/src/styles/tailwind.css';
        
        :host {
          display: inline-block;
        }
        
        /* Material Design 3 checkbox mark with enhanced animation */
        .checkbox-mark {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(0) rotate(-90deg);
          transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .checkbox-mark.visible {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
        
        /* Enhanced check mark SVG with path animation */
        .check-icon {
          width: 70%;
          height: 70%;
          stroke: currentColor;
          stroke-width: 2.5;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 16;
          stroke-dashoffset: 16;
          transition: stroke-dashoffset 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .checkbox-mark.visible .check-icon {
          stroke-dashoffset: 0;
        }
        
        /* Indeterminate mark with smooth animation */
        .indeterminate-mark {
          width: 60%;
          height: 2px;
          background: currentColor;
          border-radius: 1px;
          transform: scaleX(0);
          transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .checkbox-mark.visible .indeterminate-mark {
          transform: scaleX(1);
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
          .checkbox-mark,
          .check-icon,
          .indeterminate-mark,
          .ripple {
            animation: none !important;
            transition: none !important;
          }
          
          .checkbox-mark.visible {
            transform: scale(1) rotate(0deg);
          }
          
          .checkbox-mark.visible .check-icon {
            stroke-dashoffset: 0;
          }
          
          .checkbox-mark.visible .indeterminate-mark {
            transform: scaleX(1);
          }
        }
        
        @media (prefers-contrast: high) {
          .checkbox-input {
            outline: 3px solid currentColor;
            outline-offset: 2px;
          }
        }
      </style>
      
      <label class="${classes.container}">
        <div class="${classes.checkbox} checkbox-input checkbox-container" 
             role="checkbox" 
             aria-checked="${indeterminate ? 'mixed' : checked.toString()}"
             aria-label="${label || 'Checkbox'}"
             ${disabled ? 'aria-disabled="true"' : ''}
             ${error ? 'aria-invalid="true"' : ''}
             tabindex="${disabled ? '-1' : '0'}"
             id="${checkboxId}">
          <div class="checkbox-mark ${(checked || indeterminate) ? 'visible' : ''}">
            ${indeterminate ? 
              '<div class="indeterminate-mark"></div>' : 
              '<svg class="check-icon" viewBox="0 0 24 24"><polyline points="20,6 9,17 4,12"></polyline></svg>'
            }
          </div>
        </div>
        
        ${label ? `
          <span class="${classes.label} label">
            ${label}
          </span>
        ` : ''}
        
        <slot></slot>
        
        <input type="checkbox" 
               ${name ? `name="${name}"` : ''}
               ${value ? `value="${value}"` : ''}
               ${checked ? 'checked' : ''}
               ${indeterminate ? 'indeterminate' : ''}
               ${disabled ? 'disabled' : ''}
               style="position: absolute; opacity: 0; pointer-events: none;"
               tabindex="-1"
               aria-hidden="true">
      </label>
    `;

    // Use base component's standardized event listener management
    this.removeEventListeners();
    
    const checkboxElement = this.shadowRoot.querySelector('.checkbox-input');
    const labelElement = this.shadowRoot.querySelector('label');
    
    if (checkboxElement) {
      this.addEventListeners([
        {
          element: checkboxElement,
          events: ['click'],
          handler: this.handleClick
        },
        {
          element: checkboxElement,
          events: ['keydown'],
          handler: this.handleKeyDown
        }
      ]);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // Add small delay to ensure everything is properly set up
    setTimeout(() => this.render(), 0);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    
    // Clean up event listeners
    const checkboxElement = this.shadowRoot?.querySelector('.checkbox-input');
    const labelElement = this.shadowRoot?.querySelector('label');
    
    if (checkboxElement) {
      checkboxElement.removeEventListener('click', this.handleClick);
      checkboxElement.removeEventListener('keydown', this.handleKeyDown);
    }
    
    if (labelElement) {
      labelElement.removeEventListener('click', this.handleClick);
    }
  }
}

// Register the custom element
if (!customElements.get('my-checkbox')) {
  customElements.define('my-checkbox', MyCheckbox);
}

export { MyCheckbox };