/**
 * MyntUI my-dropdown Component - TailwindCSS Enhanced Version
 * A component that displays a list of options when clicked, typically used for navigation or actions
 * Enhanced version using MyntUIBaseComponent with TailwindCSS and Material Design 3 patterns
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';
import { globalConfig } from '../../config/global-config.js';

class MyDropdown extends MyntUIBaseComponent {
  constructor() {
    super();
    
    // Internal state
    this._isOpen = false;
    this._options = [];
    this._selectedValue = null;
    this._selectedIndex = -1;
    
    // Component-specific bindings
    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleTriggerKeyDown = this.handleTriggerKeyDown.bind(this);
    
    // Initialize with base component pattern
    this.log('Dropdown component initializing...');
  }

  // Extended observed attributes (inherits base ones)
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'options', 'position', 'trigger-text', 'value', 'placeholder', 'multiple', 'search'
    ];
  }

  // Component-specific attribute handling
  handleAttributeChange(name, oldValue, newValue) {
    super.handleAttributeChange(name, oldValue, newValue);
    
    switch (name) {
      case 'options':
        this.parseOptions();
        break;
      case 'value':
        this.updateSelectedOption();
        break;
      case 'disabled':
        if (this.disabled && this._isOpen) {
          this.close();
        }
        this.announceToScreenReader(
          `Dropdown ${this.disabled ? 'disabled' : 'enabled'}`,
          'polite'
        );
        break;
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
    this.positionDropdown();
    
    // Focus first option or selected option
    const optionToFocus = this._selectedIndex >= 0 ? this._selectedIndex : 0;
    this.focusOption(optionToFocus);
    
    // Re-render to update classes
    this.render();
    
    // Re-attach event listeners to include document listener
    this.attachEventListeners();
    
    // Use BaseComponent's standardized event emission
    this.emit('open', { isOpen: true });
    
    // Screen reader announcement
    this.announceToScreenReader('Dropdown menu opened', 'polite');
  }

  // Close dropdown
  close() {
    if (!this._isOpen) return;
    
    this._isOpen = false;
    
    // Re-render to update classes
    this.render();
    
    // Re-attach event listeners to remove document listener
    this.attachEventListeners();
    
    // Return focus to trigger
    const trigger = this.shadowRoot.querySelector('button');
    if (trigger) {
      trigger.focus();
    }
    
    // Use BaseComponent's standardized event emission
    this.emit('close', { isOpen: false });
    
    // Screen reader announcement
    this.announceToScreenReader('Dropdown menu closed', 'polite');
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
    const dropdown = this.shadowRoot.querySelector('[role="listbox"]');
    const trigger = this.shadowRoot.querySelector('button');
    
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
    
    // Apply positioning classes
    if (position === 'top') {
      dropdown.classList.add('top-auto', 'bottom-full', 'mt-0', 'mb-xs', 'origin-bottom');
      dropdown.classList.remove('top-full', 'mt-xs');
    } else {
      dropdown.classList.add('top-full', 'mt-xs');
      dropdown.classList.remove('top-auto', 'bottom-full', 'mt-0', 'mb-xs', 'origin-bottom');
    }
    
    // Adjust horizontal position if needed
    const rightEdge = triggerRect.left + dropdownRect.width;
    if (rightEdge > viewportWidth - 16) {
      dropdown.classList.add('left-auto', 'right-0');
      dropdown.classList.remove('left-0');
    } else {
      dropdown.classList.add('left-0');
      dropdown.classList.remove('left-auto', 'right-0');
    }
  }

  // Focus specific option
  focusOption(index) {
    const options = this.shadowRoot.querySelectorAll('[role="option"]');
    if (options[index]) {
      // Remove focus from all options
      options.forEach(option => {
        option.classList.remove('focused');
        option.classList.remove('bg-primary/8');
      });
      // Focus the target option
      options[index].classList.add('focused', 'bg-primary/8');
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
    const optionElement = event.target.closest('[role="option"]');
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
    
    const options = this.shadowRoot.querySelectorAll('[role="option"]:not([disabled])');
    const allOptions = this.shadowRoot.querySelectorAll('[role="option"]');
    const currentIndex = Array.from(options).findIndex(option => 
      option.classList.contains('focused'));
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
        this.focusOption(Array.from(allOptions).indexOf(options[nextIndex]));
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
        this.focusOption(Array.from(allOptions).indexOf(options[prevIndex]));
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
          this.focusOption(Array.from(allOptions).indexOf(options[0]));
        }
        break;
        
      case 'End':
        event.preventDefault();
        if (options.length > 0) {
          this.focusOption(Array.from(allOptions).indexOf(options[options.length - 1]));
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
    
    // Use BaseComponent's standardized event emission
    this.emit('select', {
      value: this._selectedValue,
      oldValue: oldValue,
      option: option,
      index: index
    });
  }

  // Standardized event listener attachment using BaseComponent patterns
  attachEventListeners() {
    // Clean up existing listeners first
    this.removeEventListeners();
    
    const listeners = [];
    
    // Add trigger listeners
    const trigger = this.shadowRoot.querySelector('button');
    if (trigger) {
      listeners.push({
        element: trigger,
        events: ['click'],
        handler: this.handleTriggerClick
      });
      
      listeners.push({
        element: trigger,
        events: ['keydown'],
        handler: this.handleTriggerKeyDown
      });
    }
    
    // Add dropdown menu listeners
    const dropdown = this.shadowRoot.querySelector('[role="listbox"]');
    if (dropdown) {
      listeners.push({
        element: dropdown,
        events: ['click'],
        handler: this.handleOptionClick
      });
      
      listeners.push({
        element: dropdown,
        events: ['keydown'],
        handler: this.handleKeyDown
      });
    }
    
    // Add document-level listener when dropdown is open
    if (this._isOpen) {
      listeners.push({
        element: document,
        events: ['click'],
        handler: this.handleOutsideClick
      });
    }
    
    // Use BaseComponent's addEventListeners method for proper cleanup
    if (listeners.length > 0) {
      this.addEventListeners(listeners);
    }
  }

  // Lifecycle methods using BaseComponent patterns
  onConnected() {
    this.log('Dropdown connected to DOM');
    this.parseOptions();
    this.updateSelectedOption();
  }

  onDisconnected() {
    this.log('Dropdown disconnected from DOM');
    
    // Close dropdown if open to prevent memory leaks
    if (this._isOpen) {
      this._isOpen = false;
    }
  }

  // Override connectedCallback to ensure proper initialization
  connectedCallback() {
    super.connectedCallback();
  }

  // Override disconnectedCallback to ensure proper cleanup
  disconnectedCallback() {
    super.disconnectedCallback();
  }

  // Get display text for selected option
  getDisplayText() {
    if (this._selectedIndex >= 0 && this._options[this._selectedIndex]) {
      return this._options[this._selectedIndex].label;
    }
    return this.triggerText || this.placeholder;
  }

  // Generate TailwindCSS classes for different states and sizes
  getTailwindClasses() {
    const size = this.size;
    const error = this.error;
    const disabled = this.disabled;
    const isOpen = this._isOpen;
    const config = globalConfig.get('theme.tailwind', {});

    const sizeConfig = config.sizes?.[size] || config.sizes?.md;
    const dropdownConfig = config.components?.dropdown || {};
    const stateConfig = config.states || {};

    return {
      container: [
        'relative inline-block min-w-28 font-sans',
        disabled && 'opacity-60 cursor-not-allowed pointer-events-none'
      ].filter(Boolean).join(' '),

      trigger: [
        'flex items-center justify-between w-full',
        sizeConfig?.input || 'h-input-md min-h-input-md px-md py-sm text-body-medium',
        'border border-outline-variant rounded-lg bg-surface-container-low',
        'text-surface-on-surface font-medium cursor-pointer select-none',
        'transition-all duration-short2 ease-standard shadow-elevation1 relative z-10',
        'hover:border-outline hover:bg-surface-container hover:shadow-elevation2',
        'focus-visible:border-primary focus-visible:border-2 focus-visible:bg-surface-container-high',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
        'before:absolute before:inset-0 before:bg-current before:opacity-0 before:transition-opacity before:rounded-lg before:pointer-events-none',
        'hover:before:opacity-state-hover active:before:opacity-state-pressed',
        isOpen && 'border-primary border-2 bg-surface-container-high shadow-elevation2',
        error && 'border-error focus-visible:border-error focus-visible:outline-error',
        disabled && 'opacity-60 bg-surface-variant border-outline cursor-not-allowed'
      ].filter(Boolean).join(' '),

      triggerText: [
        'flex-1 text-left overflow-hidden text-ellipsis whitespace-nowrap',
        (!this._selectedValue && !this.triggerText) && 'text-outline-variant'
      ].filter(Boolean).join(' '),

      dropdownIcon: [
        'ml-sm w-4 h-4 text-outline-variant flex-shrink-0 flex items-center justify-center',
        'transition-transform duration-short2 ease-emphasized',
        isOpen && 'rotate-180'
      ].filter(Boolean).join(' '),

      menu: [
        'absolute top-full left-0 right-0 min-w-full max-w-70 mt-xs z-dropdown',
        'bg-surface-container border border-outline-variant rounded-lg shadow-elevation3',
        'max-h-80 overflow-y-auto py-xs',
        'transition-all duration-medium1 ease-emphasized origin-top',
        isOpen ? 'opacity-100 visible scale-100 translate-y-0' : 'opacity-0 invisible scale-95 -translate-y-2',
        this.position === 'top' && 'top-auto bottom-full mt-0 mb-xs origin-bottom',
        this.position === 'top' && !isOpen && 'translate-y-2'
      ].filter(Boolean).join(' '),

      option: [
        'flex items-center w-full px-md py-sm mx-xs rounded-xs',
        'text-surface-on-surface text-body-medium cursor-pointer',
        'transition-colors duration-short1 border-0 bg-transparent text-left min-h-8',
        'hover:bg-primary/8 focus:bg-primary/12 focus:outline-none',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'
      ].filter(Boolean).join(' '),

      selectedOption: [
        'bg-primary/12 text-primary font-medium'
      ].join(' '),

      focusedOption: [
        'bg-primary/8'
      ].join(' '),

      divider: [
        'h-px bg-outline-variant my-xs'
      ].join(' '),

      optionIcon: [
        'mr-sm text-lg'
      ].join(' ')
    };
  }

  // Render the component with TailwindCSS
  render() {
    const classes = this.getTailwindClasses();

    this.shadowRoot.innerHTML = `
      <style>
        @import '/src/styles/tailwind.css';
        
        :host {
          display: inline-block;
        }

        /* Custom arrow icon using pure CSS */
        .dropdown-arrow::before {
          content: '';
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 5px solid currentColor;
          transition: inherit;
        }

        /* Enhanced focus management */
        .dropdown-option:focus,
        .dropdown-option.focused {
          outline: 2px solid theme(colors.primary.DEFAULT);
          outline-offset: -2px;
        }

        /* Accessibility enhancements */
        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            transform: none !important;
            animation: none !important;
          }
        }

        @media (prefers-contrast: high) {
          .dropdown-trigger {
            border-width: 2px;
          }
          .dropdown-option:focus {
            outline-width: 3px;
          }
        }

        /* Smooth scrollbar for dropdown menu */
        .dropdown-menu::-webkit-scrollbar {
          width: 6px;
        }
        .dropdown-menu::-webkit-scrollbar-track {
          background: transparent;
        }
        .dropdown-menu::-webkit-scrollbar-thumb {
          background: theme(colors.outline-variant);
          border-radius: 3px;
        }
        .dropdown-menu::-webkit-scrollbar-thumb:hover {
          background: theme(colors.outline);
        }
      </style>

      <div class="${classes.container}">
        <button 
          class="${classes.trigger}"
          type="button"
          ${this.disabled ? 'disabled' : ''}
          aria-expanded="${this._isOpen}"
          aria-haspopup="listbox"
          aria-label="${this.getAttribute('aria-label') || 'dropdown menu'}"
        >
          <slot name="trigger">
            <span class="${classes.triggerText}">
              ${this.getDisplayText()}
            </span>
          </slot>
          <span class="${classes.dropdownIcon}">
            <span class="dropdown-arrow"></span>
          </span>
        </button>

        <div 
          class="${classes.menu}"
          role="listbox"
          ${this._selectedValue ? `aria-activedescendant="option-${this._selectedIndex}"` : ''}
        >
          ${this._options.map((option, index) => {
            if (option.type === 'divider') {
              return `<div class="${classes.divider}"></div>`;
            }
            
            const isSelected = this._selectedIndex === index;
            const isFocused = false; // This will be managed by focusOption method
            
            return `
              <button
                class="${classes.option} ${isSelected ? classes.selectedOption : ''}"
                role="option"
                id="option-${index}"
                data-index="${index}"
                ${option.disabled ? 'disabled' : ''}
                aria-selected="${isSelected}"
                tabindex="-1"
              >
                ${option.icon ? `<span class="${classes.optionIcon}" aria-label="${option.icon}">${option.icon}</span>` : ''}
                ${option.label}
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }
}

// Register the custom element using BaseComponent's registration helper
MyDropdown.define('my-dropdown');