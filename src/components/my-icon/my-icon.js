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
          /* Icon-specific variables using global semantic variables */
          --_icon-color: ${this.color || 'var(--_global-color-text-primary)'};
          --_icon-size-xs: var(--_global-font-size-xs);
          --_icon-size-sm: var(--_global-font-size-md);
          --_icon-size-md: var(--_global-font-size-lg);
          --_icon-size-lg: var(--_global-font-size-xxl);
          --_icon-size-xl: var(--_global-font-size-display);
          --_icon-size: var(--_icon-size-${this.size});
          
          --_icon-transition: var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          --_icon-focus-ring: 2px solid var(--_global-color-border-focus);
          --_icon-focus-offset: 2px;
          --_icon-border-radius: var(--_global-border-radius-sm);
          
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: var(--_icon-size);
          height: var(--_icon-size);
          color: var(--_icon-color);
          transition: color var(--_icon-transition);
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
          outline: var(--_icon-focus-ring);
          outline-offset: var(--_icon-focus-offset);
          border-radius: var(--_icon-border-radius);
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

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-icon')) {
  customElements.define('my-icon', MyIcon);
}