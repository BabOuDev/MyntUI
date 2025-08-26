import"./my-radio-group-DgIt2bh1.js";import"./base-component-q4KNMHwB.js";const U={title:"Components/my-radio & my-radio-group",parameters:{docs:{description:{component:"Radio components for single-choice selections. my-radio-group manages a set of my-radio components, ensuring only one can be selected at a time."}}},argTypes:{label:{control:"text",description:"Radio group label"},value:{control:"text",description:"Selected radio value"},name:{control:"text",description:"Radio group name"},size:{control:{type:"select"},options:["sm","md","lg"],description:"Radio size"},layout:{control:{type:"select"},options:["vertical","horizontal"],description:"Radio group layout"},required:{control:"boolean",description:"Mark as required field"},disabled:{control:"boolean",description:"Disable entire radio group"},error:{control:"boolean",description:"Show error state"}}},K=t=>{const a=document.createElement("div");a.style.cssText="padding: 24px; max-width: 400px;";const e=document.createElement("my-radio-group");return t.label&&e.setAttribute("label",t.label),t.value&&e.setAttribute("value",t.value),t.name&&e.setAttribute("name",t.name),t.size&&t.size!=="md"&&e.setAttribute("size",t.size),t.layout&&t.layout!=="vertical"&&e.setAttribute("layout",t.layout),t.required&&e.setAttribute("required",""),t.disabled&&e.setAttribute("disabled",""),t.error&&e.setAttribute("error",""),[{value:"option1",label:"First Option"},{value:"option2",label:"Second Option"},{value:"option3",label:"Third Option"}].forEach(o=>{const n=document.createElement("my-radio");n.setAttribute("value",o.value),n.setAttribute("label",o.label),e.appendChild(n)}),e.addEventListener("change",o=>{console.log("Radio group changed:",o.detail)}),a.appendChild(e),a},u=K.bind({});u.args={label:"Choose an option",value:"option1",name:"default-radio-group",size:"md",layout:"vertical",required:!1,disabled:!1,error:!1};const p=()=>{const t=document.createElement("div");t.style.cssText="padding: 24px; display: flex; flex-direction: column; gap: 32px;";const a=document.createElement("my-radio-group");a.setAttribute("label","Vertical Layout"),a.setAttribute("name","vertical-group"),a.setAttribute("value","vertical2"),["Vertical Option 1","Vertical Option 2","Vertical Option 3"].forEach((d,o)=>{const n=document.createElement("my-radio");n.setAttribute("value",`vertical${o+1}`),n.setAttribute("label",d),a.appendChild(n)});const e=document.createElement("my-radio-group");return e.setAttribute("label","Horizontal Layout"),e.setAttribute("name","horizontal-group"),e.setAttribute("layout","horizontal"),e.setAttribute("value","horizontal1"),["Option A","Option B","Option C"].forEach((d,o)=>{const n=document.createElement("my-radio");n.setAttribute("value",`horizontal${o+1}`),n.setAttribute("label",d),e.appendChild(n)}),t.appendChild(a),t.appendChild(e),t};p.parameters={docs:{description:{story:"Radio groups can be arranged vertically or horizontally."}}};const m=()=>{const t=document.createElement("div");return t.style.cssText="padding: 24px; display: flex; flex-direction: column; gap: 32px;",[{size:"sm",label:"Small Size"},{size:"md",label:"Medium Size"},{size:"lg",label:"Large Size"}].forEach(({size:e,label:d})=>{const o=document.createElement("my-radio-group");o.setAttribute("label",d),o.setAttribute("name",`${e}-group`),o.setAttribute("size",e),o.setAttribute("value",`${e}2`),["First","Second","Third"].forEach((n,i)=>{const r=document.createElement("my-radio");r.setAttribute("value",`${e}${i+1}`),r.setAttribute("label",`${n} ${d.split(" ")[0]} Option`),o.appendChild(r)}),t.appendChild(o)}),t};m.parameters={docs:{description:{story:"Radio components come in three sizes: small, medium, and large."}}};const b=()=>{const t=document.createElement("div");t.style.cssText="padding: 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px;";const a=document.createElement("my-radio-group");a.setAttribute("label","Normal State"),a.setAttribute("name","normal-group"),a.setAttribute("value","normal2"),["Option 1","Option 2","Option 3"].forEach((n,i)=>{const r=document.createElement("my-radio");r.setAttribute("value",`normal${i+1}`),r.setAttribute("label",n),a.appendChild(r)});const e=document.createElement("my-radio-group");e.setAttribute("label","Required State"),e.setAttribute("name","required-group"),e.setAttribute("required",""),["Required Option 1","Required Option 2","Required Option 3"].forEach((n,i)=>{const r=document.createElement("my-radio");r.setAttribute("value",`required${i+1}`),r.setAttribute("label",n),e.appendChild(r)});const d=document.createElement("my-radio-group");d.setAttribute("label","Error State"),d.setAttribute("name","error-group"),d.setAttribute("error",""),d.setAttribute("value","error1"),["Error Option 1","Error Option 2","Error Option 3"].forEach((n,i)=>{const r=document.createElement("my-radio");r.setAttribute("value",`error${i+1}`),r.setAttribute("label",n),d.appendChild(r)});const o=document.createElement("my-radio-group");return o.setAttribute("label","Disabled State"),o.setAttribute("name","disabled-group"),o.setAttribute("disabled",""),o.setAttribute("value","disabled2"),["Disabled Option 1","Disabled Option 2","Disabled Option 3"].forEach((n,i)=>{const r=document.createElement("my-radio");r.setAttribute("value",`disabled${i+1}`),r.setAttribute("label",n),o.appendChild(r)}),t.appendChild(a),t.appendChild(e),t.appendChild(d),t.appendChild(o),t};b.parameters={docs:{description:{story:"Different states: normal, required, error, and disabled."}}};const y=()=>{const t=document.createElement("div");t.style.cssText="padding: 24px; display: flex; flex-direction: column; gap: 24px;";const a=document.createElement("div");a.innerHTML=`
    <h3 style="margin: 0 0 8px 0;">Individual Radio Buttons</h3>
    <p style="margin: 0 0 16px 0; color: var(--_global-color-text-secondary);">
      Individual radio buttons can be used outside of radio groups when you need manual control.
    </p>
  `;const e=document.createElement("div");return e.style.cssText="display: flex; flex-direction: column; gap: 12px;",[{label:"Normal Radio",checked:!1,disabled:!1},{label:"Checked Radio",checked:!0,disabled:!1},{label:"Disabled Radio",checked:!1,disabled:!0},{label:"Disabled Checked Radio",checked:!0,disabled:!0}].forEach(({label:o,checked:n,disabled:i},r)=>{const s=document.createElement("my-radio");s.setAttribute("label",o),s.setAttribute("value",`individual${r+1}`),s.setAttribute("name","individual-radios"),n&&s.setAttribute("checked",""),i&&s.setAttribute("disabled",""),s.addEventListener("change",l=>{console.log("Individual radio changed:",l.detail)}),e.appendChild(s)}),t.appendChild(a),t.appendChild(e),t};y.parameters={docs:{description:{story:"Individual radio buttons with various states for manual control scenarios."}}};const g=()=>{const t=document.createElement("div");t.style.cssText="padding: 24px; max-width: 500px;";const a=document.createElement("div");a.innerHTML=`
    <h3 style="margin: 0 0 8px 0;">Dynamic Radio Group</h3>
    <p style="margin: 0 0 16px 0; color: var(--_global-color-text-secondary);">
      This example demonstrates dynamically adding and removing radio options.
    </p>
  `;const e=document.createElement("my-radio-group");e.setAttribute("label","Dynamic Options"),e.setAttribute("name","dynamic-group");const d=[{value:"dynamic1",label:"Initial Option 1"},{value:"dynamic2",label:"Initial Option 2"}];let o=3;d.forEach(l=>{const c=document.createElement("my-radio");c.setAttribute("value",l.value),c.setAttribute("label",l.label),e.appendChild(c)});const n=document.createElement("div");n.style.cssText="display: flex; gap: 12px; margin-top: 16px; flex-wrap: wrap;";const i=document.createElement("button");i.textContent="Add Option",i.style.cssText="padding: 8px 16px; background: var(--_global-color-primary); color: var(--_global-color-on-primary); border: none; border-radius: var(--_global-border-radius-md); cursor: pointer;",i.addEventListener("click",()=>{const l=document.createElement("my-radio");l.setAttribute("value",`dynamic${o}`),l.setAttribute("label",`Added Option ${o}`),e.appendChild(l),o++});const r=document.createElement("button");r.textContent="Remove Last Option",r.style.cssText="padding: 8px 16px; background: var(--_global-color-error); color: var(--_global-color-on-error); border: none; border-radius: var(--_global-border-radius-md); cursor: pointer;",r.addEventListener("click",()=>{const l=e.querySelectorAll("my-radio");l.length>1&&l[l.length-1].remove()}),n.appendChild(i),n.appendChild(r);const s=document.createElement("div");return s.style.cssText="margin-top: 16px; padding: 12px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md);",s.innerHTML='<strong>Selected:</strong> <span id="selected-value">None</span>',e.addEventListener("change",l=>{const c=s.querySelector("#selected-value");c.textContent=l.detail.value||"None"}),t.appendChild(a),t.appendChild(e),t.appendChild(n),t.appendChild(s),t};g.parameters={docs:{description:{story:"Dynamic radio group demonstration with add/remove functionality."}}};const v=()=>{const t=document.createElement("div");t.style.cssText="padding: 24px; max-width: 500px;";const a=document.createElement("div");a.innerHTML=`
    <h3 style="margin: 0 0 8px 0;">Keyboard Navigation</h3>
    <div style="margin: 0 0 16px 0; color: var(--_global-color-text-secondary);">
      <p style="margin: 0 0 8px 0;">Try these keyboard shortcuts:</p>
      <ul style="margin: 0; line-height: 1.6;">
        <li><strong>Arrow Keys:</strong> Navigate between options</li>
        <li><strong>Space:</strong> Select focused option</li>
        <li><strong>Home:</strong> Go to first option</li>
        <li><strong>End:</strong> Go to last option</li>
      </ul>
    </div>
  `;const e=document.createElement("my-radio-group");e.setAttribute("label","Use keyboard to navigate"),e.setAttribute("name","keyboard-group"),e.setAttribute("value","keyboard2"),["First keyboard option","Second keyboard option","Third keyboard option","Fourth keyboard option","Fifth keyboard option"].forEach((n,i)=>{const r=document.createElement("my-radio");r.setAttribute("value",`keyboard${i+1}`),r.setAttribute("label",n),e.appendChild(r)}),setTimeout(()=>{const n=e.querySelector("my-radio");n&&n.focus()},100);const o=document.createElement("div");return o.style.cssText="margin-top: 16px; padding: 12px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md);",o.innerHTML='<strong>Selected:</strong> <span id="kb-selected-value">keyboard2</span>',e.addEventListener("change",n=>{const i=o.querySelector("#kb-selected-value");i.textContent=n.detail.value}),t.appendChild(a),t.appendChild(e),t.appendChild(o),t};v.parameters={docs:{description:{story:"Comprehensive keyboard navigation support with arrow keys, space, home, and end."}}};const h=()=>{const t=document.createElement("div");t.style.cssText="padding: 24px; max-width: 600px;";const a=document.createElement("div");a.innerHTML=`
    <h3 style="margin: 0 0 8px 0;">Accessibility Features</h3>
    <ul style="margin: 0 0 24px 0; color: var(--_global-color-text-secondary); line-height: 1.6;">
      <li>Proper ARIA roles and attributes</li>
      <li>Keyboard navigation support</li>
      <li>Screen reader announcements</li>
      <li>Focus management</li>
      <li>High contrast mode support</li>
      <li>Reduced motion preferences</li>
    </ul>
  `;const e=document.createElement("my-radio-group");return e.setAttribute("label","Accessibility Test Group"),e.setAttribute("name","accessibility-group"),e.setAttribute("required",""),["Screen reader friendly option","Keyboard navigation test","Focus management demo","ARIA attributes test"].forEach((o,n)=>{const i=document.createElement("my-radio");i.setAttribute("value",`a11y${n+1}`),i.setAttribute("label",o),e.appendChild(i)}),t.appendChild(a),t.appendChild(e),t};h.parameters={docs:{description:{story:"Comprehensive accessibility features for inclusive user experience."}}};var x,A,f;u.parameters={...u.parameters,docs:{...(x=u.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 400px;';
  const radioGroup = document.createElement('my-radio-group');

  // Set properties
  if (args.label) radioGroup.setAttribute('label', args.label);
  if (args.value) radioGroup.setAttribute('value', args.value);
  if (args.name) radioGroup.setAttribute('name', args.name);
  if (args.size && args.size !== 'md') radioGroup.setAttribute('size', args.size);
  if (args.layout && args.layout !== 'vertical') radioGroup.setAttribute('layout', args.layout);
  if (args.required) radioGroup.setAttribute('required', '');
  if (args.disabled) radioGroup.setAttribute('disabled', '');
  if (args.error) radioGroup.setAttribute('error', '');

  // Add sample radio options
  const options = [{
    value: 'option1',
    label: 'First Option'
  }, {
    value: 'option2',
    label: 'Second Option'
  }, {
    value: 'option3',
    label: 'Third Option'
  }];
  options.forEach(option => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', option.value);
    radio.setAttribute('label', option.label);
    radioGroup.appendChild(radio);
  });

  // Add event listener for demonstration
  radioGroup.addEventListener('change', event => {
    console.log('Radio group changed:', event.detail);
  });
  container.appendChild(radioGroup);
  return container;
}`,...(f=(A=u.parameters)==null?void 0:A.docs)==null?void 0:f.source}}};var E,G,C;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; flex-direction: column; gap: 32px;';

  // Vertical layout
  const verticalGroup = document.createElement('my-radio-group');
  verticalGroup.setAttribute('label', 'Vertical Layout');
  verticalGroup.setAttribute('name', 'vertical-group');
  verticalGroup.setAttribute('value', 'vertical2');
  ['Vertical Option 1', 'Vertical Option 2', 'Vertical Option 3'].forEach((label, index) => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', \`vertical\${index + 1}\`);
    radio.setAttribute('label', label);
    verticalGroup.appendChild(radio);
  });

  // Horizontal layout
  const horizontalGroup = document.createElement('my-radio-group');
  horizontalGroup.setAttribute('label', 'Horizontal Layout');
  horizontalGroup.setAttribute('name', 'horizontal-group');
  horizontalGroup.setAttribute('layout', 'horizontal');
  horizontalGroup.setAttribute('value', 'horizontal1');
  ['Option A', 'Option B', 'Option C'].forEach((label, index) => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', \`horizontal\${index + 1}\`);
    radio.setAttribute('label', label);
    horizontalGroup.appendChild(radio);
  });
  container.appendChild(verticalGroup);
  container.appendChild(horizontalGroup);
  return container;
}`,...(C=(G=p.parameters)==null?void 0:G.docs)==null?void 0:C.source}}};var O,S,k;m.parameters={...m.parameters,docs:{...(O=m.parameters)==null?void 0:O.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; flex-direction: column; gap: 32px;';
  const sizes = [{
    size: 'sm',
    label: 'Small Size'
  }, {
    size: 'md',
    label: 'Medium Size'
  }, {
    size: 'lg',
    label: 'Large Size'
  }];
  sizes.forEach(({
    size,
    label
  }) => {
    const radioGroup = document.createElement('my-radio-group');
    radioGroup.setAttribute('label', label);
    radioGroup.setAttribute('name', \`\${size}-group\`);
    radioGroup.setAttribute('size', size);
    radioGroup.setAttribute('value', \`\${size}2\`);
    ['First', 'Second', 'Third'].forEach((optionLabel, index) => {
      const radio = document.createElement('my-radio');
      radio.setAttribute('value', \`\${size}\${index + 1}\`);
      radio.setAttribute('label', \`\${optionLabel} \${label.split(' ')[0]} Option\`);
      radioGroup.appendChild(radio);
    });
    container.appendChild(radioGroup);
  });
  return container;
}`,...(k=(S=m.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var T,z,R;b.parameters={...b.parameters,docs:{...(T=b.parameters)==null?void 0:T.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px;';

  // Normal state
  const normalGroup = document.createElement('my-radio-group');
  normalGroup.setAttribute('label', 'Normal State');
  normalGroup.setAttribute('name', 'normal-group');
  normalGroup.setAttribute('value', 'normal2');
  ['Option 1', 'Option 2', 'Option 3'].forEach((label, index) => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', \`normal\${index + 1}\`);
    radio.setAttribute('label', label);
    normalGroup.appendChild(radio);
  });

  // Required state
  const requiredGroup = document.createElement('my-radio-group');
  requiredGroup.setAttribute('label', 'Required State');
  requiredGroup.setAttribute('name', 'required-group');
  requiredGroup.setAttribute('required', '');
  ['Required Option 1', 'Required Option 2', 'Required Option 3'].forEach((label, index) => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', \`required\${index + 1}\`);
    radio.setAttribute('label', label);
    requiredGroup.appendChild(radio);
  });

  // Error state
  const errorGroup = document.createElement('my-radio-group');
  errorGroup.setAttribute('label', 'Error State');
  errorGroup.setAttribute('name', 'error-group');
  errorGroup.setAttribute('error', '');
  errorGroup.setAttribute('value', 'error1');
  ['Error Option 1', 'Error Option 2', 'Error Option 3'].forEach((label, index) => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', \`error\${index + 1}\`);
    radio.setAttribute('label', label);
    errorGroup.appendChild(radio);
  });

  // Disabled state
  const disabledGroup = document.createElement('my-radio-group');
  disabledGroup.setAttribute('label', 'Disabled State');
  disabledGroup.setAttribute('name', 'disabled-group');
  disabledGroup.setAttribute('disabled', '');
  disabledGroup.setAttribute('value', 'disabled2');
  ['Disabled Option 1', 'Disabled Option 2', 'Disabled Option 3'].forEach((label, index) => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', \`disabled\${index + 1}\`);
    radio.setAttribute('label', label);
    disabledGroup.appendChild(radio);
  });
  container.appendChild(normalGroup);
  container.appendChild(requiredGroup);
  container.appendChild(errorGroup);
  container.appendChild(disabledGroup);
  return container;
}`,...(R=(z=b.parameters)==null?void 0:z.docs)==null?void 0:R.source}}};var q,D,L;y.parameters={...y.parameters,docs:{...(q=y.parameters)==null?void 0:q.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; flex-direction: column; gap: 24px;';
  const info = document.createElement('div');
  info.innerHTML = \`
    <h3 style="margin: 0 0 8px 0;">Individual Radio Buttons</h3>
    <p style="margin: 0 0 16px 0; color: var(--_global-color-text-secondary);">
      Individual radio buttons can be used outside of radio groups when you need manual control.
    </p>
  \`;
  const radioContainer = document.createElement('div');
  radioContainer.style.cssText = 'display: flex; flex-direction: column; gap: 12px;';

  // Individual radios with different states
  const radioStates = [{
    label: 'Normal Radio',
    checked: false,
    disabled: false
  }, {
    label: 'Checked Radio',
    checked: true,
    disabled: false
  }, {
    label: 'Disabled Radio',
    checked: false,
    disabled: true
  }, {
    label: 'Disabled Checked Radio',
    checked: true,
    disabled: true
  }];
  radioStates.forEach(({
    label,
    checked,
    disabled
  }, index) => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('label', label);
    radio.setAttribute('value', \`individual\${index + 1}\`);
    radio.setAttribute('name', 'individual-radios');
    if (checked) radio.setAttribute('checked', '');
    if (disabled) radio.setAttribute('disabled', '');
    radio.addEventListener('change', event => {
      console.log('Individual radio changed:', event.detail);
    });
    radioContainer.appendChild(radio);
  });
  container.appendChild(info);
  container.appendChild(radioContainer);
  return container;
}`,...(L=(D=y.parameters)==null?void 0:D.docs)==null?void 0:L.source}}};var $,_,w;g.parameters={...g.parameters,docs:{...($=g.parameters)==null?void 0:$.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 500px;';
  const info = document.createElement('div');
  info.innerHTML = \`
    <h3 style="margin: 0 0 8px 0;">Dynamic Radio Group</h3>
    <p style="margin: 0 0 16px 0; color: var(--_global-color-text-secondary);">
      This example demonstrates dynamically adding and removing radio options.
    </p>
  \`;
  const radioGroup = document.createElement('my-radio-group');
  radioGroup.setAttribute('label', 'Dynamic Options');
  radioGroup.setAttribute('name', 'dynamic-group');

  // Initial options
  const initialOptions = [{
    value: 'dynamic1',
    label: 'Initial Option 1'
  }, {
    value: 'dynamic2',
    label: 'Initial Option 2'
  }];
  let optionCounter = 3;
  initialOptions.forEach(option => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', option.value);
    radio.setAttribute('label', option.label);
    radioGroup.appendChild(radio);
  });
  const controls = document.createElement('div');
  controls.style.cssText = 'display: flex; gap: 12px; margin-top: 16px; flex-wrap: wrap;';

  // Add option button
  const addButton = document.createElement('button');
  addButton.textContent = 'Add Option';
  addButton.style.cssText = 'padding: 8px 16px; background: var(--_global-color-primary); color: var(--_global-color-on-primary); border: none; border-radius: var(--_global-border-radius-md); cursor: pointer;';
  addButton.addEventListener('click', () => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', \`dynamic\${optionCounter}\`);
    radio.setAttribute('label', \`Added Option \${optionCounter}\`);
    radioGroup.appendChild(radio);
    optionCounter++;
  });

  // Remove option button
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove Last Option';
  removeButton.style.cssText = 'padding: 8px 16px; background: var(--_global-color-error); color: var(--_global-color-on-error); border: none; border-radius: var(--_global-border-radius-md); cursor: pointer;';
  removeButton.addEventListener('click', () => {
    const radios = radioGroup.querySelectorAll('my-radio');
    if (radios.length > 1) {
      radios[radios.length - 1].remove();
    }
  });
  controls.appendChild(addButton);
  controls.appendChild(removeButton);

  // Selection display
  const selectionDisplay = document.createElement('div');
  selectionDisplay.style.cssText = 'margin-top: 16px; padding: 12px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md);';
  selectionDisplay.innerHTML = '<strong>Selected:</strong> <span id="selected-value">None</span>';
  radioGroup.addEventListener('change', event => {
    const selectedSpan = selectionDisplay.querySelector('#selected-value');
    selectedSpan.textContent = event.detail.value || 'None';
  });
  container.appendChild(info);
  container.appendChild(radioGroup);
  container.appendChild(controls);
  container.appendChild(selectionDisplay);
  return container;
}`,...(w=(_=g.parameters)==null?void 0:_.docs)==null?void 0:w.source}}};var H,I,F;v.parameters={...v.parameters,docs:{...(H=v.parameters)==null?void 0:H.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 500px;';
  const info = document.createElement('div');
  info.innerHTML = \`
    <h3 style="margin: 0 0 8px 0;">Keyboard Navigation</h3>
    <div style="margin: 0 0 16px 0; color: var(--_global-color-text-secondary);">
      <p style="margin: 0 0 8px 0;">Try these keyboard shortcuts:</p>
      <ul style="margin: 0; line-height: 1.6;">
        <li><strong>Arrow Keys:</strong> Navigate between options</li>
        <li><strong>Space:</strong> Select focused option</li>
        <li><strong>Home:</strong> Go to first option</li>
        <li><strong>End:</strong> Go to last option</li>
      </ul>
    </div>
  \`;
  const radioGroup = document.createElement('my-radio-group');
  radioGroup.setAttribute('label', 'Use keyboard to navigate');
  radioGroup.setAttribute('name', 'keyboard-group');
  radioGroup.setAttribute('value', 'keyboard2');
  const keyboardOptions = ['First keyboard option', 'Second keyboard option', 'Third keyboard option', 'Fourth keyboard option', 'Fifth keyboard option'];
  keyboardOptions.forEach((label, index) => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', \`keyboard\${index + 1}\`);
    radio.setAttribute('label', label);
    radioGroup.appendChild(radio);
  });

  // Focus the radio group for immediate keyboard interaction
  setTimeout(() => {
    const firstRadio = radioGroup.querySelector('my-radio');
    if (firstRadio) {
      firstRadio.focus();
    }
  }, 100);
  const selectionDisplay = document.createElement('div');
  selectionDisplay.style.cssText = 'margin-top: 16px; padding: 12px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md);';
  selectionDisplay.innerHTML = '<strong>Selected:</strong> <span id="kb-selected-value">keyboard2</span>';
  radioGroup.addEventListener('change', event => {
    const selectedSpan = selectionDisplay.querySelector('#kb-selected-value');
    selectedSpan.textContent = event.detail.value;
  });
  container.appendChild(info);
  container.appendChild(radioGroup);
  container.appendChild(selectionDisplay);
  return container;
}`,...(F=(I=v.parameters)==null?void 0:I.docs)==null?void 0:F.source}}};var B,M,N;h.parameters={...h.parameters,docs:{...(B=h.parameters)==null?void 0:B.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 600px;';
  const info = document.createElement('div');
  info.innerHTML = \`
    <h3 style="margin: 0 0 8px 0;">Accessibility Features</h3>
    <ul style="margin: 0 0 24px 0; color: var(--_global-color-text-secondary); line-height: 1.6;">
      <li>Proper ARIA roles and attributes</li>
      <li>Keyboard navigation support</li>
      <li>Screen reader announcements</li>
      <li>Focus management</li>
      <li>High contrast mode support</li>
      <li>Reduced motion preferences</li>
    </ul>
  \`;
  const radioGroup = document.createElement('my-radio-group');
  radioGroup.setAttribute('label', 'Accessibility Test Group');
  radioGroup.setAttribute('name', 'accessibility-group');
  radioGroup.setAttribute('required', '');
  const accessibilityOptions = ['Screen reader friendly option', 'Keyboard navigation test', 'Focus management demo', 'ARIA attributes test'];
  accessibilityOptions.forEach((label, index) => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', \`a11y\${index + 1}\`);
    radio.setAttribute('label', label);
    radioGroup.appendChild(radio);
  });
  container.appendChild(info);
  container.appendChild(radioGroup);
  return container;
}`,...(N=(M=h.parameters)==null?void 0:M.docs)==null?void 0:N.source}}};const j=["Default","Layouts","Sizes","States","IndividualRadios","DynamicRadioGroups","KeyboardNavigation","Accessibility"];export{h as Accessibility,u as Default,g as DynamicRadioGroups,y as IndividualRadios,v as KeyboardNavigation,p as Layouts,m as Sizes,b as States,j as __namedExportsOrder,U as default};
