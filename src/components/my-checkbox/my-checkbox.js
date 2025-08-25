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

  // Get checkbox state icon
  getStateIcon() {
    if (this.indeterminate) {
      return 'indeterminate_check_box';
    } else if (this.checked) {
      return 'check_box';
    } else {
      return 'check_box_outline_blank';
    }
  }

  // Render the component
  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <style>
        :host {
          /* Component-specific variables using global variables */
          --_checkbox-size: 20px;
          --_checkbox-color: var(--_global-color-primary);
          --_checkbox-color-disabled: var(--_global-color-gray-400);
          --_checkbox-border-radius: var(--_global-border-radius-sm);
          
          display: inline-flex;
          align-items: flex-start;
          gap: var(--_global-spacing-sm);
          cursor: pointer;
          user-select: none;
          line-height: var(--_global-line-height-normal);
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
        }

        .checkbox-container:focus .checkbox-icon {
          box-shadow: 0 0 0 2px var(--_global-color-border-focus);
          border-radius: var(--_checkbox-border-radius);
        }

        .checkbox-icon {
          width: var(--_checkbox-size);
          height: var(--_checkbox-size);
          color: var(--_checkbox-color);
          transition: color var(--_global-transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--_checkbox-size);
          line-height: 1;
        }

        .checkbox-icon.unchecked {
          color: var(--_global-color-gray-600);
        }

        .checkbox-icon:hover {
          color: var(--_checkbox-color);
          opacity: 0.8;
        }

        .label {
          color: var(--_global-color-text-primary);
          font-size: var(--_global-font-size-md);
          font-weight: var(--_global-font-weight-normal);
          line-height: var(--_global-line-height-normal);
          cursor: pointer;
        }

        /* Size variants */
        :host([size="sm"]) {
          --_checkbox-size: 16px;
        }

        :host([size="lg"]) {
          --_checkbox-size: 24px;
        }

        /* Disabled state */
        :host([disabled]) .checkbox-icon {
          color: var(--_checkbox-color-disabled);
        }

        :host([disabled]) .label {
          color: var(--_global-color-text-muted);
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
        <span class="material-icons checkbox-icon ${!this.checked && !this.indeterminate ? 'unchecked' : ''}">
          ${this.getStateIcon()}
        </span>
        
        ${this.label ? `<span class="label">${this.label}</span>` : '<slot></slot>'}
      </div>
    `;
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-checkbox')) {
  customElements.define('my-checkbox', MyCheckbox);
}