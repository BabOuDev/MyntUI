/**
 * MyntUI my-toggle Component
 * A switch-like component for a boolean input, providing a visual on/off state
 */

class MyToggle extends HTMLElement {
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
    return ['checked', 'disabled', 'label', 'name', 'value'];
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
    } else {
      this.removeAttribute('checked');
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

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  }

  // Toggle the checked state
  toggle() {
    const oldChecked = this.checked;
    this.checked = !oldChecked;

    // Emit change event
    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        checked: this.checked,
        value: this.checked ? this.value : null,
        name: this.name
      },
      bubbles: true
    }));
  }

  // Attach event listeners
  attachEventListeners() {
    const toggle = this.shadowRoot.querySelector('.toggle');
    if (toggle) {
      // Remove existing listeners
      toggle.removeEventListener('click', this.handleClick);
      toggle.removeEventListener('keydown', this.handleKeyDown);
      
      // Add new listeners
      toggle.addEventListener('click', this.handleClick);
      toggle.addEventListener('keydown', this.handleKeyDown);
    }
  }

  // Render the component
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Component-specific variables using global variables */
          --_toggle-width: 48px;
          --_toggle-height: 24px;
          --_toggle-thumb-size: 20px;
          --_toggle-bg-off: var(--_global-color-gray-300);
          --_toggle-bg-on: var(--_global-color-primary);
          --_toggle-thumb-color: var(--_global-color-white);
          --_toggle-border-radius: var(--_global-border-radius-full);
          
          display: inline-flex;
          align-items: center;
          gap: var(--_global-spacing-sm);
          cursor: pointer;
          user-select: none;
        }

        :host([disabled]) {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }

        .toggle {
          position: relative;
          width: var(--_toggle-width);
          height: var(--_toggle-height);
          background-color: var(--_toggle-bg-off);
          border-radius: var(--_toggle-border-radius);
          border: none;
          cursor: pointer;
          transition: background-color var(--_global-transition-fast);
          outline: none;
        }

        .toggle:focus {
          box-shadow: 0 0 0 2px var(--_global-color-border-focus);
        }

        .toggle.checked {
          background-color: var(--_toggle-bg-on);
        }

        .toggle-thumb {
          position: absolute;
          top: 2px;
          left: 2px;
          width: var(--_toggle-thumb-size);
          height: var(--_toggle-thumb-size);
          background-color: var(--_toggle-thumb-color);
          border-radius: var(--_toggle-border-radius);
          transition: transform var(--_global-transition-fast);
          box-shadow: var(--_global-shadow-sm);
        }

        .toggle.checked .toggle-thumb {
          transform: translateX(calc(var(--_toggle-width) - var(--_toggle-thumb-size) - 4px));
        }

        .label {
          color: var(--_global-color-text-primary);
          font-size: var(--_global-font-size-md);
          font-weight: var(--_global-font-weight-normal);
          line-height: var(--_global-line-height-normal);
        }

        /* Hover effects */
        :host(:not([disabled])) .toggle:hover {
          background-color: var(--_toggle-bg-off);
          opacity: 0.8;
        }

        :host(:not([disabled])) .toggle.checked:hover {
          background-color: var(--_toggle-bg-on);
          opacity: 0.8;
        }

        /* Size variants */
        :host([size="sm"]) {
          --_toggle-width: 36px;
          --_toggle-height: 20px;
          --_toggle-thumb-size: 16px;
        }

        :host([size="lg"]) {
          --_toggle-width: 56px;
          --_toggle-height: 28px;
          --_toggle-thumb-size: 24px;
        }
      </style>

      <button 
        class="toggle ${this.checked ? 'checked' : ''}"
        role="switch"
        aria-checked="${this.checked}"
        aria-label="${this.label || 'toggle switch'}"
        ${this.disabled ? 'disabled' : ''}
        tabindex="${this.disabled ? '-1' : '0'}"
      >
        <div class="toggle-thumb"></div>
      </button>
      
      ${this.label ? `<span class="label">${this.label}</span>` : ''}
    `;
  }
}

// Register the custom element
customElements.define('my-toggle', MyToggle);