import"./my-checkbox-BMhv1J44.js";import"./my-radio-group-DgIt2bh1.js";import"./base-component-q4KNMHwB.js";const I={title:"Components/Boolean Inputs",parameters:{docs:{description:{component:"A collection of boolean input components including toggle switches, checkboxes, and radio buttons."}}}},x=()=>{const e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; gap: 24px;";const a=document.createElement("h3");a.textContent="Toggle Switches",a.style.cssText="margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);";const m=document.createElement("div");return m.style.cssText="display: flex; flex-direction: column; gap: 16px;",[{label:"Enable notifications",checked:!0},{label:"Dark mode",checked:!1},{label:"Auto-save (disabled)",checked:!1,disabled:!0},{label:"Beta features (disabled & checked)",checked:!0,disabled:!0}].forEach(({label:d,checked:p,disabled:l})=>{const i=document.createElement("my-toggle");i.setAttribute("label",d),p&&i.setAttribute("checked",""),l&&i.setAttribute("disabled",""),i.addEventListener("change",t=>{console.log(`Toggle ${d}:`,t.detail)}),m.appendChild(i)}),e.appendChild(a),e.appendChild(m),e},f=()=>{const e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; gap: 24px;";const a=document.createElement("h3");a.textContent="Checkboxes",a.style.cssText="margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);";const m=document.createElement("div");m.style.cssText="display: flex; flex-direction: column; gap: 16px;";const n=document.createElement("h4");n.textContent="Basic States",n.style.cssText="margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);";const d=document.createElement("div");d.style.cssText="display: flex; flex-direction: column; gap: 12px; margin-left: 16px;",[{label:"Unchecked option",checked:!1},{label:"Checked option",checked:!0},{label:"Indeterminate option",indeterminate:!0},{label:"Disabled unchecked",checked:!1,disabled:!0},{label:"Disabled checked",checked:!0,disabled:!0}].forEach(({label:c,checked:o,indeterminate:g,disabled:k})=>{const h=document.createElement("my-checkbox");h.setAttribute("label",c),o&&h.setAttribute("checked",""),g&&h.setAttribute("indeterminate",""),k&&h.setAttribute("disabled",""),h.addEventListener("change",b=>{console.log(`Checkbox ${c}:`,b.detail)}),d.appendChild(h)});const l=document.createElement("h4");l.textContent="Group Selection",l.style.cssText="margin: 16px 0 0 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);";const i=document.createElement("div");i.style.cssText="display: flex; flex-direction: column; gap: 12px; margin-left: 16px;";const t=document.createElement("my-checkbox");t.setAttribute("label","Select All"),t.setAttribute("indeterminate","");const u=["Option A","Option B","Option C"],r=[];u.forEach(c=>{const o=document.createElement("my-checkbox");o.setAttribute("label",c),o.style.marginLeft="24px",o.addEventListener("change",()=>{s()}),r.push(o),i.appendChild(o)});const s=()=>{const c=r.filter(g=>g.checked).length,o=r.length;c===0?(t.checked=!1,t.removeAttribute("indeterminate")):c===o?(t.checked=!0,t.removeAttribute("indeterminate")):(t.checked=!1,t.setAttribute("indeterminate",""))};return t.addEventListener("change",c=>{const o=t.indeterminate?!0:c.detail.checked;r.forEach(g=>{g.checked=o}),s()}),i.insertBefore(t,i.firstChild),e.appendChild(a),e.appendChild(n),e.appendChild(d),e.appendChild(l),e.appendChild(i),e},C=()=>{const e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; gap: 24px;";const a=document.createElement("h3");a.textContent="Radio Buttons",a.style.cssText="margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);";const m=document.createElement("h4");m.textContent="Preferred Contact Method",m.style.cssText="margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);";const n=document.createElement("my-radio-group");n.setAttribute("name","contact"),n.setAttribute("value","email"),n.style.marginLeft="16px",[{label:"Email",value:"email"},{label:"Phone",value:"phone"},{label:"SMS",value:"sms"},{label:"Mail (disabled)",value:"mail",disabled:!0}].forEach(({label:t,value:u,disabled:r})=>{const s=document.createElement("my-radio");s.setAttribute("label",t),s.setAttribute("value",u),r&&s.setAttribute("disabled",""),n.appendChild(s)}),n.addEventListener("change",t=>{console.log("Contact method selected:",t.detail)});const p=document.createElement("h4");p.textContent="Plan Selection",p.style.cssText="margin: 16px 0 0 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);";const l=document.createElement("my-radio-group");return l.setAttribute("name","plan"),l.style.marginLeft="16px",[{label:"Basic (Free)",value:"basic"},{label:"Pro ($9.99/mo)",value:"pro"},{label:"Enterprise (Contact us)",value:"enterprise"}].forEach(({label:t,value:u})=>{const r=document.createElement("my-radio");r.setAttribute("label",t),r.setAttribute("value",u),l.appendChild(r)}),l.addEventListener("change",t=>{console.log("Plan selected:",t.detail)}),e.appendChild(a),e.appendChild(m),e.appendChild(n),e.appendChild(p),e.appendChild(l),e},y=()=>{const e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; gap: 32px;";const a=document.createElement("h3");return a.textContent="Different Sizes",a.style.cssText="margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);",["sm","md","lg"].forEach(n=>{const d=document.createElement("h4");d.textContent=`Size: ${n.toUpperCase()}`,d.style.cssText="margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);";const p=document.createElement("div");p.style.cssText="display: flex; gap: 32px; margin-left: 16px; align-items: flex-start;";const l=document.createElement("div");l.style.cssText="display: flex; flex-direction: column; gap: 8px;";const i=document.createElement("span");i.textContent="Toggle",i.style.cssText="font-size: 14px; font-weight: var(--_global-font-weight-medium);";const t=document.createElement("my-toggle");t.setAttribute("label",`${n} toggle`),t.setAttribute("size",n),t.setAttribute("checked",""),l.appendChild(i),l.appendChild(t);const u=document.createElement("div");u.style.cssText="display: flex; flex-direction: column; gap: 8px;";const r=document.createElement("span");r.textContent="Checkbox",r.style.cssText="font-size: 14px; font-weight: var(--_global-font-weight-medium);";const s=document.createElement("my-checkbox");s.setAttribute("label",`${n} checkbox`),s.setAttribute("size",n),s.setAttribute("checked",""),u.appendChild(r),u.appendChild(s);const c=document.createElement("div");c.style.cssText="display: flex; flex-direction: column; gap: 8px;";const o=document.createElement("span");o.textContent="Radio",o.style.cssText="font-size: 14px; font-weight: var(--_global-font-weight-medium);";const g=document.createElement("my-radio");g.setAttribute("label",`${n} radio`),g.setAttribute("size",n),g.setAttribute("checked",""),c.appendChild(o),c.appendChild(g),p.appendChild(l),p.appendChild(u),p.appendChild(c),e.appendChild(d),e.appendChild(p)}),e.appendChild(a),e},v=()=>{const e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; gap: 24px; max-width: 500px; padding: 24px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-lg);";const a=document.createElement("h3");a.textContent="Account Preferences",a.style.cssText="margin: 0 0 16px 0; font-size: 20px; font-weight: var(--_global-font-weight-medium);";const m=document.createElement("h4");m.textContent="Notifications",m.style.cssText="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);";const n=document.createElement("div");n.style.cssText="display: flex; flex-direction: column; gap: 12px; margin-left: 16px;";const d=document.createElement("my-toggle");d.setAttribute("label","Email notifications"),d.setAttribute("checked","");const p=document.createElement("my-toggle");p.setAttribute("label","Push notifications");const l=document.createElement("my-toggle");l.setAttribute("label","SMS notifications (Premium only)"),l.setAttribute("disabled",""),n.appendChild(d),n.appendChild(p),n.appendChild(l);const i=document.createElement("h4");i.textContent="Privacy",i.style.cssText="margin: 16px 0 12px 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);";const t=document.createElement("div");t.style.cssText="display: flex; flex-direction: column; gap: 12px; margin-left: 16px;";const u=document.createElement("my-checkbox");u.setAttribute("label","Make profile public");const r=document.createElement("my-checkbox");r.setAttribute("label","Show email address");const s=document.createElement("my-checkbox");s.setAttribute("label","Allow direct messages"),s.setAttribute("checked",""),t.appendChild(u),t.appendChild(r),t.appendChild(s);const c=document.createElement("h4");c.textContent="Theme",c.style.cssText="margin: 16px 0 12px 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);";const o=document.createElement("my-radio-group");return o.setAttribute("name","theme"),o.setAttribute("value","auto"),o.style.marginLeft="16px",[{label:"Auto (system preference)",value:"auto"},{label:"Light theme",value:"light"},{label:"Dark theme",value:"dark"}].forEach(({label:k,value:h})=>{const b=document.createElement("my-radio");b.setAttribute("label",k),b.setAttribute("value",h),o.appendChild(b)}),e.appendChild(a),e.appendChild(m),e.appendChild(n),e.appendChild(i),e.appendChild(t),e.appendChild(c),e.appendChild(o),e};var E,A,T;x.parameters={...x.parameters,docs:{...(E=x.parameters)==null?void 0:E.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 24px;';
  const title = document.createElement('h3');
  title.textContent = 'Toggle Switches';
  title.style.cssText = 'margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);';
  const togglesContainer = document.createElement('div');
  togglesContainer.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';
  const toggleConfigs = [{
    label: 'Enable notifications',
    checked: true
  }, {
    label: 'Dark mode',
    checked: false
  }, {
    label: 'Auto-save (disabled)',
    checked: false,
    disabled: true
  }, {
    label: 'Beta features (disabled & checked)',
    checked: true,
    disabled: true
  }];
  toggleConfigs.forEach(({
    label,
    checked,
    disabled
  }) => {
    const toggle = document.createElement('my-toggle');
    toggle.setAttribute('label', label);
    if (checked) toggle.setAttribute('checked', '');
    if (disabled) toggle.setAttribute('disabled', '');
    toggle.addEventListener('change', e => {
      console.log(\`Toggle \${label}:\`, e.detail);
    });
    togglesContainer.appendChild(toggle);
  });
  container.appendChild(title);
  container.appendChild(togglesContainer);
  return container;
}`,...(T=(A=x.parameters)==null?void 0:A.docs)==null?void 0:T.source}}};var w,_,z;f.parameters={...f.parameters,docs:{...(w=f.parameters)==null?void 0:w.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 24px;';
  const title = document.createElement('h3');
  title.textContent = 'Checkboxes';
  title.style.cssText = 'margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);';
  const checkboxesContainer = document.createElement('div');
  checkboxesContainer.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';

  // Basic checkboxes
  const basicTitle = document.createElement('h4');
  basicTitle.textContent = 'Basic States';
  basicTitle.style.cssText = 'margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
  const basicContainer = document.createElement('div');
  basicContainer.style.cssText = 'display: flex; flex-direction: column; gap: 12px; margin-left: 16px;';
  const checkboxConfigs = [{
    label: 'Unchecked option',
    checked: false
  }, {
    label: 'Checked option',
    checked: true
  }, {
    label: 'Indeterminate option',
    indeterminate: true
  }, {
    label: 'Disabled unchecked',
    checked: false,
    disabled: true
  }, {
    label: 'Disabled checked',
    checked: true,
    disabled: true
  }];
  checkboxConfigs.forEach(({
    label,
    checked,
    indeterminate,
    disabled
  }) => {
    const checkbox = document.createElement('my-checkbox');
    checkbox.setAttribute('label', label);
    if (checked) checkbox.setAttribute('checked', '');
    if (indeterminate) checkbox.setAttribute('indeterminate', '');
    if (disabled) checkbox.setAttribute('disabled', '');
    checkbox.addEventListener('change', e => {
      console.log(\`Checkbox \${label}:\`, e.detail);
    });
    basicContainer.appendChild(checkbox);
  });

  // Group example
  const groupTitle = document.createElement('h4');
  groupTitle.textContent = 'Group Selection';
  groupTitle.style.cssText = 'margin: 16px 0 0 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
  const groupContainer = document.createElement('div');
  groupContainer.style.cssText = 'display: flex; flex-direction: column; gap: 12px; margin-left: 16px;';
  const selectAll = document.createElement('my-checkbox');
  selectAll.setAttribute('label', 'Select All');
  selectAll.setAttribute('indeterminate', '');
  const groupOptions = ['Option A', 'Option B', 'Option C'];
  const groupCheckboxes = [];
  groupOptions.forEach(option => {
    const checkbox = document.createElement('my-checkbox');
    checkbox.setAttribute('label', option);
    checkbox.style.marginLeft = '24px';
    checkbox.addEventListener('change', () => {
      updateSelectAll();
    });
    groupCheckboxes.push(checkbox);
    groupContainer.appendChild(checkbox);
  });
  const updateSelectAll = () => {
    const checkedCount = groupCheckboxes.filter(cb => cb.checked).length;
    const total = groupCheckboxes.length;
    if (checkedCount === 0) {
      selectAll.checked = false;
      selectAll.removeAttribute('indeterminate');
    } else if (checkedCount === total) {
      selectAll.checked = true;
      selectAll.removeAttribute('indeterminate');
    } else {
      selectAll.checked = false;
      selectAll.setAttribute('indeterminate', '');
    }
  };
  selectAll.addEventListener('change', e => {
    const shouldCheck = !selectAll.indeterminate ? e.detail.checked : true;
    groupCheckboxes.forEach(cb => {
      cb.checked = shouldCheck;
    });
    updateSelectAll();
  });
  groupContainer.insertBefore(selectAll, groupContainer.firstChild);
  container.appendChild(title);
  container.appendChild(basicTitle);
  container.appendChild(basicContainer);
  container.appendChild(groupTitle);
  container.appendChild(groupContainer);
  return container;
}`,...(z=(_=f.parameters)==null?void 0:_.docs)==null?void 0:z.source}}};var L,S,G;C.parameters={...C.parameters,docs:{...(L=C.parameters)==null?void 0:L.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 24px;';
  const title = document.createElement('h3');
  title.textContent = 'Radio Buttons';
  title.style.cssText = 'margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);';

  // Single radio group
  const group1Title = document.createElement('h4');
  group1Title.textContent = 'Preferred Contact Method';
  group1Title.style.cssText = 'margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
  const radioGroup1 = document.createElement('my-radio-group');
  radioGroup1.setAttribute('name', 'contact');
  radioGroup1.setAttribute('value', 'email');
  radioGroup1.style.marginLeft = '16px';
  const contactOptions = [{
    label: 'Email',
    value: 'email'
  }, {
    label: 'Phone',
    value: 'phone'
  }, {
    label: 'SMS',
    value: 'sms'
  }, {
    label: 'Mail (disabled)',
    value: 'mail',
    disabled: true
  }];
  contactOptions.forEach(({
    label,
    value,
    disabled
  }) => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('label', label);
    radio.setAttribute('value', value);
    if (disabled) radio.setAttribute('disabled', '');
    radioGroup1.appendChild(radio);
  });
  radioGroup1.addEventListener('change', e => {
    console.log('Contact method selected:', e.detail);
  });

  // Second radio group
  const group2Title = document.createElement('h4');
  group2Title.textContent = 'Plan Selection';
  group2Title.style.cssText = 'margin: 16px 0 0 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
  const radioGroup2 = document.createElement('my-radio-group');
  radioGroup2.setAttribute('name', 'plan');
  radioGroup2.style.marginLeft = '16px';
  const planOptions = [{
    label: 'Basic (Free)',
    value: 'basic'
  }, {
    label: 'Pro ($9.99/mo)',
    value: 'pro'
  }, {
    label: 'Enterprise (Contact us)',
    value: 'enterprise'
  }];
  planOptions.forEach(({
    label,
    value
  }) => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('label', label);
    radio.setAttribute('value', value);
    radioGroup2.appendChild(radio);
  });
  radioGroup2.addEventListener('change', e => {
    console.log('Plan selected:', e.detail);
  });
  container.appendChild(title);
  container.appendChild(group1Title);
  container.appendChild(radioGroup1);
  container.appendChild(group2Title);
  container.appendChild(radioGroup2);
  return container;
}`,...(G=(S=C.parameters)==null?void 0:S.docs)==null?void 0:G.source}}};var P,O,B;y.parameters={...y.parameters,docs:{...(P=y.parameters)==null?void 0:P.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 32px;';
  const title = document.createElement('h3');
  title.textContent = 'Different Sizes';
  title.style.cssText = 'margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);';
  const sizes = ['sm', 'md', 'lg'];
  sizes.forEach(size => {
    const sectionTitle = document.createElement('h4');
    sectionTitle.textContent = \`Size: \${size.toUpperCase()}\`;
    sectionTitle.style.cssText = 'margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
    const sectionContainer = document.createElement('div');
    sectionContainer.style.cssText = 'display: flex; gap: 32px; margin-left: 16px; align-items: flex-start;';

    // Toggle
    const toggleContainer = document.createElement('div');
    toggleContainer.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';
    const toggleLabel = document.createElement('span');
    toggleLabel.textContent = 'Toggle';
    toggleLabel.style.cssText = 'font-size: 14px; font-weight: var(--_global-font-weight-medium);';
    const toggle = document.createElement('my-toggle');
    toggle.setAttribute('label', \`\${size} toggle\`);
    toggle.setAttribute('size', size);
    toggle.setAttribute('checked', '');
    toggleContainer.appendChild(toggleLabel);
    toggleContainer.appendChild(toggle);

    // Checkbox
    const checkboxContainer = document.createElement('div');
    checkboxContainer.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';
    const checkboxLabel = document.createElement('span');
    checkboxLabel.textContent = 'Checkbox';
    checkboxLabel.style.cssText = 'font-size: 14px; font-weight: var(--_global-font-weight-medium);';
    const checkbox = document.createElement('my-checkbox');
    checkbox.setAttribute('label', \`\${size} checkbox\`);
    checkbox.setAttribute('size', size);
    checkbox.setAttribute('checked', '');
    checkboxContainer.appendChild(checkboxLabel);
    checkboxContainer.appendChild(checkbox);

    // Radio
    const radioContainer = document.createElement('div');
    radioContainer.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';
    const radioLabel = document.createElement('span');
    radioLabel.textContent = 'Radio';
    radioLabel.style.cssText = 'font-size: 14px; font-weight: var(--_global-font-weight-medium);';
    const radio = document.createElement('my-radio');
    radio.setAttribute('label', \`\${size} radio\`);
    radio.setAttribute('size', size);
    radio.setAttribute('checked', '');
    radioContainer.appendChild(radioLabel);
    radioContainer.appendChild(radio);
    sectionContainer.appendChild(toggleContainer);
    sectionContainer.appendChild(checkboxContainer);
    sectionContainer.appendChild(radioContainer);
    container.appendChild(sectionTitle);
    container.appendChild(sectionContainer);
  });
  container.appendChild(title);
  return container;
}`,...(B=(O=y.parameters)==null?void 0:O.docs)==null?void 0:B.source}}};var N,M,$;v.parameters={...v.parameters,docs:{...(N=v.parameters)==null?void 0:N.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 24px; max-width: 500px; padding: 24px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-lg);';
  const title = document.createElement('h3');
  title.textContent = 'Account Preferences';
  title.style.cssText = 'margin: 0 0 16px 0; font-size: 20px; font-weight: var(--_global-font-weight-medium);';

  // Notification settings
  const notificationTitle = document.createElement('h4');
  notificationTitle.textContent = 'Notifications';
  notificationTitle.style.cssText = 'margin: 0 0 12px 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
  const notificationContainer = document.createElement('div');
  notificationContainer.style.cssText = 'display: flex; flex-direction: column; gap: 12px; margin-left: 16px;';
  const emailNotifs = document.createElement('my-toggle');
  emailNotifs.setAttribute('label', 'Email notifications');
  emailNotifs.setAttribute('checked', '');
  const pushNotifs = document.createElement('my-toggle');
  pushNotifs.setAttribute('label', 'Push notifications');
  const smsNotifs = document.createElement('my-toggle');
  smsNotifs.setAttribute('label', 'SMS notifications (Premium only)');
  smsNotifs.setAttribute('disabled', '');
  notificationContainer.appendChild(emailNotifs);
  notificationContainer.appendChild(pushNotifs);
  notificationContainer.appendChild(smsNotifs);

  // Privacy settings
  const privacyTitle = document.createElement('h4');
  privacyTitle.textContent = 'Privacy';
  privacyTitle.style.cssText = 'margin: 16px 0 12px 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
  const privacyContainer = document.createElement('div');
  privacyContainer.style.cssText = 'display: flex; flex-direction: column; gap: 12px; margin-left: 16px;';
  const profilePublic = document.createElement('my-checkbox');
  profilePublic.setAttribute('label', 'Make profile public');
  const showEmail = document.createElement('my-checkbox');
  showEmail.setAttribute('label', 'Show email address');
  const allowMessaging = document.createElement('my-checkbox');
  allowMessaging.setAttribute('label', 'Allow direct messages');
  allowMessaging.setAttribute('checked', '');
  privacyContainer.appendChild(profilePublic);
  privacyContainer.appendChild(showEmail);
  privacyContainer.appendChild(allowMessaging);

  // Theme selection
  const themeTitle = document.createElement('h4');
  themeTitle.textContent = 'Theme';
  themeTitle.style.cssText = 'margin: 16px 0 12px 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
  const themeGroup = document.createElement('my-radio-group');
  themeGroup.setAttribute('name', 'theme');
  themeGroup.setAttribute('value', 'auto');
  themeGroup.style.marginLeft = '16px';
  const themeOptions = [{
    label: 'Auto (system preference)',
    value: 'auto'
  }, {
    label: 'Light theme',
    value: 'light'
  }, {
    label: 'Dark theme',
    value: 'dark'
  }];
  themeOptions.forEach(({
    label,
    value
  }) => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('label', label);
    radio.setAttribute('value', value);
    themeGroup.appendChild(radio);
  });
  container.appendChild(title);
  container.appendChild(notificationTitle);
  container.appendChild(notificationContainer);
  container.appendChild(privacyTitle);
  container.appendChild(privacyContainer);
  container.appendChild(themeTitle);
  container.appendChild(themeGroup);
  return container;
}`,...($=(M=v.parameters)==null?void 0:M.docs)==null?void 0:$.source}}};const U=["Toggles","Checkboxes","RadioButtons","Sizes","FormExample"];export{f as Checkboxes,v as FormExample,C as RadioButtons,y as Sizes,x as Toggles,U as __namedExportsOrder,I as default};
