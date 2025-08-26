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
      'label', 'density', 'fab', 'icon-only', 'elevated', 'filled-tonal', 'loading-text', 'icon-position', 'ripple'
    ];
  }

  // Component-specific attribute handling with enhanced accessibility
  handleAttributeChange(name, oldValue, newValue) {
    super.handleAttributeChange(name, oldValue, newValue);
    
    switch (name) {
      case 'disabled':
        this.announceToScreenReader(
          newValue !== null ? 'Button is now disabled' : 'Button is now enabled',
          'polite'
        );
        // Update tabindex and aria-disabled
        const button = this.shadowRoot?.querySelector('button');
        if (button) {
          button.tabIndex = newValue !== null ? -1 : 0;
          button.setAttribute('aria-disabled', newValue !== null ? 'true' : 'false');
        }
        break;
      case 'loading':
        this.announceToScreenReader(
          newValue !== null ? `Button is loading: ${this.loadingText}` : 'Button finished loading',
          'assertive'
        );
        // Update aria-busy
        const loadingButton = this.shadowRoot?.querySelector('button');
        if (loadingButton) {
          if (newValue !== null) {
            loadingButton.setAttribute('aria-busy', 'true');
            loadingButton.setAttribute('aria-describedby', 'loading-text');
          } else {
            loadingButton.removeAttribute('aria-busy');
            loadingButton.removeAttribute('aria-describedby');
          }
        }
        break;
      case 'label':
        this.announceToScreenReader(
          `Button label changed to ${newValue}`,
          'polite'
        );
        // Update aria-label
        const labelButton = this.shadowRoot?.querySelector('button');
        if (labelButton) {
          labelButton.setAttribute('aria-label', newValue || 'button');
        }
        break;
      case 'variant':
        // Announce variant changes for screen readers
        this.announceToScreenReader(
          `Button style changed to ${newValue}`,
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

  get loadingText() {
    return this.getAttribute('loading-text') || 'Loading...';
  }

  set loadingText(value) {
    this.setAttribute('loading-text', value || '');
  }

  get iconPosition() {
    return this.getAttribute('icon-position') || 'left';
  }

  set iconPosition(value) {
    const validPositions = ['left', 'right', 'only'];
    if (this.validateAttribute('icon-position', value, validPositions)) {
      this.setAttribute('icon-position', value);
    }
  }

  get ripple() {
    return this.hasAttribute('ripple') ? this.getAttribute('ripple') !== 'false' : true;
  }

  set ripple(value) {
    this.toggleAttribute('ripple', Boolean(value));
  }

  // Generate TailwindCSS classes based on props and enhanced global config
  getTailwindClasses() {
    const { variant, size, density, rippleEffect } = this.getComponentProps();
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
    
    // Base classes with pure TailwindCSS - Material Design 3 compliant
    let baseClasses = [
      // Core button structure
      'inline-flex',
      'items-center',
      'justify-center',
      'font-medium',
      'text-center',
      'select-none',
      'relative',
      'overflow-hidden',
      'border',
      'transition-all',
      'duration-200',
      'ease-in-out',
      'focus:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-primary/30',
      'focus-visible:ring-offset-2',
      'disabled:pointer-events-none'
    ];

    // Size classes using TailwindCSS with Material Design 3 sizing
    const sizeMap = {
      xs: ['h-7', 'min-w-16', 'px-2', 'py-1', 'text-xs', 'gap-1'],
      sm: ['h-8', 'min-w-20', 'px-3', 'py-1.5', 'text-sm', 'gap-1.5'],
      md: ['h-10', 'min-w-24', 'px-4', 'py-2', 'text-base', 'gap-2'],
      lg: ['h-12', 'min-w-28', 'px-6', 'py-3', 'text-lg', 'gap-2.5'],
      xl: ['h-14', 'min-w-32', 'px-8', 'py-4', 'text-xl', 'gap-3']
    };

    if (sizeConfig?.button) {
      baseClasses.push(sizeConfig.button);
    } else {
      baseClasses.push(...(sizeMap[size] || sizeMap.md));
    }

    // Density adjustments
    if (density === 'compact') {
      baseClasses.push('tracking-tight', 'leading-tight');
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

    // Get variant classes from enhanced global config first
    const variantConfig = config.variants?.button?.[finalVariant];
    if (variantConfig) {
      baseClasses.push(variantConfig);
    } else {
      // Material Design 3 variant styling with TailwindCSS
      switch (finalVariant) {
        case 'filled':
        case 'primary':
        default:
          baseClasses.push(
            'bg-primary',
            'text-primary-on-primary',
            'border-primary',
            'shadow-elevation1',
            'hover:shadow-elevation2',
            'active:scale-95',
            'disabled:opacity-50',
            'disabled:cursor-not-allowed'
          );
          break;
        case 'outlined':
          baseClasses.push(
            'bg-transparent',
            'text-primary',
            'border-outline',
            'hover:bg-primary/8',
            'active:bg-primary/12',
            'active:scale-95',
            'disabled:opacity-50',
            'disabled:cursor-not-allowed'
          );
          break;
        case 'text':
          baseClasses.push(
            'bg-transparent',
            'text-primary',
            'border-transparent',
            'hover:bg-primary/8',
            'active:bg-primary/12',
            'active:scale-95',
            'disabled:opacity-50',
            'disabled:cursor-not-allowed'
          );
          break;
        case 'filled-tonal':
          baseClasses.push(
            'bg-secondary-container',
            'text-secondary-on-container',
            'border-secondary-container',
            'hover:shadow-elevation1',
            'active:scale-95',
            'disabled:opacity-50',
            'disabled:cursor-not-allowed'
          );
          break;
        case 'elevated':
          baseClasses.push(
            'bg-surface',
            'text-primary',
            'border-outline-variant',
            'shadow-elevation1',
            'hover:shadow-elevation2',
            'active:shadow-elevation1',
            'active:scale-95',
            'disabled:opacity-50',
            'disabled:cursor-not-allowed'
          );
          break;
      }
    }

    // FAB specific styling with TailwindCSS
    if (isFab) {
      // Remove regular padding and sizing for FAB
      baseClasses = baseClasses.filter(c => !c.match(/^(px-|py-|min-w-|gap-)/));
      
      const fabSizes = {
        xs: ['w-8', 'h-8', 'p-1.5'],
        sm: ['w-10', 'h-10', 'p-2'],
        md: ['w-14', 'h-14', 'p-3'],
        lg: ['w-16', 'h-16', 'p-4'],
        xl: ['w-20', 'h-20', 'p-5']
      };
      
      baseClasses.push(
        'rounded-2xl',
        'shadow-lg',
        'hover:shadow-xl',
        'active:shadow-md',
        ...(fabSizes[size] || fabSizes.md)
      );
    } else if (isIconOnly) {
      // Remove regular padding and sizing for icon-only buttons
      baseClasses = baseClasses.filter(c => !c.match(/^(px-|py-|min-w-|gap-)/));
      
      const iconSizes = {
        xs: ['w-6', 'h-6', 'p-1'],
        sm: ['w-8', 'h-8', 'p-1.5'],
        md: ['w-10', 'h-10', 'p-2'],
        lg: ['w-12', 'h-12', 'p-2.5'],
        xl: ['w-14', 'h-14', 'p-3']
      };
      
      baseClasses.push(
        'rounded-full',
        'aspect-square',
        ...(iconSizes[size] || iconSizes.md)
      );
    } else {
      baseClasses.push('rounded-full');
    }

    // State-specific modifications
    if (!isDisabled && !isLoading) {
      baseClasses.push('cursor-pointer');
    }

    // Loading state styling
    if (isLoading) {
      baseClasses.push('opacity-75', 'cursor-wait');
    }
    
    // Ripple effect styling
    if (rippleEffect && !isDisabled && !isLoading) {
      baseClasses.push(
        'before:absolute', 
        'before:inset-0', 
        'before:rounded-full', 
        'before:bg-current', 
        'before:opacity-0', 
        'before:transition-opacity', 
        'before:duration-200', 
        'active:before:opacity-20'
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
      rippleEffect: this.ripple !== false && (buttonConfig.rippleEffect !== false),
      iconPosition: this.iconPosition || buttonConfig.iconPosition || 'left'
    };
  }

  // Handle click events
  handleClick(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Create ripple effect using enhanced method
    if (this.getComponentProps().rippleEffect) {
      this.createEnhancedRipple(event);
    }

    // Emit click event using base component method
    this.emit('click', {
      variant: this.variant,
      label: this.label,
      size: this.size,
      density: this.density
    });
  }

  // Enhanced ripple effect using pure TailwindCSS animations
  createEnhancedRipple(event) {
    const button = this.shadowRoot.querySelector('button');
    if (!button) return;

    // Remove existing ripples
    button.querySelectorAll('.ripple-effect').forEach(ripple => ripple.remove());

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    
    // Position ripple at click point or center if no event
    let x, y;
    if (event && event.clientX !== undefined) {
      x = event.clientX - rect.left - size / 2;
      y = event.clientY - rect.top - size / 2;
    } else {
      x = rect.width / 2 - size / 2;
      y = rect.height / 2 - size / 2;
    }

    // Apply TailwindCSS classes for ripple effect
    ripple.className = [
      'ripple-effect',
      'absolute',
      'rounded-full',
      'bg-current',
      'opacity-30',
      'pointer-events-none',
      'animate-ping',
      'scale-0',
      'transition-transform',
      'duration-500',
      'ease-out'
    ].join(' ');

    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      transform: scale(0);
      animation: ripple-expand 0.6s ease-out;
    `;

    button.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
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
      
      // Create centered ripple effect for keyboard activation
      if (this.getComponentProps().rippleEffect) {
        this.createEnhancedRipple();
      }
      
      // Trigger click
      this.handleClick(event);
    }
  }

  // Enhanced focus/blur handling with accessibility improvements
  handleFocus(event) {
    super.handleFocus(event); // Call base class behavior
    if (this.disabled || this.loading) return;
    
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      button.classList.add('focused');
      
      // Announce focus for screen readers when using keyboard
      if (event && event.detail !== 0) {
        // Keyboard focus (detail is 0 for mouse focus)
        this.announceToScreenReader(
          `${this.label || 'Button'} focused. Press Enter or Space to activate.`,
          'polite'
        );
      }
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

  // Render the component using pure TailwindCSS
  render() {
    const isLoading = this.loading;
    const isDisabled = this.disabled;
    const { size, iconPosition } = this.getComponentProps();
    
    const buttonClasses = this.getTailwindClasses();
    
    // Generate loading spinner with appropriate size
    const spinnerSizes = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-7 h-7'
    };
    
    this.shadowRoot.innerHTML = `
      <style>
        @import '/src/styles/tailwind.css';
        
        :host {
          display: inline-flex;
          position: relative;
          isolation: isolate;
        }
        
        /* Custom ripple animation keyframe */
        @keyframes ripple-expand {
          0% {
            transform: scale(0);
            opacity: 0.3;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        /* Accessibility enhancements */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
          
          .ripple-effect {
            display: none !important;
          }
        }
        
        @media (prefers-contrast: high) {
          button {
            border-width: 2px !important;
            outline: 2px solid currentColor !important;
            outline-offset: 2px !important;
          }
          
          button:focus-visible {
            outline-width: 4px !important;
            outline-style: double !important;
          }
          
          .ripple-effect {
            display: none !important;
          }
        }
        
        /* Enhanced focus indicators for accessibility */
        button:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 2px;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
        }
        
        /* Ensure sufficient color contrast */
        @media (prefers-color-scheme: dark) {
          button {
            filter: brightness(1.1);
          }
        }
      </style>
      
      <button 
        class="${buttonClasses}"
        ${isDisabled || isLoading ? 'disabled' : ''}
        aria-label="${this.label || 'button'}"
        ${isLoading ? `aria-busy="true" aria-describedby="loading-text"` : ''}
        ${isDisabled ? 'aria-disabled="true"' : ''}
        role="button"
        tabindex="${isDisabled ? '-1' : '0'}"
        type="button"
      >
        ${isLoading ? `
          <div class="absolute inset-0 flex items-center justify-center">
            <svg class="${spinnerSizes[size] || spinnerSizes.md} animate-spin text-current" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span id="loading-text" class="sr-only">${this.loadingText}</span>
          </div>
          <span class="opacity-0 pointer-events-none" aria-hidden="true">
            <slot>${this.label}</slot>
          </span>
        ` : `
          <span class="flex items-center ${this.fab || this.iconOnly ? 'justify-center' : iconPosition === 'right' ? 'flex-row-reverse' : ''}">
            <slot name="icon-left"></slot>
            ${this.iconOnly ? '' : `<slot>${this.label}</slot>`}
            <slot name="icon-right"></slot>
          </span>
        `}
      </button>
    `;

    // Attach event listeners after rendering
    this.attachEventListeners();
  }

  // Generate accessible button description
  generateAccessibleDescription() {
    const { variant, size } = this.getComponentProps();
    const parts = [];
    
    if (this.label) {
      parts.push(this.label);
    }
    
    if (this.fab) {
      parts.push('floating action button');
    } else if (this.iconOnly) {
      parts.push('icon button');
    }
    
    if (variant !== 'filled') {
      parts.push(`${variant} style`);
    }
    
    if (size !== 'md') {
      parts.push(`${size} size`);
    }
    
    if (this.disabled) {
      parts.push('disabled');
    }
    
    if (this.loading) {
      parts.push(`loading: ${this.loadingText}`);
    }
    
    return parts.join(', ');
  }

  // Enhanced connectedCallback with accessibility setup
  connectedCallback() {
    super.connectedCallback();
    this.render();
    
    // Set up initial accessibility attributes
    this.setAttribute('role', 'button');
    
    // Announce component initialization to screen readers in dev mode
    if (globalConfig.get('development.logLevel') === 'debug') {
      this.announceToScreenReader(
        `Button component initialized: ${this.generateAccessibleDescription()}`,
        'polite'
      );
    }
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-button')) {
  customElements.define('my-button', MyButton);
}

export { MyButton };