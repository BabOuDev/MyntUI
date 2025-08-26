import"./index-UkS2EslT.js";import"./my-input-Cr2iSYlQ.js";import"./base-component-q4KNMHwB.js";import"./my-icon-O3BbYCXg.js";import"./my-button-WudZcNwy.js";import"./my-checkbox-BMhv1J44.js";import"./my-radio-group-DgIt2bh1.js";import"./my-tooltip-B3RMpmFT.js";import"./my-dropdown-CiMYD9E9.js";import"./my-progress-RNfs7yqs.js";import"./my-sparkline-CJMl-uDe.js";import"./my-data-list-DU8MtKuH.js";import"./my-data-table-C8ZCmYSs.js";import"./my-data-chart-B3QHoMTF.js";import"./my-modal-Cik2IHTQ.js";import"./my-notification-CsCwobM5.js";import"./my-drawer-CI78YKtn.js";const F={title:"Showcase/Enhanced Components",parameters:{docs:{description:{component:"A comprehensive showcase of all enhanced MyntUI components with their various states and configurations."}},layout:"fullscreen"}},g=()=>{const c=document.createElement("div");c.style.cssText=`
    padding: 2rem;
    background: var(--_global-color-background);
    min-height: 100vh;
    font-family: var(--_global-font-family-sans);
  `;const d=document.createElement("div");return d.style.cssText="margin-bottom: 3rem; text-align: center;",d.innerHTML=`
    <h1 style="margin: 0 0 1rem 0; color: var(--_global-color-text-primary); font-size: 2.5rem;">MyntUI Component Library</h1>
    <p style="margin: 0; color: var(--_global-color-text-secondary); font-size: 1.125rem;">A comprehensive showcase of all components</p>
  `,c.appendChild(d),[{title:"Form Components",id:"form"},{title:"Boolean Inputs",id:"boolean"},{title:"Interactive Components",id:"interactive"},{title:"Data Visualization",id:"data-viz"},{title:"Overlay Components",id:"overlay"}].forEach(i=>{const p=document.createElement("div");p.style.cssText="margin-bottom: 3rem;";const h=document.createElement("h2");h.textContent=i.title,h.style.cssText="margin: 0 0 1.5rem 0; color: var(--_global-color-text-primary); font-size: 1.75rem; border-bottom: 2px solid var(--_global-color-outline-variant); padding-bottom: 0.5rem;";const l=document.createElement("div");if(l.style.cssText="display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));",i.id==="form"){const s=b("Input Variations",()=>{const e=document.createElement("div");e.style.cssText="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;";const t=document.createElement("my-input");t.setAttribute("label","First Name"),t.setAttribute("placeholder","Enter your name..."),t.setAttribute("type","text"),t.setAttribute("required","");const o=document.createElement("my-input");o.setAttribute("label","Email Address"),o.setAttribute("placeholder","Enter your email..."),o.setAttribute("type","email"),o.setAttribute("required","");const a=document.createElement("my-input");a.setAttribute("label","Password"),a.setAttribute("type","password"),a.setAttribute("placeholder","Enter password...");const r=document.createElement("my-input");return r.setAttribute("label","Age"),r.setAttribute("type","number"),r.setAttribute("placeholder","Enter age..."),r.setAttribute("min","18"),r.setAttribute("max","100"),e.appendChild(t),e.appendChild(o),e.appendChild(a),e.appendChild(r),e});l.appendChild(s);const n=b("Button Variants",()=>{const e=document.createElement("div");return e.style.cssText="display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center;",["filled","filled-tonal","elevated","outlined","text"].forEach(o=>{const a=document.createElement("my-button");a.setAttribute("label",o.split("-").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")),a.setAttribute("variant",o),e.appendChild(a)}),e});l.appendChild(n)}else if(i.id==="boolean"){const s=b("Boolean Controls",()=>{const n=document.createElement("div");n.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;";const e=document.createElement("div");e.innerHTML='<h4 style="margin: 0 0 0.5rem 0; color: var(--_global-color-text-secondary); font-size: 0.875rem;">Toggles</h4>';const t=document.createElement("div");t.style.cssText="display: flex; flex-direction: column; gap: 0.75rem;";const o=document.createElement("my-toggle");o.setAttribute("label","Enabled Toggle"),o.setAttribute("checked","");const a=document.createElement("my-toggle");a.setAttribute("label","Disabled Toggle"),a.setAttribute("disabled",""),t.appendChild(o),t.appendChild(a),e.appendChild(t);const r=document.createElement("div");r.innerHTML='<h4 style="margin: 0 0 0.5rem 0; color: var(--_global-color-text-secondary); font-size: 0.875rem;">Checkboxes</h4>';const u=document.createElement("div");u.style.cssText="display: flex; flex-direction: column; gap: 0.75rem;";const x=document.createElement("my-checkbox");x.setAttribute("label","Checked Checkbox"),x.setAttribute("checked","");const y=document.createElement("my-checkbox");y.setAttribute("label","Unchecked Checkbox");const C=document.createElement("my-checkbox");return C.setAttribute("label","Indeterminate"),C.setAttribute("indeterminate",""),u.appendChild(x),u.appendChild(y),u.appendChild(C),r.appendChild(u),n.appendChild(e),n.appendChild(r),n});l.appendChild(s)}else if(i.id==="interactive"){const s=b("Interactive Elements",()=>{const n=document.createElement("div");n.style.cssText="display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-start;";const e=document.createElement("my-dropdown");e.innerHTML=`
          <my-button variant="outlined" label="Open Menu"></my-button>
        `;const t=document.createElement("my-tooltip");return t.setAttribute("text","This is a helpful tooltip"),t.innerHTML='<my-button label="Hover for Tooltip"></my-button>',n.appendChild(e),n.appendChild(t),n});l.appendChild(s)}else if(i.id==="data-viz"){const s=b("Data Visualization",()=>{const n=document.createElement("div");n.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; align-items: center;";const e=document.createElement("my-gauge");e.setAttribute("value","75"),e.setAttribute("min","0"),e.setAttribute("max","100"),e.setAttribute("label","Progress");const t=document.createElement("my-progress");t.setAttribute("value","60"),t.setAttribute("label","Loading...");const o=document.createElement("my-sparkline");return o.setAttribute("data","[10, 20, 15, 35, 25, 40, 30, 45]"),o.setAttribute("color","var(--_global-color-primary)"),n.appendChild(e),n.appendChild(t),n.appendChild(o),n});l.appendChild(s)}p.appendChild(h),p.appendChild(l),c.appendChild(p)}),c};function b(c,d){const m=document.createElement("div");m.style.cssText=`
    background: var(--_global-color-surface);
    border: 1px solid var(--_global-color-outline-variant);
    border-radius: var(--_global-border-radius-lg);
    padding: 1.5rem;
    box-shadow: var(--_global-elevation-1);
  `;const i=document.createElement("h3");i.textContent=c,i.style.cssText="margin: 0 0 1rem 0; color: var(--_global-color-text-primary); font-size: 1.25rem;";const p=d();return m.appendChild(i),m.appendChild(p),m}var v,f,A;g.parameters={...g.parameters,docs:{...(v=g.parameters)==null?void 0:v.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = \`
    padding: 2rem;
    background: var(--_global-color-background);
    min-height: 100vh;
    font-family: var(--_global-font-family-sans);
  \`;

  // Create header
  const header = document.createElement('div');
  header.style.cssText = 'margin-bottom: 3rem; text-align: center;';
  header.innerHTML = \`
    <h1 style="margin: 0 0 1rem 0; color: var(--_global-color-text-primary); font-size: 2.5rem;">MyntUI Component Library</h1>
    <p style="margin: 0; color: var(--_global-color-text-secondary); font-size: 1.125rem;">A comprehensive showcase of all components</p>
  \`;
  container.appendChild(header);

  // Create sections for different component categories
  const sections = [{
    title: 'Form Components',
    id: 'form'
  }, {
    title: 'Boolean Inputs',
    id: 'boolean'
  }, {
    title: 'Interactive Components',
    id: 'interactive'
  }, {
    title: 'Data Visualization',
    id: 'data-viz'
  }, {
    title: 'Overlay Components',
    id: 'overlay'
  }];
  sections.forEach(section => {
    const sectionDiv = document.createElement('div');
    sectionDiv.style.cssText = 'margin-bottom: 3rem;';
    const title = document.createElement('h2');
    title.textContent = section.title;
    title.style.cssText = 'margin: 0 0 1.5rem 0; color: var(--_global-color-text-primary); font-size: 1.75rem; border-bottom: 2px solid var(--_global-color-outline-variant); padding-bottom: 0.5rem;';
    const content = document.createElement('div');
    content.style.cssText = 'display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));';

    // Add components based on section
    if (section.id === 'form') {
      // Input Variants
      const inputCard = createComponentCard('Input Variations', () => {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;';
        const textInput = document.createElement('my-input');
        textInput.setAttribute('label', 'First Name');
        textInput.setAttribute('placeholder', 'Enter your name...');
        textInput.setAttribute('type', 'text');
        textInput.setAttribute('required', '');
        const emailInput = document.createElement('my-input');
        emailInput.setAttribute('label', 'Email Address');
        emailInput.setAttribute('placeholder', 'Enter your email...');
        emailInput.setAttribute('type', 'email');
        emailInput.setAttribute('required', '');
        const passwordInput = document.createElement('my-input');
        passwordInput.setAttribute('label', 'Password');
        passwordInput.setAttribute('type', 'password');
        passwordInput.setAttribute('placeholder', 'Enter password...');
        const numberInput = document.createElement('my-input');
        numberInput.setAttribute('label', 'Age');
        numberInput.setAttribute('type', 'number');
        numberInput.setAttribute('placeholder', 'Enter age...');
        numberInput.setAttribute('min', '18');
        numberInput.setAttribute('max', '100');
        wrapper.appendChild(textInput);
        wrapper.appendChild(emailInput);
        wrapper.appendChild(passwordInput);
        wrapper.appendChild(numberInput);
        return wrapper;
      });
      content.appendChild(inputCard);

      // Button Showcase
      const buttonCard = createComponentCard('Button Variants', () => {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center;';
        const variants = ['filled', 'filled-tonal', 'elevated', 'outlined', 'text'];
        variants.forEach(variant => {
          const button = document.createElement('my-button');
          button.setAttribute('label', variant.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
          button.setAttribute('variant', variant);
          wrapper.appendChild(button);
        });
        return wrapper;
      });
      content.appendChild(buttonCard);
    } else if (section.id === 'boolean') {
      // Boolean Inputs
      const booleanCard = createComponentCard('Boolean Controls', () => {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;';

        // Toggles
        const togglesSection = document.createElement('div');
        togglesSection.innerHTML = '<h4 style="margin: 0 0 0.5rem 0; color: var(--_global-color-text-secondary); font-size: 0.875rem;">Toggles</h4>';
        const togglesContainer = document.createElement('div');
        togglesContainer.style.cssText = 'display: flex; flex-direction: column; gap: 0.75rem;';
        const toggle1 = document.createElement('my-toggle');
        toggle1.setAttribute('label', 'Enabled Toggle');
        toggle1.setAttribute('checked', '');
        const toggle2 = document.createElement('my-toggle');
        toggle2.setAttribute('label', 'Disabled Toggle');
        toggle2.setAttribute('disabled', '');
        togglesContainer.appendChild(toggle1);
        togglesContainer.appendChild(toggle2);
        togglesSection.appendChild(togglesContainer);

        // Checkboxes
        const checkboxesSection = document.createElement('div');
        checkboxesSection.innerHTML = '<h4 style="margin: 0 0 0.5rem 0; color: var(--_global-color-text-secondary); font-size: 0.875rem;">Checkboxes</h4>';
        const checkboxesContainer = document.createElement('div');
        checkboxesContainer.style.cssText = 'display: flex; flex-direction: column; gap: 0.75rem;';
        const checkbox1 = document.createElement('my-checkbox');
        checkbox1.setAttribute('label', 'Checked Checkbox');
        checkbox1.setAttribute('checked', '');
        const checkbox2 = document.createElement('my-checkbox');
        checkbox2.setAttribute('label', 'Unchecked Checkbox');
        const checkbox3 = document.createElement('my-checkbox');
        checkbox3.setAttribute('label', 'Indeterminate');
        checkbox3.setAttribute('indeterminate', '');
        checkboxesContainer.appendChild(checkbox1);
        checkboxesContainer.appendChild(checkbox2);
        checkboxesContainer.appendChild(checkbox3);
        checkboxesSection.appendChild(checkboxesContainer);
        wrapper.appendChild(togglesSection);
        wrapper.appendChild(checkboxesSection);
        return wrapper;
      });
      content.appendChild(booleanCard);
    } else if (section.id === 'interactive') {
      // Dropdowns and Interactive Components
      const dropdownCard = createComponentCard('Interactive Elements', () => {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-start;';
        const dropdown = document.createElement('my-dropdown');
        dropdown.innerHTML = \`
          <my-button variant="outlined" label="Open Menu"></my-button>
        \`;
        const tooltip = document.createElement('my-tooltip');
        tooltip.setAttribute('text', 'This is a helpful tooltip');
        tooltip.innerHTML = \`<my-button label="Hover for Tooltip"></my-button>\`;
        wrapper.appendChild(dropdown);
        wrapper.appendChild(tooltip);
        return wrapper;
      });
      content.appendChild(dropdownCard);
    } else if (section.id === 'data-viz') {
      // Data Visualization Components
      const gaugeCard = createComponentCard('Data Visualization', () => {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; align-items: center;';
        const gauge = document.createElement('my-gauge');
        gauge.setAttribute('value', '75');
        gauge.setAttribute('min', '0');
        gauge.setAttribute('max', '100');
        gauge.setAttribute('label', 'Progress');
        const progress = document.createElement('my-progress');
        progress.setAttribute('value', '60');
        progress.setAttribute('label', 'Loading...');
        const sparkline = document.createElement('my-sparkline');
        sparkline.setAttribute('data', '[10, 20, 15, 35, 25, 40, 30, 45]');
        sparkline.setAttribute('color', 'var(--_global-color-primary)');
        wrapper.appendChild(gauge);
        wrapper.appendChild(progress);
        wrapper.appendChild(sparkline);
        return wrapper;
      });
      content.appendChild(gaugeCard);
    }
    sectionDiv.appendChild(title);
    sectionDiv.appendChild(content);
    container.appendChild(sectionDiv);
  });
  return container;
}`,...(A=(f=g.parameters)==null?void 0:f.docs)==null?void 0:A.source}}};const P=["AllComponents"];export{g as AllComponents,P as __namedExportsOrder,F as default};
