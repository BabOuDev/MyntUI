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
    // Get size classes from global config
    const sizeClasses = {
      sm: 'w-96 max-w-sm',
      md: 'w-[600px] max-w-2xl', 
      lg: 'w-[800px] max-w-4xl',
      xl: 'w-[1000px] max-w-6xl'
    };

    const currentSizeClass = sizeClasses[this.size] || sizeClasses.md;
    const displayClass = this.open ? 'flex' : 'hidden';
    const backdropOpacity = this.open ? 'opacity-100' : 'opacity-0';
    const containerScale = this.open ? 'scale-100' : 'scale-90';
    const containerOpacity = this.open ? 'opacity-100' : 'opacity-0';
    const backdropCursor = this.closeOnBackdropClick ? 'cursor-pointer' : 'cursor-default';

    this.shadowRoot.innerHTML = `
      <div class="
        fixed inset-0 z-modal ${displayClass} items-center justify-center p-6
        backdrop-blur-sm transition-all duration-medium1 ease-standard
      ">
        <!-- Backdrop -->
        <div 
          class="
            absolute inset-0 bg-black/50 ${backdropOpacity}
            transition-opacity duration-medium1 ease-standard ${backdropCursor}
          " 
          aria-hidden="true"
        ></div>

        <!-- Modal Container -->
        <div 
          class="
            modal-container
            relative bg-white shadow-elevation4 rounded-xl border border-gray-300
            max-h-[90vh] ${currentSizeClass} overflow-hidden flex flex-col
            ${containerScale} ${containerOpacity}
            transform transition-all duration-300 ease-in-out
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="${this.title ? 'modal-title' : ''}"
          aria-describedby="modal-body"
          tabindex="0"
        >
          ${this.title ? `
          <!-- Modal Header -->
          <header class="
            flex items-center justify-between p-6 border-b border-gray-200
            bg-gray-50
          ">
            <h2 
              id="modal-title" 
              class="
                text-title-large font-semibold text-gray-900 
                m-0 leading-tight
              "
            >
              ${this.title}
            </h2>
            <button 
              class="
                bg-transparent border-none text-gray-500 cursor-pointer
                p-2 rounded-full flex items-center justify-center
                w-10 h-10 text-xl transition-all duration-medium1 ease-standard
                hover:bg-gray-200 hover:text-gray-900
                focus:outline-2 focus:outline-primary-600 focus:outline-offset-2
                focus-ring state-layer
              " 
              type="button" 
              aria-label="Close modal"
              tabindex="0"
            >
              ✕
            </button>
          </header>
          ` : ''}
          
          <!-- Modal Body -->
          <div 
            id="modal-body"
            class="
              p-6 flex-1 overflow-y-auto text-gray-900
              text-body-medium leading-normal
            "
          >
            <slot name="body">
              <slot></slot>
            </slot>
          </div>
          
          <!-- Modal Footer -->
          <footer class="
            p-6 border-t border-gray-200 bg-gray-50
            flex gap-4 justify-end items-center
          ">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>

      <style>
        /* Minimal CSS - leveraging TailwindCSS for styling */
        :host {
          font-family: system-ui, -apple-system, sans-serif;
        }

        /* Animation keyframes for modal entrance */
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

        /* Apply entrance animation when open */
        .modal-container {
          animation: modal-enter 300ms cubic-bezier(0.2, 0, 0, 1) forwards;
        }

        /* Accessibility - Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .modal-container {
            animation: none;
            transition: none;
          }
          
          * {
            transition-duration: 0ms !important;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .modal-container {
            border: 2px solid;
          }
        }

        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
          .modal-container {
            width: calc(100vw - 2rem) !important;
            max-width: none !important;
          }
        }
      </style>
    `;
  }
}

// Register the custom element using BaseComponent's registration helper
MyModal.define('my-modal');