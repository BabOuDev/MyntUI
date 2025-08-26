class m extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._isVisible=!1,this._showTimeout=null,this._hideTimeout=null,this.handleMouseEnter=this.handleMouseEnter.bind(this),this.handleMouseLeave=this.handleMouseLeave.bind(this),this.handleFocus=this.handleFocus.bind(this),this.handleBlur=this.handleBlur.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.render(),this.attachEventListeners()}static get observedAttributes(){return["text","position","delay","disabled","size","variant","multiline"]}attributeChangedCallback(t,n,o){n!==o&&(this.render(),this.attachEventListeners())}get text(){return this.getAttribute("text")||""}set text(t){this.setAttribute("text",t)}get position(){return this.getAttribute("position")||"top"}set position(t){this.setAttribute("position",t)}get delay(){return parseInt(this.getAttribute("delay"))||500}set delay(t){this.setAttribute("delay",t.toString())}get disabled(){return this.hasAttribute("disabled")}set disabled(t){t?this.setAttribute("disabled",""):this.removeAttribute("disabled")}get size(){return this.getAttribute("size")||"md"}set size(t){this.setAttribute("size",t)}get variant(){return this.getAttribute("variant")||"dark"}set variant(t){this.setAttribute("variant",t)}get multiline(){return this.hasAttribute("multiline")}set multiline(t){t?this.setAttribute("multiline",""):this.removeAttribute("multiline")}showTooltip(){this.disabled||this._isVisible||(this._hideTimeout&&(clearTimeout(this._hideTimeout),this._hideTimeout=null),this._showTimeout=setTimeout(()=>{this._isVisible=!0;const t=this.shadowRoot.querySelector(".tooltip");t&&(t.classList.add("visible"),this.positionTooltip())},this.delay))}hideTooltip(){this._isVisible&&(this._showTimeout&&(clearTimeout(this._showTimeout),this._showTimeout=null),this._hideTimeout=setTimeout(()=>{this._isVisible=!1;const t=this.shadowRoot.querySelector(".tooltip");t&&t.classList.remove("visible")},100))}positionTooltip(){const t=this.shadowRoot.querySelector(".tooltip"),n=this.shadowRoot.querySelector(".trigger");if(!t||!n)return;const o=n.getBoundingClientRect(),e=t.getBoundingClientRect(),d=window.innerWidth,p=window.innerHeight;let i=this.position;if(i==="auto"){const s=o.top,a=p-o.bottom,b=o.left,g=d-o.right,h=Math.max(s,a,b,g);h===s?i="top":h===a?i="bottom":h===b?i="left":i="right"}t.className=`tooltip visible ${i}`;let r,l;switch(i){case"top":r=-e.height-8,l=(o.width-e.width)/2;break;case"bottom":r=o.height+8,l=(o.width-e.width)/2;break;case"left":r=(o.height-e.height)/2,l=-e.width-8;break;case"right":r=(o.height-e.height)/2,l=o.width+8;break}if(i==="top"||i==="bottom"){const s=-o.left+8,a=d-o.left-e.width-8;l=Math.max(s,Math.min(l,a))}else{const s=-o.top+8,a=p-o.top-e.height-8;r=Math.max(s,Math.min(r,a))}t.style.top=`${r}px`,t.style.left=`${l}px`}handleMouseEnter(){this.showTooltip()}handleMouseLeave(){this.hideTooltip()}handleFocus(){this.showTooltip()}handleBlur(){this.hideTooltip()}handleKeyDown(t){t.key==="Escape"&&this.hideTooltip()}attachEventListeners(){const t=this.shadowRoot.querySelector(".trigger");t&&(t.removeEventListener("mouseenter",this.handleMouseEnter),t.removeEventListener("mouseleave",this.handleMouseLeave),t.removeEventListener("focus",this.handleFocus,!0),t.removeEventListener("blur",this.handleBlur,!0),t.removeEventListener("keydown",this.handleKeyDown),t.addEventListener("mouseenter",this.handleMouseEnter),t.addEventListener("mouseleave",this.handleMouseLeave),t.addEventListener("focus",this.handleFocus,!0),t.addEventListener("blur",this.handleBlur,!0),t.addEventListener("keydown",this.handleKeyDown))}disconnectedCallback(){this._showTimeout&&clearTimeout(this._showTimeout),this._hideTimeout&&clearTimeout(this._hideTimeout)}render(){this.shadowRoot.innerHTML=`
      <style>
        :host {
          /* Component-specific variables using global variables */
          --_tooltip-bg-dark: var(--_global-color-on-surface);
          --_tooltip-text-color-dark: var(--_global-color-surface);
          --_tooltip-bg-light: var(--_global-color-surface);
          --_tooltip-text-color-light: var(--_global-color-on-surface);
          --_tooltip-bg-primary: var(--_global-color-primary);
          --_tooltip-text-color-primary: var(--_global-color-on-primary);
          --_tooltip-bg-error: var(--_global-color-error);
          --_tooltip-text-color-error: var(--_global-color-on-error);
          
          --_tooltip-border-radius: var(--_global-border-radius-sm);
          --_tooltip-padding-sm: var(--_global-spacing-xs) calc(var(--_global-spacing-sm) * 0.75);
          --_tooltip-padding-md: var(--_global-spacing-xs) var(--_global-spacing-sm);
          --_tooltip-padding-lg: var(--_global-spacing-sm) var(--_global-spacing-md);
          --_tooltip-font-size-sm: var(--_global-font-size-xs);
          --_tooltip-font-size-md: var(--_global-font-size-sm);
          --_tooltip-font-size-lg: var(--_global-font-size-md);
          --_tooltip-max-width-sm: 180px;
          --_tooltip-max-width-md: 240px;
          --_tooltip-max-width-lg: 320px;
          --_tooltip-z-index: var(--_global-z-index-tooltip);
          --_tooltip-arrow-size: 6px;
          --_tooltip-elevation: var(--_global-elevation-2);
          
          display: inline-block;
          position: relative;
          font-family: var(--_global-font-family-sans);
        }

        :host([disabled]) {
          pointer-events: none;
        }

        .trigger {
          display: inline-block;
          width: 100%;
        }

        .tooltip {
          position: absolute;
          background-color: var(--_tooltip-bg-dark);
          color: var(--_tooltip-text-color-dark);
          padding: var(--_tooltip-padding-md);
          border-radius: var(--_tooltip-border-radius);
          font-size: var(--_tooltip-font-size-md);
          font-weight: var(--_global-font-weight-medium);
          line-height: var(--_global-line-height-tight);
          max-width: var(--_tooltip-max-width-md);
          z-index: var(--_tooltip-z-index);
          opacity: 0;
          pointer-events: none;
          transition: all var(--_global-motion-duration-short2) var(--_global-motion-easing-emphasized);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          box-shadow: var(--_tooltip-elevation);
          transform: scale(0.8);
        }

        .tooltip.visible {
          opacity: 1;
          transform: scale(1);
        }

        /* Arrow styling */
        .tooltip::before {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          border: var(--_tooltip-arrow-size) solid transparent;
        }

        /* Top position arrow */
        .tooltip.top::before {
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-top-color: var(--_tooltip-bg-dark);
          border-bottom: none;
        }

        /* Bottom position arrow */
        .tooltip.bottom::before {
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-bottom-color: var(--_tooltip-bg-dark);
          border-top: none;
        }

        /* Left position arrow */
        .tooltip.left::before {
          top: 50%;
          left: 100%;
          transform: translateY(-50%);
          border-left-color: var(--_tooltip-bg-dark);
          border-right: none;
        }

        /* Right position arrow */
        .tooltip.right::before {
          top: 50%;
          right: 100%;
          transform: translateY(-50%);
          border-right-color: var(--_tooltip-bg-dark);
          border-left: none;
        }

        /* Multi-line tooltips */
        .tooltip.multiline {
          white-space: normal;
          word-wrap: break-word;
          text-overflow: clip;
        }

        /* Size variants */
        :host([size="sm"]) {
          --_tooltip-padding-md: var(--_tooltip-padding-sm);
          --_tooltip-font-size-md: var(--_tooltip-font-size-sm);
          --_tooltip-max-width-md: var(--_tooltip-max-width-sm);
          --_tooltip-arrow-size: 4px;
        }

        :host([size="lg"]) {
          --_tooltip-padding-md: var(--_tooltip-padding-lg);
          --_tooltip-font-size-md: var(--_tooltip-font-size-lg);
          --_tooltip-max-width-md: var(--_tooltip-max-width-lg);
          --_tooltip-arrow-size: 8px;
        }

        /* Variant styles */
        :host([variant="light"]) .tooltip {
          background-color: var(--_tooltip-bg-light);
          color: var(--_tooltip-text-color-light);
          border: 1px solid var(--_global-color-outline-variant);
        }

        :host([variant="light"]) .tooltip::before {
          border-top-color: var(--_tooltip-bg-light);
          border-bottom-color: var(--_tooltip-bg-light);
          border-left-color: var(--_tooltip-bg-light);
          border-right-color: var(--_tooltip-bg-light);
        }

        :host([variant="primary"]) .tooltip {
          background-color: var(--_tooltip-bg-primary);
          color: var(--_tooltip-text-color-primary);
        }

        :host([variant="primary"]) .tooltip::before {
          border-top-color: var(--_tooltip-bg-primary);
          border-bottom-color: var(--_tooltip-bg-primary);
          border-left-color: var(--_tooltip-bg-primary);
          border-right-color: var(--_tooltip-bg-primary);
        }

        :host([variant="error"]) .tooltip {
          background-color: var(--_tooltip-bg-error);
          color: var(--_tooltip-text-color-error);
        }

        :host([variant="error"]) .tooltip::before {
          border-top-color: var(--_tooltip-bg-error);
          border-bottom-color: var(--_tooltip-bg-error);
          border-left-color: var(--_tooltip-bg-error);
          border-right-color: var(--_tooltip-bg-error);
        }

        /* Enhanced multiline support */
        :host([multiline]) .tooltip {
          white-space: normal;
          word-wrap: break-word;
          text-overflow: clip;
          line-height: var(--_global-line-height-normal);
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .tooltip {
            transition: opacity var(--_global-motion-duration-short1) ease;
            transform: none !important;
          }
          
          .tooltip.visible {
            transform: none !important;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .tooltip {
            border: 2px solid currentColor;
          }
          
          :host([variant="light"]) .tooltip {
            border: 2px solid var(--_global-color-on-surface);
          }
        }
      </style>

      <div class="trigger">
        <slot></slot>
      </div>
      
      <div 
        class="tooltip ${this.position} ${this.multiline?"multiline":""}"
        role="tooltip"
        aria-hidden="${!this._isVisible}"
        id="tooltip-${Math.random().toString(36).substr(2,9)}"
      >
        ${this.text?this.text:'<slot name="content"></slot>'}
      </div>
    `}}customElements.get("my-tooltip")||customElements.define("my-tooltip",m);
