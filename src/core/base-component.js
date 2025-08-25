/**
 * MyntUI BaseComponent
 * Base class for all MyntUI components providing common functionality,
 * consistent patterns, and standardized lifecycle management.
 */

export class MyntUIBaseComponent extends HTMLElement {
  constructor() {
    super();
    
    // Create Shadow DOM for encapsulation - standardized across all components
    this.attachShadow({ mode: 'open' });
    
    // Internal state management
    this._eventTargets = [];
    this._isConnected = false;
    this._isInitialized = false;
    this._debugMode = this.hasAttribute('debug') || window.MyntUI?.debug;
    
    // Bind common event handlers
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.createRipple = this.createRipple.bind(this);
    
    // Initialize logging
    this.log = this._createLogger();
    
    // Component initialization
    this._initializeComponent();
  }

  // Standardized observed attributes - components can override to add more
  static get observedAttributes() {
    return ['disabled', 'size', 'variant', 'loading', 'error', 'debug'];
  }

  // Centralized attribute change handling
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this._isInitialized) return;
    
    if (oldValue !== newValue) {
      this.log('Attribute changed:', { name, oldValue, newValue });
      this.handleAttributeChange(name, oldValue, newValue);
      this.requestUpdate();
    }
  }

  // Standard getters and setters for common attributes
  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    this.toggleAttribute('disabled', Boolean(value));
  }

  get loading() {
    return this.hasAttribute('loading');
  }

  set loading(value) {
    this.toggleAttribute('loading', Boolean(value));
  }

  get error() {
    return this.hasAttribute('error');
  }

  set error(value) {
    this.toggleAttribute('error', Boolean(value));
  }

  get size() {
    return this.getAttribute('size') || 'md';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  get variant() {
    return this.getAttribute('variant') || 'default';
  }

  set variant(value) {
    this.setAttribute('variant', value);
  }

  // Standardized event handling patterns
  handleAttributeChange(name, oldValue, newValue) {
    // Override in child components for specific attribute handling
    this.log('Base attribute change handler:', { name, oldValue, newValue });
  }

  handleResize() {
    // Override in child components that need resize handling
    this.log('Resize event handled');
  }

  handleKeyDown(event) {
    // Common keyboard patterns - override in child components
    if (event.key === 'Escape') {
      this.dispatchEvent(new CustomEvent('escape', { bubbles: true }));
    }
  }

  handleFocus() {
    // Common focus handling - override in child components
    this.classList.add('focused');
  }

  handleBlur() {
    // Common blur handling - override in child components
    this.classList.remove('focused');
  }

  // Standardized ripple effect implementation
  createRipple(event, container) {
    if (this.disabled || this.loading) return;
    
    const target = container || this.shadowRoot.querySelector('.ripple-container') || this.shadowRoot.firstElementChild;
    if (!target) return;

    // Remove existing ripples
    const existingRipples = target.querySelectorAll('.ripple');
    existingRipples.forEach(ripple => ripple.remove());

    // Create ripple element
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    // Calculate ripple position and size
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const radius = size / 2;

    let x, y;
    if (event && event.clientX !== undefined) {
      // Mouse/touch event - position at interaction point
      x = event.clientX - rect.left - radius;
      y = event.clientY - rect.top - radius;
    } else {
      // Keyboard activation - center ripple
      x = rect.width / 2 - radius;
      y = rect.height / 2 - radius;
    }

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-animation var(--_global-ripple-duration) var(--_global-ripple-easing);
      background-color: var(--_global-ripple-color-light);
      opacity: var(--_global-ripple-opacity-pressed);
      pointer-events: none;
      z-index: 1;
    `;

    target.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  // Standardized event listener management
  addEventListeners(listeners) {
    listeners.forEach(({ element, events, handler, options = {} }) => {
      events.forEach(event => {
        element.addEventListener(event, handler, options);
        this._eventTargets.push({ element, event, handler, options });
      });
    });
  }

  removeEventListeners() {
    this._eventTargets.forEach(({ element, event, handler, options }) => {
      element.removeEventListener(event, handler, options);
    });
    this._eventTargets = [];
  }

  // Standardized custom event emission
  emit(eventName, detail = {}, options = {}) {
    const defaultOptions = {
      bubbles: true,
      cancelable: true,
      composed: true
    };
    
    const event = new CustomEvent(eventName, {
      detail,
      ...defaultOptions,
      ...options
    });
    
    this.log('Emitting event:', { eventName, detail, options });
    return this.dispatchEvent(event);
  }

  // Update request system with debouncing
  requestUpdate() {
    if (this._updateRequested) return;
    
    this._updateRequested = true;
    requestAnimationFrame(() => {
      this._updateRequested = false;
      if (this._isConnected) {
        this.render();
        this.attachEventListeners();
      }
    });
  }

  // Standardized render method - override in child components
  render() {
    throw new Error('render() method must be implemented by child components');
  }

  // Standardized event listener attachment - override in child components
  attachEventListeners() {
    // Base implementation - override in child components
    this.log('Base attachEventListeners called - should be overridden');
  }

  // Utility methods for common patterns
  addClass(className) {
    this.classList.add(className);
  }

  removeClass(className) {
    this.classList.remove(className);
  }

  toggleClass(className, force) {
    this.classList.toggle(className, force);
  }

  hasClass(className) {
    return this.classList.contains(className);
  }

  // CSS custom property helpers
  setCSSProperty(property, value) {
    this.style.setProperty(property, value);
  }

  getCSSProperty(property) {
    return getComputedStyle(this).getPropertyValue(property);
  }

  // Animation helpers
  animate(keyframes, options = {}) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return Promise.resolve();
    }
    
    return this.animate(keyframes, {
      duration: 300,
      easing: 'ease-out',
      ...options
    }).finished;
  }

  // Focus management
  focusFirstElement() {
    const focusable = this.shadowRoot.querySelector('[tabindex]:not([tabindex="-1"]), button, input, select, textarea, [href]');
    if (focusable) {
      focusable.focus();
    }
  }

  // Accessibility helpers
  announceToScreenReader(message, priority = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  }

  // Standardized lifecycle methods
  _initializeComponent() {
    try {
      // Component-specific initialization
      this._isInitialized = true;
      this.log('Component initialized');
    } catch (error) {
      this.log('Error during initialization:', error);
      this._handleError(error, 'initialization');
    }
  }

  connectedCallback() {
    this._isConnected = true;
    this.log('Component connected to DOM');
    
    try {
      // Set up intersection observer for viewport-based optimizations
      this._setupIntersectionObserver();
      
      // Initial render
      this.requestUpdate();
      
      // Custom connected logic - override in child components
      this.onConnected?.();
    } catch (error) {
      this.log('Error during connection:', error);
      this._handleError(error, 'connection');
    }
  }

  disconnectedCallback() {
    this._isConnected = false;
    this.log('Component disconnected from DOM');
    
    try {
      // Cleanup event listeners
      this.removeEventListeners();
      
      // Cleanup intersection observer
      if (this._intersectionObserver) {
        this._intersectionObserver.disconnect();
        this._intersectionObserver = null;
      }
      
      // Custom disconnected logic - override in child components
      this.onDisconnected?.();
    } catch (error) {
      this.log('Error during disconnection:', error);
      this._handleError(error, 'disconnection');
    }
  }

  adoptedCallback() {
    this.log('Component moved to new document');
    this.onAdopted?.();
  }

  // Intersection observer for performance optimizations
  _setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      this._intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.onEnterViewport?.(entry);
          } else {
            this.onExitViewport?.(entry);
          }
        });
      }, { threshold: [0, 0.1, 0.5, 1] });
      
      this._intersectionObserver.observe(this);
    }
  }

  // Error handling
  _handleError(error, context) {
    this.log('Error occurred:', { error, context });
    this.emit('error', { error: error.message, context, component: this.tagName.toLowerCase() });
    
    // Set error state
    this.error = true;
  }

  // Logging system
  _createLogger() {
    const componentName = this.constructor.name || this.tagName.toLowerCase();
    
    return (...args) => {
      if (this._debugMode) {
        console.log(`[${componentName}]`, ...args);
      }
    };
  }

  // Validation helpers
  validateAttribute(name, value, validator) {
    if (typeof validator === 'function') {
      return validator(value);
    } else if (Array.isArray(validator)) {
      return validator.includes(value);
    } else if (validator instanceof RegExp) {
      return validator.test(value);
    }
    return true;
  }

  // Performance monitoring
  measurePerformance(name, fn) {
    if (!this._debugMode) return fn();
    
    const startTime = performance.now();
    const result = fn();
    const endTime = performance.now();
    
    this.log(`Performance [${name}]:`, `${(endTime - startTime).toFixed(2)}ms`);
    return result;
  }

  // Theme integration
  applyTheme(theme) {
    Object.entries(theme).forEach(([property, value]) => {
      this.setCSSProperty(property, value);
    });
  }

  // Component registration helper
  static define(tagName) {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, this);
    }
  }
}

// Global configuration
window.MyntUI = window.MyntUI || {};
window.MyntUI.BaseComponent = MyntUIBaseComponent;

// Export for module systems
export default MyntUIBaseComponent;