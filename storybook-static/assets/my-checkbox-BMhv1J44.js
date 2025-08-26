import{M as a}from"./base-component-q4KNMHwB.js";class c extends a{constructor(){super(),this.handleClick=this.handleClick.bind(this),this.toggle=this.toggle.bind(this),this.log("Toggle component initializing...")}static get observedAttributes(){return[...super.observedAttributes,"checked","label","name","value"]}handleAttributeChange(e,o,r){switch(super.handleAttributeChange(e,o,r),e){case"checked":this.emit("change",{checked:this.checked,value:this.checked?this.value:null,name:this.name});break;case"disabled":this.announceToScreenReader(`Toggle ${this.disabled?"disabled":"enabled"}`,"polite");break}}get checked(){return this.hasAttribute("checked")}set checked(e){const o=!!e;this.toggleAttribute("checked",o),this.log("Checked state changed:",o)}get label(){return this.getAttribute("label")||""}set label(e){this.setAttribute("label",e)}get name(){return this.getAttribute("name")||""}set name(e){this.setAttribute("name",e)}get value(){return this.getAttribute("value")||"on"}set value(e){this.setAttribute("value",e)}get error(){return this.hasAttribute("error")}set error(e){e?this.setAttribute("error",""):this.removeAttribute("error")}get size(){return this.getAttribute("size")||"md"}set size(e){this.setAttribute("size",e)}handleClick(e){if(this.disabled){e.preventDefault();return}this.toggle()}handleKeyDown(e){this.disabled||(e.key===" "||e.key==="Enter")&&(e.preventDefault(),this.toggle())}toggle(){const e=this.checked;this.checked=!e,this.emit("change",{checked:this.checked,value:this.checked?this.value:null,name:this.name})}attachEventListeners(){this.removeEventListeners();const e=this.shadowRoot.querySelector(".toggle-container");e&&this.addEventListeners([{element:e,events:["click"],handler:this.handleClick},{element:e,events:["keydown"],handler:this.handleKeyDown}])}render(){this.shadowRoot.innerHTML=`
      <style>
        :host {
          /* Advanced Material Design 3 variables with superior semantic naming */
          --_toggle-width: 52px;
          --_toggle-height: 32px;
          --_toggle-thumb-size: 24px;
          --_toggle-thumb-size-pressed: 28px;
          --_toggle-thumb-size-expanded: 32px;
          --_toggle-track-height: 16px;
          --_toggle-state-layer-size: 40px;
          --_toggle-border-radius: var(--_global-border-radius-full);
          --_toggle-border-width: 2px;
          --_toggle-border-width-focus: 3px;
          
          /* Advanced color system with contextual variations */
          --_toggle-color-unchecked: var(--_global-color-outline);
          --_toggle-color-unchecked-hover: var(--_global-color-on-surface-variant);
          --_toggle-color-checked: var(--_global-color-primary);
          --_toggle-color-checked-hover: var(--_global-color-primary-60);
          --_toggle-color-disabled: var(--_global-color-outline-variant);
          --_toggle-color-error: var(--_global-color-error);
          --_toggle-color-error-hover: #E53E3E;
          
          /* Enhanced background colors with subtle gradients */
          --_toggle-track-color-off: var(--_global-color-surface-container-highest);
          --_toggle-track-color-off-hover: var(--_global-color-surface-container-high);
          --_toggle-track-color-on: var(--_global-color-primary);
          --_toggle-track-color-on-hover: var(--_global-color-primary-60);
          --_toggle-track-color-disabled: var(--_global-color-surface-variant);
          --_toggle-track-color-error: var(--_global-color-error);
          
          /* Enhanced border system with dynamic thickness */
          --_toggle-border-off: var(--_toggle-border-width) solid var(--_toggle-color-unchecked);
          --_toggle-border-on: var(--_toggle-border-width) solid var(--_toggle-color-checked);
          --_toggle-border-hover: var(--_toggle-border-width) solid var(--_toggle-color-unchecked-hover);
          --_toggle-border-focus: var(--_toggle-border-width-focus) solid var(--_toggle-color-checked);
          --_toggle-border-disabled: var(--_toggle-border-width) solid var(--_toggle-color-disabled);
          --_toggle-border-error: var(--_toggle-border-width) solid var(--_toggle-color-error);
          
          /* Advanced thumb color system */
          --_toggle-thumb-color-off: var(--_global-color-outline);
          --_toggle-thumb-color-off-hover: var(--_global-color-on-surface-variant);
          --_toggle-thumb-color-on: var(--_global-color-on-primary);
          --_toggle-thumb-color-on-hover: var(--_global-color-surface);
          --_toggle-thumb-color-disabled: var(--_global-color-surface);
          --_toggle-thumb-color-error: var(--_global-color-on-error);
          
          /* Advanced state layer colors with contextual awareness */
          --_toggle-state-layer-off: var(--_toggle-color-checked);
          --_toggle-state-layer-on: var(--_toggle-color-checked);
          --_toggle-state-layer-error: var(--_toggle-color-error);
          --_toggle-state-layer-hover: var(--_global-state-layer-hover);
          --_toggle-state-layer-focus: var(--_global-state-layer-focus);
          --_toggle-state-layer-pressed: var(--_global-state-layer-pressed);
          
          /* Spring-based motion system with enhanced easing */
          --_toggle-transition: all var(--_global-motion-duration-medium1) var(--_global-spring-gentle);
          --_toggle-transition-fast: all var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          --_toggle-transition-emphasized: all var(--_global-motion-duration-medium1) var(--_global-spring-energetic);
          --_toggle-transition-bounce: all var(--_global-motion-duration-medium2) var(--_global-spring-bouncy);
          --_toggle-transition-thumb: all var(--_global-motion-duration-medium1) var(--_global-spring-wobbly);
          
          /* Enhanced ripple system with better physics */
          --_toggle-ripple-size: calc(var(--_toggle-state-layer-size) * 1.4);
          --_toggle-ripple-duration: var(--_global-ripple-duration);
          --_toggle-ripple-duration-fast: var(--_global-ripple-duration-fast);
          --_toggle-ripple-easing: var(--_global-spring-gentle);
          --_toggle-ripple-easing-bounce: var(--_global-spring-wobbly);
          
          /* Enhanced typography with better hierarchy */
          --_toggle-label-color: var(--_global-color-on-surface);
          --_toggle-label-color-hover: var(--_global-color-primary-10);
          --_toggle-label-color-disabled: var(--_global-color-outline);
          --_toggle-label-color-error: var(--_global-color-error);
          
          /* Advanced elevation system for depth */
          --_toggle-thumb-elevation-rest: var(--_global-elevation-0);
          --_toggle-thumb-elevation-hover: var(--_global-shadow-interaction-subtle);
          --_toggle-thumb-elevation-focus: var(--_global-shadow-interaction-moderate);
          --_toggle-thumb-elevation-active: var(--_global-shadow-interaction-strong);
          --_toggle-track-elevation-rest: var(--_global-elevation-0);
          --_toggle-track-elevation-hover: var(--_global-shadow-surface-subtle);
          --_toggle-track-elevation-focus: var(--_global-shadow-surface-moderate);
          
          /* Micro-interaction enhancements */
          --_toggle-scale-rest: 1;
          --_toggle-scale-hover: var(--_global-micro-scale-subtle);
          --_toggle-scale-focus: var(--_global-micro-scale-noticeable);
          --_toggle-scale-active: 0.98;
          --_toggle-translate-hover: var(--_global-micro-translate-subtle);
          
          display: inline-flex;
          align-items: center;
          gap: var(--_global-spacing-sm);
          cursor: pointer;
          user-select: none;
          line-height: var(--_global-line-height-normal);
          position: relative;
          min-height: var(--_toggle-state-layer-size);
          font-family: var(--_global-font-family-sans);
          contain: layout style;
          isolation: isolate;
        }

        :host([disabled]) {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }

        .toggle-container {
          display: inline-flex;
          align-items: center;
          gap: var(--_global-spacing-sm);
          cursor: pointer;
          outline: none;
          position: relative;
          padding: calc((var(--_toggle-state-layer-size) - var(--_toggle-width)) / 2);
          margin: calc((var(--_toggle-state-layer-size) - var(--_toggle-width)) / -2);
          border-radius: 50%;
          overflow: visible;
          isolation: isolate;
          transform: var(--_toggle-scale-rest);
          transition: var(--_toggle-transition);
          will-change: transform, box-shadow;
        }
        
        /* Enhanced multi-layered state system for superior depth */
        .toggle-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background-color: var(--_toggle-state-layer-off);
          opacity: 0;
          transform: scale(0.8);
          transition: var(--_toggle-transition-emphasized);
          pointer-events: none;
          z-index: -1;
          box-shadow: var(--_toggle-track-elevation-rest);
        }
        
        /* Advanced state layer for focus ring enhancement */
        .toggle-container::after {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border-radius: 50%;
          background-color: var(--_toggle-state-layer-off);
          opacity: 0;
          transform: scale(0.6);
          transition: var(--_toggle-transition-bounce);
          pointer-events: none;
          z-index: -2;
          border: 2px solid transparent;
        }
        
        /* Enhanced state layer color changes for checked state */
        .toggle-container:has(.checked)::before,
        .toggle-container:has(.checked)::after {
          background-color: var(--_toggle-state-layer-on);
        }
        
        /* Superior hover state with spring physics and micro-interactions */
        .toggle-container:hover:not([aria-disabled="true"]) {
          transform: var(--_toggle-scale-hover) var(--_toggle-translate-hover);
          box-shadow: var(--_toggle-track-elevation-hover);
        }
        
        .toggle-container:hover:not([aria-disabled="true"])::before {
          opacity: var(--_toggle-state-layer-hover);
          transform: scale(1.2);
          box-shadow: var(--_toggle-track-elevation-hover);
        }
        
        .toggle-container:hover:not([aria-disabled="true"])::after {
          opacity: calc(var(--_toggle-state-layer-hover) * 0.6);
          transform: scale(1);
        }
        
        /* Enhanced active/pressed state with realistic physics */
        .toggle-container:active:not([aria-disabled="true"]) {
          transform: scale(var(--_toggle-scale-active));
          box-shadow: var(--_toggle-track-elevation-focus);
          transition: var(--_toggle-transition-fast);
        }
        
        .toggle-container:active:not([aria-disabled="true"])::before {
          opacity: var(--_toggle-state-layer-pressed);
          transform: scale(1);
          transition: var(--_toggle-transition-fast);
        }
        
        .toggle-container:active:not([aria-disabled="true"])::after {
          opacity: calc(var(--_toggle-state-layer-pressed) * 0.8);
          transform: scale(0.8);
          transition: var(--_toggle-transition-fast);
        }

        /* Superior focus indicators with advanced visual feedback */
        .toggle-container:focus {
          outline: var(--_toggle-border-focus);
          outline-offset: 3px;
          transform: var(--_toggle-scale-focus);
          box-shadow: var(--_toggle-track-elevation-focus);
          transition: var(--_toggle-transition-emphasized);
        }
        
        .toggle-container:focus::before {
          opacity: var(--_toggle-state-layer-focus);
          transform: scale(1.3);
          box-shadow: var(--_toggle-track-elevation-focus);
        }
        
        .toggle-container:focus::after {
          opacity: calc(var(--_toggle-state-layer-focus) * 0.7);
          transform: scale(1.1);
          border-color: var(--_toggle-color-checked);
        }
        
        /* Enhanced focus ring for superior keyboard navigation */
        .toggle-container:focus:not(:active) {
          outline-width: var(--_toggle-border-width-focus);
          animation: focus-pulse-advanced 2.5s var(--_global-spring-gentle) infinite;
        }
        
        .toggle-container:focus:not(:active)::after {
          animation: focus-ring-pulse 2.5s var(--_global-spring-gentle) infinite;
        }
        
        /* Advanced focus animations with spring physics */
        @keyframes focus-pulse-advanced {
          0%, 100% { 
            outline-offset: 3px;
            transform: var(--_toggle-scale-focus);
          }
          25% { 
            outline-offset: 5px;
            transform: scale(1.08);
          }
          50% { 
            outline-offset: 6px;
            transform: scale(1.1);
          }
          75% { 
            outline-offset: 5px;
            transform: scale(1.08);
          }
        }
        
        @keyframes focus-ring-pulse {
          0%, 100% { 
            transform: scale(1.1);
            opacity: calc(var(--_toggle-state-layer-focus) * 0.7);
          }
          50% { 
            transform: scale(1.2);
            opacity: calc(var(--_toggle-state-layer-focus) * 0.9);
          }
        }

        .toggle-track {
          position: relative;
          width: var(--_toggle-width);
          height: var(--_toggle-track-height);
          background-color: var(--_toggle-track-color-off);
          background-image: linear-gradient(135deg, var(--_toggle-track-color-off) 0%, var(--_global-color-surface-container-low) 100%);
          border: var(--_toggle-border-off);
          border-radius: var(--_toggle-border-radius);
          transition: var(--_toggle-transition);
          box-sizing: border-box;
          overflow: hidden;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), var(--_toggle-track-elevation-rest);
          will-change: background-color, border-color, box-shadow, transform;
        }

        .toggle-track.checked {
          background-color: var(--_toggle-track-color-on);
          background-image: linear-gradient(135deg, var(--_toggle-track-color-on) 0%, var(--_toggle-color-checked-hover) 100%);
          border: var(--_toggle-border-on);
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.15), var(--_toggle-track-elevation-hover);
          animation: track-checked-bounce var(--_global-motion-duration-medium1) var(--_global-spring-bouncy) forwards;
        }
        
        /* Enhanced hover state for track with superior visual feedback */
        .toggle-container:hover:not([aria-disabled="true"]) .toggle-track:not(.checked) {
          border: var(--_toggle-border-hover);
          background-color: var(--_toggle-track-color-off-hover);
          background-image: linear-gradient(135deg, var(--_toggle-track-color-off-hover) 0%, var(--_global-color-surface-container) 100%);
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12), var(--_toggle-track-elevation-hover);
          transform: var(--_toggle-scale-hover);
        }
        
        .toggle-container:hover:not([aria-disabled="true"]) .toggle-track.checked {
          background-color: var(--_toggle-track-color-on-hover);
          background-image: linear-gradient(135deg, var(--_toggle-track-color-on-hover) 0%, var(--_toggle-color-checked) 100%);
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.18), var(--_toggle-track-elevation-focus);
          transform: var(--_toggle-scale-hover);
        }
        
        /* Track bounce animation for checked state */
        @keyframes track-checked-bounce {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .toggle-thumb {
          position: absolute;
          top: 50%;
          left: calc(-1 * var(--_toggle-thumb-size) / 2 + var(--_toggle-border-width));
          width: var(--_toggle-thumb-size);
          height: var(--_toggle-thumb-size);
          background-color: var(--_toggle-thumb-color-off);
          background-image: linear-gradient(135deg, var(--_toggle-thumb-color-off) 0%, var(--_global-color-surface) 100%);
          border-radius: var(--_toggle-border-radius);
          transition: var(--_toggle-transition-thumb);
          transform: translateY(-50%);
          box-shadow: var(--_toggle-thumb-elevation-rest), 0 1px 3px rgba(0, 0, 0, 0.15);
          z-index: 2;
          border: 1px solid rgba(0, 0, 0, 0.1);
          will-change: transform, background-color, box-shadow, left, width, height;
        }
        
        /* Enhanced checked state for thumb with sophisticated animations */
        .toggle-track.checked .toggle-thumb {
          left: calc(100% - var(--_toggle-thumb-size) / 2 - var(--_toggle-border-width));
          background-color: var(--_toggle-thumb-color-on);
          background-image: linear-gradient(135deg, var(--_toggle-thumb-color-on) 0%, var(--_toggle-thumb-color-on-hover) 100%);
          box-shadow: var(--_toggle-thumb-elevation-hover), 0 2px 6px rgba(0, 0, 0, 0.2);
          transform: translateY(-50%) scale(1.1);
          animation: thumb-bounce-advanced var(--_global-motion-duration-medium1) var(--_global-spring-wobbly) forwards;
        }
        
        /* Enhanced pressed state for thumb with superior expansion physics */
        .toggle-container:active .toggle-thumb {
          width: var(--_toggle-thumb-size-pressed);
          height: var(--_toggle-thumb-size-pressed);
          box-shadow: var(--_toggle-thumb-elevation-active), 0 3px 8px rgba(0, 0, 0, 0.25);
          transition: var(--_toggle-transition-fast);
        }
        
        .toggle-container:active .toggle-track:not(.checked) .toggle-thumb {
          left: calc(-1 * var(--_toggle-thumb-size-pressed) / 2 + var(--_toggle-border-width));
          transform: translateY(-50%) scale(0.9);
          background-image: linear-gradient(135deg, var(--_toggle-thumb-color-off-hover) 0%, var(--_global-color-surface-variant) 100%);
        }
        
        .toggle-container:active .toggle-track.checked .toggle-thumb {
          left: calc(100% - var(--_toggle-thumb-size-pressed) / 2 - var(--_toggle-border-width));
          width: var(--_toggle-thumb-size-expanded);
          height: var(--_toggle-thumb-size-expanded);
          transform: translateY(-50%) scale(0.9);
          background-image: linear-gradient(135deg, var(--_toggle-thumb-color-on-hover) 0%, var(--_toggle-thumb-color-on) 100%);
        }
        
        /* Advanced thumb bounce animation with spring physics */
        @keyframes thumb-bounce-advanced {
          0% {
            transform: translateY(-50%) scale(1);
          }
          25% {
            transform: translateY(-50%) scale(1.2) rotate(2deg);
          }
          50% {
            transform: translateY(-50%) scale(1.15) rotate(-1deg);
          }
          75% {
            transform: translateY(-50%) scale(1.12) rotate(0.5deg);
          }
          100% {
            transform: translateY(-50%) scale(1.1) rotate(0deg);
          }
        }
        
        /* Superior hover enhancement for thumb with micro-interactions */
        .toggle-container:hover:not([aria-disabled="true"]) .toggle-thumb {
          box-shadow: var(--_toggle-thumb-elevation-hover), 0 2px 6px rgba(0, 0, 0, 0.18);
          transform: translateY(-50%) scale(1.05) translateZ(0);
          background-image: linear-gradient(135deg, var(--_toggle-thumb-color-off-hover) 0%, var(--_global-color-surface-container) 100%);
        }
        
        .toggle-container:hover:not([aria-disabled="true"]) .toggle-track.checked .toggle-thumb {
          transform: translateY(-50%) scale(1.15) translateZ(0);
          background-image: linear-gradient(135deg, var(--_toggle-thumb-color-on-hover) 0%, var(--_toggle-thumb-color-on) 100%);
          box-shadow: var(--_toggle-thumb-elevation-focus), 0 3px 8px rgba(0, 0, 0, 0.22);
        }

        .label {
          color: var(--_toggle-label-color);
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-normal);
          line-height: var(--_global-line-height-normal);
          cursor: pointer;
          flex: 1;
          transition: var(--_toggle-transition-fast);
          will-change: color;
        }
        
        /* Enhanced label hover states with contextual color changes */
        .toggle-container:hover:not([aria-disabled="true"]) + .label {
          color: var(--_toggle-label-color-hover);
        }

        /* Enhanced disabled states with sophisticated visual feedback */
        :host([disabled]) {
          --_toggle-color-unchecked: var(--_toggle-color-disabled);
          --_toggle-color-checked: var(--_toggle-color-disabled);
          --_toggle-track-color-off: var(--_toggle-track-color-disabled);
          --_toggle-track-color-on: var(--_toggle-track-color-disabled);
          --_toggle-border-off: var(--_toggle-border-disabled);
          --_toggle-border-on: var(--_toggle-border-disabled);
          --_toggle-thumb-color-off: var(--_toggle-thumb-color-disabled);
          --_toggle-thumb-color-on: var(--_toggle-thumb-color-disabled);
          --_toggle-label-color: var(--_toggle-label-color-disabled);
          opacity: 0.6;
          filter: grayscale(0.3);
        }
        
        :host([disabled]) .toggle-container::before,
        :host([disabled]) .toggle-container::after {
          display: none;
        }
        
        :host([disabled]) .toggle-thumb {
          box-shadow: none;
          transform: translateY(-50%) scale(0.9);
          cursor: not-allowed;
          background-image: none;
          filter: brightness(0.9);
        }
        
        :host([disabled]) .toggle-track.checked .toggle-thumb {
          transform: translateY(-50%) scale(0.9);
          animation: none;
          background-image: none;
        }
        
        :host([disabled]) .toggle-track {
          box-shadow: none;
          cursor: not-allowed;
          background-image: none;
          filter: brightness(0.95);
        }
        
        :host([disabled]) .label {
          cursor: not-allowed;
          filter: brightness(0.8);
        }

        /* Enhanced size variants with improved scaling */
        :host([size="xs"]) {
          --_toggle-width: 36px;
          --_toggle-track-height: 12px;
          --_toggle-thumb-size: 16px;
          --_toggle-thumb-size-pressed: 20px;
          --_toggle-thumb-size-expanded: 24px;
          --_toggle-state-layer-size: 32px;
        }

        :host([size="sm"]) {
          --_toggle-width: 44px;
          --_toggle-track-height: 14px;
          --_toggle-thumb-size: 20px;
          --_toggle-thumb-size-pressed: 24px;
          --_toggle-thumb-size-expanded: 28px;
          --_toggle-state-layer-size: 36px;
        }

        :host([size="lg"]) {
          --_toggle-width: 60px;
          --_toggle-track-height: 18px;
          --_toggle-thumb-size: 28px;
          --_toggle-thumb-size-pressed: 32px;
          --_toggle-thumb-size-expanded: 36px;
          --_toggle-state-layer-size: 48px;
        }
        
        /* Enhanced error state support with sophisticated visual feedback */
        :host([error]) {
          --_toggle-color-unchecked: var(--_toggle-color-error);
          --_toggle-color-checked: var(--_toggle-color-error);
          --_toggle-color-unchecked-hover: var(--_toggle-color-error-hover);
          --_toggle-color-checked-hover: var(--_toggle-color-error-hover);
          --_toggle-track-color-off: var(--_toggle-track-color-error);
          --_toggle-track-color-on: var(--_toggle-track-color-error);
          --_toggle-track-color-off-hover: var(--_toggle-color-error-hover);
          --_toggle-track-color-on-hover: var(--_toggle-color-error-hover);
          --_toggle-border-off: var(--_toggle-border-error);
          --_toggle-border-on: var(--_toggle-border-error);
          --_toggle-border-hover: var(--_toggle-border-error);
          --_toggle-thumb-color-on: var(--_toggle-thumb-color-error);
          --_toggle-state-layer-off: var(--_toggle-state-layer-error);
          --_toggle-state-layer-on: var(--_toggle-state-layer-error);
          --_toggle-label-color: var(--_toggle-label-color-error);
        }
        
        :host([error]) .toggle-container:focus {
          outline-color: var(--_toggle-state-layer-error);
        }
        
        :host([error]) .toggle-container:focus::after {
          border-color: var(--_toggle-color-error);
        }
        
        /* Error state animations for enhanced feedback */
        :host([error]) .toggle-track {
          animation: error-pulse 2s var(--_global-spring-gentle) infinite;
        }
        
        @keyframes error-pulse {
          0%, 100% { 
            border-color: var(--_toggle-color-error);
          }
          50% { 
            border-color: var(--_toggle-color-error-hover);
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(229, 62, 62, 0.2);
          }
        }

        /* Enhanced High Contrast Mode Support */
        @media (prefers-contrast: high) {
          :host {
            --_toggle-border-width: 3px;
          }
          
          .toggle-track {
            border-width: var(--_toggle-border-width);
            background-color: var(--_global-color-surface);
            box-shadow: none;
          }
          
          .toggle-track.checked {
            background-color: var(--_global-color-primary);
            outline: 2px solid var(--_global-color-on-surface);
            outline-offset: 2px;
          }
          
          .toggle-thumb {
            border: 3px solid var(--_global-color-on-surface);
            background-color: var(--_global-color-surface);
            box-shadow: none;
          }
          
          .toggle-track.checked .toggle-thumb {
            background-color: var(--_global-color-on-primary);
            border-color: var(--_global-color-on-primary);
          }
          
          .toggle-container::before {
            display: none;
          }
          
          .label {
            font-weight: var(--_global-font-weight-bold);
          }
          
          .toggle-container:focus {
            outline-width: 4px;
            outline-style: double;
          }
        }

        /* Enhanced Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          :host {
            --_toggle-transition: none;
            --_toggle-transition-fast: none;
            --_toggle-transition-thumb: none;
          }
          
          .toggle-track,
          .toggle-thumb,
          .toggle-container::before,
          .label {
            animation: none !important;
            transition: none !important;
          }
          
          .toggle-container:focus:not(:active) {
            animation: none;
          }
          
          .toggle-track.checked .toggle-thumb {
            transform: translateY(-50%);
            animation: none;
          }
          
          .toggle-container:hover:not([aria-disabled="true"]) .toggle-thumb,
          .toggle-container:hover:not([aria-disabled="true"]) .toggle-track.checked .toggle-thumb {
            transform: translateY(-50%);
          }
        }

        /* Enhanced focus-visible support with advanced visual feedback */
        @supports selector(:focus-visible) {
          .toggle-container:focus:not(:focus-visible) {
            outline: none;
            animation: none;
            transform: var(--_toggle-scale-rest);
            box-shadow: var(--_toggle-track-elevation-rest);
          }
          
          .toggle-container:focus:not(:focus-visible)::before,
          .toggle-container:focus:not(:focus-visible)::after {
            opacity: 0;
            transform: scale(0.8);
          }
          
          .toggle-container:focus-visible {
            outline: var(--_toggle-border-width-focus) solid var(--_toggle-state-layer-on);
            outline-offset: 3px;
            animation: focus-pulse-advanced 2.5s var(--_global-spring-gentle) infinite;
            transform: var(--_toggle-scale-focus);
            box-shadow: var(--_toggle-track-elevation-focus);
          }
          
          .toggle-container:focus-visible::before {
            opacity: var(--_toggle-state-layer-focus);
            transform: scale(1.3);
            animation: focus-ring-pulse 2.5s var(--_global-spring-gentle) infinite;
          }
          
          .toggle-container:focus-visible::after {
            opacity: calc(var(--_toggle-state-layer-focus) * 0.7);
            transform: scale(1.1);
            border-color: var(--_toggle-color-checked);
            animation: focus-ring-pulse 2.5s var(--_global-spring-gentle) infinite;
          }
        }
        
        /* Enhanced color scheme adaptation with sophisticated dark mode support */
        @media (prefers-color-scheme: dark) {
          .toggle-track {
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), var(--_toggle-track-elevation-rest);
            background-image: linear-gradient(135deg, var(--_toggle-track-color-off) 0%, rgba(255, 255, 255, 0.05) 100%);
          }
          
          .toggle-track.checked {
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4), var(--_toggle-track-elevation-hover);
            background-image: linear-gradient(135deg, var(--_toggle-track-color-on) 0%, rgba(255, 255, 255, 0.1) 100%);
          }
          
          .toggle-thumb {
            border-color: rgba(255, 255, 255, 0.15);
            background-image: linear-gradient(135deg, var(--_toggle-thumb-color-off) 0%, rgba(255, 255, 255, 0.08) 100%);
            box-shadow: var(--_toggle-thumb-elevation-rest), 0 1px 3px rgba(0, 0, 0, 0.25);
          }
          
          .toggle-track.checked .toggle-thumb {
            background-image: linear-gradient(135deg, var(--_toggle-thumb-color-on) 0%, rgba(255, 255, 255, 0.12) 100%);
            box-shadow: var(--_toggle-thumb-elevation-hover), 0 2px 6px rgba(0, 0, 0, 0.3);
          }
          
          /* Enhanced hover states for dark mode */
          .toggle-container:hover:not([aria-disabled="true"]) .toggle-track:not(.checked) {
            background-image: linear-gradient(135deg, var(--_toggle-track-color-off-hover) 0%, rgba(255, 255, 255, 0.08) 100%);
          }
          
          .toggle-container:hover:not([aria-disabled="true"]) .toggle-track.checked {
            background-image: linear-gradient(135deg, var(--_toggle-track-color-on-hover) 0%, rgba(255, 255, 255, 0.15) 100%);
          }
        }
      </style>

      <div 
        class="toggle-container"
        role="switch"
        aria-checked="${this.checked}"
        aria-label="${this.label||"toggle switch"}"
        ${this.disabled?'aria-disabled="true"':""}
        tabindex="${this.disabled?"-1":"0"}"
      >
        <div class="toggle-track ${this.checked?"checked":""}">
          <div class="toggle-thumb"></div>
        </div>
      </div>
      
      ${this.label?`<span class="label">${this.label}</span>`:""}
    `}}customElements.get("my-toggle")||customElements.define("my-toggle",c);class l extends a{constructor(){super(),this.handleClick=this.handleClick.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.toggle=this.toggle.bind(this),this.log("Checkbox component initializing...")}static get observedAttributes(){return[...super.observedAttributes,"checked","indeterminate","label","name","value"]}handleAttributeChange(e,o,r){switch(super.handleAttributeChange(e,o,r),e){case"checked":case"indeterminate":this.announceToScreenReader(`Checkbox ${this.checked?"checked":this.indeterminate?"indeterminate":"unchecked"}`,"polite");break;case"disabled":this.announceToScreenReader(`Checkbox ${this.disabled?"disabled":"enabled"}`,"polite");break}}get checked(){return this.hasAttribute("checked")}set checked(e){e?(this.setAttribute("checked",""),this.removeAttribute("indeterminate")):this.removeAttribute("checked")}get indeterminate(){return this.hasAttribute("indeterminate")}set indeterminate(e){e?(this.setAttribute("indeterminate",""),this.removeAttribute("checked")):this.removeAttribute("indeterminate")}get label(){return this.getAttribute("label")||""}set label(e){this.setAttribute("label",e)}get name(){return this.getAttribute("name")||""}set name(e){this.setAttribute("name",e)}get value(){return this.getAttribute("value")||"on"}set value(e){this.setAttribute("value",e)}handleClick(e){if(this.disabled||this.loading){e.preventDefault();return}const o=this.shadowRoot.querySelector(".checkbox-container");this.createRipple(e,o),this.toggle()}handleKeyDown(e){if(super.handleKeyDown(e),!(this.disabled||this.loading)&&e.key===" "){e.preventDefault();const o=this.shadowRoot.querySelector(".checkbox-container");this.createRipple(null,o),this.toggle()}}toggle(){this.indeterminate?this.checked=!0:this.checked=!this.checked,this.emit("change",{checked:this.checked,indeterminate:this.indeterminate,value:this.checked?this.value:null,name:this.name})}attachEventListeners(){this.removeEventListeners();const e=this.shadowRoot.querySelector(".checkbox-container");e&&this.addEventListeners([{element:e,events:["click","keydown"],handler:o=>{o.type==="click"?this.handleClick(o):o.type==="keydown"&&this.handleKeyDown(o)}}])}onConnected(){this.log("Checkbox connected to DOM")}onDisconnected(){this.log("Checkbox disconnected from DOM")}render(){this.shadowRoot.innerHTML=`
      <style>
        :host {
          /* Enhanced Material Design 3 variables with superior semantic naming */
          --_checkbox-size: 18px;
          --_checkbox-state-layer-size: 40px;
          --_checkbox-border-radius: var(--_global-border-radius-sm);
          
          /* Enhanced color system with expanded Material Design 3 palette */
          --_checkbox-color-unchecked: var(--_global-color-outline);
          --_checkbox-color-unchecked-hover: var(--_global-color-primary-40);
          --_checkbox-color-checked: var(--_global-color-primary);
          --_checkbox-color-checked-hover: var(--_global-color-primary-60);
          --_checkbox-color-disabled: var(--_global-color-outline-variant);
          --_checkbox-color-error: var(--_global-color-error);
          --_checkbox-color-error-hover: #E53E3E;
          
          /* Enhanced background colors with subtle gradients */
          --_checkbox-background-unchecked: var(--_global-color-surface);
          --_checkbox-background-unchecked-hover: var(--_global-color-surface-container-low);
          --_checkbox-background-checked: var(--_global-color-primary);
          --_checkbox-background-checked-hover: var(--_global-color-primary-60);
          --_checkbox-background-disabled: var(--_global-color-surface-variant);
          --_checkbox-background-error: var(--_global-color-error);
          
          /* Enhanced border system with dynamic thickness */
          --_checkbox-border-width: 2px;
          --_checkbox-border-width-focus: 3px;
          --_checkbox-border-unchecked: var(--_checkbox-border-width) solid var(--_checkbox-color-unchecked);
          --_checkbox-border-checked: var(--_checkbox-border-width) solid var(--_checkbox-color-checked);
          --_checkbox-border-hover: var(--_checkbox-border-width) solid var(--_checkbox-color-unchecked-hover);
          --_checkbox-border-focus: var(--_checkbox-border-width-focus) solid var(--_checkbox-color-checked);
          --_checkbox-border-disabled: var(--_checkbox-border-width) solid var(--_checkbox-color-disabled);
          --_checkbox-border-error: var(--_checkbox-border-width) solid var(--_checkbox-color-error);
          
          /* Advanced state layer colors with contextual awareness */
          --_checkbox-state-layer-unchecked: var(--_checkbox-color-checked);
          --_checkbox-state-layer-checked: var(--_checkbox-color-checked);
          --_checkbox-state-layer-error: var(--_checkbox-color-error);
          --_checkbox-state-layer-hover: var(--_global-state-layer-hover);
          --_checkbox-state-layer-focus: var(--_global-state-layer-focus);
          --_checkbox-state-layer-pressed: var(--_global-state-layer-pressed);
          
          /* Spring-based motion system with enhanced easing */
          --_checkbox-transition: all var(--_global-motion-duration-medium1) var(--_global-spring-gentle);
          --_checkbox-transition-fast: all var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          --_checkbox-transition-emphasized: all var(--_global-motion-duration-medium1) var(--_global-spring-energetic);
          --_checkbox-transition-bounce: all var(--_global-motion-duration-medium2) var(--_global-spring-bouncy);
          
          /* Enhanced ripple system with better physics */
          --_checkbox-ripple-size: calc(var(--_checkbox-state-layer-size) * 1.4);
          --_checkbox-ripple-duration: var(--_global-ripple-duration);
          --_checkbox-ripple-duration-fast: var(--_global-ripple-duration-fast);
          --_checkbox-ripple-easing: var(--_global-spring-gentle);
          --_checkbox-ripple-easing-bounce: var(--_global-spring-wobbly);
          
          /* Enhanced typography with better hierarchy */
          --_checkbox-label-color: var(--_global-color-on-surface);
          --_checkbox-label-color-hover: var(--_global-color-primary-10);
          --_checkbox-label-color-disabled: var(--_global-color-outline);
          --_checkbox-label-color-error: var(--_global-color-error);
          
          /* Advanced elevation system for depth */
          --_checkbox-elevation-rest: var(--_global-elevation-0);
          --_checkbox-elevation-hover: var(--_global-shadow-interaction-subtle);
          --_checkbox-elevation-focus: var(--_global-shadow-interaction-moderate);
          --_checkbox-elevation-active: var(--_global-shadow-interaction-strong);
          
          /* Micro-interaction enhancements */
          --_checkbox-scale-rest: 1;
          --_checkbox-scale-hover: var(--_global-micro-scale-subtle);
          --_checkbox-scale-focus: var(--_global-micro-scale-noticeable);
          --_checkbox-scale-active: 0.98;
          --_checkbox-translate-hover: var(--_global-micro-translate-subtle);
          
          display: inline-flex;
          align-items: center;
          gap: var(--_global-spacing-sm);
          cursor: pointer;
          user-select: none;
          line-height: var(--_global-line-height-normal);
          position: relative;
          min-height: var(--_checkbox-state-layer-size);
          font-family: var(--_global-font-family-sans);
          contain: layout style;
          isolation: isolate;
        }

        :host([disabled]) {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }

        .checkbox-container {
          display: inline-flex;
          align-items: center;
          gap: var(--_global-spacing-sm);
          cursor: pointer;
          outline: none;
          position: relative;
          padding: calc((var(--_checkbox-state-layer-size) - var(--_checkbox-size)) / 2);
          margin: calc((var(--_checkbox-state-layer-size) - var(--_checkbox-size)) / -2);
          border-radius: 50%;
          overflow: visible;
          isolation: isolate;
          transform: var(--_checkbox-scale-rest);
          transition: var(--_checkbox-transition);
          will-change: transform, box-shadow;
        }
        
        /* Enhanced multi-layered state system for superior depth */
        .checkbox-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background-color: var(--_checkbox-state-layer-unchecked);
          opacity: 0;
          transform: scale(0.8);
          transition: var(--_checkbox-transition-emphasized);
          pointer-events: none;
          z-index: -1;
          box-shadow: var(--_checkbox-elevation-rest);
        }
        
        /* Advanced state layer for focus ring enhancement */
        .checkbox-container::after {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border-radius: 50%;
          background-color: var(--_checkbox-state-layer-unchecked);
          opacity: 0;
          transform: scale(0.6);
          transition: var(--_checkbox-transition-bounce);
          pointer-events: none;
          z-index: -2;
          border: 2px solid transparent;
        }
        
        /* Enhanced state layer color changes for checked state */
        .checkbox-container:has(.checked)::before,
        .checkbox-container:has(.indeterminate)::before {
          background-color: var(--_checkbox-state-layer-checked);
        }
        
        .checkbox-container:has(.checked)::after,
        .checkbox-container:has(.indeterminate)::after {
          background-color: var(--_checkbox-state-layer-checked);
        }
        
        /* Superior hover state with spring physics and micro-interactions */
        .checkbox-container:hover:not([aria-disabled="true"]) {
          transform: var(--_checkbox-scale-hover) var(--_checkbox-translate-hover);
          box-shadow: var(--_checkbox-elevation-hover);
        }
        
        .checkbox-container:hover:not([aria-disabled="true"])::before {
          opacity: var(--_checkbox-state-layer-hover);
          transform: scale(1.2);
          box-shadow: var(--_checkbox-elevation-hover);
        }
        
        .checkbox-container:hover:not([aria-disabled="true"])::after {
          opacity: calc(var(--_checkbox-state-layer-hover) * 0.6);
          transform: scale(1);
        }
        
        /* Enhanced active/pressed state with realistic physics */
        .checkbox-container:active:not([aria-disabled="true"]) {
          transform: scale(var(--_checkbox-scale-active));
          box-shadow: var(--_checkbox-elevation-active);
          transition: var(--_checkbox-transition-fast);
        }
        
        .checkbox-container:active:not([aria-disabled="true"])::before {
          opacity: var(--_checkbox-state-layer-pressed);
          transform: scale(1);
          transition: var(--_checkbox-transition-fast);
        }
        
        .checkbox-container:active:not([aria-disabled="true"])::after {
          opacity: calc(var(--_checkbox-state-layer-pressed) * 0.8);
          transform: scale(0.8);
          transition: var(--_checkbox-transition-fast);
        }

        /* Superior focus indicators with advanced visual feedback */
        .checkbox-container:focus {
          outline: var(--_checkbox-border-focus);
          outline-offset: 3px;
          transform: var(--_checkbox-scale-focus);
          box-shadow: var(--_checkbox-elevation-focus);
          transition: var(--_checkbox-transition-emphasized);
        }
        
        .checkbox-container:focus::before {
          opacity: var(--_checkbox-state-layer-focus);
          transform: scale(1.3);
          box-shadow: var(--_checkbox-elevation-focus);
        }
        
        .checkbox-container:focus::after {
          opacity: calc(var(--_checkbox-state-layer-focus) * 0.7);
          transform: scale(1.1);
          border-color: var(--_checkbox-color-checked);
        }
        
        /* Enhanced focus ring for superior keyboard navigation */
        .checkbox-container:focus:not(:active) {
          outline-width: var(--_checkbox-border-width-focus);
          animation: focus-pulse-advanced 2.5s var(--_global-spring-gentle) infinite;
        }
        
        .checkbox-container:focus:not(:active)::after {
          animation: focus-ring-pulse 2.5s var(--_global-spring-gentle) infinite;
        }
        
        /* Advanced focus animations with spring physics */
        @keyframes focus-pulse-advanced {
          0%, 100% { 
            outline-offset: 3px;
            transform: var(--_checkbox-scale-focus);
          }
          25% { 
            outline-offset: 5px;
            transform: scale(1.08);
          }
          50% { 
            outline-offset: 6px;
            transform: scale(1.1);
          }
          75% { 
            outline-offset: 5px;
            transform: scale(1.08);
          }
        }
        
        @keyframes focus-ring-pulse {
          0%, 100% { 
            transform: scale(1.1);
            opacity: calc(var(--_checkbox-state-layer-focus) * 0.7);
          }
          50% { 
            transform: scale(1.2);
            opacity: calc(var(--_checkbox-state-layer-focus) * 0.9);
          }
        }

        .checkbox-input {
          width: var(--_checkbox-size);
          height: var(--_checkbox-size);
          position: relative;
          border: var(--_checkbox-border-unchecked);
          border-radius: var(--_checkbox-border-radius);
          background-color: var(--_checkbox-background-unchecked);
          background-image: linear-gradient(135deg, var(--_checkbox-background-unchecked) 0%, var(--_global-color-surface-container-low) 100%);
          transition: var(--_checkbox-transition);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: var(--_global-elevation-1), inset 0 1px 2px rgba(255, 255, 255, 0.1);
          overflow: hidden;
          will-change: transform, background-color, border-color, box-shadow;
        }
        
        /* Enhanced checked state with superior visual feedback */
        .checkbox-input.checked {
          background-color: var(--_checkbox-background-checked);
          background-image: linear-gradient(135deg, var(--_checkbox-background-checked) 0%, var(--_checkbox-background-checked-hover) 100%);
          border: var(--_checkbox-border-checked);
          transform: scale(1.08);
          box-shadow: var(--_global-elevation-2), 0 0 0 1px var(--_checkbox-color-checked), inset 0 1px 3px rgba(255, 255, 255, 0.2);
          animation: checkbox-check-bounce var(--_global-motion-duration-medium1) var(--_global-spring-bouncy) forwards;
        }
        
        /* Enhanced indeterminate state with sophisticated styling */
        .checkbox-input.indeterminate {
          background-color: var(--_checkbox-background-checked);
          background-image: linear-gradient(135deg, var(--_checkbox-background-checked) 0%, var(--_checkbox-background-checked-hover) 100%);
          border: var(--_checkbox-border-checked);
          transform: scale(1.08);
          box-shadow: var(--_global-elevation-2), 0 0 0 1px var(--_checkbox-color-checked), inset 0 1px 3px rgba(255, 255, 255, 0.2);
          animation: checkbox-indeterminate-bounce var(--_global-motion-duration-medium1) var(--_global-spring-bouncy) forwards;
        }
        
        /* Superior hover enhancements for unchecked state */
        .checkbox-container:hover:not([aria-disabled="true"]) .checkbox-input:not(.checked):not(.indeterminate) {
          border: var(--_checkbox-border-hover);
          background-color: var(--_checkbox-background-unchecked-hover);
          background-image: linear-gradient(135deg, var(--_checkbox-background-unchecked-hover) 0%, var(--_global-color-surface-container) 100%);
          transform: scale(1.04);
          box-shadow: var(--_global-elevation-2), inset 0 1px 3px rgba(255, 255, 255, 0.15);
        }
        
        /* Enhanced hover effects for checked states */
        .checkbox-container:hover:not([aria-disabled="true"]) .checkbox-input.checked,
        .checkbox-container:hover:not([aria-disabled="true"]) .checkbox-input.indeterminate {
          background-color: var(--_checkbox-background-checked-hover);
          background-image: linear-gradient(135deg, var(--_checkbox-background-checked-hover) 0%, var(--_global-color-primary-70) 100%);
          transform: scale(1.1);
          box-shadow: var(--_global-elevation-3), 0 0 0 1px var(--_checkbox-color-checked-hover), inset 0 1px 4px rgba(255, 255, 255, 0.25);
        }
        
        /* Advanced check/indeterminate bounce animations */
        @keyframes checkbox-check-bounce {
          0% {
            transform: scale(1);
          }
          30% {
            transform: scale(0.9);
          }
          60% {
            transform: scale(1.15);
          }
          80% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1.08);
          }
        }
        
        @keyframes checkbox-indeterminate-bounce {
          0% {
            transform: scale(1);
          }
          40% {
            transform: scale(0.95);
          }
          70% {
            transform: scale(1.12);
          }
          100% {
            transform: scale(1.08);
          }
        }
        
        /* Superior checkmark with advanced spring animations */
        .checkbox-input::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(0) rotate(-45deg);
          width: 10px;
          height: 6px;
          border: 2.5px solid var(--_global-color-on-primary);
          border-top: none;
          border-right: none;
          border-radius: 0 0 1px 1px;
          transform-origin: center;
          transition: var(--_checkbox-transition-bounce);
          opacity: 0;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
          will-change: transform, opacity;
        }
        
        .checkbox-input.checked::after {
          transform: translate(-50%, -60%) scale(1) rotate(-45deg);
          opacity: 1;
          animation: checkmark-draw-advanced var(--_global-motion-duration-medium1) var(--_global-spring-energetic) forwards;
        }
        
        /* Enhanced indeterminate mark with sophisticated styling */
        .checkbox-input.indeterminate::after {
          width: 8px;
          height: 2.5px;
          border: none;
          background-color: var(--_global-color-on-primary);
          background-image: linear-gradient(90deg, var(--_global-color-on-primary) 0%, rgba(255, 255, 255, 0.3) 50%, var(--_global-color-on-primary) 100%);
          border-radius: 2px;
          transform: translate(-50%, -50%) scale(1) rotate(0deg);
          opacity: 1;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
          animation: indeterminate-draw-advanced var(--_global-motion-duration-medium1) var(--_global-spring-energetic) forwards;
        }
        
        /* Advanced checkmark drawing animation with spring physics */
        @keyframes checkmark-draw-advanced {
          0% {
            transform: translate(-50%, -60%) scale(0) rotate(-45deg);
            opacity: 0;
            filter: drop-shadow(0 0 0 rgba(0, 0, 0, 0));
          }
          20% {
            opacity: 1;
            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
          }
          40% {
            transform: translate(-50%, -60%) scale(0.7) rotate(-45deg);
          }
          60% {
            transform: translate(-50%, -60%) scale(1.2) rotate(-45deg);
          }
          80% {
            transform: translate(-50%, -60%) scale(0.95) rotate(-45deg);
          }
          90% {
            transform: translate(-50%, -60%) scale(1.05) rotate(-45deg);
          }
          100% {
            transform: translate(-50%, -60%) scale(1) rotate(-45deg);
            opacity: 1;
            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
          }
        }
        
        /* Advanced indeterminate drawing animation with spring physics */
        @keyframes indeterminate-draw-advanced {
          0% {
            transform: translate(-50%, -50%) scale(0, 0.8) rotate(0deg);
            opacity: 0;
            filter: drop-shadow(0 0 0 rgba(0, 0, 0, 0));
          }
          30% {
            opacity: 1;
            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1, 1.2) rotate(0deg);
          }
          70% {
            transform: translate(-50%, -50%) scale(0.95, 0.9) rotate(0deg);
          }
          85% {
            transform: translate(-50%, -50%) scale(1.02, 1.05) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) scale(1, 1) rotate(0deg);
            opacity: 1;
            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
          }
        }

        .label {
          color: var(--_checkbox-label-color);
          font-size: var(--_global-font-size-body-small);
          font-weight: var(--_global-font-weight-medium);
          line-height: var(--_global-line-height-normal);
          cursor: pointer;
          flex: 1;
          transition: var(--_checkbox-transition);
          letter-spacing: var(--_global-letter-spacing-normal);
          user-select: none;
          will-change: color, transform;
        }
        
        /* Enhanced label hover effects */
        .checkbox-container:hover:not([aria-disabled="true"]) .label {
          color: var(--_checkbox-label-color-hover);
          transform: var(--_checkbox-translate-hover);
        }
        
        /* Advanced ripple effect with superior physics */
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple-animation-advanced var(--_checkbox-ripple-duration) var(--_checkbox-ripple-easing);
          background-color: var(--_global-ripple-color-light);
          opacity: var(--_global-ripple-opacity-pressed);
          pointer-events: none;
          z-index: 1;
          mix-blend-mode: normal;
          filter: blur(0.5px);
          will-change: transform, opacity;
        }
        
        /* Dynamic ripple color with contextual awareness */
        .checkbox-container:has(.checked) .ripple,
        .checkbox-container:has(.indeterminate) .ripple {
          background-color: var(--_checkbox-state-layer-checked);
          filter: blur(0);
        }
        
        /* Enhanced ripple for error states */
        :host([error]) .checkbox-container .ripple {
          background-color: var(--_checkbox-state-layer-error);
          animation-name: ripple-animation-error;
        }

        /* Superior ripple animation with spring physics */
        @keyframes ripple-animation-advanced {
          0% {
            transform: scale(0);
            opacity: var(--_global-ripple-opacity-pressed);
            filter: blur(0);
          }
          15% {
            transform: scale(0.2);
            opacity: calc(var(--_global-ripple-opacity-pressed) * 0.9);
            filter: blur(0.5px);
          }
          30% {
            transform: scale(0.6);
            opacity: calc(var(--_global-ripple-opacity-pressed) * 0.7);
            filter: blur(1px);
          }
          50% {
            transform: scale(1.1);
            opacity: calc(var(--_global-ripple-opacity-pressed) * 0.5);
            filter: blur(1.5px);
          }
          70% {
            transform: scale(1.8);
            opacity: calc(var(--_global-ripple-opacity-pressed) * 0.25);
            filter: blur(2px);
          }
          85% {
            transform: scale(2.3);
            opacity: calc(var(--_global-ripple-opacity-pressed) * 0.1);
            filter: blur(2.5px);
          }
          100% {
            transform: scale(2.8);
            opacity: 0;
            filter: blur(3px);
          }
        }
        
        /* Enhanced error state ripple animation */
        @keyframes ripple-animation-error {
          0% {
            transform: scale(0);
            opacity: var(--_global-ripple-opacity-pressed);
            background-color: var(--_checkbox-state-layer-error);
          }
          25% {
            transform: scale(0.4);
            opacity: calc(var(--_global-ripple-opacity-pressed) * 0.8);
            background-color: var(--_checkbox-color-error-hover);
          }
          50% {
            transform: scale(1);
            opacity: calc(var(--_global-ripple-opacity-pressed) * 0.4);
          }
          75% {
            transform: scale(2);
            opacity: calc(var(--_global-ripple-opacity-pressed) * 0.15);
          }
          100% {
            transform: scale(2.8);
            opacity: 0;
          }
        }

        /* Size variants */
        :host([size="sm"]) {
          --_checkbox-size: 16px;
          --_checkbox-state-layer-size: 36px;
        }

        :host([size="lg"]) {
          --_checkbox-size: 24px;
          --_checkbox-state-layer-size: 48px;
        }

        /* Enhanced error state */
        :host([error]) {
          --_checkbox-color-unchecked: var(--_checkbox-color-error);
          --_checkbox-color-checked: var(--_checkbox-color-error);
          --_checkbox-background-checked: var(--_checkbox-background-error);
          --_checkbox-border-unchecked: var(--_checkbox-border-error);
          --_checkbox-border-checked: var(--_checkbox-border-error);
          --_checkbox-border-hover: var(--_checkbox-border-error);
          --_checkbox-state-layer-unchecked: var(--_checkbox-state-layer-error);
          --_checkbox-state-layer-checked: var(--_checkbox-state-layer-error);
          --_checkbox-label-color: var(--_checkbox-label-color-error);
        }

        :host([error]) .checkbox-container:focus {
          outline-color: var(--_checkbox-color-error);
        }

        /* Enhanced disabled state */
        :host([disabled]) {
          --_checkbox-color-unchecked: var(--_checkbox-color-disabled);
          --_checkbox-color-checked: var(--_checkbox-color-disabled);
          --_checkbox-background-unchecked: var(--_checkbox-background-disabled);
          --_checkbox-background-checked: var(--_checkbox-color-disabled);
          --_checkbox-border-unchecked: var(--_checkbox-border-disabled);
          --_checkbox-border-checked: var(--_checkbox-border-disabled);
          --_checkbox-label-color: var(--_checkbox-label-color-disabled);
        }
        
        :host([disabled]) .checkbox-container::before {
          display: none;
        }
        
        :host([disabled]) .checkbox-input {
          box-shadow: none;
          cursor: not-allowed;
        }
        
        :host([disabled]) .checkbox-input.checked,
        :host([disabled]) .checkbox-input.indeterminate {
          transform: none;
          box-shadow: none;
        }

        :host([disabled]) .label {
          cursor: not-allowed;
        }
        
        /* Enhanced High Contrast Mode Support */
        @media (prefers-contrast: high) {
          :host {
            --_checkbox-border-width: 3px;
          }
          
          .checkbox-input {
            border-width: var(--_checkbox-border-width);
            background-color: var(--_global-color-surface);
            box-shadow: none;
          }
          
          .checkbox-input.checked,
          .checkbox-input.indeterminate {
            background-color: var(--_global-color-primary);
            outline: 2px solid var(--_global-color-on-surface);
            outline-offset: 2px;
          }
          
          .checkbox-container::before,
          .ripple {
            display: none;
          }
          
          .label {
            font-weight: var(--_global-font-weight-bold);
          }
          
          .checkbox-container:focus {
            outline-width: 4px;
            outline-style: double;
          }
        }

        /* Enhanced Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          :host {
            --_checkbox-transition: none;
            --_checkbox-transition-fast: none;
            --_checkbox-transition-emphasized: none;
          }
          
          .checkbox-input,
          .checkbox-input::after,
          .checkbox-container::before,
          .ripple,
          .label {
            animation: none !important;
            transition: none !important;
          }
          
          .ripple,
          .checkbox-container:focus:not(:active) {
            display: none;
          }
          
          .checkbox-input.checked,
          .checkbox-input.indeterminate {
            transform: none;
          }
        }

        /* Superior focus-visible support with advanced accessibility */
        @supports selector(:focus-visible) {
          .checkbox-container:focus:not(:focus-visible) {
            outline: none;
            animation: none;
            transform: var(--_checkbox-scale-rest);
            box-shadow: var(--_checkbox-elevation-rest);
          }
          
          .checkbox-container:focus:not(:focus-visible)::before,
          .checkbox-container:focus:not(:focus-visible)::after {
            opacity: 0;
            transform: scale(0.8);
          }
          
          .checkbox-container:focus-visible {
            outline: var(--_checkbox-border-width-focus) solid var(--_checkbox-color-checked);
            outline-offset: 4px;
            transform: var(--_checkbox-scale-focus);
            box-shadow: var(--_checkbox-elevation-focus);
            animation: focus-pulse-advanced 2.5s var(--_global-spring-gentle) infinite;
          }
          
          .checkbox-container:focus-visible::before {
            opacity: var(--_checkbox-state-layer-focus);
            transform: scale(1.3);
            animation: focus-state-pulse 2.5s var(--_global-spring-gentle) infinite;
          }
          
          .checkbox-container:focus-visible::after {
            opacity: calc(var(--_checkbox-state-layer-focus) * 0.7);
            transform: scale(1.1);
            border-color: var(--_checkbox-color-checked);
            animation: focus-ring-pulse 2.5s var(--_global-spring-gentle) infinite;
          }
          
          /* Enhanced focus state animations */
          @keyframes focus-state-pulse {
            0%, 100% {
              transform: scale(1.3);
              opacity: var(--_checkbox-state-layer-focus);
            }
            50% {
              transform: scale(1.4);
              opacity: calc(var(--_checkbox-state-layer-focus) * 1.2);
            }
          }
        }
        
        /* Enhanced dark theme adaptation with sophisticated styling */
        @media (prefers-color-scheme: dark) {
          :host {
            --_checkbox-color-unchecked: var(--_global-color-scheme-dark-outline);
            --_checkbox-color-unchecked-hover: var(--_global-color-scheme-dark-primary);
            --_checkbox-color-checked: var(--_global-color-scheme-dark-primary);
            --_checkbox-color-checked-hover: #E0B3FF;
            --_checkbox-background-unchecked: var(--_global-color-scheme-dark-surface);
            --_checkbox-background-unchecked-hover: var(--_global-color-scheme-dark-surface-variant);
            --_checkbox-background-checked: var(--_global-color-scheme-dark-primary);
            --_checkbox-label-color: var(--_global-color-scheme-dark-on-surface);
            --_checkbox-label-color-hover: var(--_global-color-scheme-dark-primary);
          }
          
          .checkbox-input {
            box-shadow: var(--_global-elevation-1), inset 0 1px 2px rgba(255, 255, 255, 0.05);
            background-image: linear-gradient(135deg, var(--_checkbox-background-unchecked) 0%, rgba(255, 255, 255, 0.02) 100%);
          }
          
          .checkbox-input.checked,
          .checkbox-input.indeterminate {
            box-shadow: var(--_global-elevation-2), 0 0 0 1px var(--_checkbox-color-checked), inset 0 1px 3px rgba(255, 255, 255, 0.1);
            background-image: linear-gradient(135deg, var(--_checkbox-background-checked) 0%, var(--_checkbox-background-checked-hover) 100%);
          }
          
          .checkbox-container:hover:not([aria-disabled="true"]) .checkbox-input:not(.checked):not(.indeterminate) {
            box-shadow: var(--_global-elevation-2), inset 0 1px 3px rgba(255, 255, 255, 0.08);
            background-image: linear-gradient(135deg, var(--_checkbox-background-unchecked-hover) 0%, rgba(255, 255, 255, 0.05) 100%);
          }
          
          .checkbox-container:hover:not([aria-disabled="true"]) .checkbox-input.checked,
          .checkbox-container:hover:not([aria-disabled="true"]) .checkbox-input.indeterminate {
            box-shadow: var(--_global-elevation-3), 0 0 0 1px var(--_checkbox-color-checked-hover), inset 0 1px 4px rgba(255, 255, 255, 0.15);
          }
          
          .ripple {
            background-color: rgba(208, 188, 255, 0.2);
            filter: blur(0.3px);
          }
        }
      </style>

      <div 
        class="checkbox-container"
        role="checkbox"
        aria-checked="${this.indeterminate?"mixed":this.checked}"
        aria-label="${this.label||"checkbox"}"
        ${this.disabled?'aria-disabled="true"':""}
        tabindex="${this.disabled?"-1":"0"}"
      >
        <div class="checkbox-input ${this.checked?"checked":""} ${this.indeterminate?"indeterminate":""}"></div>
        
        ${this.label?`<span class="label">${this.label}</span>`:"<slot></slot>"}
      </div>
    `}}l.define("my-checkbox");
