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

  // Generate TailwindCSS classes
  getTailwindClasses() {
    const size = this.size || 'md';
    const disabled = this.disabled;
    const checked = this.checked;
    const indeterminate = this.indeterminate;
    
    // Container classes
    let containerClasses = [
      'inline-flex',
      'items-start',
      'gap-3',
      'cursor-pointer',
      'group'
    ];

    if (disabled) {
      containerClasses.push('cursor-not-allowed', 'opacity-50');
    }

    // Checkbox input classes
    let checkboxClasses = [
      'relative',
      'flex-shrink-0',
      'border-2',
      'rounded',
      'transition-all',
      'duration-medium1',
      'ease-standard',
      'focus-visible:ring-2',
      'focus-visible:ring-primary',
      'focus-visible:ring-offset-2'
    ];

    // Size classes
    const sizeClasses = {
      sm: ['w-4', 'h-4'],
      md: ['w-5', 'h-5'],
      lg: ['w-6', 'h-6']
    };

    checkboxClasses.push(...(sizeClasses[size] || sizeClasses.md));

    // State-specific classes
    if (checked || indeterminate) {
      checkboxClasses.push(
        'bg-primary',
        'border-primary',
        'text-primary-on-primary'
      );
    } else {
      checkboxClasses.push(
        'bg-surface',
        'border-outline',
        'hover:border-primary',
        'hover:shadow-sm'
      );
    }

    if (disabled) {
      checkboxClasses = checkboxClasses.filter(c => 
        !c.startsWith('hover:') && 
        !c.includes('focus')
      );
      checkboxClasses.push('border-outline-variant');
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
    }

    return {
      container: containerClasses.join(' '),
      checkbox: checkboxClasses.join(' '),
      label: labelClasses.join(' ')
    };
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

    // Emit change event
    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        checked: this.checked,
        indeterminate: this.indeterminate,
        value: this.value,
        name: this.name
      },
      bubbles: true,
      composed: true
    }));
  }

  // Handle click events
  handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    this.toggle();
  }

  // Handle keyboard events
  handleKeyDown(event) {
    if (this.disabled) return;

    if (event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
  }

  // Render the component
  render() {
    const { checked, indeterminate, label, name, value, disabled } = this;
    const classes = this.getTailwindClasses();
    const checkboxId = name ? `${name}-checkbox` : 'checkbox';
    
    this.shadowRoot.innerHTML = `
      <style>
        @import '/src/styles/tailwind.css';
        
        :host {
          display: inline-block;
        }
        
        /* Checkbox check mark */
        .checkbox-mark {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(0);
          transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .checkbox-mark.visible {
          opacity: 1;
          transform: scale(1);
        }
        
        /* Check mark SVG */
        .check-icon {
          width: 75%;
          height: 75%;
          stroke: currentColor;
          stroke-width: 2.5;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        
        /* Indeterminate mark */
        .indeterminate-mark {
          width: 60%;
          height: 2px;
          background: currentColor;
          border-radius: 1px;
        }
        
        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .checkbox-mark {
            transition: none !important;
          }
        }
        
        @media (prefers-contrast: high) {
          .checkbox-input {
            outline: 2px solid currentColor;
            outline-offset: 2px;
          }
        }
      </style>
      
      <label class="${classes.container}">
        <div class="${classes.checkbox} checkbox-input" role="checkbox" 
             aria-checked="${indeterminate ? 'mixed' : checked.toString()}"
             ${disabled ? 'aria-disabled="true"' : ''}
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
          <span class="${classes.label}">
            ${label}
          </span>
        ` : ''}
        
        <input type="checkbox" 
               ${name ? `name="${name}"` : ''}
               ${value ? `value="${value}"` : ''}
               ${checked ? 'checked' : ''}
               ${disabled ? 'disabled' : ''}
               style="position: absolute; opacity: 0; pointer-events: none;"
               tabindex="-1"
               aria-hidden="true">
      </label>
    `;

    // Attach event listeners
    const checkboxElement = this.shadowRoot.querySelector('.checkbox-input');
    const labelElement = this.shadowRoot.querySelector('label');
    
    if (checkboxElement) {
      checkboxElement.addEventListener('click', this.handleClick);
      checkboxElement.addEventListener('keydown', this.handleKeyDown);
    }
    
    if (labelElement && !label) {
      labelElement.addEventListener('click', this.handleClick);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
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