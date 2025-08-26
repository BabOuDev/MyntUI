import{g as b}from"./my-input-Cr2iSYlQ.js";import"./my-icon-O3BbYCXg.js";import"./base-component-q4KNMHwB.js";const Ee={title:"Components/my-input",parameters:{docs:{description:{component:"A comprehensive Material Design 3 input component with enhanced state layers, floating labels, validation, accessibility, and conditional icon visibility. Supports all required input types from CONTRIBUTING.md with full light/dark theme compatibility and grid system integration."}}},argTypes:{type:{control:{type:"select"},options:["text","pattern","number","integer","date","datetime-local","time","date-of-birth","select","dynamic-select","textarea","checkbox","radio","email","password","url","tel","search"],description:"Input type"},label:{control:"text",description:"Input label"},placeholder:{control:"text",description:"Placeholder text"},value:{control:"text",description:"Input value"},variant:{control:{type:"select"},options:["outlined","filled"],description:"Input variant style"},size:{control:{type:"select"},options:["small","medium","large"],description:"Input size"},labelPosition:{control:{type:"select"},options:["top","left","over"],description:"Label position"},required:{control:"boolean",description:"Mark as required field"},disabled:{control:"boolean",description:"Disable the input"},readonly:{control:"boolean",description:"Make input read-only"},helperText:{control:"text",description:"Helper text below input"},leadingIcon:{control:"text",description:"Leading icon name"},trailingIcon:{control:"text",description:"Trailing icon name"},characterCount:{control:"boolean",description:"Show character count"}}},xe=e=>{const t=document.createElement("my-input");return e.type&&e.type!=="text"&&t.setAttribute("type",e.type),e.label&&t.setAttribute("label",e.label),e.placeholder&&t.setAttribute("placeholder",e.placeholder),e.value&&t.setAttribute("value",e.value),e.variant&&e.variant!=="outlined"&&t.setAttribute("variant",e.variant),e.size&&e.size!=="medium"&&t.setAttribute("size",e.size),e.labelPosition&&e.labelPosition!=="top"&&t.setAttribute("label-position",e.labelPosition),e.helperText&&t.setAttribute("helper-text",e.helperText),e.leadingIcon&&t.setAttribute("leading-icon",e.leadingIcon),e.trailingIcon&&t.setAttribute("trailing-icon",e.trailingIcon),e.required&&t.setAttribute("required",""),e.disabled&&t.setAttribute("disabled",""),e.readonly&&t.setAttribute("readonly",""),e.characterCount&&t.setAttribute("character-count",""),t.addEventListener("input",n=>{console.log("Input event:",n.detail)}),t.addEventListener("change",n=>{console.log("Change event:",n.detail)}),t},g=xe.bind({});g.args={label:"Email",type:"email",placeholder:"Enter your email",variant:"outlined",size:"medium",labelPosition:"top",required:!1,disabled:!1,readonly:!1,characterCount:!1};const y=()=>{const e=document.createElement("div");return e.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; max-width: 1200px;",[{type:"text",label:"Full Name",placeholder:"Enter your full name"},{type:"pattern",label:"Pattern Input",placeholder:"ABC123",pattern:"[A-Z]{3}[0-9]{3}",helperText:"Format: ABC123"},{type:"number",label:"Age",placeholder:"25",min:"0",max:"120"},{type:"integer",label:"Quantity",placeholder:"10",min:"1",helperText:"Whole numbers only"},{type:"date",label:"Birth Date",helperText:"Select your birth date"},{type:"datetime-local",label:"Appointment",helperText:"Select date and time"},{type:"time",label:"Preferred Time",helperText:"Select time"},{type:"date-of-birth",label:"Date of Birth",helperText:"Special date picker for DOB"},{type:"email",label:"Email Address",placeholder:"user@example.com"},{type:"password",label:"Password",placeholder:"Enter password"},{type:"url",label:"Website",placeholder:"https://example.com"},{type:"tel",label:"Phone Number",placeholder:"+1 (555) 123-4567"},{type:"search",label:"Search",placeholder:"Search..."},{type:"textarea",label:"Description",placeholder:"Enter detailed description..."},{type:"select",label:"Country",helperText:"Select your country",options:[{label:"United States",value:"US"},{label:"Canada",value:"CA"},{label:"United Kingdom",value:"UK"},{label:"Australia",value:"AU"}]},{type:"dynamic-select",label:"City",placeholder:"Start typing city name...",helperText:"Dynamic searchable select"},{type:"checkbox",label:"I agree to terms",value:"false"},{type:"radio",label:"Newsletter subscription",value:"false"}].forEach(({type:n,label:l,placeholder:a,pattern:r,min:i,max:o,helperText:s,options:c,value:m})=>{const p=document.createElement("my-input");if(p.setAttribute("type",n),p.setAttribute("label",l),a&&p.setAttribute("placeholder",a),r&&p.setAttribute("pattern",r),i&&p.setAttribute("min",i),o&&p.setAttribute("max",o),s&&p.setAttribute("helper-text",s),m&&p.setAttribute("value",m),c){const h={type:n,label:l,options:c,placeholder:a,helperText:s};p.setAttribute("schema",JSON.stringify(h))}e.appendChild(p)}),e};y.parameters={docs:{description:{story:"Comprehensive showcase of all supported input types including text, pattern, number, integer, date/time variants, select, dynamic-select, textarea, checkbox, and radio inputs. This covers all input types specified in the CONTRIBUTING.md requirements."}}};const x=()=>{const e=document.createElement("div");return e.style.cssText="display: flex; flex-direction: column; gap: 32px; max-width: 400px;",["outlined","filled"].forEach(n=>{const l=document.createElement("div");l.style.cssText="display: flex; flex-direction: column; gap: 16px;";const a=document.createElement("h3");a.textContent=`${n.charAt(0).toUpperCase()}${n.slice(1)} Variant`,a.style.cssText="margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium);";const r=document.createElement("div");r.style.cssText="display: flex; flex-direction: column; gap: 16px;";const i=document.createElement("my-input");i.setAttribute("variant",n),i.setAttribute("label","Normal"),i.setAttribute("placeholder","Enter text");const o=document.createElement("my-input");o.setAttribute("variant",n),o.setAttribute("label","With Value"),o.setAttribute("value","Sample value");const s=document.createElement("my-input");s.setAttribute("variant",n),s.setAttribute("label","Disabled"),s.setAttribute("placeholder","Disabled input"),s.setAttribute("disabled",""),r.appendChild(i),r.appendChild(o),r.appendChild(s),l.appendChild(a),l.appendChild(r),e.appendChild(l)}),e};x.parameters={docs:{description:{story:"Outlined and filled variants with different states."}}};const f=()=>{const e=document.createElement("div");return e.style.cssText="display: flex; flex-direction: column; gap: 24px; max-width: 400px;",["small","medium","large"].forEach(n=>{const l=document.createElement("my-input");l.setAttribute("size",n),l.setAttribute("label",`Size ${n}`),l.setAttribute("placeholder",`${n} input`),e.appendChild(l)}),e};f.parameters={docs:{description:{story:"Different input sizes: small, medium, and large."}}};const v=()=>{const e=document.createElement("div");return e.style.cssText="display: flex; flex-direction: column; gap: 32px; max-width: 500px;",[{position:"top",label:"Top Label"},{position:"left",label:"Left Label"},{position:"over",label:"Over Label (Floating)"}].forEach(({position:n,label:l})=>{const a=document.createElement("my-input");a.setAttribute("label-position",n),a.setAttribute("label",l),a.setAttribute("placeholder",`Label position: ${n}`),e.appendChild(a)}),e};v.parameters={docs:{description:{story:"Different label positioning options."}}};const A=()=>{const e=document.createElement("div");return e.style.cssText="display: flex; flex-direction: column; gap: 24px; max-width: 400px;",[{label:"Search",type:"search",leadingIcon:"search",placeholder:"Search..."},{label:"Email",type:"email",leadingIcon:"mail",placeholder:"user@example.com"},{label:"Password",type:"password",trailingIcon:"visibility",placeholder:"Enter password"},{label:"Phone",type:"tel",leadingIcon:"phone",trailingIcon:"contact_phone",placeholder:"+1 (555) 123-4567"}].forEach(({label:n,type:l,leadingIcon:a,trailingIcon:r,placeholder:i})=>{const o=document.createElement("my-input");o.setAttribute("type",l),o.setAttribute("label",n),o.setAttribute("placeholder",i),a&&o.setAttribute("leading-icon",a),r&&o.setAttribute("trailing-icon",r),e.appendChild(o)}),e};A.parameters={docs:{description:{story:"Inputs with leading and trailing icons to enhance UX."}}};const E=()=>{const e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; gap: 24px; max-width: 400px;";const t=document.createElement("my-input");t.setAttribute("label","Required Field"),t.setAttribute("placeholder","This field is required"),t.setAttribute("required",""),t.setAttribute("helper-text","This field is required");const n=document.createElement("my-input");n.setAttribute("type","email"),n.setAttribute("label","Email Validation"),n.setAttribute("placeholder","Enter valid email"),n.setAttribute("value","invalid-email"),n.setAttribute("helper-text","Please enter a valid email address");const l=document.createElement("my-input");return l.setAttribute("label","Description"),l.setAttribute("placeholder","Enter description..."),l.setAttribute("maxlength","100"),l.setAttribute("character-count",""),l.setAttribute("helper-text","Maximum 100 characters"),e.appendChild(t),e.appendChild(n),e.appendChild(l),e};E.parameters={docs:{description:{story:"Input validation states including required fields, validation messages, and character counting."}}};const C=()=>{const e=document.createElement("div");return e.style.cssText="display: flex; flex-direction: column; gap: 24px; max-width: 400px;",[{name:"Normal",props:{label:"Normal State",placeholder:"Enter text"}},{name:"Focused",props:{label:"Focused State",placeholder:"Click to focus",value:"Sample text"}},{name:"Disabled",props:{label:"Disabled State",placeholder:"Cannot edit",disabled:!0}},{name:"Read Only",props:{label:"Read Only",value:"Read only value",readonly:!0}},{name:"Error",props:{label:"Error State",placeholder:"Invalid input","helper-text":"This field has an error"}}].forEach(({name:n,props:l})=>{const a=document.createElement("my-input");Object.entries(l).forEach(([r,i])=>{typeof i=="boolean"&&i?a.setAttribute(r,""):typeof i=="string"&&a.setAttribute(r,i)}),e.appendChild(a)}),e};C.parameters={docs:{description:{story:"Different input states including normal, focused, disabled, read-only, and error states."}}};const T=()=>{const e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; gap: 24px; max-width: 400px;";const t=document.createElement("my-input");return t.setAttribute("type","textarea"),t.setAttribute("label","Description"),t.setAttribute("placeholder","Enter a detailed description..."),t.setAttribute("helper-text","Provide as much detail as possible"),t.setAttribute("character-count",""),t.setAttribute("maxlength","500"),e.appendChild(t),e};T.parameters={docs:{description:{story:"Textarea input for multi-line text input."}}};const w=()=>{const e=document.createElement("div");e.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; max-width: 1200px;";const t=document.createElement("div");return t.style.cssText="grid-column: 1 / -1; margin-bottom: 16px;",t.innerHTML=`
    <h3 style="margin: 0 0 8px 0; font-size: 18px; color: var(--_global-color-primary);">
      Conditional Icon Visibility & Auto-Assignment
    </h3>
    <p style="margin: 0; font-size: 14px; color: var(--_global-color-on-surface-variant);">
      Icons are automatically assigned based on input type and only shown when relevant. This follows the Material Design guidelines and global config settings.
    </p>
  `,e.appendChild(t),[{type:"email",label:"Email Address",placeholder:"user@example.com",expectedIcon:"mail"},{type:"password",label:"Password",placeholder:"Enter password",expectedIcon:"lock"},{type:"search",label:"Search",placeholder:"Search...",expectedIcon:"search"},{type:"date",label:"Date",expectedIcon:"event"},{type:"datetime-local",label:"Date & Time",expectedIcon:"schedule"},{type:"time",label:"Time",expectedIcon:"access_time"},{type:"date-of-birth",label:"Date of Birth",expectedIcon:"cake"},{type:"tel",label:"Phone Number",placeholder:"+1 (555) 123-4567",expectedIcon:"phone"},{type:"url",label:"Website",placeholder:"https://example.com",expectedIcon:"link"},{type:"number",label:"Amount",placeholder:"100",expectedIcon:"tag"},{type:"text",label:"Plain Text",placeholder:"No automatic icon",expectedIcon:null},{type:"textarea",label:"Description",placeholder:"No automatic icon",expectedIcon:null}].forEach(({type:l,label:a,placeholder:r,expectedIcon:i})=>{const o=document.createElement("div");o.style.cssText="display: flex; flex-direction: column; gap: 8px;";const s=document.createElement("my-input");s.setAttribute("type",l),s.setAttribute("label",a),r&&s.setAttribute("placeholder",r);const c=i?`Auto-assigned icon: ${i}`:"No automatic icon assigned";s.setAttribute("helper-text",c),o.appendChild(s),e.appendChild(o)}),e};w.parameters={docs:{description:{story:"Demonstrates automatic icon assignment based on input type with conditional visibility. Icons are only shown when they provide meaningful context to the user, following Material Design principles and the global configuration settings."}}};const S=()=>{const e=document.createElement("div");e.style.cssText="max-width: 1200px; display: flex; flex-direction: column; gap: 32px;";const t=document.createElement("div");t.innerHTML=`
    <h3 style="margin: 0 0 16px 0; font-size: 18px; color: var(--_global-color-primary);">
      Grid System Integration
    </h3>
    <p style="margin: 0 0 24px 0; font-size: 14px; color: var(--_global-color-on-surface-variant);">
      MyntUI inputs work seamlessly with the built-in grid system utilities for responsive layouts.
    </p>
  `,e.appendChild(t);const n=document.createElement("div");n.className="u-display-grid u-grid-cols-2 u-gap-md",n.style.cssText="margin-bottom: 32px;";const l=document.createElement("h4");l.textContent="2-Column Grid Layout",l.style.cssText="grid-column: 1 / -1; margin: 0 0 16px 0; font-size: 16px;",n.appendChild(l),["First Name","Last Name"].forEach((p,h)=>{const d=document.createElement("my-input");d.setAttribute("label",p),d.setAttribute("placeholder",`Enter your ${p.toLowerCase()}`),d.setAttribute("required",""),n.appendChild(d)}),e.appendChild(n);const a=document.createElement("div");a.className="u-display-grid u-grid-cols-1 u-md-grid-cols-3 u-gap-md",a.style.cssText="margin-bottom: 32px;";const r=document.createElement("h4");r.textContent="Responsive 3-Column Grid (1 col on mobile, 3 cols on tablet+)",r.style.cssText="grid-column: 1 / -1; margin: 0 0 16px 0; font-size: 16px;",a.appendChild(r),[{type:"email",label:"Email",placeholder:"user@example.com"},{type:"tel",label:"Phone",placeholder:"+1 (555) 123-4567"},{type:"date",label:"Birth Date"}].forEach(({type:p,label:h,placeholder:d})=>{const u=document.createElement("my-input");u.setAttribute("type",p),u.setAttribute("label",h),d&&u.setAttribute("placeholder",d),a.appendChild(u)}),e.appendChild(a);const i=document.createElement("div");i.className="u-display-grid u-grid-cols-4 u-gap-md",i.style.cssText="margin-bottom: 32px;";const o=document.createElement("h4");o.textContent="Mixed Column Spans",o.style.cssText="grid-column: 1 / -1; margin: 0 0 16px 0; font-size: 16px;",i.appendChild(o);const s=document.createElement("my-input");s.className="u-col-span-full",s.setAttribute("type","textarea"),s.setAttribute("label","Full Width Description"),s.setAttribute("placeholder","This textarea spans all 4 columns..."),i.appendChild(s);const c=document.createElement("my-input");c.className="u-col-span-2",c.setAttribute("label","Half Width 1"),c.setAttribute("placeholder","Spans 2 columns"),i.appendChild(c);const m=document.createElement("my-input");return m.className="u-col-span-2",m.setAttribute("label","Half Width 2"),m.setAttribute("placeholder","Spans 2 columns"),i.appendChild(m),e.appendChild(i),e};S.parameters={docs:{description:{story:"Demonstrates how MyntUI inputs integrate with the grid system utilities for responsive layouts. Uses utility classes like u-grid-cols-2, u-md-grid-cols-3, u-col-span-full, etc."}}};const I=()=>{const e=document.createElement("div");e.style.cssText="max-width: 800px;";const t=document.createElement("div");t.style.cssText="margin-bottom: 32px; padding: 16px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md);",t.innerHTML=`
    <h4 style="margin: 0 0 16px 0; font-size: 16px;">Theme Controls</h4>
    <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
      <button id="light-theme" style="padding: 8px 16px; border: 1px solid var(--_global-color-outline); border-radius: var(--_global-border-radius-sm); background: var(--_global-color-surface); color: var(--_global-color-on-surface); cursor: pointer;">
        Light Theme
      </button>
      <button id="dark-theme" style="padding: 8px 16px; border: 1px solid var(--_global-color-outline); border-radius: var(--_global-border-radius-sm); background: var(--_global-color-surface); color: var(--_global-color-on-surface); cursor: pointer;">
        Dark Theme
      </button>
      <button id="auto-theme" style="padding: 8px 16px; border: 1px solid var(--_global-color-outline); border-radius: var(--_global-border-radius-sm); background: var(--_global-color-surface); color: var(--_global-color-on-surface); cursor: pointer;">
        Auto (System)
      </button>
    </div>
  `,e.appendChild(t);const n=document.createElement("div");return n.className="u-display-grid u-grid-cols-2 u-gap-md",n.style.cssText="padding: 24px; background: var(--_global-color-surface); border: 1px solid var(--_global-color-outline-variant); border-radius: var(--_global-border-radius-md);",[{type:"email",label:"Email Address",variant:"outlined"},{type:"password",label:"Password",variant:"filled"},{type:"search",label:"Search",variant:"outlined"},{type:"date",label:"Date",variant:"filled"}].forEach(({type:l,label:a,variant:r})=>{const i=document.createElement("my-input");i.setAttribute("type",l),i.setAttribute("label",a),i.setAttribute("variant",r),i.setAttribute("helper-text",`${r} variant in current theme`),n.appendChild(i)}),e.appendChild(n),setTimeout(()=>{const l=e.querySelector("#light-theme"),a=e.querySelector("#dark-theme"),r=e.querySelector("#auto-theme");l==null||l.addEventListener("click",()=>{document.documentElement.setAttribute("data-color-scheme","light"),b.set("theme.colorScheme","light")}),a==null||a.addEventListener("click",()=>{document.documentElement.setAttribute("data-color-scheme","dark"),b.set("theme.colorScheme","dark")}),r==null||r.addEventListener("click",()=>{document.documentElement.removeAttribute("data-color-scheme"),b.set("theme.colorScheme","auto")})},100),e};I.parameters={docs:{description:{story:"Demonstrates light/dark theme compatibility. Use the theme controls to switch between light, dark, and auto (system preference) themes. All input variants and states work correctly across themes."}}};const _=()=>{const e=document.createElement("div");e.style.cssText="max-width: 1200px;";const t=document.createElement("div");t.innerHTML=`
    <h3 style="margin: 0 0 16px 0; font-size: 20px; color: var(--_global-color-primary);">
      Enhanced Input Component Features
    </h3>
    <p style="margin: 0 0 32px 0; font-size: 14px; color: var(--_global-color-on-surface-variant); line-height: 1.5;">
      This showcase demonstrates all the enhanced features: automatic icon assignment from global config, 
      conditional icon visibility, theme switching support, and comprehensive input type coverage.
    </p>
  `,e.appendChild(t);const n=document.createElement("div");return n.className="u-display-grid u-grid-cols-2 u-gap-lg",[{title:"Automatic Icons",description:"Icons automatically assigned based on input type",inputs:[{type:"email",label:"Email (auto mail icon)"},{type:"password",label:"Password (auto lock icon)"},{type:"search",label:"Search (auto search icon)"},{type:"date",label:"Date (auto event icon)"}]},{title:"Theme Compatibility",description:"All inputs work perfectly in light and dark themes",inputs:[{type:"text",label:"Text Input",variant:"outlined"},{type:"email",label:"Email Input",variant:"filled"},{type:"number",label:"Number Input",variant:"outlined"},{type:"textarea",label:"Textarea",variant:"filled"}]},{title:"All Input Types",description:"Complete support for all required input types",inputs:[{type:"tel",label:"Phone Number"},{type:"url",label:"Website URL"},{type:"datetime-local",label:"Date & Time"},{type:"time",label:"Time Only"}]},{title:"Grid Integration",description:"Seamless integration with utility grid system",inputs:[{type:"text",label:"First Name",placeholder:"John"},{type:"text",label:"Last Name",placeholder:"Doe"},{type:"email",label:"Email",placeholder:"john@example.com"},{type:"tel",label:"Phone",placeholder:"+1 234 567 8900"}]}].forEach(({title:a,description:r,inputs:i})=>{const o=document.createElement("div");o.style.cssText="padding: 24px; background: var(--_global-color-surface-container-low); border-radius: var(--_global-border-radius-md); border: 1px solid var(--_global-color-outline-variant);";const s=document.createElement("div");s.innerHTML=`
      <h4 style="margin: 0 0 8px 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-primary);">${a}</h4>
      <p style="margin: 0 0 20px 0; font-size: 13px; color: var(--_global-color-on-surface-variant); line-height: 1.4;">${r}</p>
    `,o.appendChild(s);const c=document.createElement("div");c.style.cssText="display: flex; flex-direction: column; gap: 16px;",i.forEach(({type:m,label:p,variant:h,placeholder:d})=>{const u=document.createElement("my-input");u.setAttribute("type",m),u.setAttribute("label",p),h&&u.setAttribute("variant",h),d&&u.setAttribute("placeholder",d),c.appendChild(u)}),o.appendChild(c),n.appendChild(o)}),e.appendChild(n),e};_.parameters={docs:{description:{story:"Comprehensive demonstration of all enhanced input features including automatic icon assignment, theme compatibility, complete input type support, and grid system integration."}}};const k=()=>{const e=document.createElement("div");e.style.cssText="max-width: 1000px;";const t=document.createElement("div");t.style.cssText="margin-bottom: 32px; padding: 20px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md);",t.innerHTML=`
    <h4 style="margin: 0 0 20px 0; font-size: 16px; color: var(--_global-color-primary);">Global Configuration Controls</h4>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 20px;">
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: var(--_global-font-weight-medium);">Default Label Position:</label>
        <select id="label-position" style="width: 100%; padding: 8px; border: 1px solid var(--_global-color-outline-variant); border-radius: var(--_global-border-radius-sm); background: var(--_global-color-surface); color: var(--_global-color-on-surface);">
          <option value="top">Top</option>
          <option value="left">Left</option>
          <option value="over">Over (Floating)</option>
        </select>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: var(--_global-font-weight-medium);">Default Size:</label>
        <select id="default-size" style="width: 100%; padding: 8px; border: 1px solid var(--_global-color-outline-variant); border-radius: var(--_global-border-radius-sm); background: var(--_global-color-surface); color: var(--_global-color-on-surface);">
          <option value="small">Small</option>
          <option value="medium" selected>Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: var(--_global-font-weight-medium);">Default Variant:</label>
        <select id="default-variant" style="width: 100%; padding: 8px; border: 1px solid var(--_global-color-outline-variant); border-radius: var(--_global-border-radius-sm); background: var(--_global-color-surface); color: var(--_global-color-on-surface);">
          <option value="outlined" selected>Outlined</option>
          <option value="filled">Filled</option>
        </select>
      </div>
    </div>
    
    <button id="apply-config" style="padding: 12px 24px; background: var(--_global-color-primary); color: var(--_global-color-on-primary); border: none; border-radius: var(--_global-border-radius-sm); cursor: pointer; font-weight: var(--_global-font-weight-medium);">
      Apply Configuration
    </button>
  `,e.appendChild(t);const n=document.createElement("div");n.id="sample-inputs",n.className="u-display-grid u-grid-cols-2 u-gap-lg",n.style.cssText="padding: 24px; background: var(--_global-color-surface); border: 1px solid var(--_global-color-outline-variant); border-radius: var(--_global-border-radius-md);";const l=()=>{n.innerHTML="";const a=b.get("components.input")||{},r=b.get("theme")||{};[{type:"text",label:"Sample Text Input",placeholder:"Using global config..."},{type:"email",label:"Sample Email",placeholder:"user@example.com"},{type:"password",label:"Sample Password",placeholder:"Password..."},{type:"textarea",label:"Sample Textarea",placeholder:"Multi-line text..."}].forEach(({type:i,label:o,placeholder:s})=>{const c=document.createElement("my-input");c.setAttribute("type",i),c.setAttribute("label",o),c.setAttribute("placeholder",s),c.setAttribute("label-position",r.labelPosition||a.labelPosition||"top"),c.setAttribute("size",a.size||"medium"),c.setAttribute("variant",a.variant||"outlined"),c.setAttribute("helper-text",`Using: ${c.getAttribute("label-position")} label, ${c.getAttribute("size")} size, ${c.getAttribute("variant")} variant`),n.appendChild(c)})};return l(),e.appendChild(n),setTimeout(()=>{const a=e.querySelector("#apply-config"),r=e.querySelector("#label-position"),i=e.querySelector("#default-size"),o=e.querySelector("#default-variant");a==null||a.addEventListener("click",()=>{b.set("theme.labelPosition",r.value),b.set("components.input.size",i.value),b.set("components.input.variant",o.value),l()})},100),e};k.parameters={docs:{description:{story:"Demonstrates the global configuration system. Change the default settings and see how new inputs automatically use the updated configuration. This showcases centralized control over themes, component behavior, and API contracts."}}};var z,D,P;g.parameters={...g.parameters,docs:{...(z=g.parameters)==null?void 0:z.docs,source:{originalSource:`args => {
  const input = document.createElement('my-input');

  // Set properties
  if (args.type && args.type !== 'text') input.setAttribute('type', args.type);
  if (args.label) input.setAttribute('label', args.label);
  if (args.placeholder) input.setAttribute('placeholder', args.placeholder);
  if (args.value) input.setAttribute('value', args.value);
  if (args.variant && args.variant !== 'outlined') input.setAttribute('variant', args.variant);
  if (args.size && args.size !== 'medium') input.setAttribute('size', args.size);
  if (args.labelPosition && args.labelPosition !== 'top') input.setAttribute('label-position', args.labelPosition);
  if (args.helperText) input.setAttribute('helper-text', args.helperText);
  if (args.leadingIcon) input.setAttribute('leading-icon', args.leadingIcon);
  if (args.trailingIcon) input.setAttribute('trailing-icon', args.trailingIcon);
  if (args.required) input.setAttribute('required', '');
  if (args.disabled) input.setAttribute('disabled', '');
  if (args.readonly) input.setAttribute('readonly', '');
  if (args.characterCount) input.setAttribute('character-count', '');

  // Add event listeners for demonstration
  input.addEventListener('input', e => {
    console.log('Input event:', e.detail);
  });
  input.addEventListener('change', e => {
    console.log('Change event:', e.detail);
  });
  return input;
}`,...(P=(D=g.parameters)==null?void 0:D.docs)==null?void 0:P.source}}};var L,N,M;y.parameters={...y.parameters,docs:{...(L=y.parameters)==null?void 0:L.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; max-width: 1200px;';
  const types = [{
    type: 'text',
    label: 'Full Name',
    placeholder: 'Enter your full name'
  }, {
    type: 'pattern',
    label: 'Pattern Input',
    placeholder: 'ABC123',
    pattern: '[A-Z]{3}[0-9]{3}',
    helperText: 'Format: ABC123'
  }, {
    type: 'number',
    label: 'Age',
    placeholder: '25',
    min: '0',
    max: '120'
  }, {
    type: 'integer',
    label: 'Quantity',
    placeholder: '10',
    min: '1',
    helperText: 'Whole numbers only'
  }, {
    type: 'date',
    label: 'Birth Date',
    helperText: 'Select your birth date'
  }, {
    type: 'datetime-local',
    label: 'Appointment',
    helperText: 'Select date and time'
  }, {
    type: 'time',
    label: 'Preferred Time',
    helperText: 'Select time'
  }, {
    type: 'date-of-birth',
    label: 'Date of Birth',
    helperText: 'Special date picker for DOB'
  }, {
    type: 'email',
    label: 'Email Address',
    placeholder: 'user@example.com'
  }, {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter password'
  }, {
    type: 'url',
    label: 'Website',
    placeholder: 'https://example.com'
  }, {
    type: 'tel',
    label: 'Phone Number',
    placeholder: '+1 (555) 123-4567'
  }, {
    type: 'search',
    label: 'Search',
    placeholder: 'Search...'
  }, {
    type: 'textarea',
    label: 'Description',
    placeholder: 'Enter detailed description...'
  }, {
    type: 'select',
    label: 'Country',
    helperText: 'Select your country',
    options: [{
      label: 'United States',
      value: 'US'
    }, {
      label: 'Canada',
      value: 'CA'
    }, {
      label: 'United Kingdom',
      value: 'UK'
    }, {
      label: 'Australia',
      value: 'AU'
    }]
  }, {
    type: 'dynamic-select',
    label: 'City',
    placeholder: 'Start typing city name...',
    helperText: 'Dynamic searchable select'
  }, {
    type: 'checkbox',
    label: 'I agree to terms',
    value: 'false'
  }, {
    type: 'radio',
    label: 'Newsletter subscription',
    value: 'false'
  }];
  types.forEach(({
    type,
    label,
    placeholder,
    pattern,
    min,
    max,
    helperText,
    options,
    value
  }) => {
    const input = document.createElement('my-input');
    input.setAttribute('type', type);
    input.setAttribute('label', label);
    if (placeholder) input.setAttribute('placeholder', placeholder);
    if (pattern) input.setAttribute('pattern', pattern);
    if (min) input.setAttribute('min', min);
    if (max) input.setAttribute('max', max);
    if (helperText) input.setAttribute('helper-text', helperText);
    if (value) input.setAttribute('value', value);
    if (options) {
      // For select type, we need to pass options as schema
      const schema = {
        type,
        label,
        options,
        placeholder,
        helperText
      };
      input.setAttribute('schema', JSON.stringify(schema));
    }
    container.appendChild(input);
  });
  return container;
}`,...(M=(N=y.parameters)==null?void 0:N.docs)==null?void 0:M.source}}};var q,F,U;x.parameters={...x.parameters,docs:{...(q=x.parameters)==null?void 0:q.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 32px; max-width: 400px;';
  const variants = ['outlined', 'filled'];
  variants.forEach(variant => {
    const section = document.createElement('div');
    section.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';
    const title = document.createElement('h3');
    title.textContent = \`\${variant.charAt(0).toUpperCase()}\${variant.slice(1)} Variant\`;
    title.style.cssText = 'margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium);';
    const inputsContainer = document.createElement('div');
    inputsContainer.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';

    // Normal
    const normal = document.createElement('my-input');
    normal.setAttribute('variant', variant);
    normal.setAttribute('label', 'Normal');
    normal.setAttribute('placeholder', 'Enter text');

    // With value
    const withValue = document.createElement('my-input');
    withValue.setAttribute('variant', variant);
    withValue.setAttribute('label', 'With Value');
    withValue.setAttribute('value', 'Sample value');

    // Disabled
    const disabled = document.createElement('my-input');
    disabled.setAttribute('variant', variant);
    disabled.setAttribute('label', 'Disabled');
    disabled.setAttribute('placeholder', 'Disabled input');
    disabled.setAttribute('disabled', '');
    inputsContainer.appendChild(normal);
    inputsContainer.appendChild(withValue);
    inputsContainer.appendChild(disabled);
    section.appendChild(title);
    section.appendChild(inputsContainer);
    container.appendChild(section);
  });
  return container;
}`,...(U=(F=x.parameters)==null?void 0:F.docs)==null?void 0:U.source}}};var $,W,H;f.parameters={...f.parameters,docs:{...($=f.parameters)==null?void 0:$.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 24px; max-width: 400px;';
  const sizes = ['small', 'medium', 'large'];
  sizes.forEach(size => {
    const input = document.createElement('my-input');
    input.setAttribute('size', size);
    input.setAttribute('label', \`Size \${size}\`);
    input.setAttribute('placeholder', \`\${size} input\`);
    container.appendChild(input);
  });
  return container;
}`,...(H=(W=f.parameters)==null?void 0:W.docs)==null?void 0:H.source}}};var O,G,B;v.parameters={...v.parameters,docs:{...(O=v.parameters)==null?void 0:O.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 32px; max-width: 500px;';
  const positions = [{
    position: 'top',
    label: 'Top Label'
  }, {
    position: 'left',
    label: 'Left Label'
  }, {
    position: 'over',
    label: 'Over Label (Floating)'
  }];
  positions.forEach(({
    position,
    label
  }) => {
    const input = document.createElement('my-input');
    input.setAttribute('label-position', position);
    input.setAttribute('label', label);
    input.setAttribute('placeholder', \`Label position: \${position}\`);
    container.appendChild(input);
  });
  return container;
}`,...(B=(G=v.parameters)==null?void 0:G.docs)==null?void 0:B.source}}};var V,R,j;A.parameters={...A.parameters,docs:{...(V=A.parameters)==null?void 0:V.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 24px; max-width: 400px;';
  const iconInputs = [{
    label: 'Search',
    type: 'search',
    leadingIcon: 'search',
    placeholder: 'Search...'
  }, {
    label: 'Email',
    type: 'email',
    leadingIcon: 'mail',
    placeholder: 'user@example.com'
  }, {
    label: 'Password',
    type: 'password',
    trailingIcon: 'visibility',
    placeholder: 'Enter password'
  }, {
    label: 'Phone',
    type: 'tel',
    leadingIcon: 'phone',
    trailingIcon: 'contact_phone',
    placeholder: '+1 (555) 123-4567'
  }];
  iconInputs.forEach(({
    label,
    type,
    leadingIcon,
    trailingIcon,
    placeholder
  }) => {
    const input = document.createElement('my-input');
    input.setAttribute('type', type);
    input.setAttribute('label', label);
    input.setAttribute('placeholder', placeholder);
    if (leadingIcon) input.setAttribute('leading-icon', leadingIcon);
    if (trailingIcon) input.setAttribute('trailing-icon', trailingIcon);
    container.appendChild(input);
  });
  return container;
}`,...(j=(R=A.parameters)==null?void 0:R.docs)==null?void 0:j.source}}};var J,K,Q;E.parameters={...E.parameters,docs:{...(J=E.parameters)==null?void 0:J.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 24px; max-width: 400px;';

  // Required field
  const required = document.createElement('my-input');
  required.setAttribute('label', 'Required Field');
  required.setAttribute('placeholder', 'This field is required');
  required.setAttribute('required', '');
  required.setAttribute('helper-text', 'This field is required');

  // With validation
  const email = document.createElement('my-input');
  email.setAttribute('type', 'email');
  email.setAttribute('label', 'Email Validation');
  email.setAttribute('placeholder', 'Enter valid email');
  email.setAttribute('value', 'invalid-email');
  email.setAttribute('helper-text', 'Please enter a valid email address');

  // Character count
  const withCount = document.createElement('my-input');
  withCount.setAttribute('label', 'Description');
  withCount.setAttribute('placeholder', 'Enter description...');
  withCount.setAttribute('maxlength', '100');
  withCount.setAttribute('character-count', '');
  withCount.setAttribute('helper-text', 'Maximum 100 characters');
  container.appendChild(required);
  container.appendChild(email);
  container.appendChild(withCount);
  return container;
}`,...(Q=(K=E.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var Z,X,Y;C.parameters={...C.parameters,docs:{...(Z=C.parameters)==null?void 0:Z.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 24px; max-width: 400px;';
  const states = [{
    name: 'Normal',
    props: {
      label: 'Normal State',
      placeholder: 'Enter text'
    }
  }, {
    name: 'Focused',
    props: {
      label: 'Focused State',
      placeholder: 'Click to focus',
      value: 'Sample text'
    }
  }, {
    name: 'Disabled',
    props: {
      label: 'Disabled State',
      placeholder: 'Cannot edit',
      disabled: true
    }
  }, {
    name: 'Read Only',
    props: {
      label: 'Read Only',
      value: 'Read only value',
      readonly: true
    }
  }, {
    name: 'Error',
    props: {
      label: 'Error State',
      placeholder: 'Invalid input',
      'helper-text': 'This field has an error'
    }
  }];
  states.forEach(({
    name,
    props
  }) => {
    const input = document.createElement('my-input');
    Object.entries(props).forEach(([key, value]) => {
      if (typeof value === 'boolean' && value) {
        input.setAttribute(key, '');
      } else if (typeof value === 'string') {
        input.setAttribute(key, value);
      }
    });
    container.appendChild(input);
  });
  return container;
}`,...(Y=(X=C.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var ee,te,ne;T.parameters={...T.parameters,docs:{...(ee=T.parameters)==null?void 0:ee.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 24px; max-width: 400px;';
  const textarea = document.createElement('my-input');
  textarea.setAttribute('type', 'textarea');
  textarea.setAttribute('label', 'Description');
  textarea.setAttribute('placeholder', 'Enter a detailed description...');
  textarea.setAttribute('helper-text', 'Provide as much detail as possible');
  textarea.setAttribute('character-count', '');
  textarea.setAttribute('maxlength', '500');
  container.appendChild(textarea);
  return container;
}`,...(ne=(te=T.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};var ae,le,ie;w.parameters={...w.parameters,docs:{...(ae=w.parameters)==null?void 0:ae.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; max-width: 1200px;';

  // Header
  const header = document.createElement('div');
  header.style.cssText = 'grid-column: 1 / -1; margin-bottom: 16px;';
  header.innerHTML = \`
    <h3 style="margin: 0 0 8px 0; font-size: 18px; color: var(--_global-color-primary);">
      Conditional Icon Visibility & Auto-Assignment
    </h3>
    <p style="margin: 0; font-size: 14px; color: var(--_global-color-on-surface-variant);">
      Icons are automatically assigned based on input type and only shown when relevant. This follows the Material Design guidelines and global config settings.
    </p>
  \`;
  container.appendChild(header);
  const inputTypesWithIcons = [{
    type: 'email',
    label: 'Email Address',
    placeholder: 'user@example.com',
    expectedIcon: 'mail'
  }, {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter password',
    expectedIcon: 'lock'
  }, {
    type: 'search',
    label: 'Search',
    placeholder: 'Search...',
    expectedIcon: 'search'
  }, {
    type: 'date',
    label: 'Date',
    expectedIcon: 'event'
  }, {
    type: 'datetime-local',
    label: 'Date & Time',
    expectedIcon: 'schedule'
  }, {
    type: 'time',
    label: 'Time',
    expectedIcon: 'access_time'
  }, {
    type: 'date-of-birth',
    label: 'Date of Birth',
    expectedIcon: 'cake'
  }, {
    type: 'tel',
    label: 'Phone Number',
    placeholder: '+1 (555) 123-4567',
    expectedIcon: 'phone'
  }, {
    type: 'url',
    label: 'Website',
    placeholder: 'https://example.com',
    expectedIcon: 'link'
  }, {
    type: 'number',
    label: 'Amount',
    placeholder: '100',
    expectedIcon: 'tag'
  }, {
    type: 'text',
    label: 'Plain Text',
    placeholder: 'No automatic icon',
    expectedIcon: null
  }, {
    type: 'textarea',
    label: 'Description',
    placeholder: 'No automatic icon',
    expectedIcon: null
  }];
  inputTypesWithIcons.forEach(({
    type,
    label,
    placeholder,
    expectedIcon
  }) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';
    const input = document.createElement('my-input');
    input.setAttribute('type', type);
    input.setAttribute('label', label);
    if (placeholder) input.setAttribute('placeholder', placeholder);

    // Add helper text explaining the expected behavior
    const helperText = expectedIcon ? \`Auto-assigned icon: \${expectedIcon}\` : 'No automatic icon assigned';
    input.setAttribute('helper-text', helperText);
    wrapper.appendChild(input);
    container.appendChild(wrapper);
  });
  return container;
}`,...(ie=(le=w.parameters)==null?void 0:le.docs)==null?void 0:ie.source}}};var re,oe,se;S.parameters={...S.parameters,docs:{...(re=S.parameters)==null?void 0:re.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'max-width: 1200px; display: flex; flex-direction: column; gap: 32px;';

  // Header
  const header = document.createElement('div');
  header.innerHTML = \`
    <h3 style="margin: 0 0 16px 0; font-size: 18px; color: var(--_global-color-primary);">
      Grid System Integration
    </h3>
    <p style="margin: 0 0 24px 0; font-size: 14px; color: var(--_global-color-on-surface-variant);">
      MyntUI inputs work seamlessly with the built-in grid system utilities for responsive layouts.
    </p>
  \`;
  container.appendChild(header);

  // Simple 2-column grid
  const grid2Col = document.createElement('div');
  grid2Col.className = 'u-display-grid u-grid-cols-2 u-gap-md';
  grid2Col.style.cssText = 'margin-bottom: 32px;';
  const grid2Title = document.createElement('h4');
  grid2Title.textContent = '2-Column Grid Layout';
  grid2Title.style.cssText = 'grid-column: 1 / -1; margin: 0 0 16px 0; font-size: 16px;';
  grid2Col.appendChild(grid2Title);
  ['First Name', 'Last Name'].forEach((label, index) => {
    const input = document.createElement('my-input');
    input.setAttribute('label', label);
    input.setAttribute('placeholder', \`Enter your \${label.toLowerCase()}\`);
    input.setAttribute('required', '');
    grid2Col.appendChild(input);
  });
  container.appendChild(grid2Col);

  // Responsive 3-column grid
  const grid3Col = document.createElement('div');
  grid3Col.className = 'u-display-grid u-grid-cols-1 u-md-grid-cols-3 u-gap-md';
  grid3Col.style.cssText = 'margin-bottom: 32px;';
  const grid3Title = document.createElement('h4');
  grid3Title.textContent = 'Responsive 3-Column Grid (1 col on mobile, 3 cols on tablet+)';
  grid3Title.style.cssText = 'grid-column: 1 / -1; margin: 0 0 16px 0; font-size: 16px;';
  grid3Col.appendChild(grid3Title);
  [{
    type: 'email',
    label: 'Email',
    placeholder: 'user@example.com'
  }, {
    type: 'tel',
    label: 'Phone',
    placeholder: '+1 (555) 123-4567'
  }, {
    type: 'date',
    label: 'Birth Date'
  }].forEach(({
    type,
    label,
    placeholder
  }) => {
    const input = document.createElement('my-input');
    input.setAttribute('type', type);
    input.setAttribute('label', label);
    if (placeholder) input.setAttribute('placeholder', placeholder);
    grid3Col.appendChild(input);
  });
  container.appendChild(grid3Col);

  // Mixed span grid
  const gridMixed = document.createElement('div');
  gridMixed.className = 'u-display-grid u-grid-cols-4 u-gap-md';
  gridMixed.style.cssText = 'margin-bottom: 32px;';
  const gridMixedTitle = document.createElement('h4');
  gridMixedTitle.textContent = 'Mixed Column Spans';
  gridMixedTitle.style.cssText = 'grid-column: 1 / -1; margin: 0 0 16px 0; font-size: 16px;';
  gridMixed.appendChild(gridMixedTitle);

  // Full width input
  const fullInput = document.createElement('my-input');
  fullInput.className = 'u-col-span-full';
  fullInput.setAttribute('type', 'textarea');
  fullInput.setAttribute('label', 'Full Width Description');
  fullInput.setAttribute('placeholder', 'This textarea spans all 4 columns...');
  gridMixed.appendChild(fullInput);

  // Two half-width inputs
  const halfInput1 = document.createElement('my-input');
  halfInput1.className = 'u-col-span-2';
  halfInput1.setAttribute('label', 'Half Width 1');
  halfInput1.setAttribute('placeholder', 'Spans 2 columns');
  gridMixed.appendChild(halfInput1);
  const halfInput2 = document.createElement('my-input');
  halfInput2.className = 'u-col-span-2';
  halfInput2.setAttribute('label', 'Half Width 2');
  halfInput2.setAttribute('placeholder', 'Spans 2 columns');
  gridMixed.appendChild(halfInput2);
  container.appendChild(gridMixed);
  return container;
}`,...(se=(oe=S.parameters)==null?void 0:oe.docs)==null?void 0:se.source}}};var ce,pe,de;I.parameters={...I.parameters,docs:{...(ce=I.parameters)==null?void 0:ce.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'max-width: 800px;';

  // Theme controls
  const controls = document.createElement('div');
  controls.style.cssText = 'margin-bottom: 32px; padding: 16px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md);';
  controls.innerHTML = \`
    <h4 style="margin: 0 0 16px 0; font-size: 16px;">Theme Controls</h4>
    <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
      <button id="light-theme" style="padding: 8px 16px; border: 1px solid var(--_global-color-outline); border-radius: var(--_global-border-radius-sm); background: var(--_global-color-surface); color: var(--_global-color-on-surface); cursor: pointer;">
        Light Theme
      </button>
      <button id="dark-theme" style="padding: 8px 16px; border: 1px solid var(--_global-color-outline); border-radius: var(--_global-border-radius-sm); background: var(--_global-color-surface); color: var(--_global-color-on-surface); cursor: pointer;">
        Dark Theme
      </button>
      <button id="auto-theme" style="padding: 8px 16px; border: 1px solid var(--_global-color-outline); border-radius: var(--_global-border-radius-sm); background: var(--_global-color-surface); color: var(--_global-color-on-surface); cursor: pointer;">
        Auto (System)
      </button>
    </div>
  \`;
  container.appendChild(controls);

  // Theme demonstration grid
  const themeDemo = document.createElement('div');
  themeDemo.className = 'u-display-grid u-grid-cols-2 u-gap-md';
  themeDemo.style.cssText = 'padding: 24px; background: var(--_global-color-surface); border: 1px solid var(--_global-color-outline-variant); border-radius: var(--_global-border-radius-md);';
  [{
    type: 'email',
    label: 'Email Address',
    variant: 'outlined'
  }, {
    type: 'password',
    label: 'Password',
    variant: 'filled'
  }, {
    type: 'search',
    label: 'Search',
    variant: 'outlined'
  }, {
    type: 'date',
    label: 'Date',
    variant: 'filled'
  }].forEach(({
    type,
    label,
    variant
  }) => {
    const input = document.createElement('my-input');
    input.setAttribute('type', type);
    input.setAttribute('label', label);
    input.setAttribute('variant', variant);
    input.setAttribute('helper-text', \`\${variant} variant in current theme\`);
    themeDemo.appendChild(input);
  });
  container.appendChild(themeDemo);

  // Add theme switching functionality
  setTimeout(() => {
    const lightBtn = container.querySelector('#light-theme');
    const darkBtn = container.querySelector('#dark-theme');
    const autoBtn = container.querySelector('#auto-theme');
    lightBtn?.addEventListener('click', () => {
      document.documentElement.setAttribute('data-color-scheme', 'light');
      globalConfig.set('theme.colorScheme', 'light');
    });
    darkBtn?.addEventListener('click', () => {
      document.documentElement.setAttribute('data-color-scheme', 'dark');
      globalConfig.set('theme.colorScheme', 'dark');
    });
    autoBtn?.addEventListener('click', () => {
      document.documentElement.removeAttribute('data-color-scheme');
      globalConfig.set('theme.colorScheme', 'auto');
    });
  }, 100);
  return container;
}`,...(de=(pe=I.parameters)==null?void 0:pe.docs)==null?void 0:de.source}}};var ue,me,be;_.parameters={..._.parameters,docs:{...(ue=_.parameters)==null?void 0:ue.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'max-width: 1200px;';

  // Header with description
  const header = document.createElement('div');
  header.innerHTML = \`
    <h3 style="margin: 0 0 16px 0; font-size: 20px; color: var(--_global-color-primary);">
      Enhanced Input Component Features
    </h3>
    <p style="margin: 0 0 32px 0; font-size: 14px; color: var(--_global-color-on-surface-variant); line-height: 1.5;">
      This showcase demonstrates all the enhanced features: automatic icon assignment from global config, 
      conditional icon visibility, theme switching support, and comprehensive input type coverage.
    </p>
  \`;
  container.appendChild(header);

  // Feature grid
  const featuresGrid = document.createElement('div');
  featuresGrid.className = 'u-display-grid u-grid-cols-2 u-gap-lg';
  const features = [{
    title: 'Automatic Icons',
    description: 'Icons automatically assigned based on input type',
    inputs: [{
      type: 'email',
      label: 'Email (auto mail icon)'
    }, {
      type: 'password',
      label: 'Password (auto lock icon)'
    }, {
      type: 'search',
      label: 'Search (auto search icon)'
    }, {
      type: 'date',
      label: 'Date (auto event icon)'
    }]
  }, {
    title: 'Theme Compatibility',
    description: 'All inputs work perfectly in light and dark themes',
    inputs: [{
      type: 'text',
      label: 'Text Input',
      variant: 'outlined'
    }, {
      type: 'email',
      label: 'Email Input',
      variant: 'filled'
    }, {
      type: 'number',
      label: 'Number Input',
      variant: 'outlined'
    }, {
      type: 'textarea',
      label: 'Textarea',
      variant: 'filled'
    }]
  }, {
    title: 'All Input Types',
    description: 'Complete support for all required input types',
    inputs: [{
      type: 'tel',
      label: 'Phone Number'
    }, {
      type: 'url',
      label: 'Website URL'
    }, {
      type: 'datetime-local',
      label: 'Date & Time'
    }, {
      type: 'time',
      label: 'Time Only'
    }]
  }, {
    title: 'Grid Integration',
    description: 'Seamless integration with utility grid system',
    inputs: [{
      type: 'text',
      label: 'First Name',
      placeholder: 'John'
    }, {
      type: 'text',
      label: 'Last Name',
      placeholder: 'Doe'
    }, {
      type: 'email',
      label: 'Email',
      placeholder: 'john@example.com'
    }, {
      type: 'tel',
      label: 'Phone',
      placeholder: '+1 234 567 8900'
    }]
  }];
  features.forEach(({
    title,
    description,
    inputs
  }) => {
    const featureSection = document.createElement('div');
    featureSection.style.cssText = 'padding: 24px; background: var(--_global-color-surface-container-low); border-radius: var(--_global-border-radius-md); border: 1px solid var(--_global-color-outline-variant);';
    const header = document.createElement('div');
    header.innerHTML = \`
      <h4 style="margin: 0 0 8px 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-primary);">\${title}</h4>
      <p style="margin: 0 0 20px 0; font-size: 13px; color: var(--_global-color-on-surface-variant); line-height: 1.4;">\${description}</p>
    \`;
    featureSection.appendChild(header);
    const inputsContainer = document.createElement('div');
    inputsContainer.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';
    inputs.forEach(({
      type,
      label,
      variant,
      placeholder
    }) => {
      const input = document.createElement('my-input');
      input.setAttribute('type', type);
      input.setAttribute('label', label);
      if (variant) input.setAttribute('variant', variant);
      if (placeholder) input.setAttribute('placeholder', placeholder);
      inputsContainer.appendChild(input);
    });
    featureSection.appendChild(inputsContainer);
    featuresGrid.appendChild(featureSection);
  });
  container.appendChild(featuresGrid);
  return container;
}`,...(be=(me=_.parameters)==null?void 0:me.docs)==null?void 0:be.source}}};var he,ge,ye;k.parameters={...k.parameters,docs:{...(he=k.parameters)==null?void 0:he.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'max-width: 1000px;';

  // Configuration controls
  const configControls = document.createElement('div');
  configControls.style.cssText = 'margin-bottom: 32px; padding: 20px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md);';
  configControls.innerHTML = \`
    <h4 style="margin: 0 0 20px 0; font-size: 16px; color: var(--_global-color-primary);">Global Configuration Controls</h4>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 20px;">
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: var(--_global-font-weight-medium);">Default Label Position:</label>
        <select id="label-position" style="width: 100%; padding: 8px; border: 1px solid var(--_global-color-outline-variant); border-radius: var(--_global-border-radius-sm); background: var(--_global-color-surface); color: var(--_global-color-on-surface);">
          <option value="top">Top</option>
          <option value="left">Left</option>
          <option value="over">Over (Floating)</option>
        </select>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: var(--_global-font-weight-medium);">Default Size:</label>
        <select id="default-size" style="width: 100%; padding: 8px; border: 1px solid var(--_global-color-outline-variant); border-radius: var(--_global-border-radius-sm); background: var(--_global-color-surface); color: var(--_global-color-on-surface);">
          <option value="small">Small</option>
          <option value="medium" selected>Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: var(--_global-font-weight-medium);">Default Variant:</label>
        <select id="default-variant" style="width: 100%; padding: 8px; border: 1px solid var(--_global-color-outline-variant); border-radius: var(--_global-border-radius-sm); background: var(--_global-color-surface); color: var(--_global-color-on-surface);">
          <option value="outlined" selected>Outlined</option>
          <option value="filled">Filled</option>
        </select>
      </div>
    </div>
    
    <button id="apply-config" style="padding: 12px 24px; background: var(--_global-color-primary); color: var(--_global-color-on-primary); border: none; border-radius: var(--_global-border-radius-sm); cursor: pointer; font-weight: var(--_global-font-weight-medium);">
      Apply Configuration
    </button>
  \`;
  container.appendChild(configControls);

  // Sample inputs that will reflect the configuration
  const sampleInputs = document.createElement('div');
  sampleInputs.id = 'sample-inputs';
  sampleInputs.className = 'u-display-grid u-grid-cols-2 u-gap-lg';
  sampleInputs.style.cssText = 'padding: 24px; background: var(--_global-color-surface); border: 1px solid var(--_global-color-outline-variant); border-radius: var(--_global-border-radius-md);';
  const renderSampleInputs = () => {
    sampleInputs.innerHTML = '';
    const inputConfig = globalConfig.get('components.input') || {};
    const themeConfig = globalConfig.get('theme') || {};
    [{
      type: 'text',
      label: 'Sample Text Input',
      placeholder: 'Using global config...'
    }, {
      type: 'email',
      label: 'Sample Email',
      placeholder: 'user@example.com'
    }, {
      type: 'password',
      label: 'Sample Password',
      placeholder: 'Password...'
    }, {
      type: 'textarea',
      label: 'Sample Textarea',
      placeholder: 'Multi-line text...'
    }].forEach(({
      type,
      label,
      placeholder
    }) => {
      const input = document.createElement('my-input');
      input.setAttribute('type', type);
      input.setAttribute('label', label);
      input.setAttribute('placeholder', placeholder);
      input.setAttribute('label-position', themeConfig.labelPosition || inputConfig.labelPosition || 'top');
      input.setAttribute('size', inputConfig.size || 'medium');
      input.setAttribute('variant', inputConfig.variant || 'outlined');
      input.setAttribute('helper-text', \`Using: \${input.getAttribute('label-position')} label, \${input.getAttribute('size')} size, \${input.getAttribute('variant')} variant\`);
      sampleInputs.appendChild(input);
    });
  };
  renderSampleInputs();
  container.appendChild(sampleInputs);

  // Add configuration change functionality
  setTimeout(() => {
    const applyBtn = container.querySelector('#apply-config');
    const labelPosSelect = container.querySelector('#label-position');
    const sizeSelect = container.querySelector('#default-size');
    const variantSelect = container.querySelector('#default-variant');
    applyBtn?.addEventListener('click', () => {
      // Update global configuration
      globalConfig.set('theme.labelPosition', labelPosSelect.value);
      globalConfig.set('components.input.size', sizeSelect.value);
      globalConfig.set('components.input.variant', variantSelect.value);

      // Re-render sample inputs
      renderSampleInputs();
    });
  }, 100);
  return container;
}`,...(ye=(ge=k.parameters)==null?void 0:ge.docs)==null?void 0:ye.source}}};const Ce=["Default","Types","Variants","Sizes","LabelPositions","WithIcons","ValidationStates","States","Textarea","ConditionalIconShowcase","GridSystemShowcase","ThemeCompatibilityShowcase","EnhancedFeatureShowcase","GlobalConfigShowcase"];export{w as ConditionalIconShowcase,g as Default,_ as EnhancedFeatureShowcase,k as GlobalConfigShowcase,S as GridSystemShowcase,v as LabelPositions,f as Sizes,C as States,T as Textarea,I as ThemeCompatibilityShowcase,y as Types,E as ValidationStates,x as Variants,A as WithIcons,Ce as __namedExportsOrder,Ee as default};
