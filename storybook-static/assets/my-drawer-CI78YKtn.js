class h extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._isOpen=!1,this._isAnimating=!1,this._initialTouchX=null,this._initialTouchY=null,this._startTime=null,this.handleBackdropClick=this.handleBackdropClick.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleTouchStart=this.handleTouchStart.bind(this),this.handleTouchMove=this.handleTouchMove.bind(this),this.handleTouchEnd=this.handleTouchEnd.bind(this),this.handleResize=this.handleResize.bind(this),this.handleTransitionEnd=this.handleTransitionEnd.bind(this),this.render(),this.attachEventListeners()}static get observedAttributes(){return["open","position","mode","size","backdrop","swipeable","persistent","close-on-escape","close-on-backdrop-click"]}attributeChangedCallback(e,t,i){t!==i&&(e==="open"&&(this._isOpen=this.hasAttribute("open"),this.updateVisibility()),this.render(),this.attachEventListeners())}get open(){return this.hasAttribute("open")}set open(e){e?this.setAttribute("open",""):this.removeAttribute("open")}get position(){return this.getAttribute("position")||"left"}set position(e){this.setAttribute("position",e)}get mode(){return this.getAttribute("mode")||"overlay"}set mode(e){this.setAttribute("mode",e)}get size(){return this.getAttribute("size")||"md"}set size(e){this.setAttribute("size",e)}get backdrop(){return this.getAttribute("backdrop")!=="false"}set backdrop(e){this.setAttribute("backdrop",e?"":"false")}get swipeable(){return this.hasAttribute("swipeable")}set swipeable(e){e?this.setAttribute("swipeable",""):this.removeAttribute("swipeable")}get persistent(){return this.hasAttribute("persistent")}set persistent(e){e?this.setAttribute("persistent",""):this.removeAttribute("persistent")}get closeOnEscape(){return this.getAttribute("close-on-escape")!=="false"}set closeOnEscape(e){this.setAttribute("close-on-escape",e?"":"false")}get closeOnBackdropClick(){return this.getAttribute("close-on-backdrop-click")!=="false"}set closeOnBackdropClick(e){this.setAttribute("close-on-backdrop-click",e?"":"false")}show(){return this._isAnimating?Promise.resolve():new Promise(e=>{this._isAnimating=!0,this.open=!0,this.dispatchEvent(new CustomEvent("open",{detail:{position:this.position,mode:this.mode},bubbles:!0,cancelable:!0})),this.trapFocus(),setTimeout(()=>{this._isAnimating=!1,e()},300)})}hide(){return this._isAnimating?Promise.resolve():new Promise(e=>{this._isAnimating=!0,this.open=!1,this.dispatchEvent(new CustomEvent("close",{detail:{position:this.position,mode:this.mode},bubbles:!0,cancelable:!0})),setTimeout(()=>{this._isAnimating=!1,this.restoreFocus(),e()},300)})}toggle(){return this.open?this.hide():this.show()}trapFocus(){const e=this.shadowRoot.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');e.length>0&&(this._previousFocus=document.activeElement,e[0].focus())}restoreFocus(){this._previousFocus&&(this._previousFocus.focus(),this._previousFocus=null)}handleBackdropClick(e){e.target.classList.contains("drawer-backdrop")&&this.closeOnBackdropClick&&(e.preventDefault(),this.hide())}handleKeyDown(e){e.key==="Escape"&&this.closeOnEscape&&this.open&&(e.preventDefault(),this.hide())}handleTouchStart(e){if(!this.swipeable||this._isAnimating)return;const t=e.touches[0];this._initialTouchX=t.clientX,this._initialTouchY=t.clientY,this._startTime=Date.now()}handleTouchMove(e){if(!this.swipeable||!this._initialTouchX||this._isAnimating)return;const t=e.touches[0],i=t.clientX-this._initialTouchX,s=t.clientY-this._initialTouchY,a=Math.abs(i)>Math.abs(s),r=this.position;!a&&(r==="left"||r==="right")||a&&(r==="top"||r==="bottom")||e.preventDefault()}handleTouchEnd(e){if(!this.swipeable||!this._initialTouchX||this._isAnimating)return;const t=e.changedTouches[0],i=t.clientX-this._initialTouchX,s=t.clientY-this._initialTouchY,a=Date.now()-this._startTime;this._initialTouchX=null,this._initialTouchY=null,this._startTime=null;const r=50,n=300,d=this.position;let o=!1;if(a<=n)switch(d){case"left":o=i<-r;break;case"right":o=i>r;break;case"top":o=s<-r;break;case"bottom":o=s>r;break}o&&this.open&&this.hide()}handleResize(){this.open&&this.updateVisibility()}handleTransitionEnd(e){e.target===e.currentTarget&&(this._isAnimating=!1)}updateVisibility(){this.open&&!this.parentElement?document.body.appendChild(this):!this.open&&this.parentElement===document.body&&setTimeout(()=>{!this.open&&this.parentElement===document.body&&document.body.removeChild(this)},300)}attachEventListeners(){const e=this.shadowRoot.querySelector(".drawer-backdrop"),t=this.shadowRoot.querySelector(".drawer-panel");e&&(e.removeEventListener("click",this.handleBackdropClick),e.addEventListener("click",this.handleBackdropClick)),t&&(t.removeEventListener("transitionend",this.handleTransitionEnd),t.addEventListener("transitionend",this.handleTransitionEnd)),document.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("resize",this.handleResize),this.open&&(document.addEventListener("keydown",this.handleKeyDown),window.addEventListener("resize",this.handleResize)),this.swipeable&&(this.removeEventListener("touchstart",this.handleTouchStart),this.removeEventListener("touchmove",this.handleTouchMove),this.removeEventListener("touchend",this.handleTouchEnd),this.addEventListener("touchstart",this.handleTouchStart,{passive:!1}),this.addEventListener("touchmove",this.handleTouchMove,{passive:!1}),this.addEventListener("touchend",this.handleTouchEnd,{passive:!1}))}render(){const e=this.position,t=this.mode,i=this.size,s=this.backdrop&&t==="overlay";this.shadowRoot.innerHTML=`
      <style>
        :host {
          /* Drawer-specific variables using global semantic variables */
          --_drawer-width-sm: 240px;
          --_drawer-width-md: 320px;
          --_drawer-width-lg: 400px;
          --_drawer-width-xl: 480px;
          --_drawer-height-sm: 200px;
          --_drawer-height-md: 300px;
          --_drawer-height-lg: 400px;
          --_drawer-height-xl: 500px;
          
          --_drawer-width: var(--_drawer-width-${i});
          --_drawer-height: var(--_drawer-height-${i});
          
          --_drawer-background: var(--_global-color-surface-container);
          --_drawer-elevation: var(--_global-elevation-3);
          --_drawer-border-radius: var(--_global-border-radius-lg);
          
          --_drawer-backdrop-color: var(--_global-color-background-overlay);
          --_drawer-z-index: var(--_global-z-index-drawer);
          
          --_drawer-transition-duration: var(--_global-motion-duration-medium2);
          --_drawer-transition-easing: var(--_global-motion-easing-emphasized);
          
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: var(--_drawer-z-index);
          pointer-events: ${this.open?"auto":"none"};
          opacity: ${this.open?"1":"0"};
          transition: opacity var(--_drawer-transition-duration) var(--_drawer-transition-easing);
        }

        .drawer-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--_drawer-backdrop-color);
          opacity: ${this.open&&s?"1":"0"};
          visibility: ${this.open&&s?"visible":"hidden"};
          transition: all var(--_drawer-transition-duration) var(--_drawer-transition-easing);
          cursor: pointer;
        }

        .drawer-panel {
          position: absolute;
          background: var(--_drawer-background);
          box-shadow: var(--_drawer-elevation);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: transform var(--_drawer-transition-duration) var(--_drawer-transition-easing);
        }

        /* Position variants */
        .drawer-panel.position-left {
          top: 0;
          left: 0;
          bottom: 0;
          width: var(--_drawer-width);
          border-radius: 0 var(--_drawer-border-radius) var(--_drawer-border-radius) 0;
          transform: translateX(${this.open?"0":"-100%"});
        }

        .drawer-panel.position-right {
          top: 0;
          right: 0;
          bottom: 0;
          width: var(--_drawer-width);
          border-radius: var(--_drawer-border-radius) 0 0 var(--_drawer-border-radius);
          transform: translateX(${this.open?"0":"100%"});
        }

        .drawer-panel.position-top {
          top: 0;
          left: 0;
          right: 0;
          height: var(--_drawer-height);
          border-radius: 0 0 var(--_drawer-border-radius) var(--_drawer-border-radius);
          transform: translateY(${this.open?"0":"-100%"});
        }

        .drawer-panel.position-bottom {
          bottom: 0;
          left: 0;
          right: 0;
          height: var(--_drawer-height);
          border-radius: var(--_drawer-border-radius) var(--_drawer-border-radius) 0 0;
          transform: translateY(${this.open?"0":"100%"});
        }

        /* Size variants for different positions */
        :host([size="sm"]) .drawer-panel.position-left,
        :host([size="sm"]) .drawer-panel.position-right {
          width: var(--_drawer-width-sm);
        }

        :host([size="lg"]) .drawer-panel.position-left,
        :host([size="lg"]) .drawer-panel.position-right {
          width: var(--_drawer-width-lg);
        }

        :host([size="xl"]) .drawer-panel.position-left,
        :host([size="xl"]) .drawer-panel.position-right {
          width: var(--_drawer-width-xl);
        }

        :host([size="sm"]) .drawer-panel.position-top,
        :host([size="sm"]) .drawer-panel.position-bottom {
          height: var(--_drawer-height-sm);
        }

        :host([size="lg"]) .drawer-panel.position-top,
        :host([size="lg"]) .drawer-panel.position-bottom {
          height: var(--_drawer-height-lg);
        }

        :host([size="xl"]) .drawer-panel.position-top,
        :host([size="xl"]) .drawer-panel.position-bottom {
          height: var(--_drawer-height-xl);
        }

        /* Mode variants */
        :host([mode="push"]) {
          position: relative;
          z-index: auto;
        }

        :host([mode="push"]) .drawer-backdrop {
          display: none;
        }

        /* Header and content areas */
        .drawer-header {
          padding: var(--_global-spacing-lg);
          border-bottom: 1px solid var(--_global-color-outline-variant);
          background: var(--_global-color-surface-container-low);
          flex-shrink: 0;
        }

        .drawer-content {
          flex: 1;
          overflow-y: auto;
          padding: var(--_global-spacing-lg);
        }

        .drawer-footer {
          padding: var(--_global-spacing-lg);
          border-top: 1px solid var(--_global-color-outline-variant);
          background: var(--_global-color-surface-container-low);
          flex-shrink: 0;
        }

        /* Scrolling */
        .drawer-content::-webkit-scrollbar {
          width: 6px;
        }

        .drawer-content::-webkit-scrollbar-track {
          background: transparent;
        }

        .drawer-content::-webkit-scrollbar-thumb {
          background: var(--_global-color-outline-variant);
          border-radius: var(--_global-border-radius-sm);
        }

        .drawer-content::-webkit-scrollbar-thumb:hover {
          background: var(--_global-color-outline);
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .drawer-panel.position-left,
          .drawer-panel.position-right {
            width: min(var(--_drawer-width), calc(100vw - var(--_global-spacing-xl)));
          }
          
          .drawer-panel.position-top,
          .drawer-panel.position-bottom {
            height: min(var(--_drawer-height), calc(100vh - var(--_global-spacing-xl)));
          }
        }

        /* High contrast support */
        @media (prefers-contrast: high) {
          .drawer-panel {
            border: 2px solid var(--_global-color-outline);
          }
          
          .drawer-header,
          .drawer-footer {
            border-color: var(--_global-color-outline);
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          :host,
          .drawer-backdrop,
          .drawer-panel {
            transition: none;
          }
        }

        /* Focus management */
        .drawer-panel:focus {
          outline: none;
        }

        /* Persistent drawer styles */
        :host([persistent]) .drawer-backdrop {
          pointer-events: none;
          opacity: 0;
        }

        /* No backdrop mode */
        :host([backdrop="false"]) .drawer-backdrop {
          display: none;
        }
      </style>

      ${s?'<div class="drawer-backdrop"></div>':""}
      
      <div 
        class="drawer-panel position-${e}"
        role="dialog"
        aria-modal="${t==="overlay"}"
        aria-label="Drawer panel"
        tabindex="-1"
      >
        <div class="drawer-header">
          <slot name="header"></slot>
        </div>
        
        <div class="drawer-content">
          <slot></slot>
        </div>
        
        <div class="drawer-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `,this.updateVisibility()}connectedCallback(){this.open&&this.parentElement!==document.body&&this.updateVisibility()}disconnectedCallback(){document.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("resize",this.handleResize),this.restoreFocus()}}customElements.get("my-drawer")||customElements.define("my-drawer",h);
