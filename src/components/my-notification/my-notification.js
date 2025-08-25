/**
 * MyntUI my-notification Component
 * Ephemeral, non-intrusive messages that provide feedback to users
 * Follows Material Design 3 principles and can be stacked/queued
 */

class MyNotification extends HTMLElement {
  constructor() {
    super();
    
    // Create Shadow DOM for encapsulation
    this.attachShadow({ mode: 'open' });
    
    // Bind event handlers
    this.handleClose = this.handleClose.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.close = this.close.bind(this);
    this.show = this.show.bind(this);
    
    // Timer management
    this.autoCloseTimer = null;
    this.isPaused = false;
    
    // Initialize component
    this.render();
    this.attachEventListeners();
  }

  // Define which attributes to observe for changes
  static get observedAttributes() {
    return ['message', 'type', 'duration', 'closeable', 'position', 'icon'];
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.attachEventListeners();
      
      if (name === 'duration' && this.isVisible) {
        this.startAutoClose();
      }
    }
  }

  // Getters and setters
  get message() {
    return this.getAttribute('message') || '';
  }

  set message(value) {
    this.setAttribute('message', value);
  }

  get type() {
    return this.getAttribute('type') || 'info';
  }

  set type(value) {
    this.setAttribute('type', value);
  }

  get duration() {
    return parseInt(this.getAttribute('duration')) || 5000;
  }

  set duration(value) {
    this.setAttribute('duration', value.toString());
  }

  get closeable() {
    return this.hasAttribute('closeable');
  }

  set closeable(value) {
    if (value) {
      this.setAttribute('closeable', '');
    } else {
      this.removeAttribute('closeable');
    }
  }

  get position() {
    return this.getAttribute('position') || 'top-right';
  }

  set position(value) {
    this.setAttribute('position', value);
  }

  get icon() {
    return this.getAttribute('icon') || this.getDefaultIcon();
  }

  set icon(value) {
    this.setAttribute('icon', value);
  }

  get isVisible() {
    return this.hasAttribute('visible');
  }

  // Get default icon based on type
  getDefaultIcon() {
    const icons = {
      success: 'check_circle',
      error: 'error',
      warning: 'warning',
      info: 'info'
    };
    return icons[this.type] || icons.info;
  }

  // Public methods
  show() {
    this.setAttribute('visible', '');
    this.injectIntoBody();
    this.startAutoClose();
    
    // Emit show event
    this.dispatchEvent(new CustomEvent('show', {
      detail: { 
        message: this.message, 
        type: this.type,
        duration: this.duration 
      },
      bubbles: true
    }));
  }

  hide() {
    this.removeAttribute('visible');
    this.clearAutoCloseTimer();
    
    // Remove from body after animation
    setTimeout(() => {
      if (this.parentElement === document.body) {
        document.body.removeChild(this);
      }
    }, 300);
    
    // Emit hide event
    this.dispatchEvent(new CustomEvent('hide', {
      detail: { 
        message: this.message, 
        type: this.type 
      },
      bubbles: true
    }));
  }

  // Internal methods
  injectIntoBody() {
    if (this.parentElement !== document.body) {
      document.body.appendChild(this);
    }
    
    // Position notification in stack
    this.positionInStack();
  }

  positionInStack() {
    const notifications = document.querySelectorAll('my-notification[visible]');
    const index = Array.from(notifications).indexOf(this);
    const offset = index * 80; // 80px per notification
    
    // Position based on configured position
    const positions = this.position.split('-');
    const vertical = positions[0]; // top or bottom
    const horizontal = positions[1] || 'right'; // left, right, center
    
    this.style.position = 'fixed';
    this.style.zIndex = '600'; // Use the notification z-index value
    
    if (vertical === 'top') {
      this.style.top = `${16 + offset}px`;
      this.style.bottom = 'auto';
    } else {
      this.style.bottom = `${16 + offset}px`;
      this.style.top = 'auto';
    }
    
    if (horizontal === 'left') {
      this.style.left = '16px';
      this.style.right = 'auto';
    } else if (horizontal === 'center') {
      this.style.left = '50%';
      this.style.right = 'auto';
      this.style.transform = 'translateX(-50%)';
    } else {
      this.style.right = '16px';
      this.style.left = 'auto';
    }
  }

  startAutoClose() {
    this.clearAutoCloseTimer();
    
    if (this.duration > 0 && !this.isPaused) {
      this.autoCloseTimer = setTimeout(() => {
        this.hide();
      }, this.duration);
    }
  }

  clearAutoCloseTimer() {
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
      this.autoCloseTimer = null;
    }
  }

  // Event handlers
  handleClose() {
    this.hide();
  }

  handleMouseEnter() {
    this.isPaused = true;
    this.clearAutoCloseTimer();
  }

  handleMouseLeave() {
    this.isPaused = false;
    this.startAutoClose();
  }

  // Attach event listeners
  attachEventListeners() {
    const closeButton = this.shadowRoot.querySelector('.notification-close');
    const container = this.shadowRoot.querySelector('.notification-container');
    
    if (closeButton) {
      closeButton.removeEventListener('click', this.handleClose);
      closeButton.addEventListener('click', this.handleClose);
    }
    
    if (container) {
      container.removeEventListener('mouseenter', this.handleMouseEnter);
      container.removeEventListener('mouseleave', this.handleMouseLeave);
      container.addEventListener('mouseenter', this.handleMouseEnter);
      container.addEventListener('mouseleave', this.handleMouseLeave);
    }
  }

  // Connected callback
  connectedCallback() {
    // Auto-show if it has a message
    if (this.message && !this.isVisible) {
      this.show();
    }
  }

  // Disconnected callback
  disconnectedCallback() {
    this.clearAutoCloseTimer();
  }

  // Static method for creating notifications programmatically
  static create(message, type = 'info', duration = 5000) {
    const notification = document.createElement('my-notification');
    notification.message = message;
    notification.type = type;
    notification.duration = duration;
    notification.closeable = true;
    notification.show();
    return notification;
  }

  // Static convenience methods
  static success(message, duration = 5000) {
    return MyNotification.create(message, 'success', duration);
  }

  static error(message, duration = 8000) {
    return MyNotification.create(message, 'error', duration);
  }

  static warning(message, duration = 6000) {
    return MyNotification.create(message, 'warning', duration);
  }

  static info(message, duration = 5000) {
    return MyNotification.create(message, 'info', duration);
  }

  // Render the component
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Notification-specific variables using global semantic variables */
          --_notification-background: var(--_global-color-surface-container);
          --_notification-text-color: var(--_global-color-on-surface);
          --_notification-border-radius: var(--_global-border-radius-lg);
          --_notification-elevation: var(--_global-elevation-3);
          --_notification-padding: var(--_global-spacing-md) var(--_global-spacing-lg);
          --_notification-min-width: 300px;
          --_notification-max-width: 400px;
          --_notification-gap: var(--_global-spacing-sm);
          
          /* Type-specific colors */
          --_notification-success-bg: var(--_global-color-success-container);
          --_notification-success-border: var(--_global-color-success);
          --_notification-success-icon: var(--_global-color-success);
          
          --_notification-error-bg: var(--_global-color-error-container);
          --_notification-error-border: var(--_global-color-error);
          --_notification-error-icon: var(--_global-color-error);
          
          --_notification-warning-bg: var(--_global-color-warning-container);
          --_notification-warning-border: var(--_global-color-warning);
          --_notification-warning-icon: var(--_global-color-warning);
          
          --_notification-info-bg: var(--_global-color-info-container);
          --_notification-info-border: var(--_global-color-info);
          --_notification-info-icon: var(--_global-color-info);
          
          /* Animation */
          --_notification-transition: all var(--_global-motion-duration-medium1) var(--_global-motion-easing-emphasized);
          
          display: ${this.isVisible ? 'block' : 'none'};
          position: fixed;
          z-index: var(--_global-z-index-notification);
        }

        .notification-container {
          min-width: var(--_notification-min-width);
          max-width: var(--_notification-max-width);
          background-color: var(--_notification-background);
          border-radius: var(--_notification-border-radius);
          box-shadow: var(--_notification-elevation);
          padding: var(--_notification-padding);
          display: flex;
          align-items: flex-start;
          gap: var(--_notification-gap);
          transition: var(--_notification-transition);
          border-left: 4px solid var(--_notification-info-border);
          cursor: pointer;
          position: relative;
          opacity: ${this.isVisible ? '1' : '0'};
          transform: translateX(${this.isVisible ? '0' : '100%'});
        }

        /* Type-specific styling */
        :host([type="success"]) .notification-container {
          background-color: var(--_notification-success-bg);
          border-left-color: var(--_notification-success-border);
        }

        :host([type="error"]) .notification-container {
          background-color: var(--_notification-error-bg);
          border-left-color: var(--_notification-error-border);
        }

        :host([type="warning"]) .notification-container {
          background-color: var(--_notification-warning-bg);
          border-left-color: var(--_notification-warning-border);
        }

        :host([type="info"]) .notification-container {
          background-color: var(--_notification-info-bg);
          border-left-color: var(--_notification-info-border);
        }

        .notification-icon {
          flex-shrink: 0;
          font-size: 20px;
          color: var(--_notification-info-icon);
          font-family: 'Material Icons';
          margin-top: 2px;
        }

        :host([type="success"]) .notification-icon {
          color: var(--_notification-success-icon);
        }

        :host([type="error"]) .notification-icon {
          color: var(--_notification-error-icon);
        }

        :host([type="warning"]) .notification-icon {
          color: var(--_notification-warning-icon);
        }

        :host([type="info"]) .notification-icon {
          color: var(--_notification-info-icon);
        }

        .notification-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: var(--_global-spacing-xs);
        }

        .notification-message {
          color: var(--_notification-text-color);
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-medium);
          line-height: var(--_global-line-height-normal);
          margin: 0;
        }

        .notification-close {
          flex-shrink: 0;
          background: none;
          border: none;
          color: var(--_notification-text-color);
          cursor: pointer;
          padding: 2px;
          border-radius: var(--_global-border-radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.7;
          transition: var(--_notification-transition);
          font-size: 16px;
          width: 20px;
          height: 20px;
          margin-top: 2px;
        }

        .notification-close:hover {
          opacity: 1;
          background-color: rgba(0, 0, 0, 0.1);
        }

        .notification-close:focus {
          outline: 2px solid var(--_global-color-primary);
          outline-offset: 2px;
        }

        /* Animation states */
        :host([visible]) .notification-container {
          animation: notification-enter var(--_global-motion-duration-medium1) var(--_global-motion-easing-emphasized) forwards;
        }

        @keyframes notification-enter {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Hover effects */
        .notification-container:hover {
          box-shadow: var(--_global-elevation-4);
          transform: translateY(-1px);
        }

        /* Progress bar for duration */
        .notification-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background-color: var(--_notification-info-border);
          border-radius: 0 0 var(--_notification-border-radius) var(--_notification-border-radius);
          animation: notification-progress ${this.duration}ms linear forwards;
        }

        :host([type="success"]) .notification-progress {
          background-color: var(--_notification-success-border);
        }

        :host([type="error"]) .notification-progress {
          background-color: var(--_notification-error-border);
        }

        :host([type="warning"]) .notification-progress {
          background-color: var(--_notification-warning-border);
        }

        @keyframes notification-progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        /* Responsive design */
        @media (max-width: 480px) {
          :host {
            left: 8px !important;
            right: 8px !important;
            transform: none !important;
          }
          
          .notification-container {
            min-width: auto;
            max-width: none;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .notification-container,
          .notification-progress {
            animation: none;
            transition: none;
          }
        }
      </style>

      <div class="notification-container" role="alert" aria-live="polite">
        <span class="notification-icon">${this.icon}</span>
        
        <div class="notification-content">
          <p class="notification-message">
            <slot>${this.message}</slot>
          </p>
        </div>
        
        ${this.closeable ? `
          <button 
            class="notification-close" 
            type="button"
            aria-label="Close notification"
          >
            ✕
          </button>
        ` : ''}
        
        ${this.duration > 0 && this.isVisible ? '<div class="notification-progress" aria-hidden="true"></div>' : ''}
      </div>
    `;
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-notification')) {
  customElements.define('my-notification', MyNotification);
}