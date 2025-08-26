/**
 * @jest-environment jsdom
 */

import { beforeEach, describe, expect, test, vi } from 'vitest';
import '../../src/components/my-toggle/my-toggle.js';

describe('MyToggle', () => {
  let toggle;

  beforeEach(() => {
    document.body.innerHTML = '';
    toggle = document.createElement('my-toggle');
    document.body.appendChild(toggle);
  });

  test('should create element with correct tag name', () => {
    expect(toggle.tagName.toLowerCase()).toBe('my-toggle');
  });

  test('should have correct initial state', () => {
    expect(toggle.checked).toBe(false);
    expect(toggle.disabled).toBe(false);
  });

  test('should handle checked attribute', () => {
    expect(toggle.checked).toBe(false);
    
    toggle.setAttribute('checked', '');
    expect(toggle.checked).toBe(true);
    
    toggle.removeAttribute('checked');
    expect(toggle.checked).toBe(false);
  });

  test('should handle disabled attribute', () => {
    expect(toggle.disabled).toBe(false);
    
    toggle.setAttribute('disabled', '');
    expect(toggle.disabled).toBe(true);
    
    toggle.removeAttribute('disabled');
    expect(toggle.disabled).toBe(false);
  });

  test('should toggle checked state when clicked', () => {
    const changeHandler = vi.fn();
    toggle.addEventListener('change', changeHandler);
    
    expect(toggle.checked).toBe(false);
    
    // Click the toggle button element, not the host element
    const toggleButton = toggle.shadowRoot.querySelector('.toggle-track');
    expect(toggleButton).toBeTruthy();
    
    toggleButton.click();
    expect(toggle.checked).toBe(true);
    expect(changeHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          checked: true,
          value: 'on',  // Default value
          name: ''
        })
      })
    );
    
    toggleButton.click();
    expect(toggle.checked).toBe(false);
    expect(changeHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          checked: false,
          value: null,  // No value when unchecked
          name: ''
        })
      })
    );
  });

  test('should not toggle when disabled', () => {
    const changeHandler = vi.fn();
    toggle.addEventListener('change', changeHandler);
    
    toggle.setAttribute('disabled', '');
    
    // Try clicking the toggle button element
    const toggleButton = toggle.shadowRoot.querySelector('.toggle-track');
    expect(toggleButton).toBeTruthy();
    toggleButton.click();
    
    expect(toggle.checked).toBe(false);
    expect(changeHandler).not.toHaveBeenCalled();
  });

  test('should handle keyboard interaction', () => {
    const changeHandler = vi.fn();
    toggle.addEventListener('change', changeHandler);
    
    // Get the toggle button element
    const toggleButton = toggle.shadowRoot.querySelector('.toggle-track');
    expect(toggleButton).toBeTruthy();
    
    // Space key
    const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
    toggleButton.dispatchEvent(spaceEvent);
    
    expect(toggle.checked).toBe(true);
    expect(changeHandler).toHaveBeenCalled();
    
    // Enter key
    changeHandler.mockClear();
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    toggleButton.dispatchEvent(enterEvent);
    
    expect(toggle.checked).toBe(false);
    expect(changeHandler).toHaveBeenCalled();
  });

  test('should have correct ARIA attributes', () => {
    const toggleElement = toggle.shadowRoot.querySelector('[role="switch"]');
    expect(toggleElement).toBeTruthy();
    expect(toggleElement.getAttribute('aria-checked')).toBe('false');
    
    toggle.checked = true;
    // Re-render to update ARIA attributes
    toggle.render();
    const updatedToggleElement = toggle.shadowRoot.querySelector('[role="switch"]');
    expect(updatedToggleElement.getAttribute('aria-checked')).toBe('true');
    
    toggle.disabled = true;
    // Re-render to update ARIA attributes  
    toggle.render();
    const disabledToggleElement = toggle.shadowRoot.querySelector('[role="switch"]');
    expect(disabledToggleElement.getAttribute('aria-disabled')).toBe('true');
  });

  test('should support label attribute', () => {
    toggle.setAttribute('label', 'Enable notifications');
    expect(toggle.label).toBe('Enable notifications');
    
    // Re-render to show the label
    toggle.render();
    const labelElement = toggle.shadowRoot.querySelector('label');
    expect(labelElement).toBeTruthy();
    expect(labelElement.textContent.trim()).toBe('Enable notifications');
  });

  test('should emit proper custom events', () => {
    const changeHandler = vi.fn();
    toggle.addEventListener('change', changeHandler);
    
    toggle.checked = true;
    
    expect(changeHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'change',
        detail: expect.objectContaining({
          checked: true,
          value: 'on',  // Default value when checked
          name: ''
        }),
        bubbles: true
      })
    );
  });
});