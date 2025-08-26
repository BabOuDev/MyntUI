/**
 * MyntUI my-drawer Component
 * A sliding panel that can be positioned on any side of the viewport, containing supplementary content or navigation
 */

class MyDrawer extends HTMLElement {
  constructor() {
    super();
    
    // Create Shadow DOM for encapsulation
    this.attachShadow({ mode: 'open' });
    
    // Internal state
    this._isOpen = false;
    this._isAnimating = false;
    this._initialTouchX = null;
    this._initialTouchY = null;
    this._startTime = null;
    
    // Bind event handlers
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    
    // Initialize component
    this.render();
    this.attachEventListeners();
  }

  // Define which attributes to observe for changes
  static get observedAttributes() {
    return [
      'open', 'position', 'mode', 'size', 'backdrop', 'swipeable', 
      'persistent', 'close-on-escape', 'close-on-backdrop-click'
    ];
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'open') {
        this._isOpen = this.hasAttribute('open');
        this.updateVisibility();
      }
      this.render();
      this.attachEventListeners();
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

  get position() {
    return this.getAttribute('position') || 'left';
  }

  set position(value) {
    this.setAttribute('position', value);
  }

  get mode() {
    return this.getAttribute('mode') || 'overlay';
  }

  set mode(value) {
    this.setAttribute('mode', value);
  }

  get size() {
    return this.getAttribute('size') || 'md';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  get backdrop() {
    return this.getAttribute('backdrop') !== 'false';
  }

  set backdrop(value) {
    this.setAttribute('backdrop', value ? '' : 'false');
  }

  get swipeable() {
    return this.hasAttribute('swipeable');
  }

  set swipeable(value) {
    if (value) {
      this.setAttribute('swipeable', '');
    } else {
      this.removeAttribute('swipeable');
    }
  }

  get persistent() {
    return this.hasAttribute('persistent');
  }

  set persistent(value) {
    if (value) {
      this.setAttribute('persistent', '');
    } else {
      this.removeAttribute('persistent');
    }
  }

  get closeOnEscape() {
    return this.getAttribute('close-on-escape') !== 'false';
  }

  set closeOnEscape(value) {
    this.setAttribute('close-on-escape', value ? '' : 'false');
  }

  get closeOnBackdropClick() {
    return this.getAttribute('close-on-backdrop-click') !== 'false';
  }

  set closeOnBackdropClick(value) {
    this.setAttribute('close-on-backdrop-click', value ? '' : 'false');
  }

  // Public methods
  show() {
    if (this._isAnimating) return Promise.resolve();
    
    return new Promise((resolve) => {
      this._isAnimating = true;
      this.open = true;
      
      // Emit open event
      this.dispatchEvent(new CustomEvent('open', {
        detail: { position: this.position, mode: this.mode },
        bubbles: true,
        cancelable: true
      }));
      
      // Focus management
      this.trapFocus();
      
      // Resolve after transition
      setTimeout(() => {
        this._isAnimating = false;
        resolve();
      }, 300);
    });
  }

  hide() {
    if (this._isAnimating) return Promise.resolve();
    
    return new Promise((resolve) => {
      this._isAnimating = true;
      this.open = false;
      
      // Emit close event
      this.dispatchEvent(new CustomEvent('close', {
        detail: { position: this.position, mode: this.mode },
        bubbles: true,
        cancelable: true
      }));
      
      // Resolve after transition
      setTimeout(() => {
        this._isAnimating = false;
        this.restoreFocus();
        resolve();
      }, 300);
    });
  }

  toggle() {
    return this.open ? this.hide() : this.show();
  }

  // Focus management
  trapFocus() {
    const focusableElements = this.shadowRoot.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      this._previousFocus = document.activeElement;
      focusableElements[0].focus();
    }
  }

  restoreFocus() {
    if (this._previousFocus) {
      this._previousFocus.focus();
      this._previousFocus = null;
    }
  }

  // Event handlers
  handleBackdropClick(event) {
    if (event.target.classList.contains('drawer-backdrop') && this.closeOnBackdropClick) {
      event.preventDefault();
      this.hide();
    }
  }

  handleKeyDown(event) {
    if (event.key === 'Escape' && this.closeOnEscape && this.open) {
      event.preventDefault();
      this.hide();
    }
  }

  handleTouchStart(event) {
    if (!this.swipeable || this._isAnimating) return;
    
    const touch = event.touches[0];
    this._initialTouchX = touch.clientX;
    this._initialTouchY = touch.clientY;
    this._startTime = Date.now();
  }

  handleTouchMove(event) {
    if (!this.swipeable || !this._initialTouchX || this._isAnimating) return;
    
    const touch = event.touches[0];
    const deltaX = touch.clientX - this._initialTouchX;
    const deltaY = touch.clientY - this._initialTouchY;
    
    // Determine if this is a valid swipe gesture
    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
    const position = this.position;
    
    if (!isHorizontalSwipe && (position === 'left' || position === 'right')) return;
    if (isHorizontalSwipe && (position === 'top' || position === 'bottom')) return;
    
    // Prevent default scrolling for valid swipes
    event.preventDefault();
  }

  handleTouchEnd(event) {
    if (!this.swipeable || !this._initialTouchX || this._isAnimating) return;
    
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - this._initialTouchX;
    const deltaY = touch.clientY - this._initialTouchY;
    const deltaTime = Date.now() - this._startTime;
    
    // Reset touch state
    this._initialTouchX = null;
    this._initialTouchY = null;
    this._startTime = null;
    
    // Determine swipe direction and threshold
    const minSwipeDistance = 50;
    const maxSwipeTime = 300;
    const position = this.position;
    
    let shouldClose = false;
    
    if (deltaTime <= maxSwipeTime) {
      switch (position) {
        case 'left':
          shouldClose = deltaX < -minSwipeDistance;
          break;
        case 'right':
          shouldClose = deltaX > minSwipeDistance;
          break;
        case 'top':
          shouldClose = deltaY < -minSwipeDistance;
          break;
        case 'bottom':
          shouldClose = deltaY > minSwipeDistance;
          break;
      }
    }
    
    if (shouldClose && this.open) {
      this.hide();
    }
  }

  handleResize() {
    // Recalculate positioning on resize
    if (this.open) {
      this.updateVisibility();
    }
  }

  handleTransitionEnd(event) {
    if (event.target === event.currentTarget) {
      this._isAnimating = false;
    }
  }

  // Update visibility and inject into DOM
  updateVisibility() {
    if (this.open && !this.parentElement) {
      // Inject into body when opening
      document.body.appendChild(this);
    } else if (!this.open && this.parentElement === document.body) {
      // Remove from body when closing (after animation)
      setTimeout(() => {
        if (!this.open && this.parentElement === document.body) {
          document.body.removeChild(this);
        }
      }, 300);
    }
  }

  // Attach event listeners
  attachEventListeners() {
    const backdrop = this.shadowRoot.querySelector('.drawer-backdrop');
    const panel = this.shadowRoot.querySelector('.drawer-panel');
    
    if (backdrop) {
      backdrop.removeEventListener('click', this.handleBackdropClick);
      backdrop.addEventListener('click', this.handleBackdropClick);
    }
    
    if (panel) {
      panel.removeEventListener('transitionend', this.handleTransitionEnd);
      panel.addEventListener('transitionend', this.handleTransitionEnd);
    }
    
    // Global event listeners
    document.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('resize', this.handleResize);
    
    if (this.open) {
      document.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('resize', this.handleResize);
    }
    
    // Touch events for swipe gestures
    if (this.swipeable) {
      this.removeEventListener('touchstart', this.handleTouchStart);
      this.removeEventListener('touchmove', this.handleTouchMove);
      this.removeEventListener('touchend', this.handleTouchEnd);
      
      this.addEventListener('touchstart', this.handleTouchStart, { passive: false });
      this.addEventListener('touchmove', this.handleTouchMove, { passive: false });
      this.addEventListener('touchend', this.handleTouchEnd, { passive: false });
    }
  }

  // Render the component
  render() {
    const position = this.position;
    const mode = this.mode;
    const size = this.size;
    const showBackdrop = this.backdrop && mode === 'overlay';

    // Size classes for different positions
    const sizeClasses = {
      sm: {
        horizontal: 'w-60', // 240px
        vertical: 'h-50'    // 200px
      },
      md: {
        horizontal: 'w-80', // 320px
        vertical: 'h-75'    // 300px
      },
      lg: {
        horizontal: 'w-96', // 400px  
        vertical: 'h-96'    // 400px
      },
      xl: {
        horizontal: 'w-[480px]',
        vertical: 'h-[500px]'
      }
    };

    const isHorizontal = position === 'left' || position === 'right';
    const sizeClass = sizeClasses[size]?.[isHorizontal ? 'horizontal' : 'vertical'] || sizeClasses.md[isHorizontal ? 'horizontal' : 'vertical'];

    // Position-specific classes
    const positionClasses = {
      left: `left-0 top-0 bottom-0 ${sizeClass} rounded-r-xl`,
      right: `right-0 top-0 bottom-0 ${sizeClass} rounded-l-xl`,
      top: `top-0 left-0 right-0 ${sizeClass} rounded-b-xl`,
      bottom: `bottom-0 left-0 right-0 ${sizeClass} rounded-t-xl`
    };

    // Transform classes for animations
    const transformClasses = {
      left: this.open ? 'translate-x-0' : '-translate-x-full',
      right: this.open ? 'translate-x-0' : 'translate-x-full',
      top: this.open ? 'translate-y-0' : '-translate-y-full',
      bottom: this.open ? 'translate-y-0' : 'translate-y-full'
    };

    const hostVisibility = this.open ? 'block' : 'hidden';
    const backdropOpacity = this.open && showBackdrop ? 'opacity-100' : 'opacity-0';
    const backdropVisibility = this.open && showBackdrop ? 'visible' : 'invisible';
    const pointerEvents = this.open ? 'pointer-events-auto' : 'pointer-events-none';

    this.shadowRoot.innerHTML = `
      <div class="
        fixed inset-0 z-drawer ${hostVisibility} ${pointerEvents}
        ${backdropOpacity} transition-opacity duration-300 ease-emphasized
      ">
        ${showBackdrop ? `
        <!-- Backdrop -->
        <div 
          class="
            drawer-backdrop absolute inset-0 bg-black/50
            ${backdropOpacity} ${backdropVisibility}
            transition-all duration-300 ease-emphasized cursor-pointer
          "
        ></div>
        ` : ''}
        
        <!-- Drawer Panel -->
        <div 
          class="
            drawer-panel absolute bg-white shadow-elevation3 flex flex-col overflow-hidden
            ${positionClasses[position]} ${transformClasses[position]}
            transition-transform duration-300 ease-emphasized
          "
          role="dialog"
          aria-modal="${mode === 'overlay'}"
          aria-label="Drawer panel"
          tabindex="-1"
        >
          <!-- Header -->
          <div class="
            drawer-header p-6 border-b border-gray-200 bg-gray-50 flex-shrink-0
          ">
            <slot name="header"></slot>
          </div>
          
          <!-- Content -->
          <div class="
            drawer-content flex-1 overflow-y-auto p-6
            scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
            hover:scrollbar-thumb-gray-400
          ">
            <slot></slot>
          </div>
          
          <!-- Footer -->
          <div class="
            drawer-footer p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0
          ">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>

      <style>
        /* Minimal CSS for what TailwindCSS can't handle */
        :host {
          font-family: system-ui, -apple-system, sans-serif;
        }

        /* Custom scrollbar styles for WebKit browsers */
        .drawer-content::-webkit-scrollbar {
          width: 6px;
        }

        .drawer-content::-webkit-scrollbar-track {
          background: transparent;
        }

        .drawer-content::-webkit-scrollbar-thumb {
          background: rgb(209, 213, 219); /* gray-300 */
          border-radius: 3px;
        }

        .drawer-content::-webkit-scrollbar-thumb:hover {
          background: rgb(156, 163, 175); /* gray-400 */
        }

        /* Mode-specific adjustments */
        :host([mode="push"]) {
          position: relative;
          z-index: auto;
        }

        :host([mode="push"]) .drawer-backdrop {
          display: none;
        }

        /* Accessibility - Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .drawer-panel,
          .drawer-backdrop {
            transition: none;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .drawer-panel {
            border: 2px solid;
          }
          
          .drawer-header,
          .drawer-footer {
            border-color: currentColor;
          }
        }

        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
          .drawer-panel {
            width: min(var(--drawer-width, 320px), calc(100vw - 2rem)) !important;
            height: min(var(--drawer-height, 300px), calc(100vh - 2rem)) !important;
          }
        }

        /* Focus outline when panel receives focus */
        .drawer-panel:focus {
          outline: 2px solid rgb(99, 102, 241); /* indigo-500 */
          outline-offset: -2px;
        }

        /* Persistent drawer styles */
        :host([persistent]) .drawer-backdrop {
          pointer-events: none;
          opacity: 0;
        }

        /* No backdrop mode */
        :host([backdrop="false"]) .drawer-backdrop {
          display: none !important;
        }
      </style>
    `;

    // Update visibility state
    this.updateVisibility();
  }

  // Connected callback
  connectedCallback() {
    // Only inject into body if opened and not already in body
    if (this.open && this.parentElement !== document.body) {
      this.updateVisibility();
    }
  }

  // Cleanup when component is removed
  disconnectedCallback() {
    // Remove global event listeners
    document.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('resize', this.handleResize);
    
    // Restore focus
    this.restoreFocus();
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-drawer')) {
  customElements.define('my-drawer', MyDrawer);
}