import{M as z}from"./base-component-q4KNMHwB.js";class ${constructor(){this._config={theme:{labelPosition:"top",sizes:{small:"small",medium:"medium",large:"large"},colorScheme:"auto",spacing:{xs:"var(--_global-spacing-xs)",sm:"var(--_global-spacing-sm)",md:"var(--_global-spacing-md)",lg:"var(--_global-spacing-lg)",xl:"var(--_global-spacing-xl)",xxl:"var(--_global-spacing-xxl)"},corners:{none:"var(--_global-border-radius-none)",sm:"var(--_global-border-radius-sm)",md:"var(--_global-border-radius-md)",lg:"var(--_global-border-radius-lg)",xl:"var(--_global-border-radius-xl)",full:"var(--_global-border-radius-full)"},colors:{primary:"var(--_global-color-primary)",secondary:"var(--_global-color-secondary)",tertiary:"var(--_global-color-tertiary)",success:"var(--_global-color-success)",warning:"var(--_global-color-warning)",error:"var(--_global-color-error)",info:"var(--_global-color-info)",surface:"var(--_global-color-surface)",background:"var(--_global-color-background-white)"}},components:{input:{variant:"outlined",size:"medium",labelPosition:"top",characterCountThreshold:80,debounceDelay:300,showIconsOnly:"when-relevant",autoIconMapping:{email:"mail",password:"lock",search:"search",date:"event","datetime-local":"schedule",time:"access_time","date-of-birth":"cake",tel:"phone",url:"link",number:"tag",currency:"attach_money"}},button:{variant:"filled",size:"medium",rippleEffect:!0},modal:{closeOnBackdropClick:!0,closeOnEscape:!0,trapFocus:!0,restoreFocus:!0},dataTable:{pageSize:25,pageSizeOptions:[10,25,50,100],showPagination:!0,sortable:!0,filterable:!0}},api:{pagination:{limit:"limit",offset:"offset",total:"total",page:"page",pageSize:"pageSize"},query:{search:"search",searchBy:"searchBy",sortBy:"sortBy",sortOrder:"sortOrder",filters:"filters",filtersBy:"filtersBy"},response:{data:"data",items:"items",results:"results",total:"total",count:"count",page:"page",meta:"meta",errors:"errors",message:"message",success:"success",status:"status"},headers:{contentType:"Content-Type",authorization:"Authorization",accept:"Accept",userAgent:"User-Agent"}},accessibility:{announcements:!0,liveRegions:!0,focusManagement:!0,keyboardNavigation:!0,ariaLive:"polite",focusOutlineWidth:"2px",focusOutlineOffset:"2px",focusRingColor:"var(--_global-color-primary)"},motion:{enabled:!0,respectReducedMotion:!0,duration:{fast:150,normal:250,slow:400},easing:{standard:"cubic-bezier(0.4, 0.0, 0.2, 1)",decelerate:"cubic-bezier(0.0, 0.0, 0.2, 1)",accelerate:"cubic-bezier(0.4, 0.0, 1, 1)",emphasized:"cubic-bezier(0.2, 0.0, 0, 1)"}},development:{logLevel:"warn",warnings:{missingLabels:!0,accessibilityIssues:!0,performanceIssues:!0,deprecatedFeatures:!0},showComponentBoundaries:!1,showFocusIndicators:!0}}}get(t,e=null){return this._getNestedValue(this._config,t,e)}set(t,e){this._setNestedValue(this._config,t,e),this._notifyChange(t,e)}update(t){this._deepMerge(this._config,t),this._notifyChange("*",t)}getAll(){return JSON.parse(JSON.stringify(this._config))}reset(){this._config,this._config=new $()._config,this._notifyChange("*",this._config)}load(t){const e=typeof t=="string"?JSON.parse(t):t;this.update(e)}export(t=!0){return JSON.stringify(this._config,null,t?2:0)}_getNestedValue(t,e,i){const a=e.split(".");let n=t;for(const o of a)if(n&&typeof n=="object"&&o in n)n=n[o];else return i;return n}_setNestedValue(t,e,i){const a=e.split("."),n=a.pop();let o=t;for(const r of a)(!(r in o)||typeof o[r]!="object")&&(o[r]={}),o=o[r];o[n]=i}_deepMerge(t,e){for(const i in e)e[i]&&typeof e[i]=="object"&&!Array.isArray(e[i])?((!t[i]||typeof t[i]!="object")&&(t[i]={}),this._deepMerge(t[i],e[i])):t[i]=e[i]}_notifyChange(t,e){typeof window<"u"&&window.dispatchEvent(new CustomEvent("myntuiConfigChange",{detail:{path:t,value:e,config:this._config}}))}}const k=new $,A=()=>k.get("theme"),w=()=>{if(typeof document>"u")return;const f=A(),t=document.documentElement;f.colorScheme!=="auto"&&t.setAttribute("data-color-scheme",f.colorScheme),Object.entries(f.colors).forEach(([e,i])=>{t.style.setProperty(`--_config-color-${e}`,i)}),Object.entries(f.spacing).forEach(([e,i])=>{t.style.setProperty(`--_config-spacing-${e}`,i)}),Object.entries(f.corners).forEach(([e,i])=>{t.style.setProperty(`--_config-corner-${e}`,i)})};typeof window<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",w):w(),window.addEventListener("myntuiConfigChange",()=>{w()}));class I extends z{constructor(){super(),this._schema={},this._value="",this._errors=[],this.handleInput=this.handleInput.bind(this),this.handleChange=this.handleChange.bind(this),this._validationTimer=null,this.log("Input component initializing..."),this.parseAttributes()}static get observedAttributes(){return[...super.observedAttributes,"type","label","name","placeholder","value","required","readonly","min","max","minlength","maxlength","pattern","step","autocomplete","label-position","schema","aria-label","aria-describedby","aria-invalid","leading-icon","trailing-icon","helper-text","character-count"]}handleAttributeChange(t,e,i){switch(super.handleAttributeChange(t,e,i),this.parseAttributes(),t){case"disabled":this.announceToScreenReader(`Input ${this.disabled?"disabled":"enabled"}`,"polite");break;case"value":this._value=i||"";break;case"required":this.announceToScreenReader(`Input is ${i!==null?"required":"optional"}`,"polite");break}}parseAttributes(){const t=this.getAttribute("schema");if(t)try{this._schema=JSON.parse(t)}catch(e){console.warn("Invalid schema JSON in my-input:",e),this._schema={}}this._schema={type:this.getAttribute("type")||this._schema.type||"text",label:this.getAttribute("label")||this._schema.label||"",name:this.getAttribute("name")||this._schema.name||"",placeholder:this.getAttribute("placeholder")||this._schema.placeholder||"",value:this.getAttribute("value")||this._schema.value||"",labelPosition:this.getAttribute("label-position")||this._schema.labelPosition||"top",variant:this.getAttribute("variant")||this._schema.variant||"outlined",size:this.getAttribute("size")||this._schema.size||"medium",leadingIcon:this.getAttribute("leading-icon")||this._schema.leadingIcon||"",trailingIcon:this.getAttribute("trailing-icon")||this._schema.trailingIcon||"",helperText:this.getAttribute("helper-text")||this._schema.helperText||"",characterCount:this.hasAttribute("character-count")||this._schema.characterCount||!1,dense:this.hasAttribute("dense")||this._schema.dense||!1,comfortable:this.hasAttribute("comfortable")||this._schema.comfortable||!1,required:this.hasAttribute("required")||this._schema.required||!1,disabled:this.hasAttribute("disabled")||this._schema.disabled||!1,readonly:this.hasAttribute("readonly")||this._schema.readonly||!1,min:this.getAttribute("min")||this._schema.min,max:this.getAttribute("max")||this._schema.max,minLength:this.getAttribute("minlength")||this._schema.minLength,maxLength:this.getAttribute("maxlength")||this._schema.maxLength,pattern:this.getAttribute("pattern")||this._schema.pattern,step:this.getAttribute("step")||this._schema.step,autocomplete:this.getAttribute("autocomplete")||this._schema.autocomplete,validation:this._schema.validation,options:this._schema.options||[],multiple:this._schema.multiple||!1,...this._schema},this.applyAutomaticIcons(),this._value=this._schema.value}getDefaultIconForType(t){return k.get("components.input.autoIconMapping",{})[t]||null}applyAutomaticIcons(){const t=k.get("components.input.showIconsOnly","when-relevant");if(t!=="never"&&!this._schema.leadingIcon&&!this._schema.trailingIcon){const e=this.getDefaultIconForType(this._schema.type);e&&(t==="when-relevant"||t==="always")&&(this._schema.leadingIcon=e)}}get schema(){return this._schema}set schema(t){this._schema={...t},this.render(),this.attachEventListeners()}get value(){return this._value}set value(t){this._value=t,this.setAttribute("value",t);const e=this.shadowRoot.querySelector("input, textarea, select");e&&(e.value=t)}get valid(){return this._errors.length===0}get errors(){return this._errors}focus(){const t=this.shadowRoot.querySelector("input, textarea, select");t&&!this._schema.disabled&&(t.focus(),this.updateLabelState(),this.updateFocusState(!0),this._errors.length>0?this.announceToScreenReader(`${this._schema.label||"Input"} focused with error: ${this._errors[0]}`,"assertive"):this._schema.helperText?this.announceToScreenReader(`${this._schema.label||"Input"} focused. ${this._schema.helperText}`,"polite"):this.announceToScreenReader(`${this._schema.label||"Input"} focused`,"polite"),this.updateAriaLiveRegion("focus"))}updateLabelState(t=!1){const e=this.shadowRoot.querySelector("input, textarea, select"),i=this.shadowRoot.querySelector(".input-wrapper"),a=this.shadowRoot.querySelector(".label.over");if(!e||!i)return;const n=e.value&&e.value.trim()!=="",o=e===document.activeElement||e.matches(":focus"),r=n||o,s=i.classList.contains("has-content");r&&!s?(i.classList.add("has-content"),a&&!t&&(a.classList.add("floating","animating"),a.classList.remove("unfloating"),setTimeout(()=>{a.classList.remove("floating","animating")},parseInt(getComputedStyle(a).transitionDuration)*1e3||300))):!r&&s&&(i.classList.remove("has-content"),a&&!t&&(a.classList.add("unfloating","animating"),a.classList.remove("floating"),setTimeout(()=>{a.classList.remove("unfloating","animating")},parseInt(getComputedStyle(a).transitionDuration)*1e3||300))),a&&(a.setAttribute("aria-hidden",r?"false":"true"),r?a.setAttribute("role","label"):a.removeAttribute("role"))}announceToScreenReader(t,e="polite"){if(!t||t.trim()==="")return;const i=document.createElement("div");i.setAttribute("aria-live",e),i.setAttribute("aria-atomic","true"),i.setAttribute("role",e==="assertive"?"alert":"status"),i.style.cssText=`
      position: absolute !important;
      left: -10000px !important;
      top: -10000px !important;
      width: 1px !important;
      height: 1px !important;
      overflow: hidden !important;
      clip: rect(1px, 1px, 1px, 1px) !important;
      white-space: nowrap !important;
      border: 0 !important;
      padding: 0 !important;
      margin: 0 !important;
    `,i.textContent=t,document.body.appendChild(i),setTimeout(()=>{i.parentNode&&i.parentNode.removeChild(i)},e==="assertive"?2e3:1e3)}updateAriaLiveRegion(t){const e=this.shadowRoot.querySelector(".input-container");if(!e)return;const i=e.querySelector(".aria-live-region")||this.createAriaLiveRegion();switch(t){case"focus":i.textContent=this._errors.length>0?`Error: ${this._errors[0]}`:this._schema.helperText||"";break;case"validation":i.textContent=this._errors.length>0?`Validation error: ${this._errors[0]}`:"Input is valid";break;case"clear":i.textContent="";break}}createAriaLiveRegion(){const t=this.shadowRoot.querySelector(".input-container");if(!t)return null;const e=document.createElement("div");return e.className="aria-live-region",e.setAttribute("aria-live","polite"),e.setAttribute("aria-atomic","true"),e.style.cssText=`
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `,t.appendChild(e),e}blur(){const t=this.shadowRoot.querySelector("input, textarea, select");t&&t.blur()}validateRequired(t){return this._schema.required&&(!t||t.toString().trim()==="")?`${this._schema.label||"This field"} is required`:null}validatePattern(t){return this._schema.pattern&&t&&!new RegExp(this._schema.pattern).test(t)?`${this._schema.label||"This field"} format is invalid`:null}validateLength(t){if(t){const e=t.toString().length;if(this._schema.minLength&&e<this._schema.minLength)return`${this._schema.label||"This field"} must be at least ${this._schema.minLength} characters`;if(this._schema.maxLength&&e>this._schema.maxLength)return`${this._schema.label||"This field"} must be no more than ${this._schema.maxLength} characters`}return null}validateRange(t){if(t&&(this._schema.type==="number"||this._schema.type==="integer")){const e=parseFloat(t);if(!isNaN(e)){if(this._schema.min!==void 0&&e<this._schema.min)return`${this._schema.label||"This field"} must be at least ${this._schema.min}`;if(this._schema.max!==void 0&&e>this._schema.max)return`${this._schema.label||"This field"} must be no more than ${this._schema.max}`}}return null}validateCustom(t){if(this._schema.validation&&typeof this._schema.validation=="function")try{const e=this._schema.validation(t);if(e!==!0)return e||`${this._schema.label||"This field"} is invalid`}catch(e){return console.warn("Custom validation function error:",e),`${this._schema.label||"This field"} validation failed`}return null}validate(t=this._value,e=!1){const i=this._errors.length,a=[...this._errors];this._errors=[];const n=[this.validateRequired(t),this.validatePattern(t),this.validateLength(t),this.validateRange(t),this.validateCustom(t)];if(this._errors=n.filter(o=>o!==null),this._schema.characterCount&&this._schema.maxLength){const o=this.shadowRoot.querySelector(".character-count");if(o){const r=t.length>this._schema.maxLength;o.classList.toggle("over-limit",r),o.setAttribute("aria-label",`Characters: ${t.length}${this._schema.maxLength?` of ${this._schema.maxLength}`:""}${r?" (over limit)":""}`)}}if(e){const o=this._errors.length>0&&JSON.stringify(this._errors)!==JSON.stringify(a),r=i>0&&this._errors.length===0;o?this.announceToScreenReader(`${this._schema.label||"Input"} validation failed: ${this._errors[0]}`,"assertive"):r&&this.announceToScreenReader(`${this._schema.label||"Input"} validation passed`,"polite")}return this.updateAriaLiveRegion("validation"),(i!==this._errors.length||JSON.stringify(a)!==JSON.stringify(this._errors))&&this.dispatchEvent(new CustomEvent("validation",{detail:{value:this._value,valid:this.valid,errors:this._errors,previousErrors:a,name:this._schema.name,previouslyValid:i===0,errorStateChanged:i===0!=(this._errors.length===0)},bubbles:!0})),this.valid}debouncedValidate(){this._validationTimer&&clearTimeout(this._validationTimer);const t=this._errors.length>0?150:300;this._validationTimer=setTimeout(()=>{const e=this.valid;this.validate(),this.updateErrorDisplay(),!e&&this.valid&&this.triggerSuccessAnimation()},t)}handleInput(t){this._value=t.target.value,this.updateLabelState(),this.debouncedValidate(),this.dispatchEvent(new CustomEvent("input",{detail:{value:this._value,valid:this.valid,errors:this._errors,name:this._schema.name},bubbles:!0}))}handleChange(t){this._value=t.target.value,this.updateLabelState(),this.validate(),this.dispatchEvent(new CustomEvent("change",{detail:{value:this._value,valid:this.valid,errors:this._errors,name:this._schema.name},bubbles:!0})),this.updateErrorDisplay()}handleBlur(t){this.validate(),this.updateErrorDisplay(),this.updateFocusState(!1),this.dispatchEvent(new CustomEvent("blur",{detail:{value:this._value,valid:this.valid,errors:this._errors,name:this._schema.name},bubbles:!0}))}handleFocus(t){this.updateFocusState(!0),this.dispatchEvent(new CustomEvent("focus",{detail:{value:this._value,valid:this.valid,errors:this._errors,name:this._schema.name},bubbles:!0}))}handleKeyDown(t){if(this._schema.disabled||this._schema.readonly){t.preventDefault();return}const e=this.shadowRoot.querySelector("input, textarea, select");if(e){if(t.key==="Escape"&&!this._schema.required){t.preventDefault();const i=this._value;e.value="",this._value="",this.validate(this._value,!1),this.updateErrorDisplay(),this.updateLabelState(),this.announceToScreenReader(`${this._schema.label||"Input"} cleared. Value changed from "${i}" to empty.`,"polite"),this.dispatchEvent(new CustomEvent("input",{detail:{value:this._value,oldValue:i,valid:this.valid,errors:this._errors,name:this._schema.name,action:"clear"},bubbles:!0}))}if(t.key==="Enter"&&this._schema.type!=="textarea"){const i=this.valid;if(this.validate(this._value,!0),this.valid)i||this.announceToScreenReader(`${this._schema.label||"Input"} is now valid. Form can be submitted.`,"polite");else{this.announceToScreenReader(`Form submission prevented. ${this._schema.label||"Input"} has error: ${this._errors[0]}`,"assertive"),t.preventDefault();return}this.dispatchEvent(new CustomEvent("submit",{detail:{value:this._value,valid:this.valid,errors:this._errors,name:this._schema.name,validationChanged:i!==this.valid},bubbles:!0}))}if(t.key==="Tab"&&(this._errors.length>0?setTimeout(()=>{this.announceToScreenReader(`${this._schema.label||"Input"} has validation error: ${this._errors[0]}. Please correct before continuing.`,"polite")},100):this._schema.helperText&&setTimeout(()=>{this.announceToScreenReader(`Leaving ${this._schema.label||"input"}. ${this._schema.helperText}`,"polite")},100)),t.key==="F1"){t.preventDefault();let i=`Help for ${this._schema.label||"input"}:`;this._schema.helperText&&(i+=` ${this._schema.helperText}.`),this._schema.required&&(i+=" This field is required."),this._schema.maxLength&&(i+=` Maximum ${this._schema.maxLength} characters.`),this._schema.pattern&&(i+=" Must match required format."),this.announceToScreenReader(i,"polite")}}}buildAriaDescribedBy(t){const e=[];t&&this._errors.length>0&&e.push(`${this._schema.name}-error`),this._schema.helperText&&!t&&e.push(`${this._schema.name}-helper`),this._schema.characterCount&&e.push(`${this._schema.name}-count`);const i=this.getAttribute("aria-describedby");return i&&!e.includes(i)&&e.push(i),e.join(" ")}updateFocusState(t){const e=this.shadowRoot.querySelector("input, textarea, select"),i=this.shadowRoot.querySelector(".input-container"),a=this.shadowRoot.querySelector(".label"),n=this.shadowRoot.querySelector(".leading-icon"),o=this.shadowRoot.querySelector(".trailing-icon");e&&i&&(t?(e.classList.add("focused"),i.classList.add("focused"),this.createRippleEffect(),a&&!a.classList.contains("over")&&(a.style.transform="translateY(-2px)"),n&&(n.style.transform="translateY(-50%) scale(1.1)"),o&&(o.style.transform="translateY(-50%) scale(1.1)")):(e.classList.remove("focused"),i.classList.remove("focused"),a&&!a.classList.contains("over")&&(a.style.transform=""),n&&(n.style.transform="translateY(-50%)"),o&&(o.style.transform="translateY(-50%)")))}createRippleEffect(){const t=this.shadowRoot.querySelector(".input-wrapper");if(!t)return;const e=t.querySelector(".focus-ripple");e&&e.remove();const i=document.createElement("div");i.className="focus-ripple",i.style.cssText=`
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background-color: var(--_input-outline-color-focus);
      opacity: 0.12;
      transform: scale(0.8);
      animation: focusRipple 0.6s var(--_input-motion-easing) forwards;
      pointer-events: none;
      z-index: 0;
    `,t.insertBefore(i,t.firstChild),setTimeout(()=>{i.parentNode&&i.remove()},600)}updateErrorDisplay(){const t=this.shadowRoot.querySelector(".error-message"),e=this.shadowRoot.querySelector(".helper-text"),i=this.shadowRoot.querySelector("input, textarea, select"),a=this.shadowRoot.querySelector(".input-container");if(this.shadowRoot.querySelector(".leading-icon"),this.shadowRoot.querySelector(".trailing-icon"),t&&i){const n=this._errors.length>0,o=a?a.classList.contains("has-error"):!1;if(n){t.textContent=this._errors[0],t.style.display="block",e&&this._schema.helperText&&(e.style.opacity="0",e.style.transform="translateY(-4px)"),i.setAttribute("aria-invalid","true"),i.setAttribute("aria-describedby",this.buildAriaDescribedBy(!0)),a&&(a.classList.add("has-error"),a.setAttribute("data-error-state","true"),o||this.triggerErrorAnimation()),this.classList.add("has-error"),this.setAttribute("aria-invalid","true");const r=this.shadowRoot.querySelector(".leading-icon"),s=this.shadowRoot.querySelector(".trailing-icon");r&&r.setAttribute("aria-hidden","false"),s&&s.setAttribute("aria-hidden","false")}else{t.style.display="none",e&&this._schema.helperText&&(e.style.opacity="1",e.style.transform="translateY(0)"),i.setAttribute("aria-invalid","false"),i.setAttribute("aria-describedby",this.buildAriaDescribedBy(!1)),a&&(a.classList.remove("has-error"),a.removeAttribute("data-error-state")),this.classList.remove("has-error"),this.removeAttribute("aria-invalid");const r=this.shadowRoot.querySelector(".leading-icon"),s=this.shadowRoot.querySelector(".trailing-icon");r&&r.setAttribute("aria-hidden","true"),s&&s.setAttribute("aria-hidden","true"),o&&this.triggerSuccessAnimation()}}}triggerErrorAnimation(){const t=this.shadowRoot.querySelector(".input-container"),e=this.shadowRoot.querySelector(".label.over");t&&(t.classList.remove("error-animation"),t.offsetHeight,t.classList.add("error-animation"),e&&e.classList.contains("floating")&&(e.classList.remove("error-shake"),e.offsetHeight,e.classList.add("error-shake"),setTimeout(()=>{e.classList.remove("error-shake")},300)),setTimeout(()=>{t.classList.remove("error-animation")},300),"vibrate"in navigator&&navigator.vibrate&&navigator.vibrate([50,30,50]))}triggerSuccessAnimation(){const t=this.shadowRoot.querySelector("input, textarea, select");t&&(t.classList.add("success-flash"),setTimeout(()=>{t.classList.remove("success-flash")},400))}attachEventListeners(){this.removeEventListeners();const t=this.shadowRoot.querySelector("input, textarea, select");if(!t)return;t.addEventListener("input",this.handleInput),t.addEventListener("change",this.handleChange),t.addEventListener("blur",this.handleBlur),t.addEventListener("focus",this.handleFocus),t.addEventListener("keydown",this.handleKeyDown);const e=this.shadowRoot.querySelector('slot[name="prefix"]'),i=this.shadowRoot.querySelector('slot[name="suffix"]');e&&e.addEventListener("slotchange",this.handleSlotChange.bind(this)),i&&i.addEventListener("slotchange",this.handleSlotChange.bind(this)),this._eventTargets=[{element:t,events:["input","change","blur","focus","keydown"]}],e&&this._eventTargets.push({element:e,events:["slotchange"]}),i&&this._eventTargets.push({element:i,events:["slotchange"]})}handleSlotChange(t){const e=t.target,i=e.getAttribute("name");this.updateSlotVisibility(),(i==="prefix"||i==="suffix")&&this.updateSlotAccessibility(e,i),this.updateInputPadding()}updateSlotAccessibility(t,e){const i=t.assignedElements();i.length!==0&&i.forEach(a=>{a.tagName==="MY-ICON"&&(a.setAttribute("aria-hidden","false"),a.hasAttribute("aria-label")||a.setAttribute("aria-label",`${e} icon`),(a.hasAttribute("onclick")||a.onclick)&&(a.setAttribute("interactive",""),a.setAttribute("role","button"),a.setAttribute("tabindex","0"))),a.tagName==="BUTTON"&&(a.hasAttribute("aria-label")||a.setAttribute("aria-label",`${e} button`),a.setAttribute("type","button")),(a.classList.contains("slot-text")||a.tagName==="SPAN")&&(a.setAttribute("aria-hidden","true"),a.setAttribute("role","presentation"))})}updateSlotVisibility(){const t=this.shadowRoot.querySelector(".input-field"),e=this.shadowRoot.querySelector('slot[name="prefix"]'),i=this.shadowRoot.querySelector('slot[name="suffix"]'),a=this.shadowRoot.querySelector(".input-container");if(!t||!a)return;const n=e&&e.assignedElements().length>0,o=i&&i.assignedElements().length>0,r=this._schema.leadingIcon,s=this._schema.trailingIcon;t.classList.toggle("has-prefix",n),t.classList.toggle("has-suffix",o),t.classList.toggle("has-leading-icon",r),t.classList.toggle("has-trailing-icon",s),a.classList.toggle("has-prefix",n),a.classList.toggle("has-suffix",o),a.classList.toggle("has-leading-icon",r),a.classList.toggle("has-trailing-icon",s),this.updateSlotAriaDescribedBy(n,o,e,i)}updateInputPadding(){const t=this.shadowRoot.querySelector(".input-field");if(!t)return;const e=this.shadowRoot.querySelector('slot[name="prefix"]'),i=this.shadowRoot.querySelector('slot[name="suffix"]'),a=e&&e.assignedElements().length>0,n=i&&i.assignedElements().length>0,o=this._schema.leadingIcon,r=this._schema.trailingIcon;let s="var(--_input-padding-x, var(--_input-padding-x-medium))",c="var(--_input-padding-x, var(--_input-padding-x-medium))";o&&(s="calc(var(--_input-padding-x, var(--_input-padding-x-medium)) + 32px)"),r&&(c="calc(var(--_input-padding-x, var(--_input-padding-x-medium)) + 32px)"),a&&!o&&(s="var(--_global-spacing-xs)"),n&&!r&&(c="var(--_global-spacing-xs)"),t.style.paddingLeft=s,t.style.paddingRight=c}updateSlotAriaDescribedBy(t,e,i,a){const n=[],o=this.buildAriaDescribedBy(this._errors.length>0);if(o&&n.push(o),t&&i){const s=i.assignedElements()[0];if(s){const c=`prefix-${this._schema.name}`;n.push(c);let l=this.shadowRoot.querySelector(`#${c}`);l||(l=document.createElement("span"),l.id=c,l.className="sr-only",i.parentElement.appendChild(l));const p=this.getSlotContentDescription(s,"prefix");l.textContent=`Prefix: ${p}`}}if(e&&a){const s=a.assignedElements()[0];if(s){const c=`suffix-${this._schema.name}`;n.push(c);let l=this.shadowRoot.querySelector(`#${c}`);l||(l=document.createElement("span"),l.id=c,l.className="sr-only",a.parentElement.appendChild(l));const p=this.getSlotContentDescription(s,"suffix");l.textContent=`Suffix: ${p}`}}const r=this.shadowRoot.querySelector(".input-field");r&&n.length>0&&r.setAttribute("aria-describedby",n.join(" "))}getSlotContentDescription(t,e){var i,a;return t.tagName==="MY-ICON"?t.getAttribute("aria-label")||t.getAttribute("icon")||`${e} icon`:t.tagName==="BUTTON"?t.getAttribute("aria-label")||((i=t.textContent)==null?void 0:i.trim())||`${e} button`:((a=t.textContent)==null?void 0:a.trim())||t.getAttribute("aria-label")||`${e} content`}removeEventListeners(){this._eventTargets&&(this._eventTargets.forEach(t=>{t.element.removeEventListener("input",this.handleInput),t.element.removeEventListener("change",this.handleChange),t.element.removeEventListener("blur",this.handleBlur),t.element.removeEventListener("focus",this.handleFocus),t.element.removeEventListener("keydown",this.handleKeyDown)}),this._eventTargets=null),this._validationTimer&&(clearTimeout(this._validationTimer),this._validationTimer=null)}disconnectedCallback(){this.removeEventListeners()}generateInputElement(){const{type:t,name:e,placeholder:i,value:a,disabled:n,readonly:o,label:r,helperText:s}=this._schema,c=`${e}-input`,l=this._errors.length>0;s&&s.trim(),this._schema.characterCount;const p=this.getAttribute("aria-label")||(this._schema.labelPosition==="over"&&!r?`${this._schema.type} input`:""),m=this.buildAriaDescribedBy(l),y=this.getAttribute("aria-invalid")||(l?"true":"false"),b=this._schema.required?"true":"false",h=this._schema.readonly?"true":"false",g=this._schema.labelPosition==="over"?"":i||r||`Enter ${this._schema.type==="email"?"email address":this._schema.type}`,v=`
      id="${c}"
      name="${e}"
      class="input-field"
      ${g?`placeholder="${g}"`:""}
      ${n?'disabled aria-disabled="true"':'aria-disabled="false"'}
      ${o?'readonly aria-readonly="'+h+'"':'aria-readonly="false"'}
      ${this._schema.required?'required aria-required="'+b+'"':'aria-required="'+b+'"'}
      ${this._schema.autocomplete?`autocomplete="${this._schema.autocomplete}"`:'autocomplete="off"'}
      ${p?`aria-label="${p}"`:""}
      ${m?`aria-describedby="${m}"`:""}
      aria-invalid="${y}"
      ${r?`aria-labelledby="${this._schema.name}-input-label"`:""}
      role="${this._schema.type==="email","textbox"}"
      ${this._schema.type==="password"?'aria-description="Password will be hidden"':""}
    `.trim();switch(t){case"textarea":return`<textarea ${v} 
          role="textbox" 
          aria-multiline="true"
          ${this._schema.minLength?`minlength="${this._schema.minLength}" aria-describedby="${m}"`:""}
          spellcheck="true"
          wrap="soft"
          aria-label="${p||r||"Textarea input"}"
          ${this._schema.maxLength?`aria-describedby="${m}" data-max-length="${this._schema.maxLength}"`:""}>${a}</textarea>`;case"select":const S=this._schema.options.map(x=>{const L=Array.isArray(a)?a.includes(x.value):a===x.value;return`<option value="${x.value}" ${L?"selected":""}>${x.label}</option>`}).join("");return`<select ${v} 
          role="combobox" 
          aria-expanded="false"
          aria-haspopup="listbox"
          ${this._schema.multiple?'multiple aria-multiselectable="true"':'aria-multiselectable="false"'}
          ${this._schema.multiple?'size="4"':""}
          aria-label="${p||r||"Select an option"}">
          ${!this._schema.multiple&&!a?`<option value="" disabled selected hidden>${g||"Select an option"}</option>`:""}
          ${S}
        </select>`;case"checkbox":return`<input type="checkbox" ${v} 
          ${a==="true"||a===!0||a==="on"?"checked":""}
          role="checkbox"
          aria-checked="${a==="true"||a===!0||a==="on"?"true":"false"}"
          aria-label="${p||r||"Checkbox input"}">`;case"radio":return`<input type="radio" ${v} 
          ${a==="true"||a===!0||a===this._schema.value?"checked":""}
          role="radio"
          aria-checked="${a==="true"||a===!0||a===this._schema.value?"true":"false"}"
          aria-label="${p||r||"Radio input"}">`;case"dynamic-select":return`<input type="text" ${v} 
          value="${a}"
          role="combobox"
          aria-expanded="false"
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-label="${p||r||"Dynamic select input"}"
          autocomplete="off"
          spellcheck="false">`;default:let _=t;t==="integer"&&(_="number"),t==="pattern"&&(_="text"),t==="date-of-birth"&&(_="date");const E=`
          type="${_}"
          value="${a}"
          ${this._schema.min!==void 0?`min="${this._schema.min}"`:""}
          ${this._schema.max!==void 0?`max="${this._schema.max}"`:""}
          ${this._schema.minLength?`minlength="${this._schema.minLength}"`:""}
          ${this._schema.maxLength?`maxlength="${this._schema.maxLength}"`:""}
          ${this._schema.pattern||t==="pattern"?`pattern="${this._schema.pattern||".*"}"`:""}
          ${this._schema.step||(t==="integer"||!1)?`step="${this._schema.step||(t==="integer"?"1":"")}"`:""}
          ${t==="email"?'spellcheck="false"':""}
          ${t==="password"?'spellcheck="false"':""}
          ${t==="url"?'spellcheck="false"':""}
          ${t==="pattern"?'spellcheck="false"':""}
          ${t==="integer"?'inputmode="numeric"':""}
        `.trim();let d="",u="";switch(t){case"email":d="textbox",u='inputmode="email"';break;case"tel":d="textbox",u='inputmode="tel"';break;case"url":d="textbox",u='inputmode="url"';break;case"search":d="searchbox",u='inputmode="search"';break;case"number":d="spinbutton",u=`inputmode="decimal" aria-valuemin="${this._schema.min||""}" aria-valuemax="${this._schema.max||""}" aria-valuenow="${a||""}"`;break;case"integer":d="spinbutton",u=`inputmode="numeric" aria-valuemin="${this._schema.min||""}" aria-valuemax="${this._schema.max||""}" aria-valuenow="${a||""}"`;break;case"pattern":d="textbox",u=`inputmode="text" aria-describedby="${m}" title="Input must match required pattern"`;break;case"date":d="textbox",u='aria-label="Date input"';break;case"datetime-local":d="textbox",u='aria-label="Date and time input"';break;case"time":d="textbox",u='aria-label="Time input"';break;case"date-of-birth":d="textbox",u='inputmode="numeric" aria-label="Date of birth input"';break;case"checkbox":d="checkbox",u=`aria-checked="${a==="true"||a===!0?"true":"false"}"`;break;case"radio":d="radio",u=`aria-checked="${a==="true"||a===!0?"true":"false"}"`;break;case"password":u='autocomplete="current-password"';break;default:t==="text"&&(u='inputmode="text"')}return`<input ${v} ${E} 
          ${d?`role="${d}"`:'role="textbox"'}
          ${u}
          ${t==="password"?'aria-autocomplete="off"':""}
          ${t==="search"?'aria-label="Search input"':""}
          ${this._schema.pattern?`aria-describedby="${m}" title="Input must match required format"`:""}>`}}render(){const{label:t,labelPosition:e}=this._schema;this.shadowRoot.innerHTML=`
      <style>
        :host {
          /* Enhanced Material Design 3 Input Token System with better semantic naming */
          --_input-height-small: var(--_global-component-height-sm);
          --_input-height-medium: var(--_global-component-height-md);
          --_input-height-large: var(--_global-component-height-lg);
          --_input-height: var(--_input-height-medium);
          
          /* Enhanced spacing tokens aligned with global system */
          --_input-padding-x-small: var(--_global-spacing-sm);
          --_input-padding-x-medium: var(--_global-spacing-md);
          --_input-padding-x-large: var(--_global-spacing-lg);
          --_input-padding-y-small: var(--_global-spacing-xs);
          --_input-padding-y-medium: var(--_global-spacing-sm);
          --_input-padding-y-large: var(--_global-spacing-md);
          --_input-gap: var(--_global-spacing-sm);
          
          /* Enhanced Material Design 3 color tokens with better visual hierarchy */
          /* Outlined variant colors with subtle background enhancements */
          --_input-outlined-outline-color: var(--_global-color-outline-variant);
          --_input-outlined-outline-color-focus: var(--_global-color-primary);
          --_input-outlined-outline-color-error: var(--_global-color-error);
          --_input-outlined-outline-color-hover: var(--_global-color-outline);
          --_input-outlined-outline-color-disabled: var(--_global-color-outline-variant);
          --_input-outlined-container-color: var(--_global-color-surface);
          --_input-outlined-container-color-hover: var(--_global-color-surface-container-low);
          --_input-outlined-container-color-focus: var(--_global-color-surface-container-lowest);
          
          /* Filled variant colors with enhanced visual depth */
          --_input-filled-container-color: var(--_global-color-surface-container-highest);
          --_input-filled-container-color-hover: var(--_global-color-surface-container-high);
          --_input-filled-container-color-focus: var(--_global-color-surface-container);
          --_input-filled-container-color-disabled: var(--_global-color-surface-variant);
          --_input-filled-active-indicator-color: var(--_global-color-primary);
          --_input-filled-active-indicator-color-error: var(--_global-color-error);
          --_input-filled-active-indicator-height: 1px;
          --_input-filled-active-indicator-height-focus: 2px;
          
          /* Enhanced text colors with better contrast */
          --_input-text-color: var(--_global-color-on-surface);
          --_input-text-color-disabled: color-mix(in srgb, var(--_global-color-on-surface) 38%, transparent);
          --_input-placeholder-color: color-mix(in srgb, var(--_global-color-on-surface) 60%, transparent);
          --_input-label-color: var(--_global-color-on-surface-variant);
          --_input-label-color-focus: var(--_global-color-primary);
          --_input-label-color-error: var(--_global-color-error);
          --_input-label-color-disabled: color-mix(in srgb, var(--_global-color-on-surface) 38%, transparent);
          --_input-label-color-hover: color-mix(in srgb, var(--_global-color-on-surface) 87%, transparent);
          
          /* Enhanced supporting text colors with proper hierarchy */
          --_input-supporting-text-color: color-mix(in srgb, var(--_global-color-on-surface) 65%, transparent);
          --_input-supporting-text-color-error: var(--_global-color-error);
          --_input-supporting-text-color-disabled: color-mix(in srgb, var(--_global-color-on-surface) 38%, transparent);
          --_input-supporting-text-color-success: var(--_global-color-success, #4caf50);
          
          /* Enhanced icon colors with better visual hierarchy */
          --_input-leading-icon-color: color-mix(in srgb, var(--_global-color-on-surface) 65%, transparent);
          --_input-trailing-icon-color: color-mix(in srgb, var(--_global-color-on-surface) 65%, transparent);
          --_input-icon-color-hover: color-mix(in srgb, var(--_global-color-on-surface) 80%, transparent);
          --_input-icon-color-focus: var(--_global-color-primary);
          --_input-icon-color-error: var(--_global-color-error);
          --_input-icon-color-disabled: color-mix(in srgb, var(--_global-color-on-surface) 38%, transparent);
          --_input-icon-color-success: var(--_global-color-success, #4caf50);
          
          /* Enhanced shape system with more polished borders */
          --_input-container-shape-small: var(--_global-border-radius-xs);
          --_input-container-shape-medium: var(--_global-border-radius-sm);
          --_input-container-shape-large: var(--_global-border-radius-md);
          --_input-container-shape: var(--_input-container-shape-medium);
          --_input-state-layer-shape: var(--_global-border-radius-full);
          --_input-container-shape-top: var(--_input-container-shape) var(--_input-container-shape) 0 0;
          
          /* Enhanced Material Design 3 state layer system */
          --_input-state-layer-color: var(--_global-color-on-surface);
          --_input-state-layer-opacity-hover: var(--_global-state-layer-hover);
          --_input-state-layer-opacity-focus: var(--_global-state-layer-focus);
          --_input-state-layer-opacity-pressed: var(--_global-state-layer-pressed);
          
          /* Enhanced animation tokens with micro-interactions */
          --_input-motion-duration-short: var(--_global-interaction-feedback-duration);
          --_input-motion-duration-medium: var(--_global-motion-duration-medium2);
          --_input-motion-duration-long: var(--_global-motion-duration-long1);
          --_input-motion-easing: var(--_global-interaction-feedback-easing);
          --_input-motion-easing-decelerate: var(--_global-motion-easing-decelerate);
          --_input-motion-easing-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
          --_input-motion-easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
          
          /* Enhanced elevation system with better focus states */
          --_input-container-elevation: var(--_global-elevation-0);
          --_input-container-elevation-hover: var(--_global-elevation-1);
          --_input-container-elevation-focus: 0 0 0 1px var(--_global-color-primary), var(--_global-elevation-2);
          --_input-container-elevation-filled: 0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.12);
          --_input-container-elevation-filled-hover: 0 2px 6px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.16);
          --_input-container-elevation-filled-focus: 0 0 0 1px var(--_global-color-primary), 0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
          
          /* Focus ring system */
          --_input-focus-ring: var(--_global-focus-ring-width) var(--_global-focus-ring-style) var(--_global-focus-ring-color);
          --_input-focus-ring-offset: var(--_global-focus-ring-offset);
          --_input-focus-ring-error: var(--_global-focus-ring-width) var(--_global-focus-ring-style) var(--_global-color-error);
          
          display: block;
          width: 100%;
          position: relative;
          font-family: var(--_global-font-family-sans);
          contain: layout style;
          isolation: isolate;
        }

        /* Size variants with consistent shape system */
        :host([size="small"]) {
          --_input-height: var(--_input-height-small);
          --_input-padding-x: var(--_input-padding-x-small);
          --_input-padding-y: var(--_input-padding-y-small);
          --_input-container-shape: var(--_input-container-shape-small);
          --_input-container-shape-top: var(--_input-container-shape-small) var(--_input-container-shape-small) 0 0;
          font-size: var(--_global-font-size-sm);
        }
        
        :host([size="large"]) {
          --_input-height: var(--_input-height-large);
          --_input-padding-x: var(--_input-padding-x-large);
          --_input-padding-y: var(--_input-padding-y-large);
          --_input-container-shape: var(--_input-container-shape-large);
          --_input-container-shape-top: var(--_input-container-shape-large) var(--_input-container-shape-large) 0 0;
          font-size: var(--_global-font-size-lg);
        }
        
        /* Variant styles with consistent elevation */
        :host([variant="outlined"]),
        :host(:not([variant])) {
          --_input-container-color: var(--_input-outlined-container-color);
          --_input-container-color-hover: var(--_input-outlined-container-color-hover);
          --_input-container-color-focus: var(--_input-outlined-container-color-focus);
          --_input-outline-color: var(--_input-outlined-outline-color);
        }
        
        :host([variant="filled"]) {
          --_input-container-color: var(--_input-filled-container-color);
          --_input-container-color-hover: var(--_input-filled-container-color-hover);
          --_input-container-color-focus: var(--_input-filled-container-color-focus);
          --_input-container-color-disabled: var(--_input-filled-container-color-disabled);
          --_input-container-elevation: var(--_input-container-elevation-filled);
          --_input-container-elevation-hover: var(--_input-container-elevation-filled-hover);
          --_input-container-elevation-focus: var(--_input-container-elevation-filled-focus);
        }
        
        /* Host state management */
        :host(:focus-within) {
          --_input-outline-color: var(--_input-outline-color-focus);
          --_input-label-color: var(--_input-label-color-focus);
        }
        
        :host([disabled]) {
          pointer-events: none;
          cursor: not-allowed;
          --_input-text-color: var(--_input-text-color-disabled);
          --_input-outline-color: var(--_input-outline-color-disabled);
        }
        
        :host(.has-error) {
          --_input-outline-color: var(--_input-outline-color-error);
          --_input-label-color: var(--_input-label-color-error);
        }

        .input-container {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: var(--_global-spacing-xs);
          isolation: isolate;
        }

        .input-container.label-left {
          flex-direction: row;
          align-items: flex-start;
          gap: var(--_global-spacing-md);
        }

        .input-container.label-over {
          position: relative;
        }
        
        /* Enhanced Material Design 3 variant system */
        .input-container.variant-filled .input-field {
          background-color: var(--_input-filled-container-color);
          border: none;
          border-bottom: var(--_input-filled-active-indicator-height) solid var(--_input-outlined-outline-color);
          border-radius: var(--_input-container-shape-top);
          box-shadow: var(--_input-container-elevation-filled);
          position: relative;
          backdrop-filter: blur(0.5px);
        }
        
        /* Filled variant active indicator */
        .input-container.variant-filled .input-field::after {
          content: '';
          position: absolute;
          bottom: calc(-1 * var(--_input-filled-active-indicator-height));
          left: 0;
          right: 0;
          height: var(--_input-filled-active-indicator-height-focus);
          background-color: var(--_input-filled-active-indicator-color);
          border-radius: 0 0 var(--_input-container-shape) var(--_input-container-shape);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform var(--_input-motion-duration-short) var(--_input-motion-easing);
        }
        
        .input-container.variant-outlined .input-field {
          background-color: var(--_input-outlined-container-color);
          border: 1px solid var(--_input-outlined-outline-color);
          border-radius: var(--_input-container-shape);
          box-shadow: var(--_input-container-elevation);
          position: relative;
          backdrop-filter: blur(0.5px);
        }

        .label {
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-medium);
          color: var(--_input-label-color);
          line-height: var(--_global-line-height-tight);
          transition: color var(--_input-motion-duration-short) var(--_input-motion-easing),
                      transform var(--_input-motion-duration-short) var(--_input-motion-easing-spring);
          display: block;
          margin-bottom: var(--_global-spacing-xs);
          user-select: none;
          letter-spacing: 0.01em;
        }

        .label.required::after {
          content: ' *';
          color: var(--_input-label-color-error);
          font-weight: var(--_global-font-weight-bold);
          margin-left: 1px;
          filter: drop-shadow(0 0.5px 1px rgba(0, 0, 0, 0.1));
        }

        .label.over {
          position: absolute;
          top: 50%;
          left: var(--_input-padding-x, var(--_input-padding-x-medium));
          transform: translateY(-50%);
          background-color: transparent;
          padding: 0 var(--_global-spacing-xs);
          transition: all var(--_input-motion-duration-medium) var(--_input-motion-easing);
          pointer-events: none;
          z-index: 10;
          margin-bottom: 0;
          border-radius: var(--_global-border-radius-xs);
          transform-origin: left center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: calc(100% - 2 * var(--_input-padding-x, var(--_input-padding-x-medium)));
          backdrop-filter: blur(8px);
        }
        
        /* Floating label background for outlined variant with smooth backdrop */
        :host([variant="outlined"]) .label.over {
          background-color: var(--_global-color-surface);
          box-shadow: 0 0 0 2px var(--_global-color-surface);
          border-radius: var(--_global-border-radius-xs);
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: stretch;
          flex: 1;
          background-color: inherit;
          border-radius: inherit;
          overflow: hidden;
        }
        
        .input-content {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 0;
        }

        .input-field {
          width: 100%;
          height: var(--_input-height);
          padding: var(--_input-padding-y, var(--_input-padding-y-medium)) var(--_input-padding-x, var(--_input-padding-x-medium));
          border: 1px solid var(--_input-outline-color);
          border-radius: var(--_input-container-shape);
          background-color: var(--_input-container-color, var(--_global-color-surface));
          color: var(--_input-text-color);
          font-size: inherit;
          font-family: inherit;
          font-weight: var(--_global-font-weight-normal);
          line-height: var(--_global-line-height-normal);
          transition: all var(--_input-motion-duration-short) var(--_input-motion-easing),
                      border-color var(--_input-motion-duration-short) var(--_input-motion-easing),
                      box-shadow var(--_input-motion-duration-short) var(--_input-motion-easing),
                      transform var(--_input-motion-duration-short) var(--_input-motion-easing-spring),
                      background-color var(--_input-motion-duration-medium) var(--_input-motion-easing);
          outline: none;
          box-shadow: var(--_input-container-elevation);
          position: relative;
          z-index: 1;
          appearance: none;
          resize: none;
          box-sizing: border-box;
          will-change: transform, box-shadow, background-color;
        }
        
        /* Adjust padding when icons are present */
        .input-field.has-leading-icon {
          padding-left: calc(var(--_input-padding-x, var(--_input-padding-x-medium)) + 24px + var(--_global-spacing-sm));
        }
        
        .input-field.has-trailing-icon {
          padding-right: calc(var(--_input-padding-x, var(--_input-padding-x-medium)) + 24px + var(--_global-spacing-sm));
        }
        
        /* Enhanced Material Design 3 State Layer System */
        .input-field::before {
          content: '';
          position: absolute;
          inset: 0;
          background-color: var(--_input-state-layer-color);
          opacity: 0;
          transition: opacity var(--_input-motion-duration-short) var(--_input-motion-easing);
          pointer-events: none;
          border-radius: inherit;
          z-index: -1;
        }
        
        /* State layer for interactive elements within input */
        .leading-icon,
        .trailing-icon {
          position: relative;
        }
        
        .leading-icon::before,
        .trailing-icon::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 40px;
          height: 40px;
          border-radius: var(--_input-state-layer-shape);
          background-color: var(--_input-state-layer-color);
          opacity: 0;
          transform: translate(-50%, -50%);
          transition: opacity var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
          pointer-events: none;
          z-index: -1;
        }

        .input-field::placeholder {
          color: var(--_input-placeholder-color);
          opacity: 1;
          transition: opacity var(--_input-motion-duration-short) var(--_input-motion-easing),
                      color var(--_input-motion-duration-short) var(--_input-motion-easing);
          font-style: normal;
          letter-spacing: 0.01em;
        }
        
        /* Hide placeholder when floating label is present */
        :host([label-position="over"]) .input-field::placeholder {
          opacity: 0;
        }
        
        /* Show placeholder only when focused and no floating label conflict */
        :host([label-position="over"]) .input-field:focus::placeholder {
          opacity: 0.6;
          color: color-mix(in srgb, var(--_input-placeholder-color) 80%, transparent);
          transition-delay: var(--_input-motion-duration-medium);
        }
        
        /* Enhanced label hover states */
        .label:not(.over):hover {
          color: var(--_input-label-color-hover);
          transform: translateY(-1px);
          transition: all var(--_input-motion-duration-short) var(--_input-motion-easing-spring);
        }

        /* Enhanced hover states with consistent patterns */
        .input-field:hover:not(:disabled):not(:focus) {
          transform: translateY(-0.5px);
          transition: all var(--_input-motion-duration-short) var(--_input-motion-easing);
        }
        
        .input-container.variant-outlined .input-field:hover:not(:disabled):not(:focus) {
          border-color: var(--_input-outlined-outline-color-hover);
          background-color: var(--_input-outlined-container-color-hover);
          box-shadow: var(--_input-container-elevation-hover);
        }
        
        .input-container.variant-filled .input-field:hover:not(:disabled):not(:focus) {
          background-color: var(--_input-filled-container-color-hover);
          box-shadow: var(--_input-container-elevation-filled-hover);
        }
        
        .input-field:hover:not(:disabled):not(:focus)::before {
          opacity: var(--_input-state-layer-opacity-hover);
        }
        
        /* Enhanced icon hover states with color transitions */
        .leading-icon:hover,
        .trailing-icon:hover {
          color: var(--_input-icon-color-hover);
          transform: translateY(-50%) scale(1.05);
          transition: all var(--_input-motion-duration-short) var(--_input-motion-easing-spring);
        }
        
        .leading-icon:hover::before,
        .trailing-icon:hover::before {
          opacity: var(--_input-state-layer-opacity-hover);
        }

        /* Enhanced Material Design 3 focus states with proper variant support */
        .input-field:focus,
        .input-field.focused {
          outline: none;
          transition: all var(--_input-motion-duration-short) var(--_input-motion-easing);
        }
        
        /* Outlined variant focus */
        .input-container.variant-outlined .input-field:focus,
        .input-container.variant-outlined .input-field.focused {
          border-color: var(--_input-outlined-outline-color-focus);
          border-width: 2px;
          background-color: var(--_input-outlined-container-color-focus);
          box-shadow: var(--_input-container-elevation-focus);
          transform: translateY(-1px);
        }
        
        /* Filled variant focus */
        .input-container.variant-filled .input-field:focus,
        .input-container.variant-filled .input-field.focused {
          background-color: var(--_input-filled-container-color-focus);
          border-bottom-color: var(--_input-filled-active-indicator-color);
          border-bottom-width: var(--_input-filled-active-indicator-height-focus);
          box-shadow: var(--_input-container-elevation-filled-focus);
          transform: translateY(-1px);
        }
        
        .input-container.variant-filled .input-field:focus::after,
        .input-container.variant-filled .input-field.focused::after {
          transform: scaleX(1);
        }
        
        .input-field:focus::before,
        .input-field.focused::before {
          opacity: var(--_input-state-layer-opacity-focus);
        }
        
        /* Enhanced focus ring for accessibility */
        .input-field:focus-visible {
          outline: var(--_input-focus-ring);
          outline-offset: var(--_input-focus-ring-offset);
        }

        /* Enhanced container focus states with icon animations */
        .input-container.focused .label:not(.over) {
          color: var(--_input-label-color-focus);
          transform: translateY(-1px) scale(1.02);
          transition: all var(--_input-motion-duration-short) var(--_input-motion-easing-spring);
          text-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.1);
        }
        
        .input-container.focused .leading-icon,
        .input-container.focused .trailing-icon {
          color: var(--_input-icon-color-focus);
          transform: translateY(-50%) scale(1.05);
          transition: all var(--_input-motion-duration-short) var(--_input-motion-easing-spring);
          filter: brightness(1.1) saturate(1.2);
        }
        
        /* Enhanced focus states for icons */
        .leading-icon:focus::before,
        .trailing-icon:focus::before {
          opacity: var(--_input-state-layer-opacity-focus);
        }

        /* Enhanced filled variant focus with active indicator */
        :host([variant="filled"]) .input-field:focus,
        :host([variant="filled"]) .input-field.focused {
          border-bottom-width: var(--_input-filled-active-indicator-height-focus);
          border-bottom-color: var(--_input-filled-active-indicator-color);
        }
        
        :host([variant="filled"]) .input-field:focus::after,
        :host([variant="filled"]) .input-field.focused::after {
          transform: scaleX(1);
          background-color: var(--_input-filled-active-indicator-color);
        }

        /* Enhanced disabled state */
        .input-field:disabled {
          opacity: var(--_global-opacity-disabled);
          cursor: not-allowed;
          background-color: var(--_input-container-color-disabled, var(--_global-color-surface-variant));
          color: var(--_input-text-color-disabled);
          border-color: var(--_input-outline-color-disabled);
        }

        .input-field:disabled::placeholder {
          color: var(--_input-text-color-disabled);
        }
        
        :host([disabled]) .label {
          color: var(--_input-text-color-disabled);
        }
        
        :host([disabled]) .leading-icon,
        :host([disabled]) .trailing-icon {
          color: var(--_input-icon-color-disabled);
        }

        /* Host-level disabled state with enhanced visual feedback */
        :host([disabled]) {
          pointer-events: none;
          cursor: not-allowed;
          filter: grayscale(0.3);
        }

        :host([disabled]) .input-container {
          opacity: var(--_global-opacity-disabled);
          transform: scale(0.99);
        }

        /* Enhanced Material Design 3 error states */
        .input-field.error,
        .input-container.has-error .input-field {
          transition: all var(--_input-motion-duration-short) var(--_input-motion-easing);
        }
        
        /* Outlined variant error states */
        .input-container.variant-outlined.has-error .input-field {
          border-color: var(--_input-outlined-outline-color-error);
          background-color: color-mix(in srgb, var(--_input-outlined-outline-color-error) 4%, transparent);
        }
        
        .input-container.variant-outlined.has-error .input-field:focus {
          border-color: var(--_input-outlined-outline-color-error);
          border-width: 2px;
          box-shadow: 0 0 0 1px var(--_input-outlined-outline-color-error);
        }
        
        /* Filled variant error states */
        .input-container.variant-filled.has-error .input-field {
          background-color: color-mix(in srgb, var(--_input-outlined-outline-color-error) 4%, var(--_input-filled-container-color));
          border-bottom-color: var(--_input-filled-active-indicator-color-error);
        }
        
        .input-container.variant-filled.has-error .input-field:focus {
          border-bottom-color: var(--_input-filled-active-indicator-color-error);
          border-bottom-width: var(--_input-filled-active-indicator-height-focus);
        }
        
        .input-container.variant-filled.has-error .input-field::after {
          background-color: var(--_input-filled-active-indicator-color-error);
        }
        
        /* Enhanced error focus ring */
        .input-container.has-error .input-field:focus-visible {
          outline: var(--_input-focus-ring-error);
          outline-offset: var(--_input-focus-ring-offset);
        }

        /* Enhanced error state for container with variant support */
        .input-container.has-error {
          --_input-label-color: var(--_input-label-color-error);
          --_input-supporting-text-color: var(--_input-supporting-text-color-error);
        }
        
        .input-container.variant-outlined.has-error {
          --_input-outlined-outline-color: var(--_input-outlined-outline-color-error);
          --_input-outlined-outline-color-hover: var(--_input-outlined-outline-color-error);
          --_input-outlined-outline-color-focus: var(--_input-outlined-outline-color-error);
        }
        
        .input-container.variant-filled.has-error {
          --_input-filled-active-indicator-color: var(--_input-filled-active-indicator-color-error);
        }
        
        .input-container.has-error .leading-icon,
        .input-container.has-error .trailing-icon {
          color: var(--_input-icon-color-error);
          transform: translateY(-50%) scale(1.02);
        }
        
        /* Enhanced error animations with spring physics */
        .input-container.has-error .leading-icon,
        .input-container.has-error .trailing-icon {
          animation: iconErrorPulse var(--_input-motion-duration-medium) var(--_input-motion-easing-bounce);
          filter: drop-shadow(0 0 2px var(--_input-icon-color-error));
        }
        
        @keyframes iconErrorPulse {
          0% {
            transform: translateY(-50%) scale(1);
          }
          30% {
            transform: translateY(-50%) scale(1.15) rotate(2deg);
          }
          60% {
            transform: translateY(-50%) scale(0.95) rotate(-1deg);
          }
          100% {
            transform: translateY(-50%) scale(1.02) rotate(0deg);
          }
        }

        /* Enhanced error animations with better spring motion */
        .input-container.error-animation .input-field {
          animation: inputErrorShake var(--_input-motion-duration-long) var(--_input-motion-easing-bounce);
        }
        
        .input-container.error-animation {
          animation: containerErrorPulse var(--_input-motion-duration-long) var(--_input-motion-easing-spring);
        }

        @keyframes inputErrorShake {
          0%, 100% { transform: translateX(0) translateY(0); }
          10% { transform: translateX(-4px) translateY(-1px); }
          20% { transform: translateX(4px) translateY(1px); }
          30% { transform: translateX(-3px) translateY(-0.5px); }
          40% { transform: translateX(3px) translateY(0.5px); }
          50% { transform: translateX(-2px) translateY(-0.25px); }
          60% { transform: translateX(2px) translateY(0.25px); }
          70% { transform: translateX(-1px) translateY(0); }
          80% { transform: translateX(1px) translateY(0); }
        }
        
        @keyframes containerErrorPulse {
          0% { transform: scale(1); }
          25% { transform: scale(1.03); }
          50% { transform: scale(0.98); }
          75% { transform: scale(1.01); }
          100% { transform: scale(1); }
        }
        
        /* Success flash animation with enhanced visual feedback */
        .input-field.success-flash {
          animation: successFlash var(--_input-motion-duration-long) var(--_input-motion-easing-spring);
        }
        
        @keyframes successFlash {
          0% {
            border-color: var(--_input-outline-color);
            background-color: var(--_input-container-color, var(--_global-color-surface));
            box-shadow: var(--_input-container-elevation);
            transform: scale(1);
          }
          30% {
            border-color: var(--_global-color-success);
            background-color: color-mix(in srgb, var(--_global-color-success) 12%, transparent);
            box-shadow: 0 0 0 2px color-mix(in srgb, var(--_global-color-success) 20%, transparent), var(--_input-container-elevation-hover);
            transform: scale(1.02);
          }
          70% {
            border-color: var(--_global-color-success);
            background-color: color-mix(in srgb, var(--_global-color-success) 6%, transparent);
            box-shadow: 0 0 0 1px color-mix(in srgb, var(--_global-color-success) 10%, transparent), var(--_input-container-elevation);
            transform: scale(1.01);
          }
          100% {
            border-color: var(--_input-outline-color);
            background-color: var(--_input-container-color, var(--_global-color-surface));
            box-shadow: var(--_input-container-elevation);
            transform: scale(1);
          }
        }
        
        @keyframes focusRipple {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            opacity: 0.12;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        
        /* Enhanced micro-interactions */
        .input-field {
          will-change: border-color, box-shadow, background-color;
        }
        
        .leading-icon,
        .trailing-icon {
          will-change: color, transform;
          transition: color var(--_input-motion-duration-short) var(--_input-motion-easing),
                      transform var(--_input-motion-duration-short) var(--_input-motion-easing);
        }
        
        .label:not(.over) {
          will-change: color, transform;
          transition: color var(--_input-motion-duration-short) var(--_input-motion-easing),
                      transform var(--_input-motion-duration-short) var(--_input-motion-easing);
        }

        /* Textarea specific styling */
        textarea.input-field {
          height: auto;
          min-height: calc(var(--_input-height) * 2);
          max-height: calc(var(--_input-height) * 4);
          resize: vertical;
          line-height: var(--_global-line-height-normal);
          padding-top: var(--_input-padding-y, var(--_input-padding-y-medium));
          padding-bottom: var(--_input-padding-y, var(--_input-padding-y-medium));
        }

        /* Select specific styling */
        select.input-field {
          cursor: pointer;
          background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTEuNSA1LjI1TDcgOS43NUwyLjUgNS4yNSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=');
          background-repeat: no-repeat;
          background-position: right var(--_input-padding-x, var(--_input-padding-x-medium)) center;
          background-size: 16px;
          padding-right: calc(var(--_input-padding-x, var(--_input-padding-x-medium)) + 24px);
        }
        
        select.input-field:focus {
          background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMi41IDguNzVMNyA0LjI1TDExLjUgOC43NSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=');
        }

        /* Enhanced icon styling with Material Design 3 principles */
        .leading-icon,
        .trailing-icon {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--_input-leading-icon-color);
          pointer-events: auto;
          z-index: 2;
          transition: color var(--_input-motion-duration-short) var(--_input-motion-easing),
                      transform var(--_input-motion-duration-short) var(--_input-motion-easing);
          cursor: pointer;
          border-radius: var(--_input-state-layer-shape);
          min-width: 40px;
          min-height: 40px;
        }
        
        .leading-icon {
          left: var(--_global-spacing-xs);
          color: var(--_input-leading-icon-color);
        }
        
        .trailing-icon {
          right: var(--_global-spacing-xs);
          color: var(--_input-trailing-icon-color);
        }
        
        /* Enhanced icon integration with my-icon component */
        .leading-icon my-icon,
        .trailing-icon my-icon,
        .leading-icon ::slotted(my-icon),
        .trailing-icon ::slotted(my-icon) {
          width: 20px;
          height: 20px;
          color: inherit;
          --_icon-size: 20px;
          --_icon-color: inherit;
        }
        
        /* Icon interactive states */
        .leading-icon:hover,
        .trailing-icon:hover {
          transform: translateY(-50%) scale(1.05);
        }
        
        .leading-icon:active,
        .trailing-icon:active {
          transform: translateY(-50%) scale(0.95);
        }
        
        /* Enhanced Material Design 3 Prefix/Suffix slot styling */
        .prefix-slot,
        .suffix-slot {
          display: none;
          align-items: center;
          justify-content: center;
          min-height: var(--_input-height);
          padding: 0 var(--_global-spacing-sm);
          color: var(--_input-supporting-text-color);
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-medium);
          white-space: nowrap;
          user-select: none;
          background-color: var(--_global-color-surface-container-low);
          border: 1px solid var(--_input-outlined-outline-color);
          transition: all var(--_input-motion-duration-short) var(--_input-motion-easing);
          position: relative;
          z-index: 1;
          gap: var(--_input-gap);
        }
        
        .prefix-slot:not(:empty),
        .suffix-slot:not(:empty) {
          display: flex;
        }
        
        /* Enhanced slot state layer */
        .prefix-slot::before,
        .suffix-slot::before {
          content: '';
          position: absolute;
          inset: 0;
          background-color: var(--_input-state-layer-color);
          opacity: 0;
          transition: opacity var(--_global-motion-duration-short1) var(--_global-motion-easing-standard);
          pointer-events: none;
          border-radius: inherit;
          z-index: -1;
        }
        
        /* Prefix slot styling */
        .prefix-slot {
          border-right: none;
          border-radius: var(--_input-container-shape) 0 0 var(--_input-container-shape);
          margin-right: 0;
        }
        
        /* Suffix slot styling */
        .suffix-slot {
          border-left: none;
          border-radius: 0 var(--_input-container-shape) var(--_input-container-shape) 0;
          margin-left: 0;
        }
        
        /* Input field adjustments when slots are present */
        .input-field.has-prefix {
          border-left: none;
          border-radius: 0;
          padding-left: var(--_input-padding-x, var(--_input-padding-x-medium));
        }
        
        .input-field.has-suffix {
          border-right: none;
          border-radius: 0;
          padding-right: var(--_input-padding-x, var(--_input-padding-x-medium));
        }
        
        .input-field.has-prefix.has-suffix {
          border-radius: 0;
        }
        
        .input-field.has-prefix:not(.has-suffix) {
          border-radius: 0 var(--_input-container-shape) var(--_input-container-shape) 0;
        }
        
        .input-field.has-suffix:not(.has-prefix) {
          border-radius: var(--_input-container-shape) 0 0 var(--_input-container-shape);
        }
        
        /* Enhanced filled variant adjustments */
        :host([variant="filled"]) .prefix-slot,
        :host([variant="filled"]) .suffix-slot {
          background-color: var(--_input-filled-container-color);
          border-bottom: var(--_input-filled-active-indicator-height) solid var(--_input-outlined-outline-color);
          border-top: none;
          border-radius: var(--_input-container-shape) var(--_input-container-shape) 0 0;
        }
        
        :host([variant="filled"]) .prefix-slot {
          border-left: none;
          border-right: none;
        }
        
        :host([variant="filled"]) .suffix-slot {
          border-right: none;
          border-left: none;
        }
        
        /* Filled variant hover states */
        :host([variant="filled"]) .prefix-slot:hover,
        :host([variant="filled"]) .suffix-slot:hover {
          background-color: var(--_input-filled-container-color-hover);
        }
        
        /* Filled variant focus states */
        :host([variant="filled"]) .input-wrapper:focus-within .prefix-slot,
        :host([variant="filled"]) .input-wrapper:focus-within .suffix-slot {
          background-color: var(--_input-filled-container-color-focus);
          border-bottom-color: var(--_input-filled-active-indicator-color);
          border-bottom-width: var(--_input-filled-active-indicator-height-focus);
        }
        
        /* Enhanced hover states for slots with state layers */
        .prefix-slot:hover,
        .suffix-slot:hover {
          border-color: var(--_input-outlined-outline-color-hover);
        }
        
        .prefix-slot:hover::before,
        .suffix-slot:hover::before {
          opacity: var(--_input-state-layer-opacity-hover);
        }
        
        /* Enhanced focus states for slots */
        .input-wrapper:focus-within .prefix-slot,
        .input-wrapper:focus-within .suffix-slot {
          border-color: var(--_input-outlined-outline-color-focus);
        }
        
        .input-wrapper:focus-within .prefix-slot::before,
        .input-wrapper:focus-within .suffix-slot::before {
          opacity: var(--_input-state-layer-opacity-focus);
        }
        
        /* Enhanced error states for slots */
        .input-container.has-error .prefix-slot,
        .input-container.has-error .suffix-slot {
          border-color: var(--_input-outlined-outline-color-error);
        }
        
        .input-container.has-error .prefix-slot::before,
        .input-container.has-error .suffix-slot::before {
          background-color: var(--_input-outlined-outline-color-error);
          opacity: 0.04;
        }
        
        .input-container.has-error .prefix-slot ::slotted(my-icon),
        .input-container.has-error .suffix-slot ::slotted(my-icon) {
          --_icon-color: var(--_input-icon-color-error);
        }
        
        /* Disabled states for slots */
        :host([disabled]) .prefix-slot,
        :host([disabled]) .suffix-slot {
          opacity: var(--_global-opacity-disabled);
          background-color: var(--_global-color-surface-variant);
          color: var(--_input-text-color-disabled);
        }
        
        /* Enhanced slot content styling with my-icon integration */
        .prefix-slot ::slotted(*),
        .suffix-slot ::slotted(*) {
          color: inherit;
          font-size: inherit;
          display: flex;
          align-items: center;
          gap: var(--_input-gap);
        }
        
        .prefix-slot ::slotted(my-icon),
        .suffix-slot ::slotted(my-icon) {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          --_icon-size: 20px;
          --_icon-color: inherit;
          --_icon-state-layer-color: var(--_input-state-layer-color);
        }
        
        /* Enhanced slot text styling */
        .prefix-slot ::slotted(.slot-text),
        .suffix-slot ::slotted(.slot-text) {
          font-size: var(--_global-font-size-sm);
          font-weight: var(--_global-font-weight-medium);
          line-height: var(--_global-line-height-tight);
          color: inherit;
        }
        
        /* Enhanced slot button styling */
        .prefix-slot ::slotted(button),
        .suffix-slot ::slotted(button) {
          background: none;
          border: none;
          color: inherit;
          padding: var(--_global-spacing-xs);
          border-radius: var(--_input-state-layer-shape);
          cursor: pointer;
          transition: all var(--_input-motion-duration-short) var(--_input-motion-easing);
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 32px;
          min-height: 32px;
        }
        
        .prefix-slot ::slotted(button:hover),
        .suffix-slot ::slotted(button:hover) {
          background-color: color-mix(in srgb, var(--_input-state-layer-color) calc(var(--_input-state-layer-opacity-hover) * 100%), transparent);
        }
        
        .prefix-slot ::slotted(button:active),
        .suffix-slot ::slotted(button:active) {
          background-color: color-mix(in srgb, var(--_input-state-layer-color) calc(var(--_input-state-layer-opacity-pressed) * 100%), transparent);
          transform: scale(0.95);
        }
        
        /* Size-specific adjustments */
        :host([size="small"]) .prefix-slot,
        :host([size="small"]) .suffix-slot {
          min-height: var(--_input-height-small);
          padding: 0 var(--_input-padding-x-small);
          font-size: calc(var(--_global-font-size-sm) * 0.875);
        }
        
        :host([size="large"]) .prefix-slot,
        :host([size="large"]) .suffix-slot {
          min-height: var(--_input-height-large);
          padding: 0 var(--_input-padding-x-large);
          font-size: var(--_global-font-size-md);
        }

        /* Enhanced supporting text styling with better animations */
        .supporting-text {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--_global-spacing-sm);
          margin-top: var(--_global-spacing-xs);
          min-height: 20px;
          contain: layout style;
        }
        
        .helper-text,
        .error-message {
          font-size: var(--_global-font-size-xs);
          line-height: var(--_global-line-height-tight);
          font-weight: var(--_global-font-weight-normal);
          opacity: 0;
          transform: translateY(-4px);
          transition: opacity var(--_input-motion-duration-short) var(--_input-motion-easing),
                      transform var(--_input-motion-duration-short) var(--_input-motion-easing),
                      color var(--_input-motion-duration-short) var(--_input-motion-easing);
          max-height: 0;
          overflow: hidden;
          will-change: opacity, transform, max-height;
        }
        
        .helper-text {
          color: var(--_input-supporting-text-color);
          flex: 1;
        }
        
        .error-message {
          color: var(--_input-supporting-text-color-error);
          font-weight: var(--_global-font-weight-medium);
          flex: 1;
          display: none;
          position: relative;
        }
        
        .error-message::before {
          content: '';
          position: absolute;
          left: -8px;
          top: 50%;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: var(--_input-supporting-text-color-error);
          transform: translateY(-50%);
          opacity: 0;
          transition: opacity var(--_input-motion-duration-short) var(--_input-motion-easing);
        }
        
        .character-count {
          color: var(--_input-supporting-text-color);
          font-size: var(--_global-font-size-xs);
          line-height: var(--_global-line-height-tight);
          font-weight: var(--_global-font-weight-normal);
          white-space: nowrap;
          opacity: 1;
          transition: color var(--_input-motion-duration-short) var(--_input-motion-easing),
                      transform var(--_input-motion-duration-short) var(--_input-motion-easing);
          position: relative;
          min-width: 40px;
          text-align: right;
        }
        
        .character-count.over-limit {
          color: var(--_input-supporting-text-color-error);
          font-weight: var(--_global-font-weight-medium);
          transform: scale(1.05);
        }
        
        .character-count.near-limit {
          color: var(--_global-color-warning);
          font-weight: var(--_global-font-weight-medium);
        }
        
        /* Enhanced character count animations */
        .character-count.warning-pulse {
          animation: characterCountWarning var(--_input-motion-duration-medium) var(--_input-motion-easing) ease-out;
        }
        
        @keyframes characterCountWarning {
          0% {
            transform: scale(1);
            color: var(--_input-supporting-text-color);
          }
          50% {
            transform: scale(1.1);
            color: var(--_global-color-warning);
          }
          100% {
            transform: scale(1.05);
            color: var(--_global-color-warning);
          }
        }
        
        .character-count.error-pulse {
          animation: characterCountError var(--_input-motion-duration-medium) var(--_input-motion-easing) ease-out;
        }
        
        @keyframes characterCountError {
          0% {
            transform: scale(1.05);
            color: var(--_global-color-warning);
          }
          25% {
            transform: scale(1.2);
          }
          50% {
            transform: scale(0.95);
          }
          75% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1.05);
            color: var(--_input-supporting-text-color-error);
          }
        }

        .helper-text:not(:empty),
        .error-message[style*="block"] {
          opacity: 1;
          transform: translateY(0);
          max-height: 40px;
        }
        
        .error-message[style*="block"]::before {
          opacity: 1;
        }
        
        /* Enhanced error message animations */
        .error-message.show {
          animation: errorMessageSlideIn var(--_input-motion-duration-medium) var(--_input-motion-easing) forwards;
        }
        
        .error-message.hide {
          animation: errorMessageSlideOut var(--_input-motion-duration-short) var(--_input-motion-easing) forwards;
        }
        
        @keyframes errorMessageSlideIn {
          0% {
            opacity: 0;
            transform: translateY(-8px);
            max-height: 0;
          }
          50% {
            max-height: 20px;
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            max-height: 40px;
          }
        }
        
        @keyframes errorMessageSlideOut {
          0% {
            opacity: 1;
            transform: translateY(0);
            max-height: 40px;
          }
          50% {
            opacity: 0;
            transform: translateY(-4px);
            max-height: 20px;
          }
          100% {
            opacity: 0;
            transform: translateY(-8px);
            max-height: 0;
          }
        }

        /* Enhanced Material Design 3 Floating Label Animation System */
        .label.over {
          transition: all var(--_input-motion-duration-medium) var(--_input-motion-easing),
                      color var(--_input-motion-duration-short) var(--_input-motion-easing),
                      background-color var(--_input-motion-duration-short) var(--_input-motion-easing);
          will-change: transform, color, background-color, font-size;
          backface-visibility: hidden;
          transform-origin: left center;
        }
        
        /* Enhanced floating state with improved animations */
        .input-field:focus ~ .label.over,
        .input-field:not(:placeholder-shown) ~ .label.over,
        .input-field[value]:not([value=""]) ~ .label.over,
        .input-wrapper.has-content .label.over {
          top: -12px;
          left: calc(var(--_input-padding-x, var(--_input-padding-x-medium)) - 4px);
          transform: translateY(0) scale(0.75);
          font-size: var(--_global-font-size-xs);
          color: var(--_input-label-color-focus);
          background-color: var(--_global-color-surface);
          border-radius: var(--_global-border-radius-xs);
          font-weight: var(--_global-font-weight-medium);
          box-shadow: 0 0 0 6px var(--_global-color-surface);
          letter-spacing: 0.02em;
          z-index: 15;
          padding: 2px 6px;
          backdrop-filter: blur(4px);
        }
        
        /* Enhanced label positioning for different states */
        .label.over.floating {
          animation: labelFloatUp var(--_input-motion-duration-medium) var(--_input-motion-easing) forwards;
        }
        
        .label.over.unfloating {
          animation: labelFloatDown var(--_input-motion-duration-medium) var(--_input-motion-easing) forwards;
        }
        
        /* Enhanced animation on focus */
        .input-field:focus ~ .label.over {
          animation: labelFloat var(--_input-motion-duration-medium) var(--_input-motion-easing) forwards;
        }
        
        /* Simplified reverse animation - use transitions instead of keyframes */
        .input-field:not(:focus):placeholder-shown:not([value]) ~ .label.over {
          transition: all var(--_input-motion-duration-medium) var(--_input-motion-easing);
        }
        
        
        /* Filled variant floating label - no background */
        :host([variant="filled"]) .input-field:focus ~ .label.over,
        :host([variant="filled"]) .input-field:not(:placeholder-shown) ~ .label.over,
        :host([variant="filled"]) .input-field[value]:not([value=""]) ~ .label.over {
          background-color: transparent;
          box-shadow: none;
          top: -8px;
          padding: 0 4px;
        }
        
        /* Simplified error state for floating label */
        .input-container.has-error .input-field:focus ~ .label.over,
        .input-container.has-error .input-field:not(:placeholder-shown) ~ .label.over,
        .input-container.has-error .input-field[value]:not([value=""]) ~ .label.over {
          color: var(--_input-label-color-error);
          transition: all var(--_input-motion-duration-medium) var(--_input-motion-easing);
        }
        
        /* Label state management for better UX */
        .input-field:focus ~ .label.over,
        .input-field:not(:placeholder-shown) ~ .label.over {
          will-change: transform, color, background-color;
        }
        
        /* Size-specific label adjustments */
        :host([size="small"]) .input-field:focus ~ .label.over,
        :host([size="small"]) .input-field:not(:placeholder-shown) ~ .label.over,
        :host([size="small"]) .input-field[value]:not([value=""]) ~ .label.over {
          top: -10px;
          font-size: calc(var(--_global-font-size-xs) * 0.9);
          padding: 1px 4px;
          box-shadow: 0 0 0 4px var(--_global-color-surface);
          z-index: 15;
        }
        
        :host([size="large"]) .input-field:focus ~ .label.over,
        :host([size="large"]) .input-field:not(:placeholder-shown) ~ .label.over,
        :host([size="large"]) .input-field[value]:not([value=""]) ~ .label.over {
          top: -14px;
          font-size: var(--_global-font-size-sm);
          padding: 3px 8px;
          box-shadow: 0 0 0 8px var(--_global-color-surface);
          z-index: 15;
        }
        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .input-field {
            border: 2px solid currentColor;
            background-color: var(--_global-color-surface);
          }
          
          .input-field:focus {
            outline: 3px solid;
            outline-offset: 2px;
          }
          
          .label {
            font-weight: var(--_global-font-weight-bold);
          }
          
          .leading-icon,
          .trailing-icon {
            opacity: 1;
            filter: contrast(2);
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .input-field,
          .label,
          .error-message,
          .helper-text,
          .leading-icon,
          .trailing-icon {
            animation: none !important;
            transition: none !important;
          }
          
          .label.over {
            transition: none !important;
          }
          
          .input-field:focus ~ .label.over,
          .input-field:not(:placeholder-shown) ~ .label.over,
          .input-field[value]:not([value=""]) ~ .label.over {
            transition: none !important;
            animation: none !important;
          }
          
          /* Instant positioning for reduced motion */
          .input-field:focus ~ .label.over,
          .input-field:not(:placeholder-shown) ~ .label.over,
          .input-field[value]:not([value=""]) ~ .label.over {
            top: -12px;
            transform: translateY(0) scale(0.75);
          }
        }

        /* Enhanced focus-visible support */
        @supports selector(:focus-visible) {
          .input-field:focus:not(:focus-visible) {
            outline: none;
            border-color: var(--_input-outline-color);
          }
          
          .input-field:focus-visible {
            outline: 2px solid var(--_input-outline-color-focus);
            outline-offset: 2px;
          }
        }
        
        /* Typography consistency improvements */
        .input-field {
          letter-spacing: var(--_global-letter-spacing-normal, 0.01em);
        }
        
        .label {
          letter-spacing: var(--_global-letter-spacing-wide, 0.02em);
        }
        
        .helper-text,
        .error-message {
          letter-spacing: var(--_global-letter-spacing-normal, 0.01em);
        }
        
        /* Consistent spacing system */
        .input-container {
          margin-bottom: var(--_global-spacing-component, var(--_global-spacing-lg));
        }
        
        /* Dense layout support */
        :host([dense]) {
          --_input-height: calc(var(--_input-height) * 0.875);
          --_input-padding-x: calc(var(--_input-padding-x, var(--_input-padding-x-medium)) * 0.875);
          --_input-padding-y: calc(var(--_input-padding-y, var(--_input-padding-y-medium)) * 0.75);
        }
        
        :host([dense]) .label {
          font-size: calc(var(--_global-font-size-sm) * 0.875);
        }
        
        :host([dense]) .helper-text,
        :host([dense]) .error-message,
        :host([dense]) .character-count {
          font-size: calc(var(--_global-font-size-xs) * 0.875);
        }
        
        /* Comfortable layout support */
        :host([comfortable]) {
          --_input-height: calc(var(--_input-height) * 1.125);
          --_input-padding-x: calc(var(--_input-padding-x, var(--_input-padding-x-medium)) * 1.125);
          --_input-padding-y: calc(var(--_input-padding-y, var(--_input-padding-y-medium)) * 1.25);
        }
        
        :host([comfortable]) .label {
          font-size: calc(var(--_global-font-size-sm) * 1.125);
          margin-bottom: calc(var(--_global-spacing-xs) * 1.5);
        }
        
        :host([comfortable]) .supporting-text {
          margin-top: calc(var(--_global-spacing-xs) * 1.5);
        }
        
        /* Responsive typography */
        @media (max-width: 768px) {
          :host {
            --_input-height: var(--_input-height-medium);
            font-size: var(--_global-font-size-md);
          }
          
          .input-field {
            font-size: max(16px, var(--_global-font-size-md)); /* Prevents zoom on iOS */
          }
          
          .label {
            font-size: var(--_global-font-size-sm);
          }
        }
        
        @media (min-width: 1200px) {
          :host([size="large"]) {
            --_input-height: calc(var(--_input-height-large) * 1.1);
          }
        }
        
        /* Print styles */
        @media print {
          .input-field {
            border: 1px solid #000;
            background: transparent;
            box-shadow: none;
            font-size: 12pt;
            line-height: 1.4;
          }
          
          .label {
            color: #000;
            font-size: 10pt;
            font-weight: bold;
          }
          
          .helper-text,
          .error-message {
            font-size: 9pt;
          }
          
          .supporting-text {
            margin-top: 2pt;
          }
        }
        
        /* Enhanced responsive design with comprehensive breakpoints */
        
        /* Mobile devices (up to 480px) */
        @media (max-width: 480px) {
          :host {
            --_input-height: calc(var(--_input-height-medium) * 1.1);
            --_input-padding-x: calc(var(--_input-padding-x-medium) * 1.1);
            font-size: var(--_global-font-size-md);
          }
          
          .input-field {
            font-size: max(16px, var(--_global-font-size-md)); /* Prevents zoom on iOS */
            min-height: 44px; /* Touch target minimum */
          }
          
          .label {
            font-size: var(--_global-font-size-sm);
          }
          
          .prefix-slot,
          .suffix-slot {
            padding: 0 var(--_global-spacing-xs);
            min-height: 44px;
          }
          
          .leading-icon,
          .trailing-icon {
            min-width: 44px;
            min-height: 44px;
          }
          
          /* Enhanced touch targets for mobile */
          .label.over {
            touch-action: none;
            user-select: none;
          }
        }
        
        /* Tablet devices (481px - 768px) */
        @media (min-width: 481px) and (max-width: 768px) {
          :host {
            --_input-height: var(--_input-height-medium);
            font-size: var(--_global-font-size-md);
          }
          
          .input-field {
            font-size: var(--_global-font-size-md);
          }
        }
        
        /* Desktop and larger screens */
        @media (min-width: 1200px) {
          :host([size="large"]) {
            --_input-height: calc(var(--_input-height-large) * 1.1);
          }
          
          .input-field:hover {
            transition-duration: calc(var(--_input-motion-duration-short) * 0.8);
          }
        }
        
        /* Enhanced accessibility features */
        
        /* Screen reader only content */
        .sr-only {
          position: absolute !important;
          left: -10000px !important;
          top: -10000px !important;
          width: 1px !important;
          height: 1px !important;
          overflow: hidden !important;
          clip: rect(1px, 1px, 1px, 1px) !important;
          white-space: nowrap !important;
          border: 0 !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        
        /* Enhanced Windows High Contrast mode */
        @media screen and (-ms-high-contrast: active) {
          .input-field {
            border: 2px solid WindowText;
            background-color: Window;
            color: WindowText;
          }
          
          .input-field:focus {
            outline: 2px solid Highlight;
            outline-offset: 2px;
          }
          
          .label {
            color: WindowText;
            font-weight: bold;
          }
          
          .error-message {
            color: WindowText;
            font-weight: bold;
          }
        }
        
        /* Enhanced pointer device adaptations */
        @media (pointer: coarse) {
          .input-field {
            min-height: 44px; /* Ensure touch target size */
            padding: calc(var(--_input-padding-y, var(--_input-padding-y-medium)) + 2px) var(--_input-padding-x, var(--_input-padding-x-medium));
          }
          
          .leading-icon,
          .trailing-icon {
            min-width: 44px;
            min-height: 44px;
          }
          
          .label.over {
            font-size: calc(var(--_global-font-size-xs) * 1.1);
            padding: 3px 8px;
          }
        }
        
        @media (pointer: fine) {
          .input-field:hover {
            transition-duration: calc(var(--_input-motion-duration-short) * 0.8);
          }
          
          .leading-icon:hover,
          .trailing-icon:hover {
            transform: translateY(-50%) scale(1.05);
          }
        }
        
        /* Enhanced hover device support */
        @media (hover: none) {
          .input-field:hover {
            border-color: inherit;
            background-color: inherit;
            transform: none;
          }
          
          .leading-icon:hover,
          .trailing-icon:hover {
            transform: translateY(-50%);
          }
        }
        
        /* Enhanced print styles */
        @media print {
          :host {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          .input-field {
            border: 1px solid #000 !important;
            background: transparent !important;
            box-shadow: none !important;
            font-size: 12pt;
            line-height: 1.4;
            color: #000 !important;
            -webkit-appearance: none;
            appearance: none;
          }
          
          .label {
            color: #000 !important;
            font-size: 10pt;
            font-weight: bold;
            position: static !important;
            transform: none !important;
            background: transparent !important;
            box-shadow: none !important;
          }
          
          .helper-text,
          .error-message {
            font-size: 9pt;
            color: #000 !important;
          }
          
          .supporting-text {
            margin-top: 2pt;
          }
          
          .prefix-slot,
          .suffix-slot {
            border: 1px solid #000 !important;
            background: transparent !important;
            color: #000 !important;
          }
          
          /* Hide interactive elements in print */
          .focus-ripple,
          .error-animation {
            display: none !important;
          }
        }

        /* Dark theme support via data-color-scheme attribute and media query */
        :host([data-color-scheme="dark"]),
        :host-context([data-color-scheme="dark"]) {
          --_input-background: var(--_global-color-scheme-dark-surface);
          --_input-color: var(--_global-color-scheme-dark-on-surface);
          --_input-border-color: var(--_global-color-scheme-dark-outline-variant);
          --_input-border-color-hover: var(--_global-color-scheme-dark-outline);
          --_input-border-color-focus: var(--_global-color-scheme-dark-primary);
          --_input-label-color: var(--_global-color-scheme-dark-on-surface-variant);
          --_input-label-color-focus: var(--_global-color-scheme-dark-primary);
          --_input-helper-text-color: var(--_global-color-scheme-dark-on-surface-variant);
        }

        @media (prefers-color-scheme: dark) {
          :host {
            --_input-background: var(--_global-color-scheme-dark-surface);
            --_input-color: var(--_global-color-scheme-dark-on-surface);
            --_input-border-color: var(--_global-color-scheme-dark-outline-variant);
            --_input-border-color-hover: var(--_global-color-scheme-dark-outline);
            --_input-border-color-focus: var(--_global-color-scheme-dark-primary);
            --_input-label-color: var(--_global-color-scheme-dark-on-surface-variant);
            --_input-label-color-focus: var(--_global-color-scheme-dark-primary);
            --_input-helper-text-color: var(--_global-color-scheme-dark-on-surface-variant);
          }
        }
      </style>

      <div class="input-container ${e==="left"?"label-left":e==="over"?"label-over":""} variant-${this._schema.variant} size-${this._schema.size}">
        ${e!=="over"?`<label class="label ${this._schema.required?"required":""}" id="${this._schema.name}-input-label" for="${this._schema.name}-input">${t}</label>`:""}
        
        <div class="input-wrapper">
          ${this._schema.leadingIcon?`<span class="leading-icon" aria-hidden="false" role="img" aria-label="${this._schema.label} leading icon" tabindex="-1">${this._schema.leadingIcon.includes("<")?this._schema.leadingIcon:`<my-icon icon="${this._schema.leadingIcon}" size="md" aria-hidden="false"></my-icon>`}</span>`:""}
          
          <div class="prefix-slot">
            <slot name="prefix"></slot>
          </div>
          
          <div class="input-content">
            ${this.generateInputElement()}
            ${e==="over"?`<label class="label over ${this._schema.required?"required":""}" id="${this._schema.name}-input-label" for="${this._schema.name}-input">${t}</label>`:""}
          </div>
          
          <div class="suffix-slot">
            <slot name="suffix"></slot>
          </div>
          
          ${this._schema.trailingIcon?`<span class="trailing-icon" aria-hidden="false" role="img" aria-label="${this._schema.label} trailing icon" tabindex="-1">${this._schema.trailingIcon.includes("<")?this._schema.trailingIcon:`<my-icon icon="${this._schema.trailingIcon}" size="md" aria-hidden="false"></my-icon>`}</span>`:""}
        </div>
        
        <div class="supporting-text">
          ${this._schema.helperText?`<div class="helper-text" id="${this._schema.name}-helper" role="note">${this._schema.helperText}</div>`:'<div class="helper-text"></div>'}
          <div class="error-message" id="${this._schema.name}-error" role="alert" aria-live="assertive" aria-atomic="true"></div>
          ${this._schema.characterCount?`<div class="character-count" id="${this._schema.name}-count" role="status" aria-live="polite" aria-atomic="true"></div>`:""}
        </div>
      </div>
    `;const i=this.shadowRoot.querySelector(".input-field"),a=this.shadowRoot.querySelector(".input-container"),n=this.shadowRoot.querySelector('slot[name="prefix"]'),o=this.shadowRoot.querySelector('slot[name="suffix"]'),r=this.shadowRoot.querySelector(".leading-icon"),s=this.shadowRoot.querySelector(".trailing-icon"),c=this.shadowRoot.querySelector(".character-count");if(i&&a){this._errors.length>0?(i.classList.add("error"),a.classList.add("has-error")):(i.classList.remove("error"),a.classList.remove("has-error"));const p=n&&n.assignedElements().length>0,m=o&&o.assignedElements().length>0,y=r&&this._schema.leadingIcon,b=s&&this._schema.trailingIcon;if(i.classList.toggle("has-prefix",p),i.classList.toggle("has-suffix",m),i.classList.toggle("has-leading-icon",y),i.classList.toggle("has-trailing-icon",b),p){const h=n.assignedElements()[0];h&&n.setAttribute("aria-label",`Prefix: ${h.textContent||h.getAttribute("aria-label")||"content"}`)}if(m){const h=o.assignedElements()[0];h&&o.setAttribute("aria-label",`Suffix: ${h.textContent||h.getAttribute("aria-label")||"content"}`)}if(c&&this._schema.characterCount){const h=this._value.length,g=this._schema.maxLength;g?(c.textContent=`${h}/${g}`,c.classList.toggle("over-limit",h>g)):c.textContent=h.toString()}}const l=this.shadowRoot.querySelector(".helper-text");l&&this._schema.helperText&&(l.style.opacity="1",l.style.transform="translateY(0)"),this.updateErrorDisplay(),this._errors.length>0?this.classList.add("has-error"):this.classList.remove("has-error")}}customElements.get("my-input")||customElements.define("my-input",I);export{k as g};
