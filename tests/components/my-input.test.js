import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Set up DOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.customElements = dom.window.customElements;
global.HTMLElement = dom.window.HTMLElement;
global.Event = dom.window.Event;
global.CustomEvent = dom.window.CustomEvent;

// Import the component after setting up globals
import '../../src/components/my-input/my-input.js';

describe('my-input Component', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('Component Creation and Basic Functionality', () => {
    it('should create my-input element', () => {
      const input = document.createElement('my-input');
      expect(input).toBeDefined();
      expect(input.tagName.toLowerCase()).toBe('my-input');
    });

    it('should have shadow DOM', () => {
      const input = document.createElement('my-input');
      container.appendChild(input);
      expect(input.shadowRoot).toBeTruthy();
    });

    it('should have default attributes', () => {
      const input = document.createElement('my-input');
      container.appendChild(input);
      
      // Check for basic component structure
      expect(input.shadowRoot).toBeTruthy();
      expect(input.shadowRoot.innerHTML).toContain('input');
    });
  });

  describe('Input Types Support', () => {
    const requiredInputTypes = [
      'text', 'pattern', 'number', 'integer', 'date', 'datetime-local',
      'time', 'date-of-birth', 'select', 'dynamic-select', 'textarea',
      'checkbox', 'radio', 'email', 'password', 'url', 'tel'
    ];

    requiredInputTypes.forEach(type => {
      it(`should support ${type} input type`, () => {
        const input = document.createElement('my-input');
        input.setAttribute('type', type);
        input.setAttribute('label', `Test ${type}`);
        container.appendChild(input);

        expect(input.getAttribute('type')).toBe(type);
        expect(input.shadowRoot).toBeTruthy();
      });
    });
  });

  describe('Text Input Type', () => {
    it('should render text input correctly', () => {
      const input = document.createElement('my-input');
      input.setAttribute('type', 'text');
      input.setAttribute('label', 'Full Name');
      input.setAttribute('placeholder', 'Enter your name');
      container.appendChild(input);

      const shadowInput = input.shadowRoot.querySelector('input');
      expect(shadowInput).toBeTruthy();
      expect(shadowInput.type).toBe('text');
      expect(shadowInput.placeholder).toBe('Enter your name');
    });
  });

  describe('Email Input Type', () => {
    it('should render email input correctly', () => {
      const input = document.createElement('my-input');
      input.setAttribute('type', 'email');
      input.setAttribute('label', 'Email Address');
      container.appendChild(input);

      const shadowInput = input.shadowRoot.querySelector('input');
      expect(shadowInput).toBeTruthy();
      expect(shadowInput.type).toBe('email');
    });
  });

  describe('Number Input Type', () => {
    it('should render number input correctly', () => {
      const input = document.createElement('my-input');
      input.setAttribute('type', 'number');
      input.setAttribute('label', 'Age');
      input.setAttribute('min', '0');
      input.setAttribute('max', '120');
      container.appendChild(input);

      const shadowInput = input.shadowRoot.querySelector('input');
      expect(shadowInput).toBeTruthy();
      expect(shadowInput.type).toBe('number');
      expect(shadowInput.min).toBe('0');
      expect(shadowInput.max).toBe('120');
    });
  });

  describe('Integer Input Type', () => {
    it('should render integer input as number type with step=1', () => {
      const input = document.createElement('my-input');
      input.setAttribute('type', 'integer');
      input.setAttribute('label', 'Quantity');
      container.appendChild(input);

      const shadowInput = input.shadowRoot.querySelector('input');
      expect(shadowInput).toBeTruthy();
      expect(shadowInput.type).toBe('number');
      expect(shadowInput.step).toBe('1');
    });
  });

  describe('Date Input Types', () => {
    it('should render date input correctly', () => {
      const input = document.createElement('my-input');
      input.setAttribute('type', 'date');
      input.setAttribute('label', 'Birth Date');
      container.appendChild(input);

      const shadowInput = input.shadowRoot.querySelector('input');
      expect(shadowInput).toBeTruthy();
      expect(shadowInput.type).toBe('date');
    });

    it('should render datetime-local input correctly', () => {
      const input = document.createElement('my-input');
      input.setAttribute('type', 'datetime-local');
      input.setAttribute('label', 'Appointment');
      container.appendChild(input);

      const shadowInput = input.shadowRoot.querySelector('input');
      expect(shadowInput).toBeTruthy();
      expect(shadowInput.type).toBe('datetime-local');
    });

    it('should render time input correctly', () => {
      const input = document.createElement('my-input');
      input.setAttribute('type', 'time');
      input.setAttribute('label', 'Meeting Time');
      container.appendChild(input);

      const shadowInput = input.shadowRoot.querySelector('input');
      expect(shadowInput).toBeTruthy();
      expect(shadowInput.type).toBe('time');
    });

    it('should render date-of-birth as date input', () => {
      const input = document.createElement('my-input');
      input.setAttribute('type', 'date-of-birth');
      input.setAttribute('label', 'Date of Birth');
      container.appendChild(input);

      const shadowInput = input.shadowRoot.querySelector('input');
      expect(shadowInput).toBeTruthy();
      expect(shadowInput.type).toBe('date');
    });
  });

  describe('Pattern Input Type', () => {
    it('should render pattern input correctly', () => {
      const input = document.createElement('my-input');
      input.setAttribute('type', 'pattern');
      input.setAttribute('label', 'Product Code');
      input.setAttribute('pattern', '[A-Z]{3}[0-9]{3}');
      container.appendChild(input);

      const shadowInput = input.shadowRoot.querySelector('input');
      expect(shadowInput).toBeTruthy();
      expect(shadowInput.type).toBe('text');
      expect(shadowInput.pattern).toBe('[A-Z]{3}[0-9]{3}');
    });
  });

  describe('Textarea Input Type', () => {
    it('should render textarea correctly', () => {
      const input = document.createElement('my-input');
      input.setAttribute('type', 'textarea');
      input.setAttribute('label', 'Description');
      container.appendChild(input);

      const shadowTextarea = input.shadowRoot.querySelector('textarea');
      expect(shadowTextarea).toBeTruthy();
    });
  });

  describe('Select Input Type', () => {
    it('should render select with options', () => {
      const input = document.createElement('my-input');
      const schema = {
        type: 'select',
        label: 'Country',
        options: [
          { label: 'USA', value: 'US' },
          { label: 'Canada', value: 'CA' }
        ]
      };
      input.setAttribute('schema', JSON.stringify(schema));
      container.appendChild(input);

      const shadowSelect = input.shadowRoot.querySelector('select');
      expect(shadowSelect).toBeTruthy();
      
      const options = shadowSelect.querySelectorAll('option');
      expect(options.length).toBeGreaterThan(0);
    });
  });

  describe('Dynamic Select Input Type', () => {
    it('should render dynamic-select as text input with combobox role', () => {
      const input = document.createElement('my-input');
      input.setAttribute('type', 'dynamic-select');
      input.setAttribute('label', 'City');
      container.appendChild(input);

      const shadowInput = input.shadowRoot.querySelector('input');
      expect(shadowInput).toBeTruthy();
      expect(shadowInput.type).toBe('text');
      expect(shadowInput.getAttribute('role')).toBe('combobox');
    });
  });

  describe('Checkbox Input Type', () => {
    it('should render checkbox input correctly', () => {
      const input = document.createElement('my-input');
      input.setAttribute('type', 'checkbox');
      input.setAttribute('label', 'I agree');
      container.appendChild(input);

      const shadowInput = input.shadowRoot.querySelector('input[type="checkbox"]');
      expect(shadowInput).toBeTruthy();
      expect(shadowInput.type).toBe('checkbox');
    });
  });

  describe('Radio Input Type', () => {
    it('should render radio input correctly', () => {
      const input = document.createElement('my-input');
      input.setAttribute('type', 'radio');
      input.setAttribute('label', 'Option 1');
      input.setAttribute('name', 'test-radio');
      container.appendChild(input);

      const shadowInput = input.shadowRoot.querySelector('input[type="radio"]');
      expect(shadowInput).toBeTruthy();
      expect(shadowInput.type).toBe('radio');
    });
  });

  describe('Attributes and Properties', () => {
    it('should handle required attribute', () => {
      const input = document.createElement('my-input');
      input.setAttribute('type', 'text');
      input.setAttribute('label', 'Required Field');
      input.setAttribute('required', '');
      container.appendChild(input);

      const shadowInput = input.shadowRoot.querySelector('input');
      expect(shadowInput.required).toBe(true);
    });

    it('should handle disabled attribute', () => {
      const input = document.createElement('my-input');
      input.setAttribute('type', 'text');
      input.setAttribute('label', 'Disabled Field');
      input.setAttribute('disabled', '');
      container.appendChild(input);

      const shadowInput = input.shadowRoot.querySelector('input');
      expect(shadowInput.disabled).toBe(true);
    });

    it('should handle readonly attribute', () => {
      const input = document.createElement('my-input');
      input.setAttribute('type', 'text');
      input.setAttribute('label', 'Readonly Field');
      input.setAttribute('readonly', '');
      container.appendChild(input);

      const shadowInput = input.shadowRoot.querySelector('input');
      expect(shadowInput.readOnly).toBe(true);
    });

    it('should handle helper-text attribute', () => {
      const input = document.createElement('my-input');
      input.setAttribute('type', 'text');
      input.setAttribute('label', 'Field with Help');
      input.setAttribute('helper-text', 'This is helper text');
      container.appendChild(input);

      expect(input.shadowRoot.innerHTML).toContain('This is helper text');
    });
  });

  describe('Event Handling', () => {
    it('should emit input events', () => {
      const input = document.createElement('my-input');
      input.setAttribute('type', 'text');
      input.setAttribute('label', 'Test Input');
      container.appendChild(input);

      const mockHandler = vi.fn();
      input.addEventListener('input', mockHandler);

      const shadowInput = input.shadowRoot.querySelector('input');
      shadowInput.value = 'test';
      shadowInput.dispatchEvent(new Event('input', { bubbles: true }));

      // The component should process and re-emit the event
      expect(mockHandler).toHaveBeenCalled();
    });

    it('should emit change events', () => {
      const input = document.createElement('my-input');
      input.setAttribute('type', 'text');
      input.setAttribute('label', 'Test Input');
      container.appendChild(input);

      const mockHandler = vi.fn();
      input.addEventListener('change', mockHandler);

      const shadowInput = input.shadowRoot.querySelector('input');
      shadowInput.value = 'test';
      shadowInput.dispatchEvent(new Event('change', { bubbles: true }));

      // The component should process and re-emit the event
      expect(mockHandler).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes for text input', () => {
      const input = document.createElement('my-input');
      input.setAttribute('type', 'text');
      input.setAttribute('label', 'Accessible Input');
      container.appendChild(input);

      const shadowInput = input.shadowRoot.querySelector('input');
      expect(shadowInput.getAttribute('role')).toBe('textbox');
    });

    it('should have proper ARIA attributes for email input', () => {
      const input = document.createElement('my-input');
      input.setAttribute('type', 'email');
      input.setAttribute('label', 'Email Input');
      container.appendChild(input);

      const shadowInput = input.shadowRoot.querySelector('input');
      expect(shadowInput.getAttribute('role')).toBe('textbox');
      expect(shadowInput.getAttribute('inputmode')).toBe('email');
    });

    it('should have proper ARIA attributes for number input', () => {
      const input = document.createElement('my-input');
      input.setAttribute('type', 'number');
      input.setAttribute('label', 'Number Input');
      container.appendChild(input);

      const shadowInput = input.shadowRoot.querySelector('input');
      expect(shadowInput.getAttribute('role')).toBe('spinbutton');
    });
  });
});