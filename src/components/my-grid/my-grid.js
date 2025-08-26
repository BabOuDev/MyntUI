/**
 * MyntUI Grid Component
 * A flexible, responsive grid layout component for organizing content
 * Built with CSS Grid and follows Material Design 3 principles
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';
import { globalConfig } from '../../config/global-config.js';

class MyGrid extends MyntUIBaseComponent {
  constructor() {
    super();
    
    // Component-specific internal state
    this._columns = 12;
    this._gap = 'md';
    this._breakpoints = {};
    
    // Initialize with base component pattern
    this.log('Grid component initializing...');
    this.parseAttributes();
  }

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'columns', 'gap', 'auto-fit', 'auto-fill', 'min-width',
      'align-items', 'justify-content', 'align-content', 'justify-items',
      'sm-columns', 'md-columns', 'lg-columns', 'xl-columns'
    ];
  }

  handleAttributeChange(name, oldValue, newValue) {
    super.handleAttributeChange(name, oldValue, newValue);
    this.parseAttributes();
    this.updateGridStyles();
  }

  parseAttributes() {
    // Basic grid properties
    this._columns = parseInt(this.getAttribute('columns')) || 12;
    this._gap = this.getAttribute('gap') || 'md';
    this._autoFit = this.hasAttribute('auto-fit');
    this._autoFill = this.hasAttribute('auto-fill');
    this._minWidth = this.getAttribute('min-width') || '280px';
    
    // Alignment properties
    this._alignItems = this.getAttribute('align-items') || 'stretch';
    this._justifyContent = this.getAttribute('justify-content') || 'start';
    this._alignContent = this.getAttribute('align-content') || 'start';
    this._justifyItems = this.getAttribute('justify-items') || 'stretch';
    
    // Responsive breakpoints
    this._breakpoints = {
      sm: parseInt(this.getAttribute('sm-columns')) || null,
      md: parseInt(this.getAttribute('md-columns')) || null,
      lg: parseInt(this.getAttribute('lg-columns')) || null,
      xl: parseInt(this.getAttribute('xl-columns')) || null
    };
  }

  getGapValue(gapSize) {
    const spacing = globalConfig.get('theme.spacing', {});
    switch (gapSize) {
      case 'xs': return spacing.xs || 'var(--_global-spacing-xs)';
      case 'sm': return spacing.sm || 'var(--_global-spacing-sm)';
      case 'md': return spacing.md || 'var(--_global-spacing-md)';
      case 'lg': return spacing.lg || 'var(--_global-spacing-lg)';
      case 'xl': return spacing.xl || 'var(--_global-spacing-xl)';
      case 'xxl': return spacing.xxl || 'var(--_global-spacing-xxl)';
      default: return gapSize; // Custom value
    }
  }

  getGridTemplateColumns() {
    if (this._autoFit) {
      return `repeat(auto-fit, minmax(${this._minWidth}, 1fr))`;
    }
    if (this._autoFill) {
      return `repeat(auto-fill, minmax(${this._minWidth}, 1fr))`;
    }
    return `repeat(${this._columns}, minmax(0, 1fr))`;
  }

  updateGridStyles() {
    if (!this.shadowRoot) return;

    const gridElement = this.shadowRoot.querySelector('.grid');
    if (!gridElement) return;

    // Apply basic grid styles
    gridElement.style.display = 'grid';
    gridElement.style.gridTemplateColumns = this.getGridTemplateColumns();
    gridElement.style.gap = this.getGapValue(this._gap);
    gridElement.style.alignItems = this._alignItems;
    gridElement.style.justifyContent = this._justifyContent;
    gridElement.style.alignContent = this._alignContent;
    gridElement.style.justifyItems = this._justifyItems;
  }

  createTemplate() {
    return `
      <style>
        :host {
          display: block;
          width: 100%;
        }

        .grid {
          display: grid;
          grid-template-columns: ${this.getGridTemplateColumns()};
          gap: ${this.getGapValue(this._gap)};
          align-items: ${this._alignItems};
          justify-content: ${this._justifyContent};
          align-content: ${this._alignContent};
          justify-items: ${this._justifyItems};
          width: 100%;
        }

        /* Responsive breakpoints */
        @media (min-width: var(--_global-breakpoint-sm, 576px)) {
          .grid {
            ${this._breakpoints.sm ? `grid-template-columns: repeat(${this._breakpoints.sm}, minmax(0, 1fr));` : ''}
          }
        }

        @media (min-width: var(--_global-breakpoint-md, 768px)) {
          .grid {
            ${this._breakpoints.md ? `grid-template-columns: repeat(${this._breakpoints.md}, minmax(0, 1fr));` : ''}
          }
        }

        @media (min-width: var(--_global-breakpoint-lg, 992px)) {
          .grid {
            ${this._breakpoints.lg ? `grid-template-columns: repeat(${this._breakpoints.lg}, minmax(0, 1fr));` : ''}
          }
        }

        @media (min-width: var(--_global-breakpoint-xl, 1200px)) {
          .grid {
            ${this._breakpoints.xl ? `grid-template-columns: repeat(${this._breakpoints.xl}, minmax(0, 1fr));` : ''}
          }
        }

        /* Auto-fit and auto-fill handling */
        :host([auto-fit]) .grid {
          grid-template-columns: repeat(auto-fit, minmax(${this._minWidth}, 1fr));
        }

        :host([auto-fill]) .grid {
          grid-template-columns: repeat(auto-fill, minmax(${this._minWidth}, 1fr));
        }

        /* Gap variations */
        :host([gap="xs"]) .grid { gap: var(--_global-spacing-xs); }
        :host([gap="sm"]) .grid { gap: var(--_global-spacing-sm); }
        :host([gap="md"]) .grid { gap: var(--_global-spacing-md); }
        :host([gap="lg"]) .grid { gap: var(--_global-spacing-lg); }
        :host([gap="xl"]) .grid { gap: var(--_global-spacing-xl); }
        :host([gap="xxl"]) .grid { gap: var(--_global-spacing-xxl); }

        /* Alignment variations */
        :host([align-items="start"]) .grid { align-items: start; }
        :host([align-items="center"]) .grid { align-items: center; }
        :host([align-items="end"]) .grid { align-items: end; }
        :host([align-items="stretch"]) .grid { align-items: stretch; }

        :host([justify-content="start"]) .grid { justify-content: start; }
        :host([justify-content="center"]) .grid { justify-content: center; }
        :host([justify-content="end"]) .grid { justify-content: end; }
        :host([justify-content="space-between"]) .grid { justify-content: space-between; }
        :host([justify-content="space-around"]) .grid { justify-content: space-around; }
        :host([justify-content="space-evenly"]) .grid { justify-content: space-evenly; }

        /* Ensure slotted content maintains proper styling */
        ::slotted(*) {
          min-width: 0; /* Prevent grid items from overflowing */
        }
      </style>
      <div class="grid">
        <slot></slot>
      </div>
    `;
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = this.createTemplate();
    this.attachEventListeners();
    this.updateGridStyles();
    this.updateAccessibilityFeatures();
  }

  attachEventListeners() {
    // Grid doesn't need many event listeners since it's mostly layout
    // But we can add resize observer for responsive behavior if needed
    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(() => {
        this.updateGridStyles();
      });
      resizeObserver.observe(this);
      
      // Store observer for cleanup
      this._resizeObserver = resizeObserver;
    }
  }

  updateAccessibilityFeatures() {
    // Grid container accessibility
    this.setAttribute('role', 'grid');
    
    // Announce layout changes for screen readers
    if (this._errors && this._errors.length === 0) {
      this.announceToScreenReader(
        `Grid layout with ${this._columns} columns updated`,
        'polite'
      );
    }
  }

  // Public API methods
  setColumns(columns) {
    this.setAttribute('columns', columns.toString());
  }

  setGap(gap) {
    this.setAttribute('gap', gap);
  }

  setResponsiveColumns(breakpoint, columns) {
    this.setAttribute(`${breakpoint}-columns`, columns.toString());
  }

  // Cleanup
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
  }
}

// Register the custom element
customElements.define('my-grid', MyGrid);

export { MyGrid };