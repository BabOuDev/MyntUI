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
  // Standardized event handling pattern for MyntUI components
  attachEventListeners() {
    // Clean up existing listeners first
    this.removeEventListeners();
    
    const toggleContainer = this.shadowRoot.querySelector('.toggle-container');
    if (!toggleContainer) return;
    
    // Only attach listeners to the shadow DOM container element
    toggleContainer.addEventListener('click', this.handleClick);
    toggleContainer.addEventListener('keydown', this.handleKeyDown);
    
    // Store references for cleanup
    this._eventTargets = [
      { element: toggleContainer, events: ['click', 'keydown'] }
    ];
  }

  // Standardized event listener cleanup
  removeEventListeners() {
    if (this._eventTargets) {
      this._eventTargets.forEach(target => {
        target.element.removeEventListener('click', this.handleClick);
        target.element.removeEventListener('keydown', this.handleKeyDown);
      });
      this._eventTargets = null;
    }
  }

  // Standardized lifecycle cleanup
  disconnectedCallback() {
    this.removeEventListeners();
  }

  // Render the component
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Component-specific variables using global variables */
          --_toggle-width: 52px;
          --_toggle-height: 32px;
          --_toggle-thumb-size: 24px;
          --_toggle-thumb-size-pressed: 28px;
          --_toggle-track-height: 16px;
          --_toggle-bg-off: var(--_global-color-surface-container-highest);
          --_toggle-bg-on: var(--_global-color-primary);
          --_toggle-bg-disabled: var(--_global-color-surface-variant);
          --_toggle-border-off: 2px solid var(--_global-color-outline);
          --_toggle-border-on: 2px solid var(--_global-color-primary);
          --_toggle-border-disabled: 2px solid var(--_global-color-outline);
          --_toggle-thumb-color-off: var(--_global-color-outline);
          --_toggle-thumb-color-on: var(--_global-color-on-primary);
          --_toggle-thumb-color-disabled: var(--_global-color-surface);
          --_toggle-border-radius: var(--_global-border-radius-full);
          --_toggle-state-layer-size: 40px;
          --_toggle-transition: all var(--_global-motion-duration-short2) var(--_global-motion-easing-emphasized);
          
          display: inline-flex;
          align-items: center;
          gap: var(--_global-spacing-sm);
          cursor: pointer;
          user-select: none;
          position: relative;
          min-height: var(--_toggle-state-layer-size);
          font-family: var(--_global-font-family-sans);
        }

        :host([disabled]) {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }

        .toggle-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: var(--_toggle-state-layer-size);
          height: var(--_toggle-state-layer-size);
          border-radius: 50%;
          cursor: pointer;
          outline: none;
        }
        
        /* State layer for Material Design 3 */
        .toggle-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background: var(--_global-color-primary);
          opacity: 0;
          transition: opacity var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
          pointer-events: none;
        }
        
        .toggle-container:hover::before {
          opacity: var(--_global-state-layer-hover);
        }
        
        .toggle-container:active::before {
          opacity: var(--_global-state-layer-pressed);
        }
        
        .toggle-container:focus::before {
          opacity: var(--_global-state-layer-focus);
        }
        
        .toggle-container:focus {
          outline: 2px solid var(--_global-color-primary);
          outline-offset: 2px;
        }

        .toggle-track {
          position: relative;
          width: var(--_toggle-width);
          height: var(--_toggle-track-height);
          background-color: var(--_toggle-bg-off);
          border: var(--_toggle-border-off);
          border-radius: var(--_toggle-border-radius);
          transition: var(--_toggle-transition);
          box-sizing: border-box;
        }

        .toggle-track.checked {
          background-color: var(--_toggle-bg-on);
          border: var(--_toggle-border-on);
        }

        .toggle-thumb {
          position: absolute;
          top: 50%;
          left: calc(-1 * var(--_toggle-thumb-size) / 2 + 2px);
          width: var(--_toggle-thumb-size);
          height: var(--_toggle-thumb-size);
          background-color: var(--_toggle-thumb-color-off);
          border-radius: var(--_toggle-border-radius);
          transition: var(--_toggle-transition);
          transform: translateY(-50%);
          box-shadow: var(--_global-elevation-1);
          z-index: 2;
        }
        
        .toggle-track.checked .toggle-thumb {
          left: calc(100% - var(--_toggle-thumb-size) / 2 - 2px);
          background-color: var(--_toggle-thumb-color-on);
          box-shadow: var(--_global-elevation-2);
        }
        
        /* Pressed state for thumb */
        .toggle-container:active .toggle-thumb {
          width: var(--_toggle-thumb-size-pressed);
          height: var(--_toggle-thumb-size-pressed);
          transition-duration: var(--_global-motion-duration-short1);
        }
        
        .toggle-container:active .toggle-track:not(.checked) .toggle-thumb {
          left: calc(-1 * var(--_toggle-thumb-size-pressed) / 2 + 2px);
        }
        
        .toggle-container:active .toggle-track.checked .toggle-thumb {
          left: calc(100% - var(--_toggle-thumb-size-pressed) / 2 - 2px);
        }

        .label {
          color: var(--_global-color-on-surface);
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-normal);
          line-height: var(--_global-line-height-normal);
          cursor: pointer;
          flex: 1;
        }

        /* Disabled states */
        :host([disabled]) {
          --_toggle-bg-off: var(--_toggle-bg-disabled);
          --_toggle-bg-on: var(--_toggle-bg-disabled);
          --_toggle-border-off: var(--_toggle-border-disabled);
          --_toggle-border-on: var(--_toggle-border-disabled);
          --_toggle-thumb-color-off: var(--_toggle-thumb-color-disabled);
          --_toggle-thumb-color-on: var(--_toggle-thumb-color-disabled);
        }
        
        :host([disabled]) .toggle-container::before {
          display: none;
        }
        
        :host([disabled]) .label {
          color: var(--_global-color-outline);
        }

        /* Size variants */
        :host([size="sm"]) {
          --_toggle-width: 44px;
          --_toggle-track-height: 14px;
          --_toggle-thumb-size: 20px;
          --_toggle-thumb-size-pressed: 24px;
          --_toggle-state-layer-size: 36px;
        }

        :host([size="lg"]) {
          --_toggle-width: 60px;
          --_toggle-track-height: 18px;
          --_toggle-thumb-size: 28px;
          --_toggle-thumb-size-pressed: 32px;
          --_toggle-state-layer-size: 48px;
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .toggle-track,
          .toggle-thumb,
          .toggle-container::before {
            transition: none;
          }
        }

        /* Accessibility improvements - High Contrast Mode Support */
        @media (prefers-contrast: high) {
          .toggle-container {
            border: 2px solid currentColor;
            outline: 2px solid;
            outline-offset: 2px;
          }
          
          .toggle-thumb {
            border: 2px solid currentColor;
            background: var(--_global-color-surface);
          }
          
          :host([checked]) .toggle-thumb {
            background: var(--_global-color-primary);
          }
        }

        /* Accessibility improvements - Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          .toggle-container,
          .toggle-thumb,
          .toggle-container::before {
            animation: none;
            transition: none;
          }
        }

        /* Enhanced focus-visible for better keyboard navigation */
        @supports selector(:focus-visible) {
          .toggle-container:focus:not(:focus-visible) {
            box-shadow: none;
          }
        }
      </style>

      <div 
        class="toggle-container"
        role="switch"
        aria-checked="${this.checked}"
        aria-label="${this.label || 'toggle switch'}"
        ${this.disabled ? 'aria-disabled="true"' : ''}
        tabindex="${this.disabled ? '-1' : '0'}"
      >
        <div class="toggle-track ${this.checked ? 'checked' : ''}">
          <div class="toggle-thumb"></div>
        </div>
      </div>
      
      ${this.label ? `<span class="label">${this.label}</span>` : ''}
    `;
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-toggle')) {
  customElements.define('my-toggle', MyToggle);
}