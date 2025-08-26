/**
 * MyntUI my-radio-group Component
 * Enhanced version using MyntUIBaseComponent for improved consistency and maintainability
 * Manages a set of my-radio components, ensuring only one can be selected at a time
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';
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

  // Render method
  render() {
    const layout = this.layout;
    const label = this.label;
    const error = this.error;
    const required = this.required;
    
    return `
      <style>
        :host {
          --_radio-group-gap: var(--_global-spacing-md);
          --_radio-group-label-color: var(--_global-color-on-surface);
          --_radio-group-label-font-size: var(--_global-font-size-label-large);
          --_radio-group-label-font-weight: var(--_global-font-weight-medium);
          --_radio-group-error-color: var(--_global-color-error);
          
          display: block;
          font-family: var(--_global-font-family-sans);
        }

        :host([disabled]) {
          opacity: 0.6;
          pointer-events: none;
        }

        .radio-group {
          display: flex;
          flex-direction: ${layout === 'horizontal' ? 'row' : 'column'};
          gap: var(--_radio-group-gap);
          ${layout === 'horizontal' ? 'flex-wrap: wrap;' : ''}
        }

        .radio-group-label {
          color: var(--_radio-group-label-color);
          font-size: var(--_radio-group-label-font-size);
          font-weight: var(--_radio-group-label-font-weight);
          margin-bottom: var(--_global-spacing-sm);
          display: ${label ? 'block' : 'none'};
        }

        .required-indicator {
          color: var(--_global-color-error);
          margin-left: var(--_global-spacing-xs);
        }

        .error-message {
          color: var(--_radio-group-error-color);
          font-size: var(--_global-font-size-body-small);
          margin-top: var(--_global-spacing-sm);
          display: ${error ? 'block' : 'none'};
        }

        /* Layout variants */
        :host([layout="horizontal"]) .radio-group {
          flex-direction: row;
          align-items: center;
        }

        :host([layout="grid"]) .radio-group {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--_radio-group-gap);
        }

        /* Error state */
        :host([error]) {
          --_radio-group-label-color: var(--_global-color-error);
        }

        /* Focus management */
        :host(:focus-within) {
          outline: 2px solid var(--_global-color-primary);
          outline-offset: 2px;
          border-radius: var(--_global-border-radius-sm);
        }
      </style>
      
      <div class="radio-group-container"
           role="radiogroup"
           aria-labelledby="${label ? 'radio-group-label' : ''}"
           aria-describedby="${error ? 'error-message' : ''}"
           aria-required="${required}"
           aria-invalid="${error ? 'true' : 'false'}">
        ${label ? `
          <label class="radio-group-label" id="radio-group-label">
            ${label}
            ${required ? '<span class="required-indicator" aria-label="required">*</span>' : ''}
          </label>
        ` : ''}
        
        <div class="radio-group">
          <slot @slotchange="${this.handleSlotChange}"></slot>
        </div>
        
        ${error ? `
          <div class="error-message" id="error-message" role="alert" aria-live="polite">
            ${error}
          </div>
        ` : ''}
      </div>
    `;
  }
}

// Register the custom element
customElements.define('my-radio-group', MyRadioGroup);

export default MyRadioGroup;