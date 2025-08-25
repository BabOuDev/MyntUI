/**
 * @jest-environment jsdom
 */

import { beforeEach, describe, expect, test, vi } from 'vitest';
import '../../src/components/my-progress/my-progress.js';

describe('MyProgress', () => {
  let progress;

  beforeEach(() => {
    document.body.innerHTML = '';
    progress = document.createElement('my-progress');
    document.body.appendChild(progress);
  });

  test('should create element with correct tag name', () => {
    expect(progress.tagName.toLowerCase()).toBe('my-progress');
  });

  test('should have correct initial properties', () => {
    expect(progress.value).toBe(0);
    expect(progress.max).toBe(100);
    expect(progress.variant).toBe('primary');
    expect(progress.size).toBe('medium');
  });

  test('should handle value attribute', () => {
    progress.setAttribute('value', '50');
    expect(progress.value).toBe(50);
    
    progress.value = 75;
    expect(progress.getAttribute('value')).toBe('75');
  });

  test('should clamp value between 0 and max', () => {
    progress.max = 100;
    
    progress.value = -10;
    expect(progress.value).toBe(0);
    
    progress.value = 150;
    expect(progress.value).toBe(100);
    
    progress.value = 50;
    expect(progress.value).toBe(50);
  });

  test('should handle max attribute', () => {
    progress.setAttribute('max', '200');
    expect(progress.max).toBe(200);
    
    progress.max = 150;
    expect(progress.getAttribute('max')).toBe('150');
  });

  test('should handle variant attribute', () => {
    const variants = ['primary', 'secondary', 'success', 'warning', 'error'];
    
    variants.forEach(variant => {
      progress.setAttribute('variant', variant);
      expect(progress.variant).toBe(variant);
    });
  });

  test('should handle size attribute', () => {
    const sizes = ['small', 'medium', 'large'];
    
    sizes.forEach(size => {
      progress.setAttribute('size', size);
      expect(progress.size).toBe(size);
    });
  });

  test('should calculate correct percentage', () => {
    progress.max = 100;
    progress.value = 25;
    expect(progress.percentage).toBe(25);
    
    progress.max = 200;
    progress.value = 50;
    expect(progress.percentage).toBe(25);
    
    progress.value = 0;
    expect(progress.percentage).toBe(0);
    
    progress.value = 200;
    expect(progress.percentage).toBe(100);
  });

  test('should update progress bar visual representation', () => {
    progress.value = 60;
    
    const progressBar = progress.shadowRoot.querySelector('.progress-fill');
    expect(progressBar).toBeTruthy();
    
    // Check that the width style is set correctly
    const computedWidth = progressBar.style.width || progressBar.getAttribute('style');
    expect(computedWidth).toContain('60%');
  });

  test('should have correct ARIA attributes', () => {
    progress.value = 75;
    progress.max = 100;
    
    const progressElement = progress.shadowRoot.querySelector('[role="progressbar"]');
    expect(progressElement).toBeTruthy();
    expect(progressElement.getAttribute('aria-valuenow')).toBe('75');
    expect(progressElement.getAttribute('aria-valuemin')).toBe('0');
    expect(progressElement.getAttribute('aria-valuemax')).toBe('100');
  });

  test('should support label attribute', () => {
    progress.setAttribute('label', 'Loading progress');
    expect(progress.label).toBe('Loading progress');
    
    const labelElement = progress.shadowRoot.querySelector('.progress-label');
    if (labelElement) {
      expect(labelElement.textContent.trim()).toBe('Loading progress');
    }
  });

  test('should handle striped variant', () => {
    progress.setAttribute('striped', '');
    expect(progress.striped).toBe(true);
    
    const progressElement = progress.shadowRoot.querySelector('.progress-container');
    expect(progressElement.classList.contains('striped')).toBe(true);
  });

  test('should handle animated variant', () => {
    progress.setAttribute('animated', '');
    expect(progress.animated).toBe(true);
    
    const progressElement = progress.shadowRoot.querySelector('.progress-container');
    expect(progressElement.classList.contains('animated')).toBe(true);
  });

  test('should show percentage text when enabled', () => {
    progress.setAttribute('show-percentage', '');
    progress.value = 42;
    
    const percentageElement = progress.shadowRoot.querySelector('.progress-percentage');
    if (percentageElement) {
      expect(percentageElement.textContent.trim()).toBe('42%');
    }
  });

  test('should emit progress events on value change', () => {
    const progressHandler = vi.fn();
    progress.addEventListener('progress', progressHandler);
    
    progress.value = 50;
    
    expect(progressHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'progress',
        detail: expect.objectContaining({
          value: 50,
          max: progress.max,
          percentage: 50
        }),
        bubbles: true
      })
    );
  });

  test('should handle indeterminate state', () => {
    progress.setAttribute('indeterminate', '');
    expect(progress.indeterminate).toBe(true);
    
    const progressElement = progress.shadowRoot.querySelector('.progress-container');
    expect(progressElement.classList.contains('indeterminate')).toBe(true);
  });
});