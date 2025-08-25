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

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Drawer-specific variables using global semantic variables */
          --_drawer-width-sm: 240px;
          --_drawer-width-md: 320px;
          --_drawer-width-lg: 400px;
          --_drawer-width-xl: 480px;
          --_drawer-height-sm: 200px;
          --_drawer-height-md: 300px;
          --_drawer-height-lg: 400px;
          --_drawer-height-xl: 500px;
          
          --_drawer-width: var(--_drawer-width-${size});
          --_drawer-height: var(--_drawer-height-${size});
          
          --_drawer-background: var(--_global-color-surface-container);
          --_drawer-elevation: var(--_global-elevation-3);
          --_drawer-border-radius: var(--_global-border-radius-lg);
          
          --_drawer-backdrop-color: var(--_global-color-background-overlay);
          --_drawer-z-index: var(--_global-z-index-drawer);
          
          --_drawer-transition-duration: var(--_global-motion-duration-medium2);
          --_drawer-transition-easing: var(--_global-motion-easing-emphasized);
          
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: var(--_drawer-z-index);
          pointer-events: ${this.open ? 'auto' : 'none'};
          opacity: ${this.open ? '1' : '0'};
          transition: opacity var(--_drawer-transition-duration) var(--_drawer-transition-easing);
        }

        .drawer-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--_drawer-backdrop-color);
          opacity: ${this.open && showBackdrop ? '1' : '0'};
          visibility: ${this.open && showBackdrop ? 'visible' : 'hidden'};
          transition: all var(--_drawer-transition-duration) var(--_drawer-transition-easing);
          cursor: pointer;
        }

        .drawer-panel {
          position: absolute;
          background: var(--_drawer-background);
          box-shadow: var(--_drawer-elevation);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: transform var(--_drawer-transition-duration) var(--_drawer-transition-easing);
        }

        /* Position variants */
        .drawer-panel.position-left {
          top: 0;
          left: 0;
          bottom: 0;
          width: var(--_drawer-width);
          border-radius: 0 var(--_drawer-border-radius) var(--_drawer-border-radius) 0;
          transform: translateX(${this.open ? '0' : '-100%'});
        }

        .drawer-panel.position-right {
          top: 0;
          right: 0;
          bottom: 0;
          width: var(--_drawer-width);
          border-radius: var(--_drawer-border-radius) 0 0 var(--_drawer-border-radius);
          transform: translateX(${this.open ? '0' : '100%'});
        }

        .drawer-panel.position-top {
          top: 0;
          left: 0;
          right: 0;
          height: var(--_drawer-height);
          border-radius: 0 0 var(--_drawer-border-radius) var(--_drawer-border-radius);
          transform: translateY(${this.open ? '0' : '-100%'});
        }

        .drawer-panel.position-bottom {
          bottom: 0;
          left: 0;
          right: 0;
          height: var(--_drawer-height);
          border-radius: var(--_drawer-border-radius) var(--_drawer-border-radius) 0 0;
          transform: translateY(${this.open ? '0' : '100%'});
        }

        /* Size variants for different positions */
        :host([size="sm"]) .drawer-panel.position-left,
        :host([size="sm"]) .drawer-panel.position-right {
          width: var(--_drawer-width-sm);
        }

        :host([size="lg"]) .drawer-panel.position-left,
        :host([size="lg"]) .drawer-panel.position-right {
          width: var(--_drawer-width-lg);
        }

        :host([size="xl"]) .drawer-panel.position-left,
        :host([size="xl"]) .drawer-panel.position-right {
          width: var(--_drawer-width-xl);
        }

        :host([size="sm"]) .drawer-panel.position-top,
        :host([size="sm"]) .drawer-panel.position-bottom {
          height: var(--_drawer-height-sm);
        }

        :host([size="lg"]) .drawer-panel.position-top,
        :host([size="lg"]) .drawer-panel.position-bottom {
          height: var(--_drawer-height-lg);
        }

        :host([size="xl"]) .drawer-panel.position-top,
        :host([size="xl"]) .drawer-panel.position-bottom {
          height: var(--_drawer-height-xl);
        }

        /* Mode variants */
        :host([mode="push"]) {
          position: relative;
          z-index: auto;
        }

        :host([mode="push"]) .drawer-backdrop {
          display: none;
        }

        /* Header and content areas */
        .drawer-header {
          padding: var(--_global-spacing-lg);
          border-bottom: 1px solid var(--_global-color-outline-variant);
          background: var(--_global-color-surface-container-low);
          flex-shrink: 0;
        }

        .drawer-content {
          flex: 1;
          overflow-y: auto;
          padding: var(--_global-spacing-lg);
        }

        .drawer-footer {
          padding: var(--_global-spacing-lg);
          border-top: 1px solid var(--_global-color-outline-variant);
          background: var(--_global-color-surface-container-low);
          flex-shrink: 0;
        }

        /* Scrolling */
        .drawer-content::-webkit-scrollbar {
          width: 6px;
        }

        .drawer-content::-webkit-scrollbar-track {
          background: transparent;
        }

        .drawer-content::-webkit-scrollbar-thumb {
          background: var(--_global-color-outline-variant);
          border-radius: var(--_global-border-radius-sm);
        }

        .drawer-content::-webkit-scrollbar-thumb:hover {
          background: var(--_global-color-outline);
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .drawer-panel.position-left,
          .drawer-panel.position-right {
            width: min(var(--_drawer-width), calc(100vw - var(--_global-spacing-xl)));
          }
          
          .drawer-panel.position-top,
          .drawer-panel.position-bottom {
            height: min(var(--_drawer-height), calc(100vh - var(--_global-spacing-xl)));
          }
        }

        /* High contrast support */
        @media (prefers-contrast: high) {
          .drawer-panel {
            border: 2px solid var(--_global-color-outline);
          }
          
          .drawer-header,
          .drawer-footer {
            border-color: var(--_global-color-outline);
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          :host,
          .drawer-backdrop,
          .drawer-panel {
            transition: none;
          }
        }

        /* Focus management */
        .drawer-panel:focus {
          outline: none;
        }

        /* Persistent drawer styles */
        :host([persistent]) .drawer-backdrop {
          pointer-events: none;
          opacity: 0;
        }

        /* No backdrop mode */
        :host([backdrop="false"]) .drawer-backdrop {
          display: none;
        }
      </style>

      ${showBackdrop ? '<div class="drawer-backdrop"></div>' : ''}
      
      <div 
        class="drawer-panel position-${position}"
        role="dialog"
        aria-modal="${mode === 'overlay'}"
        aria-label="Drawer panel"
        tabindex="-1"
      >
        <div class="drawer-header">
          <slot name="header"></slot>
        </div>
        
        <div class="drawer-content">
          <slot></slot>
        </div>
        
        <div class="drawer-footer">
          <slot name="footer"></slot>
        </div>
      </div>
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