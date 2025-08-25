/**
 * Test setup for MyntUI web components
 * Configures testing environment for custom elements
 */

// Mock window.customElements if not available
if (!window.customElements) {
  window.customElements = {
    define: vi.fn(),
    get: vi.fn(),
    whenDefined: vi.fn(() => Promise.resolve()),
  };
}

// Mock ShadowRoot functionality for testing
if (!Element.prototype.attachShadow) {
  Element.prototype.attachShadow = function() {
    const shadowRoot = document.createElement('div');
    shadowRoot.innerHTML = '';
    this._shadowRoot = shadowRoot;
    return shadowRoot;
  };
  
  Object.defineProperty(Element.prototype, 'shadowRoot', {
    get: function() {
      return this._shadowRoot || null;
    }
  });
}

// Add custom matchers for web components
expect.extend({
  toHaveAttribute(received, attribute, value) {
    const hasAttribute = received.hasAttribute(attribute);
    const actualValue = received.getAttribute(attribute);
    
    if (!hasAttribute) {
      return {
        message: () => `Expected element to have attribute "${attribute}"`,
        pass: false,
      };
    }
    
    if (value !== undefined && actualValue !== value) {
      return {
        message: () => `Expected attribute "${attribute}" to be "${value}", but got "${actualValue}"`,
        pass: false,
      };
    }
    
    return {
      message: () => `Expected element not to have attribute "${attribute}"`,
      pass: true,
    };
  },
  
  toHaveProperty(received, property, value) {
    const hasProperty = property in received;
    const actualValue = received[property];
    
    if (!hasProperty) {
      return {
        message: () => `Expected element to have property "${property}"`,
        pass: false,
      };
    }
    
    if (value !== undefined && actualValue !== value) {
      return {
        message: () => `Expected property "${property}" to be "${value}", but got "${actualValue}"`,
        pass: false,
      };
    }
    
    return {
      message: () => `Expected element not to have property "${property}"`,
      pass: true,
    };
  }
});

// Global test utilities
window.createTestElement = (tagName, attributes = {}) => {
  const element = document.createElement(tagName);
  Object.entries(attributes).forEach(([key, value]) => {
    if (typeof value === 'boolean') {
      if (value) element.setAttribute(key, '');
    } else {
      element.setAttribute(key, value);
    }
  });
  return element;
};

window.waitForComponent = (element, timeout = 1000) => {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    
    const check = () => {
      // Force component rendering if needed
      if (typeof element.render === 'function') {
        element.render();
      }
      
      if (element.shadowRoot && element.shadowRoot.innerHTML.trim()) {
        resolve(element);
      } else if (Date.now() - start > timeout) {
        reject(new Error(`Component ${element.tagName} did not render within timeout. ShadowRoot: ${element.shadowRoot ? 'exists' : 'null'}, innerHTML: '${element.shadowRoot?.innerHTML || 'none'}'`));
      } else {
        setTimeout(check, 10); // Use setTimeout instead of requestAnimationFrame for tests
      }
    };
    
    // Give components a moment to initialize
    setTimeout(check, 10);
  });
};