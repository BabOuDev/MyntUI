/**
 * MyntUI my-checkbox Component
 * A standard checkbox input for selecting one or more options
 */

class MyCheckbox extends HTMLElement {
  constructor() {
    super();
    
    // Create Shadow DOM for encapsulation
    this.attachShadow({ mode: 'open' });
    
    // Bind event handlers
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    
    // Initialize component
    this.render();
    this.attachEventListeners();
  }

  // Define which attributes to observe for changes
  static get observedAttributes() {
    return ['checked', 'indeterminate', 'disabled', 'label', 'name', 'value'];
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.attachEventListeners();
    }
  }

  // Getters and setters
  get checked() {
    return this.hasAttribute('checked');
  }

  set checked(value) {
    if (value) {
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
    if (value) {
      this.setAttribute('indeterminate', '');
      this.removeAttribute('checked');
    } else {
      this.removeAttribute('indeterminate');
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
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

    if (event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
  }

  // Toggle the checked state
  toggle() {
    if (this.indeterminate) {
      // If indeterminate, go to checked
      this.checked = true;
    } else {
      // Normal toggle
      this.checked = !this.checked;
    }

    // Emit change event
    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        checked: this.checked,
        indeterminate: this.indeterminate,
        value: this.checked ? this.value : null,
        name: this.name
      },
      bubbles: true
    }));
  }

  // Attach event listeners
  attachEventListeners() {
    const checkbox = this.shadowRoot.querySelector('.checkbox-container');
    if (checkbox) {
      // Remove existing listeners
      checkbox.removeEventListener('click', this.handleClick);
      checkbox.removeEventListener('keydown', this.handleKeyDown);
      
      // Add new listeners
      checkbox.addEventListener('click', this.handleClick);
      checkbox.addEventListener('keydown', this.handleKeyDown);
    }
  }


  // Render the component
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Component-specific variables using global variables */
          --_checkbox-size: 18px;
          --_checkbox-color: var(--_global-color-primary);
          --_checkbox-color-unchecked: var(--_global-color-on-surface-variant);
          --_checkbox-color-disabled: var(--_global-color-outline);
          --_checkbox-background: var(--_global-color-surface);
          --_checkbox-background-checked: var(--_global-color-primary);
          --_checkbox-background-disabled: var(--_global-color-surface-variant);
          --_checkbox-border: 2px solid var(--_global-color-outline);
          --_checkbox-border-checked: 2px solid var(--_global-color-primary);
          --_checkbox-border-hover: 2px solid var(--_global-color-on-surface);
          --_checkbox-border-radius: var(--_global-border-radius-xs);
          --_checkbox-state-layer-size: 40px;
          --_checkbox-transition: all var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          
          display: inline-flex;
          align-items: center;
          gap: var(--_global-spacing-sm);
          cursor: pointer;
          user-select: none;
          line-height: var(--_global-line-height-normal);
          position: relative;
          min-height: var(--_checkbox-state-layer-size);
          font-family: var(--_global-font-family-sans);
        }

        :host([disabled]) {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }

        .checkbox-container {
          display: inline-flex;
          align-items: center;
          gap: var(--_global-spacing-sm);
          cursor: pointer;
          outline: none;
          position: relative;
          padding: calc((var(--_checkbox-state-layer-size) - var(--_checkbox-size)) / 2);
          margin: calc((var(--_checkbox-state-layer-size) - var(--_checkbox-size)) / -2);
          border-radius: 50%;
        }
        
        /* State layer for Material Design 3 */
        .checkbox-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background: var(--_checkbox-color);
          opacity: 0;
          transition: opacity var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
          pointer-events: none;
        }
        
        .checkbox-container:hover::before {
          opacity: var(--_global-state-layer-hover);
        }
        
        .checkbox-container:active::before {
          opacity: var(--_global-state-layer-pressed);
        }

        .checkbox-container:focus {
          outline: 2px solid var(--_global-color-primary);
          outline-offset: 2px;
        }
        
        .checkbox-container:focus::before {
          opacity: var(--_global-state-layer-focus);
        }

        .checkbox-input {
          width: var(--_checkbox-size);
          height: var(--_checkbox-size);
          position: relative;
          border: var(--_checkbox-border);
          border-radius: var(--_checkbox-border-radius);
          background-color: var(--_checkbox-background);
          transition: var(--_checkbox-transition);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .checkbox-input.checked {
          background-color: var(--_checkbox-background-checked);
          border-color: var(--_checkbox-background-checked);
        }
        
        .checkbox-input.indeterminate {
          background-color: var(--_checkbox-background-checked);
          border-color: var(--_checkbox-background-checked);
        }
        
        /* Checkmark */
        .checkbox-input::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 10px;
          height: 6px;
          border: 2px solid var(--_global-color-on-primary);
          border-top: none;
          border-right: none;
          transform-origin: center;
          transition: transform var(--_global-motion-duration-short2) var(--_global-motion-easing-emphasized);
        }
        
        .checkbox-input.checked::after {
          transform: translate(-50%, -60%) rotate(-45deg) scale(1);
        }
        
        /* Indeterminate state */
        .checkbox-input.indeterminate::after {
          width: 8px;
          height: 0;
          border: 1px solid var(--_global-color-on-primary);
          border-top: none;
          border-left: none;
          border-right: none;
          transform: translate(-50%, -50%) scale(1);
        }

        .label {
          color: var(--_global-color-on-surface);
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-normal);
          line-height: var(--_global-line-height-normal);
          cursor: pointer;
          flex: 1;
        }

        /* Hover states */
        .checkbox-container:hover:not([aria-disabled="true"]) .checkbox-input:not(.checked):not(.indeterminate) {
          border-color: var(--_global-color-on-surface);
        }

        /* Size variants */
        :host([size="sm"]) {
          --_checkbox-size: 16px;
          --_checkbox-state-layer-size: 36px;
        }

        :host([size="lg"]) {
          --_checkbox-size: 24px;
          --_checkbox-state-layer-size: 48px;
        }

        /* Disabled state */
        :host([disabled]) {
          --_checkbox-color: var(--_checkbox-color-disabled);
          --_checkbox-border: 2px solid var(--_checkbox-color-disabled);
        }
        
        :host([disabled]) .checkbox-container::before {
          display: none;
        }

        :host([disabled]) .checkbox-input {
          background-color: var(--_checkbox-background-disabled);
        }
        
        :host([disabled]) .checkbox-input.checked,
        :host([disabled]) .checkbox-input.indeterminate {
          background-color: var(--_checkbox-color-disabled);
          border-color: var(--_checkbox-color-disabled);
        }

        :host([disabled]) .label {
          color: var(--_global-color-outline);
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .checkbox-input,
          .checkbox-input::after,
          .checkbox-container::before {
            transition: none;
          }
        }
      </style>

      <div 
        class="checkbox-container"
        role="checkbox"
        aria-checked="${this.indeterminate ? 'mixed' : this.checked}"
        aria-label="${this.label || 'checkbox'}"
        ${this.disabled ? 'aria-disabled="true"' : ''}
        tabindex="${this.disabled ? '-1' : '0'}"
      >
        <div class="checkbox-input ${this.checked ? 'checked' : ''} ${this.indeterminate ? 'indeterminate' : ''}"></div>
        
        ${this.label ? `<span class="label">${this.label}</span>` : '<slot></slot>'}
      </div>
    `;
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-checkbox')) {
  customElements.define('my-checkbox', MyCheckbox);
}