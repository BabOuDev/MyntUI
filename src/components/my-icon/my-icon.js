/**
 * MyntUI my-icon Component
 * A component for rendering scalable vector icons from the Material Icons library
 */

class MyIcon extends HTMLElement {
  constructor() {
    super();
    
    // Create Shadow DOM for encapsulation
    this.attachShadow({ mode: 'open' });
    
    // Initialize component
    this.render();
  }

  // Define which attributes to observe for changes
  static get observedAttributes() {
    return ['icon', 'size', 'color'];
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  // Getter for icon name
  get icon() {
    return this.getAttribute('icon') || '';
  }

  // Setter for icon name
  set icon(value) {
    this.setAttribute('icon', value);
  }

  // Getter for size
  get size() {
    return this.getAttribute('size') || 'md';
  }

  // Setter for size
  set size(value) {
    this.setAttribute('size', value);
  }

  // Getter for color
  get color() {
    return this.getAttribute('color') || '';
  }

  // Setter for color
  set color(value) {
    this.setAttribute('color', value);
  }

  // Render the component
  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <style>
        :host {
          /* Component-specific variables using global variables */
          --_icon-color: ${this.color || 'var(--_global-color-text-primary)'};
          --_icon-size-xs: 16px;
          --_icon-size-sm: 20px;
          --_icon-size-md: 24px;
          --_icon-size-lg: 32px;
          --_icon-size-xl: 40px;
          --_icon-size: var(--_icon-size-${this.size});
          
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: var(--_icon-size);
          height: var(--_icon-size);
          color: var(--_icon-color);
          transition: color var(--_global-transition-fast, 150ms ease-in-out);
        }

        .material-icons {
          font-family: 'Material Icons';
          font-weight: normal;
          font-style: normal;
          font-size: var(--_icon-size);
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
          color: inherit;
          user-select: none;
        }

        /* Size variants */
        :host([size="xs"]) { --_icon-size: var(--_icon-size-xs); }
        :host([size="sm"]) { --_icon-size: var(--_icon-size-sm); }
        :host([size="md"]) { --_icon-size: var(--_icon-size-md); }
        :host([size="lg"]) { --_icon-size: var(--_icon-size-lg); }
        :host([size="xl"]) { --_icon-size: var(--_icon-size-xl); }

        /* Hover effect for interactive icons */
        :host(:hover) {
          opacity: 0.8;
        }

        /* Focus state for accessibility */
        :host(:focus) {
          outline: 2px solid var(--_global-color-border-focus, #80bdff);
          outline-offset: 2px;
          border-radius: var(--_global-border-radius-sm, 4px);
        }

        /* Disabled state */
        :host([disabled]) {
          opacity: 0.5;
          pointer-events: none;
        }
      </style>
      <span class="material-icons" role="img" aria-label="${this.icon || 'icon'}">${this.icon}</span>
    `;
  }
}

// Register the custom element
customElements.define('my-icon', MyIcon);