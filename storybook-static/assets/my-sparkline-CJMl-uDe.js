class g extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._data=[],this._animationId=null,this._currentAnimationValue=0,this.handleResize=this.handleResize.bind(this),this.parseData(),this.render(),this.attachEventListeners()}static get observedAttributes(){return["data","color","width","height","line-width","animated","variant","size","fill","gradient","dots","smooth"]}attributeChangedCallback(t,i,e){i!==e&&(t==="data"&&this.parseData(),this.render(),this.attachEventListeners())}parseData(){const t=this.getAttribute("data");if(t)try{this._data=JSON.parse(t)}catch(i){console.warn("Invalid data JSON in my-sparkline:",i),this._data=[]}Array.isArray(this._data)||(this._data=[]),this._data=this._data.map(i=>typeof i=="number"?i:parseFloat(i)).filter(i=>!isNaN(i))}get data(){return this._data}set data(t){this._data=Array.isArray(t)?t:[],this.render()}get color(){return this.getAttribute("color")||"var(--_global-color-primary)"}set color(t){this.setAttribute("color",t)}get width(){return parseInt(this.getAttribute("width"))||120}set width(t){this.setAttribute("width",t)}get height(){return parseInt(this.getAttribute("height"))||40}set height(t){this.setAttribute("height",t)}get lineWidth(){return parseFloat(this.getAttribute("line-width"))||2}set lineWidth(t){this.setAttribute("line-width",t)}get animated(){return this.hasAttribute("animated")}set animated(t){t?this.setAttribute("animated",""):this.removeAttribute("animated")}get variant(){return this.getAttribute("variant")||"line"}set variant(t){this.setAttribute("variant",t)}get size(){return this.getAttribute("size")||"md"}set size(t){this.setAttribute("size",t)}get fill(){return this.hasAttribute("fill")}set fill(t){t?this.setAttribute("fill",""):this.removeAttribute("fill")}get gradient(){return this.hasAttribute("gradient")}set gradient(t){t?this.setAttribute("gradient",""):this.removeAttribute("gradient")}get dots(){return this.hasAttribute("dots")}set dots(t){t?this.setAttribute("dots",""):this.removeAttribute("dots")}get smooth(){return this.hasAttribute("smooth")}set smooth(t){t?this.setAttribute("smooth",""):this.removeAttribute("smooth")}createPath(){if(this._data.length<2)return"";const t=this.width,i=this.height,e=4,a=t-e*2,r=i-e*2,s=Math.min(...this._data),n=Math.max(...this._data)-s||1,l=this._data.map((h,d)=>{const c=e+d/(this._data.length-1)*a,p=e+r-(h-s)/n*r;return{x:c,y:p,value:h}});return this.smooth?this.createSmoothPath(l):this.createLinearPath(l)}createLinearPath(t){let i=`M ${t[0].x} ${t[0].y}`;for(let e=1;e<t.length;e++)i+=` L ${t[e].x} ${t[e].y}`;return i}createSmoothPath(t){if(t.length<2)return"";let i=`M ${t[0].x} ${t[0].y}`;for(let e=1;e<t.length;e++){const a=t[e],r=t[e-1];if(e===1){t[e+1];const s=r.x+(a.x-r.x)*.5,o=r.y;i+=` Q ${s} ${o} ${a.x} ${a.y}`}else if(e===t.length-1)i+=` L ${a.x} ${a.y}`;else{const s=t[e+1],o=r.x+(s.x-r.x)*.3,n=r.y+(s.y-r.y)*.3;i+=` Q ${o} ${n} ${a.x} ${a.y}`}}return i}createAreaPath(){const t=this.createPath();if(!t)return"";const i=this.width,e=this.height,a=4;return t+` L ${i-a} ${e-a} L ${a} ${e-a} Z`}handleResize(){this.render()}attachEventListeners(){this.removeEventListeners(),this.hasAttribute("responsive")&&(window.addEventListener("resize",this.handleResize),this._eventTargets=[{element:window,events:["resize"]}])}removeEventListeners(){this._eventTargets&&(this._eventTargets.forEach(t=>{t.element.removeEventListener("resize",this.handleResize)}),this._eventTargets=null),this._animationId&&(cancelAnimationFrame(this._animationId),this._animationId=null)}disconnectedCallback(){this.removeEventListeners(),this.stopAnimation()}animate(){if(!this.animated)return;const t=.7,i=1;this._currentAnimationValue+=(i-this._currentAnimationValue)*.08;const e=this._currentAnimationValue<1?1-Math.pow(2,-8*this._currentAnimationValue)*Math.cos((this._currentAnimationValue*6-t)*(2*Math.PI)/3):1;Math.abs(1-this._currentAnimationValue)<.001?(this._currentAnimationValue=1,this.triggerAnimationComplete()):this._animationId=requestAnimationFrame(()=>this.animate());const a=this.shadowRoot.querySelector("svg"),r=a==null?void 0:a.querySelector(".sparkline-path"),s=a==null?void 0:a.querySelector(".sparkline-area"),o=a==null?void 0:a.querySelectorAll(".sparkline-dot");if(r){const n=r.getTotalLength(),l=n*e;r.style.strokeDasharray=`${l}, ${n}`,r.style.filter=`
        drop-shadow(0 0 ${2+e*6}px currentColor)
        brightness(${1+e*.2})
      `}if(s&&e>.3){const n=Math.max(0,(e-.3)/.7);s.style.opacity=(.1*n).toString()}o.length>0&&o.forEach((n,l)=>{const h=l/o.length,d=Math.max(0,Math.min(1,(e-h)/(1-h)));n.style.opacity=d.toString(),n.style.transform=`scale(${d})`})}triggerAnimationComplete(){const t=this.shadowRoot.querySelector(".sparkline-path");t&&(t.style.animation="sparkline-complete-pulse 0.6s var(--_global-spring-wobbly) forwards",setTimeout(()=>{t.style.animation=""},600)),this.dispatchEvent(new CustomEvent("sparkline-animation-complete",{detail:{data:this._data}}))}startAnimation(){!this.animated||this._animationId||(this._currentAnimationValue=0,setTimeout(()=>{this.animate()},50))}stopAnimation(){this._animationId&&(cancelAnimationFrame(this._animationId),this._animationId=null)}generateDots(){if(!this.dots||this._data.length<2)return"";const t=this.width,i=this.height,e=4,a=t-e*2,r=i-e*2,s=Math.min(...this._data),n=Math.max(...this._data)-s||1;return this._data.map((l,h)=>{const d=e+h/(this._data.length-1)*a,c=e+r-(l-s)/n*r;return`<circle
        cx="${d}" 
        cy="${c}" 
        r="2"
        class="sparkline-dot"
        fill="currentColor"
      />`}).join("")}render(){this.parseData();const t=this.width,i=this.height,e=this.color,a=this.lineWidth,r=this.createPath(),s=this.fill?this.createAreaPath():"",o=this.generateDots();this.shadowRoot.innerHTML=`
      <style>
        :host {
          /* Enhanced sparkline variables with premium styling */
          --_sparkline-color: ${e};
          --_sparkline-line-width: ${a}px;
          --_sparkline-width: ${t}px;
          --_sparkline-height: ${i}px;
          
          /* Size variants with refined dimensions */
          --_sparkline-width-sm: 80px;
          --_sparkline-height-sm: 24px;
          --_sparkline-width-md: 120px;
          --_sparkline-height-md: 40px;
          --_sparkline-width-lg: 160px;
          --_sparkline-height-lg: 56px;
          
          /* Enhanced transitions and effects */
          --_sparkline-transition: all var(--_global-motion-duration-medium1) var(--_global-spring-gentle);
          --_sparkline-gradient-start: var(--_sparkline-color);
          --_sparkline-gradient-mid: color-mix(in srgb, var(--_sparkline-color) 70%, white 30%);
          --_sparkline-gradient-end: transparent;
          --_sparkline-glow-intensity: 0;
          
          display: inline-block;
          color: var(--_sparkline-color);
          transition: var(--_sparkline-transition);
          position: relative;
          background: linear-gradient(145deg, 
            var(--_global-color-surface) 0%, 
            var(--_global-color-surface-container-low) 100%
          );
          border-radius: var(--_global-border-radius-lg);
          padding: var(--_global-spacing-sm);
          box-shadow: 
            var(--_global-elevation-1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          border: 1px solid var(--_global-color-outline-variant);
          overflow: hidden;
        }

        /* Size variants */
        :host([size="sm"]) {
          --_sparkline-width: var(--_sparkline-width-sm);
          --_sparkline-height: var(--_sparkline-height-sm);
        }

        :host([size="lg"]) {
          --_sparkline-width: var(--_sparkline-width-lg);
          --_sparkline-height: var(--_sparkline-height-lg);
        }

        svg {
          width: var(--_sparkline-width);
          height: var(--_sparkline-height);
          display: block;
          overflow: visible;
          filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.1));
          transition: filter var(--_global-motion-duration-medium1) var(--_global-motion-easing-emphasized);
        }

        .sparkline-path {
          fill: none;
          stroke: currentColor;
          stroke-width: var(--_sparkline-line-width);
          stroke-linecap: round;
          stroke-linejoin: round;
          vector-effect: non-scaling-stroke;
          transition: var(--_sparkline-transition);
          filter: drop-shadow(0 0 4px currentColor);
          opacity: 0.9;
        }

        .sparkline-area {
          stroke: none;
          opacity: 0;
          transition: var(--_sparkline-transition);
          filter: url(#sparklineAreaGlow);
        }

        .sparkline-dot {
          opacity: 0;
          transition: var(--_sparkline-transition);
          filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.3));
          transform: scale(0);
          transform-origin: center;
        }

        .sparkline-dot:hover {
          opacity: 1;
          transform: scale(1.4);
          filter: 
            drop-shadow(0 2px 8px currentColor)
            drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4));
        }
        
        .sparkline-dot.visible {
          opacity: 0.8;
          transform: scale(1);
        }

        /* Gradient fill */
        :host([gradient]) .sparkline-area {
          fill: url(#sparkline-gradient);
          opacity: 0.2;
        }

        /* Variant styles */
        :host([variant="success"]) {
          --_sparkline-color: var(--_global-color-success);
        }

        :host([variant="warning"]) {
          --_sparkline-color: var(--_global-color-warning);
        }

        :host([variant="error"]) {
          --_sparkline-color: var(--_global-color-error);
        }

        :host([variant="info"]) {
          --_sparkline-color: var(--_global-color-info);
        }

        /* Enhanced hover effects with sophisticated micro-interactions */
        :host(:hover) {
          transform: translateY(-2px) scale(1.02);
          transition: transform var(--_global-motion-duration-medium1) var(--_global-spring-bouncy),
                      box-shadow var(--_global-motion-duration-medium1) var(--_global-motion-easing-emphasized);
          box-shadow: 
            var(--_global-shadow-interaction-moderate),
            0 0 20px var(--_sparkline-color)20,
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
          --_sparkline-glow-intensity: 0.6;
        }

        :host(:hover) svg {
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15));
        }

        :host(:hover) .sparkline-path {
          stroke-width: calc(var(--_sparkline-line-width) + 1px);
          filter: 
            drop-shadow(0 0 8px currentColor)
            brightness(1.15) 
            saturate(1.2);
        }

        :host(:hover) .sparkline-area {
          opacity: 0.2;
          filter: 
            url(#sparklineAreaGlow)
            brightness(1.1);
        }
        
        :host(:hover) .sparkline-dot {
          opacity: 0.9;
          transform: scale(1.1);
        }

        /* Enhanced animation styles with spring physics */
        :host([animated]) .sparkline-path {
          stroke-dasharray: 0, 1000;
          /* Animation handled by JavaScript for better control */
        }
        
        @keyframes sparkline-complete-pulse {
          0% {
            filter: 
              drop-shadow(0 0 4px currentColor)
              brightness(1) 
              saturate(1);
          }
          50% {
            filter: 
              drop-shadow(0 0 12px currentColor)
              drop-shadow(0 0 20px currentColor)
              brightness(1.3) 
              saturate(1.4);
            stroke-width: calc(var(--_sparkline-line-width) + 1px);
          }
          100% {
            filter: 
              drop-shadow(0 0 6px currentColor)
              brightness(1.1) 
              saturate(1.1);
            stroke-width: var(--_sparkline-line-width);
          }
        }

        /* Accessibility and reduced motion */
        @media (prefers-reduced-motion: reduce) {
          :host([animated]) .sparkline-path {
            animation: none;
            stroke-dasharray: none;
          }
          
          :host(:hover) {
            transform: none;
          }
          
          .sparkline-dot {
            transition: none;
          }
        }

        /* High contrast support */
        @media (prefers-contrast: high) {
          .sparkline-path {
            stroke-width: calc(var(--_sparkline-line-width) + 1px);
          }
        }

        /* Enhanced no data state */
        .no-data {
          display: flex;
          align-items: center;
          justify-content: center;
          width: var(--_sparkline-width);
          height: var(--_sparkline-height);
          background: linear-gradient(145deg, 
            var(--_global-color-surface-container) 0%, 
            var(--_global-color-surface-container-high) 100%
          );
          border: 1px dashed var(--_global-color-outline-variant);
          border-radius: var(--_global-border-radius-md);
          font-size: var(--_global-font-size-xs);
          font-weight: var(--_global-font-weight-medium);
          color: var(--_global-color-on-surface-variant);
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }
        
        .no-data::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 70%
          );
          animation: no-data-shimmer 3s linear infinite;
        }
        
        @keyframes no-data-shimmer {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }
      </style>

      ${this._data.length>=2?`
        <svg 
          width="${t}" 
          height="${i}"
          viewBox="0 0 ${t} ${i}"
          role="img"
          aria-label="Sparkline chart showing trend for ${this._data.length} data points"
          ${this.disabled?'aria-disabled="true"':'tabindex="0"'}
        >
          <defs>
            <linearGradient id="sparkline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color: var(--_sparkline-gradient-start); stop-opacity: 0.4"/>
              <stop offset="40%" style="stop-color: var(--_sparkline-gradient-mid); stop-opacity: 0.25"/>
              <stop offset="100%" style="stop-color: var(--_sparkline-gradient-end); stop-opacity: 0"/>
            </linearGradient>
            <filter id="sparklineAreaGlow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="sparklineGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          ${this.fill?`<path d="${s}" class="sparkline-area" fill="${this.gradient?"url(#sparkline-gradient)":"currentColor"}"/>`:""}
          
          <path d="${r}" class="sparkline-path"/>
          
          ${o}
        </svg>
      `:`
        <div class="no-data">No data</div>
      `}
    `,this.animated&&this._data.length>=2&&this.startAnimation()}}customElements.get("my-sparkline")||customElements.define("my-sparkline",g);
