/**
 * MyntUI my-button Component - TailwindCSS Enhanced Version
 * A Material Design 3 button component using TailwindCSS for consistent styling
 * Enhanced with state layers, ripple effects, and comprehensive accessibility support
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';
import { globalConfig } from '../../config/global-config.js';

class MyButton extends MyntUIBaseComponent {
  constructor() {
    super();
    
    // Component-specific bindings (base class handles common ones)
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    
    // Initialize with base component pattern
    this.log('Button component initializing...');
  }

  // Extended observed attributes (inherits base ones)
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'label', 'density', 'fab', 'icon-only', 'elevated', 'filled-tonal'
    ];
  }

  // Component-specific attribute handling
  handleAttributeChange(name, oldValue, newValue) {
    super.handleAttributeChange(name, oldValue, newValue);
    
    switch (name) {
      case 'disabled':
      case 'loading':
        this.announceToScreenReader(
          `Button ${name} ${newValue !== null ? 'enabled' : 'disabled'}`,
          'polite'
        );
        break;
      case 'label':
        this.announceToScreenReader(
          `Button label changed to ${newValue}`,
          'polite'
        );
        break;
    }
  }

  // Enhanced getters and setters with validation (inherits common ones from base)
  get label() {
    return this.getAttribute('label') || '';
  }

  set label(value) {
    if (this.validateAttribute('label', value, (v) => typeof v === 'string')) {
      this.setAttribute('label', value);
      this.log('Label changed:', value);
    }
  }

  get density() {
    return this.getAttribute('density') || 'default';
  }

  set density(value) {
    const validDensities = ['default', 'compact', 'comfortable'];
    if (this.validateAttribute('density', value, validDensities)) {
      this.setAttribute('density', value);
    }
  }

  get fab() {
    return this.hasAttribute('fab');
  }

  set fab(value) {
    this.toggleAttribute('fab', Boolean(value));
  }

  get iconOnly() {
    return this.hasAttribute('icon-only');
  }

  set iconOnly(value) {
    this.toggleAttribute('icon-only', Boolean(value));
  }

  get elevated() {
    return this.hasAttribute('elevated');
  }

  set elevated(value) {
    this.toggleAttribute('elevated', Boolean(value));
  }

  get filledTonal() {
    return this.hasAttribute('filled-tonal');
  }

  set filledTonal(value) {
    this.toggleAttribute('filled-tonal', Boolean(value));
  }

  // Generate TailwindCSS classes based on props and config
  getTailwindClasses() {
    const { variant, size, density } = this.getComponentProps();
    const config = globalConfig.get('theme.tailwind', {});
    const isLoading = this.loading;
    const isDisabled = this.disabled;
    const isElevated = this.elevated;
    const isFilledTonal = this.filledTonal;
    const isFab = this.fab;
    const isIconOnly = this.iconOnly;
    
    // Base button classes
    let baseClasses = [
      'inline-flex',
      'items-center',
      'justify-center',
      'gap-2',
      'relative',
      'font-medium',
      'text-center',
      'whitespace-nowrap',
      'select-none',
      'transition-all',
      'duration-medium1',
      'ease-standard',
      'focus-ring',
      'state-layer',
      'overflow-hidden',
      'will-change-transform'
    ];

    // Size classes
    const sizeClasses = {
      xs: ['h-6', 'px-2', 'text-xs', 'min-w-12'],
      sm: ['h-component-sm', 'px-sm', 'text-label-medium', 'min-w-button'],
      md: ['h-component-md', 'px-md', 'text-body-medium', 'min-w-button'],
      lg: ['h-component-lg', 'px-lg', 'text-body-large', 'min-w-button'],
      xl: ['h-14', 'px-xl', 'text-lg', 'min-w-button']
    };

    baseClasses.push(...(sizeClasses[size] || sizeClasses.md));

    // Density adjustments
    if (density === 'compact') {
      baseClasses.push('tracking-tighter');
    }

    // Variant-specific classes
    let variantClasses = [];
    
    if (isElevated) {
      variantClasses = [
        'bg-surface-container-low',
        'text-primary',
        'shadow-elevation2',
        'hover:shadow-elevation3',
        'border',
        'border-outline-variant',
        'backdrop-blur-sm'
      ];
    } else if (isFilledTonal) {
      variantClasses = [
        'bg-secondary-container',
        'text-secondary-on-container',
        'hover:shadow-elevation1'
      ];
    } else {
      switch (variant) {
        case 'filled':
        case 'primary':
        default:
          variantClasses = [
            'bg-primary',
            'text-primary-on-primary',
            'shadow-elevation1',
            'hover:shadow-elevation2'
          ];
          break;
        case 'outlined':
          variantClasses = [
            'bg-transparent',
            'text-primary',
            'border',
            'border-outline',
            'hover:bg-primary',
            'hover:bg-opacity-state-hover',
            'hover:border-primary'
          ];
          break;
        case 'text':
          variantClasses = [
            'bg-transparent',
            'text-primary',
            'hover:bg-primary',
            'hover:bg-opacity-state-hover',
            'px-md',
            'min-w-auto'
          ];
          break;
        case 'secondary':
          variantClasses = [
            'bg-secondary',
            'text-secondary-on-secondary',
            'shadow-elevation1',
            'hover:shadow-elevation2'
          ];
          break;
        case 'success':
          variantClasses = [
            'bg-success',
            'text-success-on-success',
            'shadow-elevation1',
            'hover:shadow-elevation2'
          ];
          break;
        case 'error':
        case 'danger':
          variantClasses = [
            'bg-error',
            'text-error-on-error',
            'shadow-elevation1',
            'hover:shadow-elevation2'
          ];
          break;
        case 'ghost':
          variantClasses = [
            'bg-transparent',
            'text-primary',
            'border',
            'border-outline-variant',
            'hover:bg-surface-variant'
          ];
          break;
      }
    }

    baseClasses.push(...variantClasses);

    // FAB specific classes
    if (isFab) {
      baseClasses = baseClasses.filter(c => !c.includes('px-') && !c.includes('min-w-'));
      const fabSizeClasses = {
        xs: ['w-8', 'h-8'],
        sm: ['w-10', 'h-10'],
        md: ['w-14', 'h-14'],
        lg: ['w-18', 'h-18'],
        xl: ['w-24', 'h-24']
      };
      baseClasses.push(
        'rounded-lg',
        'p-0',
        'shadow-elevation2',
        'hover:shadow-elevation3',
        ...(fabSizeClasses[size] || fabSizeClasses.md)
      );
    } else if (isIconOnly) {
      baseClasses = baseClasses.filter(c => !c.includes('px-') && !c.includes('min-w-'));
      const iconSizeClasses = {
        xs: ['w-6', 'h-6'],
        sm: ['w-component-sm', 'h-component-sm'],
        md: ['w-component-md', 'h-component-md'],
        lg: ['w-component-lg', 'h-component-lg'],
        xl: ['w-14', 'h-14']
      };
      baseClasses.push(
        'rounded-full',
        'p-0',
        ...(iconSizeClasses[size] || iconSizeClasses.md)
      );
    } else {
      baseClasses.push('rounded-full');
    }

    // State classes
    if (isDisabled || isLoading) {
      baseClasses.push(
        'opacity-50',
        'cursor-not-allowed',
        'pointer-events-none'
      );
    } else {
      baseClasses.push(
        'cursor-pointer',
        'hover:scale-subtle',
        'hover:-translate-y-px',
        'active:scale-95',
        'active:translate-y-0'
      );
    }

    return baseClasses.join(' ');
  }

  // Get component props with defaults from config
  getComponentProps() {
    const buttonConfig = globalConfig.get('components.button', {});
    
    return {
      variant: this.variant || buttonConfig.variant || 'filled',
      size: this.size || buttonConfig.size || 'md',
      density: this.density || 'default',
      rippleEffect: buttonConfig.rippleEffect !== false
    };
  }

  // Handle click events
  handleClick(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Create ripple effect using base component method
    if (this.getComponentProps().rippleEffect) {
      this.createRipple(event);
    }

    // Emit click event using base component method
    this.emit('click', {
      variant: this.variant,
      label: this.label,
      size: this.size,
      density: this.density
    });
  }

  // Handle keyboard events (extends base class)
  handleKeyDown(event) {
    super.handleKeyDown(event); // Handle common key patterns
    
    if (this.disabled || this.loading) {
      event.preventDefault();
      return;
    }

    // Handle Enter and Space keys for button activation
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      
      // Create ripple effect centered
      if (this.getComponentProps().rippleEffect) {
        this.createRipple();
      }
      
      // Trigger click
      this.handleClick(event);
    }
  }

  // Override base focus/blur handling for button-specific behavior
  handleFocus() {
    super.handleFocus(); // Call base class behavior
    if (this.disabled || this.loading) return;
    
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      button.classList.add('focused');
    }
  }

  handleBlur() {
    super.handleBlur(); // Call base class behavior
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      button.classList.remove('focused', 'hovered', 'pressed');
    }
  }

  // Handle mouse enter for hover states
  handleMouseEnter(event) {
    if (this.disabled || this.loading) return;
    
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      button.classList.add('hovered');
    }
  }

  // Handle mouse leave
  handleMouseLeave(event) {
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      button.classList.remove('hovered', 'pressed');
    }
  }

  // Handle mouse down for pressed states
  handleMouseDown(event) {
    if (this.disabled || this.loading) return;
    
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      button.classList.add('pressed');
    }
  }

  // Handle mouse up
  handleMouseUp(event) {
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      button.classList.remove('pressed');
    }
  }

  // Attach event listeners using base component pattern
  attachEventListeners() {
    this.removeEventListeners(); // Clean up existing listeners
    
    const button = this.shadowRoot.querySelector('button');
    if (!button) return;
    
    // Use base component's standardized event listener management
    this.addEventListeners([
      {
        element: button,
        events: ['click'],
        handler: this.handleClick
      },
      {
        element: button,
        events: ['keydown'],
        handler: this.handleKeyDown
      },
      {
        element: button,
        events: ['focus'],
        handler: this.handleFocus
      },
      {
        element: button,
        events: ['blur'],
        handler: this.handleBlur
      },
      {
        element: button,
        events: ['mouseenter'],
        handler: this.handleMouseEnter
      },
      {
        element: button,
        events: ['mouseleave'],
        handler: this.handleMouseLeave
      },
      {
        element: button,
        events: ['mousedown'],
        handler: this.handleMouseDown
      },
      {
        element: button,
        events: ['mouseup'],
        handler: this.handleMouseUp
      }
    ]);
  }

  // Render the component using TailwindCSS
  render() {
    const isLoading = this.loading;
    const isDisabled = this.disabled;
    const { size } = this.getComponentProps();
    
    const buttonClasses = this.getTailwindClasses();
    
    this.shadowRoot.innerHTML = `
      <style>
        @import '/src/styles/tailwind.css';
        
        :host {
          display: inline-flex;
          position: relative;
          isolation: isolate;
        }
        
        /* Enhanced loading spinner */
        .loading-spinner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
        }
        
        .loading-spinner::before {
          content: '';
          display: block;
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        .loading-spinner.size-xs::before {
          width: 0.75rem;
          height: 0.75rem;
          border-width: 1px;
        }
        
        .loading-spinner.size-sm::before {
          width: 1rem;
          height: 1rem;
          border-width: 1.5px;
        }
        
        .loading-spinner.size-lg::before {
          width: 1.5rem;
          height: 1.5rem;
          border-width: 2.5px;
        }
        
        .loading-spinner.size-xl::before {
          width: 1.75rem;
          height: 1.75rem;
          border-width: 3px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Hide content when loading */
        button.loading .content {
          opacity: 0;
        }
        
        /* Ripple effect */
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, currentColor 0%, transparent 70%);
          opacity: 0.3;
          pointer-events: none;
          animation: ripple 600ms ease-out;
        }
        
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 0.3;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        /* Material Icons support */
        .material-icons {
          font-family: 'Material Icons';
          font-weight: normal;
          font-style: normal;
          font-size: 1.5rem;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
        }
        
        /* Size adjustments for icons */
        .size-xs .material-icons { font-size: 1rem; }
        .size-sm .material-icons { font-size: 1.25rem; }
        .size-md .material-icons { font-size: 1.5rem; }
        .size-lg .material-icons { font-size: 1.75rem; }
        .size-xl .material-icons { font-size: 2rem; }
        
        /* Accessibility enhancements */
        @media (prefers-reduced-motion: reduce) {
          button, .loading-spinner::before, .ripple {
            animation: none !important;
            transition-duration: 0.01s !important;
          }
          
          button:not(.loading):hover {
            transform: none !important;
          }
        }
        
        @media (prefers-contrast: high) {
          button {
            border: 2px solid currentColor !important;
          }
          
          .ripple {
            display: none;
          }
        }
        
        /* Focus indicators */
        button:focus-visible {
          outline: 2px solid theme(colors.primary.DEFAULT);
          outline-offset: 2px;
        }
      </style>
      
      <button 
        class="${buttonClasses} ${isLoading ? 'loading' : ''}"
        ${isDisabled || isLoading ? 'disabled' : ''}
        aria-label="${this.label || 'button'}"
        ${isLoading ? 'aria-busy="true"' : ''}
        ${isDisabled ? 'aria-disabled="true"' : ''}
        role="button"
        tabindex="${isDisabled ? '-1' : '0'}"
        type="button"
      >
        ${isLoading ? `<div class="loading-spinner size-${size}" aria-hidden="true"></div>` : ''}
        <span class="content flex items-center gap-2">
          <slot>${this.label}</slot>
        </span>
      </button>
    `;

    // Attach event listeners after rendering
    this.attachEventListeners();
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-button')) {
  customElements.define('my-button', MyButton);
}

export { MyButton };