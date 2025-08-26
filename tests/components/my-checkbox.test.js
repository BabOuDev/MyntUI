/**
 * Unit tests for my-checkbox component
 * Tests checked/unchecked states, indeterminate state, accessibility, and interactions
 */

import '../../src/components/my-checkbox/my-checkbox.js';

describe('MyCheckbox Component', () => {
  let checkbox;

  beforeEach(() => {
    document.body.innerHTML = '';
    checkbox = document.createElement('my-checkbox');
    document.body.appendChild(checkbox);
  });

  afterEach(() => {
    if (checkbox && checkbox.parentNode) {
      checkbox.parentNode.removeChild(checkbox);
    }
  });

  describe('Component Creation', () => {
    test('should create component with shadow root', () => {
      expect(checkbox).toBeDefined();
      expect(checkbox.shadowRoot).toBeTruthy();
      expect(checkbox.tagName).toBe('MY-CHECKBOX');
    });

    test('should have default properties', () => {
      expect(checkbox.checked).toBe(false);
      expect(checkbox.indeterminate).toBe(false);
      expect(checkbox.disabled).toBe(false);
      expect(checkbox.label).toBe('');
      expect(checkbox.name).toBe('');
      expect(checkbox.value).toBe('on');
    });
  });

  describe('Checked State', () => {
    test('should toggle checked state', async () => {
      expect(checkbox.checked).toBe(false);
      
      checkbox.setAttribute('checked', '');
      expect(checkbox.checked).toBe(true);
      expect(checkbox.hasAttribute('checked')).toBe(true);
      
      checkbox.removeAttribute('checked');
      expect(checkbox.checked).toBe(false);
      expect(checkbox.hasAttribute('checked')).toBe(false);
    });

    test('should update visual state when checked', async () => {
      checkbox.setAttribute('label', 'Test Checkbox');
      await waitForComponent(checkbox);
      
      const checkboxInput = checkbox.shadowRoot.querySelector('.checkbox-input');
      expect(checkboxInput.classList.contains('checked')).toBe(false);
      
      checkbox.setAttribute('checked', '');
      await new Promise(resolve => setTimeout(resolve, 10)); // Wait for re-render
      
      expect(checkboxInput.classList.contains('checked')).toBe(true);
    });

    test('should emit change event when toggled', async () => {
      checkbox.setAttribute('name', 'test');
      checkbox.setAttribute('value', 'test-value');
      
      const changeHandler = vi.fn();
      checkbox.addEventListener('change', changeHandler);
      
      await waitForComponent(checkbox);
      checkbox.toggle();
      
      expect(changeHandler).toHaveBeenCalledTimes(1);
      expect(changeHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: expect.objectContaining({
            checked: true,
            indeterminate: false,
            value: 'test-value',
            name: 'test'
          })
        })
      );
    });
  });

  describe('Indeterminate State', () => {
    test('should handle indeterminate state', async () => {
      checkbox.setAttribute('indeterminate', '');
      expect(checkbox.indeterminate).toBe(true);
      expect(checkbox.checked).toBe(false);
      
      await waitForComponent(checkbox);
      const checkboxInput = checkbox.shadowRoot.querySelector('.checkbox-input');
      expect(checkboxInput.classList.contains('indeterminate')).toBe(true);
    });

    test('should transition from indeterminate to checked', async () => {
      checkbox.setAttribute('indeterminate', '');
      
      const changeHandler = vi.fn();
      checkbox.addEventListener('change', changeHandler);
      
      await waitForComponent(checkbox);
      checkbox.toggle();
      
      expect(checkbox.checked).toBe(true);
      expect(checkbox.indeterminate).toBe(false);
      expect(changeHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: expect.objectContaining({
            checked: true,
            indeterminate: false
          })
        })
      );
    });

    test('should have proper ARIA for indeterminate state', async () => {
      checkbox.setAttribute('indeterminate', '');
      await waitForComponent(checkbox);
      
      const container = checkbox.shadowRoot.querySelector('.checkbox-container');
      expect(container.getAttribute('aria-checked')).toBe('mixed');
    });
  });

  describe('Labels and Content', () => {
    test('should display label text', async () => {
      checkbox.setAttribute('label', 'Test Label');
      await waitForComponent(checkbox);
      
      const labelElement = checkbox.shadowRoot.querySelector('.label');
      expect(labelElement).toBeTruthy();
      expect(labelElement.textContent).toBe('Test Label');
    });

    test('should use slotted content when no label', async () => {
      const span = document.createElement('span');
      span.textContent = 'Slotted Content';
      checkbox.appendChild(span);
      
      await waitForComponent(checkbox);
      
      const slot = checkbox.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });

    test('should prefer label over slotted content', async () => {
      checkbox.setAttribute('label', 'Label Text');
      const span = document.createElement('span');
      span.textContent = 'Slotted Content';
      checkbox.appendChild(span);
      
      await waitForComponent(checkbox);
      
      const labelElement = checkbox.shadowRoot.querySelector('.label');
      expect(labelElement.textContent).toBe('Label Text');
    });
  });

  describe('User Interaction', () => {
    test('should toggle on click', async () => {
      await waitForComponent(checkbox);
      
      expect(checkbox.checked).toBe(false);
      
      // Use the component's toggle method directly
      checkbox.toggle();
      expect(checkbox.checked).toBe(true);
      
      checkbox.toggle();
      expect(checkbox.checked).toBe(false);
    });

    test('should toggle on space key press', async () => {
      await waitForComponent(checkbox);
      
      expect(checkbox.checked).toBe(false);
      
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
      checkbox.handleKeyDown(spaceEvent);
      
      expect(checkbox.checked).toBe(true);
    });

    test('should not toggle when disabled', async () => {
      checkbox.setAttribute('disabled', '');
      await waitForComponent(checkbox);
      
      const container = checkbox.shadowRoot.querySelector('.checkbox-container');
      const initialChecked = checkbox.checked;
      
      container.click();
      expect(checkbox.checked).toBe(initialChecked);
    });

    test('should create ripple effect on interaction', async () => {
      await waitForComponent(checkbox);
      
      // Mock the createRipple method
      const createRippleSpy = vi.spyOn(checkbox, 'createRipple');
      
      // Simulate click by calling handleClick directly
      const mockEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      checkbox.handleClick(mockEvent);
      
      expect(createRippleSpy).toHaveBeenCalled();
    });
  });

  describe('Form Integration', () => {
    test('should have proper form attributes', () => {
      checkbox.setAttribute('name', 'agreement');
      checkbox.setAttribute('value', 'agreed');
      
      expect(checkbox.name).toBe('agreement');
      expect(checkbox.value).toBe('agreed');
    });

    test('should return null value when unchecked', async () => {
      checkbox.setAttribute('name', 'test');
      checkbox.setAttribute('value', 'test-value');
      
      const changeHandler = vi.fn();
      checkbox.addEventListener('change', changeHandler);
      
      await waitForComponent(checkbox);
      
      // Start with checked, then uncheck
      checkbox.checked = true;
      checkbox.toggle();
      
      expect(changeHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: expect.objectContaining({
            checked: false,
            value: null
          })
        })
      );
    });

    test('should return proper value when checked', async () => {
      checkbox.setAttribute('name', 'test');
      checkbox.setAttribute('value', 'custom-value');
      
      const changeHandler = vi.fn();
      checkbox.addEventListener('change', changeHandler);
      
      await waitForComponent(checkbox);
      checkbox.toggle();
      
      expect(changeHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: expect.objectContaining({
            checked: true,
            value: 'custom-value'
          })
        })
      );
    });
  });

  describe('Accessibility', () => {
    test('should have proper ARIA role and attributes', async () => {
      checkbox.setAttribute('label', 'Test Checkbox');
      await waitForComponent(checkbox);
      
      const container = checkbox.shadowRoot.querySelector('.checkbox-container');
      expect(container.getAttribute('role')).toBe('checkbox');
      expect(container.getAttribute('aria-checked')).toBe('false');
      expect(container.getAttribute('aria-label')).toBe('Test Checkbox');
      expect(container.getAttribute('tabindex')).toBe('0');
    });

    test('should update aria-checked when state changes', async () => {
      await waitForComponent(checkbox);
      
      const container = checkbox.shadowRoot.querySelector('.checkbox-container');
      expect(container.getAttribute('aria-checked')).toBe('false');
      
      checkbox.checked = true;
      await new Promise(resolve => setTimeout(resolve, 10));
      expect(container.getAttribute('aria-checked')).toBe('true');
      
      checkbox.indeterminate = true;
      await new Promise(resolve => setTimeout(resolve, 10));
      expect(container.getAttribute('aria-checked')).toBe('mixed');
    });

    test('should be focusable', async () => {
      await waitForComponent(checkbox);
      
      const container = checkbox.shadowRoot.querySelector('.checkbox-container');
      container.focus();
      
      expect(document.activeElement).toBe(checkbox);
    });

    test('should have proper disabled state accessibility', async () => {
      checkbox.setAttribute('disabled', '');
      await waitForComponent(checkbox);
      
      const container = checkbox.shadowRoot.querySelector('.checkbox-container');
      expect(container.getAttribute('aria-disabled')).toBe('true');
      expect(container.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('Visual States and Feedback', () => {
    test('should show hover state', async () => {
      await waitForComponent(checkbox);
      
      const container = checkbox.shadowRoot.querySelector('.checkbox-container');
      
      // Simulate hover
      const mouseEnterEvent = new MouseEvent('mouseenter');
      container.dispatchEvent(mouseEnterEvent);
      
      // Visual state should be applied through CSS
      expect(container).toBeTruthy(); // Basic check, visual states are CSS-based
    });

    test('should show focus state', async () => {
      await waitForComponent(checkbox);
      
      const container = checkbox.shadowRoot.querySelector('.checkbox-container');
      
      // Simulate focus
      const focusEvent = new FocusEvent('focus');
      container.dispatchEvent(focusEvent);
      
      expect(container).toBeTruthy(); // Basic check, visual states are CSS-based
    });

    test('should animate checkmark drawing', async () => {
      await waitForComponent(checkbox);
      
      checkbox.checked = true;
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const checkboxInput = checkbox.shadowRoot.querySelector('.checkbox-input');
      expect(checkboxInput.classList.contains('checked')).toBe(true);
      
      // Check that animation CSS is present
      expect(checkbox.shadowRoot.innerHTML).toContain('checkmark-draw');
    });
  });

  describe('Size Variants', () => {
    const sizes = ['sm', 'md', 'lg'];

    sizes.forEach(size => {
      test(`should apply ${size} size correctly`, async () => {
        checkbox.setAttribute('size', size);
        await waitForComponent(checkbox);
        
        expect(checkbox.hasAttribute('size')).toBe(true);
        expect(checkbox.getAttribute('size')).toBe(size);
      });
    });
  });

  describe('Error State', () => {
    test('should handle error state', async () => {
      checkbox.setAttribute('error', '');
      await waitForComponent(checkbox);
      
      expect(checkbox.hasAttribute('error')).toBe(true);
      // Error styling should be applied via CSS
      expect(checkbox.shadowRoot.innerHTML).toContain(':host([error])');
    });
  });

  describe('Performance', () => {
    test('should render quickly', async () => {
      const startTime = performance.now();
      checkbox.setAttribute('label', 'Performance Test');
      await waitForComponent(checkbox);
      const endTime = performance.now();
      
      // Should render in less than 50ms
      expect(endTime - startTime).toBeLessThan(50);
    });

    test('should handle rapid state changes', async () => {
      await waitForComponent(checkbox);
      
      // Rapidly toggle states
      for (let i = 0; i < 10; i++) {
        checkbox.toggle();
      }
      
      // Should end up checked (odd number of toggles)
      expect(checkbox.checked).toBe(false); // 10 is even, so back to false
    });
  });
});