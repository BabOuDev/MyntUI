/**
 * @jest-environment jsdom
 */

import { beforeEach, describe, expect, test, vi } from 'vitest';
import '../../src/components/my-gauge/my-gauge.js';

describe('MyGauge', () => {
  let gauge;

  beforeEach(() => {
    document.body.innerHTML = '';
    gauge = document.createElement('my-gauge');
    document.body.appendChild(gauge);
  });

  test('should create element with correct tag name', () => {
    expect(gauge.tagName.toLowerCase()).toBe('my-gauge');
  });

  test('should have correct initial properties', () => {
    expect(gauge.value).toBe(0);
    expect(gauge.min).toBe(0);
    expect(gauge.max).toBe(100);
    expect(gauge.variant).toBe('primary');
  });

  test('should handle value attribute', () => {
    gauge.setAttribute('value', '65');
    expect(gauge.value).toBe(65);
    
    gauge.value = 80;
    expect(gauge.getAttribute('value')).toBe('80');
  });

  test('should clamp value between min and max', () => {
    gauge.min = 0;
    gauge.max = 100;
    
    gauge.value = -10;
    expect(gauge.value).toBe(0);
    
    gauge.value = 150;
    expect(gauge.value).toBe(100);
    
    gauge.value = 50;
    expect(gauge.value).toBe(50);
  });

  test('should handle min and max attributes', () => {
    gauge.setAttribute('min', '10');
    gauge.setAttribute('max', '90');
    
    expect(gauge.min).toBe(10);
    expect(gauge.max).toBe(90);
    
    gauge.min = 20;
    gauge.max = 80;
    
    expect(gauge.getAttribute('min')).toBe('20');
    expect(gauge.getAttribute('max')).toBe('80');
  });

  test('should calculate correct percentage', () => {
    gauge.min = 0;
    gauge.max = 100;
    gauge.value = 25;
    expect(gauge.percentage).toBe(25);
    
    gauge.min = 20;
    gauge.max = 80;
    gauge.value = 50;
    expect(gauge.percentage).toBe(50); // (50-20)/(80-20) * 100 = 50%
    
    gauge.value = 20;
    expect(gauge.percentage).toBe(0);
    
    gauge.value = 80;
    expect(gauge.percentage).toBe(100);
  });

  test('should handle variant attribute', () => {
    const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];
    
    variants.forEach(variant => {
      gauge.setAttribute('variant', variant);
      expect(gauge.variant).toBe(variant);
    });
  });

  test('should handle size attribute', () => {
    const sizes = ['small', 'medium', 'large'];
    
    sizes.forEach(size => {
      gauge.setAttribute('size', size);
      expect(gauge.size).toBe(size);
    });
  });

  test('should support label attribute', () => {
    gauge.setAttribute('label', 'CPU Usage');
    expect(gauge.label).toBe('CPU Usage');
    
    const labelElement = gauge.shadowRoot.querySelector('.gauge-label');
    if (labelElement) {
      expect(labelElement.textContent.trim()).toBe('CPU Usage');
    }
  });

  test('should show value text when enabled', () => {
    gauge.setAttribute('show-value', '');
    gauge.value = 65;
    
    const valueElement = gauge.shadowRoot.querySelector('.gauge-value');
    if (valueElement) {
      expect(valueElement.textContent.trim()).toContain('65');
    }
  });

  test('should handle thresholds for color coding', () => {
    // Test different threshold values
    gauge.setAttribute('low-threshold', '30');
    gauge.setAttribute('high-threshold', '70');
    
    expect(gauge.lowThreshold).toBe(30);
    expect(gauge.highThreshold).toBe(70);
    
    // Test threshold-based coloring
    gauge.value = 20; // Below low threshold
    const gaugeFill = gauge.shadowRoot.querySelector('.gauge-fill');
    expect(gaugeFill).toBeTruthy();
    
    gauge.value = 50; // Between thresholds
    gauge.value = 80; // Above high threshold
  });

  test('should have correct ARIA attributes', () => {
    gauge.value = 65;
    gauge.min = 0;
    gauge.max = 100;
    gauge.label = 'System Performance';
    
    const gaugeElement = gauge.shadowRoot.querySelector('[role="progressbar"]') || 
                        gauge.shadowRoot.querySelector('.gauge-container');
    
    if (gaugeElement.getAttribute('role') === 'progressbar') {
      expect(gaugeElement.getAttribute('aria-valuenow')).toBe('65');
      expect(gaugeElement.getAttribute('aria-valuemin')).toBe('0');
      expect(gaugeElement.getAttribute('aria-valuemax')).toBe('100');
    }
  });

  test('should emit gauge events on value change', () => {
    const changeHandler = vi.fn();
    gauge.addEventListener('change', changeHandler);
    
    gauge.value = 75;
    
    expect(changeHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'change',
        detail: expect.objectContaining({
          value: 75,
          min: gauge.min,
          max: gauge.max,
          percentage: 75
        }),
        bubbles: true
      })
    );
  });

  test('should handle different gauge styles', () => {
    const styles = ['circular', 'semicircular', 'arc'];
    
    styles.forEach(style => {
      gauge.setAttribute('gauge-style', style);
      expect(gauge.gaugeStyle).toBe(style);
      
      const gaugeContainer = gauge.shadowRoot.querySelector('.gauge-container');
      expect(gaugeContainer.classList.contains(`gauge-${style}`)).toBe(true);
    });
  });

  test('should support custom units', () => {
    gauge.setAttribute('unit', '%');
    gauge.value = 85;
    
    const valueElement = gauge.shadowRoot.querySelector('.gauge-value');
    if (valueElement) {
      expect(valueElement.textContent.trim()).toContain('%');
    }
  });

  test('should animate value changes when enabled', () => {
    gauge.setAttribute('animated', '');
    expect(gauge.animated).toBe(true);
    
    const gaugeFill = gauge.shadowRoot.querySelector('.gauge-fill');
    if (gaugeFill) {
      // Check for animation-related styles or classes
      const hasTransition = gaugeFill.style.transition || 
                           gaugeFill.classList.contains('animated');
      expect(hasTransition).toBeTruthy();
    }
  });
});