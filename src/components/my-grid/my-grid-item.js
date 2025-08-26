/**
 * MyntUI Grid Item Component
 * Individual grid item with column/row span and positioning control
 * Companion to my-grid component for advanced grid layouts
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';

class MyGridItem extends MyntUIBaseComponent {
  constructor() {
    super();
    
    // Component-specific internal state
    this._colSpan = 1;
    this._rowSpan = 1;
    this._colStart = null;
    this._colEnd = null;
    this._rowStart = null;
    this._rowEnd = null;
    
    // Initialize with base component pattern
    this.log('Grid item component initializing...');
    this.parseAttributes();
  }

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'col-span', 'row-span', 'col-start', 'col-end', 'row-start', 'row-end',
      'align-self', 'justify-self',
      'sm-col-span', 'md-col-span', 'lg-col-span', 'xl-col-span'
    ];
  }

  handleAttributeChange(name, oldValue, newValue) {
    super.handleAttributeChange(name, oldValue, newValue);
    this.parseAttributes();
    this.updateItemStyles();
  }

  parseAttributes() {
    // Basic span properties
    this._colSpan = parseInt(this.getAttribute('col-span')) || 1;
    this._rowSpan = parseInt(this.getAttribute('row-span')) || 1;
    
    // Position properties
    this._colStart = this.getAttribute('col-start') ? parseInt(this.getAttribute('col-start')) : null;
    this._colEnd = this.getAttribute('col-end') ? parseInt(this.getAttribute('col-end')) : null;
    this._rowStart = this.getAttribute('row-start') ? parseInt(this.getAttribute('row-start')) : null;
    this._rowEnd = this.getAttribute('row-end') ? parseInt(this.getAttribute('row-end')) : null;
    
    // Alignment properties
    this._alignSelf = this.getAttribute('align-self') || 'auto';
    this._justifySelf = this.getAttribute('justify-self') || 'auto';
    
    // Responsive spans
    this._responsiveSpans = {
      sm: parseInt(this.getAttribute('sm-col-span')) || null,
      md: parseInt(this.getAttribute('md-col-span')) || null,
      lg: parseInt(this.getAttribute('lg-col-span')) || null,
      xl: parseInt(this.getAttribute('xl-col-span')) || null
    };
  }

  getGridColumn() {
    if (this._colStart && this._colEnd) {
      return `${this._colStart} / ${this._colEnd}`;
    } else if (this._colStart) {
      return `${this._colStart} / span ${this._colSpan}`;
    } else if (this._colSpan > 1) {
      return `span ${this._colSpan}`;
    }
    return 'auto';
  }

  getGridRow() {
    if (this._rowStart && this._rowEnd) {
      return `${this._rowStart} / ${this._rowEnd}`;
    } else if (this._rowStart) {
      return `${this._rowStart} / span ${this._rowSpan}`;
    } else if (this._rowSpan > 1) {
      return `span ${this._rowSpan}`;
    }
    return 'auto';
  }

  updateItemStyles() {
    if (!this.shadowRoot) return;

    const itemElement = this.shadowRoot.querySelector('.grid-item');
    if (!itemElement) return;

    // Apply grid positioning
    itemElement.style.gridColumn = this.getGridColumn();
    itemElement.style.gridRow = this.getGridRow();
    itemElement.style.alignSelf = this._alignSelf;
    itemElement.style.justifySelf = this._justifySelf;
  }

  createTemplate() {
    return `
      <style>
        :host {
          display: contents; /* Makes the host invisible for grid layout */
        }

        .grid-item {
          grid-column: ${this.getGridColumn()};
          grid-row: ${this.getGridRow()};
          align-self: ${this._alignSelf};
          justify-self: ${this._justifySelf};
          min-width: 0; /* Prevent overflow */
          position: relative;
        }

        /* Column span variations */
        :host([col-span="1"]) .grid-item { grid-column: span 1; }
        :host([col-span="2"]) .grid-item { grid-column: span 2; }
        :host([col-span="3"]) .grid-item { grid-column: span 3; }
        :host([col-span="4"]) .grid-item { grid-column: span 4; }
        :host([col-span="5"]) .grid-item { grid-column: span 5; }
        :host([col-span="6"]) .grid-item { grid-column: span 6; }
        :host([col-span="7"]) .grid-item { grid-column: span 7; }
        :host([col-span="8"]) .grid-item { grid-column: span 8; }
        :host([col-span="9"]) .grid-item { grid-column: span 9; }
        :host([col-span="10"]) .grid-item { grid-column: span 10; }
        :host([col-span="11"]) .grid-item { grid-column: span 11; }
        :host([col-span="12"]) .grid-item { grid-column: span 12; }
        :host([col-span="full"]) .grid-item { grid-column: 1 / -1; }

        /* Row span variations */
        :host([row-span="1"]) .grid-item { grid-row: span 1; }
        :host([row-span="2"]) .grid-item { grid-row: span 2; }
        :host([row-span="3"]) .grid-item { grid-row: span 3; }
        :host([row-span="4"]) .grid-item { grid-row: span 4; }
        :host([row-span="full"]) .grid-item { grid-row: 1 / -1; }

        /* Alignment variations */
        :host([align-self="start"]) .grid-item { align-self: start; }
        :host([align-self="center"]) .grid-item { align-self: center; }
        :host([align-self="end"]) .grid-item { align-self: end; }
        :host([align-self="stretch"]) .grid-item { align-self: stretch; }

        :host([justify-self="start"]) .grid-item { justify-self: start; }
        :host([justify-self="center"]) .grid-item { justify-self: center; }
        :host([justify-self="end"]) .grid-item { justify-self: end; }
        :host([justify-self="stretch"]) .grid-item { justify-self: stretch; }

        /* Responsive column spans */
        @media (min-width: var(--_global-breakpoint-sm, 576px)) {
          ${this._responsiveSpans.sm ? `:host([sm-col-span="${this._responsiveSpans.sm}"]) .grid-item { grid-column: span ${this._responsiveSpans.sm}; }` : ''}
        }

        @media (min-width: var(--_global-breakpoint-md, 768px)) {
          ${this._responsiveSpans.md ? `:host([md-col-span="${this._responsiveSpans.md}"]) .grid-item { grid-column: span ${this._responsiveSpans.md}; }` : ''}
        }

        @media (min-width: var(--_global-breakpoint-lg, 992px)) {
          ${this._responsiveSpans.lg ? `:host([lg-col-span="${this._responsiveSpans.lg}"]) .grid-item { grid-column: span ${this._responsiveSpans.lg}; }` : ''}
        }

        @media (min-width: var(--_global-breakpoint-xl, 1200px)) {
          ${this._responsiveSpans.xl ? `:host([xl-col-span="${this._responsiveSpans.xl}"]) .grid-item { grid-column: span ${this._responsiveSpans.xl}; }` : ''}
        }

        /* Ensure content doesn't overflow */
        ::slotted(*) {
          min-width: 0;
          max-width: 100%;
        }
      </style>
      <div class="grid-item">
        <slot></slot>
      </div>
    `;
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = this.createTemplate();
    this.updateItemStyles();
    this.updateAccessibilityFeatures();
  }

  updateAccessibilityFeatures() {
    // Grid item accessibility
    this.setAttribute('role', 'gridcell');
    
    // Add ARIA attributes if the item spans multiple cells
    if (this._colSpan > 1) {
      this.setAttribute('aria-colspan', this._colSpan.toString());
    }
    if (this._rowSpan > 1) {
      this.setAttribute('aria-rowspan', this._rowSpan.toString());
    }
  }

  // Public API methods
  setColSpan(span) {
    this.setAttribute('col-span', span.toString());
  }

  setRowSpan(span) {
    this.setAttribute('row-span', span.toString());
  }

  setPosition(colStart, rowStart, colEnd = null, rowEnd = null) {
    this.setAttribute('col-start', colStart.toString());
    this.setAttribute('row-start', rowStart.toString());
    if (colEnd) this.setAttribute('col-end', colEnd.toString());
    if (rowEnd) this.setAttribute('row-end', rowEnd.toString());
  }

  setResponsiveSpan(breakpoint, span) {
    this.setAttribute(`${breakpoint}-col-span`, span.toString());
  }
}

// Register the custom element
customElements.define('my-grid-item', MyGridItem);

export { MyGridItem };