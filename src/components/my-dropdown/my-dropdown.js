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
    return ['options', 'disabled', 'position', 'trigger-text', 'value', 'placeholder', 'size', 'error', 'multiple', 'search'];
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

  get size() {
    return this.getAttribute('size') || 'md';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  get error() {
    return this.hasAttribute('error');
  }

  set error(value) {
    if (value) {
      this.setAttribute('error', '');
    } else {
      this.removeAttribute('error');
    }
  }

  get multiple() {
    return this.hasAttribute('multiple');
  }

  set multiple(value) {
    if (value) {
      this.setAttribute('multiple', '');
    } else {
      this.removeAttribute('multiple');
    }
  }

  get search() {
    return this.hasAttribute('search');
  }

  set search(value) {
    if (value) {
      this.setAttribute('search', '');
    } else {
      this.removeAttribute('search');
    }
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
          --_dropdown-min-width: 112px;
          --_dropdown-max-width: 280px;
          --_dropdown-trigger-height: var(--_global-input-height);
          --_dropdown-trigger-padding: var(--_global-spacing-sm) var(--_global-spacing-md);
          --_dropdown-border-radius: var(--_global-border-radius-sm);
          --_dropdown-menu-border-radius: var(--_global-border-radius-xs);
          --_dropdown-border-color: var(--_global-color-outline-variant);
          --_dropdown-border-color-hover: var(--_global-color-outline);
          --_dropdown-border-color-focus: var(--_global-color-primary);
          --_dropdown-trigger-bg: var(--_global-color-surface-container-low);
          --_dropdown-trigger-bg-hover: var(--_global-color-surface-container);
          --_dropdown-trigger-bg-focus: var(--_global-color-surface-container-high);
          --_dropdown-menu-bg: var(--_global-color-surface-container);
          --_dropdown-text-color: var(--_global-color-on-surface);
          --_dropdown-placeholder-color: var(--_global-color-on-surface-variant);
          --_dropdown-icon-color: var(--_global-color-on-surface-variant);
          --_dropdown-elevation: var(--_global-elevation-1);
          --_dropdown-elevation-hover: var(--_global-elevation-2);
          --_dropdown-menu-elevation: var(--_global-elevation-3);
          --_dropdown-z-index: var(--_global-z-index-dropdown);
          --_dropdown-transition: all var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          
          display: inline-block;
          position: relative;
          min-width: var(--_dropdown-min-width);
          font-family: var(--_global-font-family-sans);
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
          background-color: var(--_dropdown-trigger-bg);
          color: var(--_dropdown-text-color);
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-medium);
          font-family: var(--_global-font-family-sans);
          cursor: pointer;
          outline: none;
          transition: var(--_dropdown-transition);
          user-select: none;
          box-shadow: var(--_dropdown-elevation);
          position: relative;
          z-index: 1;
        }
        
        /* State layer for Material Design 3 */
        .dropdown-trigger::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: currentColor;
          opacity: 0;
          transition: opacity var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
          pointer-events: none;
          border-radius: inherit;
        }

        .dropdown-trigger:hover:not(:disabled)::before {
          opacity: var(--_global-state-layer-hover);
        }

        .dropdown-trigger:hover:not(:disabled) {
          border-color: var(--_dropdown-border-color-hover);
          background-color: var(--_dropdown-trigger-bg-hover);
          box-shadow: var(--_dropdown-elevation-hover);
        }
        
        .dropdown-trigger:active:not(:disabled)::before {
          opacity: var(--_global-state-layer-pressed);
        }

        .dropdown-trigger:focus-visible {
          border-color: var(--_dropdown-border-color-focus);
          border-width: 2px;
          background-color: var(--_dropdown-trigger-bg-focus);
          outline: 2px solid var(--_dropdown-border-color-focus);
          outline-offset: 2px;
        }

        .dropdown-trigger.open {
          border-color: var(--_dropdown-border-color-focus);
          border-width: 2px;
          background-color: var(--_dropdown-trigger-bg-focus);
          box-shadow: var(--_dropdown-elevation-hover);
        }

        .trigger-text {
          flex: 1;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .trigger-text.placeholder {
          color: var(--_dropdown-placeholder-color);
        }

        .dropdown-icon {
          margin-left: var(--_global-spacing-sm);
          font-size: 18px;
          color: var(--_dropdown-icon-color);
          transition: transform var(--_global-motion-duration-short2) var(--_global-motion-easing-emphasized);
          flex-shrink: 0;
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
          margin-top: var(--_global-spacing-xs);
          background-color: var(--_dropdown-menu-bg);
          border: 1px solid var(--_dropdown-border-color);
          border-radius: var(--_dropdown-menu-border-radius);
          box-shadow: var(--_dropdown-menu-elevation);
          z-index: var(--_dropdown-z-index);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-8px) scale(0.95);
          transition: all var(--_global-motion-duration-medium1) var(--_global-motion-easing-emphasized);
          max-height: 320px;
          overflow-y: auto;
          padding: var(--_global-spacing-xs) 0;
        }

        .dropdown-menu.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
        }

        .dropdown-menu.position-top {
          top: auto;
          bottom: 100%;
          margin-top: 0;
          margin-bottom: var(--_global-spacing-xs);
          transform: translateY(8px) scale(0.95);
        }

        .dropdown-menu.position-top.open {
          transform: translateY(0) scale(1);
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
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-normal);
          cursor: pointer;
          transition: background-color var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
          outline: none;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          min-height: 32px;
          border-radius: var(--_global-border-radius-xs);
          margin: 0 var(--_global-spacing-xs);
          position: relative;
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
          font-weight: var(--_global-font-weight-medium);
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

        /* Error state */
        :host([error]) {
          --_dropdown-border-color: var(--_global-color-error);
          --_dropdown-border-color-hover: var(--_global-color-error);
          --_dropdown-border-color-focus: var(--_global-color-error);
        }

        :host([error]) .dropdown-trigger {
          border-color: var(--_global-color-error);
        }

        :host([error]) .dropdown-trigger:focus-visible {
          outline-color: var(--_global-color-error);
        }

        :host([error]) .trigger-text {
          color: var(--_global-color-error);
        }

        /* Enhanced disabled state */
        :host([disabled]) .dropdown-trigger {
          opacity: 0.6;
          background-color: var(--_global-color-surface-variant);
          border-color: var(--_global-color-outline);
          cursor: not-allowed;
        }

        :host([disabled]) .trigger-text {
          color: var(--_global-color-outline);
        }

        /* Improved animations with reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .dropdown-menu,
          .dropdown-trigger,
          .dropdown-icon,
          .dropdown-option {
            transition: none !important;
          }
          
          .dropdown-trigger.open .dropdown-icon {
            transform: none;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .dropdown-trigger {
            border-width: 2px;
          }
          
          .dropdown-option:focus,
          .dropdown-option.focused {
            outline: 2px solid currentColor;
            outline-offset: -2px;
          }
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