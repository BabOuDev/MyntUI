import{M as l}from"./base-component-q4KNMHwB.js";class p extends l{constructor(){super(),this._isOpen=!1,this._options=[],this._selectedValue=null,this._selectedIndex=-1,this.handleTriggerClick=this.handleTriggerClick.bind(this),this.handleOptionClick=this.handleOptionClick.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleOutsideClick=this.handleOutsideClick.bind(this),this.handleTriggerKeyDown=this.handleTriggerKeyDown.bind(this),this.log("Dropdown component initializing...")}static get observedAttributes(){return[...super.observedAttributes,"options","position","trigger-text","value","placeholder","multiple","search"]}handleAttributeChange(o,e,t){switch(super.handleAttributeChange(o,e,t),o){case"options":this.parseOptions();break;case"value":this.updateSelectedOption();break;case"disabled":this.disabled&&this._isOpen&&this.close(),this.announceToScreenReader(`Dropdown ${this.disabled?"disabled":"enabled"}`,"polite");break}}parseOptions(){const o=this.getAttribute("options");if(o)try{this._options=JSON.parse(o)}catch(e){console.warn("Invalid options JSON in my-dropdown:",e),this._options=[]}}updateSelectedOption(){const o=this.getAttribute("value");if(o&&this._options.length>0){const e=this._options.findIndex(t=>t.value===o);this._selectedIndex=e,this._selectedValue=o}else this._selectedIndex=-1,this._selectedValue=null}get options(){return this._options}set options(o){this._options=Array.isArray(o)?o:[],this.setAttribute("options",JSON.stringify(this._options)),this.updateSelectedOption()}get disabled(){return this.hasAttribute("disabled")}set disabled(o){o?this.setAttribute("disabled",""):this.removeAttribute("disabled")}get position(){return this.getAttribute("position")||"bottom"}set position(o){this.setAttribute("position",o)}get triggerText(){return this.getAttribute("trigger-text")||""}set triggerText(o){this.setAttribute("trigger-text",o)}get value(){return this._selectedValue}set value(o){this._selectedValue=o,this.setAttribute("value",o||""),this.updateSelectedOption()}get placeholder(){return this.getAttribute("placeholder")||"Select an option"}set placeholder(o){this.setAttribute("placeholder",o)}get size(){return this.getAttribute("size")||"md"}set size(o){this.setAttribute("size",o)}get error(){return this.hasAttribute("error")}set error(o){o?this.setAttribute("error",""):this.removeAttribute("error")}get multiple(){return this.hasAttribute("multiple")}set multiple(o){o?this.setAttribute("multiple",""):this.removeAttribute("multiple")}get search(){return this.hasAttribute("search")}set search(o){o?this.setAttribute("search",""):this.removeAttribute("search")}get isOpen(){return this._isOpen}open(){if(this.disabled||this._isOpen)return;this._isOpen=!0;const o=this.shadowRoot.querySelector(".dropdown-menu");if(o){o.classList.add("open"),this.positionDropdown();const e=this._selectedIndex>=0?this._selectedIndex:0;this.focusOption(e)}this.attachEventListeners(),this.emit("open",{isOpen:!0}),this.announceToScreenReader("Dropdown menu opened","polite")}close(){if(!this._isOpen)return;this._isOpen=!1;const o=this.shadowRoot.querySelector(".dropdown-menu");o&&o.classList.remove("open"),this.attachEventListeners();const e=this.shadowRoot.querySelector(".dropdown-trigger");e&&e.focus(),this.emit("close",{isOpen:!1}),this.announceToScreenReader("Dropdown menu closed","polite")}toggle(){this._isOpen?this.close():this.open()}positionDropdown(){const o=this.shadowRoot.querySelector(".dropdown-menu"),e=this.shadowRoot.querySelector(".dropdown-trigger");if(!o||!e)return;const t=e.getBoundingClientRect(),r=o.getBoundingClientRect(),n=window.innerHeight,a=window.innerWidth;let i=this.position;if(i==="auto"){const s=n-t.bottom,d=t.top;i=s>=r.height||s>=d?"bottom":"top"}o.classList.toggle("position-top",i==="top"),o.classList.toggle("position-bottom",i==="bottom"),t.left+r.width>a-16?o.classList.add("align-right"):o.classList.remove("align-right")}focusOption(o){const e=this.shadowRoot.querySelectorAll(".dropdown-option");e[o]&&(e.forEach(t=>t.classList.remove("focused")),e[o].classList.add("focused"),e[o].focus(),this._selectedIndex=o)}handleTriggerClick(o){this.disabled||(o.preventDefault(),this.toggle())}handleTriggerKeyDown(o){if(!this.disabled)switch(o.key){case"Enter":case" ":case"ArrowDown":o.preventDefault(),this.open();break;case"ArrowUp":o.preventDefault(),this.open(),this._options.length>0&&this.focusOption(this._options.length-1);break;case"Escape":this.close();break}}handleOptionClick(o){const e=o.target.closest(".dropdown-option");if(!e)return;const t=parseInt(e.dataset.index),r=this._options[t];r&&!r.disabled&&(this.selectOption(r,t),this.close())}handleKeyDown(o){if(!this._isOpen)return;const e=this.shadowRoot.querySelectorAll(".dropdown-option:not([disabled])"),t=Array.from(e).findIndex(r=>r.classList.contains("focused"));switch(o.key){case"ArrowDown":o.preventDefault();const r=t<e.length-1?t+1:0;this.focusOption(Array.from(this.shadowRoot.querySelectorAll(".dropdown-option")).indexOf(e[r]));break;case"ArrowUp":o.preventDefault();const n=t>0?t-1:e.length-1;this.focusOption(Array.from(this.shadowRoot.querySelectorAll(".dropdown-option")).indexOf(e[n]));break;case"Enter":case" ":o.preventDefault(),t>=0&&e[t].click();break;case"Escape":o.preventDefault(),this.close();break;case"Home":o.preventDefault(),e.length>0&&this.focusOption(Array.from(this.shadowRoot.querySelectorAll(".dropdown-option")).indexOf(e[0]));break;case"End":o.preventDefault(),e.length>0&&this.focusOption(Array.from(this.shadowRoot.querySelectorAll(".dropdown-option")).indexOf(e[e.length-1]));break}}handleOutsideClick(o){this.contains(o.target)||this.close()}selectOption(o,e){const t=this._selectedValue;this._selectedValue=o.value,this._selectedIndex=e,this.setAttribute("value",this._selectedValue),o.action&&typeof o.action=="function"&&o.action(o),this.emit("select",{value:this._selectedValue,oldValue:t,option:o,index:e})}attachEventListeners(){this.removeEventListeners();const o=[],e=this.shadowRoot.querySelector(".dropdown-trigger");e&&(o.push({element:e,events:["click"],handler:this.handleTriggerClick}),o.push({element:e,events:["keydown"],handler:this.handleTriggerKeyDown}));const t=this.shadowRoot.querySelector(".dropdown-menu");t&&(o.push({element:t,events:["click"],handler:this.handleOptionClick}),o.push({element:t,events:["keydown"],handler:this.handleKeyDown})),this._isOpen&&o.push({element:document,events:["click"],handler:this.handleOutsideClick}),o.length>0&&this.addEventListeners(o)}onConnected(){this.log("Dropdown connected to DOM"),this.parseOptions(),this.updateSelectedOption()}onDisconnected(){this.log("Dropdown disconnected from DOM"),this._isOpen&&(this._isOpen=!1)}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}getDisplayText(){return this._selectedIndex>=0&&this._options[this._selectedIndex]?this._options[this._selectedIndex].label:this.triggerText||this.placeholder}render(){this.shadowRoot.innerHTML=`
      <style>
        :host {
          /* Component-specific variables using global variables */
          --_dropdown-min-width: 112px;
          --_dropdown-max-width: 280px;
          --_dropdown-trigger-height: var(--_global-input-height);
          --_dropdown-trigger-padding: var(--_global-spacing-sm) var(--_global-spacing-md);
          --_dropdown-border-radius: var(--_global-border-radius-sm);
          --_dropdown-menu-border-radius: var(--_global-border-radius-xs);
          --_dropdown-border-color: var(--_global-color-outline-variant);
          --_dropdown-border-color-hover: var(--_global-color-outline);
          --_dropdown-border-color-focus: var(--_global-color-primary);
          --_dropdown-trigger-bg: var(--_global-color-surface-container-low);
          --_dropdown-trigger-bg-hover: var(--_global-color-surface-container);
          --_dropdown-trigger-bg-focus: var(--_global-color-surface-container-high);
          --_dropdown-menu-bg: var(--_global-color-surface-container);
          --_dropdown-text-color: var(--_global-color-on-surface);
          --_dropdown-placeholder-color: var(--_global-color-on-surface-variant);
          --_dropdown-icon-color: var(--_global-color-on-surface-variant);
          --_dropdown-elevation: var(--_global-elevation-1);
          --_dropdown-elevation-hover: var(--_global-elevation-2);
          --_dropdown-menu-elevation: var(--_global-elevation-3);
          --_dropdown-z-index: var(--_global-z-index-dropdown);
          --_dropdown-transition: all var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          
          display: inline-block;
          position: relative;
          min-width: var(--_dropdown-min-width);
          font-family: var(--_global-font-family-sans);
        }

        :host([disabled]) {
          opacity: 0.6;
          cursor: not-allowed;
          pointer-events: none;
        }

        .dropdown-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: var(--_dropdown-trigger-height);
          padding: var(--_dropdown-trigger-padding);
          border: 1px solid var(--_dropdown-border-color);
          border-radius: var(--_dropdown-border-radius);
          background-color: var(--_dropdown-trigger-bg);
          color: var(--_dropdown-text-color);
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-medium);
          font-family: var(--_global-font-family-sans);
          cursor: pointer;
          outline: none;
          transition: var(--_dropdown-transition);
          user-select: none;
          box-shadow: var(--_dropdown-elevation);
          position: relative;
          z-index: 1;
        }
        
        /* State layer for Material Design 3 */
        .dropdown-trigger::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: currentColor;
          opacity: 0;
          transition: opacity var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
          pointer-events: none;
          border-radius: inherit;
        }

        .dropdown-trigger:hover:not(:disabled)::before {
          opacity: var(--_global-state-layer-hover);
        }

        .dropdown-trigger:hover:not(:disabled) {
          border-color: var(--_dropdown-border-color-hover);
          background-color: var(--_dropdown-trigger-bg-hover);
          box-shadow: var(--_dropdown-elevation-hover);
        }
        
        .dropdown-trigger:active:not(:disabled)::before {
          opacity: var(--_global-state-layer-pressed);
        }

        .dropdown-trigger:focus-visible {
          border-color: var(--_dropdown-border-color-focus);
          border-width: 2px;
          background-color: var(--_dropdown-trigger-bg-focus);
          outline: 2px solid var(--_dropdown-border-color-focus);
          outline-offset: 2px;
        }

        .dropdown-trigger.open {
          border-color: var(--_dropdown-border-color-focus);
          border-width: 2px;
          background-color: var(--_dropdown-trigger-bg-focus);
          box-shadow: var(--_dropdown-elevation-hover);
        }

        .trigger-text {
          flex: 1;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .trigger-text.placeholder {
          color: var(--_dropdown-placeholder-color);
        }

        .dropdown-icon {
          margin-left: var(--_global-spacing-sm);
          width: 18px;
          height: 18px;
          color: var(--_dropdown-icon-color);
          transition: transform var(--_global-motion-duration-short2) var(--_global-motion-easing-emphasized);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .dropdown-icon::before {
          content: '';
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 5px solid currentColor;
          transition: inherit;
        }

        .dropdown-trigger.open .dropdown-icon {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          min-width: 100%;
          max-width: var(--_dropdown-max-width);
          margin-top: var(--_global-spacing-xs);
          background-color: var(--_dropdown-menu-bg);
          border: 1px solid var(--_dropdown-border-color);
          border-radius: var(--_dropdown-menu-border-radius);
          box-shadow: var(--_dropdown-menu-elevation);
          z-index: var(--_dropdown-z-index);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-8px) scale(0.95);
          transition: all var(--_global-motion-duration-medium1) var(--_global-motion-easing-emphasized);
          max-height: 320px;
          overflow-y: auto;
          padding: var(--_global-spacing-xs) 0;
        }

        .dropdown-menu.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
        }

        .dropdown-menu.position-top {
          top: auto;
          bottom: 100%;
          margin-top: 0;
          margin-bottom: var(--_global-spacing-xs);
          transform: translateY(8px) scale(0.95);
        }

        .dropdown-menu.position-top.open {
          transform: translateY(0) scale(1);
        }

        .dropdown-menu.align-right {
          left: auto;
          right: 0;
        }

        .dropdown-option {
          display: flex;
          align-items: center;
          padding: var(--_global-spacing-sm) var(--_global-spacing-md);
          color: var(--_global-color-on-surface);
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-normal);
          cursor: pointer;
          transition: background-color var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
          outline: none;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          min-height: 32px;
          border-radius: var(--_global-border-radius-xs);
          margin: 0 var(--_global-spacing-xs);
          position: relative;
        }

        .dropdown-option:hover:not([disabled]) {
          background-color: color-mix(in srgb, var(--_global-color-primary) calc(var(--_global-state-layer-hover) * 100%), transparent);
        }

        .dropdown-option.focused {
          background-color: color-mix(in srgb, var(--_global-color-primary) calc(var(--_global-state-layer-focus) * 100%), transparent);
        }

        .dropdown-option.selected {
          background-color: color-mix(in srgb, var(--_global-color-primary) calc(var(--_global-state-layer-selected) * 100%), transparent);
          color: var(--_global-color-primary);
          font-weight: var(--_global-font-weight-medium);
        }

        .dropdown-option[disabled] {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }

        .dropdown-option-icon {
          margin-right: var(--_global-spacing-sm);
          font-size: 18px;
        }

        .dropdown-divider {
          height: 1px;
          background-color: var(--_global-color-outline-variant);
          margin: var(--_global-spacing-xs) 0;
        }

        /* Size variants */
        :host([size="sm"]) {
          --_dropdown-trigger-height: var(--_global-input-height-sm);
          --_dropdown-trigger-padding: 6px var(--_global-spacing-sm);
          --_dropdown-min-width: 100px;
        }

        :host([size="lg"]) {
          --_dropdown-trigger-height: var(--_global-input-height-lg);
          --_dropdown-trigger-padding: var(--_global-spacing-sm) var(--_global-spacing-md);
          --_dropdown-min-width: 140px;
        }

        /* Error state */
        :host([error]) {
          --_dropdown-border-color: var(--_global-color-error);
          --_dropdown-border-color-hover: var(--_global-color-error);
          --_dropdown-border-color-focus: var(--_global-color-error);
        }

        :host([error]) .dropdown-trigger {
          border-color: var(--_global-color-error);
        }

        :host([error]) .dropdown-trigger:focus-visible {
          outline-color: var(--_global-color-error);
        }

        :host([error]) .trigger-text {
          color: var(--_global-color-error);
        }

        /* Enhanced disabled state */
        :host([disabled]) .dropdown-trigger {
          opacity: 0.6;
          background-color: var(--_global-color-surface-variant);
          border-color: var(--_global-color-outline);
          cursor: not-allowed;
        }

        :host([disabled]) .trigger-text {
          color: var(--_global-color-outline);
        }

        /* Improved animations with reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .dropdown-menu,
          .dropdown-trigger,
          .dropdown-icon,
          .dropdown-option {
            transition: none !important;
          }
          
          .dropdown-trigger.open .dropdown-icon {
            transform: none;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .dropdown-trigger {
            border-width: 2px;
          }
          
          .dropdown-option:focus,
          .dropdown-option.focused {
            outline: 2px solid currentColor;
            outline-offset: -2px;
          }
        }
      </style>

      <button 
        class="dropdown-trigger ${this._isOpen?"open":""}"
        type="button"
        ${this.disabled?"disabled":""}
        aria-expanded="${this._isOpen}"
        aria-haspopup="listbox"
        aria-label="${this.getAttribute("aria-label")||"dropdown menu"}"
      >
        <slot name="trigger">
          <span class="trigger-text ${!this._selectedValue&&!this.triggerText?"placeholder":""}">
            ${this.getDisplayText()}
          </span>
        </slot>
        <span class="dropdown-icon"></span>
      </button>

      <div 
        class="dropdown-menu ${this._isOpen?"open":""}"
        role="listbox"
        ${this._selectedValue?`aria-activedescendant="option-${this._selectedIndex}"`:""}
      >
        ${this._options.map((o,e)=>o.type==="divider"?'<div class="dropdown-divider"></div>':`
            <button
              class="dropdown-option ${this._selectedIndex===e?"selected":""}"
              role="option"
              id="option-${e}"
              data-index="${e}"
              ${o.disabled?"disabled":""}
              aria-selected="${this._selectedIndex===e}"
              tabindex="-1"
            >
              ${o.icon?`<span class="dropdown-option-icon" aria-label="${o.icon}">${o.icon}</span>`:""}
              ${o.label}
            </button>
          `).join("")}
      </div>
    `}}p.define("my-dropdown");
