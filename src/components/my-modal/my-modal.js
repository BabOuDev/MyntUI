/**
 * MyntUI my-modal Component
 * A dialog box that appears on top of the page, blocking interaction with main content
 * Follows Material Design 3 principles and is injected into body for proper z-index layering
 * Enhanced version using MyntUIBaseComponent for improved memory management and consistency
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';

class MyModal extends MyntUIBaseComponent {
  constructor() {
    super();
    
    // Component-specific bindings
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.handleEscapeKey = this.handleEscapeKey.bind(this);
    this.handleFocusTrap = this.handleFocusTrap.bind(this);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    
    // Focus management
    this.previousActiveElement = null;
    
    // Initialize with base component pattern
    this.log('Modal component initializing...');
  }

  // Extended observed attributes (inherits base ones)
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'open', 'title', 'close-on-backdrop-click', 'close-on-escape'
    ];
  }

  // Component-specific attribute handling
  handleAttributeChange(name, oldValue, newValue) {
    super.handleAttributeChange(name, oldValue, newValue);
    
    switch (name) {
      case 'open':
        if (this.open) {
          this.showModal();
        } else {
          this.hideModal();
        }
        this.announceToScreenReader(
          `Modal ${this.open ? 'opened' : 'closed'}`,
          'polite'
        );
        break;
    }
  }

  // Getters and setters
  get open() {
    return this.hasAttribute('open');
  }

  set open(value) {
    if (value) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }

  get title() {
    return this.getAttribute('title') || '';
  }

  set title(value) {
    this.setAttribute('title', value);
  }

  get size() {
    return this.getAttribute('size') || 'md';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  get closeOnBackdropClick() {
    return this.hasAttribute('close-on-backdrop-click');
  }

  set closeOnBackdropClick(value) {
    if (value) {
      this.setAttribute('close-on-backdrop-click', '');
    } else {
      this.removeAttribute('close-on-backdrop-click');
    }
  }

  get closeOnEscape() {
    return this.hasAttribute('close-on-escape');
  }

  set closeOnEscape(value) {
    if (value) {
      this.setAttribute('close-on-escape', '');
    } else {
      this.removeAttribute('close-on-escape');
    }
  }

  // Public methods
  show() {
    this.open = true;
  }

  hide() {
    this.open = false;
  }

  toggle() {
    this.open = !this.open;
  }

  // Internal modal management
  showModal() {
    // Store the currently focused element
    this.previousActiveElement = document.activeElement;
    
    // Inject modal into body for proper layering
    document.body.appendChild(this);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus the modal
    setTimeout(() => {
      const focusableElement = this.shadowRoot.querySelector('[tabindex="0"]') || 
                              this.shadowRoot.querySelector('button') ||
                              this.shadowRoot.querySelector('input');
      if (focusableElement) {
        focusableElement.focus();
      }
    }, 100);

    // Use BaseComponent's standardized event emission
    this.emit('open', {
      title: this.title,
      size: this.size
    });
  }

  hideModal() {
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Restore focus to previous element
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
      this.previousActiveElement = null;
    }
    
    // Remove modal from body if it was injected
    if (this.parentElement === document.body) {
      document.body.removeChild(this);
    }

    // Use BaseComponent's standardized event emission
    this.emit('close', {
      title: this.title,
      size: this.size
    });
  }

  // Event handlers
  handleBackdropClick(event) {
    if (event.target.classList.contains('modal-backdrop') && this.closeOnBackdropClick) {
      this.hide();
    }
  }

  handleEscapeKey(event) {
    if (event.key === 'Escape' && this.closeOnEscape && this.open) {
      event.preventDefault();
      this.hide();
    }
  }

  handleFocusTrap(event) {
    if (!this.open) return;

    const focusableElements = this.shadowRoot.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  }

  // Standardized event listener attachment using BaseComponent patterns
  attachEventListeners() {
    // Clean up existing listeners first
    this.removeEventListeners();
    
    const listeners = [];
    
    // Add backdrop click listener
    const backdrop = this.shadowRoot.querySelector('.modal-backdrop');
    if (backdrop) {
      listeners.push({
        element: backdrop,
        events: ['click'],
        handler: this.handleBackdropClick
      });
    }

    // Add close button listener
    const closeButton = this.shadowRoot.querySelector('.modal-close-button');
    if (closeButton) {
      listeners.push({
        element: closeButton,
        events: ['click'],
        handler: this.hide
      });
    }
    
    // Add document-level listeners when modal is open
    if (this.open) {
      listeners.push({
        element: document,
        events: ['keydown'],
        handler: this.handleEscapeKey
      });
      
      listeners.push({
        element: document,
        events: ['keydown'],
        handler: this.handleFocusTrap
      });
    }
    
    // Use BaseComponent's addEventListeners method for proper cleanup
    if (listeners.length > 0) {
      this.addEventListeners(listeners);
    }
  }

  // Lifecycle methods using BaseComponent patterns
  onConnected() {
    this.log('Modal connected to DOM');
    if (this.open) {
      this.showModal();
    }
  }

  onDisconnected() {
    this.log('Modal disconnected from DOM');
    
    // Restore body scroll if modal is being removed
    if (this.open) {
      document.body.style.overflow = '';
    }
    
    // Restore focus if needed
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
      this.previousActiveElement = null;
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

  // Render the component
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Modal-specific variables using global semantic variables */
          --_modal-backdrop-color: var(--_global-color-background-overlay);
          --_modal-background: var(--_global-color-surface);
          --_modal-border-radius: var(--_global-border-radius-lg);
          --_modal-elevation: var(--_global-elevation-5);
          --_modal-padding: var(--_global-spacing-lg);
          --_modal-header-padding: var(--_global-spacing-lg) var(--_global-spacing-lg) var(--_global-spacing-md) var(--_global-spacing-lg);
          --_modal-footer-padding: var(--_global-spacing-md) var(--_global-spacing-lg) var(--_global-spacing-lg) var(--_global-spacing-lg);
          --_modal-gap: var(--_global-spacing-md);
          
          /* Size variants */
          --_modal-width-sm: 400px;
          --_modal-width-md: 600px;
          --_modal-width-lg: 800px;
          --_modal-width-xl: 1000px;
          --_modal-max-width: 90vw;
          --_modal-max-height: 90vh;
          
          /* Animation */
          --_modal-transition: all var(--_global-motion-duration-medium2) var(--_global-motion-easing-emphasized);
          --_modal-backdrop-transition: opacity var(--_global-motion-duration-medium1) var(--_global-motion-easing-standard);
          
          /* Z-index */
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: var(--_global-z-index-modal);
          
          /* Display management */
          display: ${this.open ? 'flex' : 'none'};
          align-items: center;
          justify-content: center;
          padding: var(--_global-spacing-lg);
        }

        .modal-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--_modal-backdrop-color);
          opacity: ${this.open ? '1' : '0'};
          transition: var(--_modal-backdrop-transition);
          cursor: ${this.closeOnBackdropClick ? 'pointer' : 'default'};
        }

        .modal-container {
          position: relative;
          background-color: var(--_modal-background);
          border-radius: var(--_modal-border-radius);
          box-shadow: var(--_modal-elevation);
          max-width: var(--_modal-max-width);
          max-height: var(--_modal-max-height);
          width: var(--_modal-width-md);
          transform: ${this.open ? 'scale(1)' : 'scale(0.9)'};
          opacity: ${this.open ? '1' : '0'};
          transition: var(--_modal-transition);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* Size variants */
        :host([size="sm"]) .modal-container {
          width: var(--_modal-width-sm);
        }

        :host([size="lg"]) .modal-container {
          width: var(--_modal-width-lg);
        }

        :host([size="xl"]) .modal-container {
          width: var(--_modal-width-xl);
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--_modal-header-padding);
          border-bottom: 1px solid var(--_global-color-outline-variant);
          background-color: var(--_global-color-surface-container-low);
        }

        .modal-title {
          font-size: var(--_global-font-size-xl);
          font-weight: var(--_global-font-weight-semibold);
          color: var(--_global-color-on-surface);
          margin: 0;
          line-height: var(--_global-line-height-tight);
        }

        .modal-close-button {
          background: none;
          border: none;
          color: var(--_global-color-on-surface-variant);
          cursor: pointer;
          padding: var(--_global-spacing-sm);
          border-radius: var(--_global-border-radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--_modal-transition);
          font-size: 24px;
          width: 40px;
          height: 40px;
        }

        .modal-close-button:hover {
          background-color: var(--_global-color-surface-variant);
          color: var(--_global-color-on-surface);
        }

        .modal-close-button:focus {
          outline: 2px solid var(--_global-color-primary);
          outline-offset: 2px;
        }

        .modal-body {
          padding: var(--_modal-padding);
          flex: 1;
          overflow-y: auto;
          color: var(--_global-color-on-surface);
          font-size: var(--_global-font-size-md);
          line-height: var(--_global-line-height-normal);
        }

        .modal-footer {
          padding: var(--_modal-footer-padding);
          border-top: 1px solid var(--_global-color-outline-variant);
          background-color: var(--_global-color-surface-container-low);
          display: flex;
          gap: var(--_modal-gap);
          justify-content: flex-end;
          align-items: center;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          :host {
            padding: var(--_global-spacing-md);
          }
          
          .modal-container {
            width: 100%;
            max-width: none;
            margin: 0;
          }
          
          .modal-header {
            padding: var(--_global-spacing-md);
          }
          
          .modal-body {
            padding: var(--_global-spacing-md);
          }
          
          .modal-footer {
            padding: var(--_global-spacing-md);
            flex-wrap: wrap;
          }
        }

        /* Animation for entering/leaving */
        @media (prefers-reduced-motion: no-preference) {
          :host([open]) .modal-container {
            animation: modal-enter var(--_global-motion-duration-medium2) var(--_global-motion-easing-emphasized) forwards;
          }
        }

        @keyframes modal-enter {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .modal-container,
          .modal-backdrop {
            transition: none;
          }
        }
      </style>

      <div class="modal-backdrop" aria-hidden="true"></div>
      <div 
        class="modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-body"
        tabindex="0"
      >
        ${this.title ? `
        <header class="modal-header">
          <h2 class="modal-title" id="modal-title">${this.title}</h2>
          <button 
            class="modal-close-button" 
            type="button" 
            aria-label="Close modal"
            tabindex="0"
          >
            ✕
          </button>
        </header>
        ` : ''}
        
        <div class="modal-body" id="modal-body">
          <slot name="body">
            <slot></slot>
          </slot>
        </div>
        
        <footer class="modal-footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    `;
  }
}

// Register the custom element using BaseComponent's registration helper
MyModal.define('my-modal');