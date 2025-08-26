import"./my-input-Cr2iSYlQ.js";import"./my-button-WudZcNwy.js";import"./my-checkbox-BMhv1J44.js";import"./my-radio-group-DgIt2bh1.js";import"./my-dropdown-CiMYD9E9.js";import"./my-tooltip-B3RMpmFT.js";import"./my-modal-Cik2IHTQ.js";import"./my-drawer-CI78YKtn.js";import"./my-notification-CsCwobM5.js";import"./my-data-list-DU8MtKuH.js";import"./my-data-table-C8ZCmYSs.js";import"./my-data-chart-B3QHoMTF.js";import"./my-progress-RNfs7yqs.js";import"./my-sparkline-CJMl-uDe.js";import"./my-icon-O3BbYCXg.js";import"./base-component-q4KNMHwB.js";const Te={title:"Complete Showcase/All Components",parameters:{docs:{description:{component:"Complete showcase of all MyntUI components with all variants, states, and input types as specified in CONTRIBUTING.md. This demonstrates the entire component library in action."}},layout:"fullscreen"}},T=()=>{const e=document.createElement("div");e.style.cssText=`
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 48px;
    max-width: 1400px;
    margin: 0 auto;
    font-family: var(--_global-font-family-sans, 'Inter', system-ui, sans-serif);
  `;const l=document.createElement("h1");l.textContent="MyntUI Complete Component Showcase",l.style.cssText=`
    text-align: center;
    font-size: 2.5rem;
    font-weight: var(--_global-font-weight-bold, 700);
    color: var(--_global-color-text-primary, #1a1a1a);
    margin: 0;
  `;const a=document.createElement("p");a.textContent="A comprehensive display of all components, variants, and input types",a.style.cssText=`
    text-align: center;
    font-size: 1.125rem;
    color: var(--_global-color-text-secondary, #666);
    margin: 0;
  `,e.appendChild(l),e.appendChild(a);const o=c("Input Components - All Types","Complete showcase of all 17 required input types from CONTRIBUTING.md"),p=document.createElement("div");p.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;",[{type:"text",label:"Text Input",placeholder:"Enter text here",helperText:"Basic text input"},{type:"pattern",label:"Pattern Input",placeholder:"ABC123",pattern:"[A-Z]{3}[0-9]{3}",helperText:"Format: ABC123"},{type:"number",label:"Number Input",placeholder:"42",min:"0",max:"100",helperText:"Numeric values only"},{type:"integer",label:"Integer Input",placeholder:"25",min:"1",step:"1",helperText:"Whole numbers only"},{type:"date",label:"Date Input",helperText:"Select a date"},{type:"datetime-local",label:"DateTime Input",helperText:"Date and time"},{type:"time",label:"Time Input",helperText:"Time selection"},{type:"date-of-birth",label:"Date of Birth",helperText:"Special date picker for DOB"},{type:"email",label:"Email Input",placeholder:"user@example.com",helperText:"Valid email address"},{type:"password",label:"Password Input",placeholder:"Enter password",helperText:"Secure password"},{type:"url",label:"URL Input",placeholder:"https://example.com",helperText:"Valid URL"},{type:"tel",label:"Phone Input",placeholder:"+1 (555) 123-4567",helperText:"Phone number"},{type:"textarea",label:"Textarea",placeholder:"Multiple lines of text...",helperText:"Multi-line text input"},{type:"select",label:"Select Input",helperText:"Choose an option",options:[{label:"Option 1",value:"opt1"},{label:"Option 2",value:"opt2"},{label:"Option 3",value:"opt3"}]},{type:"dynamic-select",label:"Dynamic Select",placeholder:"Start typing...",helperText:"Searchable select"},{type:"checkbox",label:"Agree to terms",helperText:"Checkbox input"},{type:"radio",label:"Radio option",helperText:"Single radio input"}].forEach(n=>{const t=X(n);p.appendChild(t)}),o.appendChild(p),e.appendChild(o);const u=c("Button Components","Various button variants and states"),m=document.createElement("div");m.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; align-items: start;",[{label:"Primary Button",variant:"primary"},{label:"Secondary Button",variant:"secondary"},{label:"Tertiary Button",variant:"tertiary"},{label:"Ghost Button",variant:"ghost"},{label:"Disabled Button",variant:"primary",disabled:!0},{label:"Loading Button",variant:"primary",loading:!0}].forEach(n=>{const t=document.createElement("my-button");t.setAttribute("label",n.label),n.variant&&t.setAttribute("variant",n.variant),n.disabled&&t.setAttribute("disabled",""),n.loading&&t.setAttribute("loading","");const b=r(n.label);b.appendChild(t),m.appendChild(b)}),u.appendChild(m),e.appendChild(u);const h=c("Boolean Input Components","Toggles, checkboxes, and radio groups"),i=document.createElement("div");i.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;";const _=r("Toggle Switches");[{label:"Enable notifications",checked:!0},{label:"Dark mode",checked:!1},{label:"Auto-save",checked:!0,disabled:!0},{label:"Disabled toggle",checked:!1,disabled:!0}].forEach(n=>{const t=document.createElement("my-toggle");t.setAttribute("label",n.label),n.checked&&t.setAttribute("checked",""),n.disabled&&t.setAttribute("disabled",""),t.style.marginBottom="12px",_.appendChild(t)}),i.appendChild(_);const z=r("Checkboxes");[{label:"Accept terms",checked:!0},{label:"Subscribe to newsletter",checked:!1},{label:"Indeterminate state",indeterminate:!0},{label:"Disabled checkbox",checked:!1,disabled:!0}].forEach(n=>{const t=document.createElement("my-checkbox");t.setAttribute("label",n.label),n.checked&&t.setAttribute("checked",""),n.indeterminate&&t.setAttribute("indeterminate",""),n.disabled&&t.setAttribute("disabled",""),t.style.marginBottom="12px",z.appendChild(t)}),i.appendChild(z);const S=r("Radio Groups"),g=document.createElement("my-radio-group");g.setAttribute("label","Choose size"),g.setAttribute("name","size-group"),g.setAttribute("value","medium"),["Small","Medium","Large"].forEach(n=>{const t=document.createElement("my-radio");t.setAttribute("value",n.toLowerCase()),t.setAttribute("label",n),g.appendChild(t)}),S.appendChild(g);const d=document.createElement("my-radio-group");d.setAttribute("label","Choose color"),d.setAttribute("name","color-group"),d.setAttribute("layout","horizontal"),d.setAttribute("value","blue"),d.style.marginTop="24px",["Red","Green","Blue"].forEach(n=>{const t=document.createElement("my-radio");t.setAttribute("value",n.toLowerCase()),t.setAttribute("label",n),d.appendChild(t)}),S.appendChild(d),i.appendChild(S),h.appendChild(i),e.appendChild(h);const O=c("Interactive Components","Dropdowns, tooltips, and modals"),x=document.createElement("div");x.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;";const M=r("Dropdown Menu"),I=document.createElement("my-dropdown");I.setAttribute("label","Options Menu");const Y=[{label:"Edit",value:"edit"},{label:"Delete",value:"delete"},{label:"Share",value:"share"}];I.options=Y,M.appendChild(I),x.appendChild(M);const U=r("Tooltip"),k=document.createElement("my-tooltip");k.setAttribute("text","This is a helpful tooltip message");const w=document.createElement("my-button");w.setAttribute("label","Hover for tooltip"),w.setAttribute("variant","secondary"),k.appendChild(w),U.appendChild(k),x.appendChild(U);const N=r("Modal Dialog"),v=document.createElement("my-button");v.setAttribute("label","Open Modal"),v.setAttribute("variant","primary"),v.addEventListener("click",()=>{const n=document.createElement("my-modal");n.setAttribute("title","Example Modal"),n.setAttribute("open",""),n.innerHTML=`
      <div slot="body">
        <p>This is modal content. Modals are injected into the document body for proper layering.</p>
      </div>
      <div slot="footer">
        <my-button variant="text" onclick="this.closest('my-modal').remove()">Cancel</my-button>
        <my-button variant="primary" onclick="this.closest('my-modal').remove()">OK</my-button>
      </div>
    `,document.body.appendChild(n)}),N.appendChild(v),x.appendChild(N),O.appendChild(x),e.appendChild(O);const P=c("Data Visualization Components","Progress bars, gauges, and sparklines"),y=document.createElement("div");y.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;";const L=r("Progress Indicators");[{label:"Basic Progress",value:75},{label:"Success Progress",value:100,variant:"success"},{label:"Warning Progress",value:60,variant:"warning"},{label:"Error Progress",value:30,variant:"error"}].forEach(n=>{const t=document.createElement("my-progress");t.setAttribute("label",n.label),t.setAttribute("value",n.value.toString()),n.variant&&t.setAttribute("variant",n.variant),t.style.marginBottom="16px",L.appendChild(t)}),y.appendChild(L);const q=r("Gauge Components");[{label:"CPU Usage",value:65,min:0,max:100},{label:"Memory",value:45,min:0,max:100},{label:"Disk Space",value:85,min:0,max:100}].forEach(n=>{const t=document.createElement("my-gauge");t.setAttribute("label",n.label),t.setAttribute("value",n.value.toString()),t.setAttribute("min",n.min.toString()),t.setAttribute("max",n.max.toString()),t.style.marginBottom="16px",q.appendChild(t)}),y.appendChild(q);const G=r("Sparkline Trends"),ee=[12,19,3,5,2,3,20,15,8,10,25,18,22],B=document.createElement("my-sparkline");B.data=ee,B.setAttribute("color","var(--_global-color-primary, #6366f1)"),G.appendChild(B);const f=document.createElement("my-sparkline");f.data=[5,8,12,15,10,8,12,18,20,15,12,8,10],f.setAttribute("color","var(--_global-color-success, #10b981)"),f.style.marginTop="12px",G.appendChild(f),y.appendChild(G),P.appendChild(y),e.appendChild(P);const F=c("Icon Components","Material Icons showcase"),R=document.createElement("div");return R.style.cssText="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 16px; text-align: center;",["home","settings","favorite","star","info","warning","error","check_circle","person","group","mail","phone","location_on","event","work","school","shopping_cart","payment","account_circle","notifications","visibility","edit","delete","add","remove","search","menu","close"].forEach(n=>{const t=document.createElement("div");t.style.cssText=`
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 16px;
      background: var(--_global-color-surface, white);
      border: 1px solid var(--_global-color-outline, #e5e5e5);
      border-radius: var(--_global-border-radius-md, 8px);
    `;const b=document.createElement("my-icon");b.setAttribute("icon",n),b.style.fontSize="24px";const D=document.createElement("span");D.textContent=n,D.style.cssText="font-size: 12px; color: var(--_global-color-text-secondary, #666);",t.appendChild(b),t.appendChild(D),R.appendChild(t)}),F.appendChild(R),e.appendChild(F),e},E=()=>{const e=document.createElement("div");e.style.cssText=`
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    max-width: 1200px;
    margin: 0 auto;
  `;const l=document.createElement("h1");l.textContent="All 17 Required Input Types",l.style.cssText="text-align: center; margin: 0 0 16px 0; font-size: 2rem; font-weight: 700;";const a=document.createElement("p");a.textContent="Complete implementation of all input types specified in CONTRIBUTING.md",a.style.cssText="text-align: center; color: #666; margin: 0 0 32px 0;";const o=document.createElement("div");return o.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px;",[{type:"text",label:"Text Input",placeholder:"Enter your name",value:"Sample text"},{type:"pattern",label:"Pattern Input",placeholder:"ABC123",pattern:"[A-Z]{3}[0-9]{3}",helperText:"Format: ABC123"},{type:"number",label:"Number Input",placeholder:"42.5",min:"0",max:"100"},{type:"integer",label:"Integer Input",placeholder:"25",min:"1",step:"1"},{type:"date",label:"Date Input",value:"2024-01-15"},{type:"datetime-local",label:"DateTime Local",value:"2024-01-15T10:30"},{type:"time",label:"Time Input",value:"14:30"},{type:"date-of-birth",label:"Date of Birth",helperText:"Special DOB picker"},{type:"email",label:"Email Input",placeholder:"user@example.com",value:"test@example.com"},{type:"password",label:"Password Input",placeholder:"Enter password"},{type:"url",label:"URL Input",placeholder:"https://example.com",value:"https://github.com"},{type:"tel",label:"Telephone Input",placeholder:"+1 (555) 123-4567",value:"+1 555 123 4567"},{type:"textarea",label:"Textarea Input",placeholder:"Multi-line text...",value:"This is a multi-line\\ntext area example."},{type:"select",label:"Select Input",options:[{label:"United States",value:"US"},{label:"Canada",value:"CA"},{label:"United Kingdom",value:"UK"},{label:"Australia",value:"AU"}],value:"CA"},{type:"dynamic-select",label:"Dynamic Select",placeholder:"Start typing city...",helperText:"Searchable dropdown"},{type:"checkbox",label:"Checkbox Input",value:"true"},{type:"radio",label:"Radio Input",value:"true"}].forEach(s=>{const u=X(s);o.appendChild(u)}),e.appendChild(l),e.appendChild(a),e.appendChild(o),e},A=()=>{const e=document.createElement("div");e.style.cssText=`
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    max-width: 1200px;
    margin: 0 auto;
  `;const l=document.createElement("h1");l.textContent="Component States & Variants",l.style.cssText="text-align: center; margin: 0 0 32px 0; font-size: 2rem; font-weight: 700;";const a=c("Input States","All input states and variants"),o=document.createElement("div");return o.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;",[{state:"Normal",props:{label:"Normal State",placeholder:"Enter text"}},{state:"Filled",props:{label:"Filled State",value:"Sample value"}},{state:"Focused",props:{label:"Focused State",placeholder:"Focused input",autofocus:!0}},{state:"Required",props:{label:"Required Field",placeholder:"Required input",required:!0}},{state:"Disabled",props:{label:"Disabled State",placeholder:"Cannot edit",disabled:!0}},{state:"Read Only",props:{label:"Read Only",value:"Read only value",readonly:!0}},{state:"With Helper",props:{label:"With Helper Text",placeholder:"Input with help",helperText:"This is helper text"}},{state:"Character Count",props:{label:"Character Count",placeholder:"Type here...",maxlength:"50",characterCount:!0}}].forEach(({state:s,props:u})=>{const m=r(s+" Input"),C=document.createElement("my-input");Object.entries(u).forEach(([h,i])=>{typeof i=="boolean"&&i?C.setAttribute(h.replace(/([A-Z])/g,"-$1").toLowerCase(),""):typeof i=="string"&&C.setAttribute(h.replace(/([A-Z])/g,"-$1").toLowerCase(),i)}),m.appendChild(C),o.appendChild(m)}),a.appendChild(o),e.appendChild(a),e};function c(e,l){const a=document.createElement("section");a.style.cssText="display: flex; flex-direction: column; gap: 24px;";const o=document.createElement("div");o.style.cssText="text-align: center;";const p=document.createElement("h2");p.textContent=e,p.style.cssText=`
    font-size: 1.75rem;
    font-weight: var(--_global-font-weight-bold, 700);
    color: var(--_global-color-text-primary, #1a1a1a);
    margin: 0 0 8px 0;
  `;const s=document.createElement("p");return s.textContent=l,s.style.cssText=`
    font-size: 1rem;
    color: var(--_global-color-text-secondary, #666);
    margin: 0;
  `,o.appendChild(p),o.appendChild(s),a.appendChild(o),a}function r(e){const l=document.createElement("div");l.style.cssText=`
    padding: 24px;
    background: var(--_global-color-surface, white);
    border: 1px solid var(--_global-color-outline, #e5e5e5);
    border-radius: var(--_global-border-radius-lg, 12px);
    display: flex;
    flex-direction: column;
    gap: 16px;
  `;const a=document.createElement("h3");return a.textContent=e,a.style.cssText=`
    font-size: 1.125rem;
    font-weight: var(--_global-font-weight-medium, 600);
    color: var(--_global-color-text-primary, #1a1a1a);
    margin: 0;
  `,l.appendChild(a),l}function X(e){const l=r(`${e.type.charAt(0).toUpperCase()+e.type.slice(1)} Input`),a=document.createElement("my-input");if(a.setAttribute("type",e.type),a.setAttribute("label",e.label),e.placeholder&&a.setAttribute("placeholder",e.placeholder),e.value&&a.setAttribute("value",e.value),e.helperText&&a.setAttribute("helper-text",e.helperText),e.pattern&&a.setAttribute("pattern",e.pattern),e.min&&a.setAttribute("min",e.min),e.max&&a.setAttribute("max",e.max),e.step&&a.setAttribute("step",e.step),e.maxlength&&a.setAttribute("maxlength",e.maxlength),e.required&&a.setAttribute("required",""),e.disabled&&a.setAttribute("disabled",""),e.readonly&&a.setAttribute("readonly",""),e.options){const o={type:e.type,label:e.label,options:e.options,placeholder:e.placeholder,helperText:e.helperText};a.setAttribute("schema",JSON.stringify(o))}return l.appendChild(a),l}var V,W,H;T.parameters={...T.parameters,docs:{...(V=T.parameters)==null?void 0:V.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = \`
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 48px;
    max-width: 1400px;
    margin: 0 auto;
    font-family: var(--_global-font-family-sans, 'Inter', system-ui, sans-serif);
  \`;

  // Title
  const title = document.createElement('h1');
  title.textContent = 'MyntUI Complete Component Showcase';
  title.style.cssText = \`
    text-align: center;
    font-size: 2.5rem;
    font-weight: var(--_global-font-weight-bold, 700);
    color: var(--_global-color-text-primary, #1a1a1a);
    margin: 0;
  \`;

  // Subtitle
  const subtitle = document.createElement('p');
  subtitle.textContent = 'A comprehensive display of all components, variants, and input types';
  subtitle.style.cssText = \`
    text-align: center;
    font-size: 1.125rem;
    color: var(--_global-color-text-secondary, #666);
    margin: 0;
  \`;
  container.appendChild(title);
  container.appendChild(subtitle);

  // Input Components Section - All Required Input Types
  const inputSection = createSection('Input Components - All Types', 'Complete showcase of all 17 required input types from CONTRIBUTING.md');
  const inputGrid = document.createElement('div');
  inputGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;';
  const inputTypes = [{
    type: 'text',
    label: 'Text Input',
    placeholder: 'Enter text here',
    helperText: 'Basic text input'
  }, {
    type: 'pattern',
    label: 'Pattern Input',
    placeholder: 'ABC123',
    pattern: '[A-Z]{3}[0-9]{3}',
    helperText: 'Format: ABC123'
  }, {
    type: 'number',
    label: 'Number Input',
    placeholder: '42',
    min: '0',
    max: '100',
    helperText: 'Numeric values only'
  }, {
    type: 'integer',
    label: 'Integer Input',
    placeholder: '25',
    min: '1',
    step: '1',
    helperText: 'Whole numbers only'
  }, {
    type: 'date',
    label: 'Date Input',
    helperText: 'Select a date'
  }, {
    type: 'datetime-local',
    label: 'DateTime Input',
    helperText: 'Date and time'
  }, {
    type: 'time',
    label: 'Time Input',
    helperText: 'Time selection'
  }, {
    type: 'date-of-birth',
    label: 'Date of Birth',
    helperText: 'Special date picker for DOB'
  }, {
    type: 'email',
    label: 'Email Input',
    placeholder: 'user@example.com',
    helperText: 'Valid email address'
  }, {
    type: 'password',
    label: 'Password Input',
    placeholder: 'Enter password',
    helperText: 'Secure password'
  }, {
    type: 'url',
    label: 'URL Input',
    placeholder: 'https://example.com',
    helperText: 'Valid URL'
  }, {
    type: 'tel',
    label: 'Phone Input',
    placeholder: '+1 (555) 123-4567',
    helperText: 'Phone number'
  }, {
    type: 'textarea',
    label: 'Textarea',
    placeholder: 'Multiple lines of text...',
    helperText: 'Multi-line text input'
  }, {
    type: 'select',
    label: 'Select Input',
    helperText: 'Choose an option',
    options: [{
      label: 'Option 1',
      value: 'opt1'
    }, {
      label: 'Option 2',
      value: 'opt2'
    }, {
      label: 'Option 3',
      value: 'opt3'
    }]
  }, {
    type: 'dynamic-select',
    label: 'Dynamic Select',
    placeholder: 'Start typing...',
    helperText: 'Searchable select'
  }, {
    type: 'checkbox',
    label: 'Agree to terms',
    helperText: 'Checkbox input'
  }, {
    type: 'radio',
    label: 'Radio option',
    helperText: 'Single radio input'
  }];
  inputTypes.forEach(input => {
    const inputCard = createInputCard(input);
    inputGrid.appendChild(inputCard);
  });
  inputSection.appendChild(inputGrid);
  container.appendChild(inputSection);

  // Button Components Section
  const buttonSection = createSection('Button Components', 'Various button variants and states');
  const buttonGrid = document.createElement('div');
  buttonGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; align-items: start;';
  const buttonVariants = [{
    label: 'Primary Button',
    variant: 'primary'
  }, {
    label: 'Secondary Button',
    variant: 'secondary'
  }, {
    label: 'Tertiary Button',
    variant: 'tertiary'
  }, {
    label: 'Ghost Button',
    variant: 'ghost'
  }, {
    label: 'Disabled Button',
    variant: 'primary',
    disabled: true
  }, {
    label: 'Loading Button',
    variant: 'primary',
    loading: true
  }];
  buttonVariants.forEach(btn => {
    const button = document.createElement('my-button');
    button.setAttribute('label', btn.label);
    if (btn.variant) button.setAttribute('variant', btn.variant);
    if (btn.disabled) button.setAttribute('disabled', '');
    if (btn.loading) button.setAttribute('loading', '');
    const buttonCard = createCard(btn.label);
    buttonCard.appendChild(button);
    buttonGrid.appendChild(buttonCard);
  });
  buttonSection.appendChild(buttonGrid);
  container.appendChild(buttonSection);

  // Boolean Input Components Section
  const booleanSection = createSection('Boolean Input Components', 'Toggles, checkboxes, and radio groups');
  const booleanGrid = document.createElement('div');
  booleanGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;';

  // Toggle examples
  const toggleCard = createCard('Toggle Switches');
  const toggles = [{
    label: 'Enable notifications',
    checked: true
  }, {
    label: 'Dark mode',
    checked: false
  }, {
    label: 'Auto-save',
    checked: true,
    disabled: true
  }, {
    label: 'Disabled toggle',
    checked: false,
    disabled: true
  }];
  toggles.forEach(toggle => {
    const toggleEl = document.createElement('my-toggle');
    toggleEl.setAttribute('label', toggle.label);
    if (toggle.checked) toggleEl.setAttribute('checked', '');
    if (toggle.disabled) toggleEl.setAttribute('disabled', '');
    toggleEl.style.marginBottom = '12px';
    toggleCard.appendChild(toggleEl);
  });
  booleanGrid.appendChild(toggleCard);

  // Checkbox examples
  const checkboxCard = createCard('Checkboxes');
  const checkboxes = [{
    label: 'Accept terms',
    checked: true
  }, {
    label: 'Subscribe to newsletter',
    checked: false
  }, {
    label: 'Indeterminate state',
    indeterminate: true
  }, {
    label: 'Disabled checkbox',
    checked: false,
    disabled: true
  }];
  checkboxes.forEach(checkbox => {
    const checkboxEl = document.createElement('my-checkbox');
    checkboxEl.setAttribute('label', checkbox.label);
    if (checkbox.checked) checkboxEl.setAttribute('checked', '');
    if (checkbox.indeterminate) checkboxEl.setAttribute('indeterminate', '');
    if (checkbox.disabled) checkboxEl.setAttribute('disabled', '');
    checkboxEl.style.marginBottom = '12px';
    checkboxCard.appendChild(checkboxEl);
  });
  booleanGrid.appendChild(checkboxCard);

  // Radio Group examples
  const radioCard = createCard('Radio Groups');

  // Vertical radio group
  const verticalRadioGroup = document.createElement('my-radio-group');
  verticalRadioGroup.setAttribute('label', 'Choose size');
  verticalRadioGroup.setAttribute('name', 'size-group');
  verticalRadioGroup.setAttribute('value', 'medium');
  ['Small', 'Medium', 'Large'].forEach(size => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', size.toLowerCase());
    radio.setAttribute('label', size);
    verticalRadioGroup.appendChild(radio);
  });
  radioCard.appendChild(verticalRadioGroup);

  // Horizontal radio group
  const horizontalRadioGroup = document.createElement('my-radio-group');
  horizontalRadioGroup.setAttribute('label', 'Choose color');
  horizontalRadioGroup.setAttribute('name', 'color-group');
  horizontalRadioGroup.setAttribute('layout', 'horizontal');
  horizontalRadioGroup.setAttribute('value', 'blue');
  horizontalRadioGroup.style.marginTop = '24px';
  ['Red', 'Green', 'Blue'].forEach(color => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', color.toLowerCase());
    radio.setAttribute('label', color);
    horizontalRadioGroup.appendChild(radio);
  });
  radioCard.appendChild(horizontalRadioGroup);
  booleanGrid.appendChild(radioCard);
  booleanSection.appendChild(booleanGrid);
  container.appendChild(booleanSection);

  // Interactive Components Section
  const interactiveSection = createSection('Interactive Components', 'Dropdowns, tooltips, and modals');
  const interactiveGrid = document.createElement('div');
  interactiveGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;';

  // Dropdown
  const dropdownCard = createCard('Dropdown Menu');
  const dropdown = document.createElement('my-dropdown');
  dropdown.setAttribute('label', 'Options Menu');
  const dropdownOptions = [{
    label: 'Edit',
    value: 'edit'
  }, {
    label: 'Delete',
    value: 'delete'
  }, {
    label: 'Share',
    value: 'share'
  }];
  dropdown.options = dropdownOptions;
  dropdownCard.appendChild(dropdown);
  interactiveGrid.appendChild(dropdownCard);

  // Tooltip
  const tooltipCard = createCard('Tooltip');
  const tooltipWrapper = document.createElement('my-tooltip');
  tooltipWrapper.setAttribute('text', 'This is a helpful tooltip message');
  const tooltipButton = document.createElement('my-button');
  tooltipButton.setAttribute('label', 'Hover for tooltip');
  tooltipButton.setAttribute('variant', 'secondary');
  tooltipWrapper.appendChild(tooltipButton);
  tooltipCard.appendChild(tooltipWrapper);
  interactiveGrid.appendChild(tooltipCard);

  // Modal trigger
  const modalCard = createCard('Modal Dialog');
  const modalButton = document.createElement('my-button');
  modalButton.setAttribute('label', 'Open Modal');
  modalButton.setAttribute('variant', 'primary');
  modalButton.addEventListener('click', () => {
    const modal = document.createElement('my-modal');
    modal.setAttribute('title', 'Example Modal');
    modal.setAttribute('open', '');
    modal.innerHTML = \`
      <div slot="body">
        <p>This is modal content. Modals are injected into the document body for proper layering.</p>
      </div>
      <div slot="footer">
        <my-button variant="text" onclick="this.closest('my-modal').remove()">Cancel</my-button>
        <my-button variant="primary" onclick="this.closest('my-modal').remove()">OK</my-button>
      </div>
    \`;
    document.body.appendChild(modal);
  });
  modalCard.appendChild(modalButton);
  interactiveGrid.appendChild(modalCard);
  interactiveSection.appendChild(interactiveGrid);
  container.appendChild(interactiveSection);

  // Data Visualization Section
  const dataSection = createSection('Data Visualization Components', 'Progress bars, gauges, and sparklines');
  const dataGrid = document.createElement('div');
  dataGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;';

  // Progress bars
  const progressCard = createCard('Progress Indicators');
  const progressTypes = [{
    label: 'Basic Progress',
    value: 75
  }, {
    label: 'Success Progress',
    value: 100,
    variant: 'success'
  }, {
    label: 'Warning Progress',
    value: 60,
    variant: 'warning'
  }, {
    label: 'Error Progress',
    value: 30,
    variant: 'error'
  }];
  progressTypes.forEach(progress => {
    const progressEl = document.createElement('my-progress');
    progressEl.setAttribute('label', progress.label);
    progressEl.setAttribute('value', progress.value.toString());
    if (progress.variant) progressEl.setAttribute('variant', progress.variant);
    progressEl.style.marginBottom = '16px';
    progressCard.appendChild(progressEl);
  });
  dataGrid.appendChild(progressCard);

  // Gauges
  const gaugeCard = createCard('Gauge Components');
  const gauges = [{
    label: 'CPU Usage',
    value: 65,
    min: 0,
    max: 100
  }, {
    label: 'Memory',
    value: 45,
    min: 0,
    max: 100
  }, {
    label: 'Disk Space',
    value: 85,
    min: 0,
    max: 100
  }];
  gauges.forEach(gauge => {
    const gaugeEl = document.createElement('my-gauge');
    gaugeEl.setAttribute('label', gauge.label);
    gaugeEl.setAttribute('value', gauge.value.toString());
    gaugeEl.setAttribute('min', gauge.min.toString());
    gaugeEl.setAttribute('max', gauge.max.toString());
    gaugeEl.style.marginBottom = '16px';
    gaugeCard.appendChild(gaugeEl);
  });
  dataGrid.appendChild(gaugeCard);

  // Sparklines
  const sparklineCard = createCard('Sparkline Trends');
  const sparklineData = [12, 19, 3, 5, 2, 3, 20, 15, 8, 10, 25, 18, 22];
  const sparkline = document.createElement('my-sparkline');
  sparkline.data = sparklineData;
  sparkline.setAttribute('color', 'var(--_global-color-primary, #6366f1)');
  sparklineCard.appendChild(sparkline);
  const sparkline2 = document.createElement('my-sparkline');
  sparkline2.data = [5, 8, 12, 15, 10, 8, 12, 18, 20, 15, 12, 8, 10];
  sparkline2.setAttribute('color', 'var(--_global-color-success, #10b981)');
  sparkline2.style.marginTop = '12px';
  sparklineCard.appendChild(sparkline2);
  dataGrid.appendChild(sparklineCard);
  dataSection.appendChild(dataGrid);
  container.appendChild(dataSection);

  // Icon Components Section
  const iconSection = createSection('Icon Components', 'Material Icons showcase');
  const iconGrid = document.createElement('div');
  iconGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 16px; text-align: center;';
  const iconNames = ['home', 'settings', 'favorite', 'star', 'info', 'warning', 'error', 'check_circle', 'person', 'group', 'mail', 'phone', 'location_on', 'event', 'work', 'school', 'shopping_cart', 'payment', 'account_circle', 'notifications', 'visibility', 'edit', 'delete', 'add', 'remove', 'search', 'menu', 'close'];
  iconNames.forEach(iconName => {
    const iconCard = document.createElement('div');
    iconCard.style.cssText = \`
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 16px;
      background: var(--_global-color-surface, white);
      border: 1px solid var(--_global-color-outline, #e5e5e5);
      border-radius: var(--_global-border-radius-md, 8px);
    \`;
    const icon = document.createElement('my-icon');
    icon.setAttribute('icon', iconName);
    icon.style.fontSize = '24px';
    const label = document.createElement('span');
    label.textContent = iconName;
    label.style.cssText = 'font-size: 12px; color: var(--_global-color-text-secondary, #666);';
    iconCard.appendChild(icon);
    iconCard.appendChild(label);
    iconGrid.appendChild(iconCard);
  });
  iconSection.appendChild(iconGrid);
  container.appendChild(iconSection);
  return container;
}`,...(H=(W=T.parameters)==null?void 0:W.docs)==null?void 0:H.source}}};var Z,K,$;E.parameters={...E.parameters,docs:{...(Z=E.parameters)==null?void 0:Z.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = \`
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    max-width: 1200px;
    margin: 0 auto;
  \`;
  const title = document.createElement('h1');
  title.textContent = 'All 17 Required Input Types';
  title.style.cssText = 'text-align: center; margin: 0 0 16px 0; font-size: 2rem; font-weight: 700;';
  const subtitle = document.createElement('p');
  subtitle.textContent = 'Complete implementation of all input types specified in CONTRIBUTING.md';
  subtitle.style.cssText = 'text-align: center; color: #666; margin: 0 0 32px 0;';
  const grid = document.createElement('div');
  grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px;';

  // All required input types from CONTRIBUTING.md
  const allInputTypes = [{
    type: 'text',
    label: 'Text Input',
    placeholder: 'Enter your name',
    value: 'Sample text'
  }, {
    type: 'pattern',
    label: 'Pattern Input',
    placeholder: 'ABC123',
    pattern: '[A-Z]{3}[0-9]{3}',
    helperText: 'Format: ABC123'
  }, {
    type: 'number',
    label: 'Number Input',
    placeholder: '42.5',
    min: '0',
    max: '100'
  }, {
    type: 'integer',
    label: 'Integer Input',
    placeholder: '25',
    min: '1',
    step: '1'
  }, {
    type: 'date',
    label: 'Date Input',
    value: '2024-01-15'
  }, {
    type: 'datetime-local',
    label: 'DateTime Local',
    value: '2024-01-15T10:30'
  }, {
    type: 'time',
    label: 'Time Input',
    value: '14:30'
  }, {
    type: 'date-of-birth',
    label: 'Date of Birth',
    helperText: 'Special DOB picker'
  }, {
    type: 'email',
    label: 'Email Input',
    placeholder: 'user@example.com',
    value: 'test@example.com'
  }, {
    type: 'password',
    label: 'Password Input',
    placeholder: 'Enter password'
  }, {
    type: 'url',
    label: 'URL Input',
    placeholder: 'https://example.com',
    value: 'https://github.com'
  }, {
    type: 'tel',
    label: 'Telephone Input',
    placeholder: '+1 (555) 123-4567',
    value: '+1 555 123 4567'
  }, {
    type: 'textarea',
    label: 'Textarea Input',
    placeholder: 'Multi-line text...',
    value: 'This is a multi-line\\\\ntext area example.'
  }, {
    type: 'select',
    label: 'Select Input',
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
    }],
    value: 'CA'
  }, {
    type: 'dynamic-select',
    label: 'Dynamic Select',
    placeholder: 'Start typing city...',
    helperText: 'Searchable dropdown'
  }, {
    type: 'checkbox',
    label: 'Checkbox Input',
    value: 'true'
  }, {
    type: 'radio',
    label: 'Radio Input',
    value: 'true'
  }];
  allInputTypes.forEach(input => {
    const inputCard = createInputCard(input);
    grid.appendChild(inputCard);
  });
  container.appendChild(title);
  container.appendChild(subtitle);
  container.appendChild(grid);
  return container;
}`,...($=(K=E.parameters)==null?void 0:K.docs)==null?void 0:$.source}}};var j,J,Q;A.parameters={...A.parameters,docs:{...(j=A.parameters)==null?void 0:j.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = \`
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    max-width: 1200px;
    margin: 0 auto;
  \`;
  const title = document.createElement('h1');
  title.textContent = 'Component States & Variants';
  title.style.cssText = 'text-align: center; margin: 0 0 32px 0; font-size: 2rem; font-weight: 700;';

  // Input states
  const inputStatesSection = createSection('Input States', 'All input states and variants');
  const inputStatesGrid = document.createElement('div');
  inputStatesGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;';
  const inputStates = [{
    state: 'Normal',
    props: {
      label: 'Normal State',
      placeholder: 'Enter text'
    }
  }, {
    state: 'Filled',
    props: {
      label: 'Filled State',
      value: 'Sample value'
    }
  }, {
    state: 'Focused',
    props: {
      label: 'Focused State',
      placeholder: 'Focused input',
      autofocus: true
    }
  }, {
    state: 'Required',
    props: {
      label: 'Required Field',
      placeholder: 'Required input',
      required: true
    }
  }, {
    state: 'Disabled',
    props: {
      label: 'Disabled State',
      placeholder: 'Cannot edit',
      disabled: true
    }
  }, {
    state: 'Read Only',
    props: {
      label: 'Read Only',
      value: 'Read only value',
      readonly: true
    }
  }, {
    state: 'With Helper',
    props: {
      label: 'With Helper Text',
      placeholder: 'Input with help',
      helperText: 'This is helper text'
    }
  }, {
    state: 'Character Count',
    props: {
      label: 'Character Count',
      placeholder: 'Type here...',
      maxlength: '50',
      characterCount: true
    }
  }];
  inputStates.forEach(({
    state,
    props
  }) => {
    const card = createCard(state + ' Input');
    const input = document.createElement('my-input');
    Object.entries(props).forEach(([key, value]) => {
      if (typeof value === 'boolean' && value) {
        input.setAttribute(key.replace(/([A-Z])/g, '-$1').toLowerCase(), '');
      } else if (typeof value === 'string') {
        input.setAttribute(key.replace(/([A-Z])/g, '-$1').toLowerCase(), value);
      }
    });
    card.appendChild(input);
    inputStatesGrid.appendChild(card);
  });
  inputStatesSection.appendChild(inputStatesGrid);
  container.appendChild(inputStatesSection);
  return container;
}`,...(Q=(J=A.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};const Ee=["CompleteShowcase","AllInputTypes","ComponentStates"];export{E as AllInputTypes,T as CompleteShowcase,A as ComponentStates,Ee as __namedExportsOrder,Te as default};
