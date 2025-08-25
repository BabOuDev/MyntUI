/**
 * MyntUI my-dropdown Component
 * A component that displays a list of options when clicked, typically used for navigation or actions
 */

class MyDropdown extends HTMLElement {
  constructor() {
    super();
    
    // Create Shadow DOM for encapsulation
    this.attachShadow({ mode: 'open' });
    
    // Internal state
    this._isOpen = false;
    this._options = [];
    this._selectedValue = null;
    this._selectedIndex = -1;
    
    // Bind event handlers
    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleTriggerKeyDown = this.handleTriggerKeyDown.bind(this);
    
    // Initialize component
    this.render();
    this.attachEventListeners();
  }

  // Define which attributes to observe for changes
  static get observedAttributes() {
    return ['options', 'disabled', 'position', 'trigger-text', 'value', 'placeholder'];
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'options') {
        this.parseOptions();
      }
      if (name === 'value') {
        this.updateSelectedOption();
      }
      this.render();
      this.attachEventListeners();
    }
  }

  // Parse options from attribute or property
  parseOptions() {
    const optionsAttr = this.getAttribute('options');
    if (optionsAttr) {
      try {
        this._options = JSON.parse(optionsAttr);
      } catch (e) {
        console.warn('Invalid options JSON in my-dropdown:', e);
        this._options = [];
      }
    }
  }

  // Update selected option based on value
  updateSelectedOption() {
    const value = this.getAttribute('value');
    if (value && this._options.length > 0) {
      const index = this._options.findIndex(option => option.value === value);
      this._selectedIndex = index;
      this._selectedValue = value;
    } else {
      this._selectedIndex = -1;
      this._selectedValue = null;
    }
  }

  // Getters and setters
  get options() {
    return this._options;
  }

  set options(value) {
    this._options = Array.isArray(value) ? value : [];
    this.setAttribute('options', JSON.stringify(this._options));
    this.updateSelectedOption();
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

  get position() {
    return this.getAttribute('position') || 'bottom';
  }

  set position(value) {
    this.setAttribute('position', value);
  }

  get triggerText() {
    return this.getAttribute('trigger-text') || '';
  }

  set triggerText(value) {
    this.setAttribute('trigger-text', value);
  }

  get value() {
    return this._selectedValue;
  }

  set value(value) {
    this._selectedValue = value;
    this.setAttribute('value', value || '');
    this.updateSelectedOption();
  }

  get placeholder() {
    return this.getAttribute('placeholder') || 'Select an option';
  }

  set placeholder(value) {
    this.setAttribute('placeholder', value);
  }

  get isOpen() {
    return this._isOpen;
  }

  // Open dropdown
  open() {
    if (this.disabled || this._isOpen) return;
    
    this._isOpen = true;
    const dropdown = this.shadowRoot.querySelector('.dropdown-menu');
    if (dropdown) {
      dropdown.classList.add('open');
      this.positionDropdown();
      
      // Focus first option or selected option
      const optionToFocus = this._selectedIndex >= 0 ? 
        this._selectedIndex : 0;
      this.focusOption(optionToFocus);
    }
    
    // Add outside click listener
    document.addEventListener('click', this.handleOutsideClick);
    
    // Emit open event
    this.dispatchEvent(new CustomEvent('open', {
      detail: { isOpen: true },
      bubbles: true
    }));
  }

  // Close dropdown
  close() {
    if (!this._isOpen) return;
    
    this._isOpen = false;
    const dropdown = this.shadowRoot.querySelector('.dropdown-menu');
    if (dropdown) {
      dropdown.classList.remove('open');
    }
    
    // Remove outside click listener
    document.removeEventListener('click', this.handleOutsideClick);
    
    // Return focus to trigger
    const trigger = this.shadowRoot.querySelector('.dropdown-trigger');
    if (trigger) {
      trigger.focus();
    }
    
    // Emit close event
    this.dispatchEvent(new CustomEvent('close', {
      detail: { isOpen: false },
      bubbles: true
    }));
  }

  // Toggle dropdown
  toggle() {
    if (this._isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  // Position dropdown relative to trigger
  positionDropdown() {
    const dropdown = this.shadowRoot.querySelector('.dropdown-menu');
    const trigger = this.shadowRoot.querySelector('.dropdown-trigger');
    
    if (!dropdown || !trigger) return;
    
    const triggerRect = trigger.getBoundingClientRect();
    const dropdownRect = dropdown.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    let position = this.position;
    
    // Auto positioning logic
    if (position === 'auto') {
      const spaceBelow = viewportHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;
      position = spaceBelow >= dropdownRect.height || spaceBelow >= spaceAbove ? 'bottom' : 'top';
    }
    
    // Apply positioning
    dropdown.classList.toggle('position-top', position === 'top');
    dropdown.classList.toggle('position-bottom', position === 'bottom');
    
    // Adjust horizontal position if needed
    const rightEdge = triggerRect.left + dropdownRect.width;
    if (rightEdge > viewportWidth - 16) {
      dropdown.classList.add('align-right');
    } else {
      dropdown.classList.remove('align-right');
    }
  }

  // Focus specific option
  focusOption(index) {
    const options = this.shadowRoot.querySelectorAll('.dropdown-option');
    if (options[index]) {
      // Remove focus from all options
      options.forEach(option => option.classList.remove('focused'));
      // Focus the target option
      options[index].classList.add('focused');
      options[index].focus();
      this._selectedIndex = index;
    }
  }

  // Event handlers
  handleTriggerClick(event) {
    if (this.disabled) return;
    event.preventDefault();
    this.toggle();
  }

  handleTriggerKeyDown(event) {
    if (this.disabled) return;
    
    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        event.preventDefault();
        this.open();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.open();
        if (this._options.length > 0) {
          this.focusOption(this._options.length - 1);
        }
        break;
      case 'Escape':
        this.close();
        break;
    }
  }

  handleOptionClick(event) {
    const optionElement = event.target.closest('.dropdown-option');
    if (!optionElement) return;
    
    const index = parseInt(optionElement.dataset.index);
    const option = this._options[index];
    
    if (option && !option.disabled) {
      this.selectOption(option, index);
      this.close();
    }
  }

  handleKeyDown(event) {
    if (!this._isOpen) return;
    
    const options = this.shadowRoot.querySelectorAll('.dropdown-option:not([disabled])');
    const currentIndex = Array.from(options).findIndex(option => 
      option.classList.contains('focused'));
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
        this.focusOption(Array.from(this.shadowRoot.querySelectorAll('.dropdown-option')).indexOf(options[nextIndex]));
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
        this.focusOption(Array.from(this.shadowRoot.querySelectorAll('.dropdown-option')).indexOf(options[prevIndex]));
        break;
        
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (currentIndex >= 0) {
          options[currentIndex].click();
        }
        break;
        
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
        
      case 'Home':
        event.preventDefault();
        if (options.length > 0) {
          this.focusOption(Array.from(this.shadowRoot.querySelectorAll('.dropdown-option')).indexOf(options[0]));
        }
        break;
        
      case 'End':
        event.preventDefault();
        if (options.length > 0) {
          this.focusOption(Array.from(this.shadowRoot.querySelectorAll('.dropdown-option')).indexOf(options[options.length - 1]));
        }
        break;
    }
  }

  handleOutsideClick(event) {
    if (!this.contains(event.target)) {
      this.close();
    }
  }

  // Select an option
  selectOption(option, index) {
    const oldValue = this._selectedValue;
    this._selectedValue = option.value;
    this._selectedIndex = index;
    this.setAttribute('value', this._selectedValue);
    
    // Execute action if provided
    if (option.action && typeof option.action === 'function') {
      option.action(option);
    }
    
    // Emit select event
    this.dispatchEvent(new CustomEvent('select', {
      detail: {
        value: this._selectedValue,
        oldValue: oldValue,
        option: option,
        index: index
      },
      bubbles: true
    }));
  }

  // Attach event listeners
  attachEventListeners() {
    const trigger = this.shadowRoot.querySelector('.dropdown-trigger');
    const dropdown = this.shadowRoot.querySelector('.dropdown-menu');
    
    if (trigger) {
      // Remove existing listeners
      trigger.removeEventListener('click', this.handleTriggerClick);
      trigger.removeEventListener('keydown', this.handleTriggerKeyDown);
      
      // Add new listeners
      trigger.addEventListener('click', this.handleTriggerClick);
      trigger.addEventListener('keydown', this.handleTriggerKeyDown);
    }
    
    if (dropdown) {
      // Remove existing listeners
      dropdown.removeEventListener('click', this.handleOptionClick);
      dropdown.removeEventListener('keydown', this.handleKeyDown);
      
      // Add new listeners
      dropdown.addEventListener('click', this.handleOptionClick);
      dropdown.addEventListener('keydown', this.handleKeyDown);
    }
  }

  // Connected callback
  connectedCallback() {
    this.parseOptions();
    this.updateSelectedOption();
  }

  // Disconnected callback
  disconnectedCallback() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  // Get display text for selected option
  getDisplayText() {
    if (this._selectedIndex >= 0 && this._options[this._selectedIndex]) {
      return this._options[this._selectedIndex].label;
    }
    return this.triggerText || this.placeholder;
  }

  // Render the component
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Component-specific variables using global variables */
          --_dropdown-min-width: 120px;
          --_dropdown-max-width: 320px;
          --_dropdown-trigger-height: var(--_global-input-height);
          --_dropdown-trigger-padding: var(--_global-input-padding-y) var(--_global-input-padding-x);
          --_dropdown-border-radius: var(--_global-border-radius-md);
          --_dropdown-border-color: var(--_global-color-outline-variant);
          --_dropdown-bg: var(--_global-color-surface-container);
          --_dropdown-text-color: var(--_global-color-on-surface);
          --_dropdown-shadow: var(--_global-elevation-2);
          --_dropdown-z-index: var(--_global-z-index-dropdown);
          
          display: inline-block;
          position: relative;
          min-width: var(--_dropdown-min-width);
        }

        :host([disabled]) {
          opacity: 0.6;
          cursor: not-allowed;
          pointer-events: none;
        }

        .dropdown-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: var(--_dropdown-trigger-height);
          padding: var(--_dropdown-trigger-padding);
          border: 1px solid var(--_dropdown-border-color);
          border-radius: var(--_dropdown-border-radius);
          background-color: var(--_global-color-surface);
          color: var(--_dropdown-text-color);
          font-size: var(--_global-font-size-md);
          font-family: var(--_global-font-family-sans);
          cursor: pointer;
          outline: none;
          transition: all var(--_global-transition-fast);
          user-select: none;
        }

        .dropdown-trigger:hover:not(:disabled) {
          border-color: var(--_global-color-outline);
          background-color: var(--_global-color-surface-container-low);
        }

        .dropdown-trigger:focus-visible {
          border-color: var(--_global-color-border-focus);
          box-shadow: 0 0 0 2px rgba(103, 80, 164, 0.2);
        }

        .dropdown-trigger.open {
          border-color: var(--_global-color-border-focus);
          box-shadow: 0 0 0 2px rgba(103, 80, 164, 0.2);
        }

        .trigger-text {
          flex: 1;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .trigger-text.placeholder {
          color: var(--_global-color-text-muted);
        }

        .dropdown-icon {
          margin-left: var(--_global-spacing-sm);
          font-size: 18px;
          color: var(--_global-color-on-surface-variant);
          transition: transform var(--_global-transition-fast);
        }

        .dropdown-trigger.open .dropdown-icon {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          min-width: 100%;
          max-width: var(--_dropdown-max-width);
          margin-top: 4px;
          background-color: var(--_dropdown-bg);
          border: 1px solid var(--_dropdown-border-color);
          border-radius: var(--_dropdown-border-radius);
          box-shadow: var(--_dropdown-shadow);
          z-index: var(--_dropdown-z-index);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-8px);
          transition: all var(--_global-transition-fast);
          max-height: 256px;
          overflow-y: auto;
        }

        .dropdown-menu.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-menu.position-top {
          top: auto;
          bottom: 100%;
          margin-top: 0;
          margin-bottom: 4px;
          transform: translateY(8px);
        }

        .dropdown-menu.position-top.open {
          transform: translateY(0);
        }

        .dropdown-menu.align-right {
          left: auto;
          right: 0;
        }

        .dropdown-option {
          display: flex;
          align-items: center;
          padding: var(--_global-spacing-sm) var(--_global-spacing-md);
          color: var(--_global-color-on-surface);
          font-size: var(--_global-font-size-md);
          cursor: pointer;
          transition: background-color var(--_global-transition-fast);
          outline: none;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }

        .dropdown-option:hover:not([disabled]) {
          background-color: rgba(103, 80, 164, var(--_global-state-layer-hover));
        }

        .dropdown-option.focused {
          background-color: rgba(103, 80, 164, var(--_global-state-layer-focus));
        }

        .dropdown-option.selected {
          background-color: rgba(103, 80, 164, var(--_global-state-layer-selected));
          color: var(--_global-color-primary);
        }

        .dropdown-option[disabled] {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }

        .dropdown-option-icon {
          margin-right: var(--_global-spacing-sm);
          font-size: 18px;
        }

        .dropdown-divider {
          height: 1px;
          background-color: var(--_global-color-outline-variant);
          margin: var(--_global-spacing-xs) 0;
        }

        /* Size variants */
        :host([size="sm"]) {
          --_dropdown-trigger-height: var(--_global-input-height-sm);
          --_dropdown-trigger-padding: 6px var(--_global-spacing-sm);
          --_dropdown-min-width: 100px;
        }

        :host([size="lg"]) {
          --_dropdown-trigger-height: var(--_global-input-height-lg);
          --_dropdown-trigger-padding: var(--_global-spacing-sm) var(--_global-spacing-md);
          --_dropdown-min-width: 140px;
        }
      </style>

      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

      <button 
        class="dropdown-trigger ${this._isOpen ? 'open' : ''}"
        type="button"
        ${this.disabled ? 'disabled' : ''}
        aria-expanded="${this._isOpen}"
        aria-haspopup="listbox"
        aria-label="${this.getAttribute('aria-label') || 'dropdown menu'}"
      >
        <slot name="trigger">
          <span class="trigger-text ${!this._selectedValue && !this.triggerText ? 'placeholder' : ''}">
            ${this.getDisplayText()}
          </span>
        </slot>
        <span class="material-icons dropdown-icon">expand_more</span>
      </button>

      <div 
        class="dropdown-menu ${this._isOpen ? 'open' : ''}"
        role="listbox"
        ${this._selectedValue ? `aria-activedescendant="option-${this._selectedIndex}"` : ''}
      >
        ${this._options.map((option, index) => {
          if (option.type === 'divider') {
            return '<div class="dropdown-divider"></div>';
          }
          
          return `
            <button
              class="dropdown-option ${this._selectedIndex === index ? 'selected' : ''}"
              role="option"
              id="option-${index}"
              data-index="${index}"
              ${option.disabled ? 'disabled' : ''}
              aria-selected="${this._selectedIndex === index}"
              tabindex="-1"
            >
              ${option.icon ? `<span class="material-icons dropdown-option-icon">${option.icon}</span>` : ''}
              ${option.label}
            </button>
          `;
        }).join('')}
      </div>
    `;
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-dropdown')) {
  customElements.define('my-dropdown', MyDropdown);
}