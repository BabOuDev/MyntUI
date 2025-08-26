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
    // Type-specific styling classes
    const typeClasses = {
      success: 'bg-green-50 border-l-green-500 text-green-900',
      error: 'bg-red-50 border-l-red-500 text-red-900', 
      warning: 'bg-yellow-50 border-l-yellow-500 text-yellow-900',
      info: 'bg-blue-50 border-l-blue-500 text-blue-900'
    };

    // Icon color classes
    const iconClasses = {
      success: 'text-green-600',
      error: 'text-red-600',
      warning: 'text-yellow-600', 
      info: 'text-blue-600'
    };

    // Progress bar classes
    const progressClasses = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500'
    };

    const currentTypeClass = typeClasses[this.type] || typeClasses.info;
    const currentIconClass = iconClasses[this.type] || iconClasses.info;
    const currentProgressClass = progressClasses[this.type] || progressClasses.info;
    
    const displayClass = this.isVisible ? 'block' : 'hidden';
    const opacityClass = this.isVisible ? 'opacity-100' : 'opacity-0';
    const transformClass = this.isVisible ? 'translate-x-0' : 'translate-x-full';

    this.shadowRoot.innerHTML = `
      <div class="
        notification-container min-w-[300px] max-w-sm ${currentTypeClass} 
        rounded-lg shadow-elevation3 border-l-4 cursor-pointer relative
        flex items-start gap-3 p-4 transition-all duration-250 ease-in-out
        ${opacityClass} ${transformClass} transform
        hover:shadow-lg hover:-translate-y-px
      " 
      role="alert" 
      aria-live="polite">
        
        <!-- Notification Icon -->
        <span class="
          notification-icon flex-shrink-0 text-xl ${currentIconClass} mt-0.5
        ">${this.icon}</span>
        
        <!-- Content -->
        <div class="
          notification-content flex-1 flex flex-col gap-1
        ">
          <p class="
            notification-message text-sm font-medium leading-normal m-0
          ">
            <slot>${this.message}</slot>
          </p>
        </div>
        
        <!-- Close Button -->
        ${this.closeable ? `
          <button 
            class="
              notification-close flex-shrink-0 bg-transparent border-none
              cursor-pointer p-0.5 rounded-full flex items-center justify-center
              opacity-70 transition-all duration-250 ease-in-out
              text-base w-5 h-5 mt-0.5
              hover:opacity-100 hover:bg-black/10
              focus:outline-2 focus:outline-blue-500 focus:outline-offset-2
            " 
            type="button"
            aria-label="Close notification"
          >
            ✕
          </button>
        ` : ''}
        
        <!-- Progress Bar -->
        ${this.duration > 0 && this.isVisible ? `
          <div 
            class="
              notification-progress absolute bottom-0 left-0 h-0.5 
              ${currentProgressClass} rounded-b-lg animate-progress
            " 
            aria-hidden="true"
            style="animation-duration: ${this.duration}ms;"
          ></div>
        ` : ''}
      </div>

      <style>
        /* Minimal CSS for notification-specific functionality */
        :host {
          display: ${displayClass};
          position: fixed;
          z-index: 600; /* notification z-index from global config */
          font-family: system-ui, -apple-system, sans-serif;
        }

        /* Animation for notification entrance */
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

        /* Progress bar animation */
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        .animate-progress {
          animation: progress linear forwards;
        }

        /* Apply entrance animation when visible */
        :host([visible]) .notification-container {
          animation: notification-enter 250ms cubic-bezier(0.2, 0, 0, 1) forwards;
        }

        /* Responsive design for mobile */
        @media (max-width: 480px) {
          :host {
            left: 0.5rem !important;
            right: 0.5rem !important;
            transform: none !important;
          }
          
          .notification-container {
            min-width: auto;
            max-width: none;
          }
        }

        /* Accessibility - Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .notification-container,
          .notification-progress {
            animation: none;
            transition: none;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .notification-container {
            border: 2px solid;
          }
        }
      </style>
    `;
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-notification')) {
  customElements.define('my-notification', MyNotification);
}