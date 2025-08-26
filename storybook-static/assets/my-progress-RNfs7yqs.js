import{M as u}from"./base-component-q4KNMHwB.js";class d extends u{constructor(){super(),this._value=0,this._min=0,this._max=100,this._animationId=null,this.log("Gauge component initializing...")}static get observedAttributes(){return[...super.observedAttributes,"value","min","max","label","unit","show-value","animated","thresholds","tooltip","gradient"]}handleAttributeChange(e,t,r){switch(super.handleAttributeChange(e,t,r),e){case"value":this._parseNumericValues(),this.announceToScreenReader(`Gauge value changed to ${r} ${this.unit||""}`,"polite"),setTimeout(()=>this.updateGauge(),0);return;case"min":case"max":this._parseNumericValues(),this.announceToScreenReader(`Gauge ${e} changed to ${r}`,"polite");break;case"thresholds":try{const a=JSON.parse(r||"[]");this.log("Thresholds updated:",a)}catch(a){this.log("Invalid thresholds JSON:",a)}break}}get value(){return this._value}set value(e){const t=Math.max(this.min,Math.min(this.max,parseFloat(e)||0));this.validateAttribute("value",t,r=>typeof r=="number"&&!isNaN(r))&&(this.animated&&this._value!==t?this.animateToValue(t):(this._value=t,this.updateGauge(),this.setAttribute("value",t.toString())),this.log("Value changed:",t))}get min(){return this._min}set min(e){const t=parseFloat(e)||0;this.validateAttribute("min",t,r=>typeof r=="number"&&!isNaN(r))&&(this._min=t,this.setAttribute("min",t.toString()),this._parseNumericValues())}get max(){return this._max}set max(e){const t=parseFloat(e)||100;this.validateAttribute("max",t,r=>typeof r=="number"&&!isNaN(r))&&(this._max=t,this.setAttribute("max",t.toString()),this._parseNumericValues())}get label(){return this.getAttribute("label")||""}set label(e){this.setAttribute("label",e)}get unit(){return this.getAttribute("unit")||""}set unit(e){this.setAttribute("unit",e)}get size(){return this.getAttribute("size")||"md"}set size(e){this.setAttribute("size",e)}get variant(){return this.getAttribute("variant")||"primary"}set variant(e){this.setAttribute("variant",e)}get showValue(){return this.hasAttribute("show-value")}set showValue(e){e?this.setAttribute("show-value",""):this.removeAttribute("show-value")}get animated(){return this.hasAttribute("animated")}set animated(e){e?this.setAttribute("animated",""):this.removeAttribute("animated")}get thresholds(){const e=this.getAttribute("thresholds");if(e)try{const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch(t){this.log("Invalid thresholds JSON:",t),this._handleError(t,"thresholds parsing")}return[]}set thresholds(e){this.validateAttribute("thresholds",e,t=>Array.isArray(t)||t===null||t===void 0)&&this.setAttribute("thresholds",JSON.stringify(e||[]))}get tooltip(){return this.getAttribute("tooltip")||""}set tooltip(e){this.setAttribute("tooltip",e)}get gradient(){return this.hasAttribute("gradient")}set gradient(e){e?this.setAttribute("gradient",""):this.removeAttribute("gradient")}get percentage(){return this.max===this.min?0:(this._value-this.min)/(this.max-this.min)*100}get angle(){return-90+this.percentage*180/100}getCurrentThreshold(){const e=this.thresholds;if(!e||e.length===0)return null;for(let t=e.length-1;t>=0;t--)if(this._value>=e[t].min)return e[t];return e[0]}getColor(){const e=this.getCurrentThreshold();if(e&&e.color)return e.color;switch(this.variant){case"success":return"var(--_global-color-success)";case"warning":return"var(--_global-color-warning)";case"error":return"var(--_global-color-error)";case"info":return"var(--_global-color-info)";case"secondary":return"var(--_global-color-secondary)";default:return"var(--_global-color-primary)"}}animateToValue(e){this._animationId&&cancelAnimationFrame(this._animationId);const t=this._value,r=performance.now(),a=1200,i=o=>{const l=o-r,s=Math.min(l/a,1);let n;s<1?n=1-Math.pow(2,-8*s)*Math.cos((s*8-.6)*(2*Math.PI)/3):n=1;const g=t+(e-t)*n;this._value=g,this.updateGauge(),s<1?this._animationId=requestAnimationFrame(i):(this._value=e,this.setAttribute("value",e.toString()),this._animationId=null,this.triggerValueReachedEffect())};this._animationId=requestAnimationFrame(i)}updateGauge(){const e=this.shadowRoot.querySelector(".gauge-needle"),t=this.shadowRoot.querySelector(".gauge-fill"),r=this.shadowRoot.querySelector(".gauge-value"),a=this.shadowRoot.querySelector(".gauge-container"),i=this.shadowRoot.querySelector(".gauge-track"),o=this.getColor(),l=this.percentage,s=l/100;if(e&&(e.style.transform=`rotate(${this.angle}deg)`,e.style.filter=`
        drop-shadow(0 3px 8px ${o}60)
        drop-shadow(0 1px 4px rgba(0, 0, 0, 0.4))
      `,e.style.transformOrigin="50px 50px",l>80?e.style.animation="gauge-needle-pulse 2s var(--_global-spring-gentle) infinite alternate":e.style.animation="none"),t){const n=Math.PI*40,g=n-n*l/100;t.style.strokeDashoffset=g.toString(),this.gradient?t.style.stroke="url(#gaugeGradient)":t.style.stroke=o,t.style.filter=`
        drop-shadow(0 0 ${4+s*8}px ${o}60)
        drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2))
        brightness(${1+s*.1})
        saturate(${1+s*.2})
      `;const h=parseFloat(getComputedStyle(this).getPropertyValue("--_gauge-stroke-width"))||12;t.style.strokeWidth=`${h+s*2}px`}if(r&&(r.textContent=`${this.formatValue(this._value)}${this.unit}`,r.style.color=o,r.style.textShadow=`0 0 ${4+s*8}px ${o}40`,r.style.transform=`scale(${1+s*.05})`),a){const n=Math.round(s*40).toString(16).padStart(2,"0");a.style.boxShadow=`
        0 8px 32px ${o}${n},
        var(--_gauge-shadow),
        inset 0 1px 0 rgba(255, 255, 255, 0.1)
      `}i&&(i.style.opacity=(.2+s*.15).toString()),this.style.setProperty("--_gauge-current-intensity",s.toString()),this.style.setProperty("--_gauge-current-color",o)}triggerValueReachedEffect(){const e=this.getCurrentThreshold();if(e){const t=this.shadowRoot.querySelector(".gauge-fill");t&&(t.style.animation="gauge-threshold-reached 0.8s var(--_global-spring-wobbly) forwards",setTimeout(()=>{t.style.animation=""},800)),this.emit("threshold-reached",{value:this._value,percentage:this.percentage,threshold:e})}}_parseNumericValues(){this._min=parseFloat(this.getAttribute("min"))||0,this._max=Math.max(this._min,parseFloat(this.getAttribute("max"))||100),this._min>this._max&&(this._min=this._max);const e=parseFloat(this.getAttribute("value"))||0;this._value=Math.max(this._min,Math.min(this._max,e))}onConnected(){this._parseNumericValues(),this.log("Gauge component connected with values:",{value:this._value,min:this._min,max:this._max,thresholds:this.thresholds.length})}onDisconnected(){this._animationId&&(cancelAnimationFrame(this._animationId),this._animationId=null),this.log("Gauge component disconnected")}formatValue(e){return Number.isInteger(e)?e.toString():e.toFixed(1)}attachEventListeners(){this.removeEventListeners();const e=this.shadowRoot.querySelector(".gauge-container");e&&this.addEventListeners([{element:e,events:["click"],handler:this.handleClick.bind(this)},{element:e,events:["keydown"],handler:this.handleKeyDown},{element:e,events:["focus"],handler:this.handleFocus},{element:e,events:["blur"],handler:this.handleBlur}])}handleClick(e){this.disabled||this.emit("gauge-click",{value:this._value,percentage:this.percentage,min:this.min,max:this.max,threshold:this.getCurrentThreshold()})}handleKeyDown(e){if(super.handleKeyDown(e),this.disabled){e.preventDefault();return}const t=(this.max-this.min)/100;let r=this._value;switch(e.key){case"ArrowUp":case"ArrowRight":e.preventDefault(),r=Math.min(this.max,this._value+t);break;case"ArrowDown":case"ArrowLeft":e.preventDefault(),r=Math.max(this.min,this._value-t);break;case"Home":e.preventDefault(),r=this.min;break;case"End":e.preventDefault(),r=this.max;break;case"PageUp":e.preventDefault(),r=Math.min(this.max,this._value+t*10);break;case"PageDown":e.preventDefault(),r=Math.max(this.min,this._value-t*10);break}r!==this._value&&(this.value=r,this.emit("gauge-change",{value:r,percentage:this.percentage,oldValue:this._value}))}render(){const e=this.getColor(),t=this.percentage,r=Math.PI*40,a=r-r*t/100;this.shadowRoot.innerHTML=`
      <style>
        :host {
          /* Component-specific variables using global variables */
          --_gauge-size-sm: 140px;
          --_gauge-size-md: 180px;
          --_gauge-size-lg: 240px;
          --_gauge-size: var(--_gauge-size-md);
          --_gauge-stroke-width: 12;
          --_gauge-stroke-width-bg: 8;
          --_gauge-needle-width: 3;
          --_gauge-bg-color: var(--_global-color-surface);
          --_gauge-track-color: var(--_global-color-surface-container-high);
          --_gauge-fill-color: var(--_global-color-primary);
          --_gauge-text-color: var(--_global-color-on-surface);
          --_gauge-label-color: var(--_global-color-on-surface-variant);
          --_gauge-range-color: var(--_global-color-on-surface-variant);
          --_gauge-needle-color: var(--_global-color-on-surface);
          --_gauge-shadow: var(--_global-elevation-3);
          --_gauge-transition: all var(--_global-motion-duration-medium2) var(--_global-motion-easing-emphasized);
          --_gauge-tooltip-bg: var(--_global-color-inverse-surface);
          --_gauge-tooltip-text: var(--_global-color-inverse-on-surface);
          --_gauge-glow-color: rgba(103, 80, 164, 0.3);
          --_gauge-pulse-duration: 2s;
          
          display: inline-block;
          width: var(--_gauge-size);
          height: calc(var(--_gauge-size) * 0.75);
          font-family: var(--_global-font-family-sans);
          background: linear-gradient(145deg, var(--_gauge-bg-color), var(--_global-color-surface-container-low));
          border-radius: var(--_global-border-radius-xl);
          box-shadow: var(--_gauge-shadow);
          padding: var(--_global-spacing-lg);
          box-sizing: border-box;
          position: relative;
          transition: var(--_gauge-transition);
          cursor: pointer;
          border: 1px solid var(--_global-color-outline-variant);
        }

        .gauge-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .gauge-svg {
          width: var(--_gauge-size);
          height: calc(var(--_gauge-size) * 0.6);
          overflow: visible;
        }

        .gauge-track {
          fill: none;
          stroke: var(--_gauge-track-color);
          stroke-width: var(--_gauge-stroke-width-bg);
          stroke-linecap: round;
          opacity: 0.3;
        }

        .gauge-fill {
          fill: none;
          stroke: ${this.gradient?"url(#gaugeGradient)":e};
          stroke-width: var(--_gauge-stroke-width);
          stroke-linecap: round;
          stroke-dasharray: ${r};
          stroke-dashoffset: ${a};
          transition: var(--_gauge-transition);
          transform: rotate(-180deg);
          transform-origin: center;
          filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.15));
        }

        .gauge-center {
          fill: var(--_gauge-bg-color);
          stroke: var(--_gauge-needle-color);
          stroke-width: var(--_gauge-needle-width);
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
        }

        .gauge-needle {
          fill: var(--_gauge-needle-color);
          transform-origin: 50px 50px;
          transform: rotate(${this.angle}deg);
          transition: var(--_gauge-transition);
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
        }

        .gauge-content {
          position: absolute;
          bottom: 20%;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          pointer-events: none;
        }

        .gauge-value {
          font-size: calc(var(--_gauge-size) * 0.14);
          font-weight: var(--_global-font-weight-bold);
          color: var(--_gauge-text-color);
          line-height: 1;
          margin-bottom: var(--_global-spacing-xs);
          transition: color var(--_global-motion-duration-short2) ease;
          font-variant-numeric: tabular-nums;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .gauge-label {
          font-size: calc(var(--_gauge-size) * 0.09);
          font-weight: var(--_global-font-weight-medium);
          color: var(--_gauge-label-color);
          line-height: 1;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .gauge-range {
          position: absolute;
          bottom: 8%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          justify-content: space-between;
          width: 85%;
          font-size: calc(var(--_gauge-size) * 0.07);
          font-weight: var(--_global-font-weight-medium);
          color: var(--_gauge-range-color);
          font-variant-numeric: tabular-nums;
        }

        .gauge-thresholds {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: var(--_global-spacing-xs);
          font-size: calc(var(--_gauge-size) * 0.055);
          color: var(--_global-color-text-muted);
        }

        .threshold-indicator {
          display: inline-flex;
          align-items: center;
          gap: 2px;
        }

        .threshold-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
        }

        /* Size variants */
        :host([size="sm"]) {
          --_gauge-size: var(--_gauge-size-sm);
          --_gauge-stroke-width: 6;
        }

        :host([size="lg"]) {
          --_gauge-size: var(--_gauge-size-lg);
          --_gauge-stroke-width: 10;
        }

        /* Disabled state */
        :host([disabled]) {
          opacity: 0.5;
          pointer-events: none;
        }

        /* Accessibility improvements - High Contrast Mode Support */
        @media (prefers-contrast: high) {
          .gauge-track {
            stroke: currentColor;
            opacity: 0.5;
            stroke-width: calc(var(--_gauge-stroke-width-bg) + 2px);
          }
          
          .gauge-fill {
            stroke-width: calc(var(--_gauge-stroke-width) + 2px);
            filter: none;
          }
          
          .gauge-needle {
            stroke: currentColor;
            stroke-width: 2px;
            filter: none;
          }
          
          .gauge-value,
          .gauge-label {
            font-weight: var(--_global-font-weight-bold);
            text-shadow: none;
          }
        }

        /* Accessibility improvements - Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          .gauge-fill,
          .gauge-needle,
          .gauge-value {
            animation: none;
            transition: none;
          }
        }

        /* Responsive adjustments */
        /* Enhanced hover effects with sophisticated micro-interactions */
        :host(:hover) {
          transform: translateY(-3px) scale(1.02);
          transition: transform var(--_global-motion-duration-medium2) var(--_global-spring-bouncy),
                      box-shadow var(--_global-motion-duration-medium2) var(--_global-motion-easing-emphasized);
          box-shadow: 
            var(--_global-shadow-interaction-strong),
            0 0 40px var(--_gauge-current-color, var(--_global-color-primary))30,
            var(--_gauge-shadow);
          cursor: pointer;
        }
        
        :host(:hover) .gauge-needle {
          filter: 
            drop-shadow(0 4px 12px rgba(0, 0, 0, 0.8))
            drop-shadow(0 0 8px var(--_gauge-current-color, var(--_global-color-primary))80);
          transition: filter var(--_global-motion-duration-medium1) var(--_global-spring-gentle);
          transform-origin: 50px 50px;
          animation: gauge-needle-hover-pulse 1.5s var(--_global-spring-gentle) infinite alternate;
        }
        
        :host(:hover) .gauge-fill {
          stroke-width: calc(var(--_gauge-stroke-width) + 2px);
          filter: 
            drop-shadow(0 0 16px var(--_gauge-current-color, var(--_global-color-primary))60)
            drop-shadow(0 4px 16px rgba(0, 0, 0, 0.3))
            brightness(1.15) 
            saturate(1.2) 
            contrast(1.05);
          transition: all var(--_global-motion-duration-medium1) var(--_global-spring-wobbly);
        }
        
        :host(:hover) .gauge-track {
          opacity: calc(0.2 + var(--_gauge-current-intensity, 0) * 0.2);
          stroke-width: calc(var(--_gauge-stroke-width-bg) + 1px);
          transition: all var(--_global-motion-duration-medium1) var(--_global-motion-easing-emphasized);
        }
        
        :host(:hover) .gauge-value {
          transform: scale(calc(1.05 + var(--_gauge-current-intensity, 0) * 0.1));
          text-shadow: 0 0 12px var(--_gauge-current-color, var(--_global-color-primary))50;
          transition: all var(--_global-motion-duration-medium1) var(--_global-spring-wobbly);
        }
        
        /* Enhanced active/pressed state with spring physics */
        :host(:active) {
          transform: translateY(-1px) scale(0.985);
          transition: transform var(--_global-motion-duration-short1) var(--_global-spring-energetic);
          box-shadow: 
            var(--_global-shadow-interaction-moderate),
            0 0 30px var(--_gauge-current-color, var(--_global-color-primary))40,
            inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        :host(:active) .gauge-fill {
          stroke-width: calc(var(--_gauge-stroke-width) + 3px);
          filter: 
            drop-shadow(0 0 20px var(--_gauge-current-color, var(--_global-color-primary))80)
            brightness(1.2) 
            saturate(1.3);
        }
        
        :host(:active) .gauge-needle {
          filter: 
            drop-shadow(0 5px 16px rgba(0, 0, 0, 0.9))
            drop-shadow(0 0 12px var(--_gauge-current-color, var(--_global-color-primary))90);
        }
        
        /* Enhanced focus state */
        :host(:focus-within) .gauge-container {
          box-shadow: 0 0 0 3px var(--_global-color-primary-container);
          transition: box-shadow var(--_global-motion-duration-short2) var(--_global-motion-easing-emphasized);
        }
        
        /* Enhanced pulse animations with sophisticated physics */
        @keyframes gauge-needle-pulse {
          0% {
            filter: 
              drop-shadow(0 3px 8px var(--_gauge-current-color, var(--_global-color-primary))60)
              drop-shadow(0 1px 4px rgba(0, 0, 0, 0.4));
          }
          100% {
            filter: 
              drop-shadow(0 4px 16px var(--_gauge-current-color, var(--_global-color-primary))80)
              drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6))
              brightness(1.1);
          }
        }
        
        @keyframes gauge-needle-hover-pulse {
          0% {
            filter: 
              drop-shadow(0 4px 12px rgba(0, 0, 0, 0.8))
              drop-shadow(0 0 8px var(--_gauge-current-color, var(--_global-color-primary))80);
          }
          100% {
            filter: 
              drop-shadow(0 6px 20px rgba(0, 0, 0, 0.9))
              drop-shadow(0 0 16px var(--_gauge-current-color, var(--_global-color-primary))90)
              brightness(1.05);
          }
        }
        
        @keyframes gauge-threshold-reached {
          0% {
            stroke-width: var(--_gauge-stroke-width);
            filter: none;
          }
          50% {
            stroke-width: calc(var(--_gauge-stroke-width) + 4px);
            filter: 
              drop-shadow(0 0 20px var(--_gauge-current-color, var(--_global-color-primary))90)
              brightness(1.3) 
              saturate(1.4);
          }
          100% {
            stroke-width: calc(var(--_gauge-stroke-width) + 1px);
            filter: 
              drop-shadow(0 0 12px var(--_gauge-current-color, var(--_global-color-primary))70)
              brightness(1.1);
          }
        }
        
        /* Tooltip styles */
        .gauge-tooltip {
          position: absolute;
          top: -45px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--_gauge-tooltip-bg);
          color: var(--_gauge-tooltip-text);
          padding: var(--_global-spacing-xs) var(--_global-spacing-sm);
          border-radius: var(--_global-border-radius-md);
          font-size: var(--_global-font-size-xs);
          font-weight: var(--_global-font-weight-medium);
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          z-index: 10;
          box-shadow: var(--_global-elevation-2);
        }
        
        .gauge-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 4px solid transparent;
          border-top-color: var(--_gauge-tooltip-bg);
        }
        
        :host(:hover) .gauge-tooltip {
          opacity: 1;
        }
        
        @media (max-width: 480px) {
          :host {
            --_gauge-size: var(--_gauge-size-sm);
          }
        }
      </style>

      <div class="gauge-container" 
           role="meter" 
           aria-valuenow="${this._value}"
           aria-valuemin="${this.min}"
           aria-valuemax="${this.max}"
           aria-label="${this.label||"gauge"} - ${this.formatValue(this._value)}${this.unit}"
           ${this.getCurrentThreshold()?`aria-describedby="threshold-${this.getCurrentThreshold().label||"current"}"`:""}
           ${this.tooltip?`title="${this.tooltip}"`:""}
           ${this.disabled?'aria-disabled="true"':'tabindex="0"'}
      >
        ${this.tooltip?`<div class="gauge-tooltip">${this.tooltip}</div>`:""}
        <svg class="gauge-svg" viewBox="0 0 100 60" aria-hidden="true">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:${e};stop-opacity:0.85" />
              <stop offset="25%" style="stop-color:color-mix(in srgb, ${e} 90%, white 10%);stop-opacity:0.95" />
              <stop offset="75%" style="stop-color:color-mix(in srgb, ${e} 85%, white 15%);stop-opacity:1" />
              <stop offset="100%" style="stop-color:${e};stop-opacity:0.9" />
            </linearGradient>
            <radialGradient id="gaugeNeedleGradient" cx="50%" cy="20%" r="80%">
              <stop offset="0%" style="stop-color:rgba(255, 255, 255, 0.9)" />
              <stop offset="100%" style="stop-color:var(--_gauge-needle-color)" />
            </radialGradient>
            <filter id="gaugeShadow">
              <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.3"/>
              <feDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity="0.2"/>
            </filter>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <!-- Track (background arc) -->
          <path class="gauge-track" 
                d="M 20,50 A 30,30 0 0,1 80,50" 
                stroke-dasharray="none"/>
          
          <!-- Fill arc -->
          <path class="gauge-fill" 
                d="M 20,50 A 30,30 0 0,1 80,50"
                stroke-dasharray="${r}"
                stroke-dashoffset="${a}"
                filter="url(#glow)"/>
          
          <!-- Center circle -->
          <circle class="gauge-center" cx="50" cy="50" r="4"/>
          
          <!-- Enhanced needle with gradient and better shape -->
          <polygon class="gauge-needle" 
                   points="49,50 51,50 50.5,24 49.5,24"
                   fill="url(#gaugeNeedleGradient)"
                   filter="url(#gaugeShadow)"
                   transform="rotate(${this.angle} 50 50)"/>
        </svg>

        <div class="gauge-content">
          ${this.showValue?`<div class="gauge-value">${this.formatValue(this._value)}${this.unit}</div>`:""}
          ${this.label?`<div class="gauge-label">${this.label}</div>`:""}
        </div>

        <div class="gauge-range">
          <span>${this.formatValue(this.min)}</span>
          <span>${this.formatValue(this.max)}</span>
        </div>

        ${this.thresholds.length>0?`
          <div class="gauge-thresholds">
            ${this.thresholds.map(i=>`
              <div class="threshold-indicator">
                <span class="threshold-dot" style="background-color: ${i.color||e}"></span>
                <span>${i.label||i.min}+</span>
              </div>
            `).join("")}
          </div>
        `:""}
      </div>
    `,setTimeout(()=>this.updateGauge(),0)}}customElements.get("my-gauge")||customElements.define("my-gauge",d);class p extends u{constructor(){super(),this._value=0,this._max=100,this._min=0,this._animationId=null,this._previousValue=0,this.log("Progress component initializing...")}static get observedAttributes(){return[...super.observedAttributes,"value","max","min","label","indeterminate","show-value","animated","tooltip","buffer-value","type"]}handleAttributeChange(e,t,r){switch(super.handleAttributeChange(e,t,r),e){case"value":case"min":case"max":this._parseNumericValues(),this.announceToScreenReader(`Progress ${e} changed to ${r}${e==="value"?` (${Math.round(this.percentage)}%)`:""}`,"polite");break;case"indeterminate":this.announceToScreenReader(`Progress ${r!==null?"is loading":"value is "+Math.round(this.percentage)+"%"}`,"polite");break}}get value(){return this._value}set value(e){const t=Math.max(this.min,Math.min(this.max,parseFloat(e)||0));this.validateAttribute("value",t,r=>typeof r=="number"&&!isNaN(r))&&(this.animated&&Math.abs(t-this._value)>.01?this.animateToValue(t):(this._value=t,this.updateProgressVisuals()),this.setAttribute("value",t.toString()),this.log("Value changed:",t))}get max(){return this._max}set max(e){const t=Math.max(0,parseFloat(e)||100);this.validateAttribute("max",t,r=>typeof r=="number"&&!isNaN(r)&&r>=0)&&(this._max=t,this.setAttribute("max",t.toString()),this._parseNumericValues())}get min(){return this._min}set min(e){const t=Math.max(0,parseFloat(e)||0);this.validateAttribute("min",t,r=>typeof r=="number"&&!isNaN(r)&&r>=0)&&(this._min=t,this.setAttribute("min",t.toString()),this._parseNumericValues())}get label(){return this.getAttribute("label")||""}set label(e){this.setAttribute("label",e)}get variant(){return this.getAttribute("variant")||"primary"}set variant(e){this.setAttribute("variant",e)}get size(){return this.getAttribute("size")||"md"}set size(e){this.setAttribute("size",e)}get indeterminate(){return this.hasAttribute("indeterminate")}set indeterminate(e){e?this.setAttribute("indeterminate",""):this.removeAttribute("indeterminate")}get showValue(){return this.hasAttribute("show-value")}set showValue(e){e?this.setAttribute("show-value",""):this.removeAttribute("show-value")}get animated(){return this.hasAttribute("animated")}set animated(e){e?this.setAttribute("animated",""):this.removeAttribute("animated")}get tooltip(){return this.getAttribute("tooltip")||""}set tooltip(e){this.setAttribute("tooltip",e)}get bufferValue(){return parseFloat(this.getAttribute("buffer-value"))||0}set bufferValue(e){this.setAttribute("buffer-value",e)}get percentage(){return this.max===this.min?0:(this._value-this.min)/(this.max-this.min)*100}get bufferPercentage(){return this.max===this.min?0:(Math.max(this.min,Math.min(this.max,this.bufferValue))-this.min)/(this.max-this.min)*100}getDisplayValue(){return this.indeterminate?"Loading...":`${Math.round(this.percentage)}%`}_parseNumericValues(){this._max=Math.max(0,parseFloat(this.getAttribute("max"))||100),this._min=Math.max(0,parseFloat(this.getAttribute("min"))||0),this._min>this._max&&(this._min=this._max);const e=parseFloat(this.getAttribute("value"))||0;this._value=Math.max(this._min,Math.min(this._max,e))}onConnected(){this._parseNumericValues(),this.log("Progress component connected with values:",{value:this._value,min:this._min,max:this._max})}onDisconnected(){this._animationId&&(cancelAnimationFrame(this._animationId),this._animationId=null),this.log("Progress component disconnected")}animateToValue(e){this._animationId&&cancelAnimationFrame(this._animationId);const t=this._value,r=performance.now(),a=600,i=o=>{const l=o-r,s=Math.min(l/a,1),n=1-Math.pow(1-s,3);this._value=t+(e-t)*n,this.updateProgressVisuals(),s<1?this._animationId=requestAnimationFrame(i):(this._value=e,this._animationId=null)};this._animationId=requestAnimationFrame(i)}updateProgressVisuals(){const e=this.shadowRoot.querySelector(".progress-fill"),t=this.shadowRoot.querySelector(".circular-progress"),r=this.shadowRoot.querySelector(".progress-value"),a=this.shadowRoot.querySelector(".circular-text");if(e&&!this.indeterminate&&(e.style.width=this.percentage+"%"),t&&!this.indeterminate){const o=163.36-163.36*this.percentage/100;t.style.strokeDashoffset=o.toString()}r&&(r.textContent=this.getDisplayValue()),a&&(a.textContent=this.getDisplayValue())}updateProgress(e,t=!0){const r=this._value,a=Math.max(this.min,Math.min(this.max,parseFloat(e)||0));this.animated&&Math.abs(a-this._value)>.01?this.animateToValue(a):(this._value=a,this.updateProgressVisuals()),this.setAttribute("value",a.toString()),t&&r!==this._value&&this.emit("progress-change",{value:this._value,percentage:this.percentage,oldValue:r,min:this.min,max:this.max})}attachEventListeners(){this.removeEventListeners();const e=this.shadowRoot.querySelector(".progress-track");e&&this.addEventListeners([{element:e,events:["click"],handler:this.handleClick.bind(this)},{element:e,events:["keydown"],handler:this.handleKeyDown},{element:e,events:["focus"],handler:this.handleFocus},{element:e,events:["blur"],handler:this.handleBlur}])}handleClick(e){if(this.disabled||this.indeterminate)return;const t=e.currentTarget.getBoundingClientRect(),r=(e.clientX-t.left)/t.width,a=this.min+(this.max-this.min)*r;this.updateProgress(a)}render(){this.shadowRoot.innerHTML=`
      <style>
        :host {
          /* Component-specific variables using global variables */
          --_progress-height-sm: 4px;
          --_progress-height-md: 6px;
          --_progress-height-lg: 8px;
          --_progress-height: var(--_progress-height-md);
          --_progress-border-radius: var(--_global-border-radius-full);
          --_progress-track-bg: var(--_global-color-surface-container-highest);
          --_progress-track-border: 1px solid var(--_global-color-outline-variant);
          --_progress-buffer-opacity: 0.3;
          --_progress-tooltip-bg: var(--_global-color-inverse-surface);
          --_progress-tooltip-text: var(--_global-color-inverse-on-surface);
          
          /* Variant colors - Material Design 3 semantic colors */
          --_progress-primary: var(--_global-color-primary);
          --_progress-primary-container: var(--_global-color-primary-container);
          --_progress-secondary: var(--_global-color-secondary);
          --_progress-secondary-container: var(--_global-color-secondary-container);
          --_progress-success: var(--_global-color-success);
          --_progress-success-container: var(--_global-color-success-container);
          --_progress-warning: var(--_global-color-warning);
          --_progress-warning-container: var(--_global-color-warning-container);
          --_progress-error: var(--_global-color-error);
          --_progress-error-container: var(--_global-color-error-container);
          --_progress-info: var(--_global-color-info);
          --_progress-info-container: var(--_global-color-info-container);
          
          /* Transition and animation */
          --_progress-transition: all var(--_global-motion-duration-medium1) var(--_global-motion-easing-emphasized);
          
          display: block;
          width: 100%;
          font-family: var(--_global-font-family-sans);
        }

        .progress-container {
          display: flex;
          flex-direction: column;
          gap: var(--_global-spacing-xs);
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--_global-spacing-sm);
        }

        .progress-label {
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-medium);
          color: var(--_global-color-on-surface);
          line-height: var(--_global-line-height-tight);
        }

        .progress-value {
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-medium);
          color: var(--_global-color-on-surface-variant);
          line-height: var(--_global-line-height-tight);
          font-variant-numeric: tabular-nums;
        }

        .progress-track {
          position: relative;
          width: 100%;
          height: var(--_progress-height);
          background-color: var(--_progress-track-bg);
          border: var(--_progress-track-border);
          border-radius: var(--_progress-border-radius);
          overflow: hidden;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }
        
        .progress-buffer {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background-color: var(--_progress-primary);
          opacity: var(--_progress-buffer-opacity);
          border-radius: var(--_progress-border-radius);
          transition: var(--_progress-transition);
          width: ${this.bufferPercentage}%;
        }

        .progress-fill {
          height: 100%;
          background-color: var(--_progress-primary);
          border-radius: var(--_progress-border-radius);
          transition: var(--_progress-transition);
          width: ${this.indeterminate?"100%":this.percentage+"%"};
          position: relative;
          overflow: hidden;
        }
        
        /* Add subtle gradient and shine effect */
        .progress-fill::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: progress-shine 3s infinite;
        }
        
        @keyframes progress-shine {
          0% {
            left: -100%;
          }
          50%,
          100% {
            left: 100%;
          }
        }
        
        /* Tooltip styles */
        .progress-tooltip {
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--_progress-tooltip-bg);
          color: var(--_progress-tooltip-text);
          padding: var(--_global-spacing-xs) var(--_global-spacing-sm);
          border-radius: var(--_global-border-radius-md);
          font-size: var(--_global-font-size-xs);
          font-weight: var(--_global-font-weight-medium);
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          z-index: 10;
          box-shadow: var(--_global-elevation-2);
        }
        
        .progress-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 4px solid transparent;
          border-top-color: var(--_progress-tooltip-bg);
        }
        
        .progress-track:hover .progress-tooltip {
          opacity: 1;
        }

        /* Indeterminate animation */
        .progress-fill.indeterminate {
          animation: progress-indeterminate 2s infinite var(--_global-motion-easing-standard);
          background: linear-gradient(
            90deg, 
            transparent 0%,
            var(--_progress-primary) 25%,
            var(--_progress-primary) 75%, 
            transparent 100%
          );
          width: 40%;
        }
        
        .progress-fill.indeterminate::before {
          display: none;
        }

        @keyframes progress-indeterminate {
          0% { 
            transform: translateX(-150%);
          }
          100% { 
            transform: translateX(400%);
          }
        }

        /* Size variants */
        :host([size="sm"]) {
          --_progress-height: var(--_progress-height-sm);
        }

        :host([size="lg"]) {
          --_progress-height: var(--_progress-height-lg);
        }

        /* Variant colors */
        :host([variant="primary"]) {
          --_progress-fill-color: var(--_progress-primary);
        }

        :host([variant="secondary"]) .progress-fill {
          background-color: var(--_progress-secondary);
        }

        :host([variant="success"]) .progress-fill {
          background-color: var(--_progress-success);
        }

        :host([variant="warning"]) .progress-fill {
          background-color: var(--_progress-warning);
        }

        :host([variant="error"]) .progress-fill {
          background-color: var(--_progress-error);
        }

        :host([variant="info"]) .progress-fill {
          background-color: var(--_progress-info);
        }

        /* Striped variant */
        :host([variant="striped"]) .progress-fill {
          background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.15) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.15) 75%,
            transparent 75%,
            transparent
          );
          background-size: 1rem 1rem;
          animation: progress-striped 1s linear infinite;
        }

        @keyframes progress-striped {
          0% {
            background-position-x: 0;
          }
          100% {
            background-position-x: 1rem;
          }
        }

        /* Pulsing variant */
        :host([variant="pulse"]) .progress-fill {
          animation: progress-pulse 2s ease-in-out infinite alternate;
        }

        @keyframes progress-pulse {
          0% {
            opacity: 0.6;
          }
          100% {
            opacity: 1;
          }
        }

        /* Accessibility improvements - High Contrast Mode Support */
        @media (prefers-contrast: high) {
          .progress-track {
            border: 2px solid currentColor;
            background-color: var(--_global-color-surface);
          }
          
          .progress-fill {
            outline: 2px solid;
            outline-offset: -2px;
          }
          
          .progress-label,
          .progress-value {
            font-weight: var(--_global-font-weight-bold);
          }
        }

        /* Accessibility improvements - Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          .progress-fill,
          .progress-fill.indeterminate,
          .progress-fill::before,
          .circular-progress,
          .circular-progress.indeterminate {
            animation: none;
            transition: none;
          }
        }

        /* Circular progress variant */
        :host([type="circular"]) .progress-track {
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          box-shadow: none;
          position: relative;
        }

        :host([type="circular"]) .progress-fill {
          display: none;
        }

        .circular-svg {
          width: 56px;
          height: 56px;
          transform: rotate(-90deg);
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        .circular-bg {
          fill: none;
          stroke: var(--_progress-track-bg);
          stroke-width: 6;
          opacity: 0.3;
        }

        .circular-progress {
          fill: none;
          stroke: var(--_progress-primary);
          stroke-width: 6;
          stroke-linecap: round;
          stroke-dasharray: 163.36;
          stroke-dashoffset: ${163.36-163.36*this.percentage/100};
          transition: stroke-dashoffset var(--_progress-transition);
        }
        
        /* Circular indeterminate animation */
        .circular-progress.indeterminate {
          stroke-dasharray: 40.84;
          animation: circular-rotate 2s linear infinite;
        }
        
        @keyframes circular-rotate {
          0% {
            stroke-dashoffset: 163.36;
            transform: rotate(0deg);
          }
          50% {
            stroke-dashoffset: 40.84;
            transform: rotate(450deg);
          }
          100% {
            stroke-dashoffset: 163.36;
            transform: rotate(1080deg);
          }
        }

        .circular-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: var(--_global-font-size-xs);
          font-weight: var(--_global-font-weight-semibold);
          color: var(--_global-color-on-surface);
          font-variant-numeric: tabular-nums;
        }
        
        /* Circular size variants */
        :host([type="circular"][size="sm"]) .progress-track {
          height: 40px;
        }
        
        :host([type="circular"][size="sm"]) .circular-svg {
          width: 40px;
          height: 40px;
        }
        
        :host([type="circular"][size="sm"]) .circular-bg,
        :host([type="circular"][size="sm"]) .circular-progress {
          stroke-width: 4;
        }
        
        :host([type="circular"][size="lg"]) .progress-track {
          height: 72px;
        }
        
        :host([type="circular"][size="lg"]) .circular-svg {
          width: 72px;
          height: 72px;
        }
        
        :host([type="circular"][size="lg"]) .circular-bg,
        :host([type="circular"][size="lg"]) .circular-progress {
          stroke-width: 8;
        }

        /* Enhanced styling for better Material Design 3 alignment */
        .progress-container {
          position: relative;
        }
        
        .progress-track {
          box-sizing: border-box;
        }
        
        /* Enhanced hover and interaction states with micro-interactions */
        :host(:hover) {
          --_progress-track-bg: var(--_global-color-surface-container);
          transform: var(--_global-micro-translate-subtle);
          transition: transform var(--_global-motion-duration-short2) var(--_global-spring-gentle),
                      box-shadow var(--_global-motion-duration-short2) var(--_global-motion-easing-emphasized);
          box-shadow: var(--_global-shadow-interaction-subtle);
        }
        
        :host(:hover) .progress-fill {
          filter: brightness(1.08) saturate(1.1);
          transform: scaleY(1.1);
          transition: filter var(--_global-motion-duration-short2) var(--_global-spring-gentle),
                      transform var(--_global-motion-duration-short2) var(--_global-spring-wobbly);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        
        :host(:hover) .progress-buffer {
          opacity: calc(var(--_progress-buffer-opacity) + 0.1);
          transition: opacity var(--_global-motion-duration-short2) var(--_global-motion-easing-emphasized);
        }
        
        /* Enhanced active/pressed states */
        :host(:active) {
          transform: var(--_global-micro-translate-noticeable);
          transition: transform var(--_global-motion-duration-short1) var(--_global-spring-energetic);
        }
        
        :host(:active) .progress-fill {
          transform: scaleY(1.15);
          filter: brightness(1.12) saturate(1.15);
        }
        
        /* Focus states for accessibility */
        .progress-track:focus {
          outline: 2px solid var(--_global-color-primary);
          outline-offset: 2px;
        }
        
        .progress-track:focus-visible {
          outline: 2px solid var(--_global-color-primary);
          outline-offset: 2px;
        }
        
        /* Enhanced animation states */
        :host([animated]) .progress-fill {
          animation: progress-pulse 2s ease-in-out infinite alternate;
        }
        
        @keyframes progress-pulse {
          0% {
            filter: brightness(1) saturate(1);
          }
          100% {
            filter: brightness(1.05) saturate(1.05);
          }
        }
        
        /* Enhanced circular progress with sophisticated styling */
        :host([type="circular"]) {
          background: radial-gradient(circle at center, 
            var(--_gauge-bg-color) 0%,
            var(--_global-color-surface-container-low) 100%
          );
          border: 1px solid var(--_global-color-outline-variant);
          box-shadow: 
            var(--_global-elevation-2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        :host([type="circular"]) .circular-text {
          font-feature-settings: 'tnum';
          letter-spacing: -0.02em;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          font-weight: var(--_global-font-weight-bold);
        }
        
        :host([type="circular"]) .circular-svg {
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15));
        }
        
        :host([type="circular"]) .circular-progress {
          filter: drop-shadow(0 0 6px rgba(var(--_progress-primary-rgb, 103, 80, 164), 0.4));
          stroke: url(#circularGradient);
        }
        
        :host([type="circular"]:hover) {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 
            var(--_global-shadow-interaction-moderate),
            inset 0 1px 0 rgba(255, 255, 255, 0.15),
            0 0 30px rgba(var(--_progress-primary-rgb, 103, 80, 164), 0.2);
        }
        
        :host([type="circular"]:hover) .circular-progress {
          stroke-width: calc(6px + 1px);
          filter: drop-shadow(0 0 12px rgba(var(--_progress-primary-rgb, 103, 80, 164), 0.6));
        }
      </style>

      <div class="progress-container">
        ${this.label||this.showValue?`
          <div class="progress-header">
            ${this.label?`<span class="progress-label">${this.label}</span>`:""}
            ${this.showValue?`<span class="progress-value">${this.getDisplayValue()}</span>`:""}
          </div>
        `:""}
        
        <div class="progress-track" role="progressbar" 
             aria-valuenow="${this.indeterminate?void 0:this._value}"
             aria-valuemin="${this.min}"
             aria-valuemax="${this.max}"
             ${this.label?`aria-label="${this.label}"`:""}
             ${this.indeterminate?'aria-describedby="indeterminate-progress"':""}
             ${this.tooltip?`title="${this.tooltip}"`:""}
        >
          ${this.bufferValue>0?'<div class="progress-buffer"></div>':""}
          ${this.tooltip?`<div class="progress-tooltip">${this.tooltip}</div>`:""}
          ${this.getAttribute("type")==="circular"?`
            <svg class="circular-svg" viewBox="0 0 60 60">
              <defs>
                <linearGradient id="circularGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:var(--_progress-primary);stop-opacity:0.9" />
                  <stop offset="50%" style="stop-color:color-mix(in srgb, var(--_progress-primary) 80%, white 20%);stop-opacity:1" />
                  <stop offset="100%" style="stop-color:var(--_progress-primary);stop-opacity:0.95" />
                </linearGradient>
              </defs>
              <circle class="circular-bg" cx="30" cy="30" r="26"></circle>
              <circle class="circular-progress ${this.indeterminate?"indeterminate":""}" cx="30" cy="30" r="26"></circle>
            </svg>
            ${this.showValue?`<span class="circular-text">${this.getDisplayValue()}</span>`:""}
          `:`
            <div class="progress-fill ${this.indeterminate?"indeterminate":""}" 
                 ${this.indeterminate?'id="indeterminate-progress"':""}></div>
          `}
        </div>
      </div>

      ${this.indeterminate?'<div id="indeterminate-progress" style="display: none;">Loading in progress</div>':""}
    `}}customElements.get("my-progress")||customElements.define("my-progress",p);
