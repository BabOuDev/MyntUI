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

  // Generate TailwindCSS classes based on props and enhanced global config
  getTailwindClasses() {
    const { variant, size, density } = this.getComponentProps();
    const config = globalConfig.get('theme.tailwind', {});
    const componentConfig = config.components?.button || {};
    const sizeConfig = config.sizes?.[size] || config.sizes?.md;
    const stateConfig = config.states || {};
    
    const isLoading = this.loading;
    const isDisabled = this.disabled;
    const isElevated = this.elevated;
    const isFilledTonal = this.filledTonal;
    const isFab = this.fab;
    const isIconOnly = this.iconOnly;
    
    // Base classes from global config
    let baseClasses = [
      componentConfig.base || 'inline-flex items-center justify-center font-medium text-center cursor-pointer select-none transition-all duration-medium1 ease-standard focus-ring disabled:pointer-events-none min-w-button',
      'gap-2',
      'relative',
      'overflow-hidden',
      'will-change-transform'
    ].filter(Boolean);

    // Size classes from enhanced global config
    if (sizeConfig?.button) {
      baseClasses.push(sizeConfig.button);
    } else {
      // Fallback size classes
      const sizeMap = {
        xs: 'h-7 min-w-16 px-2 py-1 text-xs',
        sm: 'h-input-sm min-w-button px-sm py-xs text-label-medium',
        md: 'h-input-md min-w-button px-md py-sm text-body-medium',
        lg: 'h-input-lg min-w-button px-lg py-md text-body-large',
        xl: 'h-14 min-w-button px-6 py-4 text-title-small'
      };
      baseClasses.push(sizeMap[size] || sizeMap.md);
    }

    // Density adjustments from global config
    if (density === 'compact') {
      baseClasses.push('tracking-tighter', 'leading-tight');
    } else if (density === 'comfortable') {
      baseClasses.push('tracking-wide', 'leading-relaxed');
    }

    // Determine final variant
    let finalVariant = variant;
    if (isElevated) {
      finalVariant = 'elevated';
    } else if (isFilledTonal) {
      finalVariant = 'filled-tonal';
    }

    // Get variant classes from enhanced global config
    const variantConfig = config.variants?.button?.[finalVariant];
    if (variantConfig) {
      baseClasses.push(variantConfig);
    } else {
      // Fallback to default button styling with enhanced classes
      switch (finalVariant) {
        case 'filled':
        case 'primary':
        default:
          baseClasses.push('bg-primary text-primary-on-primary border-0 shadow-elevation1 hover:shadow-elevation2 state-layer-primary');
          break;
        case 'outlined':
          baseClasses.push('bg-transparent border border-outline text-primary hover:bg-primary/8 focus:bg-primary/12 state-layer-primary');
          break;
        case 'text':
          baseClasses.push('bg-transparent border-0 text-primary hover:bg-primary/8 focus:bg-primary/12 state-layer-primary');
          break;
        case 'filled-tonal':
          baseClasses.push('bg-secondary-container text-secondary-on-container border-0 hover:shadow-elevation1 state-layer-secondary');
          break;
        case 'elevated':
          baseClasses.push('bg-surface shadow-elevation1 text-primary border-0 hover:shadow-elevation2 focus:shadow-elevation1 state-layer-surface');
          break;
      }
    }

    // FAB specific classes using global config
    if (isFab) {
      baseClasses = baseClasses.filter(c => !c.match(/px-|py-|min-w-/));
      const fabSizes = {
        xs: 'w-8 h-8 p-1',
        sm: 'w-10 h-10 p-2',
        md: 'w-14 h-14 p-3',
        lg: 'w-16 h-16 p-4',
        xl: 'w-20 h-20 p-5'
      };
      baseClasses.push(
        'rounded-lg',
        'shadow-elevation2',
        'hover:shadow-elevation3',
        'focus:shadow-elevation2',
        fabSizes[size] || fabSizes.md
      );
    } else if (isIconOnly) {
      baseClasses = baseClasses.filter(c => !c.match(/px-|py-|min-w-/));
      const iconSizes = {
        xs: 'w-6 h-6 p-1',
        sm: 'w-8 h-8 p-1.5',
        md: 'w-10 h-10 p-2',
        lg: 'w-12 h-12 p-2.5',
        xl: 'w-14 h-14 p-3'
      };
      baseClasses.push(
        'rounded-full',
        iconSizes[size] || iconSizes.md,
        componentConfig.iconOnly || 'aspect-square'
      );
    } else {
      baseClasses.push('rounded-full');
    }

    // State classes from enhanced global config
    if (isDisabled) {
      const disabledState = stateConfig.disabled || 'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:grayscale';
      baseClasses.push(disabledState);
    }
    
    if (isLoading) {
      const loadingState = stateConfig.loading || 'opacity-75 cursor-wait animate-pulse';
      baseClasses.push(loadingState);
    }
    
    if (!isDisabled && !isLoading) {
      // Interactive states from enhanced global config
      if (stateConfig.base) {
        baseClasses.push(stateConfig.base);
      }
      
      if (stateConfig.hover) {
        baseClasses.push(stateConfig.hover);
      }
      
      if (stateConfig.active) {
        baseClasses.push(stateConfig.active);
      }
      
      if (stateConfig.focus) {
        baseClasses.push(stateConfig.focus);
      }
      
      baseClasses.push('cursor-pointer');
    }

    // Animation classes from global config
    const animationConfig = config.animations || {};
    if (animationConfig.ripple && this.getComponentProps().rippleEffect) {
      baseClasses.push(animationConfig.ripple);
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