import{M as $}from"./base-component-q4KNMHwB.js";class D extends ${constructor(){super(),this.handleClick=this.handleClick.bind(this),this.handleChange=this.handleChange.bind(this),this.log("Toggle component initializing...")}static get observedAttributes(){return[...super.observedAttributes,"checked","label","name","value","required","readonly"]}handleAttributeChange(e,t,o){switch(super.handleAttributeChange(e,t,o),e){case"checked":this.emit("change",{checked:this.checked,value:this.value,name:this.name});break;case"disabled":this.announceToScreenReader(`Toggle ${this.disabled?"disabled":"enabled"}`,"polite");break}}get checked(){return this.hasAttribute("checked")}set checked(e){const t=!!e;this.toggleAttribute("checked",t),this.log("Checked state changed:",t)}get label(){return this.getAttribute("label")||""}set label(e){this.validateAttribute("label",e,t=>typeof t=="string")&&this.setAttribute("label",e)}get name(){return this.getAttribute("name")||""}set name(e){this.validateAttribute("name",e,t=>typeof t=="string")&&this.setAttribute("name",e)}get value(){return this.getAttribute("value")||"on"}set value(e){this.setAttribute("value",e)}get required(){return this.hasAttribute("required")}set required(e){this.toggleAttribute("required",!!e)}get readonly(){return this.hasAttribute("readonly")}set readonly(e){this.toggleAttribute("readonly",!!e)}handleKeyDown(e){if(super.handleKeyDown(e),!(this.disabled||this.readonly))switch(e.key){case" ":case"Enter":e.preventDefault(),this.toggle();break;case"ArrowLeft":e.preventDefault(),this.checked&&this.toggle();break;case"ArrowRight":e.preventDefault(),this.checked||this.toggle();break}}handleClick(e){if(this.disabled||this.readonly){e.preventDefault();return}this.createRipple(e),this.toggle()}handleChange(e){e.target!==this&&(this.log("Change event triggered"),this.validateState())}toggle(){if(this.disabled||this.readonly)return;const e=this.checked;this.checked=!e,this.announceToScreenReader(`${this.label||"Toggle"} ${this.checked?"on":"off"}`,"assertive"),this.log("Toggle switched:",{from:e,to:this.checked})}check(){this.checked||this.toggle()}uncheck(){this.checked&&this.toggle()}validateState(){const e=!this.required||this.checked;return this.toggleClass("invalid",!e),this.setAttribute("aria-invalid",!e),e||this.announceToScreenReader("Required field not selected","assertive"),e}handleFocus(){super.handleFocus();const e=this.shadowRoot.querySelector(".toggle-track");e&&e.classList.add("focused"),this.emit("focus",{name:this.name,checked:this.checked})}handleBlur(){super.handleBlur();const e=this.shadowRoot.querySelector(".toggle-track");e&&e.classList.remove("focused"),this.validateState(),this.emit("blur",{name:this.name,checked:this.checked})}attachEventListeners(){this.removeEventListeners();const e=this.shadowRoot.querySelector(".toggle-container");e&&this.addEventListeners([{element:e,events:["click"],handler:this.handleClick},{element:e,events:["keydown"],handler:this.handleKeyDown},{element:e,events:["focus"],handler:this.handleFocus},{element:e,events:["blur"],handler:this.handleBlur}]),this.addEventListener("change",this.handleChange)}onConnected(){this.log("Toggle connected, initial validation"),this.setAttribute("role","switch"),this.setAttribute("aria-checked",this.checked),this.setAttribute("tabindex",this.disabled?"-1":"0"),this.validateState()}onDisconnected(){this.log("Toggle disconnected"),this.removeEventListener("change",this.handleChange)}render(){return this.measurePerformance("render",()=>{const e=this.checked,t=this.disabled,o=this.readonly,r=this.error;this.size;const a=this.label;this.shadowRoot.innerHTML=`
        <style>
          :host {
            /* Enhanced toggle variables using design system */
            --_toggle-width: 52px;
            --_toggle-height: 32px;
            --_toggle-thumb-size: 20px;
            --_toggle-track-radius: 16px;
            --_toggle-thumb-radius: 10px;
            --_toggle-padding: 6px;
            
            /* Size variants */
            --_toggle-width-sm: 40px;
            --_toggle-height-sm: 24px;
            --_toggle-thumb-size-sm: 16px;
            --_toggle-width-lg: 64px;
            --_toggle-height-lg: 40px;
            --_toggle-thumb-size-lg: 28px;
            
            /* Color system aligned with Material Design 3 */
            --_toggle-track-color-unchecked: var(--_global-color-outline);
            --_toggle-track-color-checked: var(--_global-color-primary);
            --_toggle-track-color-disabled: var(--_global-color-outline-variant);
            --_toggle-track-color-error: var(--_global-color-error);
            
            --_toggle-thumb-color-unchecked: var(--_global-color-outline);
            --_toggle-thumb-color-checked: var(--_global-color-on-primary);
            --_toggle-thumb-color-disabled: var(--_global-color-on-surface-variant);
            
            --_toggle-background-color-unchecked: var(--_global-color-surface-variant);
            --_toggle-background-color-checked: var(--_global-color-primary);
            --_toggle-background-color-disabled: var(--_global-color-surface-variant);
            
            /* Enhanced state layers */
            --_toggle-state-layer-color: var(--_global-color-primary);
            --_toggle-state-layer-size: 40px;
            
            /* Transitions with easing */
            --_toggle-transition: all var(--_global-motion-duration-short2) var(--_global-motion-easing-emphasized);
            --_toggle-transition-fast: all var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
            
            display: inline-flex;
            align-items: center;
            gap: var(--_global-spacing-sm);
            font-family: var(--_global-font-family-sans);
            cursor: pointer;
            user-select: none;
          }

          :host([disabled]),
          :host([readonly]) {
            opacity: 0.6;
            cursor: not-allowed;
            pointer-events: none;
          }

          /* Size variants */
          :host([size="sm"]) {
            --_toggle-width: var(--_toggle-width-sm);
            --_toggle-height: var(--_toggle-height-sm);
            --_toggle-thumb-size: var(--_toggle-thumb-size-sm);
            --_toggle-state-layer-size: 32px;
          }

          :host([size="lg"]) {
            --_toggle-width: var(--_toggle-width-lg);
            --_toggle-height: var(--_toggle-height-lg);
            --_toggle-thumb-size: var(--_toggle-thumb-size-lg);
            --_toggle-state-layer-size: 48px;
          }

          .toggle-container {
            position: relative;
            display: inline-flex;
            align-items: center;
            gap: var(--_global-spacing-sm);
            outline: none;
            border-radius: var(--_global-border-radius-full);
            padding: var(--_global-spacing-xs);
            margin: calc(var(--_global-spacing-xs) * -1);
          }

          /* Enhanced focus indicators */
          .toggle-container:focus,
          .toggle-container.focused {
            outline: 2px solid var(--_global-color-primary);
            outline-offset: 2px;
          }

          /* State layer for interactions */
          .toggle-container::before {
            content: '';
            position: absolute;
            top: 50%;
            left: calc(var(--_toggle-width) / 2);
            transform: translate(-50%, -50%);
            width: var(--_toggle-state-layer-size);
            height: var(--_toggle-state-layer-size);
            border-radius: 50%;
            background-color: var(--_toggle-state-layer-color);
            opacity: 0;
            transition: var(--_toggle-transition-fast);
            pointer-events: none;
            z-index: 0;
          }

          .toggle-container:hover:not([aria-disabled="true"])::before {
            opacity: var(--_global-state-layer-hover);
          }

          .toggle-container:active:not([aria-disabled="true"])::before {
            opacity: var(--_global-state-layer-pressed);
          }

          .toggle-track {
            position: relative;
            width: var(--_toggle-width);
            height: var(--_toggle-height);
            background-color: var(--_toggle-background-color-unchecked);
            border-radius: var(--_toggle-track-radius);
            transition: var(--_toggle-transition);
            border: 2px solid var(--_toggle-track-color-unchecked);
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            isolation: isolate;
          }

          /* Checked state styling */
          :host([checked]) .toggle-track {
            background-color: var(--_toggle-background-color-checked);
            border-color: var(--_toggle-track-color-checked);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          }

          /* Error state */
          :host([error]) .toggle-track {
            border-color: var(--_toggle-track-color-error);
            background-color: var(--_global-color-error-container);
          }

          /* Disabled state */
          :host([disabled]) .toggle-track {
            background-color: var(--_toggle-background-color-disabled);
            border-color: var(--_toggle-track-color-disabled);
            box-shadow: none;
          }

          .toggle-thumb {
            position: absolute;
            top: 50%;
            left: var(--_toggle-padding);
            transform: translateY(-50%);
            width: var(--_toggle-thumb-size);
            height: var(--_toggle-thumb-size);
            background-color: var(--_toggle-thumb-color-unchecked);
            border-radius: var(--_toggle-thumb-radius);
            transition: var(--_toggle-transition);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            z-index: 1;
          }

          /* Checked thumb position */
          :host([checked]) .toggle-thumb {
            left: calc(100% - var(--_toggle-thumb-size) - var(--_toggle-padding));
            background-color: var(--_toggle-thumb-color-checked);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          }

          /* Disabled thumb */
          :host([disabled]) .toggle-thumb {
            background-color: var(--_toggle-thumb-color-disabled);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }

          /* Label styling */
          .toggle-label {
            color: var(--_global-color-on-surface);
            font-size: var(--_global-font-size-sm);
            font-weight: var(--_global-font-weight-normal);
            line-height: var(--_global-line-height-normal);
            cursor: pointer;
          }

          :host([disabled]) .toggle-label,
          :host([readonly]) .toggle-label {
            cursor: not-allowed;
            color: var(--_global-color-on-surface-variant);
          }

          :host([error]) .toggle-label {
            color: var(--_global-color-error);
          }

          /* Required indicator */
          .toggle-label.required::after {
            content: ' *';
            color: var(--_global-color-error);
          }

          /* Enhanced ripple container */
          .toggle-track {
            position: relative;
            overflow: hidden;
          }

          .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation var(--_global-ripple-duration) var(--_global-ripple-easing);
            background-color: var(--_toggle-state-layer-color);
            opacity: var(--_global-ripple-opacity-pressed);
            pointer-events: none;
            z-index: 2;
          }

          /* Accessibility enhancements */
          @media (prefers-contrast: high) {
            .toggle-track {
              border-width: 3px;
            }
            
            .toggle-container:focus {
              outline-width: 3px;
              outline-style: double;
            }
            
            .toggle-thumb {
              border: 2px solid var(--_global-color-on-surface);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .toggle-track,
            .toggle-thumb,
            .toggle-container::before,
            .ripple {
              transition: none !important;
              animation: none !important;
            }
          }

          /* High contrast for better visibility */
          @media (prefers-color-scheme: dark) {
            .toggle-thumb {
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
            }
            
            :host([checked]) .toggle-thumb {
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
            }
          }
        </style>

        <div 
          class="toggle-container ripple-container"
          role="switch"
          aria-checked="${e}"
          aria-label="${a||"Toggle switch"}"
          aria-disabled="${t}"
          aria-readonly="${o}"
          aria-required="${this.required}"
          aria-invalid="${r}"
          tabindex="${t?"-1":"0"}"
        >
          <div class="toggle-track">
            <div class="toggle-thumb"></div>
          </div>
          
          ${a?`
            <span class="toggle-label ${this.required?"required":""}">${a}</span>
          `:""}
        </div>
      `,this.setAttribute("aria-checked",e),this.setAttribute("aria-disabled",t),this.log("Toggle rendered",{checked:e,disabled:t})})}}D.define("my-toggle-enhanced");const F={title:"Components/my-toggle-enhanced",parameters:{docs:{description:{component:"Enhanced toggle component built using MyntUIBaseComponent, demonstrating improved consistency, error handling, accessibility, and performance monitoring."}}},argTypes:{checked:{control:"boolean",description:"Toggle checked state"},disabled:{control:"boolean",description:"Disable the toggle"},readonly:{control:"boolean",description:"Make toggle read-only"},required:{control:"boolean",description:"Mark as required field"},error:{control:"boolean",description:"Show error state"},label:{control:"text",description:"Toggle label text"},name:{control:"text",description:"Form field name"},value:{control:"text",description:"Toggle value when checked"},size:{control:{type:"select"},options:["sm","md","lg"],description:"Toggle size variant"},debug:{control:"boolean",description:"Enable debug logging"}}},R=n=>{const e=document.createElement("div");e.style.cssText="padding: 24px; display: flex; flex-direction: column; gap: 16px;";const t=document.createElement("my-toggle-enhanced");n.checked&&t.setAttribute("checked",""),n.disabled&&t.setAttribute("disabled",""),n.readonly&&t.setAttribute("readonly",""),n.required&&t.setAttribute("required",""),n.error&&t.setAttribute("error",""),n.label&&t.setAttribute("label",n.label),n.name&&t.setAttribute("name",n.name),n.value&&t.setAttribute("value",n.value),n.size&&n.size!=="md"&&t.setAttribute("size",n.size),n.debug&&t.setAttribute("debug",""),t.addEventListener("change",r=>{console.log("Enhanced toggle changed:",r.detail)}),t.addEventListener("focus",r=>{console.log("Enhanced toggle focused:",r.detail)}),t.addEventListener("error",r=>{console.error("Enhanced toggle error:",r.detail)});const o=document.createElement("div");return o.style.cssText="font-size: 14px; color: var(--_global-color-text-secondary);",o.textContent="Enhanced toggle with base component features: logging, validation, accessibility, performance monitoring",e.appendChild(o),e.appendChild(t),e},g=R.bind({});g.args={checked:!1,disabled:!1,readonly:!1,required:!1,error:!1,label:"Enhanced Toggle",name:"enhanced-toggle",value:"on",size:"md",debug:!1};const h=()=>{const n=document.createElement("div");n.style.cssText="padding: 24px; display: flex; flex-direction: column; gap: 24px;";const e=document.createElement("h3");e.textContent="Enhanced Features Demo",e.style.cssText="margin: 0 0 16px 0;";const t=document.createElement("div");t.innerHTML=`
    <h4 style="margin: 0 0 12px 0;">Performance Monitoring</h4>
    <p style="margin: 0 0 12px 0; font-size: 14px; color: var(--_global-color-text-secondary);">
      Enable debug mode and check console for performance measurements
    </p>
  `;const o=document.createElement("my-toggle-enhanced");o.setAttribute("label","Debug Mode Toggle"),o.setAttribute("debug",""),o.setAttribute("name","performance-demo");const r=document.createElement("div");r.innerHTML=`
    <h4 style="margin: 0 0 12px 0;">Enhanced Validation</h4>
    <p style="margin: 0 0 12px 0; font-size: 14px; color: var(--_global-color-text-secondary);">
      Required toggle with automatic validation on blur
    </p>
  `;const a=document.createElement("my-toggle-enhanced");a.setAttribute("label","Required Setting"),a.setAttribute("required",""),a.setAttribute("name","validation-demo");const l=document.createElement("div");l.innerHTML=`
    <h4 style="margin: 0 0 12px 0;">Enhanced Accessibility</h4>
    <p style="margin: 0 0 12px 0; font-size: 14px; color: var(--_global-color-text-secondary);">
      Screen reader announcements, keyboard navigation (Left/Right arrows), focus management
    </p>
  `;const c=document.createElement("my-toggle-enhanced");c.setAttribute("label","Accessibility Features"),c.setAttribute("name","accessibility-demo");const d=document.createElement("div");d.innerHTML=`
    <h4 style="margin: 0 0 12px 0;">Error Handling</h4>
    <p style="margin: 0 0 12px 0; font-size: 14px; color: var(--_global-color-text-secondary);">
      Error state with enhanced visual feedback
    </p>
  `;const i=document.createElement("my-toggle-enhanced");return i.setAttribute("label","Error State Demo"),i.setAttribute("error",""),i.setAttribute("name","error-demo"),[o,a,c,i].forEach(u=>{u.addEventListener("change",s=>{console.log(`Enhanced toggle [${s.detail.name}] changed:`,s.detail)}),u.addEventListener("focus",s=>{console.log(`Enhanced toggle [${s.detail.name}] focused:`,s.detail)}),u.addEventListener("blur",s=>{console.log(`Enhanced toggle [${s.detail.name}] blurred:`,s.detail)}),u.addEventListener("error",s=>{console.error("Enhanced toggle error:",s.detail)})}),n.appendChild(e),n.appendChild(t),t.appendChild(o),n.appendChild(r),r.appendChild(a),n.appendChild(l),l.appendChild(c),n.appendChild(d),d.appendChild(i),n},p=()=>{const n=document.createElement("div");return n.style.cssText="padding: 24px; display: flex; gap: 24px; align-items: center; flex-wrap: wrap;",["sm","md","lg"].forEach(t=>{const o=document.createElement("div");o.style.cssText="display: flex; flex-direction: column; gap: 8px; align-items: center;";const r=document.createElement("my-toggle-enhanced");r.setAttribute("label",`${t.toUpperCase()} Toggle`),r.setAttribute("size",t),r.setAttribute("name",`size-${t}`),r.setAttribute("debug","");const a=document.createElement("div");a.textContent=t.toUpperCase(),a.style.cssText="font-size: 12px; color: var(--_global-color-text-secondary);",o.appendChild(r),o.appendChild(a),n.appendChild(o)}),n},b=()=>{const n=document.createElement("div");return n.style.cssText="padding: 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;",[{label:"Normal",props:{}},{label:"Checked",props:{checked:!0}},{label:"Disabled",props:{disabled:!0}},{label:"Disabled Checked",props:{disabled:!0,checked:!0}},{label:"Required",props:{required:!0}},{label:"Read-only",props:{readonly:!0,checked:!0}},{label:"Error State",props:{error:!0}},{label:"Debug Mode",props:{debug:!0,checked:!0}}].forEach(({label:t,props:o})=>{const r=document.createElement("div");r.style.cssText="display: flex; flex-direction: column; gap: 12px; padding: 16px; border: 1px solid var(--_global-color-outline-variant); border-radius: var(--_global-border-radius-md);";const a=document.createElement("h4");a.textContent=t,a.style.cssText="margin: 0; font-size: 16px;";const l=document.createElement("my-toggle-enhanced");l.setAttribute("label",`${t} Toggle`),l.setAttribute("name",`state-${t.toLowerCase().replace(/\s+/g,"-")}`),Object.entries(o).forEach(([c,d])=>{d===!0?l.setAttribute(c,""):d!==!1&&l.setAttribute(c,d)}),r.appendChild(a),r.appendChild(l),n.appendChild(r)}),n},m=()=>{const n=document.createElement("div");n.style.cssText="padding: 24px; max-width: 600px;";const e=document.createElement("h3");e.textContent="Enhanced API Demonstration",e.style.cssText="margin: 0 0 16px 0;";const t=document.createElement("my-toggle-enhanced");t.setAttribute("label","API Demo Toggle"),t.setAttribute("name","api-demo"),t.setAttribute("debug","");const o=document.createElement("div");o.style.cssText="display: flex; flex-wrap: wrap; gap: 12px; margin: 16px 0;",[{label:"Toggle",action:()=>t.toggle()},{label:"Check",action:()=>t.check()},{label:"Uncheck",action:()=>t.uncheck()},{label:"Validate",action:()=>console.log("Valid:",t.validateState())},{label:"Focus",action:()=>t.focusFirstElement()},{label:"Toggle Required",action:()=>t.required=!t.required},{label:"Toggle Error",action:()=>t.error=!t.error},{label:"Announce",action:()=>t.announceToScreenReader("API method called","assertive")}].forEach(({label:c,action:d})=>{const i=document.createElement("button");i.textContent=c,i.style.cssText=`
      padding: 8px 12px;
      border: 1px solid var(--_global-color-outline);
      border-radius: var(--_global-border-radius-sm);
      background: var(--_global-color-surface);
      color: var(--_global-color-on-surface);
      cursor: pointer;
      font-size: 14px;
    `,i.addEventListener("click",d),o.appendChild(i)});const a=document.createElement("div");a.style.cssText="margin-top: 16px; padding: 12px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md); font-family: monospace; font-size: 14px;";const l=()=>{a.innerHTML=`
      <strong>Current State:</strong><br>
      Checked: ${t.checked}<br>
      Disabled: ${t.disabled}<br>
      Required: ${t.required}<br>
      Error: ${t.error}<br>
      Name: ${t.name}<br>
      Value: ${t.value}
    `};return t.addEventListener("change",l),t.addEventListener("blur",l),l(),n.appendChild(e),n.appendChild(t),n.appendChild(o),n.appendChild(a),n};var v,f,x;g.parameters={...g.parameters,docs:{...(v=g.parameters)==null?void 0:v.docs,source:{originalSource:`args => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; flex-direction: column; gap: 16px;';
  const toggle = document.createElement('my-toggle-enhanced');

  // Set properties
  if (args.checked) toggle.setAttribute('checked', '');
  if (args.disabled) toggle.setAttribute('disabled', '');
  if (args.readonly) toggle.setAttribute('readonly', '');
  if (args.required) toggle.setAttribute('required', '');
  if (args.error) toggle.setAttribute('error', '');
  if (args.label) toggle.setAttribute('label', args.label);
  if (args.name) toggle.setAttribute('name', args.name);
  if (args.value) toggle.setAttribute('value', args.value);
  if (args.size && args.size !== 'md') toggle.setAttribute('size', args.size);
  if (args.debug) toggle.setAttribute('debug', '');

  // Add event listener to demonstrate enhanced events
  toggle.addEventListener('change', event => {
    console.log('Enhanced toggle changed:', event.detail);
  });
  toggle.addEventListener('focus', event => {
    console.log('Enhanced toggle focused:', event.detail);
  });
  toggle.addEventListener('error', event => {
    console.error('Enhanced toggle error:', event.detail);
  });
  const info = document.createElement('div');
  info.style.cssText = 'font-size: 14px; color: var(--_global-color-text-secondary);';
  info.textContent = 'Enhanced toggle with base component features: logging, validation, accessibility, performance monitoring';
  container.appendChild(info);
  container.appendChild(toggle);
  return container;
}`,...(x=(f=g.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var y,E,k;h.parameters={...h.parameters,docs:{...(y=h.parameters)==null?void 0:y.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; flex-direction: column; gap: 24px;';
  const title = document.createElement('h3');
  title.textContent = 'Enhanced Features Demo';
  title.style.cssText = 'margin: 0 0 16px 0;';

  // Performance monitoring demo
  const perfSection = document.createElement('div');
  perfSection.innerHTML = \`
    <h4 style="margin: 0 0 12px 0;">Performance Monitoring</h4>
    <p style="margin: 0 0 12px 0; font-size: 14px; color: var(--_global-color-text-secondary);">
      Enable debug mode and check console for performance measurements
    </p>
  \`;
  const perfToggle = document.createElement('my-toggle-enhanced');
  perfToggle.setAttribute('label', 'Debug Mode Toggle');
  perfToggle.setAttribute('debug', '');
  perfToggle.setAttribute('name', 'performance-demo');

  // Validation demo
  const validationSection = document.createElement('div');
  validationSection.innerHTML = \`
    <h4 style="margin: 0 0 12px 0;">Enhanced Validation</h4>
    <p style="margin: 0 0 12px 0; font-size: 14px; color: var(--_global-color-text-secondary);">
      Required toggle with automatic validation on blur
    </p>
  \`;
  const validationToggle = document.createElement('my-toggle-enhanced');
  validationToggle.setAttribute('label', 'Required Setting');
  validationToggle.setAttribute('required', '');
  validationToggle.setAttribute('name', 'validation-demo');

  // Accessibility demo
  const a11ySection = document.createElement('div');
  a11ySection.innerHTML = \`
    <h4 style="margin: 0 0 12px 0;">Enhanced Accessibility</h4>
    <p style="margin: 0 0 12px 0; font-size: 14px; color: var(--_global-color-text-secondary);">
      Screen reader announcements, keyboard navigation (Left/Right arrows), focus management
    </p>
  \`;
  const a11yToggle = document.createElement('my-toggle-enhanced');
  a11yToggle.setAttribute('label', 'Accessibility Features');
  a11yToggle.setAttribute('name', 'accessibility-demo');

  // Error handling demo
  const errorSection = document.createElement('div');
  errorSection.innerHTML = \`
    <h4 style="margin: 0 0 12px 0;">Error Handling</h4>
    <p style="margin: 0 0 12px 0; font-size: 14px; color: var(--_global-color-text-secondary);">
      Error state with enhanced visual feedback
    </p>
  \`;
  const errorToggle = document.createElement('my-toggle-enhanced');
  errorToggle.setAttribute('label', 'Error State Demo');
  errorToggle.setAttribute('error', '');
  errorToggle.setAttribute('name', 'error-demo');

  // Event listeners for demos
  [perfToggle, validationToggle, a11yToggle, errorToggle].forEach(toggle => {
    toggle.addEventListener('change', event => {
      console.log(\`Enhanced toggle [\${event.detail.name}] changed:\`, event.detail);
    });
    toggle.addEventListener('focus', event => {
      console.log(\`Enhanced toggle [\${event.detail.name}] focused:\`, event.detail);
    });
    toggle.addEventListener('blur', event => {
      console.log(\`Enhanced toggle [\${event.detail.name}] blurred:\`, event.detail);
    });
    toggle.addEventListener('error', event => {
      console.error(\`Enhanced toggle error:\`, event.detail);
    });
  });
  container.appendChild(title);
  container.appendChild(perfSection);
  perfSection.appendChild(perfToggle);
  container.appendChild(validationSection);
  validationSection.appendChild(validationToggle);
  container.appendChild(a11ySection);
  a11ySection.appendChild(a11yToggle);
  container.appendChild(errorSection);
  errorSection.appendChild(errorToggle);
  return container;
}`,...(k=(E=h.parameters)==null?void 0:E.docs)==null?void 0:k.source}}};var _,A,T;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; gap: 24px; align-items: center; flex-wrap: wrap;';
  const sizes = ['sm', 'md', 'lg'];
  sizes.forEach(size => {
    const section = document.createElement('div');
    section.style.cssText = 'display: flex; flex-direction: column; gap: 8px; align-items: center;';
    const toggle = document.createElement('my-toggle-enhanced');
    toggle.setAttribute('label', \`\${size.toUpperCase()} Toggle\`);
    toggle.setAttribute('size', size);
    toggle.setAttribute('name', \`size-\${size}\`);
    toggle.setAttribute('debug', '');
    const label = document.createElement('div');
    label.textContent = size.toUpperCase();
    label.style.cssText = 'font-size: 12px; color: var(--_global-color-text-secondary);';
    section.appendChild(toggle);
    section.appendChild(label);
    container.appendChild(section);
  });
  return container;
}`,...(T=(A=p.parameters)==null?void 0:A.docs)==null?void 0:T.source}}};var C,w,z;b.parameters={...b.parameters,docs:{...(C=b.parameters)==null?void 0:C.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;';
  const states = [{
    label: 'Normal',
    props: {}
  }, {
    label: 'Checked',
    props: {
      checked: true
    }
  }, {
    label: 'Disabled',
    props: {
      disabled: true
    }
  }, {
    label: 'Disabled Checked',
    props: {
      disabled: true,
      checked: true
    }
  }, {
    label: 'Required',
    props: {
      required: true
    }
  }, {
    label: 'Read-only',
    props: {
      readonly: true,
      checked: true
    }
  }, {
    label: 'Error State',
    props: {
      error: true
    }
  }, {
    label: 'Debug Mode',
    props: {
      debug: true,
      checked: true
    }
  }];
  states.forEach(({
    label,
    props
  }) => {
    const section = document.createElement('div');
    section.style.cssText = 'display: flex; flex-direction: column; gap: 12px; padding: 16px; border: 1px solid var(--_global-color-outline-variant); border-radius: var(--_global-border-radius-md);';
    const title = document.createElement('h4');
    title.textContent = label;
    title.style.cssText = 'margin: 0; font-size: 16px;';
    const toggle = document.createElement('my-toggle-enhanced');
    toggle.setAttribute('label', \`\${label} Toggle\`);
    toggle.setAttribute('name', \`state-\${label.toLowerCase().replace(/\\s+/g, '-')}\`);

    // Apply state properties
    Object.entries(props).forEach(([key, value]) => {
      if (value === true) {
        toggle.setAttribute(key, '');
      } else if (value !== false) {
        toggle.setAttribute(key, value);
      }
    });
    section.appendChild(title);
    section.appendChild(toggle);
    container.appendChild(section);
  });
  return container;
}`,...(z=(w=b.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var S,L,q;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 600px;';
  const title = document.createElement('h3');
  title.textContent = 'Enhanced API Demonstration';
  title.style.cssText = 'margin: 0 0 16px 0;';
  const toggle = document.createElement('my-toggle-enhanced');
  toggle.setAttribute('label', 'API Demo Toggle');
  toggle.setAttribute('name', 'api-demo');
  toggle.setAttribute('debug', '');
  const controls = document.createElement('div');
  controls.style.cssText = 'display: flex; flex-wrap: wrap; gap: 12px; margin: 16px 0;';

  // API method buttons
  const methods = [{
    label: 'Toggle',
    action: () => toggle.toggle()
  }, {
    label: 'Check',
    action: () => toggle.check()
  }, {
    label: 'Uncheck',
    action: () => toggle.uncheck()
  }, {
    label: 'Validate',
    action: () => console.log('Valid:', toggle.validateState())
  }, {
    label: 'Focus',
    action: () => toggle.focusFirstElement()
  }, {
    label: 'Toggle Required',
    action: () => toggle.required = !toggle.required
  }, {
    label: 'Toggle Error',
    action: () => toggle.error = !toggle.error
  }, {
    label: 'Announce',
    action: () => toggle.announceToScreenReader('API method called', 'assertive')
  }];
  methods.forEach(({
    label,
    action
  }) => {
    const button = document.createElement('button');
    button.textContent = label;
    button.style.cssText = \`
      padding: 8px 12px;
      border: 1px solid var(--_global-color-outline);
      border-radius: var(--_global-border-radius-sm);
      background: var(--_global-color-surface);
      color: var(--_global-color-on-surface);
      cursor: pointer;
      font-size: 14px;
    \`;
    button.addEventListener('click', action);
    controls.appendChild(button);
  });
  const status = document.createElement('div');
  status.style.cssText = 'margin-top: 16px; padding: 12px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md); font-family: monospace; font-size: 14px;';

  // Update status display
  const updateStatus = () => {
    status.innerHTML = \`
      <strong>Current State:</strong><br>
      Checked: \${toggle.checked}<br>
      Disabled: \${toggle.disabled}<br>
      Required: \${toggle.required}<br>
      Error: \${toggle.error}<br>
      Name: \${toggle.name}<br>
      Value: \${toggle.value}
    \`;
  };
  toggle.addEventListener('change', updateStatus);
  toggle.addEventListener('blur', updateStatus);
  updateStatus();
  container.appendChild(title);
  container.appendChild(toggle);
  container.appendChild(controls);
  container.appendChild(status);
  return container;
}`,...(q=(L=m.parameters)==null?void 0:L.docs)==null?void 0:q.source}}};const H=["Default","EnhancedFeatures","Sizes","States","APIDemonstration"];export{m as APIDemonstration,g as Default,h as EnhancedFeatures,p as Sizes,b as States,H as __namedExportsOrder,F as default};
