import{M as i}from"./base-component-q4KNMHwB.js";class n extends i{constructor(){super(),this.handleClick=this.handleClick.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.select=this.select.bind(this),this.log("Radio component initializing...")}static get observedAttributes(){return[...super.observedAttributes,"checked","label","name","value"]}handleAttributeChange(r,e,a){switch(super.handleAttributeChange(r,e,a),r){case"checked":this.announceToScreenReader(`Radio ${this.checked?"selected":"unselected"}`,"polite");break;case"disabled":this.announceToScreenReader(`Radio ${this.disabled?"disabled":"enabled"}`,"polite");break}}get checked(){return this.hasAttribute("checked")}set checked(r){this.toggleAttribute("checked",!!r)}get label(){return this.getAttribute("label")||""}set label(r){this.setAttribute("label",r)}get name(){return this.getAttribute("name")||""}set name(r){this.setAttribute("name",r)}get value(){return this.getAttribute("value")||""}set value(r){this.setAttribute("value",r)}handleClick(r){if(this.disabled||this.loading){r.preventDefault();return}const e=this.shadowRoot.querySelector(".radio-container");this.createRipple(r,e),this.select()}handleKeyDown(r){if(super.handleKeyDown(r),!(this.disabled||this.loading)&&r.key===" "){r.preventDefault();const e=this.shadowRoot.querySelector(".radio-container");this.createRipple(null,e),this.select()}}select(){this.checked||(this.checked=!0,this.emit("change",{checked:!0,value:this.value,name:this.name}))}focus(){const r=this.shadowRoot.querySelector(".radio-container");r&&r.focus()}attachEventListeners(){this.removeEventListeners();const r=this.shadowRoot.querySelector(".radio-container");r&&this.addEventListeners([{element:r,events:["click","keydown"],handler:e=>{e.type==="click"?this.handleClick(e):e.type==="keydown"&&this.handleKeyDown(e)}}])}onConnected(){this.log("Radio connected to DOM")}onDisconnected(){this.log("Radio disconnected from DOM")}render(){this.shadowRoot.innerHTML=`
      <style>
        :host {
          /* Advanced Material Design 3 variables with sophisticated design tokens */
          --_radio-size: 20px;
          --_radio-dot-size: 10px;
          --_radio-state-layer-size: 40px;
          --_radio-border-width: 2px;
          --_radio-focus-ring-width: 3px;
          --_radio-focus-ring-offset: 2px;
          
          /* Physics-based spring animation parameters */
          --_radio-spring-tension: 280;
          --_radio-spring-friction: 18;
          --_radio-spring-mass: 0.8;
          --_radio-bounce-scale: 1.15;
          --_radio-settle-scale: 1.0;
          
          /* Advanced Color Design Tokens */
          --_radio-color-unchecked: var(--_global-color-outline);
          --_radio-color-checked: var(--_global-color-primary);
          --_radio-color-disabled: var(--_global-color-outline-variant);
          --_radio-color-error: var(--_global-color-error);
          --_radio-color-hover: var(--_global-color-on-surface);
          
          /* Sophisticated gradient definitions */
          --_radio-gradient-checked: linear-gradient(135deg, 
            var(--_global-color-primary) 0%, 
            color-mix(in srgb, var(--_global-color-primary) 90%, var(--_global-color-secondary)) 100%);
          --_radio-gradient-hover: linear-gradient(135deg, 
            var(--_global-color-surface-variant) 0%, 
            color-mix(in srgb, var(--_global-color-surface-variant) 95%, var(--_global-color-outline)) 100%);
          
          /* Premium shadow definitions with layered depth */
          --_radio-shadow-rest: 
            0 0.5px 1px rgba(0, 0, 0, 0.05),
            0 1px 2px rgba(0, 0, 0, 0.08);
          --_radio-shadow-hover: 
            0 1px 3px rgba(0, 0, 0, 0.08),
            0 2px 6px rgba(0, 0, 0, 0.12),
            0 4px 12px rgba(0, 0, 0, 0.04);
          --_radio-shadow-checked: 
            0 2px 4px rgba(0, 0, 0, 0.1),
            0 4px 8px color-mix(in srgb, var(--_global-color-primary) 20%, transparent),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          --_radio-shadow-focus: 
            0 0 0 var(--_radio-focus-ring-width) color-mix(in srgb, var(--_global-color-primary) 25%, transparent),
            0 2px 8px rgba(0, 0, 0, 0.15);
          
          /* Advanced motion system with physics-based transitions */
          --_radio-transition-spring: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          --_radio-transition-bounce: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          --_radio-transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          --_radio-transition-fast: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          --_radio-transition-emphasized: all 0.25s cubic-bezier(0.2, 0, 0, 1);
          
          /* Multi-layered focus ring system */
          --_radio-focus-ring-primary: 0 0 0 var(--_radio-focus-ring-width) color-mix(in srgb, var(--_global-color-primary) 30%, transparent);
          --_radio-focus-ring-secondary: 0 0 0 calc(var(--_radio-focus-ring-width) + 2px) color-mix(in srgb, var(--_global-color-primary) 15%, transparent);
          --_radio-focus-ring-tertiary: 0 0 0 calc(var(--_radio-focus-ring-width) + 4px) color-mix(in srgb, var(--_global-color-primary) 8%, transparent);
          
          /* Enhanced state layer colors with opacity variations */
          --_radio-state-layer-unchecked: color-mix(in srgb, var(--_radio-color-checked) 12%, transparent);
          --_radio-state-layer-checked: color-mix(in srgb, var(--_radio-color-checked) 16%, transparent);
          --_radio-state-layer-hover: color-mix(in srgb, var(--_radio-color-hover) 8%, transparent);
          --_radio-state-layer-pressed: color-mix(in srgb, var(--_radio-color-checked) 20%, transparent);
          --_radio-state-layer-error: color-mix(in srgb, var(--_radio-color-error) 12%, transparent);
          
          /* Advanced ripple system */
          --_radio-ripple-size: calc(var(--_radio-state-layer-size) * 1.5);
          --_radio-ripple-duration: 0.6s;
          --_radio-ripple-easing: cubic-bezier(0.4, 0, 0.2, 1);
          --_radio-ripple-color: color-mix(in srgb, var(--_global-color-primary) 20%, transparent);
          
          /* Typography enhancements */
          --_radio-label-color: var(--_global-color-on-surface);
          --_radio-label-color-disabled: var(--_global-color-outline);
          --_radio-label-color-error: var(--_global-color-error);
          --_radio-label-weight: 400;
          --_radio-label-weight-checked: 500;
          
          display: inline-flex;
          align-items: center;
          gap: var(--_global-spacing-sm);
          cursor: pointer;
          user-select: none;
          line-height: var(--_global-line-height-normal);
          position: relative;
          min-height: var(--_radio-state-layer-size);
          font-family: var(--_global-font-family-sans);
          isolation: isolate;
        }

        :host([disabled]) {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
          filter: grayscale(0.3);
        }

        /* Advanced radio container with sophisticated interaction zones */
        .radio-container {
          display: inline-flex;
          align-items: center;
          gap: var(--_global-spacing-sm);
          cursor: pointer;
          outline: none;
          position: relative;
          padding: calc((var(--_radio-state-layer-size) - var(--_radio-size)) / 2);
          margin: calc((var(--_radio-state-layer-size) - var(--_radio-size)) / -2);
          border-radius: 50%;
          overflow: visible;
          isolation: isolate;
          transition: var(--_radio-transition-fast);
        }

        /* Sophisticated multi-layered state system */
        .radio-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background: radial-gradient(circle, var(--_radio-state-layer-unchecked) 0%, transparent 70%);
          opacity: 0;
          transition: var(--_radio-transition-smooth);
          pointer-events: none;
          z-index: -1;
          transform: scale(0.8);
          will-change: transform, opacity;
        }
        
        /* Secondary state layer for premium depth */
        .radio-container::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border-radius: 50%;
          background: var(--_radio-state-layer-hover);
          opacity: 0;
          transition: var(--_radio-transition-spring);
          pointer-events: none;
          z-index: -2;
          transform: scale(0.7);
          will-change: transform, opacity;
        }
        
        /* Enhanced hover state with layered micro-interactions */
        .radio-container:hover:not([aria-disabled="true"])::before {
          opacity: 0.08;
          transform: scale(1.2);
          background: radial-gradient(circle, var(--_radio-state-layer-hover) 0%, transparent 70%);
          transition: var(--_radio-transition-bounce);
        }
        
        .radio-container:hover:not([aria-disabled="true"])::after {
          opacity: 0.04;
          transform: scale(1.1);
          transition: var(--_radio-transition-spring);
        }
        
        /* State layer adaptation for checked state */
        .radio-container:has(.checked)::before {
          background: radial-gradient(circle, var(--_radio-state-layer-checked) 0%, transparent 70%);
        }
        
        /* Active/pressed state with sophisticated feedback */
        .radio-container:active:not([aria-disabled="true"])::before {
          opacity: 0.16;
          transform: scale(0.95);
          transition: var(--_radio-transition-fast);
          background: radial-gradient(circle, var(--_radio-state-layer-pressed) 0%, transparent 60%);
        }
        
        .radio-container:active:not([aria-disabled="true"])::after {
          opacity: 0.08;
          transform: scale(0.85);
          transition: var(--_radio-transition-fast);
        }

        /* Sophisticated multi-layered focus system */
        .radio-container:focus {
          outline: none;
          box-shadow: var(--_radio-focus-ring-primary);
          transition: box-shadow var(--_radio-transition-smooth);
        }
        
        .radio-container:focus::before {
          opacity: 0.12;
          transform: scale(1.15);
          background: radial-gradient(circle, var(--_radio-state-layer-checked) 0%, transparent 60%);
          transition: var(--_radio-transition-spring);
        }
        
        .radio-container:focus::after {
          opacity: 0.06;
          transform: scale(1.25);
          transition: var(--_radio-transition-bounce);
        }
        
        /* Enhanced keyboard navigation with premium focus rings */
        .radio-container:focus:not(:active) {
          box-shadow: 
            var(--_radio-focus-ring-primary),
            var(--_radio-focus-ring-secondary),
            var(--_radio-focus-ring-tertiary);
          animation: sophisticated-focus-pulse 3s ease-in-out infinite;
        }
        
        /* Sophisticated focus pulse animation with multiple layers */
        @keyframes sophisticated-focus-pulse {
          0%, 100% { 
            box-shadow: 
              var(--_radio-focus-ring-primary),
              var(--_radio-focus-ring-secondary),
              var(--_radio-focus-ring-tertiary);
          }
          33% { 
            box-shadow: 
              0 0 0 calc(var(--_radio-focus-ring-width) + 1px) color-mix(in srgb, var(--_global-color-primary) 35%, transparent),
              0 0 0 calc(var(--_radio-focus-ring-width) + 3px) color-mix(in srgb, var(--_global-color-primary) 18%, transparent),
              0 0 0 calc(var(--_radio-focus-ring-width) + 5px) color-mix(in srgb, var(--_global-color-primary) 10%, transparent);
          }
          66% { 
            box-shadow: 
              0 0 0 calc(var(--_radio-focus-ring-width) - 1px) color-mix(in srgb, var(--_global-color-primary) 25%, transparent),
              0 0 0 calc(var(--_radio-focus-ring-width) + 1px) color-mix(in srgb, var(--_global-color-primary) 12%, transparent),
              0 0 0 calc(var(--_radio-focus-ring-width) + 3px) color-mix(in srgb, var(--_global-color-primary) 6%, transparent);
          }
        }

        /* Premium radio input with sophisticated styling */
        .radio-input {
          width: var(--_radio-size);
          height: var(--_radio-size);
          position: relative;
          border: var(--_radio-border-width) solid var(--_radio-color-unchecked);
          border-radius: 50%;
          background: var(--_radio-gradient-hover);
          transition: var(--_radio-transition-smooth);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: var(--_radio-shadow-rest);
          overflow: hidden;
          isolation: isolate;
          will-change: transform, box-shadow, background;
        }
        
        /* Sophisticated gradient overlay for premium depth */
        .radio-input::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 50%;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.15) 0%, 
            transparent 50%, 
            rgba(0, 0, 0, 0.05) 100%);
          opacity: 0.8;
          pointer-events: none;
          transition: var(--_radio-transition-smooth);
        }
        
        /* Enhanced checked state with physics-based animation */
        .radio-input.checked {
          border-color: var(--_radio-color-checked);
          background: var(--_radio-gradient-checked);
          transform: scale(var(--_radio-bounce-scale));
          box-shadow: var(--_radio-shadow-checked);
          animation: radio-check-bounce 0.5s var(--_radio-transition-bounce) forwards;
        }
        
        .radio-input.checked::before {
          opacity: 1;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.25) 0%, 
            transparent 40%, 
            rgba(0, 0, 0, 0.1) 100%);
        }
        
        /* Sophisticated radio check animation with spring physics */
        @keyframes radio-check-bounce {
          0% {
            transform: scale(1);
          }
          30% {
            transform: scale(var(--_radio-bounce-scale)) rotate(2deg);
          }
          60% {
            transform: scale(0.95) rotate(-1deg);
          }
          80% {
            transform: scale(1.02) rotate(0.5deg);
          }
          100% {
            transform: scale(var(--_radio-settle-scale)) rotate(0deg);
          }
        }
        
        /* Premium inner dot with sophisticated animation */
        .radio-input::after {
          content: '';
          position: absolute;
          width: var(--_radio-dot-size);
          height: var(--_radio-dot-size);
          border-radius: 50%;
          background: radial-gradient(circle, 
            var(--_radio-color-checked) 0%, 
            color-mix(in srgb, var(--_radio-color-checked) 90%, white) 100%);
          transform: scale(0) rotate(45deg);
          transition: var(--_radio-transition-spring);
          opacity: 0;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          will-change: transform, opacity;
        }
        
        .radio-input.checked::after {
          transform: scale(1) rotate(0deg);
          opacity: 1;
          animation: sophisticated-dot-appear 0.6s var(--_radio-transition-bounce) forwards;
        }
        
        /* Sophisticated dot appearance with realistic physics */
        @keyframes sophisticated-dot-appear {
          0% {
            transform: scale(0) rotate(45deg);
            opacity: 0;
            box-shadow: 0 0 0 rgba(0, 0, 0, 0);
          }
          30% {
            transform: scale(1.4) rotate(15deg);
            opacity: 0.8;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
          }
          60% {
            transform: scale(0.9) rotate(-5deg);
            opacity: 1;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
          }
          80% {
            transform: scale(1.1) rotate(2deg);
            opacity: 1;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          }
        }
        
        /* Enhanced hover state with premium micro-interactions */
        .radio-container:hover:not([aria-disabled="true"]) .radio-input:not(.checked) {
          border-color: var(--_radio-color-hover);
          background: var(--_radio-gradient-hover);
          transform: scale(1.02);
          box-shadow: var(--_radio-shadow-hover);
          transition: var(--_radio-transition-spring);
        }
        
        .radio-container:hover:not([aria-disabled="true"]) .radio-input:not(.checked)::before {
          opacity: 1;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.2) 0%, 
            transparent 45%, 
            rgba(0, 0, 0, 0.08) 100%);
        }
        
        /* Enhanced hover state for checked radio */
        .radio-container:hover:not([aria-disabled="true"]) .radio-input.checked {
          transform: scale(1.03);
          box-shadow: 
            var(--_radio-shadow-checked),
            0 4px 12px color-mix(in srgb, var(--_global-color-primary) 25%, transparent);
          transition: var(--_radio-transition-spring);
        }

        /* Premium label styling with sophisticated typography */
        .label {
          color: var(--_radio-label-color);
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_radio-label-weight);
          line-height: var(--_global-line-height-normal);
          cursor: pointer;
          flex: 1;
          transition: var(--_radio-transition-smooth);
          will-change: font-weight, color;
        }
        
        /* Enhanced label state for checked radio */
        .radio-container:has(.checked) .label {
          font-weight: var(--_radio-label-weight-checked);
          color: color-mix(in srgb, var(--_radio-label-color) 95%, var(--_global-color-primary));
        }
        
        /* Label hover enhancement */
        .radio-container:hover:not([aria-disabled="true"]) .label {
          color: color-mix(in srgb, var(--_radio-label-color) 90%, var(--_global-color-primary));
          transition: var(--_radio-transition-fast);
        }

        /* Advanced ripple system with sophisticated physics */
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0) rotate(0deg);
          animation: sophisticated-ripple var(--_radio-ripple-duration) var(--_radio-ripple-easing);
          background: radial-gradient(circle, 
            var(--_radio-ripple-color) 0%, 
            color-mix(in srgb, var(--_radio-ripple-color) 80%, transparent) 60%,
            transparent 100%);
          opacity: 0.8;
          pointer-events: none;
          z-index: 1;
          mix-blend-mode: multiply;
          will-change: transform, opacity;
        }
        
        /* Dynamic ripple adaptation based on radio state */
        .radio-container:has(.checked) .ripple {
          background: radial-gradient(circle, 
            color-mix(in srgb, var(--_global-color-primary) 25%, transparent) 0%, 
            color-mix(in srgb, var(--_global-color-primary) 15%, transparent) 50%,
            transparent 100%);
          mix-blend-mode: normal;
        }

        /* Sophisticated ripple animation with realistic physics */
        @keyframes sophisticated-ripple {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0.8;
          }
          15% {
            transform: scale(0.4) rotate(5deg);
            opacity: 0.7;
          }
          35% {
            transform: scale(1.2) rotate(-2deg);
            opacity: 0.5;
          }
          60% {
            transform: scale(2) rotate(1deg);
            opacity: 0.3;
          }
          85% {
            transform: scale(2.8) rotate(-0.5deg);
            opacity: 0.1;
          }
          100% {
            transform: scale(3.2) rotate(0deg);
            opacity: 0;
          }
        }

        /* Sophisticated size variants with proportional scaling */
        :host([size="sm"]) {
          --_radio-size: 16px;
          --_radio-dot-size: 8px;
          --_radio-state-layer-size: 36px;
          --_radio-focus-ring-width: 2px;
          --_radio-bounce-scale: 1.12;
          --_radio-ripple-size: calc(var(--_radio-state-layer-size) * 1.4);
        }

        :host([size="lg"]) {
          --_radio-size: 24px;
          --_radio-dot-size: 12px;
          --_radio-state-layer-size: 48px;
          --_radio-focus-ring-width: 4px;
          --_radio-bounce-scale: 1.18;
          --_radio-ripple-size: calc(var(--_radio-state-layer-size) * 1.6);
        }

        /* Sophisticated error state with enhanced visual feedback */
        :host([error]) {
          --_radio-color-unchecked: var(--_radio-color-error);
          --_radio-color-checked: var(--_radio-color-error);
          --_radio-color-hover: var(--_radio-color-error);
          --_radio-gradient-checked: linear-gradient(135deg, 
            var(--_global-color-error) 0%, 
            color-mix(in srgb, var(--_global-color-error) 90%, var(--_global-color-on-error)) 100%);
          --_radio-gradient-hover: linear-gradient(135deg, 
            color-mix(in srgb, var(--_global-color-error) 8%, var(--_global-color-surface)) 0%, 
            color-mix(in srgb, var(--_global-color-error) 12%, var(--_global-color-surface)) 100%);
          --_radio-state-layer-unchecked: color-mix(in srgb, var(--_radio-color-error) 12%, transparent);
          --_radio-state-layer-checked: color-mix(in srgb, var(--_radio-color-error) 16%, transparent);
          --_radio-state-layer-hover: color-mix(in srgb, var(--_radio-color-error) 8%, transparent);
          --_radio-label-color: var(--_radio-label-color-error);
          --_radio-ripple-color: color-mix(in srgb, var(--_global-color-error) 20%, transparent);
          --_radio-focus-ring-primary: 0 0 0 var(--_radio-focus-ring-width) color-mix(in srgb, var(--_global-color-error) 30%, transparent);
          --_radio-focus-ring-secondary: 0 0 0 calc(var(--_radio-focus-ring-width) + 2px) color-mix(in srgb, var(--_global-color-error) 15%, transparent);
          --_radio-focus-ring-tertiary: 0 0 0 calc(var(--_radio-focus-ring-width) + 4px) color-mix(in srgb, var(--_global-color-error) 8%, transparent);
        }

        :host([error]) .radio-container:focus {
          box-shadow: var(--_radio-focus-ring-primary);
        }
        
        :host([error]) .radio-container:focus:not(:active) {
          box-shadow: 
            var(--_radio-focus-ring-primary),
            var(--_radio-focus-ring-secondary),
            var(--_radio-focus-ring-tertiary);
        }
        
        /* Error state animation enhancement */
        :host([error]) .radio-input.checked {
          animation: radio-error-bounce 0.5s var(--_radio-transition-bounce) forwards;
        }
        
        @keyframes radio-error-bounce {
          0% {
            transform: scale(1);
          }
          25% {
            transform: scale(var(--_radio-bounce-scale)) rotate(-2deg);
          }
          50% {
            transform: scale(0.95) rotate(2deg);
          }
          75% {
            transform: scale(1.02) rotate(-1deg);
          }
          100% {
            transform: scale(var(--_radio-settle-scale)) rotate(0deg);
          }
        }

        /* Sophisticated disabled state with premium styling */
        :host([disabled]) {
          --_radio-color-unchecked: var(--_radio-color-disabled);
          --_radio-color-checked: var(--_radio-color-disabled);
          --_radio-color-hover: var(--_radio-color-disabled);
          --_radio-gradient-checked: linear-gradient(135deg, 
            var(--_global-color-outline-variant) 0%, 
            color-mix(in srgb, var(--_global-color-outline-variant) 95%, var(--_global-color-surface)) 100%);
          --_radio-gradient-hover: var(--_global-color-surface-variant);
          --_radio-label-color: var(--_radio-label-color-disabled);
          --_radio-label-weight: 400;
          --_radio-shadow-rest: 0 0.5px 1px rgba(0, 0, 0, 0.02);
        }
        
        :host([disabled]) .radio-container::before,
        :host([disabled]) .radio-container::after {
          display: none;
        }

        :host([disabled]) .radio-input {
          background: var(--_radio-gradient-hover);
          box-shadow: var(--_radio-shadow-rest);
          cursor: not-allowed;
          border-color: var(--_radio-color-disabled);
        }
        
        :host([disabled]) .radio-input::before {
          opacity: 0.3;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            transparent 50%, 
            rgba(0, 0, 0, 0.02) 100%);
        }
        
        :host([disabled]) .radio-input.checked {
          transform: scale(1);
          box-shadow: var(--_radio-shadow-rest);
          animation: none;
          background: var(--_radio-gradient-checked);
        }
        
        :host([disabled]) .radio-input.checked::after {
          animation: none;
          background: var(--_radio-color-disabled);
          box-shadow: none;
          opacity: 0.7;
        }

        :host([disabled]) .label {
          cursor: not-allowed;
          opacity: 0.8;
        }
        
        :host([disabled]) .ripple {
          display: none;
        }
        
        /* Advanced High Contrast Mode Support */
        @media (prefers-contrast: high) {
          :host {
            --_radio-border-width: 3px;
            --_radio-focus-ring-width: 4px;
          }
          
          .radio-input {
            border-width: var(--_radio-border-width);
            background: var(--_global-color-surface);
            box-shadow: 
              inset 0 0 0 1px var(--_global-color-outline),
              0 1px 2px rgba(0, 0, 0, 0.1);
          }
          
          .radio-input::before {
            display: none;
          }
          
          .radio-input.checked {
            background: var(--_global-color-primary);
            border-color: var(--_global-color-primary);
            outline: 3px solid var(--_global-color-on-surface);
            outline-offset: 2px;
            box-shadow: 
              inset 0 0 0 1px var(--_global-color-on-primary),
              0 2px 4px rgba(0, 0, 0, 0.2);
          }
          
          .radio-input.checked::after {
            background: var(--_global-color-on-primary);
            box-shadow: 0 0 0 1px var(--_global-color-primary);
            transform: scale(1);
            animation: none;
          }
          
          .radio-container::before,
          .radio-container::after,
          .ripple {
            display: none;
          }
          
          .label {
            font-weight: var(--_global-font-weight-bold);
            text-shadow: 0 0 0 currentColor;
          }
          
          .radio-container:focus {
            outline: 4px double var(--_global-color-primary);
            outline-offset: 3px;
            box-shadow: none;
            animation: none;
          }
        }

        /* Advanced Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          :host {
            --_radio-transition-spring: none;
            --_radio-transition-bounce: none;
            --_radio-transition-smooth: none;
            --_radio-transition-fast: none;
            --_radio-transition-emphasized: none;
            --_radio-bounce-scale: 1;
            --_radio-settle-scale: 1;
          }
          
          .radio-input,
          .radio-input::before,
          .radio-input::after,
          .radio-container::before,
          .radio-container::after,
          .ripple,
          .label {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
          
          .radio-input.checked {
            transform: scale(1) !important;
          }
          
          .radio-input.checked::after {
            transform: scale(1) rotate(0deg) !important;
            opacity: 1;
          }
          
          .ripple,
          .radio-container:focus:not(:active) {
            display: none;
          }
          
          .radio-container:hover:not([aria-disabled="true"]) .radio-input,
          .radio-container:hover:not([aria-disabled="true"]) .radio-input.checked {
            transform: scale(1) !important;
          }
          
          .radio-container::before,
          .radio-container::after {
            transform: scale(1) !important;
          }
          
          /* Maintain visual feedback without motion */
          .radio-container:hover:not([aria-disabled="true"])::before {
            opacity: 0.08;
          }
          
          .radio-container:focus::before {
            opacity: 0.12;
          }
          
          .radio-container:active:not([aria-disabled="true"])::before {
            opacity: 0.16;
          }
        }

        /* Advanced focus-visible support with sophisticated keyboard navigation */
        @supports selector(:focus-visible) {
          .radio-container:focus:not(:focus-visible) {
            outline: none;
            box-shadow: none;
            animation: none;
          }
          
          .radio-container:focus:not(:focus-visible)::before,
          .radio-container:focus:not(:focus-visible)::after {
            opacity: 0;
            transform: scale(0.8);
          }
          
          .radio-container:focus-visible {
            box-shadow: 
              var(--_radio-focus-ring-primary),
              var(--_radio-focus-ring-secondary),
              var(--_radio-focus-ring-tertiary);
            animation: sophisticated-focus-pulse 3s ease-in-out infinite;
          }
          
          .radio-container:focus-visible::before {
            opacity: 0.12;
            transform: scale(1.15);
          }
          
          .radio-container:focus-visible::after {
            opacity: 0.06;
            transform: scale(1.25);
          }
        }
        
        /* Sophisticated color scheme adaptation */
        @media (prefers-color-scheme: dark) {
          :host {
            --_radio-shadow-rest: 
              0 0.5px 1px rgba(0, 0, 0, 0.2),
              0 1px 2px rgba(0, 0, 0, 0.3);
            --_radio-shadow-hover: 
              0 1px 3px rgba(0, 0, 0, 0.3),
              0 2px 6px rgba(0, 0, 0, 0.4),
              0 4px 12px rgba(0, 0, 0, 0.2);
            --_radio-shadow-checked: 
              0 2px 4px rgba(0, 0, 0, 0.4),
              0 4px 8px color-mix(in srgb, var(--_global-color-primary) 30%, transparent),
              inset 0 1px 0 rgba(255, 255, 255, 0.05);
          }
          
          .radio-input::before {
            background: linear-gradient(135deg, 
              rgba(255, 255, 255, 0.08) 0%, 
              transparent 50%, 
              rgba(0, 0, 0, 0.1) 100%);
          }
          
          .radio-input.checked::before {
            background: linear-gradient(135deg, 
              rgba(255, 255, 255, 0.15) 0%, 
              transparent 40%, 
              rgba(0, 0, 0, 0.15) 100%);
          }
        }
      </style>

      <div 
        class="radio-container"
        role="radio"
        aria-checked="${this.checked}"
        aria-label="${this.label||"radio button"}"
        ${this.disabled?'aria-disabled="true"':""}
        tabindex="${this.getAttribute("tabindex")||"0"}"
      >
        <div class="radio-input ${this.checked?"checked":""}"></div>
        
        ${this.label?`<span class="label">${this.label}</span>`:"<slot></slot>"}
      </div>
    `}}n.define("my-radio");class s extends i{constructor(){super(),this._value="",this._radios=[],this.handleRadioChange=this.handleRadioChange.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleSlotChange=this.handleSlotChange.bind(this),this.log("RadioGroup component initializing..."),this.parseAttributes()}static get observedAttributes(){return[...super.observedAttributes,"name","value","label","required","layout","error","aria-label","aria-labelledby","aria-describedby"]}handleAttributeChange(r,e,a){switch(super.handleAttributeChange(r,e,a),r){case"value":this._value=a||"",this.updateRadioSelection(),this.announceToScreenReader(`Selected option: ${this._getSelectedRadioLabel()||"none"}`,"polite");break;case"disabled":this.updateRadioDisabledState(),this.announceToScreenReader(`Radio group ${this.disabled?"disabled":"enabled"}`,"polite");break;case"required":this.announceToScreenReader(`Radio group is ${a!==null?"required":"optional"}`,"polite");break}}parseAttributes(){this._value=this.getAttribute("value")||""}_getSelectedRadioLabel(){const r=this._radios.find(e=>e.checked);return r?r.label:null}handleRadioChange(r){r.target.tagName.toLowerCase()==="my-radio"&&(this._value=r.target.value,this.setAttribute("value",this._value),this.updateRadioSelection(),this.emitEvent("change",{value:this._value,name:this.name}),this.logInteraction("radio-selected",{value:this._value}))}handleKeyDown(r){if(!this._radios.length)return;const e=this._radios.findIndex(o=>o===this.shadowRoot.activeElement||o.matches(":focus"));let a=-1;switch(r.key){case"ArrowDown":case"ArrowRight":r.preventDefault(),a=(e+1)%this._radios.length;break;case"ArrowUp":case"ArrowLeft":r.preventDefault(),a=e<=0?this._radios.length-1:e-1;break;case"Home":r.preventDefault(),a=0;break;case"End":r.preventDefault(),a=this._radios.length-1;break;default:return}a>=0&&this._radios[a]&&(this._radios[a].focus(),this._radios[a].checked=!0,this._value=this._radios[a].value,this.setAttribute("value",this._value),this.updateRadioSelection(),this.emitEvent("change",{value:this._value,name:this.name}))}handleSlotChange(){this._updateRadioList(),this.updateRadioSelection()}_updateRadioList(){const r=this.shadowRoot.querySelector("slot");if(!r)return;const e=r.assignedElements();this._radios=e.filter(a=>a.tagName.toLowerCase()==="my-radio"),this._radios.forEach((a,o)=>{this.name&&a.setAttribute("name",this.name),this.disabled?a.setAttribute("disabled",""):a.removeAttribute("disabled"),a.setAttribute("role","radio"),a.setAttribute("aria-setsize",this._radios.length),a.setAttribute("aria-posinset",o+1),a.removeEventListener("change",this.handleRadioChange),a.addEventListener("change",this.handleRadioChange)})}updateRadioSelection(){this._radios.forEach(r=>{r.value===this._value?(r.checked=!0,r.setAttribute("aria-checked","true"),r.setAttribute("tabindex","0")):(r.checked=!1,r.setAttribute("aria-checked","false"),r.setAttribute("tabindex","-1"))})}updateRadioDisabledState(){this._radios.forEach(r=>{this.disabled?(r.setAttribute("disabled",""),r.setAttribute("aria-disabled","true")):(r.removeAttribute("disabled"),r.setAttribute("aria-disabled","false"))})}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",this.handleKeyDown),setTimeout(()=>{this._updateRadioList(),this.updateRadioSelection()},0)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("keydown",this.handleKeyDown),this._radios.forEach(r=>{r.removeEventListener("change",this.handleRadioChange)})}get name(){return this.getAttribute("name")||""}set name(r){this.setAttribute("name",r)}get value(){return this._value}set value(r){this._value=r,this.setAttribute("value",r),this.updateRadioSelection()}get label(){return this.getAttribute("label")||""}set label(r){this.setAttribute("label",r)}get required(){return this.hasAttribute("required")}set required(r){r?this.setAttribute("required",""):this.removeAttribute("required")}get layout(){return this.getAttribute("layout")||"vertical"}set layout(r){this.setAttribute("layout",r)}get error(){return this.getAttribute("error")||""}set error(r){r?this.setAttribute("error",r):this.removeAttribute("error")}render(){const r=this.layout,e=this.label,a=this.error,o=this.required;return`
      <style>
        :host {
          --_radio-group-gap: var(--_global-spacing-md);
          --_radio-group-label-color: var(--_global-color-on-surface);
          --_radio-group-label-font-size: var(--_global-font-size-label-large);
          --_radio-group-label-font-weight: var(--_global-font-weight-medium);
          --_radio-group-error-color: var(--_global-color-error);
          
          display: block;
          font-family: var(--_global-font-family-sans);
        }

        :host([disabled]) {
          opacity: 0.6;
          pointer-events: none;
        }

        .radio-group {
          display: flex;
          flex-direction: ${r==="horizontal"?"row":"column"};
          gap: var(--_radio-group-gap);
          ${r==="horizontal"?"flex-wrap: wrap;":""}
        }

        .radio-group-label {
          color: var(--_radio-group-label-color);
          font-size: var(--_radio-group-label-font-size);
          font-weight: var(--_radio-group-label-font-weight);
          margin-bottom: var(--_global-spacing-sm);
          display: ${e?"block":"none"};
        }

        .required-indicator {
          color: var(--_global-color-error);
          margin-left: var(--_global-spacing-xs);
        }

        .error-message {
          color: var(--_radio-group-error-color);
          font-size: var(--_global-font-size-body-small);
          margin-top: var(--_global-spacing-sm);
          display: ${a?"block":"none"};
        }

        /* Layout variants */
        :host([layout="horizontal"]) .radio-group {
          flex-direction: row;
          align-items: center;
        }

        :host([layout="grid"]) .radio-group {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--_radio-group-gap);
        }

        /* Error state */
        :host([error]) {
          --_radio-group-label-color: var(--_global-color-error);
        }

        /* Focus management */
        :host(:focus-within) {
          outline: 2px solid var(--_global-color-primary);
          outline-offset: 2px;
          border-radius: var(--_global-border-radius-sm);
        }
      </style>
      
      <div class="radio-group-container"
           role="radiogroup"
           aria-labelledby="${e?"radio-group-label":""}"
           aria-describedby="${a?"error-message":""}"
           aria-required="${o}"
           aria-invalid="${a?"true":"false"}">
        ${e?`
          <label class="radio-group-label" id="radio-group-label">
            ${e}
            ${o?'<span class="required-indicator" aria-label="required">*</span>':""}
          </label>
        `:""}
        
        <div class="radio-group">
          <slot @slotchange="${this.handleSlotChange}"></slot>
        </div>
        
        ${a?`
          <div class="error-message" id="error-message" role="alert" aria-live="polite">
            ${a}
          </div>
        `:""}
      </div>
    `}}customElements.define("my-radio-group",s);
