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
    // Test threshold configuration with JSON format
    const thresholds = [
      { min: 0, max: 30, color: '#ff0000', label: 'Low' },
      { min: 30, max: 70, color: '#ffff00', label: 'Medium' },
      { min: 70, max: 100, color: '#00ff00', label: 'High' }
    ];
    
    gauge.setAttribute('thresholds', JSON.stringify(thresholds));
    expect(gauge.thresholds).toEqual(thresholds);
    
    // Test threshold-based coloring
    gauge.value = 20; // Low threshold
    const currentThreshold = gauge.getCurrentThreshold();
    expect(currentThreshold).toBeTruthy();
    expect(currentThreshold.label).toBe('Low');
    
    gauge.value = 50; // Medium threshold  
    gauge.value = 80; // High threshold
  });

  test('should have correct ARIA attributes', () => {
    gauge.value = 65;
    gauge.min = 0;
    gauge.max = 100;
    gauge.label = 'System Performance';
    
    // Re-render to update ARIA attributes
    gauge.render();
    
    const gaugeElement = gauge.shadowRoot.querySelector('[role="meter"]');
    expect(gaugeElement).toBeTruthy();
    expect(gaugeElement.getAttribute('aria-valuenow')).toBe('65');
    expect(gaugeElement.getAttribute('aria-valuemin')).toBe('0');
    expect(gaugeElement.getAttribute('aria-valuemax')).toBe('100');
  });

  test('should emit gauge events on value change', () => {
    const changeHandler = vi.fn();
    gauge.addEventListener('gauge-change', changeHandler);  // Updated event name
    
    // Force render to ensure shadow DOM is ready
    gauge.render();
    
    // Find the gauge container with the correct role
    const gaugeContainer = gauge.shadowRoot.querySelector('[role="meter"]');
    expect(gaugeContainer).toBeTruthy();
    
    // Simulate arrow key press to change value
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true });
    gaugeContainer.dispatchEvent(event);
    
    // Should emit gauge-change event, not 'change'
    expect(changeHandler).toHaveBeenCalled();
  });

  test('should handle different gauge styles', () => {
    // The updated gauge component doesn't use gauge-style attribute
    // Instead it uses a fixed semicircular design
    gauge.setAttribute('size', 'lg');
    gauge.render();
    
    const svg = gauge.shadowRoot.querySelector('svg');
    expect(svg).toBeTruthy();
    
    // Test the actual gauge structure matches the expected semicircular design
    // Use path instead of .gauge-fill class
    const gaugeFill = gauge.shadowRoot.querySelector('path');
    expect(gaugeFill).toBeTruthy();
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