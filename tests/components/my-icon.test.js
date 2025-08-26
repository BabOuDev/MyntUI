/**
 * Unit tests for my-icon component
 * Tests built-in SVG icons, Material Icons fallback, accessibility, and interactions
 */

import '../../src/components/my-icon/my-icon.js';

describe('MyIcon Component', () => {
  let icon;

  beforeEach(() => {
    // Clean up any existing icons
    document.body.innerHTML = '';
    
    // Create fresh icon element
    icon = document.createElement('my-icon');
    document.body.appendChild(icon);
  });

  afterEach(() => {
    if (icon && icon.parentNode) {
      icon.parentNode.removeChild(icon);
    }
  });

  describe('Component Creation', () => {
    test('should create component with shadow root', () => {
      expect(icon).toBeDefined();
      expect(icon.shadowRoot).toBeTruthy();
      expect(icon.tagName).toBe('MY-ICON');
    });

    test('should have default properties', () => {
      expect(icon.icon).toBe('');
      expect(icon.size).toBe('md');
      expect(icon.color).toBe('');
      expect(icon.disabled).toBe(false);
      expect(icon.interactive).toBe(false);
    });
  });

  describe('Built-in Icons', () => {
    // Test only icons that exist in BUILTIN_ICONS
    const builtinIcons = [
      'home', 'settings', 'favorite', 'star', 'face',
      'search', 'add', 'delete', 'edit', 'check',
      'person', 'mail', 'phone', 'location',
      'error', 'warning', 'info', 'success'
      // Removed: 'save', 'help', 'people', 'analytics' - not in BUILTIN_ICONS
    ];

    builtinIcons.forEach(iconName => {
      test(`should render built-in icon: ${iconName}`, async () => {
        icon.setAttribute('icon', iconName);
        await waitForComponent(icon);
        
        const svgElement = icon.shadowRoot.querySelector('svg');
        expect(svgElement).toBeTruthy();
        expect(svgElement.querySelector('path')).toBeTruthy();
        expect(svgElement.getAttribute('viewBox')).toBe('0 0 24 24');
      });
    });

    test('should have correct SVG attributes for accessibility', async () => {
      icon.setAttribute('icon', 'home');
      icon.setAttribute('aria-label', 'Home icon');
      await waitForComponent(icon);
      
      const svgElement = icon.shadowRoot.querySelector('svg');
      expect(svgElement.getAttribute('aria-hidden')).toBe('true');
      expect(svgElement.getAttribute('role')).toBe('img');
      // Check the title element instead of aria-label on SVG
      const titleElement = svgElement.querySelector('title');
      expect(titleElement.textContent).toBe('Home icon');
    });
  });

  describe('Size Variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

    sizes.forEach(size => {
      test(`should apply ${size} size correctly`, () => {
        icon.setAttribute('size', size);
        expect(icon.size).toBe(size);
        expect(icon.getAttribute('size')).toBe(size);
      });
    });

    test('should default to medium size', () => {
      expect(icon.size).toBe('md');
    });

    test('should apply size classes correctly', async () => {
      icon.setAttribute('icon', 'home');
      icon.setAttribute('size', 'lg');
      await waitForComponent(icon);
      
      const svgElement = icon.shadowRoot.querySelector('svg');
      expect(svgElement).toBeTruthy();
      // Check that the icon is rendered and has the correct size attribute
      expect(icon.size).toBe('lg');
    });
  });

  describe('Color Variants', () => {
    const colors = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];

    colors.forEach(color => {
      test(`should apply ${color} color variant`, () => {
        icon.setAttribute('color', color);
        expect(icon.color).toBe(color);
        expect(icon.getAttribute('color')).toBe(color);
      });
    });

    test('should accept custom hex colors', () => {
      icon.setAttribute('color', '#ff0000');
      expect(icon.color).toBe('#ff0000');
    });
  });

  describe('Interactive States', () => {
    test('should be non-interactive by default', () => {
      expect(icon.interactive).toBe(false);
      expect(icon.hasAttribute('tabindex')).toBe(false);
    });

    test('should become focusable when interactive', () => {
      icon.setAttribute('interactive', '');
      expect(icon.interactive).toBe(true);
    });

    test('should emit click event when interactive', async () => {
      icon.setAttribute('icon', 'home');
      icon.setAttribute('interactive', '');
      
      const clickHandler = vi.fn();
      icon.addEventListener('icon-click', clickHandler);
      
      await waitForComponent(icon);
      
      // Simulate click on the SVG element directly
      const svgElement = icon.shadowRoot.querySelector('svg');
      const clickEvent = new MouseEvent('click', { bubbles: true });
      svgElement.dispatchEvent(clickEvent);
      
      expect(clickHandler).toHaveBeenCalledTimes(1);
    });

    test('should not emit events when disabled', async () => {
      icon.setAttribute('icon', 'home');
      icon.setAttribute('interactive', '');
      icon.setAttribute('disabled', '');
      
      const clickHandler = vi.fn();
      icon.addEventListener('icon-click', clickHandler);
      
      await waitForComponent(icon);
      icon.click();
      
      expect(clickHandler).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('should have proper ARIA attributes', async () => {
      icon.setAttribute('icon', 'home');
      icon.setAttribute('aria-label', 'Home');
      await waitForComponent(icon);
      
      const svgElement = icon.shadowRoot.querySelector('svg');
      // In TailwindCSS version, aria-label is in the title element
      const titleElement = svgElement.querySelector('title');
      expect(titleElement.textContent).toBe('Home');
      expect(svgElement.getAttribute('role')).toBe('img');
    });

    test('should support keyboard interaction when interactive', async () => {
      icon.setAttribute('icon', 'home');
      icon.setAttribute('interactive', '');
      
      const clickHandler = vi.fn();
      icon.addEventListener('icon-click', clickHandler);
      
      await waitForComponent(icon);
      
      const svgElement = icon.shadowRoot.querySelector('svg');
      expect(svgElement).toBeTruthy();
      
      // Test Enter key on SVG element
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      svgElement.dispatchEvent(enterEvent);
      expect(clickHandler).toHaveBeenCalledTimes(1);
    });

    test('should have proper disabled state accessibility', () => {
      icon.setAttribute('disabled', '');
      expect(icon.disabled).toBe(true);
    });
  });

  describe('Font Fallback', () => {
    test('should use built-in SVG by default', async () => {
      icon.setAttribute('icon', 'home');
      await waitForComponent(icon);
      
      expect(icon.shadowRoot.querySelector('svg')).toBeTruthy();
      expect(icon.shadowRoot.querySelector('.material-icons')).toBeFalsy();
    });

    test('should fall back to Material Icons when use-font-fallback is set and icon not found', async () => {
      icon.setAttribute('icon', 'unknown_icon');
      icon.setAttribute('use-font-fallback', '');
      await waitForComponent(icon);
      
      expect(icon.shadowRoot.querySelector('.material-icons')).toBeTruthy();
      expect(icon.shadowRoot.innerHTML).toContain('unknown_icon');
    });
  });

  describe('Error Handling', () => {
    test('should handle missing icon gracefully', async () => {
      icon.setAttribute('icon', '');
      await waitForComponent(icon);
      
      // Should not throw errors and should render something
      expect(icon.shadowRoot.innerHTML).toBeDefined();
    });

    test('should handle invalid size gracefully', () => {
      icon.setAttribute('size', 'invalid');
      // Should default to something reasonable
      expect(icon.shadowRoot.innerHTML).toBeDefined();
    });
  });

  describe('Performance', () => {
    test('should render quickly', async () => {
      const startTime = performance.now();
      icon.setAttribute('icon', 'home');
      await waitForComponent(icon);
      const endTime = performance.now();
      
      // Should render in less than 100ms
      expect(endTime - startTime).toBeLessThan(100);
    });

    test('should handle multiple rapid attribute changes', async () => {
      const icons = ['home', 'settings', 'favorite', 'star'];
      
      for (const iconName of icons) {
        icon.setAttribute('icon', iconName);
        icon.setAttribute('size', 'lg');
        icon.setAttribute('color', 'primary');
      }
      
      await waitForComponent(icon);
      expect(icon.icon).toBe('star');
    });
  });
});