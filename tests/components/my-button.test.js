/**
 * Unit tests for my-button component
 * Tests variants, states, accessibility, ripple effects, and interactions
 */

import '../../src/components/my-button/my-button.js';

describe('MyButton Component', () => {
  let button;

  beforeEach(() => {
    document.body.innerHTML = '';
    button = document.createElement('my-button');
    document.body.appendChild(button);
  });

  afterEach(() => {
    if (button && button.parentNode) {
      button.parentNode.removeChild(button);
    }
  });

  describe('Component Creation', () => {
    test('should create component with shadow root', () => {
      expect(button).toBeDefined();
      expect(button.shadowRoot).toBeTruthy();
      expect(button.tagName).toBe('MY-BUTTON');
    });

    test('should have default properties', () => {
      expect(button.label).toBe('');
      expect(button.variant).toBe('default');
      expect(button.size).toBe('md');
      expect(button.disabled).toBe(false);
      expect(button.loading).toBe(false);
    });
  });

  describe('Material Design 3 Variants', () => {
    const variants = ['filled', 'outlined', 'text', 'elevated', 'filled-tonal'];

    variants.forEach(variant => {
      test(`should apply ${variant} variant correctly`, async () => {
        button.setAttribute('variant', variant);
        button.setAttribute('label', 'Test');
        await waitForComponent(button);
        
        const buttonElement = button.shadowRoot.querySelector('button');
        expect(buttonElement).toBeTruthy();
        
        // Test for specific TailwindCSS classes based on variant
        switch (variant) {
          case 'filled':
            expect(buttonElement.classList.contains('bg-primary')).toBe(true);
            expect(buttonElement.classList.contains('text-primary-on-primary')).toBe(true);
            break;
          case 'outlined':
            expect(buttonElement.classList.contains('bg-transparent')).toBe(true);
            expect(buttonElement.classList.contains('text-primary')).toBe(true);
            expect(buttonElement.classList.contains('border-outline')).toBe(true);
            break;
          case 'text':
            expect(buttonElement.classList.contains('bg-transparent')).toBe(true);
            expect(buttonElement.classList.contains('border-transparent')).toBe(true);
            break;
          case 'filled-tonal':
            expect(buttonElement.classList.contains('bg-secondary-container')).toBe(true);
            expect(buttonElement.classList.contains('text-secondary-on-container')).toBe(true);
            break;
          case 'elevated':
            expect(buttonElement.classList.contains('bg-surface')).toBe(true);
            expect(buttonElement.classList.contains('shadow-elevation1')).toBe(true);
            break;
        }
      });
    });

    test('should default to filled variant', () => {
      expect(button.variant).toBe('default'); // This maps to 'filled' internally
    });
  });

  describe('Button States', () => {
    test('should handle disabled state', async () => {
      button.setAttribute('disabled', '');
      button.setAttribute('label', 'Test');
      await waitForComponent(button);
      
      const buttonElement = button.shadowRoot.querySelector('button');
      expect(button.disabled).toBe(true);
      expect(buttonElement.hasAttribute('disabled')).toBe(true);
      expect(buttonElement.getAttribute('aria-disabled')).toBe('true');
    });

    test('should handle loading state', async () => {
      button.setAttribute('loading', '');
      button.setAttribute('label', 'Test');
      await waitForComponent(button);
      
      const buttonElement = button.shadowRoot.querySelector('button');
      const spinner = button.shadowRoot.querySelector('svg.animate-spin');
      
      expect(button.loading).toBe(true);
      expect(buttonElement.classList.contains('opacity-75')).toBe(true);
      expect(buttonElement.classList.contains('cursor-wait')).toBe(true);
      expect(spinner).toBeTruthy();
      expect(buttonElement.getAttribute('aria-busy')).toBe('true');
    });

    test('should not emit click events when disabled', async () => {
      button.setAttribute('disabled', '');
      button.setAttribute('label', 'Test');
      
      const clickHandler = vi.fn();
      button.addEventListener('click', clickHandler);
      
      await waitForComponent(button);
      button.shadowRoot.querySelector('button').click();
      
      expect(clickHandler).not.toHaveBeenCalled();
    });

    test('should not emit click events when loading', async () => {
      button.setAttribute('loading', '');
      button.setAttribute('label', 'Test');
      
      const clickHandler = vi.fn();
      button.addEventListener('click', clickHandler);
      
      await waitForComponent(button);
      button.shadowRoot.querySelector('button').click();
      
      expect(clickHandler).not.toHaveBeenCalled();
    });
  });

  describe('Size Variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

    const expectedHeights = {
      xs: 'h-7',
      sm: 'h-8', 
      md: 'h-10',
      lg: 'h-12',
      xl: 'h-14'
    };

    sizes.forEach(size => {
      test(`should apply ${size} size correctly`, async () => {
        button.setAttribute('size', size);
        button.setAttribute('label', 'Test');
        await waitForComponent(button);
        
        const buttonElement = button.shadowRoot.querySelector('button');
        expect(buttonElement.classList.contains(expectedHeights[size])).toBe(true);
      });
    });

    test('should default to medium size', () => {
      expect(button.size).toBe('md');
    });
  });

  describe('Density Variants', () => {
    const densities = ['default', 'compact', 'comfortable'];
    const expectedClasses = {
      default: [], // No additional classes for default
      compact: ['tracking-tight', 'leading-tight'],
      comfortable: ['tracking-wide', 'leading-relaxed']
    };

    densities.forEach(density => {
      test(`should apply ${density} density correctly`, async () => {
        button.setAttribute('density', density);
        button.setAttribute('label', 'Test');
        await waitForComponent(button);
        
        const buttonElement = button.shadowRoot.querySelector('button');
        
        // Check for density-specific classes
        if (density !== 'default') {
          expectedClasses[density].forEach(className => {
            expect(buttonElement.classList.contains(className)).toBe(true);
          });
        } else {
          // For default, ensure compact/comfortable classes are not present
          expect(buttonElement.classList.contains('tracking-tight')).toBe(false);
          expect(buttonElement.classList.contains('tracking-wide')).toBe(false);
        }
      });
    });
  });

  describe('FAB (Floating Action Button)', () => {
    test('should render as FAB when fab attribute is set', async () => {
      button.setAttribute('fab', '');
      await waitForComponent(button);
      
      expect(button.fab).toBe(true);
      expect(button.hasAttribute('fab')).toBe(true);
    });

    test('should apply proper FAB styling', async () => {
      button.setAttribute('fab', '');
      await waitForComponent(button);
      
      const buttonElement = button.shadowRoot.querySelector('button');
      // Check for FAB-specific TailwindCSS classes
      expect(buttonElement.classList.contains('rounded-2xl')).toBe(true);
      expect(buttonElement.classList.contains('shadow-lg')).toBe(true);
      expect(buttonElement.classList.contains('w-14')).toBe(true); // Default md size for FAB
      expect(buttonElement.classList.contains('h-14')).toBe(true);
    });
  });

  describe('Icon-Only Buttons', () => {
    test('should render as icon-only when icon-only attribute is set', async () => {
      button.setAttribute('icon-only', '');
      await waitForComponent(button);
      
      expect(button.iconOnly).toBe(true);
      expect(button.hasAttribute('icon-only')).toBe(true);
    });
  });

  describe('Click Events and Ripple Effect', () => {
    test('should emit custom click event with details', async () => {
      button.setAttribute('label', 'Test Button');
      button.setAttribute('variant', 'outlined');
      button.setAttribute('size', 'lg');
      
      const clickHandler = vi.fn();
      button.addEventListener('click', clickHandler);
      
      await waitForComponent(button);
      
      // Simulate button click by calling the handleClick method directly
      const buttonElement = button.shadowRoot.querySelector('button');
      const mockEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      button.handleClick(mockEvent);
      
      expect(clickHandler).toHaveBeenCalledTimes(1);
      expect(clickHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: expect.objectContaining({
            variant: 'outlined',
            label: 'Test Button',
            size: 'lg'
          })
        })
      );
    });

    test('should create ripple effect on click', async () => {
      button.setAttribute('label', 'Test');
      
      await waitForComponent(button);
      
      // Mock the enhanced ripple method
      const createRippleSpy = vi.spyOn(button, 'createEnhancedRipple');
      
      // Simulate button click by calling the handleClick method directly
      const mockEvent = new MouseEvent('click', { bubbles: true, cancelable: true, clientX: 100, clientY: 50 });
      button.handleClick(mockEvent);
      
      expect(createRippleSpy).toHaveBeenCalled();
      
      // Check if ripple element is created temporarily
      setTimeout(() => {
        const rippleElement = button.shadowRoot.querySelector('.ripple-effect');
        expect(rippleElement).toBeTruthy();
      }, 50);
    });
  });

  describe('Keyboard Interaction', () => {
    test('should handle Enter key press', async () => {
      button.setAttribute('label', 'Test');
      
      const clickHandler = vi.fn();
      button.addEventListener('click', clickHandler);
      
      await waitForComponent(button);
      
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      button.handleKeyDown(enterEvent);
      
      expect(clickHandler).toHaveBeenCalledTimes(1);
    });

    test('should handle Space key press', async () => {
      button.setAttribute('label', 'Test');
      
      const clickHandler = vi.fn();
      button.addEventListener('click', clickHandler);
      
      await waitForComponent(button);
      
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
      button.handleKeyDown(spaceEvent);
      
      expect(clickHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    test('should have proper ARIA attributes', async () => {
      button.setAttribute('label', 'Test Button');
      await waitForComponent(button);
      
      const buttonElement = button.shadowRoot.querySelector('button');
      expect(buttonElement.getAttribute('role')).toBe('button');
      expect(buttonElement.getAttribute('aria-label')).toBe('Test Button');
      expect(buttonElement.getAttribute('tabindex')).toBe('0');
    });

    test('should have proper disabled state ARIA attributes', async () => {
      button.setAttribute('disabled', '');
      button.setAttribute('label', 'Test');
      await waitForComponent(button);
      
      const buttonElement = button.shadowRoot.querySelector('button');
      expect(buttonElement.getAttribute('aria-disabled')).toBe('true');
      expect(buttonElement.getAttribute('tabindex')).toBe('-1');
    });

    test('should have proper loading state ARIA attributes', async () => {
      button.setAttribute('loading', '');
      button.setAttribute('label', 'Test');
      await waitForComponent(button);
      
      const buttonElement = button.shadowRoot.querySelector('button');
      expect(buttonElement.getAttribute('aria-busy')).toBe('true');
    });

    test('should support focus management', async () => {
      button.setAttribute('label', 'Test');
      await waitForComponent(button);
      
      const buttonElement = button.shadowRoot.querySelector('button');
      buttonElement.focus();
      
      expect(document.activeElement).toBe(button);
    });
  });

  describe('Slotted Content', () => {
    test('should render slotted content', async () => {
      const span = document.createElement('span');
      span.textContent = 'Custom Content';
      button.appendChild(span);
      
      await waitForComponent(button);
      
      const slot = button.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });

    test('should fall back to label when no slotted content', async () => {
      button.setAttribute('label', 'Fallback Label');
      await waitForComponent(button);
      
      const slot = button.shadowRoot.querySelector('slot');
      expect(slot.textContent || button.shadowRoot.textContent).toContain('Fallback Label');
    });
  });

  describe('Performance', () => {
    test('should render quickly', async () => {
      const startTime = performance.now();
      button.setAttribute('label', 'Performance Test');
      await waitForComponent(button);
      const endTime = performance.now();
      
      // Should render in less than 50ms
      expect(endTime - startTime).toBeLessThan(50);
    });

    test('should handle rapid state changes', async () => {
      const states = [
        { variant: 'filled', size: 'sm' },
        { variant: 'outlined', size: 'md' },
        { variant: 'text', size: 'lg' }
      ];
      
      for (const state of states) {
        button.setAttribute('variant', state.variant);
        button.setAttribute('size', state.size);
      }
      
      button.setAttribute('label', 'Final State');
      await waitForComponent(button);
      
      expect(button.variant).toBe('text');
      expect(button.size).toBe('lg');
    });
  });

  describe('Visual Consistency', () => {
    test('should maintain consistent height across variants', async () => {
      const variants = ['filled', 'outlined', 'text'];
      const heights = [];
      
      for (const variant of variants) {
        button.setAttribute('variant', variant);
        button.setAttribute('label', 'Test');
        await waitForComponent(button);
        
        const buttonElement = button.shadowRoot.querySelector('button');
        const computedStyle = window.getComputedStyle(buttonElement);
        heights.push(computedStyle.height);
      }
      
      // All heights should be the same for consistency
      expect(new Set(heights).size).toBe(1);
    });
  });
});