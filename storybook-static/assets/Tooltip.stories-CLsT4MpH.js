import"./my-tooltip-B3RMpmFT.js";import"./my-button-WudZcNwy.js";import"./my-icon-O3BbYCXg.js";import"./base-component-q4KNMHwB.js";const N={title:"Components/my-tooltip",parameters:{docs:{description:{component:"A small, contextual information pop-up displayed on hover or focus of an element. Supports multiple positions, variants, and sizes."}}},argTypes:{text:{control:"text",description:"Tooltip text content"},position:{control:{type:"select"},options:["top","bottom","left","right","auto"],description:"Tooltip position relative to target element"},variant:{control:{type:"select"},options:["dark","light","primary","error"],description:"Tooltip color variant"},size:{control:{type:"select"},options:["sm","md","lg"],description:"Tooltip size"},delay:{control:{type:"number",min:0,max:2e3,step:100},description:"Delay in milliseconds before showing tooltip"},multiline:{control:"boolean",description:"Allow tooltip text to wrap to multiple lines"},disabled:{control:"boolean",description:"Disable tooltip functionality"}}},O=t=>{const i=document.createElement("div");i.style.cssText="padding: 100px; display: flex; justify-content: center;";const n=document.createElement("my-tooltip");t.text&&n.setAttribute("text",t.text),t.position&&t.position!=="top"&&n.setAttribute("position",t.position),t.variant&&t.variant!=="dark"&&n.setAttribute("variant",t.variant),t.size&&t.size!=="md"&&n.setAttribute("size",t.size),t.delay!==void 0&&t.delay!==500&&n.setAttribute("delay",t.delay),t.multiline&&n.setAttribute("multiline",""),t.disabled&&n.setAttribute("disabled","");const e=document.createElement("my-button");return e.setAttribute("label","Hover me"),e.setAttribute("variant","outlined"),n.appendChild(e),i.appendChild(n),i},r=O.bind({});r.args={text:"This is a helpful tooltip",position:"top",variant:"dark",size:"md",delay:500,multiline:!1,disabled:!1};const s=()=>{const t=document.createElement("div");return t.style.cssText="padding: 80px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 60px; align-items: center; justify-items: center;",["top","bottom","left","right"].forEach(n=>{const e=document.createElement("my-tooltip");e.setAttribute("text",`Tooltip on ${n}`),e.setAttribute("position",n),e.setAttribute("delay","200");const o=document.createElement("my-button");o.setAttribute("label",n.charAt(0).toUpperCase()+n.slice(1)),o.setAttribute("variant","filled"),e.appendChild(o),t.appendChild(e)}),t};s.parameters={docs:{description:{story:"Tooltips can be positioned on any side of the target element."}}};const a=()=>{const t=document.createElement("div");return t.style.cssText="padding: 80px; display: flex; gap: 24px; align-items: center; justify-content: center;",[{variant:"dark",label:"Dark",buttonVariant:"filled"},{variant:"light",label:"Light",buttonVariant:"outlined"},{variant:"primary",label:"Primary",buttonVariant:"text"},{variant:"error",label:"Error",buttonVariant:"error"}].forEach(({variant:n,label:e,buttonVariant:o})=>{const l=document.createElement("my-tooltip");l.setAttribute("text",`${e} tooltip variant`),l.setAttribute("variant",n),l.setAttribute("delay","200");const y=document.createElement("my-button");y.setAttribute("label",e),y.setAttribute("variant",o),l.appendChild(y),t.appendChild(l)}),t};a.parameters={docs:{description:{story:"Different tooltip color variants to match various contexts."}}};const c=()=>{const t=document.createElement("div");return t.style.cssText="padding: 80px; display: flex; gap: 24px; align-items: center; justify-content: center;",["sm","md","lg"].forEach(n=>{const e=document.createElement("my-tooltip");e.setAttribute("text",`Size ${n.toUpperCase()} tooltip with longer text content`),e.setAttribute("size",n),e.setAttribute("delay","200");const o=document.createElement("my-button");o.setAttribute("label",n.toUpperCase()),o.setAttribute("size",n),o.setAttribute("variant","outlined"),e.appendChild(o),t.appendChild(e)}),t};c.parameters={docs:{description:{story:"Tooltips come in three sizes: small, medium, and large."}}};const p=()=>{const t=document.createElement("div");t.style.cssText="padding: 100px; display: flex; gap: 24px; align-items: center; justify-content: center;";const i=document.createElement("my-tooltip");i.setAttribute("text","This is a very long tooltip text that would normally be truncated with ellipsis"),i.setAttribute("delay","200");const n=document.createElement("my-button");n.setAttribute("label","Single Line"),n.setAttribute("variant","outlined"),i.appendChild(n);const e=document.createElement("my-tooltip");e.setAttribute("text","This is a very long tooltip text that will wrap to multiple lines when multiline is enabled"),e.setAttribute("multiline",""),e.setAttribute("delay","200");const o=document.createElement("my-button");return o.setAttribute("label","Multi-line"),o.setAttribute("variant","filled"),e.appendChild(o),t.appendChild(i),t.appendChild(e),t};p.parameters={docs:{description:{story:"Comparison between single-line (truncated) and multi-line tooltips."}}};const u=()=>{const t=document.createElement("div");t.style.cssText="padding: 100px; display: flex; gap: 24px; align-items: center; justify-content: center;";const i=document.createElement("my-tooltip");i.setAttribute("variant","light"),i.setAttribute("size","lg"),i.setAttribute("delay","200");const n=document.createElement("div");n.setAttribute("slot","content"),n.innerHTML=`
    <div style="display: flex; align-items: center; gap: 8px;">
      <my-icon icon="info" size="sm" style="color: var(--_global-color-primary);"></my-icon>
      <div>
        <div style="font-weight: var(--_global-font-weight-bold); margin-bottom: 4px;">Pro Tip</div>
        <div style="font-size: var(--_global-font-size-xs);">This tooltip contains custom HTML content</div>
      </div>
    </div>
  `;const e=document.createElement("my-button");return e.setAttribute("label","Rich Content"),e.setAttribute("variant","filled"),e.innerHTML='<my-icon icon="help" slot="left"></my-icon>Rich Content',i.appendChild(n),i.appendChild(e),t.appendChild(i),t};u.parameters={docs:{description:{story:"Tooltips can contain rich HTML content using the content slot."}}};const d=()=>{const t=document.createElement("div");t.style.cssText="padding: 80px; display: flex; gap: 24px; align-items: center; justify-content: center; flex-wrap: wrap;";const i=document.createElement("my-tooltip");i.setAttribute("text","Click to perform action"),i.setAttribute("position","top");const n=document.createElement("my-button");n.setAttribute("label","Action"),n.setAttribute("variant","filled"),i.appendChild(n);const e=document.createElement("my-tooltip");e.setAttribute("text","Settings"),e.setAttribute("position","bottom"),e.setAttribute("variant","dark");const o=document.createElement("my-button");o.setAttribute("variant","text"),o.setAttribute("icon-only",""),o.innerHTML='<my-icon icon="settings"></my-icon>',e.appendChild(o);const l=document.createElement("my-tooltip");return l.setAttribute("text","This is a technical term that needs explanation"),l.setAttribute("variant","primary"),l.setAttribute("multiline",""),l.style.color="var(--_global-color-primary)",l.style.textDecoration="underline dotted",l.style.cursor="help",l.textContent="Hover over this text",t.appendChild(i),t.appendChild(e),t.appendChild(l),t};d.parameters={docs:{description:{story:"Tooltips can enhance various interactive elements like buttons, icons, and text."}}};const m=()=>{const t=document.createElement("div");return t.style.cssText="position: relative; height: 400px; width: 100%; border: 1px dashed var(--_global-color-outline); border-radius: var(--_global-border-radius-md);",[{top:"20px",left:"20px",label:"Top-left"},{top:"20px",right:"20px",label:"Top-right"},{bottom:"20px",left:"20px",label:"Bottom-left"},{bottom:"20px",right:"20px",label:"Bottom-right"},{top:"50%",left:"50%",transform:"translate(-50%, -50%)",label:"Center"}].forEach(({label:n,...e})=>{const o=document.createElement("my-tooltip");o.setAttribute("text",`Auto-positioned tooltip from ${n}`),o.setAttribute("position","auto"),o.setAttribute("delay","200"),o.style.position="absolute",Object.assign(o.style,e);const l=document.createElement("my-button");l.setAttribute("label",n),l.setAttribute("size","sm"),l.setAttribute("variant","outlined"),o.appendChild(l),t.appendChild(o)}),t};m.parameters={docs:{description:{story:"Tooltips with auto positioning will automatically choose the best position based on available space."}}};const b=()=>{const t=document.createElement("div");t.style.cssText="padding: 80px; max-width: 600px; margin: 0 auto;";const i=document.createElement("div");i.innerHTML=`
    <h3 style="margin: 0 0 16px 0;">Accessibility Features</h3>
    <ul style="line-height: 1.6; color: var(--_global-color-text-secondary);">
      <li>Tooltips are announced by screen readers</li>
      <li>Keyboard accessible (focus/blur events)</li>
      <li>Respects reduced motion preferences</li>
      <li>High contrast mode support</li>
      <li>Escape key dismisses tooltip</li>
    </ul>
  `,t.appendChild(i);const n=document.createElement("div");n.style.cssText="display: flex; gap: 16px; align-items: center; margin-top: 24px;";const e=document.createElement("my-tooltip");e.setAttribute("text","This tooltip appears on keyboard focus for accessibility"),e.setAttribute("variant","primary"),e.setAttribute("multiline","");const o=document.createElement("my-button");return o.setAttribute("label","Tab to Focus"),o.setAttribute("variant","outlined"),e.appendChild(o),n.appendChild(e),t.appendChild(n),t};b.parameters={docs:{description:{story:"Tooltip component includes comprehensive accessibility features."}}};var x,g,h;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 100px; display: flex; justify-content: center;';
  const tooltip = document.createElement('my-tooltip');

  // Set properties
  if (args.text) tooltip.setAttribute('text', args.text);
  if (args.position && args.position !== 'top') tooltip.setAttribute('position', args.position);
  if (args.variant && args.variant !== 'dark') tooltip.setAttribute('variant', args.variant);
  if (args.size && args.size !== 'md') tooltip.setAttribute('size', args.size);
  if (args.delay !== undefined && args.delay !== 500) tooltip.setAttribute('delay', args.delay);
  if (args.multiline) tooltip.setAttribute('multiline', '');
  if (args.disabled) tooltip.setAttribute('disabled', '');

  // Add target element
  const button = document.createElement('my-button');
  button.setAttribute('label', 'Hover me');
  button.setAttribute('variant', 'outlined');
  tooltip.appendChild(button);
  container.appendChild(tooltip);
  return container;
}`,...(h=(g=r.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var A,f,v;s.parameters={...s.parameters,docs:{...(A=s.parameters)==null?void 0:A.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 80px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 60px; align-items: center; justify-items: center;';
  const positions = ['top', 'bottom', 'left', 'right'];
  positions.forEach(position => {
    const tooltip = document.createElement('my-tooltip');
    tooltip.setAttribute('text', \`Tooltip on \${position}\`);
    tooltip.setAttribute('position', position);
    tooltip.setAttribute('delay', '200');
    const button = document.createElement('my-button');
    button.setAttribute('label', position.charAt(0).toUpperCase() + position.slice(1));
    button.setAttribute('variant', 'filled');
    tooltip.appendChild(button);
    container.appendChild(tooltip);
  });
  return container;
}`,...(v=(f=s.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var T,E,C;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 80px; display: flex; gap: 24px; align-items: center; justify-content: center;';
  const variants = [{
    variant: 'dark',
    label: 'Dark',
    buttonVariant: 'filled'
  }, {
    variant: 'light',
    label: 'Light',
    buttonVariant: 'outlined'
  }, {
    variant: 'primary',
    label: 'Primary',
    buttonVariant: 'text'
  }, {
    variant: 'error',
    label: 'Error',
    buttonVariant: 'error'
  }];
  variants.forEach(({
    variant,
    label,
    buttonVariant
  }) => {
    const tooltip = document.createElement('my-tooltip');
    tooltip.setAttribute('text', \`\${label} tooltip variant\`);
    tooltip.setAttribute('variant', variant);
    tooltip.setAttribute('delay', '200');
    const button = document.createElement('my-button');
    button.setAttribute('label', label);
    button.setAttribute('variant', buttonVariant);
    tooltip.appendChild(button);
    container.appendChild(tooltip);
  });
  return container;
}`,...(C=(E=a.parameters)==null?void 0:E.docs)==null?void 0:C.source}}};var L,z,w;c.parameters={...c.parameters,docs:{...(L=c.parameters)==null?void 0:L.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 80px; display: flex; gap: 24px; align-items: center; justify-content: center;';
  const sizes = ['sm', 'md', 'lg'];
  sizes.forEach(size => {
    const tooltip = document.createElement('my-tooltip');
    tooltip.setAttribute('text', \`Size \${size.toUpperCase()} tooltip with longer text content\`);
    tooltip.setAttribute('size', size);
    tooltip.setAttribute('delay', '200');
    const button = document.createElement('my-button');
    button.setAttribute('label', size.toUpperCase());
    button.setAttribute('size', size);
    button.setAttribute('variant', 'outlined');
    tooltip.appendChild(button);
    container.appendChild(tooltip);
  });
  return container;
}`,...(w=(z=c.parameters)==null?void 0:z.docs)==null?void 0:w.source}}};var B,S,k;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 100px; display: flex; gap: 24px; align-items: center; justify-content: center;';
  const singleLineTooltip = document.createElement('my-tooltip');
  singleLineTooltip.setAttribute('text', 'This is a very long tooltip text that would normally be truncated with ellipsis');
  singleLineTooltip.setAttribute('delay', '200');
  const singleLineButton = document.createElement('my-button');
  singleLineButton.setAttribute('label', 'Single Line');
  singleLineButton.setAttribute('variant', 'outlined');
  singleLineTooltip.appendChild(singleLineButton);
  const multiLineTooltip = document.createElement('my-tooltip');
  multiLineTooltip.setAttribute('text', 'This is a very long tooltip text that will wrap to multiple lines when multiline is enabled');
  multiLineTooltip.setAttribute('multiline', '');
  multiLineTooltip.setAttribute('delay', '200');
  const multiLineButton = document.createElement('my-button');
  multiLineButton.setAttribute('label', 'Multi-line');
  multiLineButton.setAttribute('variant', 'filled');
  multiLineTooltip.appendChild(multiLineButton);
  container.appendChild(singleLineTooltip);
  container.appendChild(multiLineTooltip);
  return container;
}`,...(k=(S=p.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var H,_,j;u.parameters={...u.parameters,docs:{...(H=u.parameters)==null?void 0:H.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 100px; display: flex; gap: 24px; align-items: center; justify-content: center;';
  const tooltip = document.createElement('my-tooltip');
  tooltip.setAttribute('variant', 'light');
  tooltip.setAttribute('size', 'lg');
  tooltip.setAttribute('delay', '200');

  // Custom content using slot
  const content = document.createElement('div');
  content.setAttribute('slot', 'content');
  content.innerHTML = \`
    <div style="display: flex; align-items: center; gap: 8px;">
      <my-icon icon="info" size="sm" style="color: var(--_global-color-primary);"></my-icon>
      <div>
        <div style="font-weight: var(--_global-font-weight-bold); margin-bottom: 4px;">Pro Tip</div>
        <div style="font-size: var(--_global-font-size-xs);">This tooltip contains custom HTML content</div>
      </div>
    </div>
  \`;
  const button = document.createElement('my-button');
  button.setAttribute('label', 'Rich Content');
  button.setAttribute('variant', 'filled');
  button.innerHTML = '<my-icon icon="help" slot="left"></my-icon>Rich Content';
  tooltip.appendChild(content);
  tooltip.appendChild(button);
  container.appendChild(tooltip);
  return container;
}`,...(j=(_=u.parameters)==null?void 0:_.docs)==null?void 0:j.source}}};var M,D,V;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 80px; display: flex; gap: 24px; align-items: center; justify-content: center; flex-wrap: wrap;';

  // Button with tooltip
  const buttonTooltip = document.createElement('my-tooltip');
  buttonTooltip.setAttribute('text', 'Click to perform action');
  buttonTooltip.setAttribute('position', 'top');
  const button = document.createElement('my-button');
  button.setAttribute('label', 'Action');
  button.setAttribute('variant', 'filled');
  buttonTooltip.appendChild(button);

  // Icon with tooltip
  const iconTooltip = document.createElement('my-tooltip');
  iconTooltip.setAttribute('text', 'Settings');
  iconTooltip.setAttribute('position', 'bottom');
  iconTooltip.setAttribute('variant', 'dark');
  const iconButton = document.createElement('my-button');
  iconButton.setAttribute('variant', 'text');
  iconButton.setAttribute('icon-only', '');
  iconButton.innerHTML = '<my-icon icon="settings"></my-icon>';
  iconTooltip.appendChild(iconButton);

  // Text with tooltip
  const textTooltip = document.createElement('my-tooltip');
  textTooltip.setAttribute('text', 'This is a technical term that needs explanation');
  textTooltip.setAttribute('variant', 'primary');
  textTooltip.setAttribute('multiline', '');
  textTooltip.style.color = 'var(--_global-color-primary)';
  textTooltip.style.textDecoration = 'underline dotted';
  textTooltip.style.cursor = 'help';
  textTooltip.textContent = 'Hover over this text';
  container.appendChild(buttonTooltip);
  container.appendChild(iconTooltip);
  container.appendChild(textTooltip);
  return container;
}`,...(V=(D=d.parameters)==null?void 0:D.docs)==null?void 0:V.source}}};var P,$,R;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'position: relative; height: 400px; width: 100%; border: 1px dashed var(--_global-color-outline); border-radius: var(--_global-border-radius-md);';

  // Corner positions to test auto-positioning
  const positions = [{
    top: '20px',
    left: '20px',
    label: 'Top-left'
  }, {
    top: '20px',
    right: '20px',
    label: 'Top-right'
  }, {
    bottom: '20px',
    left: '20px',
    label: 'Bottom-left'
  }, {
    bottom: '20px',
    right: '20px',
    label: 'Bottom-right'
  }, {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    label: 'Center'
  }];
  positions.forEach(({
    label,
    ...style
  }) => {
    const tooltip = document.createElement('my-tooltip');
    tooltip.setAttribute('text', \`Auto-positioned tooltip from \${label}\`);
    tooltip.setAttribute('position', 'auto');
    tooltip.setAttribute('delay', '200');
    tooltip.style.position = 'absolute';
    Object.assign(tooltip.style, style);
    const button = document.createElement('my-button');
    button.setAttribute('label', label);
    button.setAttribute('size', 'sm');
    button.setAttribute('variant', 'outlined');
    tooltip.appendChild(button);
    container.appendChild(tooltip);
  });
  return container;
}`,...(R=($=m.parameters)==null?void 0:$.docs)==null?void 0:R.source}}};var U,F,I;b.parameters={...b.parameters,docs:{...(U=b.parameters)==null?void 0:U.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 80px; max-width: 600px; margin: 0 auto;';
  const info = document.createElement('div');
  info.innerHTML = \`
    <h3 style="margin: 0 0 16px 0;">Accessibility Features</h3>
    <ul style="line-height: 1.6; color: var(--_global-color-text-secondary);">
      <li>Tooltips are announced by screen readers</li>
      <li>Keyboard accessible (focus/blur events)</li>
      <li>Respects reduced motion preferences</li>
      <li>High contrast mode support</li>
      <li>Escape key dismisses tooltip</li>
    </ul>
  \`;
  container.appendChild(info);
  const tooltipDemo = document.createElement('div');
  tooltipDemo.style.cssText = 'display: flex; gap: 16px; align-items: center; margin-top: 24px;';
  const focusTooltip = document.createElement('my-tooltip');
  focusTooltip.setAttribute('text', 'This tooltip appears on keyboard focus for accessibility');
  focusTooltip.setAttribute('variant', 'primary');
  focusTooltip.setAttribute('multiline', '');
  const focusButton = document.createElement('my-button');
  focusButton.setAttribute('label', 'Tab to Focus');
  focusButton.setAttribute('variant', 'outlined');
  focusTooltip.appendChild(focusButton);
  tooltipDemo.appendChild(focusTooltip);
  container.appendChild(tooltipDemo);
  return container;
}`,...(I=(F=b.parameters)==null?void 0:F.docs)==null?void 0:I.source}}};const Q=["Default","Positions","Variants","Sizes","Multiline","CustomContent","InteractiveElements","AutoPositioning","Accessibility"];export{b as Accessibility,m as AutoPositioning,u as CustomContent,r as Default,d as InteractiveElements,p as Multiline,s as Positions,c as Sizes,a as Variants,Q as __namedExportsOrder,N as default};
