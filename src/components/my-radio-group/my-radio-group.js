/**
 * MyntUI my-radio-group Component
 * Enhanced version using MyntUIBaseComponent for improved consistency and maintainability
 * Manages a set of my-radio components, ensuring only one can be selected at a time
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';
import { globalConfig } from '../../config/global-config.js';
import '../my-radio/my-radio.js';

class MyRadioGroup extends MyntUIBaseComponent {
  constructor() {
    super();
    
    // Component-specific internal state
    this._value = '';
    this._radios = [];
    
    // Component-specific bindings
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
    
    // Initialize with base component pattern
    this.log('RadioGroup component initializing...');
    this.parseAttributes();
  }

  // Extended observed attributes (inherits base ones)
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'name', 'value', 'label', 'required', 'layout', 'error',
      'aria-label', 'aria-labelledby', 'aria-describedby'
    ];
  }

  // Component-specific attribute handling
  handleAttributeChange(name, oldValue, newValue) {
    super.handleAttributeChange(name, oldValue, newValue);
    
    switch (name) {
      case 'value':
        this._value = newValue || '';
        this.updateRadioSelection();
        this.announceToScreenReader(
          `Selected option: ${this._getSelectedRadioLabel() || 'none'}`,
          'polite'
        );
        break;
      case 'disabled':
        this.updateRadioDisabledState();
        this.announceToScreenReader(
          `Radio group ${this.disabled ? 'disabled' : 'enabled'}`,
          'polite'
        );
        break;
      case 'required':
        this.announceToScreenReader(
          `Radio group is ${newValue !== null ? 'required' : 'optional'}`,
          'polite'
        );
        break;
    }
  }

  // Parse attributes
  parseAttributes() {
    this._value = this.getAttribute('value') || '';
  }

  // Get selected radio label for screen reader announcements
  _getSelectedRadioLabel() {
    const selectedRadio = this._radios.find(radio => radio.checked);
    return selectedRadio ? selectedRadio.label : null;
  }

  // Handle radio change events
  handleRadioChange(event) {
    if (event.target.tagName.toLowerCase() === 'my-radio') {
      this._value = event.target.value;
      this.setAttribute('value', this._value);
      
      // Update other radios
      this.updateRadioSelection();
      
      // Emit change event
      this.emitEvent('change', { 
        value: this._value,
        name: this.name
      });
      
      // Log interaction
      this.logInteraction('radio-selected', { value: this._value });
    }
  }

  // Handle keyboard navigation
  handleKeyDown(event) {
    if (!this._radios.length) return;
    
    const currentIndex = this._radios.findIndex(radio => 
      radio === this.shadowRoot.activeElement || radio.matches(':focus')
    );
    
    let nextIndex = -1;
    
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        nextIndex = (currentIndex + 1) % this._radios.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        nextIndex = currentIndex <= 0 ? this._radios.length - 1 : currentIndex - 1;
        break;
      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        nextIndex = this._radios.length - 1;
        break;
      default:
        return;
    }
    
    if (nextIndex >= 0 && this._radios[nextIndex]) {
      this._radios[nextIndex].focus();
      this._radios[nextIndex].checked = true;
      this._value = this._radios[nextIndex].value;
      this.setAttribute('value', this._value);
      this.updateRadioSelection();
      
      // Emit change event
      this.emitEvent('change', { 
        value: this._value,
        name: this.name
      });
    }
  }

  // Handle slot change to track radio buttons
  handleSlotChange() {
    this._updateRadioList();
    this.updateRadioSelection();
  }

  // Update the list of radio buttons
  _updateRadioList() {
    const slot = this.shadowRoot.querySelector('slot');
    if (!slot) return;
    
    const assignedElements = slot.assignedElements();
    this._radios = assignedElements.filter(el => 
      el.tagName.toLowerCase() === 'my-radio'
    );
    
    // Configure radio buttons
    this._radios.forEach((radio, index) => {
      // Set name from radio group
      if (this.name) {
        radio.setAttribute('name', this.name);
      }
      
      // Set disabled state
      if (this.disabled) {
        radio.setAttribute('disabled', '');
      } else {
        radio.removeAttribute('disabled');
      }
      
      // Add to radio group for screen readers
      radio.setAttribute('role', 'radio');
      radio.setAttribute('aria-setsize', this._radios.length);
      radio.setAttribute('aria-posinset', index + 1);
      
      // Remove previous listeners to avoid duplicates
      radio.removeEventListener('change', this.handleRadioChange);
      radio.addEventListener('change', this.handleRadioChange);
    });
  }

  // Update radio selection based on current value
  updateRadioSelection() {
    this._radios.forEach(radio => {
      if (radio.value === this._value) {
        radio.checked = true;
        radio.setAttribute('aria-checked', 'true');
        radio.setAttribute('tabindex', '0');
      } else {
        radio.checked = false;
        radio.setAttribute('aria-checked', 'false');
        radio.setAttribute('tabindex', '-1');
      }
    });
  }

  // Update radio disabled state
  updateRadioDisabledState() {
    this._radios.forEach(radio => {
      if (this.disabled) {
        radio.setAttribute('disabled', '');
        radio.setAttribute('aria-disabled', 'true');
      } else {
        radio.removeAttribute('disabled');
        radio.setAttribute('aria-disabled', 'false');
      }
    });
  }

  // Connected callback
  connectedCallback() {
    super.connectedCallback();
    
    // Add keyboard event listener to the group
    this.addEventListener('keydown', this.handleKeyDown);
    
    // Initial setup
    setTimeout(() => {
      this._updateRadioList();
      this.updateRadioSelection();
    }, 0);
  }

  // Disconnected callback
  disconnectedCallback() {
    super.disconnectedCallback();
    
    // Clean up event listeners
    this.removeEventListener('keydown', this.handleKeyDown);
    this._radios.forEach(radio => {
      radio.removeEventListener('change', this.handleRadioChange);
    });
  }

  // Public API
  get name() {
    return this.getAttribute('name') || '';
  }

  set name(value) {
    this.setAttribute('name', value);
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.setAttribute('value', value);
    this.updateRadioSelection();
  }

  get label() {
    return this.getAttribute('label') || '';
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get required() {
    return this.hasAttribute('required');
  }

  set required(value) {
    if (value) {
      this.setAttribute('required', '');
    } else {
      this.removeAttribute('required');
    }
  }

  get layout() {
    return this.getAttribute('layout') || 'vertical';
  }

  set layout(value) {
    this.setAttribute('layout', value);
  }

  get error() {
    return this.getAttribute('error') || '';
  }

  set error(value) {
    if (value) {
      this.setAttribute('error', value);
    } else {
      this.removeAttribute('error');
    }
  }

  // Generate TailwindCSS classes using global config
  getTailwindClasses() {
    const size = this.size || 'md';
    const disabled = this.disabled;
    const layout = this.layout;
    const error = this.error;
    const config = globalConfig.get('theme.tailwind', {});
    const sizeConfig = config.sizes?.[size] || config.sizes?.md || {};
    const stateConfig = config.states || {};
    
    // Container classes
    let containerClasses = [
      'block',
      'w-full',
      'transition-all',
      'duration-200',
      'ease-standard'
    ];

    // Radio group wrapper classes
    let groupClasses = [
      'flex',
      sizeConfig.spacing || 'gap-md',
      'transition-all',
      'duration-200'
    ];

    // Layout-specific classes
    switch (layout) {
      case 'horizontal':
        groupClasses.push('flex-row', 'flex-wrap', 'items-center');
        break;
      case 'grid':
        groupClasses = [
          'grid',
          'grid-cols-1',
          'sm:grid-cols-2',
          'md:grid-cols-3',
          'lg:grid-cols-4',
          sizeConfig.spacing || 'gap-md',
          'transition-all',
          'duration-200'
        ];
        break;
      default: // vertical
        groupClasses.push('flex-col');
        break;
    }

    // Label classes with Material Design 3 typography
    let labelClasses = [
      'text-surface-on-surface',
      'text-label-large',
      'font-medium',
      'leading-normal',
      'mb-sm',
      'transition-colors',
      'duration-200'
    ];

    // Error message classes
    let errorClasses = [
      'text-error',
      'text-body-small',
      'mt-sm',
      'flex',
      'items-center',
      'gap-xs',
      'transition-all',
      'duration-200'
    ];

    // Required indicator classes
    let requiredClasses = [
      'text-error',
      'ml-xs',
      'font-medium'
    ];

    // Apply state classes from global config
    if (disabled) {
      const disabledClasses = stateConfig.disabled || 'opacity-50 cursor-not-allowed pointer-events-none grayscale';
      containerClasses.push(...disabledClasses.split(' '));
    }

    // Error state
    if (error) {
      labelClasses.push('text-error');
      containerClasses.push('border-l-4', 'border-error', 'pl-md', 'bg-error/5', 'rounded-r-md');
    }

    // Focus-within state for accessibility
    containerClasses.push('focus-within:ring-2', 'focus-within:ring-primary/20', 'focus-within:ring-offset-2');

    return {
      container: containerClasses.join(' '),
      group: groupClasses.join(' '),
      label: labelClasses.join(' '),
      error: errorClasses.join(' '),
      required: requiredClasses.join(' ')
    };
  }

  // Render method
  render() {
    const { label, error, required } = this;
    const classes = this.getTailwindClasses();
    
    this.shadowRoot.innerHTML = `
      <style>
        @import '/src/styles/tailwind.css';
        
        :host {
          display: block;
          font-family: var(--_global-font-family-sans);
        }
        
        /* Enhanced accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
        
        @media (prefers-contrast: high) {
          .radio-group-container {
            border: 2px solid currentColor;
            padding: 0.5rem;
            border-radius: 0.25rem;
          }
        }
      </style>
      
      <div class="${classes.container}"
           role="radiogroup"
           aria-labelledby="${label ? 'radio-group-label' : ''}"
           aria-describedby="${error ? 'error-message' : ''}"
           aria-required="${required}"
           aria-invalid="${error ? 'true' : 'false'}">
        ${label ? `
          <label class="${classes.label}" id="radio-group-label">
            ${label}
            ${required ? `<span class="${classes.required}" aria-label="required">*</span>` : ''}
          </label>
        ` : ''}
        
        <div class="${classes.group}">
          <slot></slot>
        </div>
        
        ${error ? `
          <div class="${classes.error}" id="error-message" role="alert" aria-live="polite">
            <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>${error}</span>
          </div>
        ` : ''}
      </div>
    `;
    
    // Handle slot changes for dynamic radio updates
    const slot = this.shadowRoot.querySelector('slot');
    if (slot) {
      slot.addEventListener('slotchange', this.handleSlotChange);
    }
  }
}

// Register the custom element
customElements.define('my-radio-group', MyRadioGroup);

export default MyRadioGroup;