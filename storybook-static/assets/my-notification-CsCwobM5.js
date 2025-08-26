class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.handleClose=this.handleClose.bind(this),this.handleMouseEnter=this.handleMouseEnter.bind(this),this.handleMouseLeave=this.handleMouseLeave.bind(this),this.close=this.close.bind(this),this.show=this.show.bind(this),this.autoCloseTimer=null,this.isPaused=!1,this.render(),this.attachEventListeners()}static get observedAttributes(){return["message","type","duration","closeable","position","icon"]}attributeChangedCallback(t,i,e){i!==e&&(this.render(),this.attachEventListeners(),t==="duration"&&this.isVisible&&this.startAutoClose())}get message(){return this.getAttribute("message")||""}set message(t){this.setAttribute("message",t)}get type(){return this.getAttribute("type")||"info"}set type(t){this.setAttribute("type",t)}get duration(){return parseInt(this.getAttribute("duration"))||5e3}set duration(t){this.setAttribute("duration",t.toString())}get closeable(){return this.hasAttribute("closeable")}set closeable(t){t?this.setAttribute("closeable",""):this.removeAttribute("closeable")}get position(){return this.getAttribute("position")||"top-right"}set position(t){this.setAttribute("position",t)}get icon(){return this.getAttribute("icon")||this.getDefaultIcon()}set icon(t){this.setAttribute("icon",t)}get isVisible(){return this.hasAttribute("visible")}getDefaultIcon(){const t={success:"check_circle",error:"error",warning:"warning",info:"info"};return t[this.type]||t.info}show(){this.setAttribute("visible",""),this.injectIntoBody(),this.startAutoClose(),this.dispatchEvent(new CustomEvent("show",{detail:{message:this.message,type:this.type,duration:this.duration},bubbles:!0}))}hide(){this.removeAttribute("visible"),this.clearAutoCloseTimer(),setTimeout(()=>{this.parentElement===document.body&&document.body.removeChild(this)},300),this.dispatchEvent(new CustomEvent("hide",{detail:{message:this.message,type:this.type},bubbles:!0}))}injectIntoBody(){this.parentElement!==document.body&&document.body.appendChild(this),this.positionInStack()}positionInStack(){const t=document.querySelectorAll("my-notification[visible]"),e=Array.from(t).indexOf(this)*80,o=this.position.split("-"),r=o[0],s=o[1]||"right";this.style.position="fixed",this.style.zIndex="600",r==="top"?(this.style.top=`${16+e}px`,this.style.bottom="auto"):(this.style.bottom=`${16+e}px`,this.style.top="auto"),s==="left"?(this.style.left="16px",this.style.right="auto"):s==="center"?(this.style.left="50%",this.style.right="auto",this.style.transform="translateX(-50%)"):(this.style.right="16px",this.style.left="auto")}startAutoClose(){this.clearAutoCloseTimer(),this.duration>0&&!this.isPaused&&(this.autoCloseTimer=setTimeout(()=>{this.hide()},this.duration))}clearAutoCloseTimer(){this.autoCloseTimer&&(clearTimeout(this.autoCloseTimer),this.autoCloseTimer=null)}handleClose(){this.hide()}handleMouseEnter(){this.isPaused=!0,this.clearAutoCloseTimer()}handleMouseLeave(){this.isPaused=!1,this.startAutoClose()}attachEventListeners(){const t=this.shadowRoot.querySelector(".notification-close"),i=this.shadowRoot.querySelector(".notification-container");t&&(t.removeEventListener("click",this.handleClose),t.addEventListener("click",this.handleClose)),i&&(i.removeEventListener("mouseenter",this.handleMouseEnter),i.removeEventListener("mouseleave",this.handleMouseLeave),i.addEventListener("mouseenter",this.handleMouseEnter),i.addEventListener("mouseleave",this.handleMouseLeave))}connectedCallback(){this.message&&!this.isVisible&&this.show()}disconnectedCallback(){this.clearAutoCloseTimer()}static create(t,i="info",e=5e3){const o=document.createElement("my-notification");return o.message=t,o.type=i,o.duration=e,o.closeable=!0,o.show(),o}static success(t,i=5e3){return n.create(t,"success",i)}static error(t,i=8e3){return n.create(t,"error",i)}static warning(t,i=6e3){return n.create(t,"warning",i)}static info(t,i=5e3){return n.create(t,"info",i)}render(){this.shadowRoot.innerHTML=`
      <style>
        :host {
          /* Notification-specific variables using global semantic variables */
          --_notification-background: var(--_global-color-surface-container);
          --_notification-text-color: var(--_global-color-on-surface);
          --_notification-border-radius: var(--_global-border-radius-lg);
          --_notification-elevation: var(--_global-elevation-3);
          --_notification-padding: var(--_global-spacing-md) var(--_global-spacing-lg);
          --_notification-min-width: 300px;
          --_notification-max-width: 400px;
          --_notification-gap: var(--_global-spacing-sm);
          
          /* Type-specific colors */
          --_notification-success-bg: var(--_global-color-success-container);
          --_notification-success-border: var(--_global-color-success);
          --_notification-success-icon: var(--_global-color-success);
          
          --_notification-error-bg: var(--_global-color-error-container);
          --_notification-error-border: var(--_global-color-error);
          --_notification-error-icon: var(--_global-color-error);
          
          --_notification-warning-bg: var(--_global-color-warning-container);
          --_notification-warning-border: var(--_global-color-warning);
          --_notification-warning-icon: var(--_global-color-warning);
          
          --_notification-info-bg: var(--_global-color-info-container);
          --_notification-info-border: var(--_global-color-info);
          --_notification-info-icon: var(--_global-color-info);
          
          /* Animation */
          --_notification-transition: all var(--_global-motion-duration-medium1) var(--_global-motion-easing-emphasized);
          
          display: ${this.isVisible?"block":"none"};
          position: fixed;
          z-index: var(--_global-z-index-notification);
        }

        .notification-container {
          min-width: var(--_notification-min-width);
          max-width: var(--_notification-max-width);
          background-color: var(--_notification-background);
          border-radius: var(--_notification-border-radius);
          box-shadow: var(--_notification-elevation);
          padding: var(--_notification-padding);
          display: flex;
          align-items: flex-start;
          gap: var(--_notification-gap);
          transition: var(--_notification-transition);
          border-left: 4px solid var(--_notification-info-border);
          cursor: pointer;
          position: relative;
          opacity: ${this.isVisible?"1":"0"};
          transform: translateX(${this.isVisible?"0":"100%"});
        }

        /* Type-specific styling */
        :host([type="success"]) .notification-container {
          background-color: var(--_notification-success-bg);
          border-left-color: var(--_notification-success-border);
        }

        :host([type="error"]) .notification-container {
          background-color: var(--_notification-error-bg);
          border-left-color: var(--_notification-error-border);
        }

        :host([type="warning"]) .notification-container {
          background-color: var(--_notification-warning-bg);
          border-left-color: var(--_notification-warning-border);
        }

        :host([type="info"]) .notification-container {
          background-color: var(--_notification-info-bg);
          border-left-color: var(--_notification-info-border);
        }

        .notification-icon {
          flex-shrink: 0;
          font-size: 20px;
          color: var(--_notification-info-icon);
          font-family: 'Material Icons';
          margin-top: 2px;
        }

        :host([type="success"]) .notification-icon {
          color: var(--_notification-success-icon);
        }

        :host([type="error"]) .notification-icon {
          color: var(--_notification-error-icon);
        }

        :host([type="warning"]) .notification-icon {
          color: var(--_notification-warning-icon);
        }

        :host([type="info"]) .notification-icon {
          color: var(--_notification-info-icon);
        }

        .notification-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: var(--_global-spacing-xs);
        }

        .notification-message {
          color: var(--_notification-text-color);
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-medium);
          line-height: var(--_global-line-height-normal);
          margin: 0;
        }

        .notification-close {
          flex-shrink: 0;
          background: none;
          border: none;
          color: var(--_notification-text-color);
          cursor: pointer;
          padding: 2px;
          border-radius: var(--_global-border-radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.7;
          transition: var(--_notification-transition);
          font-size: 16px;
          width: 20px;
          height: 20px;
          margin-top: 2px;
        }

        .notification-close:hover {
          opacity: 1;
          background-color: rgba(0, 0, 0, 0.1);
        }

        .notification-close:focus {
          outline: 2px solid var(--_global-color-primary);
          outline-offset: 2px;
        }

        /* Animation states */
        :host([visible]) .notification-container {
          animation: notification-enter var(--_global-motion-duration-medium1) var(--_global-motion-easing-emphasized) forwards;
        }

        @keyframes notification-enter {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Hover effects */
        .notification-container:hover {
          box-shadow: var(--_global-elevation-4);
          transform: translateY(-1px);
        }

        /* Progress bar for duration */
        .notification-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background-color: var(--_notification-info-border);
          border-radius: 0 0 var(--_notification-border-radius) var(--_notification-border-radius);
          animation: notification-progress ${this.duration}ms linear forwards;
        }

        :host([type="success"]) .notification-progress {
          background-color: var(--_notification-success-border);
        }

        :host([type="error"]) .notification-progress {
          background-color: var(--_notification-error-border);
        }

        :host([type="warning"]) .notification-progress {
          background-color: var(--_notification-warning-border);
        }

        @keyframes notification-progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        /* Responsive design */
        @media (max-width: 480px) {
          :host {
            left: 8px !important;
            right: 8px !important;
            transform: none !important;
          }
          
          .notification-container {
            min-width: auto;
            max-width: none;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .notification-container,
          .notification-progress {
            animation: none;
            transition: none;
          }
        }
      </style>

      <div class="notification-container" role="alert" aria-live="polite">
        <span class="notification-icon">${this.icon}</span>
        
        <div class="notification-content">
          <p class="notification-message">
            <slot>${this.message}</slot>
          </p>
        </div>
        
        ${this.closeable?`
          <button 
            class="notification-close" 
            type="button"
            aria-label="Close notification"
          >
            ✕
          </button>
        `:""}
        
        ${this.duration>0&&this.isVisible?'<div class="notification-progress" aria-hidden="true"></div>':""}
      </div>
    `}}customElements.get("my-notification")||customElements.define("my-notification",n);
