import{M as i}from"./base-component-q4KNMHwB.js";class l extends i{constructor(){super(),this.handleBackdropClick=this.handleBackdropClick.bind(this),this.handleEscapeKey=this.handleEscapeKey.bind(this),this.handleFocusTrap=this.handleFocusTrap.bind(this),this.hide=this.hide.bind(this),this.show=this.show.bind(this),this.previousActiveElement=null,this.log("Modal component initializing...")}static get observedAttributes(){return[...super.observedAttributes,"open","title","close-on-backdrop-click","close-on-escape"]}handleAttributeChange(e,o,t){switch(super.handleAttributeChange(e,o,t),e){case"open":this.open?this.showModal():this.hideModal(),this.announceToScreenReader(`Modal ${this.open?"opened":"closed"}`,"polite");break}}get open(){return this.hasAttribute("open")}set open(e){e?this.setAttribute("open",""):this.removeAttribute("open")}get title(){return this.getAttribute("title")||""}set title(e){this.setAttribute("title",e)}get size(){return this.getAttribute("size")||"md"}set size(e){this.setAttribute("size",e)}get closeOnBackdropClick(){return this.hasAttribute("close-on-backdrop-click")}set closeOnBackdropClick(e){e?this.setAttribute("close-on-backdrop-click",""):this.removeAttribute("close-on-backdrop-click")}get closeOnEscape(){return this.hasAttribute("close-on-escape")}set closeOnEscape(e){e?this.setAttribute("close-on-escape",""):this.removeAttribute("close-on-escape")}show(){this.open=!0}hide(){this.open=!1}toggle(){this.open=!this.open}showModal(){this.previousActiveElement=document.activeElement,document.body.appendChild(this),document.body.style.overflow="hidden",setTimeout(()=>{const e=this.shadowRoot.querySelector('[tabindex="0"]')||this.shadowRoot.querySelector("button")||this.shadowRoot.querySelector("input");e&&e.focus()},100),this.emit("open",{title:this.title,size:this.size})}hideModal(){document.body.style.overflow="",this.previousActiveElement&&(this.previousActiveElement.focus(),this.previousActiveElement=null),this.parentElement===document.body&&document.body.removeChild(this),this.emit("close",{title:this.title,size:this.size})}handleBackdropClick(e){e.target.classList.contains("modal-backdrop")&&this.closeOnBackdropClick&&this.hide()}handleEscapeKey(e){e.key==="Escape"&&this.closeOnEscape&&this.open&&(e.preventDefault(),this.hide())}handleFocusTrap(e){if(!this.open)return;const o=this.shadowRoot.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'),t=o[0],a=o[o.length-1];e.key==="Tab"&&(e.shiftKey?document.activeElement===t&&(e.preventDefault(),a.focus()):document.activeElement===a&&(e.preventDefault(),t.focus()))}attachEventListeners(){this.removeEventListeners();const e=[],o=this.shadowRoot.querySelector(".modal-backdrop");o&&e.push({element:o,events:["click"],handler:this.handleBackdropClick});const t=this.shadowRoot.querySelector(".modal-close-button");t&&e.push({element:t,events:["click"],handler:this.hide}),this.open&&(e.push({element:document,events:["keydown"],handler:this.handleEscapeKey}),e.push({element:document,events:["keydown"],handler:this.handleFocusTrap})),e.length>0&&this.addEventListeners(e)}onConnected(){this.log("Modal connected to DOM"),this.open&&this.showModal()}onDisconnected(){this.log("Modal disconnected from DOM"),this.open&&(document.body.style.overflow=""),this.previousActiveElement&&(this.previousActiveElement.focus(),this.previousActiveElement=null)}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}render(){this.shadowRoot.innerHTML=`
      <style>
        :host {
          /* Modal-specific variables using global semantic variables */
          --_modal-backdrop-color: var(--_global-color-background-overlay);
          --_modal-background: var(--_global-color-surface);
          --_modal-border-radius: var(--_global-border-radius-lg);
          --_modal-elevation: var(--_global-elevation-5);
          --_modal-padding: var(--_global-spacing-lg);
          --_modal-header-padding: var(--_global-spacing-lg) var(--_global-spacing-lg) var(--_global-spacing-md) var(--_global-spacing-lg);
          --_modal-footer-padding: var(--_global-spacing-md) var(--_global-spacing-lg) var(--_global-spacing-lg) var(--_global-spacing-lg);
          --_modal-gap: var(--_global-spacing-md);
          
          /* Size variants */
          --_modal-width-sm: 400px;
          --_modal-width-md: 600px;
          --_modal-width-lg: 800px;
          --_modal-width-xl: 1000px;
          --_modal-max-width: 90vw;
          --_modal-max-height: 90vh;
          
          /* Animation */
          --_modal-transition: all var(--_global-motion-duration-medium2) var(--_global-motion-easing-emphasized);
          --_modal-backdrop-transition: opacity var(--_global-motion-duration-medium1) var(--_global-motion-easing-standard);
          
          /* Z-index */
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: var(--_global-z-index-modal);
          
          /* Display management */
          display: ${this.open?"flex":"none"};
          align-items: center;
          justify-content: center;
          padding: var(--_global-spacing-lg);
        }

        .modal-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--_modal-backdrop-color);
          opacity: ${this.open?"1":"0"};
          transition: var(--_modal-backdrop-transition);
          cursor: ${this.closeOnBackdropClick?"pointer":"default"};
        }

        .modal-container {
          position: relative;
          background-color: var(--_modal-background);
          border-radius: var(--_modal-border-radius);
          box-shadow: var(--_modal-elevation);
          max-width: var(--_modal-max-width);
          max-height: var(--_modal-max-height);
          width: var(--_modal-width-md);
          transform: ${this.open?"scale(1)":"scale(0.9)"};
          opacity: ${this.open?"1":"0"};
          transition: var(--_modal-transition);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* Size variants */
        :host([size="sm"]) .modal-container {
          width: var(--_modal-width-sm);
        }

        :host([size="lg"]) .modal-container {
          width: var(--_modal-width-lg);
        }

        :host([size="xl"]) .modal-container {
          width: var(--_modal-width-xl);
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--_modal-header-padding);
          border-bottom: 1px solid var(--_global-color-outline-variant);
          background-color: var(--_global-color-surface-container-low);
        }

        .modal-title {
          font-size: var(--_global-font-size-xl);
          font-weight: var(--_global-font-weight-semibold);
          color: var(--_global-color-on-surface);
          margin: 0;
          line-height: var(--_global-line-height-tight);
        }

        .modal-close-button {
          background: none;
          border: none;
          color: var(--_global-color-on-surface-variant);
          cursor: pointer;
          padding: var(--_global-spacing-sm);
          border-radius: var(--_global-border-radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--_modal-transition);
          font-size: 24px;
          width: 40px;
          height: 40px;
        }

        .modal-close-button:hover {
          background-color: var(--_global-color-surface-variant);
          color: var(--_global-color-on-surface);
        }

        .modal-close-button:focus {
          outline: 2px solid var(--_global-color-primary);
          outline-offset: 2px;
        }

        .modal-body {
          padding: var(--_modal-padding);
          flex: 1;
          overflow-y: auto;
          color: var(--_global-color-on-surface);
          font-size: var(--_global-font-size-md);
          line-height: var(--_global-line-height-normal);
        }

        .modal-footer {
          padding: var(--_modal-footer-padding);
          border-top: 1px solid var(--_global-color-outline-variant);
          background-color: var(--_global-color-surface-container-low);
          display: flex;
          gap: var(--_modal-gap);
          justify-content: flex-end;
          align-items: center;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          :host {
            padding: var(--_global-spacing-md);
          }
          
          .modal-container {
            width: 100%;
            max-width: none;
            margin: 0;
          }
          
          .modal-header {
            padding: var(--_global-spacing-md);
          }
          
          .modal-body {
            padding: var(--_global-spacing-md);
          }
          
          .modal-footer {
            padding: var(--_global-spacing-md);
            flex-wrap: wrap;
          }
        }

        /* Animation for entering/leaving */
        @media (prefers-reduced-motion: no-preference) {
          :host([open]) .modal-container {
            animation: modal-enter var(--_global-motion-duration-medium2) var(--_global-motion-easing-emphasized) forwards;
          }
        }

        @keyframes modal-enter {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .modal-container,
          .modal-backdrop {
            transition: none;
          }
        }
      </style>

      <div class="modal-backdrop" aria-hidden="true"></div>
      <div 
        class="modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-body"
        tabindex="0"
      >
        ${this.title?`
        <header class="modal-header">
          <h2 class="modal-title" id="modal-title">${this.title}</h2>
          <button 
            class="modal-close-button" 
            type="button" 
            aria-label="Close modal"
            tabindex="0"
          >
            ✕
          </button>
        </header>
        `:""}
        
        <div class="modal-body" id="modal-body">
          <slot name="body">
            <slot></slot>
          </slot>
        </div>
        
        <footer class="modal-footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    `}}l.define("my-modal");
